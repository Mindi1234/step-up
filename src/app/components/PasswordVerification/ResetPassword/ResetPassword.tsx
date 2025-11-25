"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/useUserStore";
import { resetUserPassword } from "@/services/client/userService";

export default function ResetPassword() {
  const [tempInput, setTempInput] = useState(""); 
  const [error, setError] = useState("");
  const router = useRouter();

  const tempEmail = useUserStore((state) => state.tempEmail);
  const tempPassword = useUserStore((state) => state.tempPassword); 

  const handleVerify = async () => {
    setError("");
    if (tempInput !== tempPassword) {
      setError("Temporary password is incorrect");
      return;
    }

    try {
      
      router.push("/new-password"); 
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Enter Temporary Password</h2>
      <input
        type="password"
        placeholder="Enter password from email"
        value={tempInput}
        onChange={(e) => setTempInput(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
