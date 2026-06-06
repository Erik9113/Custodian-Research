import React from "react";

interface ProgressIndicatorProps {
  // 0 = Create Profile, 1 = Select Lab, 2 = Application/Apply, 3 = Decision
  stepIndex: number;
}

export default function ProgressIndicator({ stepIndex }: ProgressIndicatorProps) {
  const labels = [
    { text: "Create Profile", width: "w-1/4" },
    { text: "Select Lab", width: "w-1/4" },
    { text: "Application", width: "w-1/4" },
    { text: "Decision", width: "w-1/4" }
  ];

  // Calculate the percentage width for the blue progress line
  // index 0 = ~12.5% (pinned left-ish), index 1 = 37.5%, index 2 = 62.5%, index 3 = 100%
  // Or simpler: index 0: 5%, index 1: 35%, index 2: 70%, index 3: 100%
  const progressPercent = [5, 35, 68, 100][stepIndex];

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 border-t border-gray-150 mt-12 bg-white rounded-xl shadow-sm">
      {/* Slider Visual representation */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-visible mb-4">
        {/* Fill active bar */}
        <div 
          className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Nodes markers */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-[2%]">
          {[0, 1, 2, 3].map((val) => {
            const isCompleted = val < stepIndex;
            const isActive = val === stepIndex;
            let markerBg = "bg-gray-300";

            if (isCompleted) {
              markerBg = "bg-blue-600";
            } else if (isActive) {
              markerBg = "bg-blue-600 ring-4 ring-blue-100";
            }

            return (
              <div 
                key={val} 
                className={`w-4.5 h-4.5 rounded-full border-2 border-white ${markerBg} transition-all duration-350 shrink-0`}
              />
            );
          })}
        </div>
      </div>

      {/* Spanning Labels */}
      <div className="flex justify-between text-xs sm:text-sm font-semibold text-gray-700 font-mono px-1">
        {labels.map((lbl, idx) => {
          const isActiveColor = idx === stepIndex ? "text-blue-600 font-extrabold" : idx < stepIndex ? "text-gray-800" : "text-gray-450";
          return (
            <span key={idx} className={`tracking-tight truncate ${isActiveColor}`}>
              {lbl.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
