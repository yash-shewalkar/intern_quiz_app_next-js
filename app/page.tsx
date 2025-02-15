"use client"

import { ModeToggle } from "@/components/darkmode";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-20% h-30% ">
      Hello
      <ModeToggle />
      <Button>Click me</Button>

    </div>
  );
}
