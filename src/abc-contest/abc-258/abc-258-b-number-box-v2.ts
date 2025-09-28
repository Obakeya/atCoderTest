export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]

  // 8方向: 上、右上、右、右下、下、左下、左、左上
  const dx = [0, 1, 1, 1, 0, -1, -1, -1]
  const dy = [-1, -1, 0, 1, 1, 1, 0, -1]

  let maxResult = 0

  // 全ての開始位置を試す
  for (let startRow = 0; startRow < N; startRow++) {
    for (let startCol = 0; startCol < N; startCol++) {
      // 8方向全てを試す
      for (let dir = 0; dir < 8; dir++) {
        let numberStr = ''
        let row = startRow
        let col = startCol

        // N個の数字を収集
        for (let step = 0; step < N; step++) {
          // lines配列は1番目から開始なので+1
          numberStr += lines[row + 1][col]

          // 次の位置へ移動（最後のステップでは移動不要）
          if (step < N - 1) {
            row = (row + dy[dir] + N) % N // +Nをすることで、負数に対する余りを求めないようにする
            col = (col + dx[dir] + N) % N
          }
        }

        maxResult = Math.max(maxResult, parseInt(numberStr))
      }
    }
  }

  console.log(maxResult)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `10
1111111111
1111111111
1111111111
1111111111
1111111111
1111111111
1111111111
1111111111
1111111111
1111111111

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
