"use client";

import SignUpPage from '@/components/sigin-in-form';
// // import { useState, useRef } from "react";
// // import { useRouter } from "next/navigation";

// export default function SignUpPage() {

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const passwordRef = useRef<HTMLInputElement>(null);

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters.");
//       setLoading(false);
//       passwordRef.current?.focus();
//       return;
//     }

//     try {
//       const response = await fetch("/api/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess("Sign-up successful! Redirecting to login...");
//         setTimeout(() => router.push("/login"), 2000);
//       } else {
//         setError(data.error || "Sign-up failed");
//       }
//     } catch (err) {
//       setError(err + "An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 text-black">
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
//         <form onSubmit={handleSignUp} className="mt-4">
//           <div className="mb-4">
//             <label className="block text-sm font-medium">Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full p-2 mt-1 border rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium">Password</label>
//             <input
//               type="password"
//               value={password}
//               ref={passwordRef}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 mt-1 border rounded-md"
//               required
//               minLength={6}
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           {success && <p className="text-green-500 text-sm">{success}</p>}
//           <button
//             type="submit"
//             className={`w-full px-4 py-2 mt-2 text-white bg-green-500 rounded-md hover:bg-green-600 ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={loading}
//           >
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//           <p className="mt-4 text-center text-sm">
//             Already have an account?{" "}
//             <a href="/login" className="text-blue-500 hover:underline">
//               Login
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

import React from 'react'

const page = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 text-black'>
      <SignUpPage/>
    </div>
  )
}

export default page