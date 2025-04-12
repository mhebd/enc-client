import type React from "react"

export const Avatar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", children, ...props }) => {
  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>
      {children}
    </div>
  )
}

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const AvatarImage: React.FC<AvatarImageProps> = ({ className = "", ...props }) => {
  // biome-ignore lint/a11y/useAltText: <explanation>
  return <img className={`aspect-square h-full w-full ${className}`} {...props} />
}

export const AvatarFallback: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`} {...props}>
      {children}
    </div>
  )
}
