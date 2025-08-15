"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProjectAccess() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const target = searchParams.get("target");

  const correctPassword = "design123"; // Replace with your actual password
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    const accessTime = sessionStorage.getItem("hasAccess");
    const now = Date.now();
    const expired = !accessTime || now - parseInt(accessTime) > 30 * 60 * 1000; // 30 minutes expiration

    if (!expired && target) {
      router.replace(`/projects/${target}`);
    } else {
      setCheckingAccess(false);
    }
  }, [router, target]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === correctPassword) {
      sessionStorage.setItem("hasAccess", Date.now().toString());
      router.push(`/projects/${target}`);
    } else {
      setError("wrong password, please try again");
    }
  };

  if (checkingAccess) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white border border-gray-100 rounded shadow">
      <h1 className="text-lg mb-4">Please enter the password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded mb-6 "
          placeholder="Password"
        />
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <div className="flex flex-row justify-end gap-8 text-sm font-medium">
          <button
            type="button"
            className="text-golden-anchor font-medium px-4 py-2 rounded cursor-pointer hover:bg-beige-tint2"
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-golden-anchor  text-white px-4 py-2 rounded cursor-pointer hover:bg-golden-dark transition-colors"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}
