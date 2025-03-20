import type { FC } from "react"
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native"

interface PressableOpacityProps extends PressableProps {
  style?: StyleProp<ViewStyle>
}

export const PressableOpacity: FC<PressableOpacityProps> = ({ style, ...rest }) => {
  return <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, style]} {...rest} />
}

