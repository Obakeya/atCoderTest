/**　https://atcoder.jp/contests/abs/tasks/abc085_b
 * ほかの人の参考になるエレガントな解法を試す
 * 最初の文字列行を無視せずに処理する
 * 異なる数字がいくつあればよいか分かればよい、という観点に着目し
 * ハッシュ型を使う
 */
export function solve (input: string): string {
  const mochis = input
    .trim()
    .split('\n')
    .map(x => +x)
  let step = new Set<number>()

  for (let i = 1; i <= mochis[0]; i++) {
    step.add(mochis[i])
  }
  /**　ロジックの実装 */
  return step.size.toString()
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `4
10
8
8
6
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
