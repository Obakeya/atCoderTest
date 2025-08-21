/**　https://atcoder.jp/contests/typical90/tasks/typical90_j */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  const oneAccum = Array(N + 1).fill(0)
  const twoAccum = Array(N + 1).fill(0)

  for (let i = 1; i <= N; i++) {
    const [c, p] = lines[i].split(' ').map(Number)
    if (c === 1) {
      oneAccum[i] = oneAccum[i - 1] + p
      twoAccum[i] = twoAccum[i - 1]
    } else {
      oneAccum[i] = oneAccum[i - 1]
      twoAccum[i] = twoAccum[i - 1] + p
    }
  }

  const answer = []

  for (let j = N + 2; j < lines.length; j++) {
    const [L, R] = lines[j].split(' ').map(Number)
    const oneAnswer = oneAccum[R] - oneAccum[L - 1]
    const twoAnswer = twoAccum[R] - twoAccum[L - 1]
    answer.push(`${oneAnswer} ${twoAnswer}`)
  }

  console.log(answer.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `20
2 90
1 67
2 9
2 17
2 85
2 43
2 11
1 32
2 16
1 19
2 65
1 14
1 51
2 94
1 4
1 55
2 90
1 89
1 35
2 81
20
3 17
5 5
11 11
8 10
3 13
2 6
3 7
3 5
12 18
4 8
3 16
6 8
3 20
1 12
1 6
5 16
3 10
17 19
4 4
7 15
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
