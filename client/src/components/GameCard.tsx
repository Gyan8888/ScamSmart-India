import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Scenario } from "@shared/schema";
import { LucideIcon, MessageCircle, Smartphone } from 'lucide-react';
import * as Icons from 'lucide-react';

interface GameCardProps {
  scenario: Scenario;
  onStart: (scenarioId: number) => void;
}

export function GameCard({ scenario, onStart }: GameCardProps) {
  // Dynamically get the icon from Lucide based on iconName
  const IconComponent = (Icons as any)[scenario.iconName] as LucideIcon || MessageCircle;
  
  // Choose background colors based on the scenario ID for visual variety
  const getBgColor = (id: number) => {
    const colors = [
      'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 
      'bg-purple-100', 'bg-pink-100', 'bg-indigo-100',
      'bg-red-100', 'bg-orange-100', 'bg-teal-100', 'bg-cyan-100'
    ];
    return colors[(id - 1) % colors.length];
  };
  
  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className={`${getBgColor(scenario.id)} p-6 flex justify-center items-center`}>
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <Smartphone className="h-16 w-16 text-gray-700" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <IconComponent className="h-8 w-8 text-gray-800" />
          </div>
        </div>
      </div>
      <CardContent className="pb-2 flex-grow text-center">
        <h3 className="text-sm font-medium truncate">{scenario.title}</h3>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onStart(scenario.id)} 
          className="w-full bg-[#128C7E] hover:bg-[#0C6B63]"
        >
          Play
        </Button>
      </CardFooter>
    </Card>
  );
}