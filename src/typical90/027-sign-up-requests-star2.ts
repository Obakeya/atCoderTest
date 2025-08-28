/**　問題メモ */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]

  const sets = new Set<string>()
  const ans = []
  for (let i = 1; i < lines.length; i++) {
    if (!sets.has(lines[i])) {
      ans.push(i)
      sets.add(lines[i])
    }
  }

  /**　ロジックの実装 */

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
10
square869120
square869120
square869120
square869120
square869120
square869120
square869120
square869120
square869120
square869120

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
