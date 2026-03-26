import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: { _id: "global", fullName: "Global Chat" },
  selectedUserProfile: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isUserProfileLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  getUserProfile: async (userId) => {
    set({ isUserProfileLoading: true });
    try {
      const res = await axiosInstance.get(`/auth/profile/${userId}`);
      set({ selectedUserProfile: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching user profile");
    } finally {
      set({ isUserProfileLoading: false });
    }
  },

  clearUserProfile: () => set({ selectedUserProfile: null }),

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending message");
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    
    // Refresh listener to prevent duplicates
    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const { selectedUser } = get();
      if (!selectedUser) return;

      // If we are currently in global chat
      if (selectedUser._id === "global") {
        if (!newMessage.isGlobal) return;
        
        set({
          messages: [...get().messages, newMessage],
        });
      } else {
        // If we are in a direct chat
        if (newMessage.isGlobal) return;
        
        const senderObj = newMessage.senderId || {};
        const rawSenderId = senderObj._id || senderObj;
        const isMessageSentFromSelectedUser = rawSenderId === selectedUser._id;
        
        if (!isMessageSentFromSelectedUser) return;

        set({
          messages: [...get().messages, newMessage],
        });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
