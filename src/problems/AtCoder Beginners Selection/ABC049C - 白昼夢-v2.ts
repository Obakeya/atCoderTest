/**https://atcoder.jp/contests/abs/tasks/arc065_a */
export function solve (input: string): string {
  let S = input.trim()
  /** 改善版のアルゴリズム
   * ・より長い文字列を事前に検証したほうが安全である
   * ・文字列をキャッシュしておき、不要なslice()を防ぐ
   * が、実行結果としては最初のverの解法のほうが良かった
   * 実行時間 45ms→48ms 　メモリ 48176kb→48212kb
   */
  while (S.length > 0) {
    if (S.length >= 7 && S.slice(-7) === 'dreamer') {
      S = S.slice(0, -7)
    } else if (S.length >= 6 && S.slice(-6) === 'eraser') {
      S = S.slice(0, -6)
    } else if (S.length >= 5 && S.slice(-5) === 'erase') {
      S = S.slice(0, -5)
    } else if (S.length >= 5 && S.slice(-5) === 'dream') {
      S = S.slice(0, -5)
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
