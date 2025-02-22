import React from "react";
import AIFeaturePanel from "./AIFeaturePanel";
import CustomizationPanel from "./CustomizationPanel";

interface ControlPanelProps {
  onFeatureToggle?: (feature: string, enabled: boolean) => void;
  onClipQuantityChange?: (value: number) => void;
  onKeywordsChange?: (value: string) => void;
  features?: {
    autoSummarize: boolean;
    reframe: boolean;
    extract: boolean;
  };
  clipQuantity?: number;
  keywords?: string;
}

const ControlPanel = ({
  onFeatureToggle = () => {},
  onClipQuantityChange = () => {},
  onKeywordsChange = () => {},
  features = {
    autoSummarize: false,
    reframe: false,
    extract: false,
  },
  clipQuantity = 3,
  keywords = "highlights, key moments",
}: ControlPanelProps) => {
  return (
    <div className="w-[800px] bg-gray-900 p-4 sm:p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-8">Control Panel</h2>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-between">
        <AIFeaturePanel features={features} onFeatureToggle={onFeatureToggle} />
        <CustomizationPanel
          clipQuantity={clipQuantity}
          keywords={keywords}
          onClipQuantityChange={onClipQuantityChange}
          onKeywordsChange={onKeywordsChange}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
