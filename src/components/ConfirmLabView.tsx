import React, { useState } from "react";
import { AlertTriangle, ArrowLeft, User, Users, CheckSquare, Square } from "lucide-react";
import { Lab } from "../types";
import ProgressIndicator from "./ProgressIndicator";

interface ConfirmLabViewProps {
  lab: Lab;
  onConfirmSelection: (promptId: string, isPartner: boolean) => void;
  onCancel: () => void;
}

export default function ConfirmLabView({ lab, onConfirmSelection, onCancel }: ConfirmLabViewProps) {
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(lab.prompts[0]?.id || null);

  const handleStart = (isPartner: boolean) => {
    if (!selectedPromptId) return;
    onConfirmSelection(selectedPromptId, isPartner);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-6">
      
      {/* Back Icon on bottom-left, let's keep it clean on top as well */}
      <button 
        onClick={onCancel}
        className="flex items-center space-x-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition cursor-pointer"
        id="confirm-lab-back"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Select a different Lab</span>
      </button>

      {/* Main Container */}
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-8 relative">
        
        {/* Urgent Warning Banner mirroring Page 9 red text */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-650 shrink-0 mt-0.5" />
          <p className="text-red-700 font-extrabold text-sm sm:text-base tracking-tight leading-normal" id="cannot-change-banner">
            You cannot change your lab selection once you begin a project!
          </p>
        </div>

        {/* Lab details */}
        <div className="space-y-6 border-b border-gray-150 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
            <span className="text-xs font-bold text-gray-405 uppercase tracking-widest">Lab Name:</span>
            <h3 className="text-xl font-bold text-gray-900">{lab.name}</h3>
          </div>

          <div className="flex flex-col space-y-1.5">
            <span className="text-xs font-bold text-gray-405 uppercase tracking-widest">Lab Information:</span>
            <p className="text-sm font-medium text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
              {lab.description}
            </p>
          </div>
        </div>

        {/* Prompt Selector Grid */}
        <div className="space-y-4 py-8">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Select which prompt:
          </h4>

          <div className="space-y-3.5">
            {lab.prompts.map((prompt, index) => {
              const isSelected = selectedPromptId === prompt.id;

              return (
                <div
                  key={prompt.id}
                  onClick={() => setSelectedPromptId(prompt.id)}
                  className={`border rounded-lg p-4 cursor-pointer flex items-start space-x-3.5 transition-all select-none ${
                    isSelected 
                      ? "border-blue-500 bg-blue-50/20 shadow-sm" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  id={`confirm-prompt-row-${prompt.id}`}
                >
                  <div className="shrink-0 mt-1">
                    {isSelected ? (
                      <CheckSquare className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 block mb-1">
                      Prompt {index + 1}:
                    </span>
                    <p className="text-sm font-semibold text-gray-800 leading-normal">
                      {prompt.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Start project actions precisely styled Page 9 buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-150">
          <button
            onClick={() => handleStart(false)}
            className="p-6 border-2 border-amber-800/80 hover:bg-amber-50 rounded-xl transition text-center shadow group cursor-pointer"
            id="start-individual-project-btn"
          >
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition">
              <User className="w-5 h-5" />
            </div>
            <span className="block text-amber-950 font-black text-sm uppercase tracking-wide">
              Start individual <br /> project
            </span>
          </button>

          <button
            onClick={() => handleStart(true)}
            className="p-6 border-2 border-amber-800/80 hover:bg-amber-50 rounded-xl transition text-center shadow group cursor-pointer"
            id="start-partner-project-btn"
          >
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition">
              <Users className="w-5 h-5" />
            </div>
            <span className="block text-amber-950 font-black text-sm uppercase tracking-wide">
              Start partner <br /> project
            </span>
          </button>
        </div>
      </div>

      {/* Back indicator button mirroring Page 9 bottom visual */}
      <div className="flex justify-between items-center px-2">
        <button 
          onClick={onCancel}
          className="p-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full shadow transition hover:scale-105 cursor-pointer"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-semibold text-gray-400 tracking-wider">INDEX 1 / SELECT STAGE</span>
      </div>

      {/* Progress Indicator set at Select Lab step finished */}
      <ProgressIndicator stepIndex={1} />
    </div>
  );
}
