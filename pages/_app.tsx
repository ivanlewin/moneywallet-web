import Head from 'next/head';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { DatabaseProvider } from 'contexts/database';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>MoneyWallet Web</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <DatabaseProvider>
        <Component {...pageProps} />
      </DatabaseProvider>
    </>
  );
}
