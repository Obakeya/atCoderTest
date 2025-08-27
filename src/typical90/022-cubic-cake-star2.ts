/**
 * 問題メモ:
 * 直方体ケーキ(A×B×C)を面に平行に切断して、すべてのピースを立方体にする最小操作回数
 * 最終的な立方体の一辺 = GCD(A,B,C)
 * 各方向の切断回数 = (長さ/GCD - 1)
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [A, B, C] = lines[0].split(' ').map(BigInt)

  // ユーグリッドの互除法でGCDを計算
  function gcd (a: bigint, b: bigint): bigint {
    while (b !== 0n) {
      ;[a, b] = [b, a % b]
    }
    return a
  }

  // 3つの数のGCDを求める
  const g = gcd(gcd(A, B), C)

  // 各方向の切断回数の合計
  const ans = A / g + B / g + C / g - 3n

  console.log(ans.toString())
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
  1000000000000000000 999999999999999999 999999999999999998
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
