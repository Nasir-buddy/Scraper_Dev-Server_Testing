
import type React from "react"

import { useState } from "react"

interface HoverCardProps {
  children: React.ReactNode
  content: string
}

export default function HoverCard({ children, content }: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span className="relative inline-block">
      <span
        className="underline cursor-pointer text-blue-600"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </span>
      {isHovered && (
        <div className="absolute z-10 w-64 p-4 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="text-sm text-gray-700">{content}</div>
        </div>
      )}
    </span>
  )
}

