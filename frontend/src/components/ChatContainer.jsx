import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import MessageInput from "./MessageInput";
import { format } from "date-fns";
import { Globe } from "lucide-react";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages, getUserProfile } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      setTimeout(() => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  const isGlobalChat = selectedUser._id === "global";
  const isOnline = isGlobalChat ? true : onlineUsers.includes(selectedUser._id);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center bg-background/50">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background/50 relative z-10 w-full overflow-hidden">
      {/* Header */}
      <div className="w-full bg-surface/80 border-b border-border px-6 py-4 flex items-center justify-between backdrop-blur-xl absolute top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="relative">
            {isGlobalChat ? (
               <div className="size-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border border-border shadow-sm">
                 <Globe className="size-5 text-white" />
               </div>
            ) : (
               <img 
                 src={selectedUser.profilePic || "https://ui-avatars.com/api/?name=" + selectedUser.fullName + "&background=27272a&color=fafafa"} 
                 alt="profile" 
                 onClick={() => getUserProfile(selectedUser._id)}
                 className="size-11 rounded-full border border-border bg-border object-cover cursor-pointer hover:opacity-80 transition-opacity" 
               />
            )}
            {isOnline && (
              <span className="absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full ring-2 ring-surface" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-text-main text-base tracking-tight">{selectedUser.fullName}</h3>
            <p className="text-xs text-text-muted">{isGlobalChat ? `${onlineUsers.length} Users Online` : (isOnline ? "Online" : "Offline")}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 space-y-6 pt-28 pb-28 scroll-smooth will-change-scroll">
        {messages.map((message) => {
          const senderObj = message.senderId || {};
          const rawSenderId = senderObj._id || senderObj;
          const isMine = rawSenderId === authUser._id;
          
          const senderProfilePic = isMine 
            ? authUser.profilePic 
            : (senderObj.profilePic || "https://ui-avatars.com/api/?name=" + (senderObj.fullName || "U") + "&background=27272a&color=fafafa");
            
          const senderName = isMine ? authUser.fullName : (senderObj.fullName || "Unknown User");

          return (
             <div key={message._id} className={`flex ${isMine ? "justify-end" : "justify-start"} animate-slide-up`}>
                {!isMine && (
                   <div className="flex flex-col items-center mr-2 self-end mb-1 shrink-0">
                     <img 
                       src={senderProfilePic} 
                       alt="avatar" 
                       onClick={() => getUserProfile(rawSenderId)}
                       className="size-8 rounded-full border border-border object-cover cursor-pointer hover:opacity-80 transition-opacity" 
                     />
                   </div>
                )}
                <div className={`flex flex-col max-w-[80%] md:max-w-[70%] lg:max-w-[60%] ${isMine ? "items-end" : "items-start"}`}>
                   <div className={`px-4 py-3 shadow-md relative ${
                      isMine 
                      ? "bg-primary text-white rounded-2xl rounded-br-sm" 
                      : "bg-surface border border-border text-text-main rounded-2xl rounded-bl-sm"
                   }`}>
                      {/* Name tag for global chat */}
                      {isGlobalChat && !isMine && (
                        <span className="text-[11px] text-primary-light font-bold block mb-1 tracking-wide">{senderName}</span>
                      )}

                      {message.image && (
                        <img
                          src={message.image}
                          alt="attachment"
                          className="w-full max-w-[240px] rounded-lg mb-2 object-cover"
                        />
                      )}
                      {message.text && <p className="leading-relaxed whitespace-pre-wrap text-[15px]">{message.text}</p>}
                   </div>
                   <div className="text-[11px] text-text-muted mt-1 px-1 font-medium">
                      {format(new Date(message.createdAt), "p")}
                   </div>
                </div>
             </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <div className="absolute bottom-0 w-full bg-surface/80 backdrop-blur-xl border-t border-border p-4 z-20">
        <MessageInput />
      </div>
    </div>
  );
};
export default ChatContainer;
