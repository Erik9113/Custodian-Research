import React, { useState } from "react";
import { Info, HelpCircle, ArrowLeft, Layers } from "lucide-react";
import { Lab } from "../types";
import ProgressIndicator from "./ProgressIndicator";

interface SelectLabViewProps {
  labs: Lab[];
  onSelectLab: (labId: string) => void;
  onBackToDashboard: () => void;
}

export default function SelectLabView({ labs, onSelectLab, onBackToDashboard }: SelectLabViewProps) {
  const [hoveredLabId, setHoveredLabId] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-6">
      
      {/* Navigation Shortcut */}
      <button 
        onClick={onBackToDashboard}
        className="flex items-center space-x-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition cursor-pointer"
        id="lab-select-back"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </button>

      {/* Main Container */}
      <div className="space-y-6">
        
        {/* Tooltip header bar exactly like Page 8 */}
        <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-lg p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2.5">
            <Info className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-sm sm:text-base">
              Tooltip: Hover and select a lab to get started
            </span>
          </div>
          {/* Animated click guide */}
          <div className="flex items-center space-x-1 animate-pulse">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest hidden sm:inline">Choose Lab</span>
            <span className="text-lg">👆</span>
          </div>
        </div>

        {/* Labs cards list with custom hover and scroll styling */}
        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {labs.map((lab) => {
            const isHovered = hoveredLabId === lab.id;

            return (
              <div
                key={lab.id}
                onMouseEnter={() => setHoveredLabId(lab.id)}
                onMouseLeave={() => setHoveredLabId(null)}
                onClick={() => onSelectLab(lab.id)}
                className={`relative bg-white border rounded-xl p-8 transition-all duration-300 cursor-pointer shadow-sm select-none ${
                  isHovered 
                    ? "border-blue-500 scale-[1.015] shadow-lg ring-4 ring-blue-50" 
                    : "border-gray-200 hover:border-blue-300"
                }`}
                id={`lab-card-sec-${lab.id}`}
              >
                {/* Visual glow indicator */}
                <div 
                  className={`absolute left-0 top-0 h-full w-2.5 rounded-l-xl transition-all ${
                    isHovered ? "bg-blue-600" : "bg-gray-300"
                  }`} 
                />

                <div className="space-y-4 pl-4">
                  {/* Lab Name Line */}
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Lab Name:</span>
                    <h3 className="text-lg font-black text-gray-800 tracking-tight leading-tight">
                      {lab.name}
                    </h3>
                  </div>

                  {/* Lab Description */}
                  <div className="flex flex-col space-y-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description:</span>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      {lab.description}
                    </p>
                  </div>

                  {/* Prompts count summary on hover */}
                  <div className="flex justify-between items-center text-xs text-gray-400 font-mono pt-4 border-t border-gray-100">
                    <span>Manager: {lab.manager}</span>
                    <span className="font-bold text-blue-600">
                      {lab.prompts.length} active research prompts
                    </span>
                  </div>
                </div>

                {/* Simulated scroll slider on hover matching screenshot scrollbar indicator */}
                {isHovered && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-[45%] bg-blue-200 rounded-full animate-bounce" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Indicator at Select Lab (Index 1) */}
      <ProgressIndicator stepIndex={1} />
    </div>
  );
}
