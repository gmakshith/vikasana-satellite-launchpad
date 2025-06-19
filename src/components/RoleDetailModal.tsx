
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rocket, CheckCircle, Star } from "lucide-react";

interface Position {
  id: string;
  title: string;
  detailedDescription: string;
  responsibilities: string[];
  requirements: string[];
  preferred: string[];
  icon: string;
}

interface RoleDetailModalProps {
  position: Position | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

const RoleDetailModal = ({ position, isOpen, onClose, onApply }: RoleDetailModalProps) => {
  if (!position) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{position.icon}</div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">
                {position.title}
              </DialogTitle>
              <DialogDescription className="text-gray-400 mt-2">
                {position.detailedDescription}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Responsibilities */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
              <CheckCircle className="h-5 w-5" />
              Key Responsibilities
            </h3>
            <ul className="space-y-2">
              {position.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  {responsibility}
                </li>
              ))}
            </ul>
          </div>

          {/* Required Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {position.requirements.map((req, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300 border-gray-600">
                  {req}
                </Badge>
              ))}
            </div>
          </div>

          {/* Preferred Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
              <Star className="h-5 w-5" />
              Preferred Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {position.preferred.map((pref, index) => (
                <Badge key={index} variant="outline" className="border-gray-600 text-gray-400">
                  {pref}
                </Badge>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex gap-4 pt-6 border-t border-gray-700">
            <Button
              onClick={onApply}
              className="flex-1 bg-white text-black hover:bg-gray-200"
            >
              <Rocket className="h-4 w-4 mr-2" />
              Apply for this Position
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleDetailModal;
