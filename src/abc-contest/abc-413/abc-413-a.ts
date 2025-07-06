export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, M] = lines[0].split(' ').map(Number)
  const Ai = lines[1].split(' ').map(Number)
  let currentSize = 0

  for (const a of Ai) {
    currentSize += a
    if (M < currentSize) {
      console.log('No')
      return
    }
  }
  console.log('Yes')
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `1 10000
100

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
