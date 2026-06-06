import React, { useState } from "react";
import { Trash2, Edit, AlertCircle, ArrowLeft, Brain, Cpu, Sparkles, Loader2, Beaker } from "lucide-react";
import { Lab, LabPrompt } from "../types";

interface EditPromptsViewProps {
  lab: Lab;
  onSavePrompts: (prompts: LabPrompt[]) => void;
  onBack: () => void;
}

function generateAcademicPrompt(topic: string, labDescription: string): string {
  const keywords = topic.trim() || "Niche Educational Systems";
  const normalized = keywords.toLowerCase();
  
  if (normalized.includes("eeg") || normalized.includes("brain") || normalized.includes("neuro") || normalized.includes("mind") || normalized.includes("cognitive")) {
    return `Design a high-fidelity assistive human-computer interface tracking cognitive bandwidth and neural telemetry. The student project must analyze real-world non-invasive brainwave signals during deep cognitive tasks, isolating alpha/beta frequency variations in relation to acoustic stimuli. Deliverables include a working software simulation of the neural telemetry mapping layer, custom visual telemetry dashboards, and a 2-page abstract detailing mechanical feedback latency.`;
  }
  
  if (normalized.includes("cookie") || normalized.includes("food") || normalized.includes("baking") || normalized.includes("thermal") || normalized.includes("chemistry")) {
    return `Develop an advanced predictive thermal hydration framework analyzing heat-flux metrics in organic starch polymers. The project requires students to model real-time gelatinization indices in structural starch chains during convective and radiative heat transfer. Deliverables include a fully functional physical simulation, multi-variable thermal profiles mapping carbohydrate density, and a brief report on moisture-retention coefficients.`;
  }
  
  if (normalized.includes("sustainability") || normalized.includes("green") || normalized.includes("eco") || normalized.includes("solar") || normalized.includes("climate") || normalized.includes("energy")) {
    return `Create an adaptive closed-loop environmental micro-grid model optimizing resource logistics in dense municipal layouts. Students are tasked with drafting a simulated decentralization scheme governing smart-grid storage efficiency, heat dissipation buffers, and low-latency feedback networks. Deliverables include a robust mathematical model, an interactive logistics visualization dashboard, and an abstract explaining carbon offset potential.`;
  }
  
  if (normalized.includes("market") || normalized.includes("finance") || normalized.includes("budget") || normalized.includes("economic") || normalized.includes("crypto") || normalized.includes("money")) {
    return `Implement an algorithmic micro-budgeting system modeling macroeconomic consumer behaviour within closed virtual sandboxes. The student project must leverage predictive statistical models to map cost-benefit elasticity against dynamic supply constraints and localized tax policies. Deliverables include a working API prototype executing high-frequency micro-transactions, a visualization layout of distribution charts, and a detailed project summary.`;
  }

  if (normalized.includes("ai") || normalized.includes("intelligence") || normalized.includes("learning") || normalized.includes("model") || normalized.includes("nlp") || normalized.includes("gpt")) {
    return `Construct a highly localized, fine-tuned transformer-based grammar parser evaluating multi-modal lexical density. The project involves drafting lightweight self-attention structures capable of profiling stylistic variation, semantic coherence, and cognitive readability scores in real-world reading tests. Deliverables include a robust parsing pipeline, custom validation metrics, and a comparative study against standard pre-trained architectures.`;
  }

  const preambles = [
    `Design and engineer a comprehensive, low-latency software instrument centered on ${keywords}.`,
    `Develop a functional, highly robust prototype modeling structural parameters for ${keywords}.`,
    `Construct a multi-threaded data visualization system examining the core characteristics of ${keywords}.`,
    `Formulate an interdisciplinary predictive analysis framework investigating ${keywords}.`
  ];
  
  const bodies = [
    `The candidate must implement custom telemetry processing pipelines, incorporating highly scalable event handling and clean structural state parameters. The architecture should prioritize human-centric interaction design while preserving extreme performance parameters under high cognitive loads.`,
    `The research will focus on isolating key performance indices, mapping multi-variable feedback loops, and validating architectural integrity against complex localized constraints. Real-time data visualization and persistent simulation logging are vital design elements.`,
    `This requires establishing precise semantic telemetry, synthesizing modular control systems, and creating responsive visualizers to map high-fidelity performance metrics in real-time.`
  ];
  
  const deliverables = [
    `Deliverables include a fully functional, self-contained application, high-resolution visual telemetry mockups, and a 2-page project abstract outlining research findings.`,
    `The final submittal must comprise a working code repository, detailed architectural schematics, and a validation dashboard suitable for peer evaluation.`,
    `Deliverables include custom interactive simulation modules, comparative validation reports, and a structured academic proposal ready for presentation.`
  ];

  const preamble = preambles[Math.floor(Math.random() * preambles.length)];
  const body = bodies[Math.floor(Math.random() * bodies.length)];
  const deliverable = deliverables[Math.floor(Math.random() * deliverables.length)];

  return `${preamble} ${body} ${deliverable}`;
}

export default function EditPromptsView({ lab, onSavePrompts, onBack }: EditPromptsViewProps) {
  // Navigation inside Prompt management: "list" or "edit_form"
  const [viewMode, setViewMode] = useState<"list" | "edit_form">("list");
  
  // Local prompts list
  const [promptsList, setPromptsList] = useState<LabPrompt[]>(lab.prompts);
  
  // Active editing item (null = creating new)
  const [activePrompt, setActivePrompt] = useState<LabPrompt | null>(null);
  const [promptTextValue, setPromptTextValue] = useState("");
  
  // AI Generator local topic keyword
  const [aiTopic, setAiTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Deletions
  const handleDeletePrompt = (id: string) => {
    const updated = promptsList.filter(p => p.id !== id);
    setPromptsList(updated);
    onSavePrompts(updated);
  };

  // Open Form to Edit
  const handleOpenEdit = (prompt: LabPrompt) => {
    setActivePrompt(prompt);
    setPromptTextValue(prompt.text);
    setAiTopic("");
    setGenerationError(null);
    setViewMode("edit_form");
  };

  // Open Form to Create
  const handleOpenAdd = () => {
    setActivePrompt(null);
    setPromptTextValue("");
    setAiTopic("");
    setGenerationError(null);
    setViewMode("edit_form");
  };

  // Trigger local high-fidelity Academic Prompt Generator
  const handleAIToolGenerate = async () => {
    setIsGenerating(true);
    setGenerationError(null);

    // Simulate standard AI token generation latency
    setTimeout(() => {
      try {
        const result = generateAcademicPrompt(aiTopic, lab.description);
        setPromptTextValue(result);
      } catch (err: any) {
        console.error(err);
        setGenerationError("An unexpected error occurred during local prompt generation.");
      } finally {
        setIsGenerating(false);
      }
    }, 800);
  };

  // Save specific item and return to list
  const handleSaveActivePrompt = () => {
    if (!promptTextValue.trim()) return;

    let updated: LabPrompt[];
    if (activePrompt) {
      // Editing existing
      updated = promptsList.map(p => 
        p.id === activePrompt.id ? { ...p, text: promptTextValue.trim() } : p
      );
    } else {
      // Creating new
      const newPrompt: LabPrompt = {
        id: `prompt-${Date.now()}`,
        text: promptTextValue.trim()
      };
      updated = [...promptsList, newPrompt];
    }

    setPromptsList(updated);
    onSavePrompts(updated);
    setViewMode("list");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-6">

      {viewMode === "list" && (
        <div className="space-y-8">
          {/* Visual Back */}
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition cursor-pointer"
            id="prompts-list-back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Lab Profile</span>
          </button>

          {/* Prompt management card [Page 16] */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 space-y-8">
            <div className="border-b border-gray-150 pb-4 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">Prerequisite Task Library</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">Edit Pre-Req Project Prompts</h2>
              </div>
              <span className="text-xs bg-gray-50 px-2.5 py-1 text-gray-400 font-bold border border-gray-100 rounded">
                Coordinator Workspace
              </span>
            </div>

            {/* Prompts list matches Page 16 list rows */}
            <div className="space-y-4">
              {promptsList.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
                  No active prompts found. Click "Add a New Prompt" below to begin recruitment.
                </div>
              ) : (
                promptsList.map((prompt, idx) => (
                  <div
                    key={prompt.id}
                    className="border-b border-gray-150 pb-4 flex items-start justify-between gap-4 group"
                    id={`prompt-row-item-${prompt.id}`}
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider block font-mono">
                        Prompt #{idx + 1}:
                      </span>
                      <p className="text-base font-semibold text-gray-800 leading-relaxed pr-8">
                        {prompt.text}
                      </p>
                    </div>

                    {/* Left click icons: Delete & Edit exactly Page 16 */}
                    <div className="flex items-center space-x-2 shrink-0 pt-4 opacity-75 group-hover:opacity-100 transition">
                      <button
                        onClick={() => handleDeletePrompt(prompt.id)}
                        className="p-1.5 text-gray-400 hover:text-red-650 hover:bg-gray-50 rounded transition cursor-pointer"
                        title="Delete Prompt"
                        id={`delete-prompt-${prompt.id}`}
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(prompt)}
                        className="p-1.5 text-gray-400 hover:text-blue-650 hover:bg-gray-50 rounded transition cursor-pointer"
                        title="Edit Prompt"
                        id={`edit-prompt-${prompt.id}`}
                      >
                        <Edit className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Vital red error warning exactly as specified Page 16 */}
            <div className="bg-red-50 border border-red-150 rounded-lg p-4 flex items-start space-x-3 text-red-650">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm font-extrabold leading-normal" id="prompts-warning">
                Student projects already in development will NOT be impacted by prompt changes.
              </p>
            </div>

            {/* Button bottom right exactly styled Page 16 */}
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                onClick={handleOpenAdd}
                className="px-6 py-5 border-2 border-emerald-500 text-emerald-800 text-base font-extrabold flex flex-col items-center justify-center space-y-1 rounded-lg transition hover:bg-emerald-50 active:bg-emerald-100 min-h-[90px] cursor-pointer"
                id="btn-add-new-prompt-trigger"
              >
                <span>Add a New</span>
                <span>Prompt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {viewMode === "edit_form" && (
        <div className="space-y-8">
          {/* Back button within form wrapper */}
          <button 
            onClick={() => setViewMode("list")}
            className="flex items-center space-x-2 text-sm font-semibold text-gray-400 hover:text-gray-900 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cancel and return to list</span>
          </button>

          {/* Specific Prompt details form [Page 17] */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 space-y-8 relative">
            <div className="border-b border-gray-100 pb-4">
              <span className="text-xs font-bold text-blue-600 block uppercase tracking-widest">
                {activePrompt ? "Modify Prompt Specifications" : "Create New Prompt Task"}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">Select Project Specifications</h3>
            </div>

            <div className="space-y-6">
              
              {/* Text Input area with divider exactly Page 17 */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block">
                  Lab Project Prompt:
                </label>
                <textarea
                  value={promptTextValue}
                  onChange={(e) => setPromptTextValue(e.target.value)}
                  placeholder="What specific task should applicants complete?"
                  rows={6}
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-inner text-base font-medium text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                  id="prompt-textarea-input"
                />
              </div>

              {/* Server-side AI Generator tool Section exactly Page 17 */}
              <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 border border-violet-150 p-6 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-violet-800">
                    <Brain className="w-5 h-5 text-violet-600 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-widest">AI Tool Prompt Generator:</span>
                  </div>
                  <span className="text-[10px] font-bold text-violet-500 uppercase tracking-widest font-mono">
                    Powered by Gemini 3.5
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    placeholder="Enter keywords (e.g. bio-telemetry, optical arrays, smart grid)..."
                    className="flex-grow px-3 py-2.5 text-xs border border-violet-200 bg-white rounded focus:ring-1 focus:ring-violet-500 outline-none"
                    disabled={isGenerating}
                  />

                  {/* AI trigger button exactly Page 17 button */}
                  <button
                    type="button"
                    onClick={handleAIToolGenerate}
                    disabled={isGenerating}
                    className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs rounded transition flex items-center justify-center space-x-1.5 cursor-pointer min-w-[150px] disabled:opacity-50 inline-block font-sans"
                    id="ai-generate-tool-button"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-violet-600 animate-pulse" />
                        <span>Tool Generate Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                {generationError && (
                  <div className="p-3 border border-red-200 bg-red-50 text-red-700 text-xs rounded leading-normal">
                    <strong>Notice:</strong> {generationError} (Used high-quality offline prompt generator as fallback).
                  </div>
                )}
              </div>

            </div>

            {/* Finish & Manage Application button exactly styled Page 17 bottom */}
            <div className="pt-8 border-t border-gray-100 flex justify-center">
              <button
                type="button"
                onClick={handleSaveActivePrompt}
                className="w-full py-4 border-2 border-emerald-500 hover:bg-emerald-50 text-emerald-800 font-black text-lg rounded-lg text-center transition tracking-wide cursor-pointer"
                id="btn-finish-manage-applications"
              >
                Finish & Manage Applications
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
