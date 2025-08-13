import { useState, useEffect } from "react";

function TypingText({ texts, speed = 50, eraseSpeed = 30, delay = 1500 }) {
  const [displayed, setDisplayed] = useState("");
  const [i, setI] = useState(0); // character index
  const [textIndex, setTextIndex] = useState(0); // which text in array
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    if (!isDeleting && i < currentText.length) {
      // Typing
      const timeout = setTimeout(() => {
        setDisplayed(currentText.substring(0, i + 1));
        setI(i + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && i > 0) {
      // Erasing
      const timeout = setTimeout(() => {
        setDisplayed(currentText.substring(0, i - 1));
        setI(i - 1);
      }, eraseSpeed);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && i === currentText.length) {
      // Pause at end before deleting
      const timeout = setTimeout(() => setIsDeleting(true), delay);
      return () => clearTimeout(timeout);
    } else if (isDeleting && i === 0) {
      // Move to next text
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }
  }, [i, isDeleting, textIndex, texts, speed, eraseSpeed, delay]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default TypingText;
