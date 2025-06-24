import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Satellite, Sparkles, Star, Mail, Calendar, Clock, ArrowDown } from "lucide-react";
import RoleDetailModal from "@/components/RoleDetailModal";
import RegistrationModal from "@/components/RegistrationModal";
import SpaceBackground from "@/components/SpaceBackground";

const positions = [
  {
    id: "eps",
    title: "Electrical Power System (EPS)",
    shortDescription: "Design and develop satellite power systems and battery management",
    detailedDescription: "As an EPS Engineer, you'll be responsible for designing the heart of our satellite - the power system. You'll work on battery management systems, solar panel configurations, and power distribution networks that keep our satellite operational in the harsh space environment.",
    responsibilities: [
      "Solid foundation in basic Electrical and Electronics",
      "Must be familiar with all of the satellite subsystems and how they interface (Power, Control and Data). (This knowledge is required for interview)",
      "Solid foundation of battery chemistry, charging, and discharging principles", 
      "Ability to create Electrical Power System schematics and PCB layouts according to the system's requirements/specifications",
      "Capability of making the satellite's power budget in accordance with mission requirements",
      "Experience with LTSpice, MATLAB, or other power simulation tools is an advantage"
    ],
    requirements: ["Electrical & Electronics basics", "Satellite subsystems knowledge", "Battery chemistry", "PCB design"],
    preferred: ["LTSpice", "MATLAB", "Power simulation tools", "Power budget analysis"],
    icon: "⚡"
  },
  {
    id: "obc",
    title: "Onboard Computer",
    shortDescription: "Develop satellite computing systems and microcontroller interfaces",
    detailedDescription: "Join our OBC team to develop the brain of our satellite. You'll work on embedded systems, real-time operating systems, and the critical software that controls all satellite operations from orbit.",
    responsibilities: [
      "Strong understanding of digital electronics and microcontroller fundamentals",
      "Must be familiar with all of the satellite's subsystems and how they interface (This knowledge is required for the interview)",
      "Basics of C++ programming skills",
      "Familiarity with microcontrollers (e.g. STM32)",
      "Willingness to learn RTOS, telemetry handling, and satellite software workflows",
      "Experience with PCB design tools (Altium, KiCad, etc.)"
    ],
    requirements: ["Digital electronics", "Microcontrollers", "C++ programming", "STM32"],
    preferred: ["RTOS", "Telemetry handling", "PCB design tools", "Altium, KiCad"],
    icon: "💻"
  },
  {
    id: "systems",
    title: "Systems Engineer", 
    shortDescription: "Coordinate system design and perform mission analysis",
    detailedDescription: "As a Systems Engineer, you'll be the architect of our satellite mission. You'll define requirements, coordinate between different subsystems, and ensure our satellite meets all mission objectives.",
    responsibilities: [
      "Familiarity or willingness to work with system engineering concepts (requirements, interfaces, budgets)",
      "Coordinate design milestones (SRR, PDR, CDR, etc.) and ensure subsystem alignment",
      "Perform detailed mission analysis using simulation tools like STK, MATLAB, or Simulink to validate satellite performance in orbit",
      "Software and scripting exposure (Python, C, MATLAB)",
      "Stay updated with advancements in satellite subsystems and space systems engineering methodologies to continuously enhance designs",
      "Conduct detailed trade studies and simulations to optimize performance, reliability, and cost-effectiveness across various mission scenarios",
      "Develop and maintain detailed systems engineering documentation, including interface control documents (ICDs), technical specifications, and mission plans",
      "Must be familiar with all of the satellite's subsystems and how they interface",
      "Apply a mission-first perspective to analyze how subsystem interactions affect overall satellite performance"
    ],
    requirements: ["System engineering concepts", "Mission analysis", "Design milestones", "Documentation"],
    preferred: ["STK", "MATLAB/Simulink", "Python", "Trade studies"],
    icon: "🔧"
  },
  {
    id: "payload",
    title: "Payload Engineer",
    shortDescription: "Research and integrate satellite payloads and instruments", 
    detailedDescription: "Shape the scientific mission of our satellite by researching, selecting, and integrating cutting-edge payloads. You'll work on cameras, sensors, and instruments that will accomplish our mission objectives.",
    responsibilities: [
      "Research various payloads suitable for student satellite missions (e.g. cameras, sensors, communications, scientific instruments)",
      "Examine technical viability in light of satellite limitations such as size, power, and mission goals",
      "Evaluate compatibility with satellite constraints (power, size, thermal, data)",
      "Create trade studies across options considering cost, performance, and mission value",
      "Work with Systems Engineering to define interfaces and ensure mission alignment",
      "Strong interest in satellite missions, space technology, and systems-level thinking",
      "Basic understanding of Python or spreadsheets is helpful for data analysis"
    ],
    requirements: ["Payload research", "Technical feasibility", "Trade studies", "Space systems"],
    preferred: ["Python", "Mission planning", "Sensor integration", "Data analysis"],
    icon: "📡"
  },
  {
    id: "mechanical",
    title: "Mechanical Engineer",
    shortDescription: "Design mechanical structures and thermal management systems",
    detailedDescription: "Design the physical structure that will survive launch and operate in space. You'll work on mechanical systems, thermal management, and ensure our satellite can withstand the extreme conditions of space.",
    responsibilities: [
      "Proficiency with CAD software (Fusion 360, SolidWorks, Creo, or CATIA)",
      "Basic knowledge of Finite Element Analysis (FEA) for structural/thermal performance",
      "Familiarity with mechanical drawings, tolerancing, and GD&T principles",
      "Exposure to thermal management techniques for small satellites is a plus",
      "Experience or willingness to learn structural thermal-optical performance (STOP) analysis",
      "Familiarity with 3D printing, machining, or lab prototyping tools",
      "Eagerness to work on high-precision designs under spaceflight constraints (e.g., vibrations, thermal extremes, launch loads)",
      "Correlating simulation data with actual test results",
      "Supporting fabrication and hands-on integration of hardware",
      "Planning and executing environmental testing (TVAC, vibration, etc.)",
      "Clear documentation and drawing organization for handover to fabrication or AIT team"
    ],
    requirements: ["CAD tools", "FEA analysis", "GD&T", "Mechanical drawings"],
    preferred: ["Fusion 360", "SolidWorks", "3D printing", "Thermal management"],
    icon: "⚙️"
  },
  {
    id: "flight-software",
    title: "Flight Software",
    shortDescription: "Develop embedded software for satellite operations",
    detailedDescription: "Create the software that will control our satellite in orbit. You'll develop flight software, implement communication protocols, and ensure reliable operation in the space environment.",
    responsibilities: [
      "Proficiency in C or C++ programming",
      "Willingness to learn and implement RTOS/OS, telecommand - telemetry handling, and satellite software workflows",
      "Knowledge of or familiarity with embedded systems and microcontrollers",
      "Utilize Ethernet, SPI, I2C, UART, and more communication protocols",
      "Utilize hardware to test software (hardware-in-the-loop)",
      "Write simple documentation and use Git for version control",
      "Must be familiar with all of the satellite's subsystems and how they interface (This knowledge is required for the interview)",
      "Collaborate with other groups to ensure that the software meets system requirements",
      "A basic understanding of Python or MATLAB is plus",
      "Be prepared to troubleshoot and resolve any issues that may arise"
    ],
    requirements: ["C/C++", "RTOS", "Embedded systems", "Communication protocols"],
    preferred: ["Hardware-in-loop testing", "Git", "Python", "MATLAB"],
    icon: "🚀"
  },
  {
    id: "communication",
    title: "Communication System",
    shortDescription: "Design and develop satellite communication systems",
    detailedDescription: "Develop the communication systems that will allow our satellite to communicate with ground stations. You'll work on RF systems, digital modulation, and telemetry handling.",
    responsibilities: [
      "Solid foundations in digital & Analog electronics",
      "Strong comprehension of RF components such as filters, amplifiers, Mixers, and their principles",
      "Knowledge of digital modulation methods, including QPSK, FSK, and ASK",
      "Differentiate between Telecommand - Telemetry and work on the implementation of the same",
      "Familiarity with a satellite's communication architecture is required (If not, please research and come prepared for the interview)",
      "Must be familiar with all of the satellite's subsystems and how they interface (Power, Control, and Data); (This knowledge is required for the interview)",
      "Familiarity with PCB design software, such as Altium and KiCad",
      "Experience with microcontrollers and strong C programming abilities are advantages."
    ],
    requirements: ["Digital & Analog electronics", "RF components", "Digital modulation", "Communication architecture"],
    preferred: ["PCB design", "Altium", "KiCad", "C programming"],
    icon: "📡"
  },
  {
    id: "project-manager",
    title: "Project Manager",
    shortDescription: "Coordinate team activities and manage project timelines",
    detailedDescription: "Lead our satellite development project from conception to launch. You'll coordinate between different engineering teams, manage timelines, and ensure we meet our mission milestones.",
    responsibilities: [
      "Work together with subsystem team leads to monitor developments, spot obstacles, and guarantee on-time",
      "Keep senior mentors and academic advisers informed about project status, risks, and dependencies regularly",
      "Arrange and lead multidisciplinary team meetings to guarantee adherence to project schedules using Gantt chart",
      "Minutes of meetings, decisions, and actions taken afterward should be clearly documented with accountability",
      "Control the flow of paperwork, testing schedules, and internal deadlines",
      "Interact with outside suppliers and facilities, particularly for tasks like thermal vacuum testing, vibration testing, and environmental testing",
      "Continue to track components, test equipment, procurement, and logistics",
      "Must be familiar with all of the satellite's subsystems and how they interface (Power, Control and). (This knowledge is required for the interview)"
    ],
    requirements: ["Project coordination", "Progress tracking", "Meeting organization", "Documentation"],
    preferred: ["Gantt charts", "Vendor coordination", "Risk management", "Agile methodologies"],
    icon: "📊"
  }
];

const Index = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);

  const handlePositionSelect = (position) => {
    setSelectedPosition(position);
  };

  const handleApplyClick = () => {
    setShowRegistration(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#E0E0E0] overflow-x-hidden relative font-mono">
      <SpaceBackground />
      
      {/* Hero Section - Updated with larger satellite */}
      <section className="min-h-screen flex flex-col justify-center items-center relative px-4">
        {/* Larger Satellite Icon with professional effects */}
        <div className="mb-16 relative group">
          <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 flex items-center justify-center relative">
            <Satellite className="w-full h-full text-[#00E3FF] opacity-90 drop-shadow-2xl transform transition-transform duration-700 group-hover:scale-105" />
            
            {/* Professional glow effects */}
            <div className="absolute inset-0 bg-[#00E3FF]/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C78C0]/30 to-[#9A6BFF]/30 rounded-full blur-2xl opacity-40"></div>
            
            {/* Orbiting particles effect */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
              <div className="absolute top-4 left-1/2 w-2 h-2 bg-[#FFD700] rounded-full opacity-80"></div>
              <div className="absolute bottom-4 right-1/4 w-1.5 h-1.5 bg-[#FF8C42] rounded-full opacity-70"></div>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
              <div className="absolute top-1/4 right-4 w-1 h-1 bg-[#00E3FF] rounded-full opacity-90"></div>
              <div className="absolute bottom-1/3 left-4 w-1.5 h-1.5 bg-[#9A6BFF] rounded-full opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center px-4 relative z-10 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-[#1C78C0] via-[#00E3FF] to-[#9A6BFF] bg-clip-text text-transparent drop-shadow-lg">
            VIKASANA
          </h1>
          <p className="text-lg md:text-2xl lg:text-3xl mb-12 text-[#00E3FF] font-light tracking-wide drop-shadow-md">
            Student Satellite Team
          </p>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6 text-[#00E3FF] opacity-70" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 md:py-32 relative z-10 border-t border-[#1C78C0]/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-12 bg-gradient-to-r from-[#1C78C0] to-[#00E3FF] bg-clip-text text-transparent">
            Student Satellite Mission Recruitment Drive
          </h2>
          <div className="max-w-6xl mx-auto space-y-8">
            <p className="text-lg md:text-xl text-[#E0E0E0] leading-relaxed font-semibold">
              We are forming an ambitious, high-performing student team with one clear goal:
              <span className="block text-xl md:text-2xl font-bold bg-gradient-to-r from-[#FF8C42] to-[#FFD700] bg-clip-text text-transparent mt-2">Design, build, and launch a satellite.</span>
            </p>
            <p className="text-base md:text-lg text-[#E0E0E0]/80 leading-relaxed">
              This is a rare opportunity to experience a real spacecraft mission as an undergraduate — while being mentored by alumni with prior experience in professional space missions (CubeSats, ground stations, and more). Whether you're in 2nd year just beginning your space journey, or in 3rd/4th year looking to apply your skills, this is for students who want to push limits and learn by building.
            </p>
            <div className="bg-gradient-to-r from-[#1C78C0]/10 to-[#9A6BFF]/10 border border-[#1C78C0]/30 rounded-xl p-6 mx-auto max-w-2xl backdrop-blur-sm">
              <p className="text-base md:text-lg font-bold bg-gradient-to-r from-[#FF8C42] to-[#FFD700] bg-clip-text text-transparent">
                Disclaimer: No good grades? No issues!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Positions Section */}
      <section className="py-32 border-t border-[#9A6BFF]/20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#9A6BFF] to-[#00E3FF] bg-clip-text text-transparent">
              OPEN POSITIONS
            </h2>
            <p className="text-xl text-[#E0E0E0]/90 max-w-2xl mx-auto">
              Choose your path in satellite development. Each role offers unique challenges and opportunities to shape the future of space technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {positions.map((position) => (
              <div 
                key={position.id}
                className="bg-[#0B0F1A]/80 border border-[#1C78C0]/30 rounded-xl p-6 hover:border-[#FF8C42] hover:shadow-2xl hover:shadow-[#FF8C42]/20 transition-all duration-300 cursor-pointer group transform hover:scale-105 backdrop-blur-sm relative overflow-hidden"
                onClick={() => handlePositionSelect(position)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1C78C0]/5 via-transparent to-[#9A6BFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="mb-4 relative z-10">
                  <Satellite className="h-8 w-8 text-[#00E3FF]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#E0E0E0] group-hover:text-[#FF8C42] transition-colors relative z-10">
                  {position.title}
                </h3>
                <p className="text-[#E0E0E0]/70 mb-4 text-sm relative z-10">
                  {position.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                  {position.requirements.slice(0, 3).map((req, index) => (
                    <span key={index} className="px-2 py-1 bg-[#1C78C0]/20 text-[#00E3FF] text-xs rounded border border-[#1C78C0]/40 backdrop-blur-sm">
                      {req}
                    </span>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full bg-transparent border-[#1C78C0] text-[#1C78C0] hover:bg-[#FF8C42] hover:text-[#0B0F1A] hover:border-[#FF8C42] transition-all duration-300 relative z-10"
                >
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Benefits Section */}
      <section className="py-32 border-t border-[#00E3FF]/20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* General Requirements */}
            <div className="bg-[#0B0F1A]/90 border border-[#1C78C0]/30 rounded-xl p-8 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1C78C0]/5 via-transparent to-[#9A6BFF]/5"></div>
              <h3 className="text-2xl font-bold mb-6 text-[#E0E0E0] flex items-center gap-2 relative z-10">
                <Star className="h-6 w-6 text-[#FFD700]" />
                GENERAL REQUIREMENTS
              </h3>
              <ul className="space-y-3 relative z-10">
                <li className="flex items-start gap-2 text-[#E0E0E0]/90">
                  <div className="w-2 h-2 bg-[#1C78C0] rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                  Solid excellent communication and organizing abilities
                </li>
                <li className="flex items-start gap-2 text-[#E0E0E0]/90">
                  <div className="w-2 h-2 bg-[#00E3FF] rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  Willingness to take responsibility and strive for completion despite severe academic and technical limits
                </li>
                <li className="flex items-start gap-2 text-[#E0E0E0]/90">
                  <div className="w-2 h-2 bg-[#9A6BFF] rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  Space, satellites and learning new things must be of interest to you
                </li>
                <li className="flex items-start gap-2 text-[#E0E0E0]/90">
                  <div className="w-2 h-2 bg-[#FF8C42] rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  Passionate about space tech and system design
                </li>
                <li className="flex items-start gap-2 text-[#E0E0E0]/90">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                  Excellent technical writing skills, initiative, and a long-term thinking mindset
                </li>
                <li className="flex items-start gap-2 text-[#E0E0E0]/90">
                  <div className="w-2 h-2 bg-[#1C78C0] rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  Self-driven, open to learning, and capable of taking charge of research assignments
                </li>
                <li className="flex items-start gap-2 text-[#E0E0E0]/90">
                  <div className="w-2 h-2 bg-[#00E3FF] rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '1.2s' }}></div>
                  Capable of taking charge and cooperating effectively in a group
                </li>
              </ul>
            </div>

            {/* Perks & Benefits */}
            <div className="bg-[#0B0F1A]/90 border border-[#9A6BFF]/30 rounded-xl p-8 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#9A6BFF]/5 via-transparent to-[#FF8C42]/5"></div>
              <h3 className="text-2xl font-bold mb-6 text-[#E0E0E0] flex items-center gap-2 relative z-10">
                <Sparkles className="h-6 w-6 text-[#FF8C42]" />
                PERKS & BENEFITS
              </h3>
              <ul className="space-y-3 relative z-10">
                <li className="flex items-start gap-2 text-[#E0E0E0]/90">
                  <div className="w-2 h-2 bg-[#9A6BFF] rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                  Hands-on experience with industry standard software, hardware, and tools
                </li>
                <li className="flex items-start gap-2 text-[#E0E0E0]/90">
                  <div className="w-2 h-2 bg-[#FF8C42] rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  Personal mentorship from experienced seniors, industry professionals, and faculty
                </li>
                <li className="flex items-start gap-2 text-[#E0E0E0]/90">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  Official certification and recognition from the university
                </li>
                <li className="flex items-start gap-2 text-[#E0E0E0]/90">
                  <div className="w-2 h-2 bg-[#1C78C0] rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  Career acceleration through real-world, resume-boosting project work
                </li>
                <li className="flex items-start gap-2 text-[#E0E0E0]/90">
                  <div className="w-2 h-2 bg-[#00E3FF] rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                  Collaborative, fun, and high-energy team culture
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section className="py-24 md:py-32 border-t border-[#FF8C42]/20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-[#FF8C42] to-[#FFD700] bg-clip-text text-transparent">
              HOW TO APPLY
            </h2>
            
            {/* Updated Application Text - Concise Version */}
            <div className="bg-gradient-to-r from-[#1C78C0]/10 via-[#9A6BFF]/10 to-[#FF8C42]/10 border border-[#FFD700]/30 rounded-xl p-6 md:p-8 backdrop-blur-sm mb-12">
              <p className="text-base md:text-lg text-[#E0E0E0]/90 mb-4 leading-relaxed">
                <strong className="text-[#00E3FF]">We welcome enthusiastic candidates!</strong> You don't need 100% qualification match to apply.
              </p>
              <p className="text-base md:text-lg text-[#E0E0E0]/90 leading-relaxed">
                <strong className="text-[#FFD700]">Don't see a perfect match?</strong> Email your resume and Statement of Purpose below. We'll reach out if suitable opportunities arise.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Application Requirements */}
              <div className="bg-[#0B0F1A]/80 border border-[#1C78C0]/30 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-[#1C78C0]">Application Requirements:</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-start gap-2 text-[#E0E0E0]/90">
                    <div className="w-2 h-2 bg-[#1C78C0] rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                    Your updated resume
                  </li>
                  <li className="flex items-start gap-2 text-[#E0E0E0]/90">
                    <div className="w-2 h-2 bg-[#00E3FF] rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    A single-page Statement of Purpose (SOP) explaining why you want to work with us and how you can contribute to the student-built satellite project
                  </li>
                  <li className="flex items-start gap-2 text-[#E0E0E0]/90">
                    <div className="w-2 h-2 bg-[#9A6BFF] rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                    Make sure the SOP reflects your interest, relevant skills, and motivation to be part of this mission.
                  </li>
                </ul>
              </div>

              {/* Important Dates */}
              <div className="bg-[#0B0F1A]/80 border border-[#9A6BFF]/30 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4 text-[#9A6BFF]">Important Dates:</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-2 text-[#E0E0E0]/90">
                    <Calendar className="h-4 w-4 text-[#FF8C42]" />
                    <span><strong className="text-[#FF8C42]">Last Date of Application:</strong> 19-06-2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#E0E0E0]/90">
                    <Clock className="h-4 w-4 text-[#FFD700]" />
                    <span><strong className="text-[#FFD700]">Interview Dates:</strong> 21-06-2025 to 22-06-2025 (Offline/Online)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-[#1C78C0]/10 via-[#9A6BFF]/10 to-[#FF8C42]/10 border border-[#FFD700]/30 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-[#FFD700]">For any queries, please reach out to:</h3>
              <div className="flex justify-center items-center gap-2">
                <Mail className="h-5 w-5 text-[#00E3FF]" />
                <a href="mailto:v4vaayuvega@gmail.com" className="text-base md:text-lg text-[#00E3FF] hover:text-[#FF8C42] font-semibold transition-colors">
                  v4vaayuvega@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <RoleDetailModal
        position={selectedPosition}
        isOpen={!!selectedPosition}
        onClose={() => setSelectedPosition(null)}
        onApply={handleApplyClick}
      />

      <RegistrationModal
        position={selectedPosition}
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
      />
    </div>
  );
};

export default Index;
