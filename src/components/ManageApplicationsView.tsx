import React from "react";
import { FolderKanban, ShieldAlert, ArrowRight, UserCheck, Trash2, Eye } from "lucide-react";
import { ProjectApplication, ApplicationColumn } from "../types";

interface ManageApplicationsViewProps {
  applications: ProjectApplication[];
  onOpenApplicationReview: (appId: string) => void;
}

export default function ManageApplicationsView({
  applications,
  onOpenApplicationReview
}: ManageApplicationsViewProps) {
  // Define active columns matching Page 18
  const columns: { label: ApplicationColumn; bgColor: string; borderTop: string }[] = [
    { label: "Not Yet Reviewed", bgColor: "bg-gray-50/50", borderTop: "border-t-4 border-gray-400" },
    { label: "Accepted", bgColor: "bg-emerald-50/20", borderTop: "border-t-4 border-emerald-500" },
    { label: "Onboarded", bgColor: "bg-blue-50/10", borderTop: "border-t-4 border-blue-500" },
    { label: "Denied", bgColor: "bg-red-50/10", borderTop: "border-t-4 border-red-505" }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-6">
      
      {/* Kanban Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 block uppercase tracking-widest font-mono">
            Roster Enrollment Desk
          </span>
          <h2 className="text-2xl font-black text-gray-900 mt-1">Manage Applications</h2>
        </div>
        
        {/* Statistics count indicators */}
        <div className="flex items-center space-x-2.5 text-xs text-gray-500 font-mono bg-white px-4 py-2 border rounded-lg shadow-sm">
          <span>Roster total: <strong className="text-gray-900">{applications.length} applicants</strong></span>
          <span className="text-gray-200">|</span>
          <span className="text-amber-600 font-bold">
            {applications.filter(a => a.status === "Not Yet Reviewed").length} pending review
          </span>
        </div>
      </div>

      {/* Grid columns matching representation on Page 18 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {columns.map((col) => {
          // Filter applications for this column
          const filteredApps = applications.filter((app) => app.status === col.label);

          return (
            <div
              key={col.label}
              className={`border border-gray-200 rounded-xl p-4 shadow-sm min-h-[450px] space-y-4 flex flex-col justify-start ${col.bgColor} ${col.borderTop}`}
            >
              {/* Column Label */}
              <div className="flex items-center justify-between border-b pb-2 mb-2 font-mono">
                <span className="text-sm font-bold text-gray-700 tracking-tight">
                  {col.label}
                </span>
                <span className="px-2.5 py-0.5 bg-gray-200/60 rounded-full text-xs text-gray-600 font-extrabold font-mono">
                  {filteredApps.length}
                </span>
              </div>

              {/* Column Cards */}
              <div className="space-y-4 flex-grow overflow-y-auto max-h-[500px] pr-1 custom-scrollbar">
                {filteredApps.length === 0 ? (
                  <div className="h-40 flex items-center justify-center text-center text-xs text-gray-400 border border-dashed rounded-lg bg-gray-50/10 select-none">
                    No candidates here
                  </div>
                ) : (
                  filteredApps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white border border-gray-150 rounded-xl p-5 shadow hover:shadow-md transition space-y-4 select-none relative group"
                      id={`kanban-card-${app.id}`}
                    >
                      {/* Card Identity Details exactly matching Page 18 parameters */}
                      <div className="space-y-1.5">
                        <h4 className="text-base font-black text-gray-800 tracking-tight leading-none group-hover:text-blue-600 transition">
                          {app.studentName}
                        </h4>
                        
                        <div className="flex items-center space-x-2 font-semibold text-xs text-gray-450">
                          <span className="uppercase tracking-wider font-mono">UW</span>
                          <span className="text-gray-200">•</span>
                          <span className="text-gray-500 font-sans">{app.promptTopic.slice(0, 30)}...</span>
                        </div>
                        
                        <p className="text-xs font-semibold text-gray-700 font-sans block bg-gray-50 p-2 rounded truncate max-w-full">
                          {app.promptTopic.includes("Explore") 
                            ? "Piano Performance" 
                            : app.promptTopic.includes("Design") 
                              ? "Food Science" 
                              : app.promptTopic.includes("Create") 
                                ? "Education" 
                                : "Having Fun"}
                        </p>
                      </div>

                      {/* Collaborative banner indicator if applicable */}
                      {app.collaboratorNames && app.collaboratorNames.length > 0 && (
                        <div className="bg-blue-50 border border-blue-100 rounded px-2 py-1 text-[10px] text-blue-700 font-semibold truncate">
                          Pair Project: {app.studentName} & {app.collaboratorNames.join(", ")}
                        </div>
                      )}

                      {/* Thin bordered clickable button "View application" exactly Page 18 */}
                      <div className="pt-2 border-t border-gray-50 flex justify-end">
                        <button
                          onClick={() => onOpenApplicationReview(app.id)}
                          className="px-4 py-2 border-2 border-amber-800/80 hover:bg-amber-50 rounded text-amber-950 font-semibold text-xs tracking-wide transition flex items-center space-x-1.5 cursor-pointer shadow-sm"
                          id={`btn-view-app-shortcut-${app.id}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View application</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
