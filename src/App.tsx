import React, { useState, useEffect } from "react";
import { UserType, StudentProfile, Lab, ProjectApplication, ChatMessage, Notification, AppState } from "./types";
import { INITIAL_LABS, INITIAL_APPLICATIONS } from "./data";

// Sub component imports
import Header from "./components/Header";
import LoginView from "./components/LoginView";
import StudentDashboardView from "./components/StudentDashboardView";
import CreateProfileView from "./components/CreateProfileView";
import SelectLabView from "./components/SelectLabView";
import ConfirmLabView from "./components/ConfirmLabView";
import AwaitMatchView from "./components/AwaitMatchView";
import ApplyLabView from "./components/ApplyLabView";
import DecisionView from "./components/DecisionView";
import LabProfileView from "./components/LabProfileView";
import EditPromptsView from "./components/EditPromptsView";
import ManageApplicationsView from "./components/ManageApplicationsView";
import ProvideFeedbackView from "./components/ProvideFeedbackView";
import ConfirmDecisionView from "./components/ConfirmDecisionView";
import MessagesView from "./components/MessagesView";
import NotificationsView from "./components/NotificationsView";

// Lucide icon helper
import { RefreshCw, UserCheck, Flame, Info } from "lucide-react";

// Runtime sanitizers to clean up any cached data in returning user browsers
function sanitizeApplications(apps: ProjectApplication[]): ProjectApplication[] {
  if (!apps || !Array.isArray(apps)) return apps;
  const nameMap: { [key: string]: string } = {
    "Jiawen Zhu": "Jane Doe",
    "Yumeng Ma": "John Doe",
    "Amy Zhang": "Jane Smith",
    "Jesse Martinez": "Bob Johnson"
  };
  const emailMap: { [key: string]: string } = {
    "jiawen.zhu@uw.edu": "jane.doe@university.edu",
    "yumeng.ma@uw.edu": "john.doe@university.edu",
    "amy.zhang@uw.edu": "jane.smith@university.edu",
    "jesse.martinez@uw.edu": "bob.johnson@university.edu"
  };

  return apps.map(app => {
    let studentName = app.studentName;
    if (nameMap[studentName]) {
      studentName = nameMap[studentName];
    }
    let studentEmail = app.studentEmail;
    if (emailMap[studentEmail]) {
      studentEmail = emailMap[studentEmail];
    }
    const collaboratorNames = (app.collaboratorNames || []).map(name => nameMap[name] || name);
    
    let groupContactInfo = app.groupContactInfo || "";
    Object.entries(emailMap).forEach(([oldEmail, newEmail]) => {
      groupContactInfo = groupContactInfo.split(oldEmail).join(newEmail);
    });

    let description = app.description || "";
    description = description.split("Jiawen").join("Jane");
    description = description.split("Yumeng").join("John");

    return {
      ...app,
      studentName,
      studentEmail,
      collaboratorNames,
      groupContactInfo,
      description
    };
  });
}

function sanitizeAppState(state: AppState): AppState {
  if (!state) return state;
  const nameMap: { [key: string]: string } = {
    "Jiawen Zhu": "Jane Doe",
    "Yumeng Ma": "John Doe",
    "Amy Zhang": "Jane Smith",
    "Jesse Martinez": "Bob Johnson"
  };
  const emailMap: { [key: string]: string } = {
    "jiawen.zhu@uw.edu": "jane.doe@university.edu",
    "yumeng.ma@uw.edu": "john.doe@university.edu",
    "amy.zhang@uw.edu": "jane.smith@university.edu",
    "jesse.martinez@uw.edu": "bob.johnson@university.edu"
  };

  const newState = { ...state };
  if (newState.loggedInUser) {
    const oldEmail = newState.loggedInUser.email;
    if (emailMap[oldEmail]) {
      newState.loggedInUser = {
        ...newState.loggedInUser,
        email: emailMap[oldEmail],
        username: emailMap[oldEmail].split("@")[0]
      };
    }
    const oldName = newState.loggedInUser.name;
    if (nameMap[oldName]) {
      newState.loggedInUser = {
        ...newState.loggedInUser,
        name: nameMap[oldName]
      };
    }
  }

  if (newState.studentProfile) {
    const oldName = newState.studentProfile.name;
    let finalProfileName = oldName;
    if (nameMap[oldName]) {
      finalProfileName = nameMap[oldName];
    }
    let currentMajor = newState.studentProfile.degreeMajor || "Computer Science";
    if (currentMajor.includes("Piano")) {
      currentMajor = "Piano Performance";
    }
    newState.studentProfile = {
      ...newState.studentProfile,
      name: finalProfileName,
      degreeMajor: currentMajor
    };
  }

  return newState;
}

export default function App() {
  // Global Persisted Datasets (synced with localStorage)
  const [labs, setLabs] = useState<Lab[]>(() => {
    const saved = localStorage.getItem("custodian_labs");
    return saved ? JSON.parse(saved) : INITIAL_LABS;
  });

  const [applications, setApplications] = useState<ProjectApplication[]>(() => {
    const saved = localStorage.getItem("custodian_applications");
    return saved ? sanitizeApplications(JSON.parse(saved)) : sanitizeApplications(INITIAL_APPLICATIONS);
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("custodian_messages");
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem("custodian_notifications");
    return saved ? JSON.parse(saved) : [];
  });

  // Active User session state
  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem("custodian_session");
    if (saved) {
      return sanitizeAppState(JSON.parse(saved));
    }
    return {
      currentRole: null,
      loggedInUser: null,
      studentProfile: null,
      selectedLabId: null,
      selectedPromptId: null,
      isPartnerProject: null,
      isGroupMatched: false,
      submittedApplicationId: null,
      currentStep: 0 // 0 = Profile, 1 = Lab list, 2 = Apply/Await, 3 = Decision
    };
  });

  // Current sub-navigation inside a role: "dashboard" | "messages" | "notifications" | "labProfile"
  const [activeTab, setActiveTab] = useState<"dashboard" | "messages" | "notifications" | "labProfile">("dashboard");

  // Auxiliary states for Lab Manager Review Screen Workflow
  const [reviewingAppId, setReviewingAppId] = useState<string | null>(null);
  const [isConfirmingDecision, setIsConfirmingDecision] = useState(false);
  const [pendingDecisionVal, setPendingDecisionVal] = useState<"Accepted" | "Denied">("Accepted");
  const [pendingFeedbackVal, setPendingFeedbackVal] = useState("");

  // Step override/subpages when in Student Dashboard
  // null = view steps matching currentStep; or override to view detail forms e.g. "profile_form", "select_lab_list"
  const [studentViewOverride, setStudentViewOverride] = useState<string | null>(null);

  // Sync to local storage on changes
  useEffect(() => {
    localStorage.setItem("custodian_labs", JSON.stringify(labs));
  }, [labs]);

  useEffect(() => {
    localStorage.setItem("custodian_applications", JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem("custodian_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("custodian_notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("custodian_session", JSON.stringify(appState));
  }, [appState]);

  // Automated chatbot reply simulation helper
  useEffect(() => {
    if (messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];

    if (lastMsg.senderRole === "student" && lastMsg.sender !== "john.doe@uw.edu") {
      // Simulate John Doe typing a response after a delay
      const timer = setTimeout(() => {
        const replyText = getAutomatedPartnerReply(lastMsg.text, appState.currentStep);
        const autoReply: ChatMessage = {
          id: `msg-reply-${Date.now()}`,
          chatId: "john_doe",
          sender: "john.doe@uw.edu",
          senderRole: "student",
          senderName: "John Doe",
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, autoReply]);

        // Add message received notification verbatim matching Page 25 Screenshot
        const newNotif: Notification = {
          id: `notif-${Date.now()}`,
          text: "You’ve received a message from John Doe.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
          type: "message"
        };
        setNotifications(prev => [newNotif, ...prev]);

      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [messages, appState.currentStep]);

  // Handle Login Event
  const handleLoginSuccess = (role: UserType, email: string, name: string) => {
    // If logging in as a student (e.g. via Explore as Student), reset progress to start from Create Profile page
    const finalProfile: StudentProfile | null = null;

    setAppState(prev => ({
      currentRole: role,
      loggedInUser: {
        email,
        username: email.split("@")[0],
        name
      },
      studentProfile: finalProfile,
      selectedLabId: null,
      selectedPromptId: null,
      isPartnerProject: null,
      isGroupMatched: false,
      submittedApplicationId: null,
      currentStep: 0
    }));
    setActiveTab("dashboard");
    setStudentViewOverride(null);
  };

  // Logout Event
  const handleLogout = () => {
    setAppState(prev => ({
      ...prev,
      currentRole: null,
      loggedInUser: null
    }));
    setActiveTab("dashboard");
    setStudentViewOverride(null);
    setReviewingAppId(null);
    setIsConfirmingDecision(false);
  };

  // Swap Roles shortcut simulator
  const handleQuickSwapRole = () => {
    if (appState.currentRole === "student") {
      handleLoginSuccess("lab", "alex.doe@university.edu", "Dr. Alex Doe");
    } else {
      handleLoginSuccess("student", "jane.doe@university.edu", "Jane Doe");
    }
  };

  // Reset entire simulation data to original defaults
  const handleFullReset = () => {
    if (confirm("Reset prototype to default initial database fields? All edits, draft feedback, and applications will clear. This resets your session completely.")) {
      // Clear in-memory state so any unload auto-saves write default state
      setLabs(INITIAL_LABS);
      setApplications(sanitizeApplications(INITIAL_APPLICATIONS));
      setMessages([]);
      setNotifications([]);
      setAppState({
        currentRole: null,
        loggedInUser: null,
        studentProfile: null,
        selectedLabId: null,
        selectedPromptId: null,
        isPartnerProject: null,
        isGroupMatched: false,
        submittedApplicationId: null,
        currentStep: 0
      });
      // Clear localStorage
      localStorage.clear();
      // Reload page immediately
      window.location.reload();
    }
  };

  // Message Handler
  const handleSendMessage = (text: string) => {
    if (!appState.loggedInUser) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      chatId: "john_doe",
      sender: appState.loggedInUser.email,
      senderRole: appState.currentRole || "student",
      senderName: appState.loggedInUser.name,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
  };

  // Notification Clear Handles
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAllNotifs = () => {
    setNotifications([]);
  };

  // --- STUDENT SCENARIO EVENTS ---

  // Saved Profile
  const handleSaveStudentProfile = (profile: StudentProfile) => {
    setAppState(prev => ({
      ...prev,
      studentProfile: profile,
      currentStep: prev.currentStep === 0 ? 1 : prev.currentStep
    }));
  };

  // Chosen Lab
  const handleSelectLab = (labId: string) => {
    setAppState(prev => ({
      ...prev,
      selectedLabId: labId
    }));
    setStudentViewOverride("confirm_lab");
  };

  // Confirmed Specifications & Select Project type (individual vs partner)
  const handleConfirmLabSpecs = (promptId: string, isPartner: boolean) => {
    const selectedLab = labs.find(l => l.id === appState.selectedLabId);
    const chosenPrompt = selectedLab?.prompts.find(p => p.id === promptId);

    setAppState(prev => ({
      ...prev,
      selectedPromptId: promptId,
      isPartnerProject: isPartner,
      isGroupMatched: false,
      currentStep: 2 // Move to application phase
    }));

    if (isPartner) {
      setStudentViewOverride("await_match");
      // Add a small delay then automatically match to prompt maximum interface engagement
      setTimeout(() => {
        // We trigger an alert matching Pages 23/24 verification cues
      }, 500);
    } else {
      setStudentViewOverride("apply_form");
    }
  };

  // Simulating Matching Event [Awaiting Group page]
  const handleTriggerSimulatedMatch = () => {
    setAppState(prev => ({
      ...prev,
      isGroupMatched: true
    }));

    // Generate matched alerts verbatim from Page 24
    const matchNotif: Notification = {
      id: `match-notif-${Date.now()}`,
      text: "You’ve been matched with John Doe. Check messages to continue.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: "match"
    };

    // Prepopulate introduction chat verbatim
    const introMsg: ChatMessage = {
      id: `msg-intro-${Date.now()}`,
      chatId: "john_doe",
      sender: "john.doe@uw.edu",
      senderRole: "student",
      senderName: "John Doe",
      text: "Hey! Glad we got matched for the Lorem Ipsum Lab project. What prompt should we choose? I was thinking Prompt #3 is perfect, we can implement supervised learning on real EEG signals!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setNotifications(prev => [matchNotif, ...prev]);
    setMessages(prev => [...prev, introMsg]);
  };

  // Proceed Await page -> Apply details Page 11
  const handleProceedFromMatchToApply = () => {
    setStudentViewOverride("apply_form");
  };

  // Submit Proposal Application Page 11
  const handleSubmittingProposal = (data: {
    groupContactInfo: string;
    promptTopic: string;
    description: string;
    projectFileName: string;
    resumeFileName: string;
    coverLetterFileName: string;
  }) => {
    if (!appState.loggedInUser) return;

    const selectedLab = labs.find(l => l.id === appState.selectedLabId);

    const newApp: ProjectApplication = {
      id: `application-${Date.now()}`,
      studentEmail: appState.loggedInUser.email,
      studentName: appState.studentProfile?.name || appState.loggedInUser.name,
      collaboratorNames: appState.isPartnerProject ? ["John Doe"] : [],
      labId: selectedLab?.id || "lorem-ipsum-lab",
      labName: selectedLab?.name || "Lorem Ipsum Lab",
      promptId: appState.selectedPromptId || "prompt-1",
      promptTopic: data.promptTopic,
      description: data.description,
      groupContactInfo: data.groupContactInfo,
      projectFileName: data.projectFileName,
      resumeFileName: data.resumeFileName,
      coverLetterFileName: data.coverLetterFileName,
      status: "Not Yet Reviewed",
      feedback: ""
    };

    // Append to global applications list, save student link
    setApplications(prev => [newApp, ...prev]);
    setAppState(prev => ({
      ...prev,
      submittedApplicationId: newApp.id,
      currentStep: 3 // Move to Decision view
    }));

    setStudentViewOverride("decision_view");
  };

  // Evaluate submitted app as student (simulation help)
  const handleStudentSelfDecisionSimulate = (status: "Accepted" | "Denied", feedbackText: string) => {
    if (!appState.submittedApplicationId) return;

    // Update global applications
    setApplications(prev => prev.map(app => 
      app.id === appState.submittedApplicationId 
        ? { ...app, status, feedback: feedbackText }
        : app
    ));

    // Update notification
    const decisionNotif: Notification = {
      id: `dec-notif-${Date.now()}`,
      text: status === "Accepted" 
        ? `You’ve been accepted into ${labs.find(l => l.id === appState.selectedLabId)?.name || 'the lab'}! View feedback now.`
        : `A decision has been posted for your application to ${labs.find(l => l.id === appState.selectedLabId)?.name || 'the lab'}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: "decision"
    };
    setNotifications(prev => [decisionNotif, ...prev]);
  };

  // --- LAB ROLE WORKSPACE EVENTS ---

  // Save Lab profile updates
  const handleSaveLabProfile = (updatedLab: Lab) => {
    setLabs(prev => prev.map(l => l.id === updatedLab.id ? updatedLab : l));
  };

  // Update prompts
  const handleSaveLabPrompts = (updatedPrompts: { id: string; text: string }[]) => {
    setLabs(prev => prev.map(l => 
      l.id === "lorem-ipsum-lab" 
        ? { ...l, prompts: updatedPrompts } 
        : l
    ));
  };

  // Roster evaluation feedback
  const handleDraftFeedback = (draftText: string) => {
    if (!reviewingAppId) return;
    setApplications(prev => prev.map(app => 
      app.id === reviewingAppId ? { ...app, feedback: draftText } : app
    ));
    setReviewingAppId(null);
  };

  // Review screen Accept/Deny clicked -> Opens Pages 20/21 Confirm Decision
  const handleReviewConfirmRedirect = (verdict: "Accepted" | "Denied", feedbackText: string) => {
    setPendingDecisionVal(verdict);
    setPendingFeedbackVal(feedbackText);
    setIsConfirmingDecision(true);
  };

  // Final Decision Confirmed on Page 20 / 21
  const handleFinalDecisionSubmit = () => {
    if (!reviewingAppId) return;

    // Update global list
    setApplications(prev => prev.map(app => 
      app.id === reviewingAppId 
        ? { ...app, status: pendingDecisionVal, feedback: pendingFeedbackVal }
        : app
    ));

    // Is the student we just reviewed the logged in student? Update their local state too
    const reviewedApp = applications.find(a => a.id === reviewingAppId);
    if (reviewedApp && reviewedApp.studentEmail === appState.loggedInUser?.email) {
      setAppState(prev => ({
        ...prev,
        currentStep: 3
      }));
    }

    // Reset Review Wizard
    setIsConfirmingDecision(false);
    setReviewingAppId(null);
    setActiveTab("dashboard");

    alert(`Formal decision has been issued and dispatched to ${reviewedApp?.studentName || 'applicant'}'s portal logs.`);
  };

  // Router dispatcher
  const renderStudentMainContent = () => {
    // Check override or default step routing
    const targetView = studentViewOverride || `step_${appState.currentStep}`;

    // Header bar title selector
    let calculatedHeaderTitle = "Student Dashboard";
    if (studentViewOverride === "profile_form" || targetView === "step_0") calculatedHeaderTitle = "Create Student Profile";
    else if (studentViewOverride === "select_lab" || targetView === "step_1") calculatedHeaderTitle = "Select Lab";
    else if (studentViewOverride === "confirm_lab") calculatedHeaderTitle = "Confirm Lab Selection";
    else if (studentViewOverride === "await_match") calculatedHeaderTitle = "Await Group Formation";
    else if (studentViewOverride === "apply_form" || targetView === "step_2") calculatedHeaderTitle = "Apply to Lab";
    else if (studentViewOverride === "decision_view" || targetView === "step_3") calculatedHeaderTitle = "View Decision";

    // 1. Profile Creation [Page 7]
    if (studentViewOverride === "profile_form" || targetView === "step_0") {
      return (
        <CreateProfileView
          initialProfile={appState.studentProfile}
          defaultEmailName={appState.loggedInUser?.name || "New Student"}
          onSave={handleSaveStudentProfile}
          onBackToDashboard={() => {
            setStudentViewOverride(null);
            setAppState(prev => ({ ...prev, currentStep: appState.studentProfile ? prev.currentStep : 0 }));
          }}
        />
      );
    }

    // 2. Select Lab Explorer [Page 8]
    if (studentViewOverride === "select_lab" || targetView === "step_1") {
      return (
        <SelectLabView
          labs={labs}
          onSelectLab={handleSelectLab}
          onBackToDashboard={() => setStudentViewOverride(null)}
        />
      );
    }

    // 2b. Confirm Specs spec sheet [Page 9]
    if (studentViewOverride === "confirm_lab") {
      const activeLab = labs.find(l => l.id === appState.selectedLabId) || labs[0];
      return (
        <ConfirmLabView
          lab={activeLab}
          onConfirmSelection={handleConfirmLabSpecs}
          onCancel={() => setStudentViewOverride("select_lab")}
        />
      );
    }

    // 2c. Group Formation [Page 10]
    if (studentViewOverride === "await_match") {
      const activeLab = labs.find(l => l.id === appState.selectedLabId) || labs[0];
      return (
        <AwaitMatchView
          labName={activeLab.name}
          isMatched={AppStateIsGroupMatched(appState)}
          onSimulateMatch={handleTriggerSimulatedMatch}
          onProceedToApplication={handleProceedFromMatchToApply}
        />
      );
    }

    // 3. Document submissions form [Page 11]
    if (studentViewOverride === "apply_form" || targetView === "step_2") {
      const activeLab = labs.find(l => l.id === appState.selectedLabId) || labs[0];
      const selectedPrompt = activeLab.prompts.find(p => p.id === appState.selectedPromptId) || activeLab.prompts[0];

      return (
        <ApplyLabView
          labName={activeLab.name}
          selectedPromptText={selectedPrompt?.text || "Select Project Specifications"}
          isPartner={!!appState.isPartnerProject}
          studentName={appState.studentProfile?.name || appState.loggedInUser?.name || "Student"}
          studentEmail={appState.loggedInUser?.email || "student@uw.edu"}
          onBack={() => setStudentViewOverride("confirm_lab")}
          onSubmit={handleSubmittingProposal}
        />
      );
    }

    // 4. Evaluation Decision outputs [Page 12, 13]
    if (studentViewOverride === "decision_view" || targetView === "step_3") {
      const userApp = applications.find(a => a.id === appState.submittedApplicationId) || applications[0] || null;
      return (
        <DecisionView
          application={userApp}
          onBackToDashboard={() => setStudentViewOverride(null)}
          onSimulateReview={handleStudentSelfDecisionSimulate}
        />
      );
    }

    // Default student Steps board overview [Page 1, 2, 3, 4]
    return (
      <StudentDashboardView
        appState={appState}
        onNavigateToStep={(stepIdx) => {
          if (stepIdx === 0) setStudentViewOverride("profile_form");
          else if (stepIdx === 1) setStudentViewOverride("select_lab");
          else if (stepIdx === 2) {
            if (appState.isPartnerProject && !AppStateIsGroupMatched(appState)) {
              setStudentViewOverride("await_match");
            } else {
              setStudentViewOverride("apply_form");
            }
          } else if (stepIdx === 3) {
            setStudentViewOverride("decision_view");
          }
        }}
      />
    );
  };

  const renderLabMainContent = () => {
    // 1. Feedback evaluation screen [Page 19]
    if (reviewingAppId && !isConfirmingDecision) {
      const app = applications.find(a => a.id === reviewingAppId);
      if (!app) return null;
      return (
        <ProvideFeedbackView
          application={app}
          onSaveDraft={handleDraftFeedback}
          onConfirmDecision={handleReviewConfirmRedirect}
          onBack={() => setReviewingAppId(null)}
        />
      );
    }

    // 2. Verdict confirmation screen [Page 20, 21]
    if (reviewingAppId && isConfirmingDecision) {
      const app = applications.find(a => a.id === reviewingAppId);
      if (!app) return null;
      return (
        <ConfirmDecisionView
          studentName={app.studentName}
          decision={pendingDecisionVal}
          feedback={pendingFeedbackVal}
          onCancel={() => setIsConfirmingDecision(false)}
          onConfirm={handleFinalDecisionSubmit}
        />
      );
    }

    // 3. Prerequisite prompt editor wrapper [Page 16 & 17]
    if (activeTab === "labProfile" && studentViewOverride === "edit_prompts") {
      const lab = labs.find(l => l.id === "lorem-ipsum-lab") || labs[0];
      return (
        <EditPromptsView
          lab={lab}
          onBack={() => setStudentViewOverride(null)}
          onSavePrompts={handleSaveLabPrompts}
        />
      );
    }

    // 4. Coordination Details Edit profile [Page 15]
    if (activeTab === "labProfile") {
      const lab = labs.find(l => l.id === "lorem-ipsum-lab") || labs[0];
      return (
        <LabProfileView
          lab={lab}
          onSave={handleSaveLabProfile}
          onGoToEditPrompts={() => setStudentViewOverride("edit_prompts")}
          onReturnToDashboard={() => setActiveTab("dashboard")}
        />
      );
    }

    // Default Roster desk column manager [Page 18]
    return (
      <ManageApplicationsView
        applications={applications}
        onOpenApplicationReview={(id) => {
          setReviewingAppId(id);
          setIsConfirmingDecision(false);
        }}
      />
    );
  };

  // Base layout renderer
  if (!appState.currentRole || !appState.loggedInUser) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  // Calculate Header bar displayed title based on active module
  let pageHeaderTitle = appState.currentRole === "student" ? "Student Dashboard" : "Manage Applications";
  if (activeTab === "messages") pageHeaderTitle = "Messages";
  else if (activeTab === "notifications") pageHeaderTitle = "Notifications";
  else if (activeTab === "labProfile") {
    pageHeaderTitle = studentViewOverride === "edit_prompts" ? "Edit Pre-Req Project Prompts" : "Edit Lab Profile";
  } else if (appState.currentRole === "student") {
    const targetStatus = studentViewOverride || `step_${appState.currentStep}`;
    if (studentViewOverride === "profile_form" || targetStatus === "step_0") pageHeaderTitle = "Create Student Profile";
    else if (studentViewOverride === "select_lab" || targetStatus === "step_1") pageHeaderTitle = "Select Lab";
    else if (studentViewOverride === "confirm_lab") pageHeaderTitle = "Confirm Lab Selection";
    else if (studentViewOverride === "await_match") pageHeaderTitle = "Await Group Formation";
    else if (studentViewOverride === "apply_form" || targetStatus === "step_2") pageHeaderTitle = "Apply to Lab";
    else if (studentViewOverride === "decision_view" || targetStatus === "step_3") pageHeaderTitle = "View Decision";
  } else {
    if (reviewingAppId && !isConfirmingDecision) pageHeaderTitle = "Provide Feedback";
    else if (reviewingAppId && isConfirmingDecision) pageHeaderTitle = "Confirm Decision";
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        {/* Sync Global Header */}
        <Header
          title={pageHeaderTitle}
          role={appState.currentRole}
          username={appState.loggedInUser.name}
          activeTab={activeTab}
          notifications={notifications}
          onLogout={handleLogout}
          onTabChange={(tab) => {
            setActiveTab(tab);
            // Close form views overrides on tab migrations
            setStudentViewOverride(null);
            setReviewingAppId(null);
            setIsConfirmingDecision(false);
          }}
        />

        {/* Global Quick-Swap Simulation toolbar always accessible when authenticated */}
        <div className="bg-gray-900 text-white py-2 px-4 shadow-sm text-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 select-none">
            <div className="flex items-center space-x-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>ROLE SANDBOX: Currently exploring in <strong>{appState.currentRole.toUpperCase()}</strong> mode.</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleQuickSwapRole}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 rounded font-bold text-[10px] tracking-wide flex items-center space-x-1 uppercase transition cursor-pointer"
                title="Swap back and forth between student applicant and coordinator"
                id="sandbox-swap-role"
              >
                <RefreshCw className="w-3 h-3 text-white" />
                <span>Swap to {appState.currentRole === "student" ? "Lab Manager" : "Student"}</span>
              </button>
              <button
                onClick={handleFullReset}
                className="px-2.5 py-1 bg-red-650 hover:bg-red-750 rounded font-bold text-[10px] tracking-wide flex items-center space-x-1 uppercase transition cursor-pointer"
                id="sandbox-factory-reset"
              >
                <span>Reset Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Primary Workspace Stage */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          {activeTab === "messages" ? (
            <MessagesView
              currentUserEmail={appState.loggedInUser.email}
              currentUsername={appState.loggedInUser.name}
              role={appState.currentRole}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          ) : activeTab === "notifications" ? (
            <NotificationsView
              notifications={notifications}
              onClearAll={handleClearAllNotifs}
              onMarkAllAsRead={handleMarkAllRead}
            />
          ) : appState.currentRole === "student" ? (
            renderStudentMainContent()
          ) : (
            renderLabMainContent()
          )}
        </main>
      </div>

      {/* Global Page Footer */}
      <footer className="border-t border-gray-200 bg-white py-6 text-center text-xs text-gray-400 select-none">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>Custodian Research Mockup - Build Turn Finalized</span>
          <span>School of Computing &amp; Engineering Admissions</span>
        </div>
      </footer>
    </div>
  );
}

// Automated chatbot replies list context matching current steps
function getAutomatedPartnerReply(inputStr: string, activeStep: number): string {
  const query = inputStr.toLowerCase();
  
  if (query.includes("hint") || query.includes("what") || query.includes("prompt")) {
    return "Yes! I strongly suggest Prompt #3: 'Explore supervised learning for Brain-Computer Interfaces'. Brain-computer integration is the future of interdisciplinary neurology, plus mapping musical phrasing with it is so creative. Let's do that!";
  }
  
  if (query.includes("submit") || query.includes("done") || query.includes("sent") || query.includes("apply")) {
    return "That is amazing! I'll double check my academic CV on my portal. I hope Dr. Doe accepts our project proposal quickly. We would make such an awesome team this winter!";
  }

  if (query.includes("hello") || query.includes("hey") || query.includes("hi")) {
    return "Hey! Hope you are having an amazing day. I'm so excited about getting matched as partner. Let me know when you file our PDF resources on your portal, I'm ready to write the thermal baking or brain interfaces review.";
  }

  // Base smart reply context
  return "That sounds like a brilliant path forward! Let's make sure we include both of our contact details in the Group Contact Field on the portal. Let me know when the abstract is submitted!";
}

// AppState matching accessor safety
function AppStateIsGroupMatched(s: AppState): boolean {
  return s.isGroupMatched;
}
