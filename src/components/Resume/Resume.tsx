import React from 'react';
import styles from './Resume.module.css';

interface ResumeProps {
  pdfUrl: string;
  name: string;
}

const Resume: React.FC<ResumeProps> = ({ pdfUrl, name }) => (
  <section className={styles.section} aria-label="Resume">
    <div className={styles.sectionHeader}>
      <h2 className={styles.heading}>Resume</h2>
    </div>
    <div className={styles.embedWrapper}>
      <iframe
        src={`${pdfUrl}#toolbar=0&navpanes=0`}
        className={styles.iframe}
        title={`${name} resume`}
        aria-label={`${name} resume document`}
      />
    </div>
  </section>
);

export default Resume;
