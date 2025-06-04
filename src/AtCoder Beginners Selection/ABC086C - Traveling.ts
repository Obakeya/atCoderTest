/**https://atcoder.jp/contests/abs/tasks/arc089_a */
export function solve (input: string): string {
  const plans = input.trim().split('\n')

  let xed = 0
  let yed = 0
  let ted = 0
  for (let i = 1; i <= +plans[0]; i++) {
    let [t, x, y] = plans[i].split(' ').map(a => +a)

    let tDiff = t - ted
    let xyDiff = Math.abs(x - xed) + Math.abs(y - yed)
    if (xyDiff > tDiff) {
      //時間足りないとき
      return 'No'
    }
    let tDiffMod = tDiff % 2
    let xyDiffMod = xyDiff % 2

    if (
      (tDiffMod === 0 && xyDiffMod === 0) ||
      (tDiffMod !== 0 && xyDiffMod !== 0)
    ) {
      ted = t
      xed = x
      yed = y
      continue
    } else {
      return 'No'
    }
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
