import React from 'react';

import styles from './page.module.css';

const QuizLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => <main className={styles.main}>{children}</main>;

export default QuizLayout;
