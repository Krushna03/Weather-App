import { useState, useEffect } from 'react';

interface ClockProps {
  timezone: string;
}

const Clock: React.FC<ClockProps> = ({ timezone }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [timezone]);

  return (
    <span className="detail-value">
      {currentTime.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })}
    </span>
  );
};

export default Clock;
