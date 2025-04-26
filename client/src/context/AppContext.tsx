import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { AppContextType } from "@/lib/types";
import { Scenario, Category, Resource, User } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentScreen, setCurrentScreen] = useState<string>("splash");
  const [language, setLanguage] = useState<string>("en");
  const [user, setUser] = useState<User | null>(null);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);

  // Fetch scenarios from the backend
  const { data: scenarios = [] } = useQuery<Scenario[]>({
    queryKey: ["/api/scenarios"],
  });

  // Fetch categories from the backend
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Fetch resources from the backend
  const { data: resources = [] } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  // Load user data if available
  useEffect(() => {
    const storedProgress = localStorage.getItem("scamShieldProgress");
    if (storedProgress) {
      const { completed, userScore } = JSON.parse(storedProgress);
      setCompletedScenarios(completed || []);
      setScore(userScore || 0);
    }
  }, []);

  // Save progress when it changes
  useEffect(() => {
    localStorage.setItem(
      "scamShieldProgress",
      JSON.stringify({
        completed: completedScenarios,
        userScore: score,
      })
    );
  }, [completedScenarios, score]);

  const completeScenario = (scenarioId: number, isCorrect: boolean) => {
    if (!completedScenarios.includes(String(scenarioId))) {
      setCompletedScenarios((prev) => [...prev, String(scenarioId)]);
      if (isCorrect) {
        setScore((prev) => prev + 20); // 20 points per correct answer
      }
    }
  };

  const getProgressPercentage = () => {
    if (scenarios.length === 0) return 0;
    return Math.round((completedScenarios.length / scenarios.length) * 100);
  };

  const resetProgress = () => {
    setCompletedScenarios([]);
    setScore(0);
    localStorage.removeItem("scamShieldProgress");
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        language,
        user,
        scenarios,
        categories,
        resources,
        currentScenario,
        completedScenarios,
        score,
        setCurrentScreen,
        setLanguage,
        setUser,
        setCurrentScenario,
        completeScenario,
        getProgressPercentage,
        resetProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
