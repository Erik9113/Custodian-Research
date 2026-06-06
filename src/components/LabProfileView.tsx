import React, { useState } from "react";
import { Beaker, Shield, Edit, Phone, Mail, Save, List, CheckCircle2 } from "lucide-react";
import { Lab } from "../types";

interface LabProfileViewProps {
  lab: Lab;
  onSave: (updatedLab: Lab) => void;
  onGoToEditPrompts: () => void;
  onReturnToDashboard: () => void;
}

export default function LabProfileView({
  lab,
  onSave,
  onGoToEditPrompts,
  onReturnToDashboard
}: LabProfileViewProps) {
  const [name, setName] = useState(lab.name);
  const [description, setDescription] = useState(lab.description);
  const [manager, setManager] = useState(lab.manager);
  const [contact, setContact] = useState(lab.contact);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...lab,
      name,
      description,
      manager,
      contact
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-6">
      
      {/* Visual Header Banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-150 rounded-xl p-6 shadow-sm flex items-start space-x-4">
        <div className="p-3 bg-emerald-600 text-white rounded-full">
          <Beaker className="w-6 h-6 shrink-0" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-emerald-900 tracking-tight">Active Lab Administration Workspace</h3>
          <p className="text-sm text-emerald-705 mt-1 leading-relaxed">
            Welcome, Lab Director. Customize your workspace details, manage research prerequisite guidelines, and review incoming student proposals.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 border border-emerald-200 bg-emerald-50 text-emerald-800 rounded-lg text-sm flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Lab details updated successfully and propagated to the active enrollment index!</span>
        </div>
      )}

      {/* Profile Form matching Page 15 lines layout */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 relative">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Lab Name Row */}
          <div className="border-b border-gray-150 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider block min-w-[200px]">
              Lab Name:
            </label>
            <div className="flex-grow flex items-center justify-between border-b border-transparent focus-within:border-emerald-500 transition">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Lorem Ipsum Lab"
                className="w-full bg-transparent border-none text-lg font-bold text-gray-800 outline-none p-0 focus:ring-0"
                required
                id="lab-edit-name"
              />
              <Edit className="w-4 h-4 text-gray-400 shrink-0" />
            </div>
          </div>

          {/* Basic Information / Description Row */}
          <div className="border-b border-gray-150 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider block min-w-[200px] mt-1">
              Basic Information:
            </label>
            <div className="flex-grow flex items-start justify-between border-b border-transparent focus-within:border-emerald-500 transition">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of your lab's focus areas, technologies, and academic milestones."
                rows={3}
                className="w-full bg-transparent border-none text-base font-semibold text-gray-700 outline-none p-0 focus:ring-0 resize-none leading-relaxed"
                required
                id="lab-edit-desc"
              />
              <Edit className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
            </div>
          </div>

          {/* Lab Manager Row */}
          <div className="border-b border-gray-150 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider block min-w-[200px]">
              Lab Manager:
            </label>
            <div className="flex-grow flex items-center justify-between border-b border-transparent focus-within:border-emerald-500 transition">
              <input
                type="text"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                placeholder="e.g. Dr. Alex Doe"
                className="w-full bg-transparent border-none text-lg font-bold text-gray-800 outline-none p-0 focus:ring-0"
                required
                id="lab-edit-manager"
              />
              <Edit className="w-4 h-4 text-gray-400 shrink-0" />
            </div>
          </div>

          {/* Lab Contact Information Row */}
          <div className="border-b border-gray-150 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider block min-w-[200px]">
              Lab Contact Information:
            </label>
            <div className="flex-grow flex items-center justify-between border-b border-transparent focus-within:border-emerald-500 transition">
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="e.g. alex.doe@university.edu"
                className="w-full bg-transparent border-none text-lg font-bold text-gray-800 outline-none p-0 focus:ring-0"
                required
                id="lab-edit-contact"
              />
              <Edit className="w-4 h-4 text-gray-400 shrink-0" />
            </div>
          </div>

          {/* Action grid mirroring layout in page 15 bottom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-12 items-center">
            
            {/* Edit Pre-Req Project Prompts button exactly styled Page 15 */}
            <button
              type="button"
              onClick={onGoToEditPrompts}
              className="px-6 py-5 border-2 border-emerald-500 hover:bg-emerald-50 text-emerald-800 text-base font-extrabold flex flex-col items-center justify-center space-y-1 rounded-lg transition min-h-[90px] cursor-pointer"
              id="btn-edit-prompts-shortcut"
            >
              <span>Edit Pre-Req</span>
              <span>Project</span>
              <span>Prompts</span>
            </button>

            {/* Save Changes and Return button exactly styled Page 15 */}
            <button
              type="submit"
              className="px-6 py-5 border-2 border-emerald-500 text-emerald-800 text-base font-extrabold flex flex-col items-center justify-center space-y-1 rounded-lg transition hover:bg-emerald-50 active:bg-emerald-100 min-h-[90px] cursor-pointer"
              id="btn-save-lab-profile"
            >
              <span>Save</span>
              <span>Changes & Return</span>
              <span>to Dashboard</span>
            </button>

          </div>

        </form>
      </div>

    </div>
  );
}
