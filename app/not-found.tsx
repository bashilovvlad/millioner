import React from 'react';
import styles from './page.module.css';
import { ButtonLink } from './ui';

const NotFound = () => (
  <div className={styles.notFound}>
    <h2 className={styles.title}>Not found </h2>
    <ButtonLink href="/" label="Back to main" />
  </div>
);

export default NotFound;
