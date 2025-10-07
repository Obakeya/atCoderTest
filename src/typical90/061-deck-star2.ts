/**　問題メモ */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const Q = +lines[0]

  const deck = []
  const ans = []

  for (let i = 1; i < lines.length; i++) {
    const [t, x] = lines[i].split(' ').map(Number)

    if (t === 1) deck.unshift(x)
    else if (t === 2) deck.push(x)
    else ans.push(deck[x - 1])
  }

  /**　ロジックの実装 */

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
6
1 1000000000
2 200000000
1 30000000
2 4000000
1 500000
3 3

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
