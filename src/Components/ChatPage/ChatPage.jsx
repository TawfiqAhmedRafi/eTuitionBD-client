import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import MessageBubble from "../MessageBubble/MessageBubble";
import { FiArrowLeft, FiSend } from "react-icons/fi";
import useUserRole from "../../hooks/useUserRole";

const ChatPage = () => {
  const { conversationId } = useParams();
  const { role } = useUserRole();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [text, setText] = useState("");
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

 
  const { data: conversation } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/conversations/${conversationId}`);
      return res.data;
    },
  });

  
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/messages/${conversationId}`);
      return res.data;
    },
    refetchInterval: 3000,
  });


  const scrollToBottom = (behavior = "auto") => {
    bottomRef.current?.scrollIntoView({ behavior });
  };
  useEffect(() => {
    if (messages.length) {
      scrollToBottom();
    }
  }, [messages.length]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const optimisticMsg = {
      _id: Date.now().toString(),
      text,
      senderEmail: user.email,
      createdAt: new Date().toISOString(),
    };

    queryClient.setQueryData(["messages", conversationId], (old = []) => [
      ...old,
      optimisticMsg,
    ]);

    setText("");
    scrollToBottom("smooth");

    await axiosSecure.post(`/messages`, {
      conversationId,
      text,
    });

    queryClient.invalidateQueries(["messages", conversationId]);
    queryClient.invalidateQueries(["conversations"]);
  };


  useEffect(() => {
    if (!conversationId || messages.length === 0) return;
    axiosSecure.patch(`/messages/seen/${conversationId}`).catch(() => {});
  }, [conversationId, messages.length, axiosSecure]);

  return (
    <div className="relative max-w-6xl mx-auto h-[85vh] px-2 sm:px-4">
      <div className="flex flex-col h-full rounded-3xl overflow-hidden
        border border-base-300 shadow-2xl
        bg-linear-to-br from-base-100 via-base-200/70 to-base-100">

       
        <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3
          bg-base-300/80 backdrop-blur-xl
          border-b border-base-300">

          <button
            onClick={() => navigate("/dashboard/messages")}
            className="btn btn-ghost btn-circle btn-sm"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>

          {conversation && (
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={
                  role === "student"
                    ? conversation.otherPhoto
                    : conversation.studentPhoto
                }
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/30"
                alt="User Avatar"
              />
              <div className="min-w-0">
                <h3 className="font-semibold truncate">
                  {role === "student"
                    ? conversation.otherName
                    : conversation.studentName}
                </h3>
                <p className="text-xs text-neutral-content">
                  Active conversation
                </p>
              </div>
            </div>
          )}
        </div>

        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto px-3 sm:px-5 py-6 space-y-5
          bg-linear-to-b from-transparent to-base-200/40"
        >
          {messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg}
              myEmail={user.email}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* ================= INPUT ================= */}
        <div className="sticky bottom-0 px-3 sm:px-5 py-3
          bg-base-100/80 backdrop-blur-xl
          border-t border-base-300">
          <div className="flex items-center gap-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Write a message…"
              className="input input-bordered w-full
                rounded-full px-5
                bg-base-100/90 focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="btn btn-primary btn-circle shrink-0 shadow-md"
            >
              <FiSend />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatPage;
