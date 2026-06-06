export type UserType = "student" | "lab";

export interface StudentProfile {
  name: string;
  degreeMajor: string;
  researchInterests: string;
}

export interface LabPrompt {
  id: string;
  text: string;
}

export interface Lab {
  id: string;
  name: string;
  description: string;
  manager: string;
  contact: string;
  prompts: LabPrompt[];
}

export type ApplicationColumn = "Not Yet Reviewed" | "Accepted" | "Onboarded" | "Denied";

export interface ProjectApplication {
  id: string;
  studentEmail: string;
  studentName: string;
  collaboratorNames: string[];
  labId: string;
  labName: string;
  promptId: string;
  promptTopic: string;
  description: string;
  groupContactInfo: string;
  projectFileName: string;
  resumeFileName: string;
  coverLetterFileName: string;
  status: ApplicationColumn;
  feedback: string;
}

export interface ChatMessage {
  id: string;
  chatId: string; // e.g. "john_doe" or "lab_collaboration"
  sender: string; // Email, Name, or "system"
  senderRole: UserType | "system";
  senderName: string;
  text: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  text: string;
  timestamp: string;
  read: boolean;
  type: "match" | "message" | "decision" | "system";
}

export interface AppState {
  currentRole: UserType | null;
  loggedInUser: {
    email: string;
    username: string;
    name: string;
  } | null;
  studentProfile: StudentProfile | null;
  selectedLabId: string | null;
  selectedPromptId: string | null;
  isPartnerProject: boolean | null; // true = partner, false = individual
  isGroupMatched: boolean; // simulated matching
  submittedApplicationId: string | null;
  currentStep: number; // 0 = create profile, 1 = select lab, 2 = application, 3 = decision
}
