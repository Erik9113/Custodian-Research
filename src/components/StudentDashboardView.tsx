import React from "react";
import { User, Layers, ArrowUpRight, CheckCircle2, Lock, FileText } from "lucide-react";
import { AppState } from "../types";

interface StudentDashboardViewProps {
  appState: AppState;
  onNavigateToStep: (step: number) => void;
}

export default function StudentDashboardView({ appState, onNavigateToStep }: StudentDashboardViewProps) {
  const { currentStep, studentProfile, selectedLabId, submittedApplicationId } = appState;

  // Define steps
  // 0 = Create Profile, 1 = Select Lab, 2 = Apply to Lab, 3 = View Decision
  const steps = [
    {
      id: 0,
      title: "Create Profile",
      description: "Define your major, degree program, and select key research fields of interest.",
      icon: User,
    },
    {
      id: 1,
      title: "Select Lab",
      description: "Browse academic labs, explore their focus areas, and select your preferred prompt.",
      icon: Layers,
    },
    {
      id: 2,
      title: "Apply to Lab",
      description: "Form a pair group or individual project, submit your design proposal and PDF files.",
      icon: FileText,
    },
    {
      id: 3,
      title: "View Decision",
      description: "Await peer/professor evaluation, read feedback, and view the final selection verdict.",
      icon: ArrowUpRight,
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto py-8">
      {/* Dynamic Instruction banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-150 rounded-xl p-6 shadow-sm flex items-start space-x-4">
        <div className="p-3 bg-blue-600 text-white rounded-full">
          <Layers className="w-6 h-6 shrink-0" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-blue-900 tracking-tight">Your Research Journey Progress</h3>
          <p className="text-sm text-blue-700 mt-1 leading-relaxed">
            {currentStep === 0 && "Next task: Create Profile. Please fill out your profile details so research labs can review your background."}
            {currentStep === 1 && "Next task: Select Lab. Hover and select an active research team to view their prompts and select a topic."}
            {currentStep === 2 && "Next task: Apply to Lab. Fill in your project specifications, upload required PDF files, and submit."}
            {currentStep === 3 && "Next task: View Decision. Your application has been submitted successfully. Await decision outcomes from researchers."}
          </p>
        </div>
      </div>

      {/* Steps Grid mirroring Page 1, 2, 3, 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isLocked = step.id > currentStep;

          let blockTitleColor = "text-gray-400";
          let blockBorder = "border-gray-200 bg-gray-50/50";
          let statusText = "[Locked]";
          let statusColor = "text-gray-400";

          if (isCompleted) {
            blockTitleColor = "text-gray-800";
            blockBorder = "border-emerald-200 bg-white hover:border-emerald-400 hover:shadow-md";
            statusText = "[Completed]";
            statusColor = "text-emerald-600 font-bold";
          } else if (isActive) {
            blockTitleColor = "text-blue-900";
            blockBorder = "border-blue-300 bg-white ring-2 ring-blue-100 hover:border-blue-400 cursor-pointer shadow-sm hover:shadow-md";
            statusText = "Next task:";
            statusColor = "text-blue-600 font-bold";
          }

          // Let completed and active steps be clickable
          const isClickable = !isLocked;

          return (
            <div
              key={step.id}
              onClick={() => isClickable && onNavigateToStep(step.id)}
              className={`border rounded-xl p-8 transition flex flex-col justify-between h-[210px] select-none ${blockBorder} ${
                isClickable ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              id={`student-dashboard-step-${step.id}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {/* Mirroring screenshots text */}
                  <span className={`text-md ${statusColor} tracking-wide`}>
                    {statusText} {step.title}
                  </span>
                  
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : isActive ? (
                    <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-ping" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <p className="text-sm text-gray-500 leading-normal line-clamp-3">
                  {step.description}
                </p>
              </div>

              {/* Bottom detail row */}
              <div className="flex items-center justify-between text-xs pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-1.5 text-gray-400">
                  <step.icon className="w-4 h-4" />
                  <span>Step {step.id + 1} of 4</span>
                </div>

                {isClickable && (
                  <span className="text-blue-600 font-semibold group flex items-center space-x-1">
                    <span>{isCompleted ? "Revisit" : "Start now"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Profile Preview Summary in Dashboard */}
      {studentProfile && (
        <div className="border border-gray-200 bg-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Profile Card</h4>
            <p className="text-lg font-bold text-gray-900">{studentProfile.name}</p>
            <p className="text-sm text-gray-500">Degree/Major: <span className="font-semibold text-gray-700">{studentProfile.degreeMajor}</span></p>
            <p className="text-xs text-gray-400">Interests: <span className="text-gray-650">{studentProfile.researchInterests || "None specified"}</span></p>
          </div>
          <button
            onClick={() => onNavigateToStep(0)}
            className="px-4 py-2 text-xs font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
            id="dashboard-edit-profile-shortcut"
          >
            Edit Student Profile
          </button>
        </div>
      )}
    </div>
  );
}
