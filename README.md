# Jenna Ficula — Portfolio

Personal portfolio site built with React 18 + TypeScript, featuring a cinematic landing page, interactive 3D Boston Dynamics Spot model, and project/experience showcases.

## Stack

- **React 18** + **TypeScript** (Create React App)
- **CSS Modules** — dark grey page background with light panels
- **Three.js** / **@react-three/fiber** / **@react-three/drei** — 3D GLTF model with PBR rendering and mouse-tracking rotation
- **react-router-dom** — client-side routing

## Features

- Cinematic hero banner with Ken Burns animation and gradient bleed
- Interactive 3D Boston Dynamics Spot robot (mouse-controlled rotation)
- Projects section with full-screen detail modal and media galleries
- Experience section with roles, internships, education, and skills
- Sidebar navigation with bio, LinkedIn link, and section tabs
- Dark-themed outer layout with light card panels

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

## Build

```bash
npm run build
```

## Notes

Large media assets (`public/media/`, 3D model files, PDF resume) are excluded from the repository via `.gitignore` due to file size. Add them locally or configure Git LFS to track them for deployment.
