export function solve (input: string) {
  const lines = input.trim().split('\n')
  const p = lines[1].split(' ').map(Number)

  let answer = 0
  for (let i = 1; i < p.length - 1; i++) {
    if (
      (p[i - 1] < p[i] && p[i] < p[i + 1]) ||
      (p[i + 1] < p[i] && p[i] < p[i - 1])
    )
      answer++
  }
  /**　ロジックの実装 */
  console.log(answer)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `9
9 6 3 2 5 8 7 4 1
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
