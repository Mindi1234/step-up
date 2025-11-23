"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/useUserStore";
import { sendTemporaryPassword } from "@/services/userService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const setTempEmail = useUserStore((state) => state.setTempEmail);
  const setTempPassword = useUserStore((state) => state.setTempPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await sendTemporaryPassword(email); // הפניה לשירות

      setTempEmail(email);
      setTempPassword(data.tempPassword);
      router.push("/reset-password"); 
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit">Send Temporary Password</button>

      {message && <p style={{ color: "red" }}>{message}</p>}
    </form>
  );
}
