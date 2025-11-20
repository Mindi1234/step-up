// "use client";

// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { resetUserPassword } from "@/services/userService";

// export default function NewPasswordPage() {
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [error, setError] = useState("");

//   const params = useSearchParams();
//   const router = useRouter();

//   const email = params.get("email"); // קיבלנו מהדף הקודם

//   const handleSave = async () => {
//     if (!password || !confirm) {
//       setError("Please fill all fields");
//       return;
//     }

//     if (password !== confirm) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       await resetUserPassword(email!, password);
//       alert("Password updated!");

//       // כאן לא שולחים ללוגין — תגידי לאן את רוצה
//       router.push("/profile"); 
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Create New Password</h2>

//       <input
//         type="password"
//         placeholder="New password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Confirm new password"
//         value={confirm}
//         onChange={(e) => setConfirm(e.target.value)}
//       />

//       <button onClick={handleSave}>Save New Password</button>

//       {error && <p>{error}</p>}
//     </div>
//   );
// }
