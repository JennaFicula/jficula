import React from 'react';
import TagList from '../TagList/TagList';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  year: string;
  description: string;
  tags: string[];
  linkedinUrl?: string;
  images?: string[];
  bannerPosition?: string;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  subtitle,
  year,
  description,
  tags,
  linkedinUrl,
  images,
  bannerPosition = 'center',
  onClick,
}) => (
  <article
    className={styles.card}
    onClick={onClick}
    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    tabIndex={0}
    role="button"
    aria-label={`View ${title} details`}
  >
    {images && images[0] && (
      <div className={styles.banner}>
        <img
          src={images[0]}
          alt={`${title} banner`}
          className={styles.bannerImg}
          style={{ objectPosition: bannerPosition }}
        />
      </div>
    )}
    <div className={styles.cardBody}>
      <div className={styles.cardHeader}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <span className={styles.year}>{year}</span>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.cardFooter}>
        <TagList tags={tags} />
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkedinLink}
            aria-label={`View ${title} on LinkedIn`}
            onClick={(e) => e.stopPropagation()}
          >
            View on LinkedIn →
          </a>
        )}
      </div>
    </div>
  </article>
);

export default ProjectCard;
