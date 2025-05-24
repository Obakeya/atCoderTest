/**　https://atcoder.jp/contests/typical90/tasks/typical90_a */
export function solve (input: string): string {
  const [a, b, c] = input.trim().split('\n')
  const [N, L] = a.split(' ').map(Number)
  const K = +b
  const Ai = c.split(' ').map(Number)

  // ここに問題固有のロジックを実装
  /**
   * 貪欲法と二分法の組み合わせで解く。
   * 貪欲法的な評価関数を用意。
   * 評価関数には、二分法で指定された値をスコア候補として渡す。
   * スコア候補と比較して、スコア以上になることが判明したらtrue,
   * そうでなあい場合はfalseを返し、二分法の探索範囲を狭めていく。
   * 最終的な二分法の終点になった時の直近の値がスコア（自動的に最も短いものの長さ）
   * になる。
   * 知りたいのは、スコアが最大となるように分割するときの値。
   * 最も短いピースの長さを最大化するから、すべてのピースがある長さ以上になるような
   * 最大の長さを見つける
   */
  let leftNum = 0
  let rightNum = L
  let mid = Math.floor(L / 2)
  let lastScore = 0
  while (leftNum <= rightNum) {
    mid = Math.floor((leftNum + rightNum) / 2)
    if (challenge(mid, Ai, N, K, L)) {
      leftNum = mid + 1
      lastScore = mid
    } else {
      rightNum = mid - 1
    }
  }

  return lastScore.toString() // 解答を返す
}
/** あるスコア以上が達成可能かを考える
 * あるスコア以上が達成可能であれば、二分探索法でより大きいスコアにチャレンジするし、
 * あるスコア以上が達成できないのであれば、二分探索法でより小さいスコアにチャレンジする
 * 貪欲法で判断し、チャレンジスコア以上の長さになった瞬間に切っていく
 */
function challenge (
  challengeScore: number,
  Ai: number[],
  NCuts: number,
  K: number,
  L: number
) {
  let lastPosition = 0
  let currentCuts = 0
  for (let i = 0; i < NCuts; i++) {
    let ifCutLength = Ai[i] - lastPosition

    if (ifCutLength >= challengeScore) {
      currentCuts++
      lastPosition = Ai[i]
    }

    //最後のピースもそれ以上になることをチェック
    if (currentCuts === K) {
      if (L - lastPosition >= challengeScore) {
        return true
      }
      return false
    }
  }
  return false
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `3 34
1
8 13 26


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
