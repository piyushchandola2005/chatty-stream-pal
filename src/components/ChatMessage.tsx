
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface ChatMessageProps {
  username: string;
  message: string;
  timestamp: string;
  isStreamer?: boolean;
  isModerator?: boolean;
  avatarUrl?: string;
}

const ChatMessage = ({
  username,
  message,
  timestamp,
  isStreamer = false,
  isModerator = false,
  avatarUrl,
}: ChatMessageProps) => {
  return (
    <div className="flex items-start gap-2 p-2 animate-fade-in">
      <Avatar className="w-8 h-8 border-2 border-stream-gray">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback className="bg-stream-gray text-xs">
          {username.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span 
            className={cn(
              "font-medium text-sm truncate",
              isStreamer ? "text-stream-purple" : "",
              isModerator ? "text-green-400" : ""
            )}
          >
            {username}
            {isStreamer && <span className="ml-1 text-xs px-1 bg-stream-purple text-white rounded">Host</span>}
            {isModerator && <span className="ml-1 text-xs px-1 bg-green-600 text-white rounded">Mod</span>}
          </span>
          <span className="text-xs text-gray-400">{timestamp}</span>
        </div>
        <p className="text-sm break-words">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
