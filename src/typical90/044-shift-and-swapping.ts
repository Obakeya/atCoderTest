/**　問題メモ
 * 配列の回転とスワップを効率的に処理
 * 実際に配列を回転させるのではなく、シフト量を記録して論理的に処理
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, Q] = lines[0].split(' ').map(Number)
  const A = lines[1].split(' ').map(Number)

  const ans = []
  let shifts = 0 // 右シフトの累積量

  /**　ロジックの実装 */
  for (let i = 0; i < Q; i++) {
    const [T, x, y] = lines[i + 2].split(' ').map(Number)

    if (T === 1) {
      // 2つの要素を交換（1-indexedを0-indexedに変換）
      const pos1 = (x - 1 + shifts) % N
      const pos2 = (y - 1 + shifts) % N
      const temp = A[pos1]
      A[pos1] = A[pos2]
      A[pos2] = temp
    } else if (T === 2) {
      // 配列を右に1つ回転（論理的にシフト量を増加）
      shifts = (shifts + N - 1) % N
    } else if (T === 3) {
      // 指定位置の要素を出力（1-indexedを0-indexedに変換）
      const pos = (x - 1 + shifts) % N
      ans.push(A[pos])
    }
  }

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
11 18
23 92 85 34 21 63 12 9 81 44 96
3 10 0
3 5 0
1 3 4
2 0 0
1 4 11
3 11 0
1 3 5
2 0 0
2 0 0
3 9 0
2 0 0
3 6 0
3 10 0
1 6 11
2 0 0
3 10 0
3 4 0
3 5 0

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
