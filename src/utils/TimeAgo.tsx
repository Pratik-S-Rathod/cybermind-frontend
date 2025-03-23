import { useState, useEffect } from "react";

const TimeAgo = ({ timestamp }: {timestamp: string}) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateRelativeTime = () => {
      setTimeAgo(getRelativeTime(timestamp));
    };

    updateRelativeTime();
    const interval = setInterval(updateRelativeTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [timestamp]);

  return <span>{timeAgo}</span>;
};

// Function to calculate relative time
const getRelativeTime = (timestamp: string) => {
  const now: Date = new Date();
  const past: Date = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const units = [
    { name: "year", seconds: 31536000 },
    { name: "month", seconds: 2592000 },
    { name: "week", seconds: 604800 },
    { name: "day", seconds: 86400 },
    { name: "hour", seconds: 3600 },
    { name: "minute", seconds: 60 },
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      return `${interval}${unit.name[0]} Ago`;
    }
  }

  return "Just now";
};

export default TimeAgo;
