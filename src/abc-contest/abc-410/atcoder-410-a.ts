export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  const A = lines[1].split(' ').map(Number)
  const K = +lines[2]

  let count = 0
  for (let i = 0; i < A.length; i++) {
    if (K <= A[i]) count++
  }

  /**　ロジックの実装 */
  console.log(count)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `15
18 89 31 2 15 93 64 78 58 19 79 59 24 50 30
38

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
