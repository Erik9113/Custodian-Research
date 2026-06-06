import React from "react";
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

interface ConfirmDecisionViewProps {
  studentName: string;
  decision: "Accepted" | "Denied";
  feedback: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDecisionView({
  studentName,
  decision,
  feedback,
  onConfirm,
  onCancel
}: ConfirmDecisionViewProps) {
  const isAccepted = decision === "Accepted";

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-6">
      
      {/* Short Return Link */}
      <button 
        onClick={onCancel}
        className="flex items-center space-x-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition cursor-pointer"
        id="confirm-decision-back"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Edit Feedback details</span>
      </button>

      {/* Main Container mirroring Pages 20 & 21 */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-8 space-y-8">
        
        <div className="border-b pb-4">
          <span className="text-xs font-bold text-gray-400 block uppercase tracking-widest font-mono">
            Roster Security Clearance
          </span>
          <h2 className="text-2xl font-bold text-gray-950 mt-1">Confirm Decision</h2>
        </div>

        {/* Display panel exactly styled box from Page 20/21 */}
        <div className="bg-gray-50/50 border border-gray-200 p-8 rounded-xl space-y-6">
          
          {/* Applicant Row */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 text-lg font-bold">
            <span className="text-sm font-bold text-gray-450 uppercase tracking-widest min-w-[120px]">
              Applicant:
            </span>
            <span className="text-gray-900">{studentName}</span>
          </div>

          {/* Decision Row exactly Page 20 (green ACCEPTANCE) or Page 21 (red DENIAL) */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 text-lg font-black font-sans">
            <span className="text-sm font-bold text-gray-450 uppercase tracking-widest min-w-[120px]">
              Decision:
            </span>
            {isAccepted ? (
              <span className="text-emerald-600 tracking-wide font-black" id="confirm-verdict-text">ACCEPTANCE</span>
            ) : (
              <span className="text-red-650 tracking-wide font-black" id="confirm-verdict-text">DENIAL</span>
            )}
          </div>

          {/* Feedback Row exactly Page 20 & 21 */}
          <div className="flex flex-col space-y-2 text-md sm:text-lg">
            <span className="text-sm font-bold text-gray-455 uppercase tracking-widest font-sans">
              Feedback:
            </span>
            <blockquote className="text-gray-800 font-bold leading-normal font-sans italic p-4 bg-white border border-gray-150 rounded-lg">
              “{feedback}”
            </blockquote>
          </div>

        </div>

        {/* Security Policy Reminder */}
        <div className="p-4 bg-yellow-50 border border-yellow-150 rounded-lg text-xs flex items-start space-x-2.5 text-yellow-800 leading-normal font-medium">
          <AlertTriangle className="w-5 h-5 shrink-0 text-yellow-600" />
          <span>
            By confirming, this decision and reviewer evaluation feedback will be immediately finalized and dispatched to the student's dashboard logs. An automated alert notification will generate instantly.
          </span>
        </div>

        {/* Form Accept & Deny Submit Buttons precisely styled Page 20 (green outline) / Page 21 (red outline) */}
        <div className="pt-6 border-t border-gray-100 flex justify-center">
          {isAccepted ? (
            <button
              onClick={onConfirm}
              className="px-8 py-5 border-2 border-emerald-500 text-emerald-800 text-base font-extrabold flex flex-col items-center justify-center space-y-1 rounded-lg transition hover:bg-emerald-50 cursor-pointer text-center min-w-[280px]"
              id="confirm-decision-and-return-button"
            >
              <span>Confirm Decision</span>
              <span>& Return</span>
            </button>
          ) : (
            <button
              onClick={onConfirm}
              className="px-8 py-5 border-2 border-red-500 text-red-700 text-base font-extrabold flex flex-col items-center justify-center space-y-1 rounded-lg transition hover:bg-red-50 cursor-pointer text-center min-w-[280px]"
              id="confirm-decision-and-return-button"
            >
              <span>Confirm Decision</span>
              <span>& Return</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
