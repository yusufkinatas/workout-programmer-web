"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { Play, Pause } from "lucide-react";
import { useIntervalWhen } from "../hooks/use-interval-when";
import useSound from "use-sound";
import { formatTime } from "./utils";
// @ts-ignore
import alarmSound from "./alarm.mp3";

interface TimerModalProps {
  onClose: () => void;
  duration: number;
}

export function TimerModal({ onClose, duration }: TimerModalProps) {
  const [timeLeft, setTimeLeft] = useState(duration + 5);
  const [status, setStatus] = useState<"playing" | "paused" | "done">(
    "playing"
  );
  const [play, { stop }] = useSound(alarmSound);

  useEffect(() => {
    setTimeLeft(duration + 5);
    setStatus("playing");
  }, [duration]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  useIntervalWhen(
    () => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setStatus("done");
          // Play alarm sound
          play();
          return 0;
        }
        return prev - 1;
      });
    },
    { ms: 1000, when: status === "playing" }
  );

  const togglePlayPause = () => {
    setStatus(status === "playing" ? "paused" : "playing");
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-black text-white border-gray-800 max-w-md sm:max-w-lg md:max-w-xl h-screen flex flex-col">
        <div className="flex flex-col items-center justify-center flex-1 py-8">
          <div
            className="text-9xl font-bold mb-8 tabular-nums"
            style={{ color: status === "done" ? "#FEA00A" : "white" }}
          >
            {formatTime(timeLeft)}
          </div>

          <button
            className="w-40 h-40 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700"
            onClick={togglePlayPause}
            disabled={status === "done"}
            style={{
              opacity: status === "done" ? 0 : 1,
            }}
          >
            {status === "playing" ? <Pause size={64} /> : <Play size={64} />}
          </button>

          <Button
            className="mt-20 h-24 w-full py-6 text-4xl font-bold bg-gray-800 hover:bg-gray-700"
            onClick={onClose}
          >
            CLOSE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
