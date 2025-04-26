import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { ArrowLeft, ChevronDown } from "lucide-react";
import DecisionOptions from "@/components/DecisionOptions";
import OutcomeModal from "@/components/OutcomeModal";
import { Message, Option, Outcome } from "@shared/schema";

const ScenarioScreen = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [reachedLastMessage, setReachedLastMessage] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageObserverRef = useRef<HTMLDivElement>(null);
  
  const { 
    currentScenario, 
    setCurrentScreen, 
    setCurrentScenario,
    completeScenario
  } = useAppContext();

  // Function to determine profile image based on contact name
  const getProfileImage = (contactName: string) => {
    // Generate a consistent profile image for each contact
    const nameHash = contactName.charCodeAt(0) % 10;
    return `/profile-images/avatar${nameHash + 1}.svg`;
  };
  
  // Reset state when scenario changes
  useEffect(() => {
    setShowOptions(false);
    setReachedLastMessage(false);
    
    // Give a little time for the DOM to update
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = 0;
      }
    }, 100);
  }, [currentScenario]);

  // Setup intersection observer to detect when user reaches the last message
  useEffect(() => {
    if (!lastMessageObserverRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the last message is visible for at least 1 second, show options
        if (entry.isIntersecting && !reachedLastMessage) {
          const timer = setTimeout(() => {
            setReachedLastMessage(true);
            setShowOptions(true);
          }, 1000);
          
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.8 } // 80% of the element must be visible
    );
    
    if (lastMessageObserverRef.current) {
      observer.observe(lastMessageObserverRef.current);
    }
    
    return () => observer.disconnect();
  }, [currentScenario, reachedLastMessage]);

  const handleGoBack = () => {
    setCurrentScreen("home");
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    
    // Find the corresponding outcome
    if (currentScenario) {
      const scenarioOutcomes = currentScenario.outcomes as unknown as Outcome[];
      const matchingOutcome = scenarioOutcomes.find(
        (o) => o.isCorrect === option.isCorrect
      );
      
      if (matchingOutcome) {
        setOutcome(matchingOutcome);
        setShowOutcome(true);
        
        // Update user progress
        completeScenario(currentScenario.id, option.isCorrect);
      }
    }
  };

  const handleTryAgain = () => {
    setShowOutcome(false);
    setSelectedOption(null);
  };

  const handleNextScenario = () => {
    // Go back to home screen
    setShowOutcome(false);
    setSelectedOption(null);
    setCurrentScreen("home");
  };

  // Auto-scroll to the next message to guide the user
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Early return if no scenario selected
  if (!currentScenario) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>No scenario selected. Please go back and select a scenario.</p>
      </div>
    );
  }

  const messages = currentScenario.messages as unknown as Message[];
  const options = currentScenario.options as unknown as Option[];
  const profileImage = getProfileImage(currentScenario.contactName);

  return (
    <div className="h-full flex flex-col">
      {/* WhatsApp Header */}
      <div className="bg-[#075E54] text-white p-3 flex items-center">
        <button onClick={handleGoBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center">
          <img 
            src={profileImage} 
            alt={currentScenario.contactName} 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <div className="font-medium">{currentScenario.contactName}</div>
          </div>
        </div>
      </div>

      {/* WhatsApp Chat Area */}
      <div 
        ref={chatContainerRef} 
        className="bg-[#ECE5DD] flex-grow overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-gray-400"
      >
        <div className="text-center text-xs text-gray-500 mb-4">TODAY</div>

        {/* Messages */}
        {messages.map((message, index) => {
          const isLastMessage = index === messages.length - 1;
          
          if (message.sender === "system") {
            return null; // Skip system messages
          } else if (message.sender === "contact") {
            return (
              <div 
                key={index} 
                className="flex mb-4"
                ref={isLastMessage ? lastMessageObserverRef : undefined}
              >
                <img 
                  src={profileImage} 
                  alt={currentScenario.contactName} 
                  className="w-8 h-8 rounded-full mr-2 self-end"
                />
                <div className="bg-white rounded-lg p-3 max-w-[75%] shadow">
                  <p className="text-sm mb-1">{message.content}</p>
                  {message.attachment && (
                    <p className="text-sm mb-1">
                      <span className="text-gray-500 mr-2">📎</span>
                      {message.attachment.name}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 text-right">{message.timestamp || "12:00 PM"}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div 
                key={index} 
                className="flex justify-end mb-4"
                ref={isLastMessage ? lastMessageObserverRef : undefined}
              >
                <div className="bg-[#DCF8C6] rounded-lg p-3 max-w-[75%] shadow">
                  <p className="text-sm mb-1">{message.content}</p>
                  <p className="text-xs text-gray-500 text-right">{message.timestamp || "12:00 PM"}</p>
                </div>
              </div>
            );
          }
        })}
        
        {/* Scroll indicator (shown only if user hasn't reached the bottom) */}
        {!reachedLastMessage && (
          <div 
            className="sticky bottom-2 w-full flex justify-center"
            onClick={scrollToBottom}
          >
            <div className="bg-white rounded-full p-2 shadow-md cursor-pointer animate-bounce">
              <ChevronDown className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        )}
      </div>

      {/* Decision Options */}
      {showOptions && !selectedOption && (
        <DecisionOptions options={options} onSelect={handleOptionSelect} />
      )}

      {/* Outcome Modal */}
      <OutcomeModal
        isOpen={showOutcome}
        outcome={outcome}
        onClose={() => setShowOutcome(false)}
        onTryAgain={handleTryAgain}
        onNextScenario={handleNextScenario}
      />
    </div>
  );
};

export default ScenarioScreen;
