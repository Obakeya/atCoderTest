/**　コミット時問題のurlを書く */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [NKnock, SSleep] = lines[0].split(' ').map(Number)
  const Ti = lines[1].split(' ').map(Number)

  let lastSecond = 0
  for (let i = 0; i < Ti.length; i++) {
    //寝ているかチェック
    const passedSecond = Ti[i] - lastSecond
    if (passedSecond < SSleep + 0.5) {
      //寝てない
      lastSecond = Ti[i]
    } else {
      return 'No'
    }
  }
  /**　ロジックの実装 */
  return 'Yes'
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `10 22
47 81 82 95 117 146 165 209 212 215

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
