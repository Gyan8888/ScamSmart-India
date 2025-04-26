import { useEffect } from "react";
import SplashScreen from "./SplashScreen";
import { useAppContext } from "@/context/AppContext";
import HomeScreen from "@/pages/HomeScreen";
import ScenarioScreen from "@/pages/ScenarioScreen";

const AppContainer = () => {
  const { currentScreen, setCurrentScreen } = useAppContext();

  useEffect(() => {
    // Simulate splash screen timing
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        setCurrentScreen("home");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, setCurrentScreen]);

  if (currentScreen === "splash") {
    return <SplashScreen />;
  }

  return (
    <div className="relative h-screen max-w-md mx-auto bg-white overflow-hidden">
      <header className="bg-[#075E54] text-white p-3 flex items-center justify-center">
        <h1 className="font-bold text-xl">ScamSmart India</h1>
      </header>
      
      <div className="h-[calc(100%-56px)] overflow-y-auto">
        {currentScreen === "home" && <HomeScreen />}
        {currentScreen === "scenario" && <ScenarioScreen />}
      </div>
    </div>
  );
};

export default AppContainer;
