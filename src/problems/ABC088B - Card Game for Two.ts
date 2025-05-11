/**　https://atcoder.jp/contests/abs/tasks/abc088_b */
export function solve (input: string): string {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  const aiNums = lines[1].split(' ').map(x => +x)
  /**　ロジックの実装 */
  aiNums.sort((a, b) => b - a) //降順に
  let aliceSum = 0
  let bobSum = 0
  let aliceTurn = true
  for (const num of aiNums) {
    if (aliceTurn) {
      aliceSum += num
    } else {
      bobSum += num
    }
    aliceTurn = !aliceTurn
  }

  return (aliceSum - bobSum).toString()
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `4
20 18 2 18
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
