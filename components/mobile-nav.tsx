"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="text-lg font-semibold">Menu</div>
        <button
          onClick={onClose}
          className="rounded-md p-2 hover:bg-accent"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="container grid gap-4 p-4 text-lg">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center rounded-md p-3 text-sm font-medium hover:bg-accent ${
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
} 