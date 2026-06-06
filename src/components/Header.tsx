import React from "react";
import { Compass, MessageSquare, Bell, Beaker, LogOut } from "lucide-react";
import { UserType, Notification } from "../types";

interface HeaderProps {
  title: string;
  role: UserType | null;
  username: string;
  activeTab: "dashboard" | "messages" | "notifications" | "labProfile";
  onTabChange: (tab: "dashboard" | "messages" | "notifications" | "labProfile") => void;
  onLogout: () => void;
  notifications: Notification[];
}

export default function Header({
  title,
  role,
  username,
  activeTab,
  onTabChange,
  onLogout,
  notifications
}: HeaderProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Section - Title */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 select-none">
            {title}
          </h1>
        </div>

        {/* Right Section - Navigation Tabs and Username */}
        <div className="flex items-center space-x-6 sm:space-x-8">
          <nav className="flex items-center space-x-6">
            {/* Dashboard Icon */}
            <button
              onClick={() => onTabChange("dashboard")}
              className={`flex flex-col items-center justify-center space-y-1 group transition cursor-pointer ${
                activeTab === "dashboard" ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
              }`}
              title="View Dashboard"
              id="header-nav-dashboard"
            >
              <div className="p-1.5 rounded-full transition group-hover:bg-gray-100">
                <Compass className="w-6 h-6 stroke-[1.8]" />
              </div>
              <span className="text-xs font-medium tracking-wide">Dashboard</span>
            </button>

            {/* Edit Lab Profile - ONLY FOR LAB ROLE */}
            {role === "lab" && (
              <button
                onClick={() => onTabChange("labProfile")}
                className={`flex flex-col items-center justify-center space-y-1 group transition cursor-pointer ${
                  activeTab === "labProfile" ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                }`}
                title="Edit Lab Profile"
                id="header-nav-lab-profile"
              >
                <div className="p-1.5 rounded-full transition group-hover:bg-gray-100">
                  <Beaker className="w-6 h-6 stroke-[1.8]" />
                </div>
                <span className="text-xs font-medium tracking-wide">Edit Lab Profile</span>
              </button>
            )}

            {/* Messaging Icon */}
            <button
              onClick={() => onTabChange("messages")}
              className={`flex flex-col items-center justify-center space-y-1 group relative transition cursor-pointer ${
                activeTab === "messages" ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
              }`}
              title="Messages"
              id="header-nav-messages"
            >
              <div className="p-1.5 rounded-full transition group-hover:bg-gray-100">
                <MessageSquare className="w-6 h-6 stroke-[1.8]" />
              </div>
              <span className="text-xs font-medium tracking-wide">Messaging</span>
            </button>

            {/* Notifications Icon with Badge */}
            <button
              onClick={() => onTabChange("notifications")}
              className={`flex flex-col items-center justify-center space-y-1 group relative transition cursor-pointer ${
                activeTab === "notifications" ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
              }`}
              title="Notifications"
              id="header-nav-notifications"
            >
              <div className="p-1.5 rounded-full transition group-hover:bg-gray-100">
                <Bell className="w-6 h-6 stroke-[1.8]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse" />
                )}
              </div>
              <span className="text-xs font-medium tracking-wide">Notifications</span>
            </button>
          </nav>

          {/* User Info / Logout Button combo */}
          <div className="h-10 w-[1px] bg-gray-200" />

          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 truncate max-w-[150px]" title={username}>
                {username}
              </p>
              <p className="text-xs text-gray-400 capitalize">{role || "Not Logged In"}</p>
            </div>
            <button
              onClick={onLogout}
              className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-50 transition cursor-pointer"
              title="Logout"
              id="header-logout-button"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
