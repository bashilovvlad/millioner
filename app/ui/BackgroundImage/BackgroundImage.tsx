import React from 'react';

import Image from 'next/image';

import styles from './backgroundImage.module.css';

interface IButtonProps {
  children?: React.ReactNode;
  image: {
    src: string;
    alt: string;
  };
  width: number;
  height: number;
}

export const BackgroundImage: React.FC<IButtonProps> = ({
  children,
  image,
  width,
  height,
}) => (
  <div className={styles.relative}>
    <div className={styles.imageHolder}>
      <Image
        src={image.src}
        alt={image.alt}
        width={width}
        height={height}
        className={styles.object}
      />
    </div>
    <div className="z-10">{children}</div>
  </div>
);
