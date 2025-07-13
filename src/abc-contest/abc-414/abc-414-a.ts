export function solve (input: string) {
  const lines = input.trim().split('\n')
  /**　ロジックの実装 */

  const [N, L, R] = lines[0].split(' ').map(Number)
  let count = 0

  for (let i = 1; i < lines.length; i++) {
    const [x, y] = lines[i].split(' ').map(Number)
    if (x <= L && R <= y) count++
  }

  console.log(count)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `10 8 14
5 20
14 21
9 21
5 23
8 10
0 14
3 8
2 6
0 16
5 20


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
