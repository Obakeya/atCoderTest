//https://atcoder.jp/contests/abs/tasks/abc083_b
export function solve (input: string): string {
  const lines = input.trim().split('\n')
  /**ロジックの実装
   * 1以上N以下の整数のうちで、各桁の和がA以上、B以上である者の総和を求める
   * 各桁の和とは... 21の各桁の和 2 + 1 = 3
   * 3222の各桁の和　3 + 2 + 2 + 2 = 9
   * のこと
   *
   * そのため、1からNまでのループを行う
   */

  const [n, a, b] = lines[0].split(' ').map(x => +x)

  let totalSum = 0

  for (let target = 1; target <= n; target++) {
    //targetの各桁の総和を求める

    let targetNums = Array.from(String(target), Number)
    let targetSums = 0
    for (let i = 0; i < targetNums.length; i++) {
      targetSums += targetNums[i]
    }

    if (a <= targetSums && targetSums <= b) {
      totalSum += target
    }
  }
  return totalSum.toString()
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `100 4 16
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
