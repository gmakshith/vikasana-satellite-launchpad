
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Rocket, Mail, Send } from "lucide-react";
import PositionCard from "./PositionCard";

const positions = [
  {
    id: "eps",
    title: "Electrical Power System (EPS)",
    description: "Design and develop satellite power systems and battery management",
    requirements: ["Electrical & Electronics basics", "Satellite subsystems knowledge", "Battery chemistry", "PCB design"],
    preferred: ["LTSpice", "MATLAB", "Power budget analysis"]
  },
  {
    id: "obc",
    title: "Onboard Computer",
    description: "Develop satellite computing systems and microcontroller interfaces",
    requirements: ["Digital electronics", "Microcontrollers", "C++ programming", "STM32"],
    preferred: ["RTOS", "Telemetry handling", "PCB design tools"]
  },
  {
    id: "systems",
    title: "Systems Engineer",
    description: "Coordinate system design and perform mission analysis",
    requirements: ["System engineering concepts", "Mission analysis", "Design milestones", "Documentation"],
    preferred: ["STK", "MATLAB/Simulink", "Python", "Trade studies"]
  },
  {
    id: "payload",
    title: "Payload Engineer",
    description: "Research and integrate satellite payloads and instruments",
    requirements: ["Payload research", "Technical feasibility", "Trade studies", "Space systems"],
    preferred: ["Python", "Mission planning", "Sensor integration"]
  },
  {
    id: "mechanical",
    title: "Mechanical Engineer",
    description: "Design mechanical structures and thermal management systems",
    requirements: ["CAD tools", "FEA analysis", "GD&T", "Mechanical drawings"],
    preferred: ["Fusion 360", "SolidWorks", "3D printing", "Thermal management"]
  },
  {
    id: "flight-software",
    title: "Flight Software",
    description: "Develop embedded software for satellite operations",
    requirements: ["C/C++", "RTOS", "Embedded systems", "Communication protocols"],
    preferred: ["Hardware-in-loop testing", "Git", "Python", "MATLAB"]
  },
  {
    id: "project-manager",
    title: "Project Manager",
    description: "Coordinate team activities and manage project timelines",
    requirements: ["Project coordination", "Progress tracking", "Meeting organization", "Documentation"],
    preferred: ["Gantt charts", "Vendor coordination", "Risk management"]
  }
];

const RegistrationForm = () => {
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    university: "",
    year: "",
    branch: "",
    cgpa: "",
    experience: "",
    motivation: "",
    availability: "",
    portfolio: "",
    skills: [] as string[],
    agreeTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSkillChange = (skill: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      skills: checked 
        ? [...prev.skills, skill] 
        : prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPosition) {
      toast({
        title: "Position Required",
        description: "Please select a position to apply for",
        variant: "destructive"
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    console.log("Form submission data:", { ...formData, position: selectedPosition });

    try {
      // Here you would integrate with Google Sheets API
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application Submitted!",
        description: "Your registration has been received. Check your email for confirmation.",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        university: "",
        year: "",
        branch: "",
        cgpa: "",
        experience: "",
        motivation: "",
        availability: "",
        portfolio: "",
        skills: [],
        agreeTerms: false
      });
      setSelectedPosition("");

    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const commonSkills = [
    "MATLAB", "Python", "C/C++", "PCB Design", "CAD Software", "RTOS", 
    "Embedded Systems", "Git", "Project Management", "Technical Documentation",
    "Hardware Testing", "Software Development", "Data Analysis"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Rocket className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
            Join Vikasana Student Satellite Team
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Apply for exciting positions in our satellite development program
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Available Positions</CardTitle>
            <CardDescription>Select the position you'd like to apply for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {positions.map((position) => (
                <PositionCard
                  key={position.id}
                  position={position}
                  isSelected={selectedPosition === position.id}
                  onSelect={setSelectedPosition}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedPosition && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Application Form
              </CardTitle>
              <CardDescription>
                Please fill in your details for the {positions.find(p => p.id === selectedPosition)?.title} position
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      placeholder="your.email@university.edu"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="university">University/College *</Label>
                    <Input
                      id="university"
                      value={formData.university}
                      onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                      required
                      placeholder="Your institution name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Academic Year *</Label>
                    <Select value={formData.year} onValueChange={(value) => setFormData(prev => ({ ...prev, year: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st">1st Year</SelectItem>
                        <SelectItem value="2nd">2nd Year</SelectItem>
                        <SelectItem value="3rd">3rd Year</SelectItem>
                        <SelectItem value="4th">4th Year</SelectItem>
                        <SelectItem value="postgrad">Post Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch/Major *</Label>
                    <Input
                      id="branch"
                      value={formData.branch}
                      onChange={(e) => setFormData(prev => ({ ...prev, branch: e.target.value }))}
                      required
                      placeholder="e.g., ECE, CSE, Mechanical"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cgpa">CGPA/Percentage</Label>
                    <Input
                      id="cgpa"
                      value={formData.cgpa}
                      onChange={(e) => setFormData(prev => ({ ...prev, cgpa: e.target.value }))}
                      placeholder="8.5 or 85%"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Technical Skills</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {commonSkills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={formData.skills.includes(skill)}
                          onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                        />
                        <Label htmlFor={skill} className="text-sm">{skill}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Relevant Experience/Projects</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="Describe any relevant projects, internships, or experience..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivation">Why do you want to join the satellite team? *</Label>
                  <Textarea
                    id="motivation"
                    value={formData.motivation}
                    onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                    required
                    placeholder="Tell us about your passion for space technology and what you hope to contribute..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="availability">Weekly Availability (hours)</Label>
                    <Input
                      id="availability"
                      value={formData.availability}
                      onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                      placeholder="e.g., 10-15 hours per week"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio/LinkedIn URL</Label>
                    <Input
                      id="portfolio"
                      value={formData.portfolio}
                      onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions and understand that this is a commitment to the satellite project *
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Submitting...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
