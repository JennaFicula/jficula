import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import ProjectCard from './components/ProjectCard/ProjectCard';
import ProjectDetail from './components/ProjectDetail/ProjectDetail';
import ResumeSection from './components/ResumeSection/ResumeSection';
import LandingHero from './components/LandingHero/LandingHero';
import Footer from './components/Footer/Footer';
import { profile } from './data/content';
import { projects, Project } from './data/projects';

type View = 'landing' | 'work' | 'resume';

function HomePage() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [view, setView] = useState<View>('landing');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(true);

  return (
    <>
      {view === 'landing' ? (
        <div className="landingPage">
          <LandingHero
            onSelect={setView}
            name={profile.name}
            bio={profile.bio}
            linkedin={profile.linkedin}
          />
        </div>
      ) : (
        <div className="pageLayout">
          {mobileSidebarOpen && (
            <Sidebar
              name={profile.name}
              bio={profile.bio}
              linkedin={profile.linkedin}
              view={view}
              setView={(v) => { setView(v); if (v === 'landing') setMobileSidebarOpen(true); }}
              onClose={() => setMobileSidebarOpen(false)}
            />
          )}
          {!mobileSidebarOpen && (
            <div className="mobileHeader">
              <button className="mobileHeaderBack" onClick={() => setMobileSidebarOpen(true)}>☰ Bio</button>
              <div className="mobileHeaderNav">
                <button className="mobileHeaderBack" onClick={() => setView('landing')}>← Home</button>
                <button
                  className={`mobileHeaderTab${view === 'work' ? ' mobileHeaderTabActive' : ''}`}
                  onClick={() => setView('work')}
                >Projects</button>
                <button
                  className={`mobileHeaderTab${view === 'resume' ? ' mobileHeaderTabActive' : ''}`}
                  onClick={() => setView('resume')}
                >Experience</button>
              </div>
            </div>
          )}
          <div className="mainCol">
            {view === 'work' && (
              <>
                <h2 className="pageHeading">Projects</h2>
                <p className="projectsCaption">Check out some things I have been working on</p>
                <section aria-label="Projects" className="projects">
                  {projects.map((p) => (
                    <ProjectCard key={p.title} {...p} onClick={() => setSelected(p)} />
                  ))}
                </section>
              </>
            )}

            {view === 'resume' && (
              <>
                <h2 className="pageHeading">Career</h2>
                <p className="projectsCaption">Check out my work</p>
                <ResumeSection pdfUrl={profile.resume} />
              </>
            )}

            <Footer location={profile.location} availability={profile.availability} />
          </div>
        </div>
      )}
      {selected && (
        <ProjectDetail project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
