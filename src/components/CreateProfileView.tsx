import React, { useState } from "react";
import { User, Award, Hash, PenTool, CheckCircle, ArrowLeft } from "lucide-react";
import { StudentProfile } from "../types";
import { DEFAULT_MAJORS } from "../data";
import ProgressIndicator from "./ProgressIndicator";

interface CreateProfileViewProps {
  initialProfile: StudentProfile | null;
  defaultEmailName: string;
  onSave: (profile: StudentProfile) => void;
  onBackToDashboard: () => void;
}

export default function CreateProfileView({
  initialProfile,
  defaultEmailName,
  onSave,
  onBackToDashboard
}: CreateProfileViewProps) {
  const [name, setName] = useState(initialProfile?.name || defaultEmailName || "");
  const [degreeMajor, setDegreeMajor] = useState(initialProfile?.degreeMajor || DEFAULT_MAJORS[0]);
  const [researchInterests, setResearchInterests] = useState(initialProfile?.researchInterests || "Machine learning, adaptive software, music analytics");
  
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      degreeMajor,
      researchInterests: researchInterests.trim()
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-6">
      
      {/* Navigation Shortcut */}
      <button 
        onClick={onBackToDashboard}
        className="flex items-center space-x-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition cursor-pointer"
        id="profile-back-to-dashboard"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </button>

      {/* Main card */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 relative overflow-hidden">
        
        <div className="border-b border-gray-150 pb-6 mb-8 flex justify-between items-center">
          <div>
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">Student Profile Setting</span>
            <h2 className="text-xl font-bold text-gray-900 mt-1">Configure Your Application Identity</h2>
          </div>
          <User className="w-8 h-8 text-gray-300" />
        </div>

        {saveSuccess && (
          <div className="mb-6 p-4 border border-emerald-200 bg-emerald-50 text-emerald-800 rounded-lg text-sm flex items-center space-x-2 animate-bounce">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Profile settings saved successfully! Next stage unlocked: Select Lab.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span>Name:</span>
              </label>
              <PenTool className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full bg-transparent border-none text-lg font-semibold text-gray-800 outline-none focus:ring-0 p-0"
              required
              id="profile-input-name"
            />
          </div>

          {/* Degree/ Major Field */}
          <div className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center space-x-2">
                <Award className="w-4 h-4 text-gray-400" />
                <span>Degree/ Major:</span>
              </label>
              <PenTool className="w-4 h-4 text-gray-400" />
            </div>
            <select
              value={degreeMajor}
              onChange={(e) => setDegreeMajor(e.target.value)}
              className="w-full bg-transparent border-none text-lg font-semibold text-gray-800 outline-none focus:ring-0 p-0 cursor-pointer"
              id="profile-input-major"
            >
              {DEFAULT_MAJORS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Research Interests Field (Dropdown representation or simple text editable line) */}
          <div className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center space-x-2">
                <Hash className="w-4 h-4 text-gray-400" />
                <span>Research Interests:</span>
              </label>
              <PenTool className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={researchInterests}
              onChange={(e) => setResearchInterests(e.target.value)}
              placeholder="What fields interest you? (e.g., HCI, supercomputing, thermal baking)"
              className="w-full bg-transparent border-none text-lg font-semibold text-gray-800 outline-none focus:ring-0 p-0"
              id="profile-input-interests"
            />
          </div>

          {/* Save Changes button styled exactly like Page 7 */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="px-8 py-5 border-2 border-emerald-500 text-emerald-800 font-extrabold text-lg hover:bg-emerald-50 active:bg-emerald-100 transition rounded-lg shadow-sm cursor-pointer block text-center min-w-[200px]"
              id="profile-save-button"
            >
              Save <br /> Changes
            </button>
          </div>
        </form>
      </div>

      {/* Progress tracker indicating Create Profile (Index 0) */}
      <ProgressIndicator stepIndex={0} />
    </div>
  );
}
