"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { TimerModal } from "./timer-modal";
import { Exercise } from "../lib/types";
import { formatTime } from "./utils";

interface WorkoutExerciseProps {
  exercise: Exercise;
}

export function WorkoutExercise({ exercise }: WorkoutExerciseProps) {
  const [timerOpen, setTimerOpen] = useState(false);

  const isTimed = typeof exercise.amount === "number";

  const formatAmount = () => {
    if (isTimed) {
      return `${formatTime(Number(exercise.amount))}s`;
    }
    return `x ${exercise.amount}`;
  };

  return (
    <div className="flex items-center border-2 border-gray-800 rounded-md">
      <div className="flex-1 p-6">
        <div className="flex justify-between">
          <span className="text-xl">{exercise.name}</span>
          <span className="text-xl">{formatAmount()}</span>
        </div>
      </div>

      {isTimed && (
        <>
          <Button
            variant="ghost"
            className="h-full bg-gray-800 rounded-none hover:bg-gray-700"
            onClick={() => setTimerOpen(true)}
          >
            <Play size={24} />
          </Button>

          {timerOpen && (
            <TimerModal
              onClose={() => setTimerOpen(false)}
              duration={Number(exercise.amount)}
            />
          )}
        </>
      )}
    </div>
  );
}
