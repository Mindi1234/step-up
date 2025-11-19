"use client";
import { useState, useEffect } from "react";
import ProfileSidebar from "../Sidebar/Sidebar";
import styles from "./ProfileSidebarWrapper.module.css";
import { useUserStore } from "@/app/store/useUserStore";

export default function ProfileSidebarWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);


  if (!user) return null;

  const handleLogout = () => {
    clearUser();
    setIsOpen(false);
  };
  
  return (
    <>
      <button className={styles.hamburger} onClick={() => setIsOpen(true)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ProfileSidebar
        user={user}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
}
