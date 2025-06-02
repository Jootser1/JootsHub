import Image from 'next/image'

interface LevelProgressProps {
  level: number
  current: number
  max: number
  icon?: React.ReactNode
}

export function LevelProgress({ level, current, max }: LevelProgressProps) {
  const progress = Math.min(100, Math.round((current / max) * 100))

  return (
    <div className='flex flex-col justify-between rounded-3xl max-w-md relative'>
      {/* Niveau et Trophée */}
      <div className='flex items-center justify-between rounded-3xl p-1'>
        <p className='text-lg font-bold text-gray-800'>Niveau {level}</p>
        <div className='flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg right-0'>
          <Image
            src='/trophee.png'
            alt='Trophée'
            width={45}
            height={45}
            className='align-center content-center'
          />
        </div>
      </div>

      {/* Barre */}
      <div className='w-50 h-5 rounded-full bg-gray-200 overflow-hidden border-4 border-gray-600'>
        <div
          className='h-full bg-orange-500 rounded-full transition-all duration-300 ease-out '
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Nombre de points */}
      <div className='flex justify-end pr-2'>
        <p className='text-sm text-gray-600 text-right'>
          {current} / {max}
        </p>
      </div>
    </div>
  )
}
