/**　コミット時問題のurlを書く */
export function solve (input: string): string {
  const [A, B] = input.trim().split(' ').map(Number)

  const quot = A / B
  const quotFloored = Math.floor(quot)
  const plusOne = quotFloored + 1
  const plusOneDiff = plusOne - quot
  const quotFlooredDiff = quot - quotFloored
  if (quot === quotFloored) {
    return quotFloored.toString()
  }

  if (quotFlooredDiff < plusOneDiff) {
    return quotFloored.toString()
  }

  /**　ロジックの実装 */
  return plusOne.toString()
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `22 11
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
