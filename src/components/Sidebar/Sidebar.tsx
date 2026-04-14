import React from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  name: string;
  bio: string;
  linkedin: string;
  view: 'work' | 'resume';
  setView: (v: 'landing' | 'work' | 'resume') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ name, bio, linkedin, view, setView }) => {
  const [mainBio, location] = bio.split('\n').map(s => s.trim()).filter(Boolean);
  return (
    <aside className={styles.card}>
      <img src="/media/me.png" alt={name} className={styles.avatar} />
      <h1 className={styles.name}>{name}</h1>
      <div className={styles.bioBlock}>
        <p className={styles.bio}>{mainBio}</p>
        {location && <p className={styles.location}>{location}</p>}
      </div>
      <div className={styles.links}>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          LinkedIn ↗
        </a>
      </div>
      <nav className={styles.nav}>
        <button className={styles.navBack} onClick={() => setView('landing')}>← Home</button>
        <button
          className={`${styles.navItem} ${view === 'work' ? styles.navActive : ''}`}
          onClick={() => setView('work')}
        >
          Projects
        </button>
        <button
          className={`${styles.navItem} ${view === 'resume' ? styles.navActive : ''}`}
          onClick={() => setView('resume')}
        >
          Experience
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
