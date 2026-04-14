import React from 'react';
import ResumeSection from '../components/ResumeSection/ResumeSection';
import styles from './ResumePage.module.css';
import { profile } from '../data/content';

const ResumePage: React.FC = () => (
  <div className={styles.page}>
    <nav className={styles.nav}>
      <a href="/" className={styles.backLink}>← {profile.name}</a>
    </nav>
    <main className={styles.container}>
      <ResumeSection pdfUrl={profile.resume} />
    </main>
  </div>
);

export default ResumePage;
