import Image from "next/image"

interface JootsLogoProps {
  className?: string
}

export function JootsLogo({ className }: JootsLogoProps) {
  return <Image src="/joots_logo.png" alt="JOOTS Logo" width={300} height={100} className={className} priority />
}

