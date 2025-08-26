/**　問題メモ */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [X, Y] = lines[0].split(' ').map(Number)
  let sum = X + Y
  if (12 < sum) sum -= 12

  const ans = []
  ans.push(sum)

  /**　ロジックの実装 */

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
5 9

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
