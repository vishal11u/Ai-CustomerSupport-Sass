"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth, useUser } from "@clerk/nextjs";
import { UserProfile } from "@clerk/nextjs";
import { Globe, Bell, Moon, User, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    marketingEmails: false,
    productUpdates: true,
    language: "en",
    timezone: "UTC",
    fontSize: "medium",
    colorTheme: "default",
    dateFormat: "MM/DD/YYYY",
    currency: "USD"
  });
  const [activeTab, setActiveTab] = useState("account");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { userId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    // Fetch user settings from Supabase
    async function fetchSettings() {
      if (!userId) return;
      
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching settings:", error);
        return;
      }
      
      if (data) {
        setSettings(data.settings || settings);
      }
    }
    
    fetchSettings();
  }, [userId]);

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      if (!userId) {
        toast({
          title: "Error",
          description: "You must be logged in to save settings",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('user_settings')
        .upsert(
          {
            user_id: userId,
            settings,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        );

      if (error) throw error;

      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    } catch (error) {
      console.error("Settings save error:", error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="gap-2"
        >
          {isSaving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Custom Tabs */}
      <div className="mb-8">
        <div className="flex border-b">
          <button
            className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
              activeTab === "account" 
                ? "border-primary text-primary" 
                : "border-transparent hover:text-primary hover:border-primary/30"
            }`}
            onClick={() => setActiveTab("account")}
          >
            <User className="h-4 w-4" />
            Account
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
              activeTab === "notifications" 
                ? "border-primary text-primary" 
                : "border-transparent hover:text-primary hover:border-primary/30"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className="h-4 w-4" />
            Notifications
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
              activeTab === "appearance" 
                ? "border-primary text-primary" 
                : "border-transparent hover:text-primary hover:border-primary/30"
            }`}
            onClick={() => setActiveTab("appearance")}
          >
            <Moon className="h-4 w-4" />
            Appearance
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
              activeTab === "regional" 
                ? "border-primary text-primary" 
                : "border-transparent hover:text-primary hover:border-primary/30"
            }`}
            onClick={() => setActiveTab("regional")}
          >
            <Globe className="h-4 w-4" />
            Regional
          </button>
        </div>
      </div>
      
      {/* Account Settings Tab */}
      {activeTab === "account" && (
        <div className="rounded-lg border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Account Settings</h2>
            <p className="text-sm text-muted-foreground">
              Manage your profile information, email address, and password
            </p>
          </div>
          <div className="p-6">
            <div className="h-[650px] overflow-hidden rounded-lg border">
              {user && <UserProfile />}
            </div>
          </div>
        </div>
      )}
      
      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="rounded-lg border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Notification Preferences</h2>
            <p className="text-sm text-muted-foreground">
              Configure how and when you'd like to receive notifications
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <label htmlFor="email-notifications" className="font-medium">Email Notifications</label>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications for important updates
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  id="email-notifications"
                  className="peer sr-only"
                  checked={settings.notifications}
                  onChange={(e) => handleChange("notifications", e.target.checked)}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <label htmlFor="marketing-emails" className="font-medium">Marketing Emails</label>
                <p className="text-sm text-muted-foreground">
                  Receive promotional emails and special offers
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  id="marketing-emails"
                  className="peer sr-only"
                  checked={settings.marketingEmails}
                  onChange={(e) => handleChange("marketingEmails", e.target.checked)}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <label htmlFor="product-updates" className="font-medium">Product Updates</label>
                <p className="text-sm text-muted-foreground">
                  Get notified about new features and improvements
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  id="product-updates"
                  className="peer sr-only"
                  checked={settings.productUpdates}
                  onChange={(e) => handleChange("productUpdates", e.target.checked)}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
          </div>
        </div>
      )}
      
      {/* Appearance Tab */}
      {activeTab === "appearance" && (
        <div className="rounded-lg border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Appearance Settings</h2>
            <p className="text-sm text-muted-foreground">
              Customize how the application looks and feels
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <label htmlFor="dark-mode" className="font-medium">Dark Mode</label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark theme
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  id="dark-mode"
                  className="peer sr-only"
                  checked={settings.darkMode}
                  onChange={(e) => handleChange("darkMode", e.target.checked)}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="font-size" className="block font-medium">Font Size</label>
              <select
                id="font-size"
                className="w-full rounded-lg border p-2"
                value={settings.fontSize}
                onChange={(e) => handleChange("fontSize", e.target.value)}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="color-theme" className="block font-medium">Color Theme</label>
              <select
                id="color-theme"
                className="w-full rounded-lg border p-2"
                value={settings.colorTheme}
                onChange={(e) => handleChange("colorTheme", e.target.value)}
              >
                <option value="default">Default</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="green">Green</option>
              </select>
            </div>
          </div>
        </div>
      )}
      
      {/* Regional Tab */}
      {activeTab === "regional" && (
        <div className="rounded-lg border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Regional Settings</h2>
            <p className="text-sm text-muted-foreground">
              Configure language, timezone, and other regional preferences
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="language" className="block font-medium">Language</label>
              <select
                id="language"
                className="w-full rounded-lg border p-2"
                value={settings.language}
                onChange={(e) => handleChange("language", e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="timezone" className="block font-medium">Timezone</label>
              <select
                id="timezone"
                className="w-full rounded-lg border p-2"
                value={settings.timezone}
                onChange={(e) => handleChange("timezone", e.target.value)}
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time (EST)</option>
                <option value="CST">Central Time (CST)</option>
                <option value="MST">Mountain Time (MST)</option>
                <option value="PST">Pacific Time (PST)</option>
                <option value="GMT">Greenwich Mean Time (GMT)</option>
                <option value="IST">India Standard Time (IST)</option>
                <option value="JST">Japan Standard Time (JST)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="date-format" className="block font-medium">Date Format</label>
              <select
                id="date-format"
                className="w-full rounded-lg border p-2"
                value={settings.dateFormat}
                onChange={(e) => handleChange("dateFormat", e.target.value)}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="DD.MM.YYYY">DD.MM.YYYY</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="currency" className="block font-medium">Currency</label>
              <select
                id="currency"
                className="w-full rounded-lg border p-2"
                value={settings.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
              >
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">British Pound (GBP)</option>
                <option value="JPY">Japanese Yen (JPY)</option>
                <option value="CAD">Canadian Dollar (CAD)</option>
                <option value="AUD">Australian Dollar (AUD)</option>
                <option value="INR">Indian Rupee (INR)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 