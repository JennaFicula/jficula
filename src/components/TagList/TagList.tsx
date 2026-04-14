import React from 'react';
import styles from './TagList.module.css';

interface TagListProps {
  tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => (
  <ul className={styles.tagList} aria-label="Tags">
    {tags.map((tag) => (
      <li key={tag} className={styles.tag}>
        {tag}
      </li>
    ))}
  </ul>
);

export default TagList;
