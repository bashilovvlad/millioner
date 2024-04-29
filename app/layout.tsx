'use client';

import React, { useState, useMemo } from 'react';
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
  const value = useMemo(() => ({ reward, setReward }), []);
  return (
    <html lang="en">
      <body className={inter.className}>
        <RewardContext.Provider value={value}>
          {children}
        </RewardContext.Provider>
      </body>
    </html>
  );
};
export default RootLayout;
