const MessageBubble = ({ message, myEmail }) => {
  const isMe = message.senderEmail === myEmail;

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm wrap-break-word ${
          isMe
            ? "bg-primary text-white rounded-br-none"
            : "bg-base-300 text-base-content rounded-bl-none"
        }`}
      >
        {message.text}
        <div
          className={`text-xs mt-1 text-right ${
            isMe ? "text-white" : "text-neutral-content"
          }`}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
