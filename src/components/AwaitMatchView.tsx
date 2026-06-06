import React, { useState, useEffect } from "react";
import { Users, AlertCircle, ArrowRight, MessageSquare, Bell, CheckCircle, Flame } from "lucide-react";
import ProgressIndicator from "./ProgressIndicator";

interface AwaitMatchViewProps {
  labName: string;
  isMatched: boolean;
  onSimulateMatch: () => void;
  onProceedToApplication: () => void;
}

export default function AwaitMatchView({
  labName,
  isMatched,
  onSimulateMatch,
  onProceedToApplication
}: AwaitMatchViewProps) {
  const [countdown, setCountdown] = useState(3);
  const [autoSimulating, setAutoSimulating] = useState(false);

  useEffect(() => {
    let timer: any;
    if (autoSimulating && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (autoSimulating && countdown === 0) {
      onSimulateMatch();
      setAutoSimulating(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, autoSimulating, onSimulateMatch]);

  const triggerAutoSimulate = () => {
    setCountdown(3);
    setAutoSimulating(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-6">
      
      {/* Simulation Tools Panel (Aesthetic helper for a richer experience) */}
      {!isMatched && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest flex items-center space-x-1.5 font-mono">
              <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Interactive Mockup tools</span>
            </h4>
            <p className="text-sm font-semibold text-amber-950">
              {autoSimulating 
                ? `Searching for a partner matching your interests... (${countdown}s)` 
                : "Want to simulate getting matched immediately? Click either helper below:"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 items-center">
            <button
              onClick={onSimulateMatch}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs tracking-wider uppercase transition cursor-pointer"
              id="simulate-instant-match"
            >
              Instant Match
            </button>
            <button
              onClick={triggerAutoSimulate}
              disabled={autoSimulating}
              className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 font-bold rounded-lg text-xs tracking-wider uppercase disabled:opacity-50 transition cursor-pointer"
            >
              Timed Search
            </button>
          </div>
        </div>
      )}

      {/* Main card matching layout & typography in Page 10 */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 space-y-12 min-h-[350px] flex flex-col justify-between">
        
        {/* Main Status Text exactly matching screenshot Page 10 */}
        <div className="space-y-8 max-w-3xl">
          {!isMatched ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-blue-600">
                <Users className="w-10 h-10 animate-bounce" />
                <h3 className="text-2xl font-black tracking-tight text-gray-900">
                  Awaiting Partner Match...
                </h3>
              </div>
              
              <p className="text-lg sm:text-2xl text-gray-800 leading-normal font-semibold">
                Check your notifications tab for when you get matched and can start to ideate on a project.
              </p>

              <div className="p-4 bg-gray-50 rounded-lg flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-500 font-medium">
                  We match you with other student researchers with similar interests (e.g. Piano Performance or computer science) who selected the same lab constraints.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-emerald-600">
                <CheckCircle className="w-10 h-10" />
                <h3 className="text-2xl font-black tracking-tight text-gray-900">
                  Partner Matching Succeeded!
                </h3>
              </div>

              {/* Page 10 Copy paragraphs */}
              <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-semibold">
                You’ve been matched with <span className="text-blue-600 underline font-bold">John Doe</span>! Check your notifications and messages tab to connect.
              </p>

              <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-semibold">
                Your messages tab will be where you can communicate with your respective partner for the project.
              </p>

              <div className="p-4 bg-emerald-50 border border-emerald-150 rounded-lg flex items-center space-x-3 text-emerald-800">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold">
                  John Doe: "Hey! Glad we got matched. I think prompt #3 looks fascinating! Let's get started on our abstract."
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Row including the Right circular Arrow & Label "Decision/Application" from Page 10 */}
        <div className="flex justify-end items-center border-t border-gray-150 pt-8 mt-4">
          {isMatched ? (
            <button
              onClick={onProceedToApplication}
              className="group flex flex-col items-center justify-center space-y-1.5 cursor-pointer text-blue-600 hover:text-blue-800 transition"
              id="await-forward-proceed"
            >
              <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition duration-300">
                <ArrowRight className="w-7 h-7" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-gray-500">
                Go Write Abstract
              </span>
            </button>
          ) : (
            <div className="text-center sm:text-right">
              <p className="text-xs font-extrabold tracking-widest text-gray-400 uppercase">
                Awaiting Match Notification
              </p>
              <p className="text-sm text-gray-500 font-medium mt-1">
                You will be automatically redirected when matching completes.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Page Progress Indicator showing step index 2 (Application) */}
      <ProgressIndicator stepIndex={2} />
    </div>
  );
}
