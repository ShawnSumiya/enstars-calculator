import { Calculator } from 'lucide-react'
import { useState, useMemo } from 'react'
import { LaborConversion } from './LaborConversion'
import { ShareButton } from './ShareButton'

const DIAMOND_PRICE = 1.5 // ダイヤ1個あたりの金額（円）

export function EventCalculator() {
  const [targetPoints, setTargetPoints] = useState(3500000)
  const [currentPoints, setCurrentPoints] = useState(0)
  const [bonusPercent, setBonusPercent] = useState(50)
  const [playTimePerSong, setPlayTimePerSong] = useState(3)
  const [bpCost, setBpCost] = useState(10)
  const [hourlyWage, setHourlyWage] = useState(1226)

  // 計算ロジック
  const calculations = useMemo(() => {
    // 基礎イベントpt: 約2,500pt (BP1消費時)
    const basePoints = 2500
    
    // BP倍率
    const bpMultiplier = bpCost
    
    // 特効計算: (基礎pt × BP倍率) × (1 + 特効%/100)
    const pointsPerSong = basePoints * bpMultiplier * (1 + bonusPercent / 100)
    
    // 残り必要ポイント
    const remainingPoints = Math.max(0, targetPoints - currentPoints)
    
    // 残り必要周回数（切り上げ）
    const requiredPlays = remainingPoints > 0 ? Math.ceil(remainingPoints / pointsPerSong) : 0
    
    // 必要プレイ時間（分）
    const totalMinutes = requiredPlays * playTimePerSong
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    
    // 必要な回復ダイヤ数（BP1回復=ダイヤ2個）
    const requiredDiamonds = requiredPlays * bpCost * 2
    
    // 必要金額（円）
    const requiredYen = requiredDiamonds * DIAMOND_PRICE
    
    return {
      pointsPerSong,
      remainingPoints,
      requiredPlays,
      hours,
      minutes,
      totalMinutes,
      requiredDiamonds,
      requiredYen,
    }
  }, [targetPoints, currentPoints, bonusPercent, playTimePerSong, bpCost])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-8 w-8 text-gold glow-gold" />
        <h2 className="text-3xl font-bold text-gold text-shadow-gold">イベント計算</h2>
      </div>

      {/* 入力フォーム */}
      <div className="gradient-card rounded-xl border border-gold/30 p-6 backdrop-blur-sm card-glow">
        <h3 className="text-xl font-semibold text-gold mb-4">計算に必要な入力項目</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 目標ポイント */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              目標ポイント
            </label>
            <input
              type="number"
              value={targetPoints}
              onChange={(e) => setTargetPoints(Number(e.target.value))}
              className="w-full px-4 py-2 bg-navy border border-gold/30 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent focus:shadow-lg focus:shadow-gold/20 transition-all"
              min="0"
            />
          </div>

          {/* 現在のポイント */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              現在のポイント
            </label>
            <input
              type="number"
              value={currentPoints}
              onChange={(e) => setCurrentPoints(Number(e.target.value))}
              className="w-full px-4 py-2 bg-navy border border-gold/30 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent focus:shadow-lg focus:shadow-gold/20 transition-all"
              min="0"
            />
          </div>

          {/* イベント特効ボーナス */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              イベント特効ボーナス (%)
            </label>
            <input
              type="number"
              value={bonusPercent}
              onChange={(e) => setBonusPercent(Number(e.target.value))}
              className="w-full px-4 py-2 bg-navy border border-gold/30 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent focus:shadow-lg focus:shadow-gold/20 transition-all"
              min="0"
            />
          </div>

          {/* 1曲あたりのプレイ時間 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              1曲あたりのプレイ時間 (分)
            </label>
            <input
              type="number"
              value={playTimePerSong}
              onChange={(e) => setPlayTimePerSong(Number(e.target.value))}
              className="w-full px-4 py-2 bg-navy border border-gold/30 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent focus:shadow-lg focus:shadow-gold/20 transition-all"
              min="1"
              step="0.5"
            />
          </div>

          {/* 消費BP */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              消費BP
            </label>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 6, 10].map((bp) => (
                <button
                  key={bp}
                  onClick={() => setBpCost(bp)}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-300 relative overflow-hidden ${
                    bpCost === bp
                      ? 'gradient-gold text-navy shadow-lg scale-105'
                      : 'bg-navy border border-gold/30 text-gray-300 hover:bg-gold/20 hover:border-gold/50 hover:shadow-md'
                  }`}
                >
                  {bpCost === bp && <span className="absolute inset-0 sparkle"></span>}
                  <span className="relative z-10">{bp}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 1曲のスコアランク（固定表示） */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              1曲のスコアランク
            </label>
            <div className="px-4 py-2 bg-navy/50 border border-gold/20 rounded-md text-gray-400">
              S+（固定）
            </div>
          </div>
        </div>
      </div>

      {/* 結果表示 */}
      <div className="gradient-card rounded-xl border border-gold/30 p-6 backdrop-blur-sm card-glow">
        <h3 className="text-xl font-semibold text-gold mb-4 text-shadow-gold">計算結果</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 残り必要周回数 */}
          <div className="gradient-card rounded-lg border border-gold/30 p-5 card-glow relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent"></div>
            <div className="relative z-10">
              <div className="text-sm text-gray-400 mb-2">残り必要周回数</div>
              <div className="text-3xl font-bold text-gold text-shadow-gold">
                {calculations.requiredPlays.toLocaleString()}
                <span className="text-xl text-gray-300 ml-2">回</span>
              </div>
            </div>
          </div>

          {/* 必要時間 */}
          <div className="gradient-card rounded-lg border border-gold/30 p-5 card-glow relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent"></div>
            <div className="relative z-10">
              <div className="text-sm text-gray-400 mb-2">必要時間</div>
              <div className="text-3xl font-bold text-gold text-shadow-gold">
                {calculations.hours > 0 && `${calculations.hours}時間`}
                {calculations.hours > 0 && calculations.minutes > 0 && ' '}
                {calculations.minutes > 0 && `${calculations.minutes}分`}
                {calculations.hours === 0 && calculations.minutes === 0 && '0分'}
              </div>
            </div>
          </div>

          {/* 必要な回復ダイヤ数 */}
          <div className="gradient-card rounded-lg border border-gold/30 p-5 card-glow relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent"></div>
            <div className="relative z-10">
              <div className="text-sm text-gray-400 mb-2">必要な回復ダイヤ数</div>
              <div className="text-3xl font-bold text-gold text-shadow-gold">
                {calculations.requiredDiamonds.toLocaleString()}
                <span className="text-xl text-gray-300 ml-2">個</span>
              </div>
            </div>
          </div>
        </div>

        {/* 補足情報 */}
        <div className="mt-6 pt-4 border-t border-gold/20">
          <div className="text-sm text-gray-400 space-y-1">
            <div>1曲あたりの獲得ポイント: {calculations.pointsPerSong.toLocaleString(undefined, { maximumFractionDigits: 0 })}pt</div>
            <div>残り必要ポイント: {calculations.remainingPoints.toLocaleString()}pt</div>
            <div>
              必要プレイ時間: {calculations.hours > 0 && `${calculations.hours}時間`}
              {calculations.hours > 0 && calculations.minutes > 0 && ' '}
              {calculations.minutes > 0 && `${calculations.minutes}分`}
              {calculations.hours === 0 && calculations.minutes === 0 && '0分'}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              ※ 自然回復は考慮せず、すべてダイヤで回復した場合の最大値を表示しています（BP1回復=ダイヤ2個）
            </div>
          </div>
        </div>
      </div>

      {/* 労働換算 */}
      <LaborConversion 
        requiredYen={calculations.requiredYen} 
        hourlyWage={hourlyWage}
        onHourlyWageChange={setHourlyWage}
      />

      {/* SNSシェア */}
      <ShareButton
        type="event"
        laborHours={calculations.requiredYen / hourlyWage}
      />
    </div>
  )
}

