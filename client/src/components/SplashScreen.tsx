import { Shield } from "lucide-react";

const SplashScreen = () => {
  return (
    <div className="absolute inset-0 bg-[#128C7E] flex flex-col items-center justify-center z-50">
      <div className="animate-pulse">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6">
          <Shield className="h-14 w-14 text-[#128C7E]" />
        </div>
      </div>
      <h1 className="text-white text-2xl font-bold mb-2">ScamSmart India</h1>
      <p className="text-white text-lg">Learn to Beat WhatsApp Scams</p>
    </div>
  );
};

export default SplashScreen;
