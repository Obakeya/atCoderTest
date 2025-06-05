export function solve (input: string) {
  const lines = input.trim().split('\n')

  const [N, Q] = lines[0].split(' ').map(Number)
  const S = lines[1]

  /**
   * Q * N の計算量だと2 secは厳しい気がする。。
   * N + Q　ぐらいにできないかどうかを考えたいところ。
   *
   * 最初に、全文字列に含まれるACの数を計算し、
   * ACの出現位置をメモしておくなどして、
   * 文字列の切り取りの開始位置と終端位置が入れられることで、
   * 最初に求めていたACの数からいい感じに減算した結果を出す、
   * みたいなアルゴリズムにできたりしないだろうか？
   * →累積和の考え方で行くとよい。
   */

  const countArray = Array(S.length).fill(0)
  let beforeChar = ''
  let nowCount = 0
  for (let i = 0; i < S.length; i++) {
    if (beforeChar === 'A' && S[i] === 'C') {
      countArray[i] = nowCount + 1
      nowCount += 1
    } else {
      countArray[i] = nowCount
    }
    beforeChar = S[i]
  }

  for (let i = 2; i < lines.length; i++) {
    const [l, r] = lines[i].split(' ').map(Number)
    console.log(countArray[r - 1] - countArray[l - 1])
  }

  return ''
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `8 3
ACACTACG
3 7
2 3
1 8
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
