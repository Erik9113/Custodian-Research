import React, { useState } from "react";
import { ArrowLeft, Edit2, Upload, FileCheck, CheckCircle2, AlertCircle } from "lucide-react";
import ProgressIndicator from "./ProgressIndicator";

interface ApplyLabViewProps {
  labName: string;
  selectedPromptText: string;
  isPartner: boolean;
  studentName: string;
  studentEmail: string;
  onSubmit: (data: {
    groupContactInfo: string;
    promptTopic: string;
    description: string;
    projectFileName: string;
    resumeFileName: string;
    coverLetterFileName: string;
  }) => void;
  onBack: () => void;
}

export default function ApplyLabView({
  labName,
  selectedPromptText,
  isPartner,
  studentName,
  studentEmail,
  onSubmit,
  onBack
}: ApplyLabViewProps) {
  const [groupContactInfo, setGroupContactInfo] = useState(
    isPartner 
      ? `${studentEmail}, john.doe@uw.edu`
      : studentEmail
  );
  const [promptTopic, setPromptTopic] = useState(selectedPromptText);
  const [description, setDescription] = useState("");
  
  // File Upload states
  const [projectFile, setProjectFile] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<string | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<string | null>(null);

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleFileUpload = (type: "project" | "resume" | "cover", name: string) => {
    if (type === "project") setProjectFile(name);
    if (type === "resume") setResumeFile(name);
    if (type === "cover") setCoverLetterFile(name);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, type: "project" | "resume" | "cover") => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(type, file.name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "project" | "resume" | "cover") => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(type, e.target.files[0].name);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setValidationError("Please fill out your project description or abstract summary before submitting.");
      return;
    }
    if (!projectFile || !resumeFile || !coverLetterFile) {
      setValidationError("Please upload all three files (Project Proposal, Resume, and Cover Letter) to support your application.");
      return;
    }

    setValidationError(null);
    onSubmit({
      groupContactInfo,
      promptTopic,
      description,
      projectFileName: projectFile,
      resumeFileName: resumeFile,
      coverLetterFileName: coverLetterFile
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-6">
      
      {/* Navigation Shortcut */}
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition cursor-pointer"
        id="apply-form-back"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Select Lab details</span>
      </button>

      {/* Main Container mirroring Page 11 */}
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-8 relative">
        <div className="border-b border-gray-150 pb-4 mb-6 flex justify-between items-center">
          <div>
            <span className="text-xs font-bold text-blue-600 block uppercase tracking-widest">
              Project Application
            </span>
            <h3 className="text-xl font-bold text-gray-900 mt-1">Submit Your Proposal to {labName}</h3>
          </div>
          <span className="text-xs bg-gray-100 px-2.5 py-1 rounded text-gray-500 font-mono">
            {isPartner ? "👯 Pair Collaboration" : "👤 Individual Project"}
          </span>
        </div>

        {validationError && (
          <div className="mb-6 p-4 border border-red-200 bg-red-50 text-red-700 rounded-lg text-sm flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-8">
          
          {/* Group Contact Information Field */}
          <div className="border-b border-gray-100 pb-4 relative">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Group Contact Information:
              </label>
              <Edit2 className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={groupContactInfo}
              onChange={(e) => setGroupContactInfo(e.target.value)}
              placeholder="e.g. jane.doe@university.edu, collaborator@university.edu"
              className="w-full bg-transparent border-none text-lg font-semibold text-gray-800 outline-none p-0 focus:ring-0"
              required
              id="apply-field-contact"
            />
          </div>

          {/* Lab Prompt Topic Field */}
          <div className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Lab Prompt Topic:
              </label>
            </div>
            <input
              type="text"
              value={promptTopic}
              onChange={(e) => setPromptTopic(e.target.value)}
              className="w-full bg-transparent border-none text-lg font-semibold text-blue-800 outline-none p-0 focus:ring-0 truncate"
              required
              id="apply-field-prompt-topic"
            />
          </div>

          {/* Add Description/Abstract Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider block">
              Add Description/Abstract:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Begin typing your project draft or abstraction here... (A concise summary of your approach and expected deliverables)."
              rows={5}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm transition"
              required
              id="apply-field-abstract"
            />
          </div>

          {/* Upload Grid mirroring the bottom line uploads cards in Page 11 */}
          <div className="pt-6 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Upload PDF Project Resources
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Upload Item: Project */}
              <div
                onClick={() => handleFileUpload("project", "Project_Proposal_Draft.pdf")}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "project")}
                className={`border-2 border-dashed rounded-lg p-6 bg-gray-50/50 flex flex-col justify-between text-center min-h-[140px] transition cursor-pointer relative group ${
                  projectFile ? "border-emerald-400 bg-emerald-50/15" : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/5"
                }`}
                title="Click anywhere to instantly attach a mock PDF"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Upload Project:
                  </span>
                  {projectFile ? (
                    <div className="flex flex-col items-center justify-center space-y-1 text-emerald-700">
                      <div className="flex items-center space-x-1.5">
                        <FileCheck className="w-5 h-5 shrink-0 animate-pulse text-emerald-600" />
                        <span className="text-xs font-extrabold truncate max-w-[130px]" title={projectFile}>{projectFile}</span>
                      </div>
                      <span className="text-[9px] text-emerald-600 bg-emerald-100/50 px-1.5 py-0.5 rounded font-mono">Ready</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-[10px] text-gray-400">PDF, Max 10MB</p>
                      <p className="text-[9px] text-blue-500 font-semibold group-hover:underline">Tap to attach mock PDF</p>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-center pt-2">
                  <span className="px-3 py-1 bg-gray-250 text-gray-700 hover:bg-gray-300 text-[10px] font-bold rounded-full transition flex items-center justify-center space-x-1 shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{projectFile ? "Reattach" : "Select PDF"}</span>
                  </span>
                </div>
              </div>

              {/* Upload Item: Resume */}
              <div
                onClick={() => handleFileUpload("resume", "Student_Academic_CV.pdf")}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "resume")}
                className={`border-2 border-dashed rounded-lg p-6 bg-gray-50/50 flex flex-col justify-between text-center min-h-[140px] transition cursor-pointer relative group ${
                  resumeFile ? "border-emerald-400 bg-emerald-50/15" : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/5"
                }`}
                title="Click anywhere to instantly attach a mock PDF"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Upload Resume:
                  </span>
                  {resumeFile ? (
                    <div className="flex flex-col items-center justify-center space-y-1 text-emerald-700">
                      <div className="flex items-center space-x-1.5">
                        <FileCheck className="w-5 h-5 shrink-0 animate-pulse text-emerald-600" />
                        <span className="text-xs font-extrabold truncate max-w-[130px]" title={resumeFile}>{resumeFile}</span>
                      </div>
                      <span className="text-[9px] text-emerald-600 bg-emerald-100/50 px-1.5 py-0.5 rounded font-mono">Ready</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-[10px] text-gray-400">PDF, Max 5MB</p>
                      <p className="text-[9px] text-blue-500 font-semibold group-hover:underline">Tap to attach mock PDF</p>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-center pt-2">
                  <span className="px-3 py-1 bg-gray-250 text-gray-700 hover:bg-gray-300 text-[10px] font-bold rounded-full transition flex items-center justify-center space-x-1 shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{resumeFile ? "Reattach" : "Select PDF"}</span>
                  </span>
                </div>
              </div>

              {/* Upload Item: Cover Letter */}
              <div
                onClick={() => handleFileUpload("cover", "Academic_Cover_Letter.pdf")}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "cover")}
                className={`border-2 border-dashed rounded-lg p-6 bg-gray-50/50 flex flex-col justify-between text-center min-h-[140px] transition cursor-pointer relative group ${
                  coverLetterFile ? "border-emerald-400 bg-emerald-50/15" : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/5"
                }`}
                title="Click anywhere to instantly attach a mock PDF"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Upload Cover Letter:
                  </span>
                  {coverLetterFile ? (
                    <div className="flex flex-col items-center justify-center space-y-1 text-emerald-700">
                      <div className="flex items-center space-x-1.5">
                        <FileCheck className="w-5 h-5 shrink-0 animate-pulse text-emerald-600" />
                        <span className="text-xs font-extrabold truncate max-w-[130px]" title={coverLetterFile}>{coverLetterFile}</span>
                      </div>
                      <span className="text-[9px] text-emerald-600 bg-emerald-100/50 px-1.5 py-0.5 rounded font-mono">Ready</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-[10px] text-gray-400">PDF, Max 5MB</p>
                      <p className="text-[9px] text-blue-500 font-semibold group-hover:underline">Tap to attach mock PDF</p>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-center pt-2">
                  <span className="px-3 py-1 bg-gray-250 text-gray-700 hover:bg-gray-300 text-[10px] font-bold rounded-full transition flex items-center justify-center space-x-1 shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{coverLetterFile ? "Reattach" : "Select PDF"}</span>
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Submit Action Block mirroring Page 11 */}
          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button
              type="submit"
              className="px-8 py-5 border-2 border-emerald-500 text-emerald-800 font-extrabold text-lg hover:bg-emerald-50 active:bg-emerald-100 transition rounded-lg shadow-sm cursor-pointer block text-center min-w-[200px]"
              id="submit-proposal-button"
            >
              Submit <br /> Project
            </button>
          </div>

        </form>
      </div>

      {/* Progress tracker showing Application phase (Index 2) */}
      <ProgressIndicator stepIndex={2} />
    </div>
  );
}
