export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  let S = lines.slice(1, N + 1).map(x => x.split(''))
  const T = lines.slice(N + 1, N + N + 1).map(x => x.split(''))
  const order0 = search(S)
  S = rotate90Clockwise(S)
  const order1 = search(S) + 1
  S = rotate90Clockwise(S)
  const order2 = search(S) + 2
  S = rotate90Clockwise(S)
  const order3 = search(S) + 3

  /**
   * 4回転分、それぞれのマスを比較して違いの数をカウントする
   * 違いの数+回転の操作数が答えになる
   * 開店後の比較をどうとらえるか。探索の順番を変えればいい。
   * 回転によって、実際に配列の構造を変える必要はなく、数え上げの仕方を工夫することで
   * 解決する
   * 0回転時
   * x =1 , y=1からスタートし、x++していって、N<xのタイミングで y++ x=1して探索再開
   * 1回転時
   * x=1, y =Nからスタートし、 先にy-- 　y<1のタイミングで、x++ y =Nして探索再開
   * 2回転時
   * x = N, y =N からスタート。先に x-- x<1のタイミングで y-- x =Nして探索再開
   * 3回転時
   * x = 1, y = 1からスタートし、 y-- していって、 y<1のタイミングで　x++ y=Nして探索再開
   *
   * 縦は1で初期化、横は0で初期化する
   */

  function search (array: string[][]) {
    let diffCount = 0
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (array[i][j] !== T[i][j]) diffCount++
      }
    }
    return diffCount
  }

  function rotate90Clockwise (grid: string[][]) {
    const N = grid.length
    const res: string[][] = Array.from({ length: N }, () => Array(N))
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        res[j][N - 1 - i] = grid[i][j]
      }
    }
    return res
  }

  console.log(Math.min(order0, order1, order2, order3))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `13
.#..###..##..
#.#.#..#.#.#.
#.#.###..#...
###.#..#.#.#.
#.#.###..##..
.............
..#...#....#.
.##..#.#..##.
#.#..#.#.#.#.
####.#.#.####
..#..#.#...#.
..#...#....#.
.............
.............
.#....#...#..
.#...#.#..#..
####.#.#.####
.#.#.###..#.#
.##....#..##.
.#....#...#..
.............
..##..###.#.#
.#.#.#..#.###
.#.#..###.#.#
.#.#.#..#.#.#
..##..###..#.

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
