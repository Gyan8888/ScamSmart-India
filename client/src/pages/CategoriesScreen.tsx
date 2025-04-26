import { useAppContext } from "@/context/AppContext";

const CategoriesScreen = () => {
  const { categories, scenarios, setCurrentScenario, setCurrentScreen } = useAppContext();

  const handleCategorySelect = (categoryId: number) => {
    const categoryScenarios = scenarios.filter(
      (scenario) => scenario.categoryId === categoryId
    );
    if (categoryScenarios.length > 0) {
      setCurrentScenario(categoryScenarios[0]);
      setCurrentScreen("scenario");
    }
  };

  // Count scenarios per category
  const getScenariosCountByCategory = (categoryId: number) => {
    return scenarios.filter((scenario) => scenario.categoryId === categoryId).length;
  };

  // Get risk level text and color
  const getRiskLevelDisplay = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return { text: "High Risk", color: "text-[#FF3B30]" };
      case "medium":
        return { text: "Medium Risk", color: "text-[#FF9500]" };
      case "low":
        return { text: "Low Risk", color: "text-[#34C759]" };
      default:
        return { text: "Unknown Risk", color: "text-gray-500" };
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Scam Categories</h2>
      
      {categories.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <p className="text-gray-500">No categories available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category) => {
            const scenariosCount = getScenariosCountByCategory(category.id);
            const risk = getRiskLevelDisplay(category.riskLevel);
            
            return (
              <div 
                key={category.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="h-32 bg-gray-200 relative">
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2">
                    <h3 className="text-white font-bold">{category.name}</h3>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                  <div className="flex justify-between text-sm">
                    <span>{scenariosCount} scenario{scenariosCount !== 1 ? 's' : ''}</span>
                    <span className={`font-medium ${risk.color}`}>{risk.text}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoriesScreen;
