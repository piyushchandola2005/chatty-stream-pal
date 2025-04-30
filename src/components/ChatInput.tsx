
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send a message"
        disabled={disabled}
        className="flex-1 bg-stream-gray border-stream-gray focus-visible:ring-stream-purple text-white"
      />
      <Button 
        type="submit" 
        disabled={!message.trim() || disabled}
        variant="default"
        className="bg-stream-purple hover:bg-stream-blue"
      >
        Send
      </Button>
    </form>
  );
};

export default ChatInput;
