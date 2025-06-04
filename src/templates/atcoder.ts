export function solve (input: string) {
  const lines = input.trim().split('\n')
  /**　ロジックの実装 */
  return 0
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = ``
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  console.log(solve(testInput).toString())
}
// ローカル実行環境
else if (require.main === module) {
  const fs = require('fs')
  const input = fs.readFileSync(0, 'utf8') // 標準入力を直接読み取り
  console.log(solve(input).toString())
}
