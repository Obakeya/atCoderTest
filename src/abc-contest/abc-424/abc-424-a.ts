/**　問題メモ */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [a, b, c] = lines[0].split(' ')

  let ans = 'No'

  if (a === b || b === c || c === a) ans = 'Yes'

  /**　ロジックの実装 */

  console.log(ans)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
10 10 10

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
