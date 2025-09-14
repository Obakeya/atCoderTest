/**　問題メモ
 * 1000円ごとに手数料がかかる
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [X, C] = lines[0].split(' ').map(Number)

  const fee = Math.floor(X / 1000) * C

  let hikidashi = getFeeBase(X) * 1000
  let remain = -1

  while (true) {
    const fee = getFeeBase(hikidashi) * C

    remain = X - hikidashi - fee

    if (remain >= 0 || hikidashi < 1000) break
    hikidashi -= 1000
  }

  function getFeeBase (num: number) {
    if (num < 1000) return 0

    const numStr = num.toString()

    return +numStr.slice(0, -3)
  }

  /**　ロジックの実装 */
  if (hikidashi < 1000) console.log(0)
  else console.log(hikidashi)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
10000000 24

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
