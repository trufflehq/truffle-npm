import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import EmbedController from '@/components/embed-controller';
import UserInfo from '@/components/user-info';

export default function Home() {
  return (
    <>
      <Head>
        <title>Truffle + Next</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <EmbedController />
        <UserInfo />
      </main>
    </>
  );
}
