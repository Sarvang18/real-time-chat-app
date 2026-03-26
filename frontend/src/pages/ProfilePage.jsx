import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Loader2, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [fullName, setFullName] = useState(authUser?.fullName || "");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    if (fullName === authUser.fullName) return;
    await updateProfile({ fullName });
  };

  return (
    <div className="min-h-screen bg-background pt-24 px-4 pb-12">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-text-main mb-2">Profile Details</h1>
          <p className="text-text-muted">Manage your personal information</p>
        </div>

        <div className="bg-surface rounded-3xl p-8 border border-border shadow-2xl relative overflow-hidden">
          {/* Decorative blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-6 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-surface overflow-hidden bg-background relative shadow-xl">
                <img
                  src={selectedImage || authUser.profilePic || "https://ui-avatars.com/api/?name=" + authUser.fullName + "&background=27272a&color=fafafa"}
                  alt="Profile"
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
                />
              </div>
              
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-primary hover:bg-primary-hover
                  p-3 rounded-full cursor-pointer 
                  transition-all duration-300 shadow-lg text-white group-hover:scale-110
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="text-sm text-text-muted text-center max-w-sm">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="w-full h-px bg-border my-8 relative z-10" />

          {/* Form Section */}
          <form className="space-y-6 relative z-10" onSubmit={handleNameUpdate}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted ml-0.5 flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-main placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isUpdatingProfile}
                />
                <button 
                  type="submit" 
                  disabled={isUpdatingProfile || fullName === authUser.fullName || !fullName.trim()}
                  className="bg-white/10 hover:bg-white/15 text-white font-medium px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-white/5 shadow-inner"
                >
                  {isUpdatingProfile ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Save"}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted ml-0.5 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input
                type="email"
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-text-muted cursor-not-allowed opacity-70"
                value={authUser.email}
                readOnly
              />
            </div>
          </form>

          {/* Account info section */}
          <div className="mt-10 bg-background/50 rounded-2xl p-6 border border-border/50 relative z-10">
            <h2 className="text-sm font-semibold text-text-main mb-4 flex items-center gap-2">
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-border/30">
                <span className="text-text-muted">Member Since</span>
                <span className="font-medium">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-text-muted">Account Status</span>
                <span className="text-emerald-500 font-medium">Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
