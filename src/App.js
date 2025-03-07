import React, { useState, useEffect, useMemo } from "react";
import Confetti from "react-confetti";
import "./App.css"; // Add this CSS file for styling

export default function Body() {
  const birthdayDate = useMemo(() => new Date("March 12, 2025 00:00:00"), []);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [remainingTime, setRemainingTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });
  const [bgColor, setBgColor] = useState("#ff758c");
  const [textColor, setTextColor] = useState("white");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      const timeDifference = birthdayDate - now;
      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);

        setRemainingTime({
          days: days.toString().padStart(2, "0"),
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0")
        });

        if (seconds === 0) {
          const colors = ["#ff758c", "#ff7eb3", "#6a11cb", "#2575fc", "#ffcc00"];
          const textColors = ["#ffffff", "#000000", "#ffeb3b", "#e91e63", "#00e676"];
          setBgColor(colors[Math.floor(Math.random() * colors.length)]);
          setTextColor(textColors[Math.floor(Math.random() * textColors.length)]);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
      } else {
        setShowConfetti(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [birthdayDate]);

  return (
    <div className="container" style={{ background: bgColor, color: textColor, padding: "20px", paddingTop: "40px", paddingBottom: "40px" }}>
      {showConfetti && <Confetti />}
      <h1 className="birthday-title">🎉 Countdown to My Jaana's Special Day! 🎂</h1>
      <h2 className="birthday-date">12th March 2025</h2>
      <div className="countdown">
        <div className="time-box"><span>{remainingTime.days}</span> Days</div>
        <div className="time-box"><span>{remainingTime.hours}</span> Hours</div>
        <div className="time-box"><span>{remainingTime.minutes}</span> Minutes</div>
        <div className="time-box"><span>{remainingTime.seconds}</span> Seconds</div>
      </div>
      <h2 className="current-time">Current Time: {currentTime.toLocaleTimeString()}</h2>
      <p className="message">Happy Birthday in advance, my love! 💖</p>
    </div>
  );
}