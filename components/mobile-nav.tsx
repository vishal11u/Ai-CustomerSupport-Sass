"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{
    label: string;
    href: string;
  }>;
}

export function MobileNav({ isOpen, onClose, items }: MobileNavProps) {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background shadow-lg" style={{ backgroundColor: 'var(--background)' }}>
      <div className="sticky top-0 bg-background z-10 container flex h-16 items-center justify-between border-b border-border/40">
        <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Menu
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2 hover:bg-accent text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="bg-background min-h-screen">
        <nav className="container grid gap-3 p-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center rounded-lg p-3 text-md font-medium transition-all ${
                pathname === item.href
                  ? "bg-gradient-to-r from-purple-600/10 to-pink-600/10 text-purple-600 border-l-4 border-purple-600"
                  : "text-muted-foreground hover:bg-gradient-to-r hover:from-purple-600/5 hover:to-pink-600/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {!isSignedIn && (
          <div className="container mt-6 p-4 flex flex-col gap-3">
            <div className="border-t border-border/40 pt-4 mb-2"></div>
            <div className="flex justify-between items-center">
              <ThemeToggle />
              <SignInButton mode="modal">
                <Button variant="ghost" className="w-full justify-start">
                  Sign In
                </Button>
              </SignInButton>
            </div>
            <SignUpButton mode="modal">
              <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mt-2">
                Get Started
              </Button>
            </SignUpButton>
          </div>
        )}
      </div>
    </div>
  );
} 