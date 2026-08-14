// Manual overrides / enrichment for repositories where GitHub's API data alone
// isn't descriptive enough, such as features, curated tech lists, and categories.
//
// These records are matched by repository name parsed from the `github` URL
// inside Projects.jsx. GitHub API data always wins for live fields such as
// url, homepage, language, topics, and updated_at.

export const projects = [
  {
    title: "MERN Blog Application",
    category: "Full Stack",
    description:
      "A full-featured blogging platform with JWT authentication, protected routes, and complete CRUD operations. Includes a Redux-managed dashboard for secure, responsive content management.",
    features: [
      "JWT-based authentication & protected routes",
      "Full CRUD for posts, comments and users",
      "Redux Toolkit state management",
      "Responsive admin dashboard",
    ],
    tech: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/MuhammadAsad86/mern-blog",
    live: "",
  },

  {
    title: "E-commerce Web Application",
    category: "Full Stack",
    description:
      "A full-stack e-commerce platform with product catalog, cart, and checkout flows built on the MERN stack.",
    features: [
      "Product listing, filtering and search",
      "Cart & checkout flow",
      "REST API backed by MongoDB",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/MuhammadAsad86/ecommerce-web-application-",
    live: "",
  },

  {
    title: "Asad Portfolio",
    category: "Frontend",
    description:
      "This personal portfolio site is built with React, Tailwind CSS and Framer Motion for smooth, animated interactions.",
    features: [
      "Animated project cards with 3D tilt",
      "Live GitHub repository integration",
      "Fully responsive layout",
    ],
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/MuhammadAsad86/asad-portfolio",
    live: "",
  },

  {
    title: "Responsive Corporate Website",
    category: "Frontend",
    description:
      "A fully responsive corporate business website with clean, modern sectioned layouts across every breakpoint.",
    features: [
      "Multi-section responsive layout",
      "Cross-device breakpoint testing",
      "Semantic, accessible markup",
    ],
    tech: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/MuhammadAsad86/responsive-corporate-website",
    live: "",
  },

  {
    title: "Binary Converter Calculator",
    category: "Frontend",
    description:
      "A utility web app for converting between binary, decimal, hexadecimal and octal number systems in real time.",
    features: [
      "Real-time number system conversion",
      "Input validation & error handling",
      "Lightweight, dependency-free UI",
    ],
    tech: ["HTML5", "CSS3", "JavaScript"],
    github:
      "https://github.com/MuhammadAsad86/binary-converter-calculator",
    live: "",
  },

  {
    title: "Meezan Bank Landing Page",
    category: "Frontend",
    description:
      "A pixel-perfect, fully responsive landing page replica built with Tailwind CSS, matching layout fidelity across every device breakpoint.",
    features: [
      "Pixel-accurate responsive layout",
      "Utility-first styling with Tailwind CSS",
      "Cross-device breakpoint testing",
    ],
    tech: ["Tailwind CSS", "HTML5", "Responsive Design"],
    github: "https://github.com/MuhammadAsad86/MEEZAN-BANK-PAGE",
    live: "",
  },

  {
    title: "Amazon Clone",
    category: "Frontend",
    description:
      "A responsive, Amazon-inspired front-end interface rebuilding key browsing, product and cart UI patterns using vanilla JavaScript.",
    features: [
      "Responsive product grid & detail views",
      "Cart interactions built with vanilla JavaScript",
      "Pixel-focused UI replication",
    ],
    tech: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/MuhammadAsad86/Amazon-Clone",
    live: "",
  },
];

export const projectCategories = [
  "All",
  "Full Stack",
  "Frontend",
];