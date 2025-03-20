interface IcebreakerLogoProps {
  className?: string
  size?: number
}

export function IcebreakerLogo({ className, size = 40 }: IcebreakerLogoProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div
        className="absolute bg-[#E59C45] rounded-full"
        style={{
          width: size * 0.6,
          height: size * 0.6,
          top: 0,
          right: 0,
        }}
      />
      <div
        className="absolute bg-[#5211CE] rounded-full border-2 border-white flex items-center justify-center"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          bottom: 0,
          left: 0,
        }}
      >
        <div
          className="absolute bg-[#5211CE] rounded-full"
          style={{
            width: size * 0.15,
            height: size * 0.15,
            top: "30%",
            left: "30%",
          }}
        />
        <div
          className="absolute bg-[#5211CE] rounded-full"
          style={{
            width: size * 0.15,
            height: size * 0.15,
            top: "30%",
            right: "30%",
          }}
        />
      </div>
    </div>
  )
}

