import { AlertTriangle, CheckCircle, Home, RotateCcw } from "lucide-react";
import { OutcomeModalProps } from "@/lib/types";
import { Button } from "./ui/button";

const OutcomeModal = ({
  isOpen,
  outcome,
  onClose,
  onNextScenario,
  onTryAgain,
}: OutcomeModalProps) => {
  if (!isOpen || !outcome) return null;

  // Select just 2 key points from explanation to show
  const keyPoints = outcome.explanation.slice(0, 2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40">
      <div className="bg-white w-11/12 max-w-md rounded-xl overflow-hidden shadow-xl">
        <div
          className={`p-4 text-white ${
            outcome.isCorrect ? "bg-[#34C759]" : "bg-[#FF3B30]"
          }`}
        >
          <div className="flex items-center">
            {outcome.isCorrect ? (
              <CheckCircle className="h-7 w-7 mr-3 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-7 w-7 mr-3 flex-shrink-0" />
            )}
            <h3 className="font-bold text-lg">
              {outcome.isCorrect ? "Safe Choice!" : "Unsafe Choice!"}
            </h3>
          </div>
        </div>
        
        <div className="p-4">
          <p className="mb-3 text-sm">{outcome.description}</p>
          
          <ul className="list-disc pl-5 mb-4 text-sm">
            {keyPoints.map((item, index) => (
              <li key={index} className="text-gray-800 mb-1">{item}</li>
            ))}
          </ul>
          
          <div className="bg-blue-50 p-3 rounded-lg mb-4 border-l-4 border-blue-500">
            <p className="text-blue-900 text-sm">
              <span className="font-bold">Please note: </span>
              {outcome.advice.split(".")[0]}.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {!outcome.isCorrect && (
              <Button
                variant="outline"
                onClick={onTryAgain}
                className="flex items-center justify-center gap-2 h-11 rounded-lg border-2 border-gray-300"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Try Again</span>
              </Button>
            )}
            <Button
              onClick={onNextScenario}
              className={`flex items-center justify-center gap-2 h-11 rounded-lg bg-[#128C7E] hover:bg-[#0C6B63] ${outcome.isCorrect ? "col-span-2" : ""}`}
            >
              <Home className="h-4 w-4" />
              <span>Back to Games</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutcomeModal;
