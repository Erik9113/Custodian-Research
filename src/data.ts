import { Lab, ProjectApplication } from "./types";

export const DEFAULT_MAJORS = [
  "Piano Performance",
  "Food Science",
  "Education",
  "Computer Science",
  "Bioengineering",
  "Human-Computer Interaction",
  "Cognitive Science",
  "Mathematics",
  "Having Fun"
];

export const INITIAL_LABS: Lab[] = [
  {
    id: "lorem-ipsum-lab",
    name: "Lorem Ipsum Lab",
    description: "An interdisciplinary laboratory focused on niche software instruments, automated budgeting models, and supervised educational systems.",
    manager: "Dr. Alex Doe",
    contact: "alex.doe@university.edu",
    prompts: [
      {
        id: "prompt-1",
        text: "Design a chocolate chip cookie development tool that simulates thermal baking profiles and component hydration ratios dynamically."
      },
      {
        id: "prompt-2",
        text: "Make a tool that represents salary cap budgeting for team formations, utilizing mathematical optimization and recursive allocation schemas."
      },
      {
        id: "prompt-3",
        text: "Explore supervised learning for Brain-Computer Interfaces (BCI), mapping high-density EEG output to multi-state semantic predictions in real time."
      },
      {
        id: "prompt-4",
        text: "Create a writing tool powered by AI that's actually good—focusing on stylistic constraints, syntax flow, and rhythm-guided micro-spacing."
      }
    ]
  },
  {
    id: "neurotech-collab",
    name: "Neurotech & Cognition Group",
    description: "Pioneering the intersection of non-invasive neural telemetry and cognitive load models to build assistive communication architectures.",
    manager: "Dr. Taylor Doe",
    contact: "taylor.doe@university.edu",
    prompts: [
      {
        id: "nc-1",
        text: "Map user blink-rate patterns to custom digital dictionary indices using adaptive micro-dwell estimators."
      },
      {
        id: "nc-2",
        text: "Design an auditory attention-decoder utilizing acoustic frequency offsets and EEG spectral spikes."
      }
    ]
  },
  {
    id: "sustainable-design",
    name: "Autonomous Ecology Initiative",
    description: "Exploring adaptive urban micro-climates, closed-loop bio-reactors, and high-efficiency material logistics in dense micro-cities.",
    manager: "Dr. Jordan Doe",
    contact: "jordan.doe@university.edu",
    prompts: [
      {
        id: "ae-1",
        text: "Build a reinforcement learning spatial routing layout for nutrient redistribution loops in vertical farm grids."
      },
      {
        id: "ae-2",
        text: "Design a desktop solar concentrator tracking system using photo-resistive differential bridges and pneumatic tilts."
      }
    ]
  }
];

export const INITIAL_APPLICATIONS: ProjectApplication[] = [
  {
    id: "app-1",
    studentEmail: "jane.doe@university.edu",
    studentName: "Jane Doe",
    collaboratorNames: ["John Doe"],
    labId: "lorem-ipsum-lab",
    labName: "Lorem Ipsum Lab",
    promptId: "prompt-3",
    promptTopic: "Explore supervised learning for Brain-Computer Interfaces ...",
    description: "Developing a novel mapping function between MIDI key velocities, physical arm pressure, and neural telemetry signals to explore if brain-computer feedback loops can enhance piano phrasing accuracy.",
    groupContactInfo: "jane.doe@university.edu, john.doe@university.edu",
    projectFileName: "PianoSupervisedBCI.pdf",
    resumeFileName: "Jane_Doe_Resume.pdf",
    coverLetterFileName: "Jane_Doe_CoverLetter.pdf",
    status: "Not Yet Reviewed",
    feedback: ""
  },
  {
    id: "app-2",
    studentEmail: "john.doe@university.edu",
    studentName: "John Doe",
    collaboratorNames: ["Jane Doe"],
    labId: "lorem-ipsum-lab",
    labName: "Lorem Ipsum Lab",
    promptId: "prompt-3",
    promptTopic: "Explore supervised learning for Brain-Computer Interfaces ...",
    description: "Collaborating with Jane on the neural motor telemetry mapping to mechanical actuators. Specifically optimizing real-time classification latency.",
    groupContactInfo: "john.doe@university.edu, jane.doe@university.edu",
    projectFileName: "NeuralMechanicalActuators.pdf",
    resumeFileName: "John_Doe_Resume.pdf",
    coverLetterFileName: "John_Doe_CoverLetter.pdf",
    status: "Not Yet Reviewed",
    feedback: ""
  },
  {
    id: "app-3",
    studentEmail: "jane.smith@university.edu",
    studentName: "Jane Smith",
    collaboratorNames: [],
    labId: "lorem-ipsum-lab",
    labName: "Lorem Ipsum Lab",
    promptId: "prompt-1",
    promptTopic: "Design a chocolate chip cookie development tool ...",
    description: "A comprehensive thermal hydration tracker. This project calculates heat-flux values during cooking to isolate gelatinization points in starch chains, creating the ultimate chocolate chip cookie model.",
    groupContactInfo: "jane.smith@university.edu",
    projectFileName: "CookieThermalhydration.pdf",
    resumeFileName: "Jane_Smith_CV.pdf",
    coverLetterFileName: "Jane_Smith_Cover.pdf",
    status: "Accepted",
    feedback: "Your project is really cool, and we would love to have you in our lab!"
  },
  {
    id: "app-4",
    studentEmail: "bob.johnson@university.edu",
    studentName: "Bob Johnson",
    collaboratorNames: [],
    labId: "lorem-ipsum-lab",
    labName: "Lorem Ipsum Lab",
    promptId: "prompt-4",
    promptTopic: "Create a writing tool powered by AI that’s actually good ...",
    description: "An analysis of grammar structures and lexical richness. However, it lacks deep implementation of custom syntax style models.",
    groupContactInfo: "bob.johnson@university.edu",
    projectFileName: "BasicAIWritingAssistant.pdf",
    resumeFileName: "Bob_Johnson_CV.pdf",
    coverLetterFileName: "Bob_Johnson_Cover.pdf",
    status: "Denied",
    feedback: "Sorry, this isn’t quite what we’re looking for right now."
  }
];
