import priceEstimator from "../assets/price_estimator.jpg";
import digiServiceOne from "../assets/dijiservice/1.JPG";
import digiServiceTwo from "../assets/dijiservice/2.JPG";
import digiServiceThree from "../assets/dijiservice/3.JPG";
import versLeVert from "../assets/VersLeVert.png";

export type ProjectStatus = "live" | "wip" | "experiment";

export type Project = {
    id: number;
    title: string;
    tagline: string;
    description: string;
    longDescription: string;
    tags: string[];
    features: string[];
    devops?: string;
    role?: string;
    team?: number;
    year?: string;
    github: string;
    demo?: string;
    image: string;
    coverTitle?: string;
    coverSubtitle?: string;
    gallery?: string[];
    status: ProjectStatus;
};

export const projectCardOrder = [5, 1, 4, 2, 3] as const;

export const projects: Project[] = [
    {
        id: 5,
        title: "Vers le Vert",
        tagline: "Plateforme web responsive qui transforme les gestes écologiques du quotidien en défis, points et récompenses, avec vérification automatique des preuves par OCR.",
        description:
            "Vers le Vert est une plateforme web de suivi d'empreinte carbone personnelle avec défis communautaires (GreenTech). L'utilisateur relève des défis personnels, prouve ses gestes responsables en téléversant une photo ou en prenant une image avec sa caméra (facture d'électricité, ticket de transport, étiquette de vêtement) analysée par OCR, fait collecter ses déchets organiques et plastiques par des collecteurs partenaires, participe à des événements écologiques (ex. nettoyage de plage) et gagne des points échangeables contre des offres de sponsors (réductions, coupons).",
        longDescription:
            "Vers le Vert est une plateforme web de suivi d'empreinte carbone personnelle avec défis communautaires (GreenTech). L'utilisateur relève des défis personnels, prouve ses gestes responsables en téléversant une photo ou en prenant une image avec sa caméra (facture d'électricité, ticket de transport, étiquette de vêtement) analysée par OCR, fait collecter ses déchets organiques et plastiques par des collecteurs partenaires, participe à des événements écologiques (ex. nettoyage de plage) et gagne des points échangeables contre des offres de sponsors (réductions, coupons).",
        tags: [
            "Django",
            "PostgreSQL",
            "Nginx",
            "Tailwind CSS",
            "Git",
            "Gemini",
            "OCR.space",
        ],
        features: [
            "Gestion des utilisateurs",
            "Défis personnels",
            "Points, gamification, sponsors et récompenses",
            "Déchets organiques et plastiques",
            "Événements écologiques",
            "Lieux et recommandations éco-responsables",
        ],
        github: "https://github.com/mariemammari/VersLeVert",
        demo: "https://verslevert.onrender.com",
        image: `url(${versLeVert})`,
        year: "2026",
        status: "live",
    },
    {
        id: 1,
        title: "Smart Property",
        tagline: "Full-Stack Real Estate Platform with AI & Full DevOps",
        description:
            "A full-stack real estate platform built with React, NestJS and MongoDB, powered by 3 AI microservices (price estimation, recommendations, and OCR document validation), and deployed on a full DevOps pipeline using Jenkins, Kubernetes, Docker, Vercel, and Cloudflare.",
        longDescription:
            "Smart Property is a full-stack real estate web platform designed for the Tunisian market. The React + Vite SPA frontend is deployed continuously via Vercel using a Jenkins CI pipeline that runs Vitest tests, performs SonarQube static analysis, builds the app, and triggers a Vercel production deployment automatically. The NestJS backend is containerized with Docker and deployed on a self-managed Kubernetes cluster bootstrapped with kubeadm, with Cloudflare handling DNS, DDoS protection, and TLS termination. A separate ML monorepo contains three fully Dockerized FastAPI microservices: a price estimator (XGBoost), a recommendation engine, and an OCR Fraud Detection engine, each deployed as an independent Kubernetes Deployment. The platform supports property listings, rental workflows, real-time chat via Socket.io, Stripe payments, push notifications via Firebase, and an AI-powered property creation wizard.",
        tags: [
            "NestJS", "React", "MongoDB", "TypeScript",
            "Docker", "Kubernetes", "Jenkins", "Vercel",
            "Cloudflare", "FastAPI", "XGBoost", "Stripe", "Socket.io",
            "Tesseract OCR", "SonarQube"
        ],
        features: [
            "🏠 Property Listings: full property management with Cloudinary media integration and rich geographic queries",
            "📄 Automated Rental Lifecycles: instant rental contracts and payment schedules on property status updates",
            "💳 Stripe Payment Gateway: secure checkout sessions with automated billing and webhook-driven invoice generation",
            "💬 Real-Time WebSocket Chat: Socket.io messaging with active presence tracking and message receipts",
            "🤖 AI Price Estimator: real-time property valuations using a customized XGBoost regressor via FastAPI",
            "🧠 AI Recommendation Engine: hybrid match algorithm (80% rules + 20% ML) with governorate-level zoning",
            "🔍 OCR Fraud Detection: automated real estate contract verification using Tesseract OCR",
            "📍 Geographic Nearby Search: Overpass API mapping with Levenshtein fuzzy deduplication",
            "🔐 Multi-Role Security: JWT auth with Google/Facebook OAuth 2.0 and biometric WebAuthn passkey support"
        ],
        devops:
            "Frontend CI (Jenkins): install → Vitest coverage → SonarQube → Vite build → prepare Vercel prebuilt output → deploy to Vercel (prod, with retry logic). Backend CI (Jenkins): npm ci → Jest tests → SonarQube → Quality Gate → nest build → Docker build & push to DockerHub → triggers CD pipeline. Backend CD (Jenkins): kubectl apply deployment.yaml + service.yaml → kubectl rollout restart → rollout status check. Infrastructure: Cloudflare (DNS + TLS + DDoS) → kubeadm Kubernetes cluster hosting 5 pods (NestJS backend + 4 Python ML FastAPIs) + Vercel CDN for the React SPA + MongoDB Atlas + Cloudinary.",
        team: 5,
        year: "2026",
        github: "https://github.com/mariemammari",
        demo: "https://www.youtube.com/watch?v=z0v_b0Qgeng",
        image: "url(https://img.youtube.com/vi/z0v_b0Qgeng/hqdefault.jpg)",
        coverTitle: "Smart Property",
        coverSubtitle: "React · MongoDB · NestJS · Kubernetes · Jenkins · Vercel",
        status: "live",
    },
    {
        id: 2,
        title: "Tunisian Real Estate Price Predictor",
        tagline: "End-to-End ML Pipeline for the Tunisian Real Estate Market",
        description:
            "An end-to-end machine learning pipeline targeting the Tunisian real estate market. Covers web scraping, data cleaning, feature engineering, a Two-Stage Mixture Model for sale prices, and an XGBoost regressor for rentals, exposed via a FastAPI REST API.",
        longDescription:
            "This project is a complete data science pipeline for predicting real estate prices in Tunisia. The pipeline starts with custom web scrapers that collect raw listing data from Tunisian real estate portals, followed by aggressive data cleaning and normalization to handle the highly skewed market. Feature engineering introduces a Geographic Luxury Tier Atlas derived from clustering 500+ Tunisian neighborhoods into 4 data-driven groups. For sale price prediction, a novel Two-Stage Price Regime Mixture Model handles the extreme price variance between entry-level and luxury properties. For rental prediction, a tuned XGBoost regressor with 50+ engineered features achieves strong performance. Both models are exposed as a REST API via FastAPI and fully Dockerized for deployment as a Kubernetes microservice inside the Smart Property platform.",
        tags: [
            "Python", "XGBoost", "Scikit-learn", "Pandas",
            "FastAPI", "Docker", "Kubernetes", "Web Scraping",
            "Machine Learning", "Data Engineering",
        ],
        features: [
            "🕷️ Targeted Web Scraping: automated Python crawlers extracting granular property listings from Tunisian real estate portals",
            "🧹 Automated Cleaning Pipeline: outlier handling, text normalization, and missing data imputation using Pandas",
            "🗺️ Geographic Luxury Atlas: K-means clustering of 500+ Tunisian cities into 4 distinct luxury price zones",
            "🔀 Two-Stage Mixture Model: custom ML approach isolating and predicting entry-level vs. luxury property sales",
            "⚙️ Feature Engineering: 50+ customized features with spatial density, room ratios, floor levels, and amenities",
            "🚀 FastAPI REST API: real-time price estimation endpoints wrapped in lightweight containerized microservices"
        ],
        team: 1,
        year: "2026",
        github: "https://github.com/mariemammari",
        image: `url(${priceEstimator})`,
        status: "live",
    },
    {
        id: 3,
        title: "InnoMall",
        tagline: "Smart Mall Management Platform · Symfony 6.4",
        description:
            "A smart mall management platform that unifies shoppers, merchants, and admins in one ecosystem. Features e-commerce, event management, a loyalty points system, smart parking with QR codes, real-time notifications, and an AI-assisted chatbot powered by Gemini.",
        longDescription:
            "InnoMall is a multi-role web platform designed to digitize the operations of a modern shopping mall. Built with Symfony 6.4 and Twig, it serves three distinct user roles: customers who browse products, participate in events, and earn loyalty points; shop owners who manage inventory, promotions, and orders; and admins who oversee the full mall ecosystem. The platform integrates Stripe for secure online payments, Twilio for SMS notifications, and the Gemini AI API for an intelligent in-mall assistant chatbot. The parking module features real-time space availability with QR code ticket generation. A social feed module allows customers to post, comment, and interact, complete with a points-based gamification system that rewards engagement. Calendar integration generates iCal-compatible event links via the Spatie library.",
        tags: [
            "Symfony 6.4", "PHP 8.1", "Twig", "MySQL",
            "Stripe", "Twilio", "Gemini AI", "TailwindCSS",
            "Doctrine ORM", "Mercure", "QR Code",
        ],
        features: [
            "🛒 Multi-Role E-Commerce: full cart, Stripe checkout, order lifecycle, and inventory dashboards for shop owners",
            "📰 Social Feed Engine: nested post, comment, and threaded reply system using Symfony Doctrine ORM",
            "🎮 Loyalty Points System: gamified rewards engine auto-issuing points for purchases and interactions",
            "🅿️ Smart Parking Module: real-time slot tracking, interactive ATM locator, and QR ticket generation",
            "🤖 Gemini AI Assistant: virtual mall guide chatbot powered by Gemini API for navigation and product discovery",
            "📱 SMS & Mercure Alerts: transactional SMS via Twilio with real-time push updates via Symfony Mercure",
            "📊 Central Admin Console: analytics with DOMPDF reports, complaint tracking, and merchant auditing tools"
        ],
        team: 5,
        year: "2025",
        github: "https://github.com/mariemammari",
        demo: "https://www.youtube.com/watch?v=Zs875HdhmJ8",
        image: "url(https://img.youtube.com/vi/Zs875HdhmJ8/hqdefault.jpg)",
        coverTitle: "InnoMall · Application Web",
        coverSubtitle: "PHP · MySQL · Stripe · Twilio · Gemini AI",
        status: "live",
    },
    {
        id: 4,
        title: "DigiService",
        tagline: "Spring Boot Microservices with Eureka, API Gateway & Docker",
        description:
            "A comprehensive Spring Boot microservices platform featuring Eureka service discovery, a centralized Config Server, Spring Cloud API Gateway, Keycloak authentication, and Docker Compose orchestration, consumed by an Angular SPA frontend.",
        longDescription:
            "DigiService is a cloud-native microservices architecture built with Spring Boot and Spring Cloud. The platform uses Eureka Server as a service registry where all microservices self-register for dynamic discovery. A centralized Config Server manages externalized configuration for all services, eliminating hardcoded environment-specific values. A Spring Cloud API Gateway serves as the single entry point, routing requests to the appropriate downstream microservice. Each team member independently built and owns a dedicated microservice covering different business domains: bookings, trainings, tradesman management, ratings & reviews, and user management. The entire stack is orchestrated with Docker Compose, uses Spring Boot Actuator health checks for service dependency ordering, and is secured with Keycloak SSO. An Angular SPA frontend consumes all APIs through the gateway.",
        tags: [
            "Spring Boot", "Spring Cloud", "Eureka", "API Gateway",
            "Config Server", "Angular", "Docker", "Docker Compose",
            "Keycloak", "Java", "Microservices",
        ],
        features: [
            "🔍 Eureka Service Discovery: central registry where microservices self-register dynamically on startup",
            "⚙️ Centralized Git-backed Config: unified config server managing properties across all environments",
            "🌐 Spring Cloud API Gateway: single traffic entry point with cross-origin routing and load balancing",
            "🔐 Keycloak SSO Security: OAuth2/OIDC authorization protecting REST endpoints with centralized identity",
            "🧩 Team Microservices: 6 standalone services covering ratings, trainings, bookings, and tradesman management",
            "🐳 Docker Compose Orchestration: full network isolation with Actuator health-check startup dependencies"
        ],
        devops:
            "Docker Compose orchestrates all services with a custom bridge network (digiservice-network). Startup order is enforced via health-check dependencies: Eureka Server → Config Server → API Gateway → Microservices → Angular Frontend. Each service has its own Dockerfile. Spring Boot Actuator /actuator/health endpoints are used as Docker health check targets.",
        team: 6,
        year: "2026",
        github: "https://github.com/mariemammari",
        image: `url(${digiServiceOne})`,
        gallery: [digiServiceOne, digiServiceTwo, digiServiceThree],
        status: "live",
    },
];
