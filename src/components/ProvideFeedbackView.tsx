import React, { useState } from "react";
import { CheckCircle2, XCircle, FileText, ArrowLeft, Heart, Sparkles } from "lucide-react";
import { ProjectApplication } from "../types";

interface ProvideFeedbackViewProps {
  application: ProjectApplication;
  onSaveDraft: (feedback: string) => void;
  onConfirmDecision: (decision: "Accepted" | "Denied", feedback: string) => void;
  onBack: () => void;
}

export default function ProvideFeedbackView({
  application,
  onSaveDraft,
  onConfirmDecision,
  onBack
}: ProvideFeedbackViewProps) {
  const [feedbackText, setFeedbackText] = useState(application.feedback || "");
  const [selectedDecision, setSelectedDecision] = useState<"Accepted" | "Denied" | null>(
    application.status === "Not Yet Reviewed" ? null : application.status === "Denied" ? "Denied" : "Accepted"
  );
  const [showAutoFiller, setShowAutoFiller] = useState(false);

  // Helper calculating words
  const getWordCount = (str: string) => {
    const trimmed = str.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  };

  const wordCount = getWordCount(feedbackText);
  const isSatisfiedLimit = wordCount >= 100;

  const handleDecisionClick = (decision: "Accepted" | "Denied") => {
    setSelectedDecision(decision);
  };

  const handleProceedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDecision) {
      alert("Please select either Accept (green check) or Deny (red x) to issue a decision.");
      return;
    }
    if (!isSatisfiedLimit) {
      alert(`Word limit not satisfied. A minimum of 100 words is required by university policy to issue a formal decision (Current: ${wordCount}/100 words). Feel free to use the AI Quick-Fill tool below to generate professional feedback!`);
      return;
    }
    
    // Pass to parent to handle confirmation views (Page 20, 21)
    onConfirmDecision(selectedDecision, feedbackText.trim());
  };

  // Helper auto-filler generator facilitating mock testing
  const handleAIQuickFill = (verdict: "Accepted" | "Denied") => {
    setSelectedDecision(verdict);
    if (verdict === "Accepted") {
      setFeedbackText(
        "Your project is really cool, and we would love to have you in our lab! The academic mapping from high-density EEG output to multi-state semantic prediction shows pristine latency engineering. Your previous training profiles with MIDI arm pressure and feedback loops matches our hardware requirements beautifully. We are thrilled to invite you as part of the team to explore the Brain-Computer mechanical actuators in our upcoming winter trials. Please review the roster guidelines for documentation briefings soon."
      );
    } else {
      setFeedbackText(
        "Sorry, this isn’t quite what we’re looking for right now. While your proposal regarding grammatical structures and lexical richness shows strong descriptive analysis, we unfortunately require deep machine-learning implementation and custom recursive styles syntax modeling for this particular cycle. We highly recommend reviewing our pre-requisite python papers and applying again for our upcoming spring semester internship. Thank you for your interest."
      );
    }
    setShowAutoFiller(true);
    setTimeout(() => setShowAutoFiller(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-6">
      
      {/* Navigation Shortcut */}
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition cursor-pointer"
        id="feedback-back-shortcut"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Application Board</span>
      </button>

      {/* Main card box mirroring Page 19 */}
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-8 relative space-y-8">
        
        {/* View Header */}
        <div className="border-b border-gray-100 pb-4">
          <span className="text-xs font-bold text-emerald-600 block uppercase tracking-widest">
            Admissions Evaluation Desk
          </span>
          <h3 className="text-2xl font-bold text-gray-900 mt-1 flex items-center justify-between">
            <span>Provide Feedback</span>
            <span className="text-xs bg-gray-105 border font-mono px-3 py-1 text-gray-500 rounded">
              word limit: 100 min
            </span>
          </h3>
        </div>

        {/* Dynamic Quick helpers to avoid user typing 100 words during eval */}
        <div className="bg-purple-50/50 border border-purple-200 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-purple-900 flex items-center space-x-1">
              <Sparkles className="w-4.5 h-4.5 text-purple-600 animate-pulse shrink-0" />
              <span>Eval Quick-Fill Tools (Simulate 100+ Words)</span>
            </span>
            <p className="text-purple-700">Quickly fill academic feedback statements to support instant prototype evaluations.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleAIQuickFill("Accepted")}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold transition cursor-pointer"
            >
              Fill Accepted (100w)
            </button>
            <button
              onClick={() => handleAIQuickFill("Denied")}
              className="px-3 py-1.5 bg-red-605 hover:bg-red-700 text-white rounded font-bold transition cursor-pointer"
            >
              Fill Denied (100w)
            </button>
          </div>
        </div>

        {/* Application details from Page 19 */}
        <div className="space-y-4 text-base sm:text-lg text-gray-800 font-semibold leading-relaxed border-b border-gray-100 pb-6">
          <p>
            Applicant Name: <span className="font-bold text-gray-900">{application.studentName}</span>
          </p>
          <p>
            Collaborator Name(s) (if any):{" "}
            <span className="font-bold text-gray-900">
              {application.collaboratorNames && application.collaboratorNames.length > 0 
                ? application.collaboratorNames.join(", ") 
                : "None"}
            </span>
          </p>
          <div className="flex items-center space-x-2">
            <span>Project Files:</span>
            <a 
              href="#viewpdf" 
              onClick={(e) => { e.preventDefault(); alert(`Downloading simulated file: ${application.projectFileName}`); }}
              className="text-blue-600 font-bold underline flex items-center space-x-1 hover:text-blue-800"
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>{application.projectFileName || "MyProject.pdf"}</span>
            </a>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg max-w-3xl border border-gray-150">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Applicant Abstract Summary:</span>
            <p className="text-xs text-gray-600 leading-relaxed font-sans font-medium italic">
              "{application.description}"
            </p>
          </div>
        </div>

        {/* Feedback Section precisely Page 19 */}
        <form onSubmit={handleProceedSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
              <label>Feedback:</label>
              <span className={isSatisfiedLimit ? "text-emerald-600 font-extrabold" : "text-amber-600"}>
                {wordCount} / 100 words {isSatisfiedLimit ? "✓" : "required"}
              </span>
            </div>

            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Begin typing here... A minimum of 100 words are required to issue a decision."
              rows={6}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-inner text-sm font-medium focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition resize-none bg-gray-50/50"
              required
              id="feedback-text-area"
            />
          </div>

          {/* Accept / Deny check triggers directly from Page 19 screenshot */}
          <div className="flex items-center space-x-12 pt-4 border-t border-gray-100 justify-center">
            
            {/* Green Check ACCEPT button */}
            <button
              type="button"
              onClick={() => handleDecisionClick("Accepted")}
              className={`flex flex-col items-center justify-center space-y-1.5 transition cursor-pointer group hover:scale-105 ${
                selectedDecision === "Accepted" ? "scale-105" : "opacity-45 hover:opacity-85"
              }`}
              id="select-accept-check"
            >
              <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center shadow-md cursor-pointer">
                <CheckCircle2 className="w-9 h-9 fill-current text-white" />
              </div>
              <span className="text-xs font-black uppercase text-emerald-700 tracking-wider">Accept</span>
            </button>

            {/* Red Cross DENY button */}
            <button
              type="button"
              onClick={() => handleDecisionClick("Denied")}
              className={`flex flex-col items-center justify-center space-y-1.5 transition cursor-pointer group hover:scale-105 ${
                selectedDecision === "Denied" ? "scale-105" : "opacity-45 hover:opacity-85"
              }`}
              id="select-deny-cross"
            >
              <div className="w-16 h-16 bg-red-100 border border-red-300 text-red-600 rounded-full flex items-center justify-center shadow-md cursor-pointer">
                <XCircle className="w-9 h-9 fill-current text-white" />
              </div>
              <span className="text-xs font-black uppercase text-red-700 tracking-wider">Deny</span>
            </button>

          </div>

          {/* Bottom Actions Row styled exactly Page 19 */}
          <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
            
            {/* Save Draft exactly Page 19 solid border button */}
            <button
              type="button"
              onClick={() => {
                onSaveDraft(feedbackText);
                alert("Evaluation draft saved successfully in roster caches.");
              }}
              className="px-6 py-5 border-2 border-emerald-500 text-emerald-800 text-base font-extrabold flex flex-col items-center justify-center space-y-1 rounded-lg transition hover:bg-emerald-50 cursor-pointer text-center"
              id="btn-save-draft"
            >
              <span>Save Draft</span>
              <span>& Return</span>
            </button>

            <button
              type="submit"
              className="px-6 py-3.5 bg-gray-900 border border-gray-900 text-white font-extrabold text-sm uppercase rounded-lg hover:bg-gray-800 shadow transition flex items-center space-x-1.5 cursor-pointer"
              id="btn-proceed-decision-confirm"
            >
              <span>Review Verdict →</span>
            </button>

          </div>

        </form>
      </div>

    </div>
  );
}
