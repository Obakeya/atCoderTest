/**
 * 問題メモ:
 * 長さ2Nの文字列でA、Bが各N個含まれている
 * 隣接文字の入れ替えで同じ文字が隣り合わない状態にする最小操作数を求める
 * 最終形態はABABAB...またはBABABA...の2パターンのみ
 *
 * Aの出現だけみておき、それがAB配置のパターン、BA配置のパターンにおける
 * Aの出現箇所まで配置させる場合のコストを数えていく
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = lines[0]
  const S = lines[1]
  const n = +N

  let countA = 0 // A文字のインデックス（何番目のAか）
  let costPatternA = 0 // ABABAB...パターンのコスト
  let costPatternB = 0 // BABABA...パターンのコスト

  for (let i = 0; i < 2 * n; i++) {
    if (S[i] !== 'A') continue // B文字はスキップ

    // ABABAB...パターン: A文字は偶数位置(0,2,4...)に配置
    const targetPosA = 2 * countA
    costPatternA += Math.abs(i - targetPosA)

    // BABABA...パターン: A文字は奇数位置(1,3,5...)に配置
    const targetPosB = 2 * countA + 1
    costPatternB += Math.abs(i - targetPosB)

    countA++
  }

  console.log(Math.min(costPatternA, costPatternB))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
3
AABBBA
`.trim()
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  solve(testInput)
}
// ローカル実行環境
else if (require.main === module) {
  const fs = require('fs')
  const input = fs.readFileSync(0, 'utf8') // 標準入力を直接読み取り
  solve(input)
}
