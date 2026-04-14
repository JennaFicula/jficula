import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  name: string;
  title: string;
  linkedin: string;
  resumeHref: string;
}

const Header: React.FC<HeaderProps> = ({ name, title, linkedin, resumeHref }) => (
  <header className={styles.header}>
    <div className={styles.left}>
      <img src="/media/me.png" alt={name} className={styles.avatar} />
      <div className={styles.identity}>
        <h1 className={styles.name}>{name}</h1>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkedinInline}
        >
          LinkedIn
        </a>
      </div>
    </div>
    <nav className={styles.links} aria-label="Profile links">
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        LinkedIn
      </a>
      <a
        href={resumeHref}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label="View resume"
      >
        Resume
      </a>
    </nav>
  </header>
);

export default Header;
