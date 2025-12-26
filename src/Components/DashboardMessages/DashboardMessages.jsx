import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const DashboardMessages = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

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
  console.log(conversations)

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      {conversations.length === 0 ? (
        <div className="text-center text-neutral-content mt-20">
          No conversations yet
        </div>
      ) : (
        <div className="space-y-3">
          {conversations.map((convo) => (
            <div
              key={convo._id}
              onClick={() =>
                navigate(`/dashboard/messages/${convo._id}`)
              }
              className="flex items-center gap-4 p-4 rounded-2xl border border-base-300 hover:bg-base-200 cursor-pointer transition"
            >
              <img
                src={convo.otherPhoto}
                alt={convo.otherName}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">
                  {convo.otherName}
                </h3>
                <p className="text-sm text-neutral-content truncate">
                  {convo.lastMessage || "No messages yet"}
                </p>
              </div>

              <span className="text-xs text-neutral-content">
                {convo.lastMessageAt
                  ? formatDistanceToNow(
                      new Date(convo.lastMessageAt),
                      { addSuffix: true }
                    )
                  : ""}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardMessages;