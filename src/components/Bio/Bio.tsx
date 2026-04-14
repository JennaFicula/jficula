import React from 'react';
import styles from './Bio.module.css';

interface BioProps {
  bio: string;
}

const Bio: React.FC<BioProps> = ({ bio }) => (
  <section className={styles.bio} aria-label="About">
    <p className={styles.text}>{bio}</p>
  </section>
);

export default Bio;
