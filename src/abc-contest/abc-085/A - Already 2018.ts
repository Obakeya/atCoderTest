/**　コミット時問題のurlを書く */
export function solve (input: string) {
  const line = input.trim()

  return '2018' + line.slice(4, line.length)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `2017/01/31
`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  console.log(solve(testInput).toString())
}
// ローカル実行環境
else if (require.main === module) {
  const fs = require('fs')
  const input = fs.readFileSync(0, 'utf8') // 標準入力を直接読み取り
  console.log(solve(input).toString())
}
