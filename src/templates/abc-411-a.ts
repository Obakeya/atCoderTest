export function solve (input: string) {
  const lines = input.trim().split('\n')
  const p = lines[0]
  const l = +lines[1]

  if (p.length >= l) console.log('Yes')
  else console.log('No')
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `atcoder
7

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
