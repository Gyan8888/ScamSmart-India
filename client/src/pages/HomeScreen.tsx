import { useAppContext } from "@/context/AppContext";
import { ShieldAlert } from "lucide-react";
import { GameCard } from "@/components/GameCard";

const HomeScreen = () => {
  const { 
    scenarios, 
    setCurrentScreen, 
    setCurrentScenario 
  } = useAppContext();

  const handleStartGame = (scenarioId: number) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      setCurrentScenario(scenario);
      setCurrentScreen("scenario");
    }
  };

  return (
    <div className="p-4 pb-20">
      {/* Header */}
      <div className="text-center py-6">
        <div className="flex items-center justify-center mb-2">
          <ShieldAlert className="h-8 w-8 text-[#128C7E] mr-2" />
          <h1 className="text-3xl font-bold text-[#128C7E]">ScamSmart India</h1>
        </div>
        <p className="text-gray-600 max-w-lg mx-auto">
          Learn to identify and avoid WhatsApp scams through interactive scenarios
        </p>
      </div>

      {/* Games Horizontal Scrollable Area */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="bg-[#128C7E] text-white w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
            10
          </span>
          Scam Scenarios
        </h2>
        
        <div className="relative">
          <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <div className="flex space-x-4 px-1">
              {scenarios.map((scenario) => (
                <div key={scenario.id} className="w-44 flex-shrink-0">
                  <GameCard
                    scenario={scenario}
                    onStart={handleStartGame}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* App Description */}
      <div className="bg-white rounded-lg p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-2">About ScamSmart India</h3>
        <p className="text-sm text-gray-700">
          This app helps you learn to identify and avoid WhatsApp scams through interactive scenarios. 
          Each scenario simulates a real WhatsApp conversation where you'll need to decide how to respond.
          Make the right choices to stay safe from scammers!
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;
