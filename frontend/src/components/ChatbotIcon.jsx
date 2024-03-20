import { IoChatbubbles } from "react-icons/io5";

const ChatIcon = () => {
  const openChat = () => {
    window.open("https://bookchat-3fe0.onrender.com", "_blank");
  };

  return (
    <div className="fixed bottom-5 right-5">
      <button
        className="bg-gray-300 text-white p-5 rounded-full shadow-md hover:scale-110 hover:shadow-lg transition-transform"
        onClick={openChat}
      >
        <IoChatbubbles size={28} color="black" />
      </button>
    </div>
  );
};

export default ChatIcon;
