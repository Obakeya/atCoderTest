/**　問題メモ: n×nのグリッドを螺旋状に埋めて、最後の位置をTにする */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]

  const ans = []

  /**　ロジックの実装 */
  // n×nの二次元配列を初期化
  const grid: number[][] = Array.from({ length: N }, () => Array(N).fill(0))

  // 移動方向: 右(0,1) → 下(1,0) → 左(0,-1) → 上(-1,0)
  const dx = [0, 1, 0, -1]
  const dy = [1, 0, -1, 0]

  let x = 0,
    y = 0 // 現在位置
  let k = 0 // 現在の方向（0:右、1:下、2:左、3:上）
  let crr = 1 // 配置する数字

  grid[0][0] = 1 // 開始位置に1を配置

  // 螺旋状に数字を配置
  while (crr < N * N) {
    const nextX = x + dx[k]
    const nextY = y + dy[k]

    // 次の位置が範囲内かつ空いているかチェック
    if (
      nextX >= 0 &&
      nextX < N &&
      nextY >= 0 &&
      nextY < N &&
      grid[nextX][nextY] === 0
    ) {
      grid[nextX][nextY] = ++crr
      x = nextX
      y = nextY
    } else {
      // 進めない場合は方向転換
      k = (k + 1) % 4
    }
  }

  // 結果を文字列として格納
  for (let i = 0; i < N; i++) {
    const row = []
    for (let j = 0; j < N; j++) {
      if (grid[i][j] === N * N) {
        row.push('T') // 最後の位置はT
      } else {
        row.push(grid[i][j].toString())
      }
    }
    ans.push(row.join(' '))
  }

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
5 
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
