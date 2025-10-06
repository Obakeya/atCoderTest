/**
 * ・到達したか管理する配列を用意
 * ・ループで # であった場合、右下をチェック
 * ・右下が未到達であれば、探索を続ける
 * ・右下まで到達しきった時点で、到達マスについてメモ
 * ・式にのっとり、×の大きさをメモする
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [H, W] = lines[0].split(' ').map(Number)

  const S = Array(Math.min(H, W)).fill(0)
  const visited: boolean[][] = Array.from({ length: H }, () =>
    Array(W).fill(false)
  )

  for (let i = 1; i < lines.length; i++) {
    for (let j = 0; j < W; j++) {
      dig(i, j, 0)
    }
  }

  function dig (i: number, j: number, currentCount: number) {
    if (
      i - 1 === H ||
      j === W ||
      visited[i - 1][j] || //visited にアクセスするときは、-1が必要。始まりが1のため
      lines[i][j] !== '#'
    ) {
      if (currentCount === 0 || currentCount === 1) return

      const totalMassCount = currentCount * 2 - 1
      const sizeN = (totalMassCount - 1) / 4

      S[sizeN - 1] += 1
      return
    }
    visited[i - 1][j] = true

    dig(i + 1, j + 1, currentCount + 1)
  }

  /**　ロジックの実装 */

  console.log(S.join(' '))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
15 20
#.#..#.............#
.#....#....#.#....#.
#.#....#....#....#..
........#..#.#..#...
#.....#..#.....#....
.#...#....#...#..#.#
..#.#......#.#....#.
...#........#....#.#
..#.#......#.#......
.#...#....#...#.....
#.....#..#.....#....
........#.......#...
#.#....#....#.#..#..
.#....#......#....#.
#.#..#......#.#....#
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
