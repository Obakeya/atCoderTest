/**　問題メモ */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  //N人、M回投票
  const [N, M] = lines[0].split(' ').map(Number)

  const ans = []

  /**　投票ごとの得点をカウントし、
   *  投票ごとに、人ごとに得点数をカウントする
   * カウントのmax値を記録して起き、最後にmax値と同じ人を答えとして配列に登録する
   *
   */

  //人ごとのカウントを実施
  const points = Array(N + 1).fill(0)

  let currentMaxPoint = -1
  //投票回...M回目まで繰り返す
  for (let i = 0; i < M; i++) {
    let x = 0
    let y = 0
    //i回目の投票の集計をする
    for (let j = 1; j <= N; j++) {
      //j人目を表現する
      const submit = +lines[j][i]

      if (submit === 0) x++
      else if (submit === 1) y++
    }

    //得点設定のループ
    for (let k = 1; k < points.length; k++) {
      if (x === 0 && y === 0) {
        points[k] += 1
      } else if (x < y) {
        const submit = +lines[k][i]

        if (submit === 0) points[k] += 1
      } else {
        const submit = +lines[k][i]

        if (submit === 1) points[k] += 1
      }

      if (currentMaxPoint < points[k]) currentMaxPoint = points[k]
    }
  }

  //回答用意のループ
  for (let l = 1; l < points.length; l++) {
    if (points[l] === currentMaxPoint) ans.push(l)
  }

  console.log(ans.join(' '))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
7 8
11010011
01000000
01111100
10111000
10011110
10100101
10010110

`.trim()
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
