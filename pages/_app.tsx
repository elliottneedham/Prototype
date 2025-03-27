// pages/_app.tsx
import React from 'react';
import '../styles/global.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Inter } from 'next/font/google';
import 'leaflet/dist/leaflet.css';



const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}

export default MyApp;