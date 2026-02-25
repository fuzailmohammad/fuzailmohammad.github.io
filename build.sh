#!/bin/bash

echo "Building optimized portfolio..."

rm -rf dist

npm run build

echo "Copying static assets..."
cp public/logo.svg dist/
cp public/.nojekyll dist/

if [ -f "public/Mohammad Fuzail - Flutter Developer.pdf" ]; then
    cp "public/Mohammad Fuzail - Flutter Developer.pdf" dist/ 2>/dev/null || echo "PDF file in use, skipping..."
fi

echo "Build complete!"
ls -lh dist/
