/**　https://atcoder.jp/contests/abs/tasks/arc089_a
 *
 * v1 のものより、実行時間が 115ms → 82ms に改善した。
 * メモリは 62372KB → 657444KBに増えた
 */
export function solve (input: string): string {
  // すべての入力を空白文字（スペース、改行など）で分割して一次元配列にする
  const tokens = input.trim().split(/\s+/)
  let index = 0

  const nextNum = () => +tokens[index++]
  const N = nextNum()

  let xed = 0
  let yed = 0
  let ted = 0
  for (let i = 0; i < N; i++) {
    const t = nextNum()
    const x = nextNum()
    const y = nextNum()

    let tDiff = t - ted
    let xyDiff = Math.abs(x - xed) + Math.abs(y - yed)
    if (xyDiff > tDiff || tDiff % 2 !== xyDiff % 2) {
      return 'No'
    }

    ted = t
    xed = x
    yed = y
  }
  return 'Yes'

  /**　ロジックの実装
   * Nの数だけ、訪れる個所が示される
   * tの値を見ながら、今の訪れる個所と、次の訪れる個所を比較し、
   * すべて訪れることができるなら、YESを返すことにする
   *
   * ＊距離感の移動が判定可能なアルゴリズム
   *
   *・tの差が1だけ違って、指定個所が同一の場合 OR
   * tの差が1未満の場合→到達不可
   * tの数が1以上かつ、　(xの差　+ y の差)この和が、tの差未満である場合
   * に到達不可能
   *
   * 到達可能判定
   * ・tの差が偶数、たとえば2の時、xの差 + yの差の和(以降、xyDiffとする)が、
   * 偶数である必要があるである (0,0),(1,1) xyDiff=2は、到達可能。
   * (0,0),(1,0) xyDiff=2は、到達不可。
   * tの差が、奇数である、xyDiffの差は奇数出ないと、到達できない。
   * tDiff=3　(0,0),(2,0)→到達不可
   *
   * 最初のt=1の時の到達個所の比較は、0,0との比較になることに注意
   * 手前の位置と、次の位置が同じ場合は、tの差が偶数で無いと、元居た場所に
   * 戻ることはできない
   *
   */
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `2
5 1 1
100 1 1
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
