import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Shield, Award, Trash2 } from "lucide-react";

const ProfileScreen = () => {
  const { 
    scenarios, 
    completedScenarios, 
    score, 
    getProgressPercentage,
    resetProgress 
  } = useAppContext();

  const totalScenarios = scenarios.length;
  const completedCount = completedScenarios.length;
  const progressPercentage = getProgressPercentage();

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset your progress? This cannot be undone.")) {
      resetProgress();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Profile</h2>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <User className="h-5 w-5 mr-2" /> User Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-[#128C7E] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              G<span className="sr-only">Guest</span>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-medium text-lg">Guest User</h3>
            <p className="text-sm text-gray-500">App Language: English</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Shield className="h-5 w-5 mr-2" /> Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div>
              <div className="text-xl font-bold text-[#128C7E]">{completedCount}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-[#128C7E]">{progressPercentage}%</div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
            <div>
              <div className="text-xl font-bold text-[#128C7E]">{totalScenarios}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-[#128C7E] h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="text-center">
            <Badge className="bg-[#128C7E]">
              <Award className="h-4 w-4 mr-1" /> {score} Points
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <Button 
          variant="destructive" 
          className="flex items-center"
          onClick={handleResetProgress}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Reset Progress
        </Button>
      </div>
    </div>
  );
};

export default ProfileScreen;
