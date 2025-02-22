import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";

interface CustomizationPanelProps {
  clipQuantity?: number;
  onClipQuantityChange?: (value: number) => void;
  keywords?: string;
  onKeywordsChange?: (value: string) => void;
}

const CustomizationPanel = ({
  clipQuantity = 3,
  onClipQuantityChange = () => {},
  keywords = "highlights, key moments",
  onKeywordsChange = () => {},
}: CustomizationPanelProps) => {
  return (
    <Card className="w-full sm:w-[380px] h-auto sm:h-[320px] p-4 sm:p-6 bg-gray-900 border-gray-800">
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Clip Settings</h3>

          <div className="space-y-2">
            <Label htmlFor="clipQuantity" className="text-sm text-gray-400">
              Number of Clips ({clipQuantity})
            </Label>
            <Slider
              id="clipQuantity"
              min={1}
              max={10}
              step={1}
              value={[clipQuantity]}
              onValueChange={(values) => onClipQuantityChange(values[0])}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords" className="text-sm text-gray-400">
              Content Keywords
            </Label>
            <Input
              id="keywords"
              placeholder="Enter keywords for content targeting"
              value={keywords}
              onChange={(e) => onKeywordsChange(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
            <p className="text-xs text-gray-500">
              Separate keywords with commas to target specific content in your
              clips
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomizationPanel;
