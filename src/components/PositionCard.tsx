
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PositionCardProps {
  position: {
    id: string;
    title: string;
    description: string;
    requirements: string[];
    preferred?: string[];
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const PositionCard = ({ position, isSelected, onSelect }: PositionCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
        isSelected ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={() => onSelect(position.id)}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {position.title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {position.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Required Skills:</h4>
            <div className="flex flex-wrap gap-1">
              {position.requirements.map((req, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {req}
                </Badge>
              ))}
            </div>
          </div>
          {position.preferred && position.preferred.length > 0 && (
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">Preferred:</h4>
              <div className="flex flex-wrap gap-1">
                {position.preferred.map((pref, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {pref}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PositionCard;
