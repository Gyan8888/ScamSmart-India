import { Category, Scenario, Resource, User, Message, Option, Outcome } from "@shared/schema";

export type AppContextType = {
  currentScreen: string;
  language: string;
  user: User | null;
  scenarios: Scenario[];
  categories: Category[];
  resources: Resource[];
  currentScenario: Scenario | null;
  completedScenarios: string[];
  score: number;
  setCurrentScreen: (screen: string) => void;
  setLanguage: (lang: string) => void;
  setUser: (user: User | null) => void;
  setCurrentScenario: (scenario: Scenario | null) => void;
  completeScenario: (scenarioId: number, isCorrect: boolean) => void;
  getProgressPercentage: () => number;
  resetProgress: () => void;
};

export type NavItem = {
  id: string;
  label: string;
  icon: string;
  screen: string;
};

export type DecisionOptionProps = {
  options: Option[];
  onSelect: (option: Option) => void;
};

export type OutcomeModalProps = {
  isOpen: boolean;
  outcome: Outcome | null;
  onClose: () => void;
  onNextScenario: () => void;
  onTryAgain: () => void;
};

export type LanguageOption = {
  code: string;
  name: string;
  nativeName: string;
};

export type LanguageModalProps = {
  isOpen: boolean;
  currentLanguage: string;
  onSelect: (language: string) => void;
  onClose: () => void;
};

export type ScenarioMessageProps = {
  message: Message;
};

export type CategoryCardProps = {
  category: Category;
  scenariosCount: number;
  onSelect: (categoryId: number) => void;
};

export type ResourceItemProps = {
  resource: Resource;
};

export type ProgressStatsProps = {
  completed: number;
  total: number;
  score: number;
};
