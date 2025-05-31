/**　コミット時問題のurlを書く */
export function solve (input: string) {
  const [A, B, C, D] = input.trim().split(' ').map(Number)
  /**　ロジックの実装 */
  if (A > C || (A === C && B >= D)) return 'Yes'
  return 'No'
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `12 0 11 30

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
    console.log(solve(input))
  } catch (e) {
    const input = []
    require('readline')
      .createInterface({ input: process.stdin })
      .on('line', line => input.push(line))
      .on('close', () => console.log(solve(input.join('\n')).toString()))
  }
}
