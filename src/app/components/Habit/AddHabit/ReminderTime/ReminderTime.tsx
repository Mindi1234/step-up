"use client";
import React from 'react';
import styles from './ReminderTime.module.css';
// ודא שאתה מייבא את הממשק הנכון מנתיב הולידציה שלך
import { IReminderTime } from '@/lib/validation/habitValidation'; 

interface ReminderTimeProps {
    value: IReminderTime | null | undefined; 
    onChange: (value: IReminderTime | null) => void; 
    error?: any;
}

export default function ReminderTime({ value, onChange, error }: ReminderTimeProps) {

    // מטפל בשינוי של שדה שעה או דקה
    const handleValueChange = (type: 'hour' | 'minute', e: React.ChangeEvent<HTMLInputElement>) => {
        const strValue = e.target.value;
        const numValue = strValue === '' ? 0 : parseInt(strValue, 10);
        
        let newTime = value || { hour: 0, minute: 0 };
        
        // ולידציה בסיסית (בנוסף ל-Zod)
        if (type === 'hour') {
            if (numValue > 23) return;
            newTime.hour = numValue;
        } else { // minute
            if (numValue > 59) return;
            newTime.minute = numValue;
        }
        
        // אם המשתמש מוחק את כל הערכים או משאיר אותם 00:00, שולחים null
        if (newTime.hour === 0 && newTime.minute === 0 && strValue === '') {
            onChange(null);
        } else {
            // אם המשתמש מוחק שדה אחד, שמור 0 בשדה זה
            if (strValue === '') {
                 newTime[type] = 0;
            }

            // אם שניהם ריקים/אפס, שלח null
            if (newTime.hour === 0 && newTime.minute === 0) {
                 onChange(null);
            } else {
                 onChange({ ...newTime }); // שליחת אובייקט מעודכן
            }
        }
    };


    // הצגת הערך (השארת השדה ריק אם הערך הוא 0)
    const hourValue = value?.hour === undefined || value.hour === 0 ? '' : value.hour;
    const minuteValue = value?.minute === undefined || value.minute === 0 ? '' : value.minute;

    return (
        <div className={styles.inputWrapper}>
            <div className={styles.timeDisplay}>
                {/* אייקון השעון */}
                <span className={styles.clockIcon}>🕒</span>
                
                <div className={styles.timeInputSplit}>
                    {/* קלט שעה */}
                    <input
                        type="number"
                        min="0"
                        max="23"
                        placeholder="--"
                        className={styles.timePartInput}
                        value={hourValue}
                        onChange={(e) => handleValueChange('hour', e)}
                    />
                    
                    <span className={styles.separator}>:</span>
                    
                    {/* קלט דקה */}
                    <input
                        type="number"
                        min="0"
                        max="59"
                        placeholder="--"
                        className={styles.timePartInput}
                        value={minuteValue}
                        onChange={(e) => handleValueChange('minute', e)}
                    />
                </div>
            </div>

            {error && <p className={styles.error}>{error.message}</p>}
        </div>
    );
}