import type { CarouselItem } from "@components/.";

export type Project = CarouselItem & {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration with Stripe.",
    image: "/projects/ecommerce.png",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Redux", "Stripe"],
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.example.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates using WebSockets. Built with React, TypeScript, and Firebase for backend services.",
    image: "/projects/taskmanager.png",
    technologies: [
      "React",
      "TypeScript",
      "Firebase",
      "Material UI",
      "WebSockets",
    ],
    githubUrl: "https://github.com/yourusername/task-manager",
    liveUrl: "https://taskmanager-demo.example.com",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "An interactive weather dashboard that displays real-time weather data and forecasts. Integrates with OpenWeather API and features beautiful data visualizations.",
    image: "/projects/weather.png",
    technologies: ["React", "Chart.js", "OpenWeather API", "SCSS", "Axios"],
    githubUrl: "https://github.com/yourusername/weather-dashboard",
    liveUrl: "https://weather-demo.example.com",
  },
  {
    id: 4,
    title: "Social Media Analytics",
    description:
      "A comprehensive analytics dashboard for social media metrics. Features data visualization, trend analysis, and exportable reports with PDF generation.",
    image: "/projects/analytics.png",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "Redux Toolkit"],
    githubUrl: "https://github.com/yourusername/social-analytics",
    liveUrl: "https://analytics-demo.example.com",
  },
];
