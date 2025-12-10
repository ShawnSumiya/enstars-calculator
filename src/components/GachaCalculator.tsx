import { Sparkles } from 'lucide-react'
import { useState, useMemo } from 'react'
import { LaborConversion } from './LaborConversion'
import { ShareButton } from './ShareButton'

// ガチャ定数
const DIAMONDS_PER_GACHA = 35
const PICKUP_RATE = 0.01 // 1%
const CEILING_PULLS = 300 // 天井
const DIAMOND_PRICE = 1.5 // ダイヤ1個あたりの金額（円）

export function GachaCalculator() {
  const [targetCards, setTargetCards] = useState(1)
  const [currentDiamonds, setCurrentDiamonds] = useState(0)
  const [hourlyWage, setHourlyWage] = useState(1226)

  // ガチャ計算ロジック
  const calculations = useMemo(() => {
    // 期待値計算: ピックアップ率1%で、欲しい枚数を獲得するのに必要な期待ガチャ回数
    // 簡略化: 期待値 = 欲しい枚数 / ピックアップ率
    // ただし、天井を考慮（天井で1枚確定）
    
    // 天井までにピックアップが当たる期待枚数
    const expectedCardsBeforeCeiling = CEILING_PULLS * PICKUP_RATE // 3枚
    
    let expectedPulls = 0
    let remainingCards = targetCards
    
    // 天井を考慮した計算
    while (remainingCards > 0) {
      if (remainingCards <= expectedCardsBeforeCeiling) {
        // 天井に到達する前に期待値で獲得できる
        expectedPulls += remainingCards / PICKUP_RATE
        remainingCards = 0
      } else {
        // 天井に到達する
        expectedPulls += CEILING_PULLS
        // 天井で1枚確定 + 天井までに期待値で獲得できる枚数
        remainingCards -= (expectedCardsBeforeCeiling + 1)
      }
    }
    
    // 必要ダイヤ数（切り上げ）
    const requiredDiamonds = Math.ceil(expectedPulls * DIAMONDS_PER_GACHA)
    
    // 追加で必要なダイヤ数
    const additionalDiamonds = Math.max(0, requiredDiamonds - currentDiamonds)
    
    // 必要金額（円）
    const requiredYen = additionalDiamonds * DIAMOND_PRICE
    
    return {
      expectedPulls: Math.ceil(expectedPulls),
      requiredDiamonds,
      additionalDiamonds,
      requiredYen,
    }
  }, [targetCards, currentDiamonds])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="h-8 w-8 text-gold glow-gold" />
        <h2 className="text-3xl font-bold text-gold text-shadow-gold">ガチャ計算</h2>
      </div>

      {/* 入力フォーム */}
      <div className="gradient-card rounded-xl border border-gold/30 p-6 backdrop-blur-sm card-glow">
        <h3 className="text-xl font-semibold text-gold mb-4">計算に必要な入力項目</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 欲しいカードの枚数 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              欲しいカードの枚数
            </label>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5].map((count) => (
                <button
                  key={count}
                  onClick={() => setTargetCards(count)}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-300 relative overflow-hidden ${
                    targetCards === count
                      ? 'gradient-gold text-navy shadow-lg scale-105'
                      : 'bg-navy border border-gold/30 text-gray-300 hover:bg-gold/20 hover:border-gold/50 hover:shadow-md'
                  }`}
                >
                  {targetCards === count && <span className="absolute inset-0 sparkle"></span>}
                  <span className="relative z-10">{count}枚{count === 5 && '（完凸）'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 現在の所持ダイヤ数 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              現在の所持ダイヤ数
            </label>
            <input
              type="number"
              value={currentDiamonds}
              onChange={(e) => setCurrentDiamonds(Number(e.target.value))}
              className="w-full px-4 py-2 bg-navy border border-gold/30 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent focus:shadow-lg focus:shadow-gold/20 transition-all"
              min="0"
            />
          </div>
        </div>

        {/* ガチャ定数表示 */}
        <div className="mt-6 pt-4 border-t border-gold/20">
          <h4 className="text-sm font-medium text-gray-300 mb-2">ガチャ設定</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
            <div>1回 = {DIAMONDS_PER_GACHA}ダイヤ</div>
            <div>★5排出率 = 3%</div>
            <div>ピックアップ率 = 1%</div>
            <div>天井 = {CEILING_PULLS}連</div>
          </div>
        </div>
      </div>

      {/* 結果表示 */}
      <div className="gradient-card rounded-xl border border-gold/30 p-6 backdrop-blur-sm card-glow">
        <h3 className="text-xl font-semibold text-gold mb-4 text-shadow-gold">計算結果</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 期待ガチャ回数 */}
          <div className="gradient-card rounded-lg border border-gold/30 p-5 card-glow relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent"></div>
            <div className="relative z-10">
              <div className="text-sm text-gray-400 mb-2">期待ガチャ回数</div>
              <div className="text-3xl font-bold text-gold text-shadow-gold">
                {calculations.expectedPulls.toLocaleString()}
                <span className="text-xl text-gray-300 ml-2">回</span>
              </div>
            </div>
          </div>

          {/* 追加で必要なダイヤ数 */}
          <div className="gradient-card rounded-lg border border-gold/30 p-5 card-glow relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent"></div>
            <div className="relative z-10">
              <div className="text-sm text-gray-400 mb-2">追加で必要なダイヤ数</div>
              <div className="text-3xl font-bold text-gold text-shadow-gold">
                {calculations.additionalDiamonds.toLocaleString()}
                <span className="text-xl text-gray-300 ml-2">個</span>
              </div>
            </div>
          </div>

          {/* 必要金額（強調） */}
          <div className={`gradient-card rounded-lg border-2 p-5 card-glow relative overflow-hidden ring-2 ${
            calculations.requiredYen >= 50000
              ? 'border-red-500/70 ring-red-500/50'
              : 'border-gold/50 ring-gold/30'
          }`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${
              calculations.requiredYen >= 50000
                ? 'from-red-900/30 to-transparent'
                : 'from-gold/20 via-gold/10 to-transparent'
            }`}></div>
            <div className="relative z-10">
              <div className="text-sm text-gray-400 mb-2">必要金額</div>
              <div className={`text-4xl font-bold text-shadow-gold ${
                calculations.requiredYen >= 50000 ? 'text-red-400' : 'text-gold'
              }`}>
                ¥{calculations.requiredYen.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* 補足情報 */}
        <div className="mt-6 pt-4 border-t border-gold/20">
          <div className="text-sm text-gray-400 space-y-1">
            <div>総必要ダイヤ数: {calculations.requiredDiamonds.toLocaleString()}個</div>
            <div className="text-xs text-gray-500 mt-2">
              ※ 期待値計算による概算です。実際の結果は確率により変動します。
              <br />
              ※ ダイヤ1個 = {DIAMOND_PRICE}円換算
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
        type="gacha"
        laborHours={calculations.requiredYen / hourlyWage}
        targetCards={targetCards}
      />
    </div>
  )
}

