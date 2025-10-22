"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileEmployeePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      alert("User not logged in");
      router.push("/");
      return;
    } else {
      const user = JSON.parse(userData);
      setUser(user);
    }
  }, [router]);

  return <div></div>;
}
