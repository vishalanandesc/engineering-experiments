import { CSSProperties } from "react"

export function dashedBorder(
  side: "t" | "b" | "l" | "r" | "x" | "y" = "b",
  color: string = "#CBCBCB",
  width: number = 1
): CSSProperties {
  // Map sides to border sides
  const borderSides: Record<string, string[]> = {
    t: ["borderTop"],
    b: ["borderBottom"],
    l: ["borderLeft"],
    r: ["borderRight"],
    x: ["borderLeft", "borderRight"],
    y: ["borderTop", "borderBottom"],
  }

  // Adjust gradient direction based on side
  const angle = side === "t" || side === "b" || side === "y" ? "90deg" : "0deg"
  
  const style: CSSProperties = {
    borderImage: `repeating-linear-gradient(${angle}, ${color} 0, ${color} 6px, transparent 6px, transparent 12px) 1`,
  }

  // Apply border width to appropriate sides
  borderSides[side].forEach((borderSide) => {
    if (borderSide === "borderTop" || borderSide === "borderBottom" || 
        borderSide === "borderLeft" || borderSide === "borderRight") {
      style[borderSide] = `${width}px solid transparent`
    }
  })

  return style
}
