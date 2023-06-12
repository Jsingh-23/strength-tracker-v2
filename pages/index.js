import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data } = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Strength Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Strength Tracker!
        </h1>

        <p className={styles.description}>
          Get started by uploading your lifting data!
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Progress Logging &rarr;</h2>
            <p>Keep track of your weight lifting progress over time</p>
          </div>

          <div className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Explore additional exercises and routines to help you on your journey</p>
          </div>

          <div className={styles.card}>
            <h2>Visualize &rarr;</h2>
            <p>Visualize your weight lifting progress through various charts </p>
          </div>
        </div>

        <div className={styles.info}>
        <h2>We&apos;ll help you track your progress and optimize your workouts based on your input and your favorite routines.</h2>
        </div>

        <div className={styles.imageContainer}>
          <img src="/deadlift.jpeg" className={styles.imageFit}>

          </img>
        </div>

        <div className={styles.info}>
        <h2>Data visualization, made easy for you</h2>
        </div>

        {/* only render this if the user is not logged in */}
        {data === null && (
          <div className={styles.info}>
          <h1>Want to get started now?</h1>
          <h3> Register now and get started! </h3>
          <Link href="/register" class="btn btn-primary"> Register </Link>
          </div>
        )}

      </main>

      <footer className={styles.footer}>
          Created by Jaskaranpal Singh
      </footer>
    </div>
  )
}
