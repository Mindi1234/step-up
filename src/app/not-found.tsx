'use client'; 

import { useRouter } from 'next/navigation';
import { MapPinOff } from 'lucide-react'; 
import ErrorPageLayout from './components/ErrorPageLayout/ErrorPageLayout';

// *** יבוא של ה-Hook האמיתי שלך ***
// (אם משתמשים ב-NextAuth זה יהיה useSession, אם ב-Context זה יהיה useContext(AuthContext))
// לצורך הדוגמה, נניח שיש לך Hook בשם useAuthStatus
// import { useAuthStatus } from '@/hooks/useAuthStatus'; 


export default function NotFound() {
  const router = useRouter();
  
  // *** עליך להחליף את זה בשימוש ב-Hook האותנטיקציה בפועל ***
  // נניח לצורך הדוגמה שהמשתמש מחובר:
  // const { isAuthenticated } = useAuthStatus(); 
  const isAuthenticated = false; // לצורך הדגמה, נניח שהוא לא מחובר

  // הנתיבים הסופיים:
  const HOME_ROUTE = '/home';      
  const LOGIN_ROUTE = '/login';   

  const handleBack = () => {
    // 1. ניסיון ראשון: חזרה צעד אחורה (מבחינת UX זה הכי טוב)
    if (window.history.length > 1) {
      router.back(); 
      return; // סיימנו
    }
    
    // 2. Fallback: אם אין היסטוריה, בודקים סטטוס התחברות
    if (isAuthenticated) {
      // אם מחובר, מפנה לדף הראשי (Dashboard/Home)
      router.push(HOME_ROUTE);
    } else {
      // אם לא מחובר, מפנה לדף ההתחברות (Login)
      router.push(LOGIN_ROUTE); 
    }
  };

  return (
    <ErrorPageLayout
      title="STEPUP: Lost Your Way? (404)"
      description="It looks like you've missed a step. The page you were looking for doesn't exist. Let's redirect you back to your path towards better habits."
      // הטקסט בכפתור מעט פחות ספציפי כדי להתאים לשני מצבי הפנייה
      buttonText="Go Back or Continue" 
      onButtonClick={handleBack} 
      icon={<MapPinOff size={64} strokeWidth={1.5} />}
    />
  );
}