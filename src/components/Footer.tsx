import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-navy-dark/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-gold fill-gold" />
            <span>for あんスタファン</span>
          </div>
          <p className="text-xs">
            © 2024 あんスタ計算ツール - 非公式ファンツール
          </p>
        </div>
      </div>
    </footer>
  )
}

