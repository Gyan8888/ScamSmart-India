import { Home, Grid, BookOpen, User } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { NavItem } from "@/lib/types";

const BottomNav = () => {
  const { currentScreen, setCurrentScreen } = useAppContext();

  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: "home", screen: "home" },
    { id: "categories", label: "Categories", icon: "grid", screen: "categories" },
    { id: "resources", label: "Resources", icon: "book", screen: "resources" },
    { id: "profile", label: "Profile", icon: "user", screen: "profile" },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <Home className="h-5 w-5" />;
      case "grid":
        return <Grid className="h-5 w-5" />;
      case "book":
        return <BookOpen className="h-5 w-5" />;
      case "user":
        return <User className="h-5 w-5" />;
      default:
        return <Home className="h-5 w-5" />;
    }
  };

  return (
    <nav className="bg-white border-t flex items-center justify-around p-2">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`flex flex-col items-center py-1 px-3 ${
            currentScreen === item.screen ? "text-[#128C7E]" : "text-gray-500"
          }`}
          onClick={() => setCurrentScreen(item.screen)}
        >
          {getIcon(item.icon)}
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
