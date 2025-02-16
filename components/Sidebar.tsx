"use client";

import { Home, LayoutDashboard, PlusCircle, LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Sidebar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/login"); // Redirect to login after logout
    }, 1500);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className=" sticky top-4 left-4 z-50 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        {/* Sidebar for Mobile (ShadCN Sheet) */}
        <SheetContent side="left" className="p-0 w-64 bg-gray-900 text-white">
          <div className="p-6 text-xl font-bold tracking-wider text-yellow-400">
            Quizzo
          </div>
          <nav className="flex-1">
            <ul className="space-y-2 p-4">
              <li>
                <Link href="/" className="flex items-center p-3 rounded-md hover:bg-gray-800">
                  <Home className="mr-3 h-5 w-5" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="flex items-center p-3 rounded-md hover:bg-gray-800">
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/create-quiz" className="flex items-center p-3 rounded-md hover:bg-gray-800">
                  <PlusCircle className="mr-3 h-5 w-5" />
                  Create Quiz
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-4">
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={loading}
              className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600"
            >
              {loading ? "Logging out..." : <><LogOut className="mr-2 h-5 w-5" /> Logout</>}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex-col shadow-md">
        <div className="p-6 text-xl font-bold tracking-wider text-yellow-400">
          Quizzo
        </div>

        <nav className="flex-1">
          <ul className="space-y-2 p-4">
            <li>
              <Link href="/" className="flex items-center p-3 rounded-md hover:bg-gray-800">
                <Home className="mr-3 h-5 w-5" />
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="flex items-center p-3 rounded-md hover:bg-gray-800">
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/create-quiz" className="flex items-center p-3 rounded-md hover:bg-gray-800">
                <PlusCircle className="mr-3 h-5 w-5" />
                Create Quiz
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4">
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600"
          >
            {loading ? "Logging out..." : <><LogOut className="mr-2 h-5 w-5" /> Logout</>}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
