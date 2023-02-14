import DatabaseProvider from 'contexts/DatabaseContext';
import ThemeProvider from 'contexts/Theme';
import TransactionUtilsProvider from 'contexts/TransactionUtils';
import TransferUtilsProvider from 'contexts/TransferUtils';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="MoneyWallet Web" />
        <meta name="keywords" content="MoneyWallet Web" />
        <title>MoneyWallet Web</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#1E87DB" />
      </Head>
      <ThemeProvider>
        <DatabaseProvider>
          <TransactionUtilsProvider>
            <TransferUtilsProvider>
              <Component {...pageProps} />
            </TransferUtilsProvider>
          </TransactionUtilsProvider>
        </DatabaseProvider>
      </ThemeProvider>
    </>
  );
}
