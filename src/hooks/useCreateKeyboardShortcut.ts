import { useEffect } from "react";

export const useCreateKeyboardShortcuts = (
  shortcuts: Record<string, (e: KeyboardEvent) => void>
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const pressedKeys = [];

      if (event.metaKey) pressedKeys.push("meta");
      if (event.ctrlKey) pressedKeys.push("ctrl");
      if (event.altKey) pressedKeys.push("alt");
      if (event.shiftKey) pressedKeys.push("shift");

      pressedKeys.push(event.key.toLowerCase());

      const combo = pressedKeys.join("+");

      if (shortcuts[combo]) {
        event.preventDefault();
        shortcuts[combo](event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
};
