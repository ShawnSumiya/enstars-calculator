import { Star } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-gold/20 bg-navy-dark/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-gold fill-gold animate-pulse" />
            <h1 className="text-2xl font-bold text-gold text-shadow-gold">
              あんスタ計算ツール
            </h1>
          </div>
          <p className="text-sm text-gray-400 hidden sm:block">
            あんさんぶるスターズ！！Music
          </p>
        </div>
      </div>
    </header>
  )
}

