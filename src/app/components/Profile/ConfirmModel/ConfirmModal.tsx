"use client";

import styles from "./ConfirmModal.module.css";

interface ConfirmModalProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }

  export default function ConfirmModal({ title, message, onConfirm, onCancel }: ConfirmModalProps) {
    return (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.message}>{message}</p>
            <div className={styles.buttons}>
              <button className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
              <button className={styles.confirmBtn} onClick={onConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      );
    }
    