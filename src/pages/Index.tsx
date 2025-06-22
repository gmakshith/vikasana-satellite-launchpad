
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, Satellite, Earth, Sparkles, Star, Orbit, Zap, Moon, Sun, Mail, Calendar, Clock } from "lucide-react";
import RoleDetailModal from "@/components/RoleDetailModal";
import RegistrationModal from "@/components/RegistrationModal";
import ParallaxSection from "@/components/ParallaxSection";
import SpaceBackground from "@/components/SpaceBackground";

const positions = [
  {
    id: "eps",
    title: "Electrical Power System (EPS)",
    shortDescription: "🛰️ Design and develop satellite power systems and battery management",
    detailedDescription: "As an EPS Engineer, you'll be responsible for designing the heart of our satellite - the power system. You'll work on battery management systems, solar panel configurations, and power distribution networks that keep our satellite operational in the harsh space environment.",
    responsibilities: [
      "Solid foundation in basic Electrical and Electronics",
      "Must be familiar with all satellite subsystems and their interfaces (Power, Control and Data)",
      "Solid foundation of battery chemistry, charging, and discharging principles", 
      "Create EPS schematics and PCB layouts according to system requirements",
      "Make satellite power budgets in accordance with mission requirements"
    ],
    requirements: ["Electrical & Electronics basics", "Satellite subsystems knowledge", "Battery chemistry", "PCB design"],
    preferred: ["LTSpice", "MATLAB", "Power simulation tools", "Power budget analysis"],
    icon: "⚡"
  },
  {
    id: "obc",
    title: "Onboard Computer",
    shortDescription: "🧠 Develop satellite computing systems and microcontroller interfaces",
    detailedDescription: "Join our OBC team to develop the brain of our satellite. You'll work on embedded systems, real-time operating systems, and the critical software that controls all satellite operations from orbit.",
    responsibilities: [
      "Strong understanding of digital electronics and microcontroller fundamentals",
      "Must be familiar with all satellite subsystems and their interfaces",
      "Basics of C++ programming skills",
      "Familiarity with microcontrollers (e.g. STM32)",
      "Learn RTOS, telemetry handling, and satellite software workflows"
    ],
    requirements: ["Digital electronics", "Microcontrollers", "C++ programming", "STM32"],
    preferred: ["RTOS", "Telemetry handling", "PCB design tools", "Altium, KiCad"],
    icon: "💻"
  },
  {
    id: "systems",
    title: "Systems Engineer", 
    shortDescription: "📐 Coordinate system design and perform mission analysis",
    detailedDescription: "As a Systems Engineer, you'll be the architect of our satellite mission. You'll define requirements, coordinate between different subsystems, and ensure our satellite meets all mission objectives.",
    responsibilities: [
      "Work with system engineering concepts (requirements, interfaces, budgets)",
      "Coordinate design milestones (SRR, PDR, CDR, etc.) and ensure subsystem alignment",
      "Perform detailed mission analysis using STK, MATLAB, or Simulink",
      "Conduct detailed trade studies and simulations for optimization",
      "Develop systems engineering documentation and interface control documents"
    ],
    requirements: ["System engineering concepts", "Mission analysis", "Design milestones", "Documentation"],
    preferred: ["STK", "MATLAB/Simulink", "Python", "Trade studies"],
    icon: "🔧"
  },
  {
    id: "payload",
    title: "Payload Engineer",
    shortDescription: "🎯 Research and integrate satellite payloads and instruments", 
    detailedDescription: "Shape the scientific mission of our satellite by researching, selecting, and integrating cutting-edge payloads. You'll work on cameras, sensors, and instruments that will accomplish our mission objectives.",
    responsibilities: [
      "Research payloads suitable for student satellite missions",
      "Examine technical viability with satellite limitations",
      "Evaluate compatibility with satellite constraints (power, size, thermal, data)",
      "Create trade studies considering cost, performance, and mission value",
      "Work with Systems Engineering to define interfaces"
    ],
    requirements: ["Payload research", "Technical feasibility", "Trade studies", "Space systems"],
    preferred: ["Python", "Mission planning", "Sensor integration", "Data analysis"],
    icon: "📡"
  },
  {
    id: "mechanical",
    title: "Mechanical Engineer",
    shortDescription: "⚙️ Design mechanical structures and thermal management systems",
    detailedDescription: "Design the physical structure that will survive launch and operate in space. You'll work on mechanical systems, thermal management, and ensure our satellite can withstand the extreme conditions of space.",
    responsibilities: [
      "Proficiency with CAD software (Fusion 360, SolidWorks, Creo, or CATIA)",
      "Basic knowledge of Finite Element Analysis (FEA)",
      "Familiarity with mechanical drawings, tolerancing, and GD&T principles",
      "Work on high-precision designs under spaceflight constraints",
      "Support fabrication and hands-on integration of hardware"
    ],
    requirements: ["CAD tools", "FEA analysis", "GD&T", "Mechanical drawings"],
    preferred: ["Fusion 360", "SolidWorks", "3D printing", "Thermal management"],
    icon: "⚙️"
  },
  {
    id: "flight-software",
    title: "Flight Software",
    shortDescription: "🧑‍💻 Develop embedded software for satellite operations",
    detailedDescription: "Create the software that will control our satellite in orbit. You'll develop flight software, implement communication protocols, and ensure reliable operation in the space environment.",
    responsibilities: [
      "Proficiency in C or C++ programming",
      "Learn and implement RTOS/OS, telecommand - telemetry handling",
      "Knowledge of embedded systems and microcontrollers",
      "Utilize Ethernet, SPI, I2C, UART communication protocols",
      "Write documentation and use Git for version control"
    ],
    requirements: ["C/C++", "RTOS", "Embedded systems", "Communication protocols"],
    preferred: ["Hardware-in-loop testing", "Git", "Python", "MATLAB"],
    icon: "🚀"
  },
  {
    id: "project-manager",
    title: "Project Manager",
    shortDescription: "🧭 Coordinate team activities and manage project timelines",
    detailedDescription: "Lead our satellite development project from conception to launch. You'll coordinate between different engineering teams, manage timelines, and ensure we meet our mission milestones.",
    responsibilities: [
      "Work with subsystem team leads to monitor developments",
      "Keep senior mentors informed about project status and risks",
      "Arrange and lead multidisciplinary team meetings using Gantt charts",
      "Document meeting minutes, decisions, and actions with accountability",
      "Interact with outside suppliers and testing facilities"
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
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <SpaceBackground />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-white">
        {/* Floating Space Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 animate-pulse">
            <Star className="h-8 w-8 text-gray-700 opacity-70" />
          </div>
          <div className="absolute top-32 right-20 animate-bounce delay-100">
            <Satellite className="h-10 w-10 text-gray-800 opacity-80" />
          </div>
          <div className="absolute bottom-40 left-20 animate-pulse delay-200">
            <Moon className="h-12 w-12 text-gray-600" />
          </div>
          <div className="absolute top-40 right-40 animate-spin-slow">
            <Orbit className="h-16 w-16 text-gray-700 opacity-50" />
          </div>
          <div className="absolute bottom-60 right-10 animate-pulse delay-300">
            <Zap className="h-6 w-6 text-gray-800" />
          </div>
          <div className="absolute top-60 left-40 animate-bounce delay-400">
            <Sun className="h-8 w-8 text-yellow-500 opacity-80" />
          </div>
          <div className="absolute top-1/4 left-1/4 animate-pulse delay-500">
            <Star className="h-4 w-4 text-gray-600 opacity-60" />
          </div>
          <div className="absolute bottom-1/3 right-1/3 animate-bounce delay-600">
            <Star className="h-6 w-6 text-gray-500 opacity-70" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-spin-slow delay-700">
            <Orbit className="h-8 w-8 text-gray-600 opacity-40" />
          </div>
          <div className="absolute bottom-1/4 left-1/3 animate-pulse delay-800">
            <Satellite className="h-6 w-6 text-gray-700 opacity-60" />
          </div>
        </div>

        <div className="text-center z-10 px-4">
          <div className="flex justify-center items-center mb-8">
            <img 
              src="/lovable-uploads/6925f3f5-f9d2-42ab-83f5-0a601c228f5e.png" 
              alt="Vikasana Logo" 
              className="h-64 w-auto md:h-72 lg:h-80"
            />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            VIKASANA
          </h1>
          <p className="text-2xl md:text-4xl mb-8 text-gray-800">
            Student Satellite Team
          </p>
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Vikasana is the Student Wing of the Research and development Department of Presidency University, 
              committed to nurturing a culture of creativity, problem-solving, and hands-on 
              engineering among students. Founded with the vision to bridge the gap between 
              classroom learning and real-world application, Vikasana provides a collaborative 
              platform for students across disciplines to engage in cutting-edge projects, participate 
              in national and international competitions, and host technical events of global 
              significance.
            </p>
          </div>
          <div className="flex justify-center space-x-8 mb-12">
            <Rocket className="h-12 w-12 text-gray-800 animate-pulse" />
            <Satellite className="h-12 w-12 text-gray-700 animate-bounce" />
            <Earth className="h-12 w-12 text-gray-800 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-gray-50 relative z-10 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-8">
            <Sparkles className="h-16 w-16 mx-auto text-gray-800 animate-spin-slow" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-gray-900">
            🚀 Student Satellite Mission Recruitment Drive
          </h2>
          <div className="max-w-6xl mx-auto space-y-8">
            <p className="text-xl text-gray-700 leading-relaxed font-semibold">
              We are forming an ambitious, high-performing student team with one clear goal:
              <span className="block text-2xl font-bold text-gray-900 mt-2">Design, build, and launch a satellite.</span>
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              This is a rare opportunity to experience a real spacecraft mission as an undergraduate — while being mentored by alumni with prior experience in professional space missions (CubeSats, ground stations, and more). Whether you're in 2nd year just beginning your space journey, or in 3rd/4th year looking to apply your skills, this is for students who want to push limits and learn by building.
            </p>
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 mx-auto max-w-2xl">
              <p className="text-lg font-bold text-gray-800">
                Disclaimer: No good grades? No issues!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Positions Section */}
      <section className="py-32 bg-white border-t border-gray-200 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              📢 OPEN POSITIONS
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Choose your path in satellite development. Each role offers unique challenges and opportunities to shape the future of space technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {positions.map((position) => (
              <div 
                key={position.id}
                className="bg-gray-50 border border-gray-300 rounded-xl p-6 hover:border-gray-900 hover:bg-gray-100 transition-all duration-300 cursor-pointer group transform hover:scale-105 hover:shadow-lg"
                onClick={() => handlePositionSelect(position)}
              >
                <div className="text-4xl mb-4">{position.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-gray-800 transition-colors">
                  {position.title}
                </h3>
                <p className="text-gray-700 mb-4 text-sm">
                  {position.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {position.requirements.slice(0, 3).map((req, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded border border-gray-300">
                      {req}
                    </span>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full bg-white border-gray-400 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Benefits Section */}
      <section className="py-32 bg-gray-50 border-t border-gray-200 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* General Requirements */}
            <div className="bg-white border border-gray-300 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <Star className="h-6 w-6" />
                🌟 GENERAL REQUIREMENTS
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                  Solid excellent communication and organizing abilities
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                  Willingness to take responsibility and strive for completion
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                  Space, satellites and learning new things must be of interest to you
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                  Passionate about space tech and system design
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                  Self-driven, open to learning, and capable of taking charge
                </li>
              </ul>
            </div>

            {/* Perks & Benefits */}
            <div className="bg-white border border-gray-300 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                🎁 PERKS & BENEFITS
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                  Hands-on experience with industry standard software, hardware, and tools
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                  Personal mentorship from experienced seniors, industry professionals, and faculty
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                  Official certification and recognition from the university
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                  Career acceleration through real-world, resume-boosting project work
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                  Collaborative, fun, and high-energy team culture
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section className="py-32 bg-white border-t border-gray-200 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              📄 HOW TO APPLY
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              You do not need to meet 100% of the preferred qualifications to be considered. We encourage anyone who meets the basic qualifications and is interested in the role to apply – we are looking for enthusiastic, dedicated people to join our team, and want the opportunity to talk to you!
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Application Requirements */}
              <div className="bg-gray-50 border border-gray-300 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">📌 Application Requirements:</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-start gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                    Your updated resume
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                    A single-page Statement of Purpose (SOP) explaining why you want to work with us
                  </li>
                </ul>
              </div>

              {/* Important Dates */}
              <div className="bg-gray-50 border border-gray-300 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">📅 Important Dates:</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="h-4 w-4" />
                    <span><strong>Last Date:</strong> 19-06-2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="h-4 w-4" />
                    <span><strong>Interviews:</strong> 21-06-2025 to 22-06-2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">📧 For any queries, please reach out to:</h3>
              <div className="flex justify-center items-center gap-2">
                <Mail className="h-5 w-5 text-gray-700" />
                <a href="mailto:v4vaayuvega@gmail.com" className="text-lg text-gray-800 hover:text-gray-900 font-semibold">
                  v4vaayuvega@gmail.com
                </a>
              </div>
            </div>

            <Button 
              onClick={handleApplyClick}
              className="mt-8 bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 text-lg"
            >
              <Rocket className="h-5 w-5 mr-2" />
              Apply Now
            </Button>
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
