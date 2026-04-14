import React from 'react';
import styles from './ResumeSection.module.css';
import { resumeData } from '../../data/resume';

interface ResumeSectionProps {
  pdfUrl: string;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ pdfUrl }) => (
  <section className={styles.section} aria-label="Resume" id="resume">
    {/* <div className={styles.sectionHeader}>
      <h2 className={styles.sectionHeading}>Experience</h2>
    </div> */}

    {/* Experience */}
    <div className={styles.block}>
      <h3 className={styles.blockHeading}>Experience</h3>
      {resumeData.roles.map((role) => (
        <div key={role.title + role.company} className={styles.entry}>
          <div className={styles.entryHeader}>
            <div className={styles.entryLeft}>
              <span className={styles.entryTitle}>{role.title}</span>
              <span className={styles.entryCompany}>{role.company}</span>
            </div>
            <div className={styles.entryRight}>
              <span className={styles.entryPeriod}>{role.period}</span>
              <span className={styles.entryLocation}>{role.location}</span>
            </div>
          </div>
          <ul className={styles.bullets}>
            {role.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Internships */}
    <div className={styles.block}>
      <h3 className={styles.blockHeading}>Engineering Internships</h3>
      <div className={styles.internshipGrid}>
        {resumeData.internships.map((i) => (
          <div key={i.company} className={styles.internshipEntry}>
            <span className={styles.internshipCompany}>{i.company}</span>
            <span className={styles.internshipMeta}>{i.team} · {i.period}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Education */}
    <div className={styles.block}>
      <h3 className={styles.blockHeading}>Education</h3>
      {resumeData.education.map((edu) => (
        <div key={edu.school} className={styles.entry}>
          <div className={styles.entryHeader}>
            <div className={styles.entryLeft}>
              <span className={styles.entryTitle}>{edu.degree}</span>
              <span className={styles.entryCompany}>{edu.school}</span>
            </div>
            <div className={styles.entryRight}>
              <span className={styles.entryPeriod}>{edu.period}</span>
              <span className={styles.entryLocation}>{edu.location}</span>
            </div>
          </div>
          <ul className={styles.bullets}>
            {edu.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Skills */}
    <div className={styles.block}>
      <h3 className={styles.blockHeading}>Skills</h3>
      <div className={styles.skillsGrid}>
        {Object.entries(resumeData.skills).map(([category, items]) => (
          <div key={category} className={styles.skillGroup}>
            <span className={styles.skillCategory}>{category}</span>
            <ul className={styles.skillList}>
              {items.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ResumeSection;
