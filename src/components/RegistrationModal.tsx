
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Github, Rocket, Linkedin, Upload, X } from "lucide-react";

interface Position {
  id: string;
  title: string;
}

interface RegistrationModalProps {
  position: Position | null;
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({ position, isOpen, onClose }: RegistrationModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rollNumber: "",
    year: "",
    branch: "",
    linkedinUrl: "",
    githubUrl: "",
    tools: [] as string[],
    experience: "",
    motivation: "",
    resume: null as File | null
  });

  const availableTools = [
    "MATLAB", "Python", "C/C++", "JavaScript", "Java", "PCB Design", "CAD Software", 
    "SolidWorks", "Fusion 360", "RTOS", "Embedded Systems", "Git", "Docker", 
    "Altium Designer", "LTSpice", "STK", "MATLAB/Simulink", "Arduino", "Raspberry Pi",
    "Machine Learning", "Data Analysis", "3D Printing", "Hardware Testing"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleToolChange = (tool: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      tools: checked 
        ? [...prev.tools, tool] 
        : prev.tools.filter(t => t !== tool)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, resume: null }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black border-white text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Rocket className="h-6 w-6" />
            Apply for {position?.title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="bg-gray-900 border-gray-700 text-white focus:border-white"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="bg-gray-900 border-gray-700 text-white focus:border-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  className="bg-gray-900 border-gray-700 text-white focus:border-white"
                />
              </div>
              <div>
                <Label htmlFor="rollNumber" className="text-gray-300">Roll Number *</Label>
                <Input
                  id="rollNumber"
                  value={formData.rollNumber}
                  onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                  required
                  className="bg-gray-900 border-gray-700 text-white focus:border-white"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
              Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year" className="text-gray-300">Year of Study *</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  required
                  placeholder="e.g., 2nd Year, 3rd Year"
                  className="bg-gray-900 border-gray-700 text-white focus:border-white"
                />
              </div>
              <div>
                <Label htmlFor="branch" className="text-gray-300">Branch/Major *</Label>
                <Input
                  id="branch"
                  value={formData.branch}
                  onChange={(e) => handleInputChange('branch', e.target.value)}
                  required
                  placeholder="e.g., ECE, CSE, Mechanical"
                  className="bg-gray-900 border-gray-700 text-white focus:border-white"
                />
              </div>
            </div>
          </div>

          {/* Professional Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
              Professional Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedinUrl" className="text-gray-300 flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn Profile URL
                </Label>
                <Input
                  id="linkedinUrl"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedinUrl}
                  onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white focus:border-white"
                />
              </div>
              <div>
                <Label htmlFor="githubUrl" className="text-gray-300 flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub Profile URL
                </Label>
                <Input
                  id="githubUrl"
                  type="url"
                  placeholder="https://github.com/yourusername"
                  value={formData.githubUrl}
                  onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white focus:border-white"
                />
              </div>
            </div>
          </div>

          {/* Tools & Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
              Tools & Technologies You're Familiar With
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableTools.map((tool) => (
                <div key={tool} className="flex items-center space-x-2">
                  <Checkbox
                    id={tool}
                    checked={formData.tools.includes(tool)}
                    onCheckedChange={(checked) => handleToolChange(tool, checked as boolean)}
                    className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
                  />
                  <Label htmlFor={tool} className="text-sm text-gray-300">{tool}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
              Resume
            </h3>
            <div className="space-y-2">
              <Label className="text-gray-300">Upload Resume (PDF only) *</Label>
              {!formData.resume ? (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <label className="cursor-pointer">
                    <span className="text-white hover:text-gray-300">Click to upload your resume</span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>
                  <p className="text-sm text-gray-400 mt-1">PDF files only, max 5MB</p>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-lg p-3">
                  <span className="text-white">{formData.resume.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Experience & Motivation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
              Additional Information
            </h3>
            <div>
              <Label htmlFor="experience" className="text-gray-300">Relevant Experience & Projects</Label>
              <Textarea
                id="experience"
                placeholder="Tell us about your relevant projects, internships, competitions, or experience..."
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="bg-gray-900 border-gray-700 text-white focus:border-white"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="motivation" className="text-gray-300">Why do you want to join this team? *</Label>
              <Textarea
                id="motivation"
                placeholder="Share your motivation, what you hope to contribute, and your passion for space technology..."
                value={formData.motivation}
                onChange={(e) => handleInputChange('motivation', e.target.value)}
                required
                className="bg-gray-900 border-gray-700 text-white focus:border-white"
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-700">
            <Button
              type="submit"
              className="flex-1 bg-white text-black hover:bg-gray-200"
            >
              Submit Application
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-300 hover:bg-gray-900"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
