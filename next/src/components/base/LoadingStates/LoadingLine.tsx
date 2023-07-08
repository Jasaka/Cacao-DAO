export interface LoadingLineProps {
  height?: "sm" | "md" | "lg"
  width?: "sm" | "md" | "lg"
  className?: string

}

export function LoadingLine({ height = "md", width = "md", className }: LoadingLineProps) {
  const sizeClass = height === "sm" ? "h-2.5" : height === "md" ? "h-4" : "h-8"
  const widthClass = width === "sm" ? "w-8" : width === "md" ? "w-1/2" : "w-full"

  return (
    <div role="status" className="flex flex-row animate-pulse w-full">
      <div className={className + " bg-gray-200 rounded-full dark:bg-gray-400 w-full " + sizeClass + " " + widthClass} />
      <span className="sr-only">Loading...</span>
    </div>
  )
}