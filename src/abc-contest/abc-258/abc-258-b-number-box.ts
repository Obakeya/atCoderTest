import { start } from 'repl'

/**
 * ・開始位置を決定
 * ・8パターンごとの計算結果を配列に確保し、最後ソートして
 * 一番大きい値を出力する
 * と考えたがWA。
 * もし仮にすべての数の値が同じ場合、
 * N * N * 9の計算が必要
 * ただ、高々9000の計算のため、うまく行きそう
 *
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]

  const starts: [number, number][] = []
  let maxValue = 0

  for (let i = 1; i < lines.length; i++) {
    for (let j = 0; j < N; j++) {
      if (maxValue < +lines[i][j]) {
        maxValue = +lines[i][j]
      }
    }
  }
  for (let i = 1; i < lines.length; i++) {
    for (let j = 0; j < N; j++) {
      if (maxValue === +lines[i][j]) {
        starts.push([i, j])
      }
    }
  }

  //左上、左、左下、下、右下、右、右上、上
  const dx = [-1, -1, -1, 0, 1, 1, 1, 0]
  const dy = [-1, 0, 1, 1, 1, 0, -1, -1]
  const ans = []

  function buidAnsCandi (di: number, maxI: number, maxj: number) {
    const process = [maxValue]
    let xx = maxj
    let yy = maxI
    // N-1回移動する
    for (let k = 0; k < N - 1; k++) {
      xx += dx[di]
      yy += dy[di]

      if (xx < 0) xx = N - 1
      else if (N <= xx) xx = 0

      //Nがある分、y座標は1が開始位置になる
      if (yy < 1) yy = N
      else if (N + 1 <= yy) yy = 1 // yaは座標が1つ分多い

      process.push(+lines[yy][xx])
    }
    ans.push(Number(process.join('')))
  }

  for (const [i, j] of starts) {
    // 8方向の移動分、処理を検証する
    for (let d = 0; d < 8; d++) {
      buidAnsCandi(d, i, j)
    }
  }
  ans.sort((a, b) => b - a)

  /**　ロジックの実装 */

  console.log(ans[0])
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
4
1161
1119
7111
1811


`.trim()
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
