export function solve (input: string) {
  const N = +input.trim()
  if (N <= 125) {
    console.log(4)
  } else if (126 <= N && N <= 211) {
    console.log(6)
  } else {
    console.log(8)
  }
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `126

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
