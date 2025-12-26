import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useUserRole from "../../hooks/useUserRole";

const DashboardMessages = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { role } = useUserRole();

  const {
    data: conversations = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/conversations");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-error mt-10">
        Failed to load conversations
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Messages</h1>

      {conversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 text-neutral-content">
          <div className="text-6xl mb-3">💬</div>
          <p className="text-sm">No conversations yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {conversations.map((convo) => {
            const unreadCount =
              role === "student"
                ? convo.unreadForStudent
                : convo.unreadForTutor;

            return (
              <div
                key={convo._id}
                onClick={() => navigate(`/dashboard/messages/${convo._id}`)}
                className={`
                  relative flex items-center gap-4 p-4 rounded-2xl
                   bg-base-200/80 backdrop-blur
                border border-base-300/60
                  cursor-pointer transition-all duration-200
                 hover:shadow-lg hover:-translate-y-0.5
                  ${unreadCount > 0 ? "ring-1 ring-primary/30" : ""}
                `}
              >
                {/* Unread accent bar */}
                {unreadCount > 0 && (
                  <span className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-primary"></span>
                )}

                {/* Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={convo.otherPhoto}
                    alt={convo.otherName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full ring-2 ring-base-100"></span>
                  )}
                </div>

                {/* Middle content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={`font-semibold truncate ${
                        unreadCount > 0 ? "text-primary" : ""
                      }`}
                    >
                      {convo.otherName}
                    </h3>
                    {convo.lastMessageAt && (
                      <span className="hidden sm:inline text-xs text-neutral-content shrink-0">
                        {formatDistanceToNow(new Date(convo.lastMessageAt), {
                          addSuffix: true,
                        })}
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-sm truncate mt-0.5 ${
                      unreadCount > 0
                        ? "font-medium text-base-content"
                        : "text-neutral-content"
                    }`}
                  >
                    {convo.lastMessage || "No messages yet"}
                  </p>
                </div>

                {/* Unread badge */}
                {unreadCount > 0 && (
                  <span
                    className="min-w-[22px] h-[22px] px-1.5 flex items-center justify-center
                    text-xs font-bold rounded-full bg-primary text-white"
                  >
                    {unreadCount}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardMessages;
