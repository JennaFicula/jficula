# Portfolio Site Spec

## Stack
- React 18 + TypeScript
- No CSS framework — pure CSS modules, black/white palette only
- No routing (single page, scroll-based)

## Design system
- Colors: #000000 text, #ffffff background, #e5e5e5 borders, #f5f5f5 card bg
- Font: system-ui, sans-serif
- Card border: 1px solid #e5e5e5, border-radius: 8px

## Components required
1. `<Header>` — Jenna Ficula, title, LinkedIn + resume links
2. `<Bio>` — 2-sentence description
3. `<ProjectCard>` — accepts props: title, subtitle, year, description, tags[], linkedinUrl?
4. `<TagList>` — renders array of string tags as pill badges
5. `<Footer>` — location, availability status

## Projects data (hardcoded in projects.ts)

### Project 1: AR Personality Recognition
- title: "AR Personality Recognition"
- subtitle: "Magic Leap 2 · Computer Vision · Real-time AI"
- year: "2024"
- description: "Wearable AR app using facial recognition and computer vision to surface personality profile data in real time — built as an ethics conversation starter for enterprise clients at Slalom's Innovation Lab."
- tags: ["AR", "Facial Recognition", "Ethics in AI", "Magic Leap 2"]
- linkedinUrl: "https://www.linkedin.com/posts/stevesaundersmbe_..."

### Project 2: SPOT Robotic Inspection System  
- title: "Boston Dynamics SPOT Inspection"
- subtitle: "Hitachi Rail · Slalom · Ericsson 5G"
- year: "2024"
- description: "Automated quality inspection pipeline combining the SPOT robotic dog, private 5G, and Hitachi Lumada industrial AI to ensure passenger safety across rail manufacturing."
- tags: ["Robotics", "Industrial AI", "Private 5G", "Computer Vision"]
- linkedinUrl: "https://www.linkedin.com/posts/..."

## Data
All personal content lives in `src/data/content.js`.
Components receive data as props — never hardcode strings in components.

## Page structure (App.tsx)
<main>
  <Header />
  <Bio />
  <section aria-label="Projects">
    {projects.map(p => <ProjectCard key={p.title} {...p} />)}
  </section>
  <Footer />
</main>