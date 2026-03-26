import { useChatStore } from "../store/useChatStore";
import { format } from "date-fns";
import { X, Mail, Calendar, MessageSquare } from "lucide-react";

const UserProfileModal = () => {
  const { selectedUserProfile, isUserProfileLoading, clearUserProfile, setSelectedUser } = useChatStore();

  if (!selectedUserProfile && !isUserProfileLoading) return null;

  const handleMessageClick = () => {
    setSelectedUser(selectedUserProfile);
    clearUserProfile();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-sm shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button 
          onClick={clearUserProfile}
          className="absolute top-4 right-4 p-2 bg-background/50 hover:bg-background rounded-full transition-colors text-text-muted hover:text-text-main z-10"
        >
          <X className="size-5" />
        </button>

        {isUserProfileLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="text-text-muted text-sm font-medium">Loading profile...</p>
          </div>
        ) : selectedUserProfile ? (
          <div className="overflow-hidden rounded-2xl">
            {/* Header Banner */}
            <div className="h-32 bg-gradient-to-br from-primary/80 to-purple-600/80 w-full rounded-t-2xl relative"></div>
            
            <div className="px-6 pb-6 relative">
              {/* Profile Picture */}
              <div className="absolute -top-16 left-6">
                <img 
                  src={selectedUserProfile.profilePic || "https://ui-avatars.com/api/?name=" + selectedUserProfile.fullName + "&background=27272a&color=fafafa"} 
                  alt={selectedUserProfile.fullName}
                  className="size-32 rounded-full border-4 border-surface object-cover bg-border shadow-xl"
                />
              </div>

              {/* Push content down to account for overlapping avatar */}
              <div className="pt-20">
                <h2 className="text-2xl font-bold text-text-main tracking-tight mb-1">{selectedUserProfile.fullName}</h2>
                
                <div className="space-y-4 mt-6">
                  {/* Email */}
                  <div className="flex items-center gap-3 text-text-muted bg-background/50 px-4 py-3 rounded-xl border border-border/50">
                    <Mail className="size-5 shrink-0 text-primary-light" />
                    <span className="text-sm font-medium truncate">{selectedUserProfile.email}</span>
                  </div>
                  
                  {/* Join Date */}
                  <div className="flex items-center gap-3 text-text-muted bg-background/50 px-4 py-3 rounded-xl border border-border/50">
                    <Calendar className="size-5 shrink-0 text-primary-light" />
                    <span className="text-sm font-medium">Joined {format(new Date(selectedUserProfile.createdAt), "MMM yyyy")}</span>
                  </div>
                </div>

                {/* Message Button */}
                <button 
                  onClick={handleMessageClick}
                  className="w-full mt-8 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98]"
                >
                  <MessageSquare className="size-5" />
                  <span className="tracking-wide">Message</span>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      
      {/* Background click listener to close */}
      <div className="absolute inset-0 -z-10" onClick={clearUserProfile} />
    </div>
  );
};

export default UserProfileModal;
