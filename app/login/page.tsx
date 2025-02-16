// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { setCookie } from "cookies-next";


// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const response = await fetch("/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });

//     const data = await response.json();
//     setCookie("teacherId", data.userId,  { maxAge: 60 * 60 * 24 * 7, path: "/" });  //  allows cookies to all the routes

//     if (response.ok) {
//       router.push("/dashboard/");
    
//     } else {
//       setError(data.error || "Login failed");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 text-black">
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-center">Login</h2>
//         <form onSubmit={handleLogin} className="mt-4">
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
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 mt-1 border rounded-md"
//               required
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <button
//             type="submit"
//             className="w-full px-4 py-2 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";
import { LoginForm } from '@/components/login-form'
import React from 'react'

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center  ">
      <LoginForm />
    </div>
  )
}

export default page