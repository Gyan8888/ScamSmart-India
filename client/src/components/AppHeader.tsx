import { Globe, Info } from "lucide-react";

interface AppHeaderProps {
  onLanguageClick: () => void;
}

const AppHeader = ({ onLanguageClick }: AppHeaderProps) => {
  return (
    <header className="bg-[#075E54] text-white p-3 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="font-bold text-xl">ScamSmart India Games</h1>
      </div>
      <div className="flex space-x-4">
        <button 
          className="flex items-center" 
          onClick={onLanguageClick}
        >
          <Globe className="h-5 w-5 mr-1" />
          <span>EN</span>
        </button>
        <button>
          <Info className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
