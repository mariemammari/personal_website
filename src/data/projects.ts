import priceEstimator from "../assets/price_estimator.jpg";
import digiServiceOne from "../assets/dijiservice/1.JPG";
import digiServiceTwo from "../assets/dijiservice/2.JPG";
import digiServiceThree from "../assets/dijiservice/3.JPG";

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

export const projects: Project[] = [
    {
        id: 1,
        title: "Smart Property",
        tagline: "Full-Stack Real Estate Platform with AI & Full DevOps",
        description:
            "A production-grade real estate platform built with the MERN stack, powered by 4 AI microservices (price estimation, description generation, recommendations, and OCR document validation), and deployed on a full DevOps pipeline using Jenkins, Kubernetes, Docker, Vercel, and Cloudflare.",
        longDescription:
            "Smart Property is a comprehensive real estate web platform designed for the Tunisian market. The React + Vite SPA frontend is deployed continuously via Vercel using a Jenkins CI pipeline that runs Vitest tests, performs SonarQube static analysis, builds the app, and triggers a Vercel production deployment automatically. The NestJS backend is containerized with Docker and deployed on a self-managed Kubernetes cluster bootstrapped with kubeadm, with Cloudflare handling DNS, DDoS protection, and TLS termination. A separate ML monorepo contains four fully Dockerized FastAPI microservices — a price estimator (XGBoost), a description generator (BLIP + CLIP), a recommendation engine, and an OCR Fraud Detection engine — each deployed as an independent Kubernetes Deployment. The platform supports property listings, rental workflows, real-time chat via Socket.io, Stripe payments, push notifications via Firebase, and an AI-powered property creation wizard.",
        tags: [
            "NestJS", "React", "MongoDB", "TypeScript",
            "Docker", "Kubernetes", "Jenkins", "Vercel",
            "Cloudflare", "FastAPI", "XGBoost", "Stripe", "Socket.io",
            "Tesseract OCR", "SonarQube"
        ],
        features: [
            "Property Listings & CRUD — full property management with Cloudinary media integration and rich geographic queries",
            "Automated Rental Lifecycles — instant rental contract and payment schedule generation triggered on property status updates",
            "Stripe Payment Gateway — automated billing deposits, secure checkout sessions, and webhook-driven invoice generation",
            "Real-Time WebSocket Chat — interactive Socket.io communication channel with active presence tracking and message receipts",
            "AI Price Estimator — FastAPI endpoint providing real-time property market values using a customized XGBoost regressor",
            "AI Standing & Description — automated BLIP-based captioning and CLIP standing classification (bas/moyen/haut standing) from images",
            "AI Recommendation Engine — real-time hybrid match algorithm (80% explicit rules + 20% ML) with custom governorate-level zoning",
            "OCR Fraud Detection — automated extraction and verification of real estate contract authenticity using Tesseract OCR",
            "Geographic Nearby Search — Overpass API mapping to identify local points of interest using Levenshtein fuzzy deduplication",
            "Multi-Role Security — advanced JWT authentication with Google/Facebook OAuth 2.0 and biometric WebAuthn passkey support"
        ],
        devops:
            "Frontend CI (Jenkins): install → Vitest coverage → SonarQube → Vite build → prepare Vercel prebuilt output → deploy to Vercel (prod, with retry logic). Backend CI (Jenkins): npm ci → Jest tests → SonarQube → Quality Gate → nest build → Docker build & push to DockerHub → triggers CD pipeline. Backend CD (Jenkins): kubectl apply deployment.yaml + service.yaml → kubectl rollout restart → rollout status check. Infrastructure: Cloudflare (DNS + TLS + DDoS) → kubeadm Kubernetes cluster hosting 5 pods (NestJS backend + 4 Python ML FastAPIs) + Vercel CDN for the React SPA + MongoDB Atlas + Cloudinary.",
        role:
            "Led DevOps architecture — designed and implemented both Jenkins CI & CD pipelines, Kubernetes manifests (Deployments, Services, Secrets), Cloudflare DNS configuration, and Docker containerization for the backend. Built core NestJS backend modules: property, auth, rental, chat, finance, notifications, nearby search, and AI integration layer. Implemented real-time Socket.io chat, Stripe payment flow with PDF invoice generation, and Prometheus + Grafana monitoring.",
        team: 5,
        year: "2026",
        github: "https://github.com/mariemammari",
        demo: "https://www.youtube.com/watch?v=z0v_b0Qgeng",
        image: "url(https://img.youtube.com/vi/z0v_b0Qgeng/hqdefault.jpg)",
        coverTitle: "Smart Property — Demo",
        coverSubtitle: "MERN · NestJS · Kubernetes · Jenkins · Vercel",
        status: "live",
    },
    {
        id: 2,
        title: "Real Estate Price Predictor",
        tagline: "End-to-End ML Pipeline for the Tunisian Real Estate Market",
        description:
            "An end-to-end machine learning pipeline targeting the Tunisian real estate market. Covers web scraping, data cleaning, feature engineering, a Two-Stage Mixture Model for sale prices, and an XGBoost regressor for rentals — exposed via a FastAPI REST API.",
        longDescription:
            "This project is a complete data science pipeline for predicting real estate prices in Tunisia. The pipeline starts with custom web scrapers that collect raw listing data from Tunisian real estate portals, followed by aggressive data cleaning and normalization to handle the highly skewed market. Feature engineering introduces a Geographic Luxury Tier Atlas derived from clustering 500+ Tunisian neighborhoods into 4 data-driven groups. For sale price prediction, a novel Two-Stage Price Regime Mixture Model handles the extreme price variance between entry-level and luxury properties. For rental prediction, a tuned XGBoost regressor with 50+ engineered features achieves strong performance. Both models are exposed as a REST API via FastAPI and fully Dockerized for deployment as a Kubernetes microservice inside the Smart Property platform.",
        tags: [
            "Python", "XGBoost", "Scikit-learn", "Pandas",
            "FastAPI", "Docker", "Kubernetes", "Web Scraping",
            "Machine Learning", "Data Engineering",
        ],
        features: [
            "Targeted Web Scraping — automated Python crawlers extracting granular property listings from top Tunisian real estate portals",
            "Automated Cleaning Pipeline — outlier handling, text normalization, and missing data imputation using Pandas",
            "Geographic Luxury Atlas — K-means clustering of 500+ Tunisian cities into 4 distinct luxury price zones",
            "Two-Stage Mixture Model — custom machine learning approach isolating and predicting entry-level vs. luxury property sales",
            "Feature Engineering — 50+ customized features incorporating spatial density, room ratios, floor levels, and amenities",
            "FastAPI REST API — real-time price estimation endpoints wrapped in lightweight containerized microservices"
        ],
        role:
            "Built the full ML pipeline end-to-end: web scrapers, data cleaning notebook, feature engineering, geographic tier clustering, model selection & hyperparameter tuning (XGBoost, RandomForest, Ridge), Two-Stage Mixture Model design for sale prices, and FastAPI wrapper + Dockerfile.",
        team: 1,
        year: "2026",
        github: "https://github.com/mariemammari",
        image: `url(${priceEstimator})`,
        status: "live",
    },
    {
        id: 3,
        title: "InnoMall",
        tagline: "Smart Mall Management Platform — Symfony 6.4",
        description:
            "A smart mall management platform that unifies shoppers, merchants, and admins in one ecosystem — featuring e-commerce, event management, a loyalty points system, smart parking with QR codes, real-time notifications, and an AI-assisted chatbot powered by Gemini.",
        longDescription:
            "InnoMall is a multi-role web platform designed to digitize the operations of a modern shopping mall. Built with Symfony 6.4 and Twig, it serves three distinct user roles: customers who browse products, participate in events, and earn loyalty points; shop owners who manage inventory, promotions, and orders; and admins who oversee the full mall ecosystem. The platform integrates Stripe for secure online payments, Twilio for SMS notifications, and the Gemini AI API for an intelligent in-mall assistant chatbot. The parking module features real-time space availability with QR code ticket generation. A social feed module allows customers to post, comment, and interact, complete with a points-based gamification system that rewards engagement. Calendar integration generates iCal-compatible event links via the Spatie library.",
        tags: [
            "Symfony 6.4", "PHP 8.1", "Twig", "MySQL",
            "Stripe", "Twilio", "Gemini AI", "TailwindCSS",
            "Doctrine ORM", "Mercure", "QR Code",
        ],
        features: [
            "Multi-Role E-Commerce — complete cart, Stripe checkout, order lifecycle, and inventory dashboards for shop owners",
            "Social Feed Engine — nested post, comment, and threaded reply system using Symfony Doctrine ORM",
            "Loyalty Points System — gamified rewards engine that automatically issues loyalty points for purchases and interactions",
            "Smart Parking Module — real-time parking spot slot tracking, interactive ATM locator, and QR ticket generator",
            "Gemini AI Assistant — virtual mall guide chatbot powered by Gemini API for navigation and product discovery",
            "SMS & Mercure Alerts — transactional SMS via Twilio alongside real-time live notification updates using Symfony Mercure",
            "Central Admin Console — robust stats analytics with DOMPDF reports, complaint tracking, and merchant auditing tools"
        ],
        role:
            "Built the Social Feed module (Post, Commentaire, SousCommentaire entities, forms, controllers, Twig templates). Implemented the Loyalty Points gamification system (auto-awarding points on interactions). Contributed to the Parking module (PlaceParking management, QR ticket generation, ATM locator integration).",
        team: 5,
        year: "2025",
        github: "https://github.com/mariemammari",
        demo: "https://www.youtube.com/watch?v=Zs875HdhmJ8",
        image: "url(https://img.youtube.com/vi/Zs875HdhmJ8/hqdefault.jpg)",
        coverTitle: "InnoMall — Application Web (Symfony 6.4)",
        coverSubtitle: "PHP · MySQL · Stripe · Twilio · Gemini AI",
        status: "live",
    },
    {
        id: 4,
        title: "DigiService",
        tagline: "Spring Boot Microservices with Eureka, API Gateway & Docker",
        description:
            "A comprehensive Spring Boot microservices platform featuring Eureka service discovery, a centralized Config Server, Spring Cloud API Gateway, Keycloak authentication, and Docker Compose orchestration — consumed by an Angular SPA frontend.",
        longDescription:
            "DigiService is a cloud-native microservices architecture built with Spring Boot and Spring Cloud. The platform uses Eureka Server as a service registry where all microservices self-register for dynamic discovery. A centralized Config Server manages externalized configuration for all services, eliminating hardcoded environment-specific values. A Spring Cloud API Gateway serves as the single entry point, routing requests to the appropriate downstream microservice. Each team member independently built and owns a dedicated microservice covering different business domains: bookings, trainings, tradesman management, ratings & reviews, and user management. The entire stack is orchestrated with Docker Compose, uses Spring Boot Actuator health checks for service dependency ordering, and is secured with Keycloak SSO. An Angular SPA frontend consumes all APIs through the gateway.",
        tags: [
            "Spring Boot", "Spring Cloud", "Eureka", "API Gateway",
            "Config Server", "Angular", "Docker", "Docker Compose",
            "Keycloak", "Java", "Microservices",
        ],
        features: [
            "Eureka Service Discovery — central server where microservices self-register dynamically on startup for dynamic routing",
            "Centralized Git-backed Config — unified configuration server managing properties dynamically across environments",
            "Spring Cloud API Gateway — single traffic entry point handling cross-origin routing and request load balancing",
            "Keycloak SSO Security — OAuth2/OIDC authorization flow protecting REST endpoints with centralized identity",
            "Team Microservices — 6 standalone microservices covering ratings, trainings, bookings, and tradesman listing management",
            "Docker Compose Orchestration — complete network isolation using Actuator health status check dependencies"
        ],
        devops:
            "Docker Compose orchestrates all services with a custom bridge network (digiservice-network). Startup order is enforced via health-check dependencies: Eureka Server → Config Server → API Gateway → Microservices → Angular Frontend. Each service has its own Dockerfile. Spring Boot Actuator /actuator/health endpoints are used as Docker health check targets.",
        role:
            "Built the microservice-maria Spring Boot service (bounded context: property/listing management). Contributed to the Docker Compose orchestration and health-check configuration. Configured service registration in Eureka, externalized config via Config Server, and integrated the microservice with API Gateway routing rules.",
        team: 6,
        year: "2026",
        github: "https://github.com/mariemammari",
        image: `url(${digiServiceOne})`,
        gallery: [digiServiceOne, digiServiceTwo, digiServiceThree],
        status: "live",
    },
];
