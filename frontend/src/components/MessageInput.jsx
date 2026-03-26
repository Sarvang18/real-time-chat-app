import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Paperclip } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imageSequence, setImageSequence] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSequence(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageSequence(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imageSequence) return;
    try {
      await sendMessage({ text: text.trim(), image: imageSequence });
      setText("");
      removeImage();
    } catch (error) {
      console.error("Failed to send message: ", error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {imageSequence && (
        <div className="mb-3 flex items-center gap-2 p-2 bg-background border border-border rounded-xl w-fit">
          <div className="relative group">
            <img src={imageSequence} alt="preview" className="size-20 object-cover rounded-lg border border-border" />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2 lg:gap-3">
        <button
          type="button"
          className="p-2.5 text-text-muted hover:text-text-main hover:bg-white/5 rounded-full transition-colors hidden sm:block"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="size-5" />
        </button>
      
        <div className="flex-1 relative flex items-center bg-background border border-border rounded-full hover:border-border/80 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
          <input
            type="text"
            className="w-full bg-transparent text-text-main placeholder:text-zinc-600 pl-4 py-3 pr-12 focus:outline-none text-[15px]"
            placeholder="Write a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 p-1.5 text-text-muted hover:text-primary transition-colors sm:hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="size-5" />
          </button>
        </div>
        
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        
        <button
          type="submit"
          className="p-3 bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          disabled={!text.trim() && !imageSequence}
        >
          <Send className="size-5 ml-0.5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
