import React from 'react';
import styles from './Footer.module.css';

interface FooterProps {
  location: string;
  availability: string;
}

const Footer: React.FC<FooterProps> = ({ location, availability }) => (
  <footer className={styles.footer}>
    <span className={styles.location}>{location}</span>
    <span className={styles.availability}>{availability}</span>
  </footer>
);

export default Footer;
