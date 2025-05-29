/**　コミット時問題のurlを書く
 * 解説を読んでも、特に改善点はなさそうだった。すぐに総当たり問題と
 * 気づけるかどうかが大事だった。
 *
 */
export function solve (input: string): string {
  const [X, Y] = input.trim().split(' ').map(Number)

  /**　ロジックの実装
   * 総当たりでいってみる
   * チャレンジして、条件を満たすのであればカウントアップ
   *
   */

  let allPattern = 36
  let okCount = 0
  for (let i = 1; i <= 6; i++)
    for (let j = 1; j <= 6; j++) {
      if (X <= i + j || Y <= Math.abs(i - j)) {
        okCount++
      }
    }

  return (okCount / allPattern).toString()
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `10 3

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
