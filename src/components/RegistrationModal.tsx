
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Github, Rocket, Linkedin, Link, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rollNumber: "",
    year: "",
    branch: "",
    selectedRole: "",
    linkedinUrl: "",
    githubUrl: "",
    tools: [] as string[],
    experience: "",
    motivation: "",
    resumeUrl: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const availableRoles = [
    "Electrical Power System",
    "Onboard Computer", 
    "Systems Engineer",
    "Payload Engineer",
    "Mechanical Engineer",
    "Flight Software",
    "Communication System",
    "Project Manager"
  ];

  const availableTools = [
    "MATLAB", "Python", "C/C++", "JavaScript", "Java", "PCB Design", 
    "CAD Software", "SolidWorks", "Fusion 360", "RTOS", "Embedded Systems", 
    "Git", "Docker", "Altium Designer", "LTSpice", "STK", "MATLAB/Simulink", 
    "Arduino", "Raspberry Pi", "Machine Learning", "Data Analysis", "3D Printing", 
    "Hardware Testing"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        rollNumber: formData.rollNumber,
        yearOfStudy: formData.year,
        branch: formData.branch,
        role: formData.selectedRole,
        linkedin: formData.linkedinUrl,
        github: formData.githubUrl,
        tools: formData.tools,
        resumeUrl: formData.resumeUrl,
        experience: formData.experience,
        whyJoin: formData.motivation
      };

      console.log("Submitting form data:", payload);

      const formBody = new URLSearchParams();
      for (const [key, value] of Object.entries(payload)) {
        if (Array.isArray(value)) {
          value.forEach(v => formBody.append(key, v));  // send array as repeated keys
        } else {
          formBody.append(key, value);
        }
      }

      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbzdMdWueDJ2oY5ZmGfoxP7mZHGUhIC6qKsI1-zspSg9P0I-qkVzXqWQCd_WDKM2tyye/exec',
        {
          method: 'POST',
          body: formBody
        }  
      );

      console.log("Form submitted successfully");
      
      setSubmitSuccess(true);
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll review your application and get back to you soon.",
      });

      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          rollNumber: "",
          year: "",
          branch: "",
          selectedRole: "",
          linkedinUrl: "",
          githubUrl: "",
          tools: [],
          experience: "",
          motivation: "",
          resumeUrl: ""
        });
      }, 2000);

    } catch (error) {
      console.error("Error submitting form:", error);
      
      toast({
        title: "Submission Error",
        description: "There was an issue submitting your application. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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

  if (submitSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-black border-white text-white text-center">
          <div className="py-8">
            <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-400" />
            <h2 className="text-2xl font-bold mb-2 text-white">Application Submitted!</h2>
            <p className="text-gray-300">Thank you for your interest in joining Vikasana. We'll review your application and get back to you soon.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black border-white text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Rocket className="h-6 w-6" />
            Apply for Satellite Team Position
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

          {/* Role Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
              Role Selection
            </h3>
            <div>
              <Label htmlFor="selectedRole" className="text-gray-300">Select the role you are applying for *</Label>
              <Select value={formData.selectedRole} onValueChange={(value) => handleInputChange('selectedRole', value)}>
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white focus:border-white">
                  <SelectValue placeholder="Choose a role" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {availableRoles.map((role) => (
                    <SelectItem key={role} value={role} className="text-white hover:bg-gray-800">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

          {/* Resume URL */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
              Resume
            </h3>
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <Link className="h-4 w-4" />
                Resume URL *
              </Label>
              <Input
                type="url"
                placeholder="https://drive.google.com/file/d/your-resume-link"
                value={formData.resumeUrl}
                onChange={(e) => handleInputChange('resumeUrl', e.target.value)}
                required
                className="bg-gray-900 border-gray-700 text-white focus:border-white"
              />
              <p className="text-sm text-gray-400">
                <strong>Important:</strong> Please ensure the URL you provide is publicly accessible. 
                For Google Drive links, make sure to set sharing permissions to "Anyone with the link can view". 
                We need to be able to access your resume to review your application.
              </p>
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
              disabled={isSubmitting}
              className="flex-1 bg-white text-black hover:bg-gray-200 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
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
