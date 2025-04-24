import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import "../styles/globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SupportGenie - AI-Powered Customer Support",
  description: "24/7 AI Support that Feels Human – Built for Modern Businesses",
  keywords: ["AI support", "customer service", "helpdesk", "chatbot", "SaaS"],
  alternates: {
    canonical: "https://www.supportgenie.ai", 
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} flex flex-col min-h-screen`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster />
            <ChatWidget userId="" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
