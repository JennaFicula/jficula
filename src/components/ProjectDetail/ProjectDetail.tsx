import React, { useEffect } from 'react';
import TagList from '../TagList/TagList';
import styles from './ProjectDetail.module.css';
import { Project } from '../../data/projects';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const paragraphs = project.descLong.trim().split(/\n\n+/);

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close detail view"
        >
          ✕
        </button>

        <div className={styles.panelHeader}>
          <div>
            <h2 className={styles.title}>{project.title}</h2>
            <p className={styles.subtitle}>{project.subtitle}</p>
          </div>
          <span className={styles.year}>{project.year}</span>
        </div>

        {(project.videoUrls ?? (project.videoUrl ? [project.videoUrl] : [])).map((src, i) => (
          <video
            key={i}
            className={styles.video}
            src={src}
            controls
            playsInline
            aria-label={`${project.title} video ${i + 1}`}
          />
        ))}

        {project.images && project.images.length > 0 && (
          <div className={styles.imageGallery}>
            {project.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${project.title} ${i + 1}`}
                className={styles.galleryImage}
              />
            ))}
          </div>
        )}

        <div className={styles.body}>
          {paragraphs.map((p, i) => (
            <p key={i} className={styles.paragraph}>
              {p}
            </p>
          ))}
        </div>

        {project.articleLinks && project.articleLinks.length > 0 && (
          <div className={styles.articleLinks}>
            <h3 className={styles.articleLinksHeading}>Press & Coverage</h3>
            <ul className={styles.articleList}>
              {project.articleLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.articleLink}
                  >
                    {link.label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.captionedImages && project.captionedImages.length > 0 && (
          <div className={styles.captionedGallery}>
            {project.captionedImages.map((item, i) => (
              <figure key={i} className={styles.captionedFigure}>
                <img src={item.src} alt={item.caption} className={styles.captionedImg} />
                <figcaption className={styles.caption}>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className={styles.panelFooter}>
          <TagList tags={project.tags} />
          {project.linkedinUrl && (
            <a
              href={project.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkedinLink}
              aria-label={`View ${project.title} on LinkedIn`}
            >
              View on LinkedIn →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
