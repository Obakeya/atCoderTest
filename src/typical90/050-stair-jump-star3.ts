/**　問題メモ
 * N段の階段を登る問題
 * 1段またはL段ずつ登ることができる
 * 0段目からN段目まで登る方法の数を求める（mod 10^9+7）
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, L] = lines[0].split(' ').map(Number)

  const MOD = 1000000007
  const ans = []

  /**　ロジックの実装 */
  // dp[i] = i段目に到達する方法の数
  const dp = new Array(N + 1).fill(0)

  // 初期状態: 0段目にいる方法は1通り
  dp[0] = 1

  // 各段について方法の数を計算
  for (let i = 1; i <= N; i++) {
    if (i < L) {
      // L段登れない場合は1段ずつのみ
      dp[i] = dp[i - 1]
    } else {
      // 1段前から1段登る + L段前からL段登る
      dp[i] = (dp[i - 1] + dp[i - L]) % MOD
    }
  }

  ans.push(dp[N])
  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
6783 125
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
