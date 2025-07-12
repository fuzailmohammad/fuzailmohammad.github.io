// Projects data and functionality
class ProjectsManager {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: "Parker Loyalty Platform",
                subtitle: "Enterprise B2B Loyalty Management",
                description: "Built comprehensive loyalty platform with 4 role-based dashboards, real-time progress tracking, and rewards system. Enabled invoice uploads and point redemption for sales teams.",
                technologies: ["Flutter", "Dart", "REST API", "Firebase"],
                image: "🏢",
                links: {
                    website: "https://parkerpartners.in/",
                    github: null
                },
                featured: true,
                category: "Enterprise"
            },
            {
                id: 2,
                title: "DigiSpark MINDA",
                subtitle: "Automotive Aftermarket E-commerce",
                description: "Developed official Spark Minda aftermarket app revolutionizing parts distribution. Features advanced search filters, PDF catalog downloads, and 24/7 support for distributors and mechanics.",
                technologies: ["Flutter", "Dart", "E-commerce API", "PDF Integration"],
                image: "🚗",
                links: {
                    playstore: "https://play.google.com/store/apps/details?id=com.digispark.minda",
                    appstore: "https://apps.apple.com/in/app/digispark/id6737222362"
                },
                featured: true,
                category: "E-commerce"
            },
            {
                id: 3,
                title: "Classmate Star Club",
                subtitle: "Retail Loyalty & Rewards",
                description: "Created gamified loyalty app increasing retention by 60%. Integrated Firebase Analytics/Crashlytics for real-time monitoring and performance optimization.",
                technologies: ["Flutter", "Firebase", "Analytics", "Gamification"],
                image: "⭐",
                links: {
                    playstore: "https://play.google.com/store/apps/details?id=com.almond.itc_starClub",
                    appstore: "https://apps.apple.com/in/app/classmate-star-club/id6738471876"
                },
                featured: true,
                category: "Retail"
            },
            {
                id: 4,
                title: "FieldPulse by TASC",
                subtitle: "Field Operations & Retail Intelligence",
                description: "Built intelligent field operations platform with geo-tagged task tracking, custom dashboards, and real-time sales intelligence for retail and logistics teams.",
                technologies: ["Flutter", "Geolocation", "Real-time Data", "Dashboard"],
                image: "📊",
                links: {
                    playstore: "https://play.google.com/store/apps/details?id=com.tasc.app",
                    appstore: "https://apps.apple.com/in/app/fieldpulse-by-tasc/id6738619517"
                },
                featured: true,
                category: "Operations"
            },
            {
                id: 5,
                title: "PepsiCo Growth Club",
                subtitle: "Channel Partner Management",
                description: "Developed sales tracking and rewards gateway for channel partners. Features real-time progress monitoring, data-driven insights, and partnership collaboration tools.",
                technologies: ["Flutter", "Sales Analytics", "Partner Portal", "Rewards"],
                image: "🥤",
                links: {
                    playstore: "https://play.google.com/store/apps/details?id=com.almond.pepsicoapp",
                    appstore: "https://apps.apple.com/in/app/growth-club-app/id6474480095"
                },
                featured: true,
                category: "Sales"
            },
            {
                id: 6,
                title: "InClinic Assistant",
                subtitle: "Healthcare Management Solution",
                description: "Built secure healthcare app with Firebase OTP authentication, encrypted data handling, and offline-first architecture using SQFLite for medical records management.",
                technologies: ["Flutter", "SQLite", "Healthcare", "Security"],
                image: "🏥",
                links: {
                    playstore: "https://play.google.com/store/apps/details?id=com.gt.inclinicapp",
                    appstore: null
                },
                featured: false,
                category: "Healthcare"
            }
        ];
        
        this.init();
    }

    init() {
        this.renderProjects();
        this.setupProjectFilters();
        this.setupProjectModals();
    }

    renderProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;

        const featuredProjects = this.projects.filter(project => project.featured);
        
        projectsGrid.innerHTML = featuredProjects.map(project => 
            this.createProjectCard(project)
        ).join('');

        // Add animation classes
        this.animateProjectCards();
    }

    createProjectCard(project) {
        const links = this.generateProjectLinks(project.links);
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        return `
            <div class="project-card" data-category="${project.category}" data-project-id="${project.id}">
                <div class="project-image">
                    ${project.image}
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-subtitle">${project.subtitle}</p>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${techTags}
                    </div>
                    <div class="project-links">
                        ${links}
                        <button class="project-link view-details" data-project-id="${project.id}">
                            View Details <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateProjectLinks(links) {
        let linkHTML = '';
        
        if (links.website) {
            linkHTML += `<a href="${links.website}" target="_blank" class="project-link">
                <i class="fas fa-external-link-alt"></i> Website
            </a>`;
        }
        
        if (links.playstore) {
            linkHTML += `<a href="${links.playstore}" target="_blank" class="project-link">
                <i class="fab fa-google-play"></i> Play Store
            </a>`;
        }
        
        if (links.appstore) {
            linkHTML += `<a href="${links.appstore}" target="_blank" class="project-link">
                <i class="fab fa-app-store"></i> App Store
            </a>`;
        }
        
        if (links.github) {
            linkHTML += `<a href="${links.github}" target="_blank" class="project-link">
                <i class="fab fa-github"></i> GitHub
            </a>`;
        }
        
        return linkHTML;
    }

    setupProjectFilters() {
        // Create filter buttons
        const projectsSection = document.querySelector('.projects');
        if (!projectsSection) return;

        const categories = ['All', ...new Set(this.projects.map(p => p.category))];
        
        const filterContainer = document.createElement('div');
        filterContainer.className = 'project-filters';
        filterContainer.innerHTML = `
            <div class="filter-buttons">
                ${categories.map(category => 
                    `<button class="filter-btn ${category === 'All' ? 'active' : ''}" data-filter="${category}">
                        ${category}
                    </button>`
                ).join('')}
            </div>
        `;

        const sectionHeader = projectsSection.querySelector('.section-header');
        sectionHeader.appendChild(filterContainer);

        // Add filter functionality
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.filterProjects(e.target.dataset.filter));
        });
    }

    filterProjects(category) {
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${category}"]`).classList.add('active');

        // Filter and render projects
        const filteredProjects = category === 'All' 
            ? this.projects 
            : this.projects.filter(p => p.category === category);

        const projectsGrid = document.querySelector('.projects-grid');
        projectsGrid.innerHTML = filteredProjects.map(project => 
            this.createProjectCard(project)
        ).join('');

        this.animateProjectCards();
        this.setupProjectModals(); // Re-setup modal triggers
    }

    animateProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupProjectModals() {
        // Setup view details buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = parseInt(btn.dataset.projectId);
                this.showProjectModal(projectId);
            });
        });
    }

    showProjectModal(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal-header">
                        <div class="modal-icon">${project.image}</div>
                        <div class="modal-title-section">
                            <h2>${project.title}</h2>
                            <p>${project.subtitle}</p>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="modal-section">
                            <h3>Project Overview</h3>
                            <p>${project.description}</p>
                        </div>
                        <div class="modal-section">
                            <h3>Technologies Used</h3>
                            <div class="modal-tech-tags">
                                ${project.technologies.map(tech => 
                                    `<span class="tech-tag">${tech}</span>`
                                ).join('')}
                            </div>
                        </div>
                        <div class="modal-section">
                            <h3>Key Features</h3>
                            <ul class="feature-list">
                                ${this.getProjectFeatures(project).map(feature => 
                                    `<li>${feature}</li>`
                                ).join('')}
                            </ul>
                        </div>
                        <div class="modal-links">
                            ${this.generateProjectLinks(project.links)}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeProjectModal(modal);
        });

        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === modal.querySelector('.modal-overlay')) {
                this.closeProjectModal(modal);
            }
        });

        // Animate modal in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'translateY(0) scale(1)';
        }, 10);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeProjectModal(modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'translateY(-50px) scale(0.95)';
        
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }

    getProjectFeatures(project) {
        const features = {
            1: [ // Parker Loyalty Platform
                "Multi-role dashboard system",
                "Real-time progress tracking",
                "Invoice upload functionality",
                "Point redemption system",
                "Sales team management"
            ],
            2: [ // DigiSpark MINDA
                "Advanced search filters",
                "PDF catalog downloads",
                "24/7 customer support",
                "Distributor portal",
                "Mechanic tools integration"
            ],
            3: [ // Classmate Star Club
                "Gamified user experience",
                "60% retention increase",
                "Firebase integration",
                "Real-time analytics",
                "Performance optimization"
            ],
            4: [ // FieldPulse by TASC
                "Geo-tagged task tracking",
                "Custom dashboards",
                "Real-time intelligence",
                "Multi-team coordination",
                "Logistics optimization"
            ],
            5: [ // PepsiCo Growth Club
                "Sales tracking system",
                "Partner collaboration tools",
                "Data-driven insights",
                "Progress monitoring",
                "Rewards gateway"
            ],
            6: [ // InClinic Assistant
                "Firebase OTP authentication",
                "Encrypted data handling",
                "Offline-first architecture",
                "Medical records management",
                "HIPAA compliance"
            ]
        };

        return features[project.id] || [
            "Custom Flutter development",
            "Cross-platform compatibility",
            "Modern UI/UX design",
            "Performance optimization",
            "Quality assurance testing"
        ];
    }
}

// Project modal CSS
const modalCSS = `
    .project-filters {
        margin-top: 30px;
        text-align: center;
    }

    .filter-buttons {
        display: flex;
        justify-content: center;
        gap: 15px;
        flex-wrap: wrap;
    }

    .filter-btn {
        padding: 10px 20px;
        background: transparent;
        border: 2px solid var(--border-color);
        color: var(--text-secondary);
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;
    }

    .filter-btn:hover,
    .filter-btn.active {
        background: var(--gradient-primary);
        border-color: var(--primary-color);
        color: var(--text-primary);
    }

    .project-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .modal-overlay {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .modal-content {
        background: var(--background-card);
        border: 1px solid var(--border-color);
        border-radius: 20px;
        max-width: 800px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        transform: translateY(-50px) scale(0.95);
        transition: transform 0.3s ease;
        backdrop-filter: blur(20px);
    }

    .modal-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.5rem;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    .modal-close:hover {
        background: var(--primary-color);
        color: var(--text-primary);
    }

    .modal-header {
        padding: 40px;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .modal-icon {
        font-size: 4rem;
        width: 80px;
        height: 80px;
        background: var(--gradient-primary);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-title-section h2 {
        font-size: 2rem;
        margin-bottom: 10px;
        color: var(--text-primary);
    }

    .modal-title-section p {
        color: var(--text-secondary);
        font-size: 1.1rem;
    }

    .modal-body {
        padding: 40px;
    }

    .modal-section {
        margin-bottom: 30px;
    }

    .modal-section h3 {
        color: var(--primary-color);
        margin-bottom: 15px;
        font-size: 1.3rem;
    }

    .modal-section p {
        color: var(--text-secondary);
        line-height: 1.8;
        margin-bottom: 20px;
    }

    .modal-tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .feature-list {
        list-style: none;
        padding: 0;
    }

    .feature-list li {
        color: var(--text-secondary);
        margin-bottom: 10px;
        position: relative;
        padding-left: 25px;
    }

    .feature-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--primary-color);
        font-weight: bold;
    }

    .modal-links {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        padding-top: 20px;
        border-top: 1px solid var(--border-color);
    }

    @media (max-width: 768px) {
        .modal-content {
            margin: 0;
            max-height: 100vh;
            border-radius: 0;
        }

        .modal-header {
            padding: 30px 20px;
            flex-direction: column;
            text-align: center;
        }

        .modal-body {
            padding: 20px;
        }

        .filter-buttons {
            flex-direction: column;
            align-items: center;
        }

        .filter-btn {
            width: 150px;
        }
    }
`;

// Inject modal CSS
const modalStyle = document.createElement('style');
modalStyle.textContent = modalCSS;
document.head.appendChild(modalStyle);

// Initialize projects manager
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsManager();
});