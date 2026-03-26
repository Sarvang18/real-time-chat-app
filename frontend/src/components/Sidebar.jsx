import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Search, Users, Globe, ChevronDown, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [search, setSearch] = useState("");
  const [isDirectMessagesOpen, setIsDirectMessagesOpen] = useState(true);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = (users || []).filter((u) => u?.fullName?.toLowerCase().includes(search.toLowerCase()));

  if (isUsersLoading) return (
    <div className="w-24 lg:w-80 bg-surface border-r border-border shrink-0 flex flex-col">
      <div className="p-6 border-b border-border flex items-center gap-3">
         <div className="h-6 w-32 bg-border rounded animate-pulse hidden lg:block" />
      </div>
      <div className="p-4 space-y-4">
        {[1,2,3,4,5].map((i) => (
          <div key={i} className="flex gap-4 items-center">
             <div className="size-12 bg-border rounded-full animate-pulse shrink-0 mx-auto lg:mx-0" />
             <div className="space-y-2 hidden lg:block w-full">
               <div className="h-4 w-24 bg-border rounded animate-pulse" />
               <div className="h-3 w-16 bg-border/50 rounded animate-pulse" />
             </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <aside className="w-24 lg:w-80 h-full border-r border-border flex flex-col bg-surface z-20">
      <div className="p-4 lg:p-6 border-b border-border w-full space-y-4 bg-background/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Users className="size-6 text-primary" />
          <h2 className="font-semibold text-lg text-text-main hidden lg:block tracking-tight">Chats</h2>
        </div>
        
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search contacts..." 
            className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-text-main placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-y-auto w-full py-2 flex-1 scroll-smooth">
        {/* Global Chat Room */}
        <button
          onClick={() => setSelectedUser({ _id: "global", fullName: "Global Chat" })}
          className={`w-full p-3 lg:px-6 flex items-center gap-4 transition-all border-l-2 ${
            selectedUser?._id === "global" 
              ? "bg-primary/10 border-primary" 
              : "border-transparent hover:bg-white/5"
          }`}
        >
          <div className="relative mx-auto lg:mx-0 shrink-0">
            <div className="size-12 lg:size-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border border-border shadow-inner">
              <Globe className="size-5 lg:size-4 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 size-3 lg:size-2.5 bg-emerald-500 rounded-full ring-2 ring-surface" />
          </div>
          <div className="flex-col text-left hidden lg:flex min-w-0 flex-1">
            <div className="flex justify-between items-center w-full">
              <span className="font-bold truncate text-primary-light text-sm">Global Chat</span>
            </div>
            <span className="text-[11px] mt-0.5 text-text-muted font-medium">Public Room • {onlineUsers.length} Online</span>
          </div>
        </button>

        <button 
          onClick={() => setIsDirectMessagesOpen(!isDirectMessagesOpen)}
          className="w-full flex items-center justify-between px-6 py-3 text-xs font-semibold text-text-muted hover:text-text-main transition-colors uppercase tracking-wider mt-2 group"
        >
          <span className="hidden lg:block">Direct Messages</span>
          <span className="lg:hidden">DMs</span>
          <div className="hidden lg:block">
            {isDirectMessagesOpen ? <ChevronDown className="size-4 group-hover:text-primary transition-colors" /> : <ChevronRight className="size-4 group-hover:text-primary transition-colors" />}
          </div>
        </button>

        {/* Individual Users */}
        {isDirectMessagesOpen && (
          <div className="animate-in slide-in-from-top-2 fade-in duration-200">
            {filteredUsers.map((user) => {
              if (!user) return null;
              const isOnline = (onlineUsers || []).includes(user._id);
              const isSelected = selectedUser?._id === user._id;

              return (
                <button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full p-3 lg:px-6 flex items-center gap-4 transition-all border-l-2 ${
                    isSelected 
                      ? "bg-primary/10 border-primary" 
                      : "border-transparent hover:bg-white/5"
                  }`}
                >
                  <div className="relative mx-auto lg:mx-0 shrink-0">
                    <img
                      src={user.profilePic || "https://ui-avatars.com/api/?name=" + user.fullName + "&background=27272a&color=fafafa"}
                      alt={user.fullName}
                      className="size-12 lg:size-10 object-cover rounded-full bg-border"
                    />
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 size-3 lg:size-2.5 bg-emerald-500 rounded-full ring-2 ring-surface" />
                    )}
                  </div>

                  <div className="flex-col text-left hidden lg:flex min-w-0 flex-1">
                    <div className="flex justify-between items-center w-full">
                      <span className="font-medium truncate text-text-main text-sm">{user.fullName}</span>
                    </div>
                    <span className={`text-[11px] mt-0.5 ${isOnline ? "text-emerald-500 font-medium" : "text-text-muted"}`}>
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                </button>
              );
            })}
            {filteredUsers.length === 0 && (
              <div className="text-center text-text-muted text-sm py-8 px-4 fade-in">
                No recent contacts found.
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
