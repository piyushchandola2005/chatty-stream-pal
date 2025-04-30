
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Image, FileText } from "lucide-react";

export interface ChatAttachmentProps {
  filename: string;
  fileType: string;
  fileUrl: string;
}

const ChatAttachment = ({ filename, fileType, fileUrl }: ChatAttachmentProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isImage = fileType.startsWith('image/');

  return (
    <div className="mt-2 rounded-lg overflow-hidden border border-stream-gray">
      {isImage ? (
        <div className="relative">
          <img
            src={fileUrl}
            alt={filename}
            className={cn(
              "max-h-64 max-w-full object-contain bg-black",
              !imageLoaded && "hidden"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          {!imageLoaded && !imageError && (
            <div className="h-32 w-full bg-stream-gray flex items-center justify-center">
              <Image className="h-8 w-8 text-gray-400 animate-pulse" />
            </div>
          )}
          {imageError && (
            <div className="h-12 w-full bg-stream-gray flex items-center justify-center">
              <span className="text-sm text-gray-400">Failed to load image</span>
            </div>
          )}
        </div>
      ) : (
        <div className="p-3 bg-stream-gray flex items-center gap-2">
          <FileText className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-white truncate">{filename}</span>
        </div>
      )}
    </div>
  );
};

export default ChatAttachment;
