"use client";

import styles from "./PostSkeleton.module.css";

interface PostSkeletonProps {
  count?: number;
}

export default function PostSkeleton({ count = 3 }: PostSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.header}>
            <div className={styles.avatar} />
            <div className={styles.userInfo}>
              <div className={styles.lineShort} />
              <div className={styles.lineTiny} />
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.lineMedium} />
          </div>

          <div className={styles.image} />
        </div>
      ))}
    </>
  );
}
