export type IconColor = "blue" | "gray";

export const colorMap: Record<IconColor, string> = {
  blue: "#007AFF",
  gray: "#A2ACB0",
};

export interface IconBaseProps {
  color?: IconColor;
}
