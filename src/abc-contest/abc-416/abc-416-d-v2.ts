export function solve (input: string) {
  const lines = input.trim().split('\n')
  let lineIndex = 0

  const t = parseInt(lines[lineIndex++])
  const results: string[] = []

  // テストケースの処理を行う
  for (let testCase = 0; testCase < t; testCase++) {
    // n は長さ n の非負整数列、m は mod に利用する
    const [n, m] = lines[lineIndex++].split(' ').map(Number)

    const aSequence = lines[lineIndex++].split(' ').map(Number)
    const bSequence = lines[lineIndex++].split(' ').map(Number)

    const result = solveCase(n, m, aSequence, bSequence)
    results.push(result.toString())
  }

  console.log(results.join('\n'))
}

/**
 * こっからが分からなかった部分
 *　なんでこれで、最小の　(A + B) mod mでになるのだろう。
 *
 *
 */
function solveCase (
  n: number,
  m: number,
  aSequence: number[],
  bSequence: number[]
): number {
  // 両配列を昇順にソート（貪欲法のため→最小値につながる）
  aSequence.sort((a, b) => a - b)
  bSequence.sort((a, b) => a - b)

  let totalSum = 0
  let jIndex = n - 1 // bSequenceの後ろから選択

  for (let i = 0; i < n; i++) {
    // 例 m = 9, A..3, B..2 のとき、3+2=5。5を9で割った時の余りは、5 のため、下記のifには分岐せず returnする
    totalSum += aSequence[i] + bSequence[i]

    // ペアの和がm以上なら、modで超える分でmを引く
    // 昇順、つまり小さい順から A と B を、足していって、m をこえた場合、AはBの大きい値と足した方がいい
    if (m <= aSequence[i] + bSequence[jIndex]) {
      totalSum -= m // 例 m = 9,  A..7, B..8のとき 7+8 = 15。15を9で割った時の余りは 6 なので mでひけば帳尻があう
      jIndex--
    }
  }

  return totalSum
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `3
3 6
3 1 4
2 0 1
1 1000000000
999999999
999999999
10 201
144 150 176 154 110 187 38 136 111 46
96 109 73 63 85 1 156 7 13 171
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
