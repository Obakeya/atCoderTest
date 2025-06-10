export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  const A = lines[1]
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b)
  const B = lines[2].split(' ').map(Number)
  const C = lines[3]
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b)

  /**
   * O(A * B * C )の計算方法しか浮かばなかった。解説を読んで、解法を考える。
   *
   * 真ん中のパーツを選び、そのパーツごとに、そのパーツごとに、上下のパーツで
   * 祭壇にできるパーツを探す。そのため、計算量は、
   * O(A) + O (C) + O(B * A log A * C log C )  となる
   */

  let answer = 0
  for (let b = 0; b < B.length; b++) {
    const target = B[b]
    const Acount = binarySearchLessThanTargetCount(A, target)
    const Ccount = binarySearchGreaterThanTargetCount(C, target)
    answer += Acount * Ccount
  }

  console.log(answer)
}

/** ターゲットより大きい値となる要素数を返す二分境界探索
 */
function binarySearchGreaterThanTargetCount (
  arr: number[],
  target: number
): number {
  let left = 0
  //境界二分探索だと、　rightの位置は-1しない。境界の外も、値の設定候補になるため。
  let right = arr.length

  //left===rightとなった瞬間に終了させ、境界のindexを特定する
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    //ターゲットより値が大きい状態になるように、indexを移動させていく。
    if (arr[mid] <= target) left = mid + 1
    else right = mid
  }

  return arr.length - left // leftは境界位置を示すので、それより大きい要素数を求めるには配列からマイナスする必要あり
}

/** ターゲットより小さい値となる要素位置を返す二分境界探索
 */
function binarySearchLessThanTargetCount (
  arr: number[],
  target: number
): number {
  let left = 0
  // 境界二分探索だと、rightの位置は-1しない。境界の外も、値の設定候補になるため
  let right = arr.length

  //left===rightとなった瞬間に終了させ、境界のindexを保持する
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    //ターゲットより値が小さい状態になるように、indexを移動させていく
    if (arr[mid] < target) left = mid + 1
    else right = mid //一度調べた値が答えになる可能性があるので、-1しない
  }

  return left
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `6
3 14 159 2 6 53
58 9 79 323 84 6
2643 383 2 79 50 288

`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  solve(testInput)
}
// ローカル実行環境
else if (require.main === module) {
  const fs = require('fs')
  const input = fs.readFileSync(0, 'utf8') // 標準入力を直接読み取り
  solve(input)
}
