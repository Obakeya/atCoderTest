export function solve (input: string) {
  const lines = input.trim().split('\n')

  const [H, W] = lines[0].split(' ').map(Number)

  const grid: string[][] = lines.slice(1, 1 + H).map(line => line.split(''))

  const dx = [-1, 1, 0, 0]
  const dy = [0, 0, -1, 1]
  const arrowToParent = ['v', '^', '>', '<']

  // 各マスが非常口Eから最短で何歩目に到達できるかを記録する表
  // H行×W列の2次元配列を作成し、-1で初期化
  // Array.from({length:H},...)が行数H分だけコールバックを実行しｋ
  // そのたびにArray(W).fill(-1)で列数Wの新しい配列を返している
  const dist: number[][] = Array.from({ length: H }, () => Array(W).fill(-1))
  const queueX: number[] = []
  const queueY: number[] = []
  let head = 0

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (grid[i][j] === 'E') {
        // 非常口(E)なら、距離を0に設定して探索の出発点としてキューに追加
        dist[i][j] = 0
        queueX.push(i)
        queueY.push(j)
      }
    }
  }

  while (head < queueX.length) {
    const x = queueX[head]
    const y = queueY[head]
    head++
    for (let k = 0; k < 4; k++) {
      const nx = x + dx[k]
      const ny = y + dy[k]
      // 探索地点がグリッドの外にはみ出していないか確認
      if (nx < 0 || nx >= H || ny < 0 || ny >= W) continue
      // 探索先が通行不可（壁など）はまたすでに訪問済みでないか確認
      if (grid[nx][ny] !== '.' || dist[nx][ny] !== -1) continue

      // 距離と方向の記録、次回探索対象としてキューに追加
      dist[nx][ny] = dist[x][y] + 1
      grid[nx][ny] = arrowToParent[k]
      queueX.push(nx)
      queueY.push(ny)
    }
  }
  const output = grid.map(row => row.join('')).join('\n')
  console.log(output)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `7 20
....................
..#..#..####..#E##..
..#..#..#..#..#.....
..E###..#..#..####..
.....#..#..E.....#..
.....#..####..####..
....................

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
