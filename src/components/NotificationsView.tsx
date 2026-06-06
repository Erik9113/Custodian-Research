import React from "react";
import { Bell, CheckSquare, Trash, Inbox } from "lucide-react";
import { Notification } from "../types";

interface NotificationsViewProps {
  notifications: Notification[];
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export default function NotificationsView({
  notifications,
  onMarkAllAsRead,
  onClearAll
}: NotificationsViewProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in py-12 flex flex-col items-center">
      
      {/* Heavy Bell Icon centered at top of Screenshot 23, 24, 25 */}
      <div className="flex flex-col items-center mb-4 text-gray-800">
        <div className="relative p-5 bg-gray-100 rounded-full shadow-inner animate-wiggle">
          <Bell className="w-16 h-16 stroke-[1.5]" />
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="absolute top-4 right-4 w-4.5 h-4.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          )}
        </div>
      </div>

      {/* Main Display panel card */}
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-8 w-full max-w-2xl text-center space-y-6">
        
        {/* Dynamic grey box mirroring screenshots 23, 24, 25 */}
        <div className="bg-gray-200 p-8 sm:p-12 text-gray-900 rounded-lg min-h-[160px] flex items-center justify-center font-medium shadow-inner">
          {notifications.length === 0 ? (
            /* Page 23 Notification Text */
            <p className="text-lg sm:text-2xl tracking-normal text-gray-800 select-none">
              You have no current notifications
            </p>
          ) : (
            <div className="space-y-4 w-full">
              {notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`p-4 rounded-lg bg-white border border-gray-150 text-left relative flex items-start space-x-3 shadow-sm transition hover:shadow ${
                    notif.read ? "opacity-60" : "border-l-4 border-l-blue-600"
                  }`}
                  id={`notification-row-${notif.id}`}
                >
                  <span className="text-xl">🔔</span>
                  <div className="flex-grow min-w-0">
                    {/* Prints the Page 24 / 25 sentences verbatim */}
                    <p className="text-sm sm:text-base font-bold text-gray-800 select-text leading-snug">
                      {notif.text}
                    </p>
                    <span className="text-[10px] text-gray-450 font-mono mt-1 block uppercase">
                      {notif.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clear and Mark read triggers for a complete operational experience */}
        {notifications.length > 0 && (
          <div className="flex justify-between items-center text-xs border-t pt-4">
            <button
              onClick={onMarkAllAsRead}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-bold transition cursor-pointer"
            >
              <CheckSquare className="w-4 h-4" />
              <span>Mark all as read</span>
            </button>
            <button
              onClick={onClearAll}
              className="flex items-center space-x-1 text-gray-400 hover:text-red-650 font-bold transition cursor-pointer font-sans"
            >
              <Trash className="w-4 h-4" />
              <span>Clear Notifications</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
