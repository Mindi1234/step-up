"use client";

import { useRef } from "react";
import { useUserStore } from "@/app/store/useUserStore";
import { getEncouragingMessage } from "@/utils/progressHabit";
import styles from "./ProgressBar.module.css";
import Loader from "../../Loader/Loader";
import { useTodayProgress } from "@/app/home/hooks/useTodayProgress";

export default function ProgressBar() {
    const { user } = useUserStore();
    const userId = user?.id!;

    const { total, done, percent } = useTodayProgress();

    const frozenProgress = useRef<{
        total: number;
        done: number;
        percent: number;
    } | null>(null);

    if (
        !frozenProgress.current ||
        Math.abs(done - frozenProgress.current.done) === 1
    ) {
        frozenProgress.current = { total, done, percent };
    }

    if (!userId || !frozenProgress.current) {
        return <Loader />;
    }

    const display = frozenProgress.current;


    const frameColor = "#a9a9a9";
    const progressColor = "#2e72ac";

    const SVG_SIZE = 120;
    const STROKE_WIDTH = 10;
    const CIRCLE_RADIUS = (SVG_SIZE / 2) - (STROKE_WIDTH / 2);
    const circumference = 2 * Math.PI * CIRCLE_RADIUS;
    const dashOffset = circumference * (1 - percent / 100);
    return (
        <div className={styles.container}>
            <div className={styles.progressCard}>
                <div className={styles.textSection}>
                    <p className={styles.encouragement}>
                        {getEncouragingMessage(percent)}
                    </p>

                    <div className={styles.habitCount}>
                        <span className={styles.done}>{done}</span>
                        <span className={styles.separator}>/</span>
                        <span className={styles.total}>{total}</span>
                    </div>

                    <p className={styles.label}>Habits</p>
                </div>

                <div className={styles.circularProgress}>
                    <svg
                        className={styles.progressRing}
                        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
                    >
                        <circle
                            className={styles.progressRingCircle}
                            stroke={frameColor}
                            strokeWidth={STROKE_WIDTH}
                            fill="transparent"
                            r={CIRCLE_RADIUS}
                            cx={SVG_SIZE / 2}
                            cy={SVG_SIZE / 2}
                        />

                        <circle
                            className={styles.progressRingCircleActive}
                            stroke={progressColor}
                            strokeWidth={STROKE_WIDTH}
                            fill="transparent"
                            r={CIRCLE_RADIUS}
                            cx={SVG_SIZE / 2}
                            cy={SVG_SIZE / 2}
                            style={{
                                strokeDasharray: circumference,
                                strokeDashoffset: dashOffset
                            }}
                        />
                    </svg>

                    <div className={styles.percentText}>{percent}%</div>
                </div>
            </div>
        </div>
    );
}
