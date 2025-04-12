export default function Loader({size = 16, color = "#3b82f6"}: {size?: number; color?: string}) {
  return (
    <div className={"animate-spin rounded-full border-b-2 border-t-transparent"} style={{borderColor: color, width: size, height: size}} />
  )
}
