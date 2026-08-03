import {
  SiReact,
  SiJavascript,
  SiRedux,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiPostman,
  SiJsonwebtokens,
} from "react-icons/si";
import { FiServer, FiLayers } from "react-icons/fi";

export const skillGroups = [
  {
    category: "Frontend",
    items: [
      { name: "React.js", level: 88, icon: SiReact },
      { name: "JavaScript (ES6+)", level: 85, icon: SiJavascript },
      { name: "Redux Toolkit", level: 80, icon: SiRedux },
      { name: "Tailwind CSS", level: 90, icon: SiTailwindcss },
      { name: "HTML5", level: 95, icon: SiHtml5 },
      { name: "CSS3", level: 92, icon: SiCss },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 82, icon: SiNodedotjs },
      { name: "Express.js", level: 82, icon: SiExpress },
      { name: "REST APIs", level: 85, icon: FiServer },
      { name: "JWT Authentication", level: 80, icon: SiJsonwebtokens },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MongoDB", level: 80, icon: SiMongodb },
      { name: "Mongoose", level: 75, icon: SiMongodb },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git & GitHub", level: 88, icon: SiGit },
      { name: "MVC Architecture", level: 78, icon: FiLayers },
      { name: "GitHub", level: 90, icon: SiGithub },
      { name: "Postman", level: 80, icon: SiPostman },
    ],
  },
];

export const softSkills = [
  "Problem Solving",
  "Attention to Detail",
  "Team Collaboration",
  "Time Management",
  "Adaptability",
  "Clear Communication",
];

export const languages = [
  { name: "English", level: "Professional" },
  { name: "Urdu", level: "Native" },
];
