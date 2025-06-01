/**　コミット時問題のurlを書く */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const Aarray = lines[1].split(' ').map(Number)

  const nSets = new Set<number>()
  for (let i = 0; i < Aarray.length; i++) {
    nSets.add(Aarray[i])
  }

  const sortedArray = [...nSets].sort((a, b) => a - b)

  console.log(sortedArray.length)

  let answer = ''
  for (let j = 0; j < sortedArray.length; j++) {
    answer += `${sortedArray[j]}`

    if (j !== sortedArray.length - 1) {
      answer += ' '
    }
  }

  /**　ロジックの実装 */
  return answer
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `3
7 7 7
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
