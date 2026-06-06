import React, { useState, useRef, useEffect } from "react";
import { Send, User, Check, Sparkles, Smile } from "lucide-react";
import { ChatMessage, UserType } from "../types";

interface MessagesProps {
  currentUsername: string;
  currentUserEmail: string;
  role: UserType | null;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export default function MessagesView({
  currentUsername,
  currentUserEmail,
  role,
  messages,
  onSendMessage
}: MessagesProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  return (
    <div className="max-w-6xl mx-auto border border-gray-200 rounded-xl bg-white shadow-md overflow-hidden flex h-[600px] animate-fade-in py-1">
      {/* Sidebar - Chats List precisely Page 22 */}
      <div className="w-1/3 border-r border-gray-200 bg-gray-50 flex flex-col justify-between">
        <div>
          <div className="p-4 border-b border-gray-200 bg-white">
            <h3 className="text-lg font-black tracking-tight text-gray-800">Messages</h3>
          </div>
          
          <div className="p-2 space-y-1">
            <button
              className="w-full flex items-center space-x-3 p-3 bg-blue-50/50 border border-blue-100 rounded-lg text-left transition select-none scroll-smooth cursor-pointer"
              id="chat-sidebar-row"
            >
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-sm shrink-0">
                JD
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-400 truncate font-mono"> Roster Partner</p>
              </div>
              <span className="w-2 h-2 bg-blue-600 rounded-full shrink-0" />
            </button>
          </div>
        </div>

        {/* User Identity Footer inside Sidebar */}
        <div className="p-4 border-t border-gray-200 bg-white text-xs text-gray-500 font-mono flex items-center space-x-1">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          <span className="truncate">Active: {currentUsername}</span>
        </div>
      </div>

      {/* Main Conversation Window precisely Page 22 */}
      <div className="w-2/3 flex flex-col justify-between h-full bg-white relative">
        
        {/* Chat partner header */}
        <div className="p-4 border-b border-gray-200 flex items-center space-x-3 bg-gray-50/20">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold font-mono">
            JD
          </div>
          <div>
            <h4 className="text-md font-bold text-gray-900">John Doe</h4>
            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-bold animate-pulse">
              ONLINE
            </span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/30 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
              <User className="w-12 h-12 stroke-[1.2] text-gray-300" />
              <p className="text-sm">Initiate conversation with your matched partner below.</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.sender === currentUserEmail;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"} animate-scale-up`}
                >
                  <div className="max-w-[80%] space-y-1">
                    {/* Message Card bubble */}
                    <div
                      className={`p-3.5 rounded-2xl shadow-sm text-sm font-semibold tracking-wide ${
                        isMe
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {/* Timestamp & name footer */}
                    <div className="flex items-center space-x-1 justify-end px-1">
                      <span className="text-[9px] text-gray-400 font-mono uppercase">{msg.timestamp}</span>
                      {isMe && <Check className="w-3 h-3 text-emerald-500" />}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input box with Send Icon exactly Page 22 bottom layout */}
        <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white flex items-center space-x-3 shadow-inner">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow p-3 bg-gray-50 rounded-lg text-sm border border-gray-200 outline-none focus:border-blue-500 transition focus:bg-white"
            id="chat-message-input-textbox"
          />
          {/* Send Icon shaped exactly like dark paper plane banner on bottom right of Screenshot 22 */}
          <button
            type="submit"
            className="p-3 bg-gray-900 border border-gray-900 hover:bg-gray-850 text-white rounded-lg shadow cursor-pointer transition relative group"
            id="send-chat-submit-btn"
          >
            <Send className="w-5 h-5 -rotate-12 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </button>
        </form>

      </div>
    </div>
  );
}
