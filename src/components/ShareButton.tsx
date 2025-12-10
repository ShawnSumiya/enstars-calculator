import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  type: 'event' | 'gacha'
  requiredYen: number
  laborHours: number
  targetCards?: number
  requiredDiamonds?: number
  requiredPlays?: number
  hours?: number
  minutes?: number
}

export function ShareButton({
  type,
  requiredYen,
  laborHours,
  targetCards,
  requiredDiamonds,
  requiredPlays,
  hours,
  minutes,
}: ShareButtonProps) {
  const shareText = () => {
    if (type === 'gacha') {
      return `私の推しガチャ${targetCards}枚完凸には、あと労働時間が${laborHours.toFixed(1)}時間必要でした...😇 #あんスタ労働計算機`
    } else {
      return `私の推しイベ完走には、あと労働時間が${laborHours.toFixed(1)}時間必要でした...😇 #あんスタ労働計算機`
    }
  }

  const handleShare = () => {
    const text = shareText()
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  return (
    <div className="gradient-card rounded-xl border border-gold/30 p-6 backdrop-blur-sm card-glow">
      <button
        onClick={handleShare}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 gradient-blue text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 relative overflow-hidden sparkle"
      >
        <Share2 className="h-5 w-5 relative z-10" />
        <span className="relative z-10">計算結果をXでシェアする</span>
      </button>
    </div>
  )
}

