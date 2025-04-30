
import ChatContainer from "@/components/ChatContainer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-stream-dark to-black p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-stream-purple to-stream-blue">
        Chatty Stream Pal
      </h1>
      <p className="text-gray-300 mb-8 text-center max-w-md">
        A real-time chat interface for streamers and their communities to connect and engage.
      </p>
      <ChatContainer />
      <footer className="mt-8 text-gray-500 text-sm">
        © 2025 Chatty Stream Pal • Interactive Chat Interface
      </footer>
    </div>
  );
};

export default Index;
