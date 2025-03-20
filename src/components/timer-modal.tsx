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
      <DialogContent className="bg-black text-white border-gray-800 max-w-md sm:max-w-lg md:max-w-xl">
        <div className="flex flex-col items-center justify-center py-8">
          <div
            className="text-8xl font-bold mb-8 tabular-nums"
            style={{ color: status === "done" ? "#FEA00A" : "white" }}
          >
            {formatTime(timeLeft)}
          </div>

          {status !== "done" && (
            <Button
              variant="outline"
              size="lg"
              className="w-24 h-24 rounded-full bg-gray-800 hover:bg-gray-700"
              onClick={togglePlayPause}
            >
              {status === "playing" ? <Pause size={36} /> : <Play size={36} />}
            </Button>
          )}

          <Button
            variant="ghost"
            className="mt-8 w-full py-6 text-xl font-bold bg-gray-800 hover:bg-gray-700"
            onClick={onClose}
          >
            CLOSE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
