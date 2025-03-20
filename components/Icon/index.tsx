import type React from "react"
import type { FC } from "react"
import { FontAwesome } from "@expo/vector-icons"
import type { IconProps } from "@expo/vector-icons/build/createIconSet"
import { colors } from "@constants/colors"

export const Icon: FC<IconProps<React.ComponentProps<typeof FontAwesome>["name"]>> = ({
  size = 20,
  color = colors.white,
  ...rest
}) => {
  // @ts-ignore
  return <FontAwesome size={size} color={color} {...rest} />
}

