import React, { useState, useEffect } from "react";
import YouTubeInput from "./YouTubeInput";
import ControlPanel from "./ControlPanel";

const Home = () => {
  // Initialize theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [clips, setClips] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");
  const [features, setFeatures] = useState({
    autoSummarize: false,
    reframe: false,
    extract: false,
  });
  const [clipQuantity, setClipQuantity] = useState(3);
  const [keywords, setKeywords] = useState("highlights, key moments");

  // Set initial theme class on mount
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const extractVideoId = (url: string) => {
    const pattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(pattern);
    return match ? match[1] : null;
  };

  const handleUrlSubmit = (url: string) => {
    if (!url) {
      setError("Please enter a valid YouTube URL");
      return;
    }
    setError("");
    setVideoUrl(url);
  };

  const handleFeatureToggle = (feature: string, enabled: boolean) => {
    setFeatures((prev) => ({
      ...prev,
      [feature]: enabled,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-8 sm:py-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-4">
            YouTube Clip Maker
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Transform long YouTube videos into bite-sized, social media-ready
            clips with AI-powered features and intuitive editing controls.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <YouTubeInput
            onUrlSubmit={handleUrlSubmit}
            error={error}
            thumbnailUrl={
              videoUrl
                ? `https://img.youtube.com/vi/${extractVideoId(videoUrl)}/maxresdefault.jpg`
                : undefined
            }
          />

          <ControlPanel
            features={features}
            onFeatureToggle={handleFeatureToggle}
            clipQuantity={clipQuantity}
            onClipQuantityChange={setClipQuantity}
            keywords={keywords}
            onKeywordsChange={setKeywords}
          />

          {videoUrl && (
            <div className="w-full max-w-[800px] flex justify-center gap-3 sm:gap-4 flex-wrap px-2">
              <button
                className="px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
                onClick={() => {
                  setIsProcessing(true);
                  // Simulate processing
                  setTimeout(() => {
                    const generatedClips = Array.from(
                      { length: clipQuantity },
                      (_, i) => `clip${i + 1}.mp4`,
                    );
                    setClips(generatedClips);
                    setIsProcessing(false);
                  }, 2000);
                }}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Generate Clips"}
              </button>

              {clips.length > 0 && (
                <button
                  className="px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 transform hover:scale-105"
                  onClick={() => {
                    // Create sample video data (in a real app, this would be actual video data)
                    clips.forEach((clipName, index) => {
                      const link = document.createElement("a");
                      // Using a sample video URL - in production, this would be your actual video URL
                      link.href = `https://storage.googleapis.com/sample-videos/sample-${index + 1}.mp4`;
                      link.download = clipName;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    });
                  }}
                >
                  Export Clips
                </button>
              )}

              <button
                className="px-4 sm:px-8 py-3 sm:py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold text-base sm:text-lg transition-all duration-200"
                onClick={handleThemeChange}
              >
                Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
