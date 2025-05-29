/**　https://atcoder.jp/contests/abc407/submissions/me
 * 実行時間は41ms → 40ms
 * メモリは42868kb → 42920kb とそう改善はなかった
 * だが、早く解くのが大事な問題だったので、四捨五入で解けることに気づきたかった
 *
 */
export function solve (input: string): number {
  const [A, B] = input.trim().split(' ').map(Number)

  return Math.round(A / B)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `407 29
`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  console.log(solve(testInput).toString())
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
    console.log(solve(input).toString())
  } catch (e) {
    const input = []
    require('readline')
      .createInterface({ input: process.stdin })
      .on('line', line => input.push(line))
      .on('close', () => console.log(solve(input.join('\n')).toString()))
  }
}
