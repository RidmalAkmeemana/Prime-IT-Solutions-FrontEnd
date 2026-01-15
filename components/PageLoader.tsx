"use client"

import Image from "next/image"

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <Image
        src="/Logo.png"
        alt="Loading..."
        width={180}
        height={180}
        priority
        className="animate-pulse"
      />
    </div>
  )
}
