/**　問題メモ
 * 位置rから開始して、すべての空きスペース（0）を訪問する最小操作回数を求める
 * 1は障害物（往復で2回操作）、0は空きスペース（1回操作）
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [n, r] = lines[0].split(' ').map(Number)
  const l = lines[1].split(' ').map(Number)

  let ans = 0

  /**　ロジックの実装 */

  // 左端と右端の0の位置を探す
  let x = n // 左から最初の0の位置（見つからなければn）
  let y = 0 // 右から最初の0の位置（見つからなければ0）

  // 左から最初の0を探す
  for (let i = 0; i < n; i++) {
    if (l[i] === 0) {
      x = i
      break
    }
  }

  // 右から最初の0を探す
  for (let i = n - 1; i >= 0; i--) {
    if (l[i] === 0) {
      y = i
      break
    }
  }

  // 全体の0の個数
  const open = l.filter(val => val === 0).length

  // 往復が必要な1の個数を計算
  let t = 0

  // rより左側の範囲で通り抜ける1の個数
  // なぜr-1から始めるかというと、部屋rから見て、←に移動していくときに
  // 確認したいドアのインデックスとなるから
  if (x <= r - 1) {
    for (let i = x + 1; i < r; i++) {
      if (l[i] === 1) t++
    }
  }

  // rより右側の範囲で通り抜ける1の個数
  if (y >= r) {
    for (let i = r; i < y; i++) {
      if (l[i] === 1) t++
    }
  }

  // 答え: 往復する1の個数 × 2 + 全ての0の個数
  ans = 2 * t + open

  console.log(ans)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
8 2
0 1 0 0 1 0 1 1


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
