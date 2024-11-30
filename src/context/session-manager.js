"use client"
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

const SessionManager = () => {
  const { data: session, status } = useSession();
  const [user,setUsers]=  useState(false);
  useEffect(() => {
    if (!user && status === "authenticated" && session?.expires) {
      const expirationTime = session?.expires*1000 ;
      const currentTime = Date.now();
      console.log(currentTime,expirationTime)
      const timeUntilExpiration = expirationTime - currentTime;
      console.log(timeUntilExpiration);

      if (timeUntilExpiration > 0) {
        setUsers(true);
        const timer = setTimeout(() => {
          alert("Your session has expired. Please log in again.");
          signOut(); // Redirect to the login page
        }, timeUntilExpiration);

        return () => clearTimeout(timer); // Cleanup on component unmount
      } else {
        // If already expired, sign out immediately
        console.log("process")
        alert("Your session has expired. Please log in again.");
        signOut();
      }
    }
  }, [session, status]);

  return null; // This component doesn't render anything visually
};

export default SessionManager;
