// ===== DEFAULT PROJECTS DATA =====
const defaultProjects = [
    {
        id: 1,
        icon: '🎪',
        category: 'Web Application',
        title: 'MetroEvents',
        description: 'A dynamic event management platform for discovering, creating, and attending events in your city. Features real-time event updates, location-based search, and community engagement tools.',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178f50002cbc?w=500&h=300&fit=crop',
        link: 'https://metroevents.onrender.com',
        technologies: ['React', 'Node.js', 'MongoDB', 'Maps API']
    },
    {
        id: 2,
        icon: '🔬',
        category: 'Medical Platform',
        title: 'Agapay Clinical Lab',
        description: 'A comprehensive laboratory management system designed for healthcare facilities. Streamlines patient records, test results, and appointment scheduling with secure data handling and compliance.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop',
        link: 'https://agapay-clinical-lab.onrender.com',
        technologies: ['React', 'Express.js', 'PostgreSQL', 'Security']
    },
    {
        id: 3,
        icon: '🍣',
        category: 'E-Commerce',
        title: 'Tisoy Sushi Maki',
        description: 'An elegant online ordering platform for a premium sushi restaurant. Features interactive menu browsing, real-time order tracking, and seamless payment integration for a delightful customer experience.',
        imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop',
        link: 'https://tisoy-sushi-maki.onrender.com',
        technologies: ['React', 'Stripe API', 'Firebase', 'Responsive']
    }
];

// ===== APP STATE =====
let projects = [];
let isAdminMode = false;           // Keep this one
let editingProjectId = null;
let nextProjectId = 4;
let currentImageBase64 = null;
let currentTechTags = [];

// Remove ADMIN_SECRET from here (it's now only in admin.js)
