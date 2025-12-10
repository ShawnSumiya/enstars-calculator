import { AlertTriangle } from 'lucide-react'
import { useMemo } from 'react'

interface LaborConversionProps {
  requiredYen: number
  hourlyWage: number
  onHourlyWageChange: (wage: number) => void
  type: 'event' | 'gacha'
  targetCards?: number
  requiredDiamonds?: number
}

export function LaborConversion({
  requiredYen,
  hourlyWage,
  onHourlyWageChange,
  type,
  targetCards,
  requiredDiamonds,
}: LaborConversionProps) {
  const laborData = useMemo(() => {
    const laborHours = requiredYen / hourlyWage
    const laborDays = laborHours / 24 // 不眠不休労働日数
    
    return {
      laborHours,
      laborDays,
      isHighCost: requiredYen >= 50000,
    }
  }, [requiredYen, hourlyWage])

  return (
    <div className="gradient-card rounded-xl border border-gold/30 p-6 backdrop-blur-sm card-glow">
      <h3 className="text-xl font-semibold text-gold mb-4 text-shadow-gold">現実の労働換算</h3>
      
      {/* 時給入力 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          あなたの時給（円）
        </label>
        <input
          type="number"
          value={hourlyWage}
          onChange={(e) => onHourlyWageChange(Number(e.target.value))}
          className="w-full px-4 py-2 bg-navy border border-gold/30 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent focus:shadow-lg focus:shadow-gold/20 transition-all"
          min="1"
        />
      </div>

      {/* 労働換算結果 */}
      <div className={`gradient-card rounded-lg border-2 p-6 card-glow relative overflow-hidden ${
        laborData.isHighCost
          ? 'border-red-500/70 ring-2 ring-red-500/50'
          : 'border-gold/50 ring-2 ring-gold/30'
      }`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${
          laborData.isHighCost
            ? 'from-red-900/40 via-red-900/20 to-transparent'
            : 'from-gold/10 via-gold/5 to-transparent'
        }`}></div>
        <div className="relative z-10">
          {laborData.isHighCost && (
            <div className="flex items-center gap-2 mb-4 text-red-400">
              <AlertTriangle className="h-5 w-5 animate-pulse" />
              <span className="font-bold text-lg text-shadow-gold">警告: 高額な支出が予想されます</span>
            </div>
          )}
          
          <div className="space-y-3">
            <div className={`text-lg ${
              laborData.isHighCost ? 'text-red-300' : 'text-gray-300'
            }`}>
              <span className="font-semibold">労働換算: </span>
              <span className={`font-bold text-2xl text-shadow-gold ${
                laborData.isHighCost ? 'text-red-400' : 'text-gold'
              }`}>
                {laborData.laborHours.toFixed(1)}
              </span>
              <span className="ml-2">時間分のバイトが必要です</span>
            </div>
            
            <div className={`text-lg ${
              laborData.isHighCost ? 'text-red-300' : 'text-gray-300'
            }`}>
              <span className="font-semibold">必要金額: </span>
              <span className={`font-bold text-2xl text-shadow-gold ${
                laborData.isHighCost ? 'text-red-400' : 'text-gold'
              }`}>
                ¥{requiredYen.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 警告エリア（収益化導線） */}
      {laborData.isHighCost && (
        <div className="mt-4 rounded-lg border-2 border-red-500 bg-gradient-to-br from-red-900/60 via-red-800/50 to-red-900/60 p-6 shadow-lg ring-2 ring-red-500/50">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 text-red-200">
              <AlertTriangle className="h-6 w-6 animate-pulse text-red-400" />
              <span className="text-lg font-bold">
                警告：労働時間が危険水域です。ポイ活で軍資金を調達してください
              </span>
            </div>
            <a
              href="https://example.com/poi-act"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <span>ポイ活で軍資金を調達する</span>
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* ライト訴求エリア（安心色） */}
      {!laborData.isHighCost && requiredYen > 0 && (
        <div className="mt-4 rounded-lg border-2 border-emerald-300/70 bg-gradient-to-br from-emerald-900/40 via-emerald-800/30 to-emerald-900/40 p-6 shadow-lg ring-1 ring-emerald-300/50">
          <div className="flex flex-col items-center gap-3 text-center text-emerald-100">
            <span className="text-lg font-semibold">
              課金資金の足しに... Amazonギフト券で少しでもお得に！
            </span>
            <a
              href="https://www.amazon.co.jp/dp/B004N3APGO?tag=affiliate-id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-emerald-400 px-6 py-3 font-bold text-white shadow-lg transition-all hover:from-sky-600 hover:to-emerald-500 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <span>Amazonギフト券をチェック</span>
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            <p className="text-xs text-emerald-200/80">
              ※アフィリエイトリンクを含みます。お得情報としてご活用ください。
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

