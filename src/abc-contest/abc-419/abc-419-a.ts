export function solve (input: string) {
  const lines = input.trim().split('\n')

  const target = lines[0]

  let ans = 'Unknown'
  if (target === 'red') ans = 'SSS'
  else if (target === 'blue') ans = 'FFF'
  else if (target === 'green') ans = 'MMM'

  console.log(ans)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `atcoder
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
