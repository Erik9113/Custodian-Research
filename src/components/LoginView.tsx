import React, { useState } from "react";
import { Code, Share2, FlaskConical, Play, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { UserType } from "../types";

interface LoginViewProps {
  onLoginSuccess: (role: UserType, email: string, name: string) => void;
}

export default function LoginView({ onLoginSuccess }: LoginViewProps) {
  const [viewState, setViewState] = useState<"landing" | "choose_role" | "login" | "register">("landing");
  const [selectedRole, setSelectedRole] = useState<UserType | null>(null);

  // Form Fields
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  // Quick fill tester accounts
  const handleQuickLogin = (role: UserType) => {
    if (role === "student") {
      onLoginSuccess("student", "jane.doe@university.edu", "Jane Doe");
    } else {
      onLoginSuccess("lab", "alex.doe@university.edu", "Dr. Alex Doe");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !password) {
      setNotification("Please fill in all blanks.");
      return;
    }
    onLoginSuccess(selectedRole || "student", email, name);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setNotification("Please enter both email and password.");
      return;
    }
    // Simulate lookup, find username
    const username = email.split("@")[0];
    const formalName = username.charAt(0).toUpperCase() + username.slice(1);
    onLoginSuccess(selectedRole || "student", email, formalName);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      {/* Header bar mirroring "Homepage - Not logged in" */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
        <span className="text-sm font-semibold tracking-wide text-gray-500">Homepage</span>
        <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full uppercase tracking-widest">
          Not logged in
        </span>
      </div>

      <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col items-center justify-center space-y-12 my-auto">
        {viewState === "landing" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
            {/* Left Column (Copy) */}
            <div className="space-y-6">
              <span className="text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-50 px-3 py-1 rounded">
                Connecting University Students & Labs
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-none">
                Welcome to
              </h2>

              {/* Research Custodian Styled Logo */}
              <div className="p-6 bg-white border border-gray-150 rounded-xl shadow-sm space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-600 text-white rounded-full">
                    <Share2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-blue-900 tracking-wide select-none">
                      Research <span className="text-blue-600 font-medium">Custodian</span>
                    </h3>
                    <p className="text-xs text-gray-400 font-mono tracking-wider">Doing Interdisciplinary & Niche Research</p>
                  </div>
                </div>
                <div className="h-[1px] bg-gray-100 my-2" />
                <div className="flex justify-center space-x-8 text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Code className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-mono">Code</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Share2 className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-mono">Network</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FlaskConical className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-mono">Science</span>
                  </div>
                </div>
              </div>

              {/* Video Prompt */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center space-x-3">
                <div className="p-2 bg-yellow-400 rounded-full text-yellow-900">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <p className="text-sm text-yellow-800">
                  If you’re new, check our{" "}
                  <a href="#tutorial" className="font-bold underline hover:text-yellow-950">
                    tutorial video
                  </a>{" "}
                  for a platform walkthrough.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => {
                    setSelectedRole("student");
                    setViewState("choose_role");
                  }}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition flex items-center justify-center space-x-2 cursor-pointer"
                  id="landing-get-started"
                >
                  <span>Create an Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setViewState("choose_role");
                  }}
                  className="px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg border border-gray-300 transition flex items-center justify-center space-x-2 cursor-pointer"
                  id="landing-login"
                >
                  <span>Sign In</span>
                </button>
              </div>
            </div>

            {/* Right Column - Demo Box & Features list */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm space-y-6">
              <h4 className="text-xl font-bold text-gray-900">Prototype Demo Quick-Login</h4>
              <p className="text-sm text-gray-500">
                You can explore both roles (Student and Lab and their full interaction flow) using these prefilled tester accounts.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => handleQuickLogin("student")}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50/50 text-left transition flex items-center justify-between group cursor-pointer"
                  id="quick-login-student"
                >
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">Explore as</span>
                    <span className="text-md font-bold text-gray-800">Student (Jane Doe / University)</span>
                  </div>
                  <ChevronRight />
                </button>

                <button
                  onClick={() => handleQuickLogin("lab")}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition flex items-center justify-between group cursor-pointer"
                  id="quick-login-lab"
                >
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">Explore as</span>
                    <span className="text-md font-bold text-gray-800">Lab Manager (Lorem Ipsum Lab)</span>
                  </div>
                  <ChevronRight />
                </button>
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-xs text-gray-500">Interactive Student dashboard & matching simulations</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-xs text-gray-500">Full-stack Kanban lab applications manager with live feedback controls</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-xs text-gray-500">AI Prompt generator incorporating Google GenAI server-side API</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewState === "choose_role" && (
          <div className="flex flex-col items-center space-y-6 w-full max-w-xl">
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Select your user type</h3>
            <p className="text-sm text-gray-500">Select whether you are joining as a student researcher or a coordinator lab.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <button
                onClick={() => {
                  setSelectedRole("student");
                  setViewState("register");
                }}
                className="p-8 bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50/20 text-center rounded-xl transition cursor-pointer group"
                id="select-role-student"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                  <Code className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-gray-900">I am a student</h4>
                <p className="text-xs text-gray-500 mt-1">Apply to labs, find custom research projects, and collaborate with peers.</p>
              </button>

              <button
                onClick={() => {
                  setSelectedRole("lab");
                  setViewState("register");
                }}
                className="p-8 bg-white border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/20 text-center rounded-xl transition cursor-pointer group"
                id="select-role-lab"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-gray-900">I am a research lab</h4>
                <p className="text-xs text-gray-500 mt-1">Review applicant profiles, manage project requirements, and output decisions.</p>
              </button>
            </div>

            <button
              onClick={() => setViewState("landing")}
              className="text-xs font-bold text-blue-600 underline hover:text-blue-800 uppercase tracking-widest cursor-pointer"
            >
              Back to Homepage
            </button>
          </div>
        )}

        {(viewState === "login" || viewState === "register") && (
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm w-full max-w-md space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-600 tracking-widest uppercase block mb-1">
                {selectedRole === "student" ? "STUDENT ENTRANCE" : "LAB ENTRANCE"}
              </span>
              <h3 className="text-2xl font-bold text-gray-900">
                {viewState === "register" ? "Create an account" : "Welcome back"}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Enter your institutional details below to log in securely.
              </p>
            </div>

            {notification && (
              <div className="px-4 py-2 border border-red-200 bg-red-50 text-red-700 rounded-lg text-xs">
                {notification}
              </div>
            )}

            <form onSubmit={viewState === "register" ? handleRegister : handleLogin} className="space-y-4">
              {viewState === "register" && (
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1.5">
                    Name:
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your first and last name"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm transition"
                    required
                    id="form-register-name"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1.5">
                  Institutional email address:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. jane.doe@university.edu"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm transition"
                  required
                  id="form-input-email"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1.5">
                  Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm transition"
                  required
                  id="form-input-password"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg shadow transition flex items-center justify-center space-x-2 cursor-pointer"
                id="form-submit-button"
              >
                <span>{viewState === "register" ? "Register & Enter Dashboard" : "Sign In"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                onClick={() => setViewState(viewState === "register" ? "login" : "register")}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                id="toggle-login-register"
              >
                {viewState === "register" ? "Already have an account? Sign In" : "Need an account? Register here"}
              </button>
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-400 border-t border-gray-100 pt-4">
              <button onClick={() => setViewState("choose_role")} className="hover:underline flex items-center space-x-1 cursor-pointer">
                <span>← Change Role</span>
              </button>
              <div className="flex items-center space-x-1 uppercase tracking-wider font-bold">
                <Lock className="w-3 h-3" />
                <span>SSL Secured</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs text-gray-400 border-t border-gray-200 pt-4 mt-8 select-none">
        &copy; {new Date().getFullYear()} Custodian Research Platform. Preloaded with mock structures from specifications.
      </div>
    </div>
  );
}

// Inline mini Chevron helper to avoid creating more files
function ChevronRight() {
  return (
    <svg
      className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition translate-x-0 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
