export function solve (input: string) {
  const lines = input.trim().split('\n')

  const [N, L, R] = lines[0].split(' ').map(Number)
  const S = lines[1]

  for (let i = L - 1; i <= R - 1; i++) {
    if (S[i] !== 'o') {
      console.log('No')
      return
    }
  }
  console.log('Yes')
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `10 6 8
xoxxooooxo

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
