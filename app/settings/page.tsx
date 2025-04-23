"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "en",
    timezone: "UTC",
  });
  const { toast } = useToast();

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error("Failed to save settings");

      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-8 text-2xl font-bold">Settings</h1>

      <div className="max-w-2xl space-y-6">
        {/* Notifications */}
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-lg font-semibold">Notifications</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for important updates
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={settings.notifications}
                onChange={(e) => handleChange("notifications", e.target.checked)}
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
          </div>
        </div>

        {/* Appearance */}
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-lg font-semibold">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark theme
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={settings.darkMode}
                onChange={(e) => handleChange("darkMode", e.target.checked)}
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
          </div>
        </div>

        {/* Language */}
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-lg font-semibold">Language</h2>
          <select
            className="w-full rounded-lg border p-2"
            value={settings.language}
            onChange={(e) => handleChange("language", e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        {/* Timezone */}
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-lg font-semibold">Timezone</h2>
          <select
            className="w-full rounded-lg border p-2"
            value={settings.timezone}
            onChange={(e) => handleChange("timezone", e.target.value)}
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="PST">Pacific Time</option>
            <option value="GMT">Greenwich Mean Time</option>
          </select>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
} 