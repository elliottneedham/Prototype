// pages/_app.tsx
import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/global.css';
import Layout from '../components/Layout';
import 'leaflet/dist/leaflet.css';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '@/lib/msalConfig';
import Bot from '@/components/Bot';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const msalInstance = new PublicClientApplication(msalConfig);

if (typeof window !== 'undefined') {
  msalInstance.initialize()
    .then(() => msalInstance.handleRedirectPromise())
    .catch((err) => {
      console.error("❌ MSAL init or redirect failed:", err);
    });
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isSchoolProfile = router.pathname === "/school-profile";

  return (
    <MsalProvider instance={msalInstance}>
      <main className={inter.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {isSchoolProfile && <Bot />}
      </main>
    </MsalProvider>
  );
}

export default MyApp;
