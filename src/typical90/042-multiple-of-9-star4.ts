/**　問題メモ: 各桁の数の和がちょうどKとなる正の整数の個数を求める
 * DPを使って解く。ある数値iを和算で実現するための数字の組の数は、法則的に増加する。
 * そのことを理解して、ある数値iを和算で実現するための数字の組は、数字1~9を使って実現する場合、
 * その数値iから、-1　~ -9 した数値の組の和算の結果で実現できる、という仕組みを理解する
 * 9の倍数の時の数値の合計値だけに注目していると、うまく解けない
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const K = +lines[0]

  const ans = []

  /**　ロジックの実装
   * i...今計算したい合計値
   * j...前の状態の合計値
   * 追加する数字 = i -j
   * i -j は1～9の範囲でないといけないから、 jは i-1,....i-9の範囲
   *
   */

  const mod = 1000000007

  if (K % 9 === 0) {
    const dp: number[] = new Array(K + 1).fill(0)
    dp[0] = 1
    for (let i = 1; i <= K; i++) {
      for (let j = i - 1; j >= i - 9 && j >= 0; j--) {
        dp[i] += dp[j]
        if (dp[i] >= mod) dp[i] -= mod
      }
    }

    ans.push(dp[K])
  } else {
    ans.push(0)
  }

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
234
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
