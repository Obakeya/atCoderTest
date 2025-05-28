/**　https://atcoder.jp/contests/typical90/tasks/typical90_b */
export function solve (input: string): void {
  const N = +input.trim()
  /**　ロジックの実装
   * バックトラックを使って解く。
   * バックトラック用の関数内で1文字ずつ文字列を組み立てながら
   * 期待する文字列になるまで組み立てる。
   */

  if (N % 2 !== 0) {
    console.log('')
    return
  }

  let results: string[] = []

  /** 作成中の文字ずつ受け取り、現状の文字のカウントから前かっこか後ろかっこがどちらが追加できるかを判断する
   * openCount,closeCountが大事
   *
   * 作成中の文字列が、期待する文字列になった時点で処理を止める。答えの配列に文字を追加する
   *
   */

  function backTrack (
    text: string,
    N: number,
    openCount: number,
    closeCount: number
  ) {
    if (text.length === N) {
      results.push(text)
      return
    }
    //まだ前かっこが追加できるかどうか
    if (openCount < N / 2) {
      backTrack(text + '(', N, openCount + 1, closeCount)
    }

    //後ろかっこの追加が必要か
    if (closeCount < openCount) {
      backTrack(text + ')', N, openCount, closeCount + 1)
    }
  }

  backTrack('', N, 0, 0)

  for (const text of results) {
    console.log(text)
  }
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `10
`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  solve(testInput)
  // console.log(solve(testInput))
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
    solve(input)
  } catch (e) {
    const input = []
    require('readline')
      .createInterface({ input: process.stdin })
      .on('line', line => input.push(line))
      .on('close', () => console.log(solve(input.join('\n'))))
  }
}
