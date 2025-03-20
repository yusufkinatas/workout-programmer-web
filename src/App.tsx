import { useState } from "react";
import { Button } from "./components/ui/button";
import { WorkoutRound } from "./components/workout-round";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { program } from "./lib/program";

function App() {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);

  const goToNextRound = () => {
    if (currentRoundIndex < program.length - 1) {
      setCurrentRoundIndex(currentRoundIndex + 1);
    }
  };

  const goToPreviousRound = () => {
    if (currentRoundIndex > 0) {
      setCurrentRoundIndex(currentRoundIndex - 1);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-8 mt-4">Workout Program</h1>

      <div className="relative w-full max-w-3xl">
        <WorkoutRound round={program[currentRoundIndex]} />

        <div className="flex justify-between w-full mt-6">
          <Button
            variant="outline"
            onClick={goToPreviousRound}
            disabled={currentRoundIndex === 0}
            className="bg-gray-800 hover:bg-gray-700 text-white"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="text-center text-lg font-medium">
            {currentRoundIndex + 1} / {program.length}
          </div>

          <Button
            variant="outline"
            onClick={goToNextRound}
            disabled={currentRoundIndex === program.length - 1}
            className="bg-gray-800 hover:bg-gray-700 text-white"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}

export default App;
