
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileUpload from "./FileUpload";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string, file?: File) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || selectedFile) {
      onSendMessage(message, selectedFile || undefined);
      setMessage("");
      setSelectedFile(null);
    }
  };

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {selectedFile && (
        <div className="px-2 py-1 bg-stream-gray rounded-md text-sm flex items-center justify-between">
          <span className="truncate text-white">{selectedFile.name}</span>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedFile(null)}
            className="p-1 text-gray-400 hover:text-white"
          >
            ✕
          </Button>
        </div>
      )}
      <div className="flex items-center gap-2">
        <FileUpload onFileSelected={handleFileSelected} disabled={disabled} />
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message"
          disabled={disabled}
          className="flex-1 bg-stream-gray border-stream-gray focus-visible:ring-stream-purple text-white"
        />
        <Button 
          type="submit" 
          disabled={(!message.trim() && !selectedFile) || disabled}
          variant="default"
          className="bg-stream-purple hover:bg-stream-blue"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
