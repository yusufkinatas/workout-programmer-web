"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Play, Pause } from "lucide-react"
import { formatTime } from "@/components/workout-exercise"

interface TimerModalProps {
  open: boolean
  onClose: () => void
  duration: number
}

export function TimerModal({ open, onClose, duration }: TimerModalProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [status, setStatus] = useState<"playing" | "paused" | "done">("playing")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (open) {
      setTimeLeft(duration)
      setStatus("playing")

      // Create audio element
      audioRef.current = new Audio("/alarm.mp3")
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [open, duration])

  useEffect(() => {
    if (status === "playing") {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!)
            setStatus("done")
            // Play alarm sound
            if (audioRef.current) {
              audioRef.current.play()
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else if (status === "paused" && intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [status])

  const togglePlayPause = () => {
    setStatus(status === "playing" ? "paused" : "playing")
  }

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
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
  )
}

