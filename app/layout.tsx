'use client';

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { RewardContext } from './app_context';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [reward, setReward] = useState(0);
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
        <RewardContext.Provider value={{ reward, setReward }}>
          {children}
        </RewardContext.Provider>
      </body>
    </html>
  );
};
export default RootLayout;
