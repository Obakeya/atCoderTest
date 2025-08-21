/**　もう一度解く
 * https://atcoder.jp/contests/typical90/tasks/typical90_h

 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  const S = lines[1]
  const T = 'atcoder'
  const MOD = 1000000007

  // dpテーブル初期化
  const dp: number[][] = Array(N + 1)
    .fill(null)
    .map(() => Array(T.length + 1).fill(0))

  // 初期条件
  dp[0][0] = 1

  for (let i = 0; i < N; i++) {
    for (let j = 0; j <= T.length; j++) {
      // S[i]を選ばない場合
      dp[i + 1][j] = add(dp[i + 1][j], dp[i][j])

      // S[i]を選ぶ場合
      if (j < T.length && S[i] === T[j]) {
        dp[i + 1][j + 1] = add(dp[i + 1][j + 1], dp[i][j])
      }
    }
  }
  function add (a: number, b: number): number {
    a += b
    if (a >= MOD) {
      a -= MOD
    }
    return a
  }
  console.log(dp[N][T.length])
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `10
attcordeer
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
