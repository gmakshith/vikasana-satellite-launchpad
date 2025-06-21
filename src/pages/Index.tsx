
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, Satellite, Earth, Sparkles, Star, Orbit, Zap, Moon, Sun } from "lucide-react";
import RoleDetailModal from "@/components/RoleDetailModal";
import RegistrationModal from "@/components/RegistrationModal";
import ParallaxSection from "@/components/ParallaxSection";
import SpaceBackground from "@/components/SpaceBackground";

const positions = [
  {
    id: "eps",
    title: "Electrical Power System (EPS)",
    shortDescription: "Design and develop satellite power systems and battery management",
    detailedDescription: "As an EPS Engineer, you'll be responsible for designing the heart of our satellite - the power system. You'll work on battery management systems, solar panel configurations, and power distribution networks that keep our satellite operational in the harsh space environment.",
    responsibilities: [
      "Design EPS schematics and PCB layouts for satellite power systems",
      "Develop battery charging/discharging algorithms and thermal management",
      "Create comprehensive satellite power budgets and consumption analysis",
      "Interface with other subsystems to ensure power compatibility",
      "Conduct power system testing and validation procedures"
    ],
    requirements: ["Electrical & Electronics basics", "Satellite subsystems knowledge", "Battery chemistry", "PCB design"],
    preferred: ["LTSpice", "MATLAB", "Power budget analysis", "Altium Designer"],
    icon: "⚡"
  },
  {
    id: "obc",
    title: "Onboard Computer",
    shortDescription: "Develop satellite computing systems and microcontroller interfaces",
    detailedDescription: "Join our OBC team to develop the brain of our satellite. You'll work on embedded systems, real-time operating systems, and the critical software that controls all satellite operations from orbit.",
    responsibilities: [
      "Design and implement embedded software for satellite control systems",
      "Develop telemetry and telecommand handling systems",
      "Create hardware abstraction layers for various satellite components",
      "Implement fault detection and recovery mechanisms",
      "Design communication protocols between satellite subsystems"
    ],
    requirements: ["Digital electronics", "Microcontrollers", "C++ programming", "STM32"],
    preferred: ["RTOS", "Telemetry handling", "PCB design tools", "Hardware debugging"],
    icon: "💻"
  },
  {
    id: "systems",
    title: "Systems Engineer",
    shortDescription: "Coordinate system design and perform mission analysis",
    detailedDescription: "As a Systems Engineer, you'll be the architect of our satellite mission. You'll define requirements, coordinate between different subsystems, and ensure our satellite meets all mission objectives.",
    responsibilities: [
      "Define and maintain system requirements and specifications",
      "Coordinate major design milestones (SRR, PDR, CDR)",
      "Perform mission analysis using industry-standard tools",
      "Conduct trade studies to optimize design decisions",
      "Maintain detailed engineering documentation and interfaces"
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
      "Research and evaluate suitable payloads for mission objectives",
      "Assess technical feasibility within satellite constraints",
      "Design payload interfaces and integration strategies",
      "Coordinate with mission planners for operational requirements",
      "Develop payload testing and calibration procedures"
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
      "Design satellite structure and mechanical systems using CAD tools",
      "Perform structural and thermal finite element analysis",
      "Develop manufacturing drawings with proper GD&T",
      "Design thermal management systems for space environment",
      "Coordinate mechanical testing and validation procedures"
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
      "Develop real-time embedded software for satellite operations",
      "Implement communication protocols and data handling systems",
      "Create automated satellite operation sequences",
      "Develop ground-satellite communication interfaces",
      "Implement safety and fault tolerance mechanisms"
    ],
    requirements: ["C/C++", "RTOS", "Embedded systems", "Communication protocols"],
    preferred: ["Hardware-in-loop testing", "Git", "Python", "MATLAB"],
    icon: "🚀"
  },
  {
    id: "project-manager",
    title: "Project Manager",
    shortDescription: "Coordinate team activities and manage project timelines",
    detailedDescription: "Lead our satellite development project from conception to launch. You'll coordinate between different engineering teams, manage timelines, and ensure we meet our mission milestones.",
    responsibilities: [
      "Coordinate activities between all engineering subsystem teams",
      "Maintain project schedules and track milestone progress",
      "Organize team meetings and facilitate cross-team communication",
      "Interface with external vendors and testing facilities",
      "Manage project risks and develop mitigation strategies"
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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <SpaceBackground />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        {/* Floating Space Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 animate-pulse">
            <Star className="h-8 w-8 text-white opacity-70" />
          </div>
          <div className="absolute top-32 right-20 animate-bounce delay-100">
            <Satellite className="h-10 w-10 text-gray-300" />
          </div>
          <div className="absolute bottom-40 left-20 animate-pulse delay-200">
            <Moon className="h-12 w-12 text-gray-400" />
          </div>
          <div className="absolute top-40 right-40 animate-spin slow">
            <Orbit className="h-16 w-16 text-white opacity-50" />
          </div>
          <div className="absolute bottom-60 right-10 animate-pulse delay-300">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div className="absolute top-60 left-40 animate-bounce delay-400">
            <Sun className="h-8 w-8 text-yellow-400 opacity-80" />
          </div>
        </div>

        <div className="text-center z-10 px-4">
          <div className="flex justify-center items-center mb-8">
            <img 
              src="/lovable-uploads/6925f3f5-f9d2-42ab-83f5-0a601c228f5e.png" 
              alt="Vikasana Logo" 
              className="h-48 w-auto md:h-56 lg:h-64"
            />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            VIKASANA
          </h1>
          <p className="text-2xl md:text-4xl mb-8 text-white">
            Student Satellite Team
          </p>
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Vikasana is the Student Wing of the Research and development Department of Presidency University, 
              committed to nurturing a culture of creativity, problem-solving, and hands-on 
              engineering among students. Founded with the vision to bridge the gap between 
              classroom learning and real-world application, Vikasana provides a collaborative 
              platform for students across disciplines to engage in cutting-edge projects, participate 
              in national and international competitions, and host technical events of global 
              significance.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              From building space rovers and satellite models to automating real-world systems 
              through robotics and software, the club empowers students to innovate with purpose. 
              Through mentorship, interdisciplinary teamwork, and exposure to industry challenges, 
              Vikasana continues to contribute to the university's mission of fostering future-ready 
              innovators and leaders.
            </p>
          </div>
          <div className="flex justify-center space-x-8 mb-12">
            <Rocket className="h-12 w-12 text-white animate-pulse" />
            <Satellite className="h-12 w-12 text-gray-300 animate-bounce" />
            <Earth className="h-12 w-12 text-white animate-pulse" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-black relative z-10 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-8">
            <Sparkles className="h-16 w-16 mx-auto text-white animate-spin" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-white">
            Our Mission
          </h2>
          <div className="max-w-6xl mx-auto space-y-8">
            <p className="text-xl text-gray-300 leading-relaxed">
              We are a passionate and multidisciplinary team of student innovators embarking on an ambitious journey to design, develop, and deploy a fully functional student satellite. Our goal is to participate in ISRO's prestigious student satellite initiative — a platform that empowers academic institutions to develop indigenous satellite missions with potential guidance and support from ISRO.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our mission is to contribute meaningfully to space science and technology through hands-on, end-to-end satellite development — from mission planning and subsystem design to integration, testing, and launch-readiness.
            </p>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 mx-auto max-w-4xl">
              <h3 className="text-2xl font-bold mb-6 text-white">Current Phase & Vision</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-white">Present Status</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      Proposal and early development phase
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      Aligning with ISRO's standards and requirements
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      Seeking technical mentorship and testing facilities
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-white">Target Applications</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      Earth observation systems
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      Communication technologies
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      Scientific experimentation
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      Environmental monitoring
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Positions Section */}
      <ParallaxSection className="py-32 bg-black border-t border-gray-800 relative z-10" speed={0.3}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Open Positions
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose your path in satellite development. Each role offers unique challenges and opportunities to shape the future of space technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {positions.map((position) => (
              <div 
                key={position.id}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-white hover:bg-gray-800 transition-all duration-300 cursor-pointer group transform hover:scale-105"
                onClick={() => handlePositionSelect(position)}
              >
                <div className="text-4xl mb-4">{position.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gray-200 transition-colors">
                  {position.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm">
                  {position.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {position.requirements.slice(0, 3).map((req, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-600">
                      {req}
                    </span>
                  ))}
                </div>
                <Button variant="outline" className="w-full bg-black border-gray-600 text-white hover:bg-white hover:text-black">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </ParallaxSection>

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
