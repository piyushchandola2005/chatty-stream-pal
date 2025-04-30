
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatMessage, { ChatMessageProps } from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";

// Sample user data
const users = [
  { username: "StreamerDude", isStreamer: true },
  { username: "ModeratorPro", isModerator: true },
  { username: "ChatEnthusiast", },
  { username: "GameLover123", },
  { username: "ViewerGal", },
  { username: "FirstTimeChatting", },
  { username: "LongTimeViewer", },
];

// Sample messages to populate the chat
const sampleMessages: ChatMessageProps[] = [
  {
    username: "StreamerDude",
    message: "Hey everyone! Welcome to the stream!",
    timestamp: "12:01",
    isStreamer: true,
  },
  {
    username: "ModeratorPro",
    message: "Remember to follow the chat rules everyone!",
    timestamp: "12:02",
    isModerator: true,
  },
  {
    username: "ChatEnthusiast",
    message: "This is such a cool stream! Love the content!",
    timestamp: "12:03",
  },
  {
    username: "GameLover123",
    message: "Have you tried the new game that just came out?",
    timestamp: "12:04",
  },
  {
    username: "ViewerGal",
    message: "First time catching you live! So excited!",
    timestamp: "12:05",
  },
];

const ChatContainer = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>(sampleMessages);
  const [viewerCount, setViewerCount] = useState(128);
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

  // Simulate random viewers joining/leaving
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(100, prev + change);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate random chat messages
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomMessages = [
        "Hey there!",
        "Great stream today!",
        "LOL",
        "That was amazing!",
        "Can you do that again?",
        "Is this game available on console?",
        "Anyone else from Europe here?",
        "This is so entertaining!",
        "What's your streaming schedule?",
        "I can't believe that just happened!",
      ];
      
      const newMessage: ChatMessageProps = {
        username: randomUser.username,
        message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isStreamer: randomUser.isStreamer,
        isModerator: randomUser.isModerator,
      };
      
      setMessages(prev => [...prev, newMessage]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (message: string) => {
    const newMessage: ChatMessageProps = {
      username: "You",
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <Card className="w-full max-w-md bg-stream-dark border-stream-gray">
      <CardHeader className="bg-stream-gray border-b border-stream-dark flex flex-row justify-between items-center py-3">
        <CardTitle className="text-lg text-white">Stream Chat</CardTitle>
        <div className="flex items-center gap-1 text-sm text-red-500">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="text-gray-300">LIVE</span>
          <span className="text-gray-400 ml-2">{viewerCount} viewers</span>
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
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatContainer;
