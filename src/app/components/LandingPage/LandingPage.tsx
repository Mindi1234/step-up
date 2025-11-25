"use client";

import { useRouter } from "next/navigation";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Build Better <br />
          <span>Habits Today</span>
        </h1>
        <p className={styles.subtitle}>
          Track. Improve. Transform. <br />
          StepUp helps you unlock achievements and level up your life.
        </p>

        <button
          className={styles.loginButton}
          onClick={() => router.push("/login")}
        >
          Get Started Now
        </button>

        <div className={styles.heroVisual}>
          <img
            className={styles.heroGif}
            src="./images/Healthy GIF.gif"
            alt="App Preview"
          />
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Why Choose StepUp?</h2>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <img src="./images/1 (1).png" alt="Start" />
            <p>The secret of getting ahead is getting started.</p>
          </div>
          
          <div className={styles.featureCard}>
            <img src="./images/1 (2).png" alt="Daily" />
            <p>Success is built daily, not instantly.</p>
          </div>

          <div className={styles.featureCard}>
            <img src="./images/1 (3).png" alt="Consistency" />
            <p>Consistency beats perfection — every single time.</p>
          </div>

          <div className={styles.featureCard}>
            <img src="./images/1 (5).png" alt="Growth" />
            <p>Your future is created by what you do today.</p>
          </div>
          
          <div className={styles.featureCard}>
            <img src="./images/1 (6).png" alt="Discipline" />
            <p>Discipline is choosing what you want most over what you want now.</p>
          </div>

          <div className={styles.featureCard}>
            <img src="./images/1 (7).png" alt="Visualize" />
            <p>Visualize your growth and celebrate your success.</p>
          </div>
        </div>
      </section>

      <section className={styles.videos}>
        <h2 className={styles.sectionTitle}>Boost Your Motivation</h2>

        <div className={styles.videoGrid}>
          <a
            href="https://www.youtube.com/shorts/9BBY72CGtXc"
            target="_blank"
            className={styles.videoCard}
          >
            Top Motivation
          </a>

          <a
            href="https://www.youtube.com/shorts/OlRNuJ8JHs4"
            target="_blank"
            className={styles.videoCard}
          >
            Change Your Life
          </a>

          <a
            href="https://www.youtube.com/shorts/gGHhI44hj4A"
            target="_blank"
            className={styles.videoCard}
          >
            Build Habits
          </a>
        </div>
      </section>
    </div>
  );
}