import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import { MessageSquareOff } from "lucide-react";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-background pt-16">
      <div className="h-full max-w-[1600px] mx-auto p-4 sm:p-6 pb-6">
        <div className="bg-surface w-full h-full flex overflow-hidden rounded-2xl shadow-2xl border border-border">
          <Sidebar />
          
          {selectedUser ? (
            <ChatContainer />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-background/50 relative overflow-hidden">
              <div className="absolute w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center animate-fade-in">
                <div className="w-24 h-24 bg-surface rounded-3xl border border-border flex items-center justify-center mb-6 shadow-xl transform -rotate-6">
                  <MessageSquareOff className="size-10 text-text-muted" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-text-main mb-3">Your Messages</h2>
                <p className="text-text-muted text-lg max-w-sm">Select a conversation from the sidebar or start a new chat connection.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
