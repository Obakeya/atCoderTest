/**　https://atcoder.jp/contests/abs/tasks/abc085_b */
export function solve (input: string): string {
  const mochis = input
    .trim()
    .split('\n')
    .slice(1)
    .map(x => +x)
    .sort((a, b) => a - b)

  let step = 0
  let underCm = 0
  for (const mochi of mochis) {
    if (underCm < mochi) {
      step++
      underCm = mochi
    }
  }

  /**　ロジックの実装 */
  return step.toString()
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `7
50
30
50
100
50
80
30
`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  console.log(solve(testInput))
}
// ローカル実行環境の場合（テスト環境でない && require.mainがmodule）
else if (require.main === module) {
  // node.jsの標準モジュール
  const fs = require('fs')
  try {
    // Windows/Unix対応
    const input =
      process.platform === 'win32'
        ? fs.readFileSync(0, 'utf8')
        : fs.readFileSync('/dev/stdin', 'utf8')
    console.log(solve(input))
  } catch (e) {
    const input = []
    require('readline')
      .createInterface({ input: process.stdin })
      .on('line', line => input.push(line))
      .on('close', () => console.log(solve(input.join('\n'))))
  }
}
