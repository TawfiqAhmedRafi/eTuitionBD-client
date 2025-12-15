import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

const useTimeAgo = (date, interval = 60000) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (!date) return;

    const updateTime = () => {
      setTimeAgo(
        formatDistanceToNow(new Date(date), { addSuffix: true })
      );
    };

    updateTime(); // initial run

    const timer = setInterval(updateTime, interval);

    return () => clearInterval(timer);
  }, [date, interval]);

  return timeAgo;
};

export default useTimeAgo;
