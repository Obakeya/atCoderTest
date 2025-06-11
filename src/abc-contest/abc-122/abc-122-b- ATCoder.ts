export function solve (input: string) {
  const line = input.trim()
  let maxCount = 0
  let currentCount = 0
  // Sは最大の文字列の長さは10なので、全探索で問題なし
  for (let i = 0; i < line.length; i++) {
    if (
      line[i] === 'A' ||
      line[i] === 'C' ||
      line[i] === 'G' ||
      line[i] === 'T'
    )
      currentCount++
    else currentCount = 0

    if (maxCount < currentCount) maxCount = currentCount
  }
  /**　ロジックの実装 */
  console.log(maxCount)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `HATAGAYA

`
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
