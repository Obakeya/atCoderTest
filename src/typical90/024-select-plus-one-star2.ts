/**　https://atcoder.jp/contests/typical90/tasks/typical90_x
 * ちょうどK回の操作でBと一致させられるかを判定する
 * 実際に置き換え処理を試さずに、効率的に判定したい
 * ■一致がさせられないケース
 * AとBの差の合計がKより大きい場合
 *
 * KとBの差の合計がKより大きい　かつ
 * KとAとBの差が奇数の場合
 *
 * ■一致させられるケース
 * AとBの差の合計がKより小さい　かつ
 * KとAとBの差が偶数の場合
 *
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, K] = lines[0].split(' ').map(Number)

  const aArray = lines[1].split(' ').map(Number)
  const bArray = lines[2].split(' ').map(Number)

  let diff = 0
  for (let i = 0; i < N; i++) {
    diff += Math.abs(aArray[i] - bArray[i])
  }
  const mod = (diff - K) % 2

  const ans = []

  if (diff <= K && mod == 0) ans.push('Yes')
  else ans.push('No')

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
7 999999999
3 1 4 1 5 9 2
1 2 3 4 5 6 7

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
