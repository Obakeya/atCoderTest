/**https://atcoder.jp/contests/abs/tasks/arc065_a */
export function solve (input: string): string {
  let S = input.trim().split('\n')[0]
  /**　ロジックの実装
   * 先頭から文字を検査する場合、dreamerである文字列を、
   * dreamtと判定してしまう恐れがある。
   * 後ろから文字を検査する場合は、本来は単語の誤判定をしなくなるため、
   * 単語は後ろから検査する。
   *
   * 判定のアルゴリズムとして、ある単語と一致していると判断ができた場合は、
   * Sの文字列を削除していくことで、毎回同じ文字列取得アルゴリズムで
   * 文字列を取得できるようになる
   */
  while (S.length > 0) {
    if (S.slice(-5) === 'dream') {
      S = S.slice(0, -5)
    } else if (S.slice(-7) === 'dreamer') {
      S = S.slice(0, -7)
    } else if (S.slice(-5) === 'erase') {
      S = S.slice(0, -5)
    } else if (S.slice(-6) === 'eraser') {
      S = S.slice(0, -6)
    } else {
      return 'NO'
    }
  }

  return 'YES'
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `dreamerer
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
