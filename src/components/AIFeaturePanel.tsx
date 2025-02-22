import React from "react";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Brain, Crop, FileSearch } from "lucide-react";

interface AIFeaturePanelProps {
  onFeatureToggle?: (feature: string, enabled: boolean) => void;
  features?: {
    autoSummarize: boolean;
    reframe: boolean;
    extract: boolean;
  };
}

const AIFeaturePanel = ({
  onFeatureToggle = () => {},
  features = {
    autoSummarize: false,
    reframe: false,
    extract: false,
  },
}: AIFeaturePanelProps) => {
  return (
    <Card className="p-4 sm:p-6 bg-gray-900 w-full sm:w-[380px]">
      <h3 className="text-xl font-semibold mb-6 text-white">AI Features</h3>

      <div className="space-y-6">
        <TooltipProvider>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5 text-blue-400" />
              <Label
                htmlFor="auto-summarize"
                className="text-white cursor-pointer"
              >
                Auto-Summarize
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Switch
                  id="auto-summarize"
                  checked={features.autoSummarize}
                  onCheckedChange={(checked) =>
                    onFeatureToggle("autoSummarize", checked)
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Automatically generate summaries of video content</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crop className="w-5 h-5 text-green-400" />
              <Label htmlFor="reframe" className="text-white cursor-pointer">
                Reframe
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Switch
                  id="reframe"
                  checked={features.reframe}
                  onCheckedChange={(checked) =>
                    onFeatureToggle("reframe", checked)
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Automatically adjust aspect ratio for different platforms</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileSearch className="w-5 h-5 text-purple-400" />
              <Label htmlFor="extract" className="text-white cursor-pointer">
                Extract
              </Label>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Switch
                  id="extract"
                  checked={features.extract}
                  onCheckedChange={(checked) =>
                    onFeatureToggle("extract", checked)
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Extract key moments and highlights</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </Card>
  );
};

export default AIFeaturePanel;
