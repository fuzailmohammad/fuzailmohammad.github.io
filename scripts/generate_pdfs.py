#!/usr/bin/env python3
"""
FuzailVerse Legal Documentation PDF Generator
Generates production-grade, print-ready, A4 PDF documents for:
- FuzailVerse_Privacy_Policy.pdf
- FuzailVerse_Terms_and_Conditions.pdf
matching the website styling and content.
"""

import os
import json
import zlib
import re

# Standard A4 Dimensions in Points (72 points per inch)
PAGE_WIDTH = 595.28
PAGE_HEIGHT = 841.89
MARGIN_LEFT = 44.0
MARGIN_RIGHT = 44.0
MARGIN_TOP = 50.0
MARGIN_BOTTOM = 50.0
CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT  # 507.28 pt

# Standard Adobe Type 1 Font metrics for Helvetica (widths per 1000 units of em)
HELVETICA_WIDTHS = {
    ' ': 278, '!': 278, '"': 355, '#': 556, '$': 556, '%': 889, '&': 667, "'": 191,
    '(': 333, ')': 333, '*': 389, '+': 584, ',': 278, '-': 333, '.': 278, '/': 278,
    '0': 556, '1': 556, '2': 556, '3': 556, '4': 556, '5': 556, '6': 556, '7': 556,
    '8': 556, '9': 556, ':': 278, ';': 278, '<': 584, '=': 584, '>': 584, '?': 556,
    '@': 1015, 'A': 667, 'B': 667, 'C': 722, 'D': 722, 'E': 667, 'F': 611, 'G': 778,
    'H': 722, 'I': 278, 'J': 500, 'K': 667, 'L': 556, 'M': 833, 'N': 722, 'O': 778,
    'P': 667, 'Q': 778, 'R': 722, 'S': 667, 'T': 611, 'U': 722, 'V': 667, 'W': 944,
    'X': 667, 'Y': 667, 'Z': 611, '[': 278, '\\': 278, ']': 278, '^': 469, '_': 556,
    '`': 333, 'a': 556, 'b': 556, 'c': 500, 'd': 556, 'e': 556, 'f': 278, 'g': 556,
    'h': 556, 'i': 222, 'j': 222, 'k': 500, 'l': 222, 'm': 833, 'n': 556, 'o': 556,
    'p': 556, 'q': 556, 'r': 333, 's': 500, 't': 278, 'u': 556, 'v': 500, 'w': 722,
    'x': 500, 'y': 500, 'z': 500, '{': 334, '|': 260, '}': 334, '~': 584
}

def text_width(text, font_size, is_bold=False, is_mono=False):
    if is_mono:
        return len(text) * font_size * 0.60
    total = 0
    multiplier = 1.05 if is_bold else 1.00
    for char in text:
        w = HELVETICA_WIDTHS.get(char, 550)
        total += (w / 1000.0) * font_size * multiplier
    return total

def escape_pdf_text(text):
    # Escape parenthesis and backslashes for PDF string literal
    res = ''
    for c in text:
        if c == '(':
            res += '\\('
        elif c == ')':
            res += '\\)'
        elif c == '\\':
            res += '\\\\'
        elif ord(c) < 32 or ord(c) > 126:
            # Map non-ascii or Unicode to clean ASCII representation
            if c in ['“', '”']:
                res += '"'
            elif c in ['‘', '’']:
                res += "'"
            elif c in ['—', '–']:
                res += '-'
            elif c == '•':
                res += '*'
            elif c == '₹':
                res += 'INR '
            else:
                res += ' '
        else:
            res += c
    return res

def wrap_text(text, max_width, font_size, is_bold=False, is_mono=False):
    words = text.split(' ')
    lines = []
    cur_line = []
    
    for word in words:
        test_line = ' '.join(cur_line + [word])
        w = text_width(test_line, font_size, is_bold, is_mono)
        if w <= max_width or not cur_line:
            cur_line.append(word)
        else:
            lines.append(' '.join(cur_line))
            cur_line = [word]
            
    if cur_line:
        lines.append(' '.join(cur_line))
    return lines

class PDFPage:
    def __init__(self, page_num):
        self.page_num = page_num
        self.stream = []
        self.links = [] # (x1, y1, x2, y2, url)

    def add_rect(self, x, y, w, h, fill_rgb=None, stroke_rgb=None, line_width=1.0):
        cmd = []
        cmd.append(f"{line_width:.2f} w")
        if fill_rgb and stroke_rgb:
            cmd.append(f"{fill_rgb[0]:.3f} {fill_rgb[1]:.3f} {fill_rgb[2]:.3f} rg")
            cmd.append(f"{stroke_rgb[0]:.3f} {stroke_rgb[1]:.3f} {stroke_rgb[2]:.3f} RG")
            cmd.append(f"{x:.2f} {y:.2f} {w:.2f} {h:.2f} re B")
        elif fill_rgb:
            cmd.append(f"{fill_rgb[0]:.3f} {fill_rgb[1]:.3f} {fill_rgb[2]:.3f} rg")
            cmd.append(f"{x:.2f} {y:.2f} {w:.2f} {h:.2f} re f")
        elif stroke_rgb:
            cmd.append(f"{stroke_rgb[0]:.3f} {stroke_rgb[1]:.3f} {stroke_rgb[2]:.3f} RG")
            cmd.append(f"{x:.2f} {y:.2f} {w:.2f} {h:.2f} re S")
        self.stream.append('\n'.join(cmd))

    def add_line(self, x1, y1, x2, y2, stroke_rgb=(0, 0, 0), line_width=1.0):
        cmd = [
            f"{line_width:.2f} w",
            f"{stroke_rgb[0]:.3f} {stroke_rgb[1]:.3f} {stroke_rgb[2]:.3f} RG",
            f"{x1:.2f} {y1:.2f} m {x2:.2f} {y2:.2f} l S"
        ]
        self.stream.append('\n'.join(cmd))

    def add_text(self, text, x, y, font_name, font_size, fill_rgb=(0, 0, 0)):
        escaped = escape_pdf_text(text)
        cmd = [
            "BT",
            f"/{font_name} {font_size:.2f} Tf",
            f"{fill_rgb[0]:.3f} {fill_rgb[1]:.3f} {fill_rgb[2]:.3f} rg",
            f"{x:.2f} {y:.2f} Td",
            f"({escaped}) Tj",
            "ET"
        ]
        self.stream.append('\n'.join(cmd))

    def add_link(self, x1, y1, x2, y2, url):
        self.links.append((x1, y1, x2, y2, url))

class PDFDocument:
    def __init__(self, title, doc_code, doc_type="PRIVACY POLICY"):
        self.title = title
        self.doc_code = doc_code
        self.doc_type = doc_type
        self.pages = []
        self.current_page = None
        self.cursor_y = PAGE_HEIGHT - MARGIN_TOP

    def new_page(self):
        page_num = len(self.pages) + 1
        page = PDFPage(page_num)
        self.pages.append(page)
        self.current_page = page
        self.cursor_y = PAGE_HEIGHT - MARGIN_TOP
        return page

    def check_space(self, needed_height):
        if self.cursor_y - needed_height < MARGIN_BOTTOM + 25:
            self.new_page()
            return True
        return False

    def draw_running_decorations(self, total_pages):
        for page in self.pages:
            p_num = page.page_num
            # Running Header (pages > 1)
            if p_num > 1:
                page.add_text("FUZAILVERSE // LEGAL SPECIFICATION", MARGIN_LEFT, PAGE_HEIGHT - 32, "F2", 8, (0.45, 0.45, 0.45))
                page.add_text(f"{self.doc_type} // {self.doc_code}", MARGIN_LEFT + 220, PAGE_HEIGHT - 32, "F4", 8, (0.2, 0.8, 0.4))
                page.add_line(MARGIN_LEFT, PAGE_HEIGHT - 38, PAGE_WIDTH - MARGIN_RIGHT, PAGE_HEIGHT - 38, (0.85, 0.85, 0.85), 0.75)
                page.add_line(MARGIN_LEFT, PAGE_HEIGHT - 38, MARGIN_LEFT + 75, PAGE_HEIGHT - 38, (0.0, 0.85, 0.4), 1.5)

            # Running Footer on all pages
            page.add_line(MARGIN_LEFT, MARGIN_BOTTOM - 12, PAGE_WIDTH - MARGIN_RIGHT, MARGIN_BOTTOM - 12, (0.85, 0.85, 0.85), 0.75)
            page.add_line(PAGE_WIDTH - MARGIN_RIGHT - 75, MARGIN_BOTTOM - 12, PAGE_WIDTH - MARGIN_RIGHT, MARGIN_BOTTOM - 12, (0.0, 0.85, 0.4), 1.5)
            
            # Left: Brand
            page.add_text("FUZAILVERSE · MOHAMMAD FUZAIL · SYSTEMS ARCHITECT", MARGIN_LEFT, MARGIN_BOTTOM - 25, "F2", 7.5, (0.4, 0.4, 0.4))
            
            # Center: Confidential & Official
            page.add_text("OFFICIAL LEGAL DOSSIER · PRODUCTION VERIFIED", MARGIN_LEFT + 195, MARGIN_BOTTOM - 25, "F4", 7.0, (0.5, 0.5, 0.5))
            
            # Right: Page X of Y
            page_str = f"Page {p_num} of {total_pages}"
            page.add_text(page_str, PAGE_WIDTH - MARGIN_RIGHT - 55, MARGIN_BOTTOM - 25, "F2", 8.0, (0.2, 0.2, 0.2))

            # Bottom links
            page.add_text("Contact: mohdfuzail.dev@gmail.com", MARGIN_LEFT, MARGIN_BOTTOM - 36, "F4", 7.0, (0.0, 0.5, 0.3))
            page.add_link(MARGIN_LEFT, MARGIN_BOTTOM - 38, MARGIN_LEFT + 160, MARGIN_BOTTOM - 28, "mailto:mohdfuzail.dev@gmail.com")
            
            page.add_text("https://fuzailverse.pages.dev/", PAGE_WIDTH - MARGIN_RIGHT - 110, MARGIN_BOTTOM - 36, "F4", 7.0, (0.0, 0.5, 0.3))
            page.add_link(PAGE_WIDTH - MARGIN_RIGHT - 110, MARGIN_BOTTOM - 38, PAGE_WIDTH - MARGIN_RIGHT, MARGIN_BOTTOM - 28, "https://fuzailverse.pages.dev/")

    def build_pdf_bytes(self):
        total_pages = len(self.pages)
        self.draw_running_decorations(total_pages)

        objs = [None, None] # Reserve 1 (Catalog) and 2 (Pages)
        
        # Fonts: F1 (Helvetica), F2 (Helvetica-Bold), F3 (Helvetica-Oblique), F4 (Courier), F5 (Courier-Bold)
        f1_id = len(objs) + 1; objs.append(b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>')
        f2_id = len(objs) + 1; objs.append(b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>')
        f3_id = len(objs) + 1; objs.append(b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>')
        f4_id = len(objs) + 1; objs.append(b'<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>')
        f5_id = len(objs) + 1; objs.append(b'<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>')

        font_res_str = f'/Font << /F1 {f1_id} 0 R /F2 {f2_id} 0 R /F3 {f3_id} 0 R /F4 {f4_id} 0 R /F5 {f5_id} 0 R >>'

        page_ids = []
        for page in self.pages:
            # Annots
            annot_ids = []
            for (x1, y1, x2, y2, url) in page.links:
                annot_obj = (
                    f'<< /Type /Annot /Subtype /Link /Rect [{x1:.2f} {y1:.2f} {x2:.2f} {y2:.2f}] '
                    f'/Border [0 0 0] /A << /S /URI /URI ({escape_pdf_text(url)}) >> >>'
                ).encode('latin1')
                a_id = len(objs) + 1
                objs.append(annot_obj)
                annot_ids.append(f'{a_id} 0 R')

            annots_str = f'/Annots [{" ".join(annot_ids)}]' if annot_ids else ''

            # Stream
            full_stream_text = '\n'.join(page.stream).encode('latin1')
            compressed = zlib.compress(full_stream_text)
            sid = len(objs) + 1
            objs.append(
                f'<< /Filter /FlateDecode /Length {len(compressed)} >>\nstream\n'.encode('latin1') +
                compressed +
                b'\nendstream'
            )

            # Page obj
            pid = len(objs) + 1
            page_obj_str = (
                f'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PAGE_WIDTH:.2f} {PAGE_HEIGHT:.2f}] '
                f'/Contents {sid} 0 R /Resources << {font_res_str} >> {annots_str} >>'
            ).encode('latin1')
            objs.append(page_obj_str)
            page_ids.append(f'{pid} 0 R')

        # Catalog and Pages Root
        objs[0] = b'<< /Type /Catalog /Pages 2 0 R >>'
        objs[1] = f'<< /Type /Pages /Kids [{" ".join(page_ids)}] /Count {len(page_ids)} >>'.encode('latin1')

        # Assemble PDF
        out = bytearray(b'%PDF-1.4\n%\xe2\xe3\xcf\xd3\n')
        offsets = [0]
        for i, od in enumerate(objs, 1):
            offsets.append(len(out))
            out.extend(f'{i} 0 obj\n'.encode('latin1'))
            out.extend(od)
            out.extend(b'\nendobj\n')

        xref_pos = len(out)
        out.extend(f'xref\n0 {len(objs)+1}\n0000000000 65535 f \n'.encode('latin1'))
        for off in offsets[1:]:
            out.extend(f'{off:010d} 00000 n \n'.encode('latin1'))
        out.extend(f'trailer\n<< /Size {len(objs)+1} /Root 1 0 R >>\nstartxref\n{xref_pos}\n%%EOF\n'.encode('latin1'))
        return out


def generate_privacy_policy_pdf(data_json_path, output_path):
    with open(data_json_path, 'r', encoding='utf-8') as f:
        full_data = json.load(f)

    pp_data = full_data['privacyPolicyData']
    meta = pp_data['metadata']

    doc = PDFDocument(title=meta['title'], doc_code=meta['documentCode'], doc_type="PRIVACY POLICY")
    page = doc.new_page()

    # --- COVER / HEADER BLOCK ---
    # Dark charcoal banner with neon-green left border
    banner_height = 108.0
    doc.cursor_y -= banner_height
    page.add_rect(MARGIN_LEFT, doc.cursor_y, CONTENT_WIDTH, banner_height, fill_rgb=(0.06, 0.08, 0.12), stroke_rgb=(0.18, 0.22, 0.28), line_width=1.0)
    page.add_rect(MARGIN_LEFT, doc.cursor_y, 4.0, banner_height, fill_rgb=(0.0, 0.9, 0.45)) # Neon green bar

    # Header text
    page.add_text("FUZAILVERSE LEGAL ARCHITECTURE // SPECIFICATION DOSSIER", MARGIN_LEFT + 16, doc.cursor_y + 86, "F4", 8.5, (0.0, 0.9, 0.45))
    page.add_text("PRIVACY POLICY", MARGIN_LEFT + 16, doc.cursor_y + 56, "F2", 22.0, (1.0, 1.0, 1.0))
    page.add_text("COMPREHENSIVE DATA GOVERNANCE & MOBILE PERMISSIONS DISCLOSURE", MARGIN_LEFT + 16, doc.cursor_y + 40, "F2", 9.0, (0.85, 0.88, 0.92))
    
    meta_line = f"CODE: {meta['documentCode']}   |   VERSION: {meta['version']}   |   EFFECTIVE: {meta['effectiveDate'].upper()}"
    page.add_text(meta_line, MARGIN_LEFT + 16, doc.cursor_y + 20, "F4", 7.5, (0.6, 0.65, 0.72))
    
    # Sub-meta details box
    doc.cursor_y -= 14
    doc.cursor_y -= 42
    page.add_rect(MARGIN_LEFT, doc.cursor_y, CONTENT_WIDTH, 42, fill_rgb=(0.96, 0.97, 0.98), stroke_rgb=(0.85, 0.88, 0.92), line_width=0.75)
    page.add_text("OPERATOR: Mohammad Fuzail (Lead Systems Architect)", MARGIN_LEFT + 12, doc.cursor_y + 27, "F2", 8.0, (0.1, 0.15, 0.2))
    page.add_text("LOCATION: New Delhi, India", MARGIN_LEFT + 290, doc.cursor_y + 27, "F4", 8.0, (0.3, 0.35, 0.4))
    page.add_text(f"WEBSITE: {meta['websiteUrl']}", MARGIN_LEFT + 12, doc.cursor_y + 11, "F4", 7.5, (0.0, 0.45, 0.8))
    page.add_link(MARGIN_LEFT + 12, doc.cursor_y + 8, MARGIN_LEFT + 250, doc.cursor_y + 20, meta['websiteUrl'])
    page.add_text(f"CONTACT: {meta['contactEmail']}", MARGIN_LEFT + 290, doc.cursor_y + 11, "F4", 7.5, (0.0, 0.5, 0.3))
    page.add_link(MARGIN_LEFT + 290, doc.cursor_y + 8, MARGIN_LEFT + 480, doc.cursor_y + 20, f"mailto:{meta['contactEmail']}")

    doc.cursor_y -= 16

    # Executive Summary Paragraph
    doc.cursor_y -= 12
    summary_lines = wrap_text(pp_data['intro']['summary'], CONTENT_WIDTH - 20, 9.5)
    sum_box_h = len(summary_lines) * 13 + 18
    doc.cursor_y -= (sum_box_h - 12)
    page.add_rect(MARGIN_LEFT, doc.cursor_y, CONTENT_WIDTH, sum_box_h, fill_rgb=(0.94, 0.98, 0.95), stroke_rgb=(0.7, 0.9, 0.75), line_width=0.75)
    page.add_rect(MARGIN_LEFT, doc.cursor_y, 3.0, sum_box_h, fill_rgb=(0.0, 0.75, 0.35))
    page.add_text("EXECUTIVE COMPLIANCE SUMMARY:", MARGIN_LEFT + 12, doc.cursor_y + sum_box_h - 13, "F2", 8.5, (0.0, 0.45, 0.2))
    for i, line in enumerate(summary_lines):
        page.add_text(line, MARGIN_LEFT + 12, doc.cursor_y + sum_box_h - 26 - (i * 13), "F1", 9.0, (0.15, 0.2, 0.15))

    doc.cursor_y -= 20

    # --- TABLE OF CONTENTS ---
    doc.cursor_y -= 20
    page.add_text("TABLE OF CONTENTS // SECTIONS INDEX", MARGIN_LEFT, doc.cursor_y, "F2", 11.0, (0.1, 0.15, 0.2))
    page.add_line(MARGIN_LEFT, doc.cursor_y - 4, MARGIN_LEFT + 230, doc.cursor_y - 4, (0.0, 0.85, 0.4), 1.5)
    doc.cursor_y -= 14

    toc_items = [(s['number'], s['title']) for s in pp_data['generalSections']]
    toc_items.append(('APP', 'App-Specific Privacy Disclosures (8 Production Systems)'))

    # Draw 2-column TOC
    half = (len(toc_items) + 1) // 2
    col_w = CONTENT_WIDTH / 2.0
    toc_start_y = doc.cursor_y
    for i, (num, title) in enumerate(toc_items):
        col = 0 if i < half else 1
        row = i if i < half else i - half
        item_y = toc_start_y - (row * 14.0)
        item_x = MARGIN_LEFT if col == 0 else MARGIN_LEFT + col_w + 10
        label = f"[{num}] {title}"
        if len(label) > 38:
            label = label[:36] + '...'
        page.add_text(label, item_x, item_y, "F4", 8.0, (0.25, 0.3, 0.35))

    doc.cursor_y = toc_start_y - (half * 14.0) - 24

    # --- GENERAL SECTIONS ---
    for sec in pp_data['generalSections']:
        doc.check_space(70)
        page = doc.current_page
        
        # Section Header
        sec_header = f"[{sec['number']}] {sec['title'].upper()}"
        doc.cursor_y -= 16
        page.add_rect(MARGIN_LEFT, doc.cursor_y - 2, CONTENT_WIDTH, 18, fill_rgb=(0.94, 0.95, 0.97), stroke_rgb=None)
        page.add_rect(MARGIN_LEFT, doc.cursor_y - 2, 3, 18, fill_rgb=(0.0, 0.8, 0.4))
        page.add_text(sec_header, MARGIN_LEFT + 10, doc.cursor_y + 2, "F2", 10.5, (0.08, 0.12, 0.18))
        doc.cursor_y -= 12

        # Section Paragraphs
        for p in sec.get('paragraphs', []):
            lines = wrap_text(p, CONTENT_WIDTH, 9.0)
            doc.check_space(len(lines) * 13 + 6)
            page = doc.current_page
            for line in lines:
                doc.cursor_y -= 13
                page.add_text(line, MARGIN_LEFT, doc.cursor_y, "F1", 9.0, (0.2, 0.22, 0.26))
            doc.cursor_y -= 4

        # Section Bullet Points
        for bp in sec.get('bulletPoints', []):
            lines = wrap_text(bp, CONTENT_WIDTH - 20, 8.5)
            doc.check_space(len(lines) * 12 + 4)
            page = doc.current_page
            doc.cursor_y -= 12
            page.add_text("*", MARGIN_LEFT + 6, doc.cursor_y, "F2", 9.0, (0.0, 0.7, 0.35))
            page.add_text(lines[0], MARGIN_LEFT + 18, doc.cursor_y, "F1", 8.5, (0.22, 0.25, 0.28))
            for line in lines[1:]:
                doc.cursor_y -= 12
                page.add_text(line, MARGIN_LEFT + 18, doc.cursor_y, "F1", 8.5, (0.22, 0.25, 0.28))

        # Subsections
        for sub in sec.get('subsections', []):
            doc.check_space(45)
            page = doc.current_page
            doc.cursor_y -= 12
            page.add_text(sub['subtitle'], MARGIN_LEFT + 6, doc.cursor_y, "F2", 9.5, (0.12, 0.18, 0.25))
            doc.cursor_y -= 4

            for p in sub.get('content', []):
                lines = wrap_text(p, CONTENT_WIDTH - 12, 8.5)
                doc.check_space(len(lines) * 12 + 4)
                page = doc.current_page
                for line in lines:
                    doc.cursor_y -= 12
                    page.add_text(line, MARGIN_LEFT + 8, doc.cursor_y, "F1", 8.5, (0.22, 0.25, 0.28))
                doc.cursor_y -= 3

            for bp in sub.get('bulletPoints', []):
                lines = wrap_text(bp, CONTENT_WIDTH - 24, 8.0)
                doc.check_space(len(lines) * 11 + 4)
                page = doc.current_page
                doc.cursor_y -= 11
                page.add_text("-", MARGIN_LEFT + 14, doc.cursor_y, "F2", 8.5, (0.0, 0.6, 0.3))
                page.add_text(lines[0], MARGIN_LEFT + 24, doc.cursor_y, "F1", 8.0, (0.22, 0.25, 0.28))
                for line in lines[1:]:
                    doc.cursor_y -= 11
                    page.add_text(line, MARGIN_LEFT + 24, doc.cursor_y, "F1", 8.0, (0.22, 0.25, 0.28))

        doc.cursor_y -= 8

    # --- APP SPECIFIC DISCLOSURES SECTION ---
    doc.new_page()
    page = doc.current_page
    doc.cursor_y -= 25
    page.add_rect(MARGIN_LEFT, doc.cursor_y - 4, CONTENT_WIDTH, 26, fill_rgb=(0.06, 0.08, 0.12), stroke_rgb=(0.0, 0.85, 0.4), line_width=1.0)
    page.add_text("APP-SPECIFIC PRIVACY & TELEMETRY DISCLOSURES", MARGIN_LEFT + 12, doc.cursor_y + 8, "F2", 12.0, (1.0, 1.0, 1.0))
    page.add_text("8 PRODUCTION SYSTEMS AUDITED", MARGIN_LEFT + 340, doc.cursor_y + 8, "F4", 8.0, (0.0, 0.9, 0.45))
    doc.cursor_y -= 22

    intro_p = "The following section discloses the exact architectural, permission, and data retention parameters for every individual mobile application and web platform engineered in the FuzailVerse portfolio:"
    for line in wrap_text(intro_p, CONTENT_WIDTH, 9.0):
        doc.cursor_y -= 13
        page.add_text(line, MARGIN_LEFT, doc.cursor_y, "F1", 9.0, (0.3, 0.35, 0.4))
    doc.cursor_y -= 10

    for app in pp_data['appDisclosures']:
        doc.check_space(170)
        page = doc.current_page
        
        # App Card Box Header
        doc.cursor_y -= 18
        card_start_y = doc.cursor_y
        
        # Header banner inside card
        page.add_rect(MARGIN_LEFT, doc.cursor_y - 2, CONTENT_WIDTH, 20, fill_rgb=(0.12, 0.16, 0.22), stroke_rgb=None)
        page.add_rect(MARGIN_LEFT, doc.cursor_y - 2, 4, 20, fill_rgb=(0.0, 0.9, 0.45))
        page.add_text(f"{app['name'].upper()} // {app['category'].upper()}", MARGIN_LEFT + 10, doc.cursor_y + 4, "F2", 10.0, (1.0, 1.0, 1.0))
        page.add_text(f"PLATFORM: {', '.join(app['platform'])}", MARGIN_LEFT + 350, doc.cursor_y + 4, "F4", 7.5, (0.0, 0.9, 0.45))
        doc.cursor_y -= 14

        # Field: Purpose & Context
        doc.cursor_y -= 11
        page.add_text("Purpose & Context: ", MARGIN_LEFT + 8, doc.cursor_y, "F2", 8.0, (0.1, 0.15, 0.2))
        p_lines = wrap_text(f"{app['purpose']} ({app['operationalContext']})", CONTENT_WIDTH - 20, 8.0)
        page.add_text(p_lines[0], MARGIN_LEFT + 95, doc.cursor_y, "F1", 8.0, (0.25, 0.3, 0.35))
        for l in p_lines[1:]:
            doc.cursor_y -= 10
            page.add_text(l, MARGIN_LEFT + 95, doc.cursor_y, "F1", 8.0, (0.25, 0.3, 0.35))

        # Field: Permissions
        doc.cursor_y -= 11
        page.add_text("Hardware Permissions: ", MARGIN_LEFT + 8, doc.cursor_y, "F2", 8.0, (0.1, 0.15, 0.2))
        perm_str = " | ".join([f"{p['name']} ({p['purpose']})" for p in app['permissions']])
        p_lines = wrap_text(perm_str, CONTENT_WIDTH - 20, 7.5, is_mono=True)
        page.add_text(p_lines[0], MARGIN_LEFT + 105, doc.cursor_y, "F4", 7.5, (0.3, 0.35, 0.4))
        for l in p_lines[1:]:
            doc.cursor_y -= 10
            page.add_text(l, MARGIN_LEFT + 105, doc.cursor_y, "F4", 7.5, (0.3, 0.35, 0.4))

        # Field: Data Collected
        doc.cursor_y -= 11
        page.add_text("Data Collected: ", MARGIN_LEFT + 8, doc.cursor_y, "F2", 8.0, (0.1, 0.15, 0.2))
        dc_str = f"Personal: {', '.join(app['dataCollected']['personal'])} | Tech: {', '.join(app['dataCollected']['technical'])} | Sensitive: {', '.join(app['dataCollected']['sensitive'])}"
        dc_lines = wrap_text(dc_str, CONTENT_WIDTH - 20, 8.0)
        page.add_text(dc_lines[0], MARGIN_LEFT + 85, doc.cursor_y, "F1", 8.0, (0.25, 0.3, 0.35))
        for l in dc_lines[1:]:
            doc.cursor_y -= 10
            page.add_text(l, MARGIN_LEFT + 85, doc.cursor_y, "F1", 8.0, (0.25, 0.3, 0.35))

        # Field: Local Storage & Transmission
        doc.cursor_y -= 11
        page.add_text("Local Processing: ", MARGIN_LEFT + 8, doc.cursor_y, "F2", 8.0, (0.1, 0.15, 0.2))
        lp_str = "; ".join(app['localDataProcessing'])
        lp_lines = wrap_text(lp_str, CONTENT_WIDTH - 20, 8.0)
        page.add_text(lp_lines[0], MARGIN_LEFT + 95, doc.cursor_y, "F1", 8.0, (0.25, 0.3, 0.35))
        for l in lp_lines[1:]:
            doc.cursor_y -= 10
            page.add_text(l, MARGIN_LEFT + 95, doc.cursor_y, "F1", 8.0, (0.25, 0.3, 0.35))

        # Field: External Transmission
        doc.cursor_y -= 11
        page.add_text("Transmission: ", MARGIN_LEFT + 8, doc.cursor_y, "F2", 8.0, (0.1, 0.15, 0.2))
        et_str = "; ".join(app['externalTransmission'])
        et_lines = wrap_text(et_str, CONTENT_WIDTH - 20, 8.0)
        page.add_text(et_lines[0], MARGIN_LEFT + 80, doc.cursor_y, "F1", 8.0, (0.25, 0.3, 0.35))
        for l in et_lines[1:]:
            doc.cursor_y -= 10
            page.add_text(l, MARGIN_LEFT + 80, doc.cursor_y, "F1", 8.0, (0.25, 0.3, 0.35))

        # Field: SDKs & Ads
        doc.cursor_y -= 11
        page.add_text("SDKs & Tracking: ", MARGIN_LEFT + 8, doc.cursor_y, "F2", 8.0, (0.1, 0.15, 0.2))
        sdk_str = f"Analytics: {', '.join(app['analyticsSdk'])} | Crashlytics: {', '.join(app['crashReportingSdk'])} | Ads: {', '.join(app['advertisingSdk'])}"
        sdk_lines = wrap_text(sdk_str, CONTENT_WIDTH - 20, 8.0)
        page.add_text(sdk_lines[0], MARGIN_LEFT + 90, doc.cursor_y, "F1", 8.0, (0.25, 0.3, 0.35))
        for l in sdk_lines[1:]:
            doc.cursor_y -= 10
            page.add_text(l, MARGIN_LEFT + 90, doc.cursor_y, "F1", 8.0, (0.25, 0.3, 0.35))

        # Field: Retention & Deletion
        doc.cursor_y -= 11
        page.add_text("Retention & Deletion: ", MARGIN_LEFT + 8, doc.cursor_y, "F2", 8.0, (0.1, 0.15, 0.2))
        ret_str = f"{app['dataRetention']} Deletion: {app['dataDeletion']}"
        ret_lines = wrap_text(ret_str, CONTENT_WIDTH - 20, 8.0)
        page.add_text(ret_lines[0], MARGIN_LEFT + 105, doc.cursor_y, "F1", 8.0, (0.25, 0.3, 0.35))
        for l in ret_lines[1:]:
            doc.cursor_y -= 10
            page.add_text(l, MARGIN_LEFT + 105, doc.cursor_y, "F1", 8.0, (0.25, 0.3, 0.35))

        # Card Border stroke around all content
        card_end_y = doc.cursor_y - 6
        card_total_h = card_start_y - card_end_y
        page.add_rect(MARGIN_LEFT, card_end_y, CONTENT_WIDTH, card_total_h, fill_rgb=None, stroke_rgb=(0.82, 0.85, 0.9), line_width=0.75)
        doc.cursor_y = card_end_y - 12

    pdf_bytes = doc.build_pdf_bytes()
    with open(output_path, 'wb') as f:
        f.write(pdf_bytes)
    print(f"Generated {output_path} ({len(pdf_bytes)} bytes, {len(doc.pages)} pages)")


def generate_terms_conditions_pdf(data_json_path, output_path):
    with open(data_json_path, 'r', encoding='utf-8') as f:
        full_data = json.load(f)

    tc_data = full_data['termsConditionsData']
    meta = tc_data['metadata']

    doc = PDFDocument(title=meta['title'], doc_code=meta['documentCode'], doc_type="TERMS & CONDITIONS")
    page = doc.new_page()

    # --- COVER / HEADER BLOCK ---
    banner_height = 108.0
    doc.cursor_y -= banner_height
    page.add_rect(MARGIN_LEFT, doc.cursor_y, CONTENT_WIDTH, banner_height, fill_rgb=(0.06, 0.08, 0.12), stroke_rgb=(0.18, 0.22, 0.28), line_width=1.0)
    page.add_rect(MARGIN_LEFT, doc.cursor_y, 4.0, banner_height, fill_rgb=(0.0, 0.9, 0.45))

    page.add_text("FUZAILVERSE LEGAL SPECIFICATION // OPERATIONAL TERMS", MARGIN_LEFT + 16, doc.cursor_y + 86, "F4", 8.5, (0.0, 0.9, 0.45))
    page.add_text("TERMS & CONDITIONS", MARGIN_LEFT + 16, doc.cursor_y + 56, "F2", 22.0, (1.0, 1.0, 1.0))
    page.add_text("STANDARD TERMS OF SERVICE & SOFTWARE LICENSING AGREEMENT", MARGIN_LEFT + 16, doc.cursor_y + 40, "F2", 9.0, (0.85, 0.88, 0.92))
    
    meta_line = f"CODE: {meta['documentCode']}   |   VERSION: {meta['version']}   |   EFFECTIVE: {meta['effectiveDate'].upper()}"
    page.add_text(meta_line, MARGIN_LEFT + 16, doc.cursor_y + 20, "F4", 7.5, (0.6, 0.65, 0.72))
    
    doc.cursor_y -= 14
    doc.cursor_y -= 42
    page.add_rect(MARGIN_LEFT, doc.cursor_y, CONTENT_WIDTH, 42, fill_rgb=(0.96, 0.97, 0.98), stroke_rgb=(0.85, 0.88, 0.92), line_width=0.75)
    page.add_text("OPERATOR: Mohammad Fuzail (Lead Systems Architect)", MARGIN_LEFT + 12, doc.cursor_y + 27, "F2", 8.0, (0.1, 0.15, 0.2))
    page.add_text("JURISDICTION: New Delhi, India", MARGIN_LEFT + 290, doc.cursor_y + 27, "F4", 8.0, (0.3, 0.35, 0.4))
    page.add_text(f"WEBSITE: {meta['websiteUrl']}", MARGIN_LEFT + 12, doc.cursor_y + 11, "F4", 7.5, (0.0, 0.45, 0.8))
    page.add_link(MARGIN_LEFT + 12, doc.cursor_y + 8, MARGIN_LEFT + 250, doc.cursor_y + 20, meta['websiteUrl'])
    page.add_text(f"CONTACT: {meta['contactEmail']}", MARGIN_LEFT + 290, doc.cursor_y + 11, "F4", 7.5, (0.0, 0.5, 0.3))
    page.add_link(MARGIN_LEFT + 290, doc.cursor_y + 8, MARGIN_LEFT + 480, doc.cursor_y + 20, f"mailto:{meta['contactEmail']}")

    doc.cursor_y -= 16

    # Executive Summary Paragraph
    doc.cursor_y -= 12
    summary_lines = wrap_text(tc_data['intro']['summary'], CONTENT_WIDTH - 20, 9.5)
    sum_box_h = len(summary_lines) * 13 + 18
    doc.cursor_y -= (sum_box_h - 12)
    page.add_rect(MARGIN_LEFT, doc.cursor_y, CONTENT_WIDTH, sum_box_h, fill_rgb=(0.94, 0.98, 0.95), stroke_rgb=(0.7, 0.9, 0.75), line_width=0.75)
    page.add_rect(MARGIN_LEFT, doc.cursor_y, 3.0, sum_box_h, fill_rgb=(0.0, 0.75, 0.35))
    page.add_text("LEGAL BINDING DECLARATION:", MARGIN_LEFT + 12, doc.cursor_y + sum_box_h - 13, "F2", 8.5, (0.0, 0.45, 0.2))
    for i, line in enumerate(summary_lines):
        page.add_text(line, MARGIN_LEFT + 12, doc.cursor_y + sum_box_h - 26 - (i * 13), "F1", 9.0, (0.15, 0.2, 0.15))

    doc.cursor_y -= 20

    # --- TABLE OF CONTENTS ---
    doc.cursor_y -= 20
    page.add_text("TABLE OF CONTENTS // OPERATIONAL CLAUSES", MARGIN_LEFT, doc.cursor_y, "F2", 11.0, (0.1, 0.15, 0.2))
    page.add_line(MARGIN_LEFT, doc.cursor_y - 4, MARGIN_LEFT + 230, doc.cursor_y - 4, (0.0, 0.85, 0.4), 1.5)
    doc.cursor_y -= 14

    toc_items = [(s['number'], s['title']) for s in tc_data['sections']]
    half = (len(toc_items) + 1) // 2
    col_w = CONTENT_WIDTH / 2.0
    toc_start_y = doc.cursor_y
    for i, (num, title) in enumerate(toc_items):
        col = 0 if i < half else 1
        row = i if i < half else i - half
        item_y = toc_start_y - (row * 14.0)
        item_x = MARGIN_LEFT if col == 0 else MARGIN_LEFT + col_w + 10
        label = f"[{num}] {title}"
        if len(label) > 38:
            label = label[:36] + '...'
        page.add_text(label, item_x, item_y, "F4", 8.0, (0.25, 0.3, 0.35))

    doc.cursor_y = toc_start_y - (half * 14.0) - 24

    # --- SECTIONS ---
    for sec in tc_data['sections']:
        doc.check_space(65)
        page = doc.current_page
        
        # Section Header
        sec_header = f"[{sec['number']}] {sec['title'].upper()}"
        doc.cursor_y -= 16
        page.add_rect(MARGIN_LEFT, doc.cursor_y - 2, CONTENT_WIDTH, 18, fill_rgb=(0.94, 0.95, 0.97), stroke_rgb=None)
        page.add_rect(MARGIN_LEFT, doc.cursor_y - 2, 3, 18, fill_rgb=(0.0, 0.8, 0.4))
        page.add_text(sec_header, MARGIN_LEFT + 10, doc.cursor_y + 2, "F2", 10.5, (0.08, 0.12, 0.18))
        doc.cursor_y -= 12

        # Section Paragraphs
        for p in sec.get('paragraphs', []):
            lines = wrap_text(p, CONTENT_WIDTH, 9.0)
            doc.check_space(len(lines) * 13 + 6)
            page = doc.current_page
            for line in lines:
                doc.cursor_y -= 13
                page.add_text(line, MARGIN_LEFT, doc.cursor_y, "F1", 9.0, (0.2, 0.22, 0.26))
            doc.cursor_y -= 4

        # Bullet Points
        for bp in sec.get('bulletPoints', []):
            lines = wrap_text(bp, CONTENT_WIDTH - 20, 8.5)
            doc.check_space(len(lines) * 12 + 4)
            page = doc.current_page
            doc.cursor_y -= 12
            page.add_text("*", MARGIN_LEFT + 6, doc.cursor_y, "F2", 9.0, (0.0, 0.7, 0.35))
            page.add_text(lines[0], MARGIN_LEFT + 18, doc.cursor_y, "F1", 8.5, (0.22, 0.25, 0.28))
            for line in lines[1:]:
                doc.cursor_y -= 12
                page.add_text(line, MARGIN_LEFT + 18, doc.cursor_y, "F1", 8.5, (0.22, 0.25, 0.28))

        doc.cursor_y -= 8

    pdf_bytes = doc.build_pdf_bytes()
    with open(output_path, 'wb') as f:
        f.write(pdf_bytes)
    print(f"Generated {output_path} ({len(pdf_bytes)} bytes, {len(doc.pages)} pages)")


def main():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_path = os.path.join(root_dir, 'src', 'data', 'legalData.json')
    docs_dir = os.path.join(root_dir, 'public', 'documents')
    os.makedirs(docs_dir, exist_ok=True)

    pp_pdf = os.path.join(docs_dir, 'FuzailVerse_Privacy_Policy.pdf')
    tc_pdf = os.path.join(docs_dir, 'FuzailVerse_Terms_and_Conditions.pdf')
    legacy_pp = os.path.join(docs_dir, 'privacy-policy.pdf')
    legacy_tc = os.path.join(docs_dir, 'terms-and-conditions.pdf')

    print("Generating FuzailVerse Privacy Policy PDF...")
    generate_privacy_policy_pdf(json_path, pp_pdf)

    print("Generating FuzailVerse Terms & Conditions PDF...")
    generate_terms_conditions_pdf(json_path, tc_pdf)

    # Also copy to legacy filenames for 100% backward compatibility with prior links
    import shutil
    shutil.copyfile(pp_pdf, legacy_pp)
    shutil.copyfile(tc_pdf, legacy_tc)
    print("Copied to backward-compatible legacy filenames in public/documents/.")


if __name__ == '__main__':
    main()

