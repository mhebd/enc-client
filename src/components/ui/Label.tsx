import type React from "react"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ className = "", ...props }) => {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
<label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  )
}
