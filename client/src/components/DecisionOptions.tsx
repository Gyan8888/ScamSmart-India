import { DecisionOptionProps } from "@/lib/types";

const DecisionOptions = ({ options, onSelect }: DecisionOptionProps) => {
  return (
    <div className="bg-white p-3 shadow-lg border-t">
      <div className="text-center mb-3">
        <h3 className="font-bold">What would you do?</h3>
      </div>
      <div className="space-y-2">
        {options.map((option, index) => {
          const letters = ["A", "B", "C", "D"];
          return (
            <button
              key={option.id}
              className="w-full bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-left transition"
              onClick={() => onSelect(option)}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                  <span className="text-xs">{letters[index]}</span>
                </div>
                <span>{option.text}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DecisionOptions;
