import { useQuery, useQueryClient } from "@tanstack/react-query";
import {  useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import MessageBubble from "../MessageBubble/MessageBubble";
import { FiArrowLeft, FiSend } from "react-icons/fi";

const ChatPage = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  // Conversation info
  const { data: conversation } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/conversations/${conversationId}`);
      return res.data;
    },
  });

  // Messages
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/messages/${conversationId}`);
      return res.data;
    },
     refetchInterval: 3000,
  });

 const handleSend = async () => {
  if (!text.trim()) return;

  const newMsg = {
    _id: Date.now().toString(), // temp id
    text,
    senderEmail: user.email,
    sentAt: new Date().toISOString(),
  };

  queryClient.setQueryData(["messages", conversationId], (old = []) => [
    ...old,
    newMsg,
  ]);

  setText("");

  await axiosSecure.post(`/messages`, {
    conversationId,
    text,
  });

  queryClient.invalidateQueries(["messages", conversationId]);
  queryClient.invalidateQueries(["conversations"]);
};


  return (
    <div className="flex flex-col h-[80vh] max-w-4xl mx-auto border border-base-300 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-base-200">
        <button onClick={() => navigate(-1)}>
          <FiArrowLeft className="w-5 h-5" />
        </button>

        {conversation && (
          <>
            <img
              src={conversation.otherPhoto}
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">{conversation.otherName}</span>
          </>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-base-100">
        {messages.map((msg) => (
          <MessageBubble key={msg._id} message={msg} myEmail={user.email} />
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-3 bg-base-200">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="input input-bordered w-full"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="btn btn-primary btn-circle">
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
