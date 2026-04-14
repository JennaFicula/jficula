import React from 'react';
import styles from './LandingHero.module.css';
import SpotWalker from '../SpotWalker/SpotWalker';

interface LandingHeroProps {
  onSelect: (view: 'work' | 'resume') => void;
  name: string;
  bio: string;
  linkedin: string;
}

const LandingHero: React.FC<LandingHeroProps> = ({ onSelect, name, bio, linkedin }) => {
  const [mainBio, location] = bio.split('\n').map(s => s.trim()).filter(Boolean);
  return (
    <div className={styles.page}>
      {/* ── Cinematic banner ── */}
      <div className={styles.banner}>
        <div className={styles.bannerBg} style={{ backgroundImage: `url('/media/landing.jpeg')` }} />
        <div className={styles.bannerGradient} />
      </div>

      {/* ── Dark content section ── */}
      <div className={styles.content}>
        <div className={styles.bioCol}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.bio}>{mainBio}</p>
          {location && <p className={styles.bio}>{location}</p>}
          <nav className={styles.nav}>
            <button className={styles.navItem} onClick={() => onSelect('work')}>
              <span className={styles.label}>Projects</span>
              <span className={styles.arrow}>↗</span>
            </button>
            <button className={styles.navItem} onClick={() => onSelect('resume')}>
              <span className={styles.label}>Experience</span>
              <span className={styles.arrow}>↗</span>
            </button>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navItem}
            >
              <span className={styles.label}>LinkedIn</span>
              <span className={styles.arrow}>↗</span>
            </a>
          </nav>
        </div>

        <div className={styles.modelCol}>
          <SpotWalker />
        </div>
      </div>
    </div>
  );
};

export default LandingHero;


