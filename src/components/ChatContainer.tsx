
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatMessage, { ChatMessageProps } from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { ChatAttachmentProps } from "./ChatAttachment";
import { useToast } from "@/components/ui/use-toast";

// Sample bot responses
const botResponses = [
  "Hello! How can I assist you today?",
  "That's an interesting question. Let me think about that.",
  "I'm here to help! What would you like to know?",
  "Thanks for sharing that with me!",
  "I understand your concern. Here's what I think...",
  "That's a great point! I hadn't considered that perspective.",
  "Let me provide some more information on that topic.",
  "Is there anything else you'd like to know?",
  "I'm processing your request. One moment please.",
  "That's outside my expertise, but I can try to help anyway!"
];

// Sample user data
const botUser = { username: "ChatBot", isBot: true };
const currentUser = { username: "You" };

const ChatContainer = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    {
      username: botUser.username,
      message: "Hello! I'm your friendly chatbot assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isBot: true,
    }
  ]);
  
  const [processingMessage, setProcessingMessage] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (message: string, file?: File) => {
    // Process user message
    const newUserMessage: ChatMessageProps = {
      username: currentUser.username,
      message: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // If there's a file, add it as an attachment
    if (file) {
      try {
        const fileUrl = URL.createObjectURL(file);
        const attachment: ChatAttachmentProps = {
          filename: file.name,
          fileType: file.type,
          fileUrl: fileUrl,
        };
        newUserMessage.attachment = attachment;
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not process the uploaded file.",
          variant: "destructive",
        });
      }
    }

    // Add user message to chat
    setMessages(prev => [...prev, newUserMessage]);
    
    // Simulate bot "thinking"
    setProcessingMessage(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      // Select a random response
      const randomBotResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      // Create the bot message
      const botMessage: ChatMessageProps = {
        username: botUser.username,
        message: randomBotResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isBot: true,
      };
      
      // Add the bot response to the chat
      setMessages(prev => [...prev, botMessage]);
      setProcessingMessage(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  return (
    <Card className="w-full max-w-md bg-stream-dark border-stream-gray">
      <CardHeader className="bg-stream-gray border-b border-stream-dark flex flex-row justify-between items-center py-3">
        <CardTitle className="text-lg text-white">Chat Assistant</CardTitle>
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${processingMessage ? "bg-yellow-500" : "bg-green-500"}`}></div>
          <span className="text-gray-300 text-sm">{processingMessage ? "Thinking..." : "Online"}</span>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-[500px]">
        <ScrollArea ref={scrollAreaRef} className="flex-1 px-1">
          <div className="py-2">
            {messages.map((msg, index) => (
              <ChatMessage key={index} {...msg} />
            ))}
          </div>
        </ScrollArea>
        <div className="p-3 border-t border-stream-gray">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={processingMessage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatContainer;
