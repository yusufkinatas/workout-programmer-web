"use client"

import { useState } from "react"
import type { Exercise } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { TimerModal } from "@/components/timer-modal"

interface WorkoutExerciseProps {
  exercise: Exercise
}

export function WorkoutExercise({ exercise }: WorkoutExerciseProps) {
  const [timerOpen, setTimerOpen] = useState(false)

  const isTimed = typeof exercise.amount === "number"

  const formatAmount = () => {
    if (isTimed) {
      return `${formatTime(Number(exercise.amount))} sec`
    }
    return exercise.amount
  }

  return (
    <div className="flex items-center border-2 border-gray-800 rounded-md">
      <div className="flex-1 p-6">
        <div className="flex justify-between">
          <span className="text-xl">{exercise.name}</span>
          <span className="text-xl">x {formatAmount()}</span>
        </div>
      </div>

      {isTimed && (
        <>
          <Button variant="ghost" className="h-full w-24 bg-gray-800 rounded-none" onClick={() => setTimerOpen(true)}>
            <Play size={24} />
          </Button>

          <TimerModal open={timerOpen} onClose={() => setTimerOpen(false)} duration={Number(exercise.amount)} />
        </>
      )}
    </div>
  )
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

