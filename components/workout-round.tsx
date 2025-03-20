import type { Round } from "@/lib/types"
import { WorkoutExercise } from "@/components/workout-exercise"

interface WorkoutRoundProps {
  round: Round
}

export function WorkoutRound({ round }: WorkoutRoundProps) {
  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold text-center mb-6">{round.name}</h2>
      <div className="space-y-4">
        {round.exercises.map((exercise, index) => (
          <WorkoutExercise key={index} exercise={exercise} />
        ))}
      </div>
    </div>
  )
}

