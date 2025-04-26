import { useAppContext } from "@/context/AppContext";
import { ExternalLink, Play } from "lucide-react";

const ResourcesScreen = () => {
  const { resources } = useAppContext();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Scam Prevention Resources</h2>

      {/* Common Signs */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="font-bold text-lg mb-2">Common Signs of WhatsApp Scams</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Urgency and pressure to act quickly</li>
          <li>Requests for personal or financial information</li>
          <li>Unknown or suspicious links</li>
          <li>Too-good-to-be-true offers</li>
          <li>Unknown senders or recently changed numbers</li>
          <li>Poor grammar and spelling</li>
          <li>Requests to download unknown applications</li>
        </ul>
      </div>

      {/* Reporting Channels */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="font-bold text-lg mb-2">Official Reporting Channels</h3>
        <div className="space-y-3">
          <div>
            <h4 className="font-medium">National Cyber Crime Reporting Portal</h4>
            <a 
              href="https://cybercrime.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 underline text-sm flex items-center"
            >
              https://cybercrime.gov.in/ <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
          <div>
            <h4 className="font-medium">WhatsApp Reporting</h4>
            <p className="text-sm">Open the chat &gt; Tap Menu &gt; More &gt; Report</p>
          </div>
          <div>
            <h4 className="font-medium">Cyber Crime Helpline</h4>
            <p className="text-sm">Call 1930 to report financial fraud</p>
          </div>
        </div>
      </div>

      {/* Educational Videos */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-bold text-lg mb-2">Educational Videos</h3>
        <div className="space-y-4">
          {resources
            .filter(resource => resource.type === "video")
            .map(video => (
              <div key={video.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                <div className="bg-gray-200 h-36 rounded-lg mb-2 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                      <Play className="h-6 w-6 text-[#128C7E]" />
                    </div>
                  </div>
                </div>
                <h4 className="font-medium">{video.title}</h4>
                <p className="text-sm text-gray-600">{video.source}</p>
              </div>
            ))}
          
          {resources.filter(resource => resource.type === "video").length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No educational videos available at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourcesScreen;
