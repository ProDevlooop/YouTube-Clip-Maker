import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AlertCircle, Link } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface YouTubeInputProps {
  onUrlSubmit?: (url: string) => void;
  error?: string;
  thumbnailUrl?: string;
}

const YouTubeInput = ({
  onUrlSubmit = () => {},
  error = "",
  thumbnailUrl = "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=450&fit=crop",
}: YouTubeInputProps) => {
  const [url, setUrl] = useState("");

  const validateYouTubeUrl = (url: string) => {
    const pattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)(\S*)?$/;
    return pattern.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateYouTubeUrl(url)) {
      onUrlSubmit("");
      return;
    }
    onUrlSubmit(url);
  };

  return (
    <Card className="p-4 sm:p-6 bg-gray-900 border-gray-800 shrink-0 grow-0 w-[800px]">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">
            Enter YouTube URL
          </h2>
          <p className="text-sm text-gray-400">
            Paste the URL of the YouTube video you want to create clips from
          </p>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="bg-gray-800 border-gray-700 text-white pr-10 placeholder:text-gray-500"
            />
            <Link className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white"
          >
            Load Video
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {thumbnailUrl && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <img
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="w-[800px] h-[800px] object-cover rounded-lg"
            />
          </div>
        )}
      </form>
    </Card>
  );
};

export default YouTubeInput;
