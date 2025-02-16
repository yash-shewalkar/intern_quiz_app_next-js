import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      passwordRef.current?.focus();
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setCookie("teacherId", data.userId, { maxAge: 60 * 60 * 24 * 7, path: "/" }); // allows cookies to all routes
      if (response.ok) {
        setSuccess("Sign-up successful! Redirecting to homepage...");
        setTimeout(() => router.push("/"), 2000);
      } else {
        setError(data.error || "Sign-up failed");
      }
    } catch (err) {
      setError(err + "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={ cn("flex flex-col gap-6")} >
      <Card className="bg-white dark:bg-gray-900 shadow-md border dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 dark:text-gray-200">
            Sign Up
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Enter your username below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="mt-4">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">
                  Username
                </Label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 mt-1 border dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  ref={passwordRef}
                  className="w-full p-2 mt-1 border dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                  required
                />
              </div>
              {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
              {success && <p className="text-green-500 dark:text-green-400 text-sm">{success}</p>}
              <Button
                type="submit"
                className={`w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white ${loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="underline underline-offset-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500"
              >
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
