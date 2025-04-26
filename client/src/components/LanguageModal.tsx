import { LanguageModalProps, LanguageOption } from "@/lib/types";
import { Button } from "@/components/ui/button";

const LanguageModal = ({
  isOpen,
  currentLanguage,
  onSelect,
  onClose,
}: LanguageModalProps) => {
  if (!isOpen) return null;

  const languages: LanguageOption[] = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు" },
    { code: "mr", name: "Marathi", nativeName: "मराठी" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white w-11/12 max-w-md rounded-xl overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-bold text-lg">Select Language | भाषा चुनें</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`p-3 border rounded-lg text-center hover:bg-gray-50 transition ${
                  currentLanguage === lang.code ? "border-[#128C7E] bg-gray-50" : ""
                }`}
                onClick={() => onSelect(lang.code)}
              >
                <div className="font-medium">{lang.nativeName}</div>
                <div className="text-xs text-gray-500">{lang.name}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="p-3 border-t">
          <Button
            variant="secondary"
            className="w-full"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
