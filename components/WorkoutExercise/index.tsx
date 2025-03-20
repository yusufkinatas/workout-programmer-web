"use client"

import { useEffect, useState } from "react"
import type { Exercise } from "@constants/types"
import { Modal, StyleSheet, View } from "react-native"
import { Text } from "@components/Text"
import { Icon } from "@components/Icon"
import { PressableOpacity } from "@components/PressableOpacity"
import { colors } from "@constants/colors"
import { useMemo } from "react"
import { CountdownCircleTimer } from "react-native-countdown-circle-timer"
import { layout } from "@constants/layout"
import { Audio } from "expo-av"
import type { Sound } from "expo-av/build/Audio"
import { useKeepAwake } from "expo-keep-awake"

interface Props {
  exercise: Exercise
}

const secToStr = (sec: number) => {
  return new Date(sec * 1000).toISOString().substring(14, 19)
}

const TimerComponent = ({
  onClose,
  duration,
}: {
  onClose: () => void
  duration: number
}) => {
  useKeepAwake()

  const [status, setStatus] = useState<"playing" | "paused" | "done">("playing")
  const [sound, setSound] = useState<Sound>()

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("../../assets/alarm.mp3"),
      { isLooping: true },
    )
    setSound(sound)
    await sound.playAsync()
  }

  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync()
    }
  }, [sound])

  return (
    <View
      style={{
        backgroundColor: colors.black,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CountdownCircleTimer
        isPlaying={status === "playing"}
        duration={duration + 5} // extra 5 secs for prep
        size={layout.width - 32}
        // @ts-ignore
        colors={colors.orange}
        // @ts-ignore
        trailColor={colors.gray}
        onComplete={() => {
          playSound()
          setStatus("done")
        }}
      >
        {({ remainingTime }) => (
          <Text color={status === "done" ? colors.orange : colors.white} size={100}>
            {secToStr(remainingTime)}
          </Text>
        )}
      </CountdownCircleTimer>

      <PressableOpacity
        disabled={status === "done"}
        style={{
          backgroundColor: colors.gray,
          width: 120,
          height: 120,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 48,
          borderRadius: 60,
          opacity: status === "done" ? 0 : 1,
        }}
        onPress={() => setStatus((s) => (s === "paused" ? "playing" : "paused"))}
      >
        {<Icon size={48} color={colors.white} name={status === "playing" ? "pause" : "play"} />}
      </PressableOpacity>

      <PressableOpacity
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: colors.gray,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          paddingBottom: 64,
        }}
        onPress={onClose}
      >
        <Text size={32} weight="bold">
          KAPAT
        </Text>
      </PressableOpacity>
    </View>
  )
}

export const WorkoutExercise = ({ exercise }: Props) => {
  const isTimed = typeof exercise.amount === "number"

  const amountText = useMemo(() => {
    if (isTimed) {
      return `${secToStr(Number(exercise.amount))} sn`
    }

    return exercise.amount
  }, [exercise])

  const [visible, setVisible] = useState(false)

  return (
    <View style={styles.wrapper}>
      <View style={styles.textContainer}>
        <Text size={24}>{exercise.name}</Text>
        <Text size={24}>x {amountText}</Text>
      </View>

      {isTimed && (
        <PressableOpacity style={styles.playButton} onPress={() => setVisible(true)}>
          <Icon name="play" size={32} />
        </PressableOpacity>
      )}

      <Modal visible={visible}>
        <TimerComponent onClose={() => setVisible(false)} duration={Number(exercise.amount)} />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.gray,
  },
  textContainer: {
    flex: 1,
    padding: 24,
  },
  playButton: {
    backgroundColor: colors.gray,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: "100%",
  },
})

