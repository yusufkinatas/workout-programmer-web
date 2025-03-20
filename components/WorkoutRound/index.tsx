import type { Round } from "@constants/types"
import { FlatList, StyleSheet, View } from "react-native"
import { Text } from "@components/Text"
import { WorkoutExercise } from "@components/WorkoutExercise"
import Spacer from "@components/Spacer"
import { layout } from "@constants/layout"

interface Props {
  round: Round
}

export const WorkoutRound = ({ round }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text align="center" size={42} style={styles.header}>
        {round.name}
      </Text>
      <FlatList
        data={round.exercises}
        keyExtractor={(_, i) => i.toString()}
        renderItem={(i) => <WorkoutExercise exercise={i.item} />}
        ItemSeparatorComponent={() => <Spacer height={12} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
  },
  wrapper: {
    paddingHorizontal: 8,
    width: layout.width,
  },
})

