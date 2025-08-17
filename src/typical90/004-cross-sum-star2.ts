/**　行と列が高々2000
 * 各行と各列の合計値を求めた後、各セルについてもう一度探索し、
 * 各行の和 + 各列の和 - 自身の値
 * で求めることができそう
 *https://atcoder.jp/contests/typical90/tasks/typical90_d
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [H, W] = lines[0].split(' ').map(Number)
  const rowsSum = Array(H).fill(0)
  const columnsSum = Array(W).fill(0)

  let answerArray: number[][] = Array.from({ length: H }, () => [])
  for (let i = 1; i < lines.length; i++) {
    const rowValues = lines[i].split(' ').map(Number)
    let currentRowsSum = 0
    for (let j = 0; j < rowValues.length; j++) {
      currentRowsSum += rowValues[j]
      columnsSum[j] += rowValues[j]
      answerArray[i - 1].push(rowValues[j])
    }
    rowsSum[i - 1] = currentRowsSum
  }

  //回答の用意

  for (let k = 0; k < H; k++) {
    for (let j = 0; j < W; j++) {
      answerArray[k][j] = rowsSum[k] + columnsSum[j] - answerArray[k][j]
    }
    console.log(answerArray[k].join(' '))
  }

  /**　ロジックの実装 */
  console.log('')
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `10 10
83 86 77 65 93 85 86 92 99 71
62 77 90 59 63 76 90 76 72 86
61 68 67 79 82 80 62 73 67 85
79 52 72 58 69 67 93 56 61 92
79 73 71 69 84 87 98 74 65 70
63 76 91 80 56 73 62 70 96 81
55 75 84 77 86 55 96 79 63 57
74 95 82 95 64 67 84 64 93 50
87 58 76 78 88 84 53 51 54 99
82 60 76 68 89 62 76 86 94 89
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
