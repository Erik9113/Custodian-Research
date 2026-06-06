import React, { useState } from "react";
import { Clock, CheckSquare, XCircle, Heart, Award, ArrowLeft, MessageSquare, ShieldCheck, HelpCircle } from "lucide-react";
import { ProjectApplication } from "../types";
import ProgressIndicator from "./ProgressIndicator";

interface DecisionViewProps {
  application: ProjectApplication | null;
  onBackToDashboard: () => void;
  // Simulation helpers to let user trigger decision
  onSimulateReview: (status: "Accepted" | "Denied", feedbackText: string) => void;
}

export default function DecisionView({
  application,
  onBackToDashboard,
  onSimulateReview
}: DecisionViewProps) {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [customFeedbackValue, setCustomFeedbackValue] = useState(
    "Your project is really cool, and we would love to have you in our lab!"
  );

  const status = application?.status || "Not Yet Reviewed";
  const feedback = application?.feedback || "Your application is currently being evaluated by our research coordinator.";

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-6">
      
      {/* Navigation Shortcut */}
      <button 
        onClick={onBackToDashboard}
        className="flex items-center space-x-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition cursor-pointer"
        id="decision-back-btn"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </button>

      {/* Simulator Quick Action Panel */}
      {status === "Not Yet Reviewed" && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest font-mono">
              Research Decision Sandbox
            </h4>
            <p className="text-sm font-semibold text-blue-950">
              Your application is currently pending. Simulate the supervisor review below to view the updated decision outcomes!
            </p>
          </div>

          <div className="space-y-3">
            <textarea
              value={customFeedbackValue}
              onChange={(e) => setCustomFeedbackValue(e.target.value)}
              placeholder="Write feedback remarks..."
              rows={2}
              className="w-full text-xs p-2.5 border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => onSimulateReview("Accepted", customFeedbackValue)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded transition flex items-center space-x-1 cursor-pointer"
              >
                <span>Simulate Acceptance</span>
              </button>
              <button
                onClick={() => onSimulateReview("Denied", "Sorry, this isn't quite what we're looking for right now.")}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded transition flex items-center space-x-1 cursor-pointer"
              >
                <span>Simulate Denial</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main card box mirroring Pages 12 & 13 */}
      <div className="bg-white border border-gray-200 shadow-md rounded-xl p-10 space-y-8 relative min-h-[300px] flex flex-col justify-between">
        
        {/* Dynamic Display boxes based on status */}
        <div className="space-y-6">
          {status === "Not Yet Reviewed" && (
            <div className="space-y-6 animate-pulse">
              <div className="flex items-center space-x-3 text-amber-500">
                <Clock className="w-10 h-10 stroke-[1.8]" />
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded">
                  Pending Reviewer Allocation
                </span>
              </div>
              {/* Screen 12 Display Content */}
              <h3 className="text-3xl font-black text-gray-800 tracking-tight leading-none" id="awaiting-decision-label">
                Awaiting Decision
              </h3>
              <p className="text-base text-gray-550 leading-relaxed max-w-2xl">
                Your prompt design proposal, cover letters, and references have been cataloged successfully. The coordinator in charge of <span className="font-bold text-gray-800">{application?.labName || "your selected lab"}</span> will deliver comments and verdict shortly.
              </p>
            </div>
          )}

          {status === "Accepted" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-emerald-600">
                <ShieldCheck className="w-10 h-10" />
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded">
                  Admissions Verdict: Accepted
                </span>
              </div>
              {/* Screen 13 Content */}
              <h3 className="text-3xl font-black text-gray-900 tracking-tight leading-none" id="accepted-decision-label">
                You’ve been accepted into {application?.labName || "Lorem Ipsum Lab"}
              </h3>
              <p className="text-base text-gray-550 leading-relaxed max-w-2xl">
                Congratulations! The research team has determined your design proposal aligns perfectly with their ongoing research prompt: <span className="font-semibold text-gray-800">"{application?.promptTopic}"</span>.
              </p>

              {/* View Feedback button mirroring Page 13 */}
              <div className="pt-4">
                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="px-6 py-3.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg shadow-sm transition hover:scale-[1.015] active:scale-100 flex items-center space-x-2 cursor-pointer"
                  id="view-feedback-button"
                >
                  <MessageSquare className="w-4.5 h-4.5" />
                  <span>View Feedback</span>
                </button>
              </div>
            </div>
          )}

          {status === "Denied" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-red-600">
                <XCircle className="w-10 h-10" />
                <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2.5 py-1 rounded">
                  Admissions Verdict: Not Accepted
                </span>
              </div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight leading-none" id="denied-decision-label">
                View Decision: DENIAL
              </h3>
              <p className="text-base text-gray-500 leading-relaxed max-w-2xl">
                Thank you for your proposal. Given our capacity constraints and specific prerequisites this season, we are unable to accept your project into {application?.labName || "Lorem Ipsum Lab"} at this time.
              </p>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-650 italic">
                Feedback comments: "{feedback}"
              </div>
            </div>
          )}
        </div>

        {/* Action Link summary */}
        <div className="border-t border-gray-150 pt-6 mt-6 flex justify-between items-center text-xs text-gray-400 font-mono">
          <span>Lab Coordinator: {application?.labName || "N/A"} Admissions</span>
          <span>Application ID: {application?.id || "N/A"}</span>
        </div>
      </div>

      {/* Feedback Modal Drawer */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border border-gray-200 rounded-xl max-w-lg w-full p-8 shadow-2xl relative space-y-6 animate-scale-up">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h4 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <span>Professoral Evaluation Feedback</span>
              </h4>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-gray-400 hover:text-gray-900 font-black text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-800 font-medium italic leading-relaxed">
                “{feedback || "Your project is really cool, and we would love to have you in our lab!"}”
              </div>

              <div className="space-y-2 text-xs text-gray-500">
                <p><strong className="text-gray-700">Allocated Lead:</strong> Admissions Coordinator</p>
                <p><strong className="text-gray-700">Project Target:</strong> {application?.promptTopic}</p>
                <p><strong className="text-gray-700">Status Check:</strong> ONBOARDED / ROSTER ACTIVE</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="px-4 py-2 bg-gray-900 text-white font-bold rounded hover:bg-gray-800 text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress tracker showing Decision phase (Index 3) */}
      <ProgressIndicator stepIndex={3} />
    </div>
  );
}
