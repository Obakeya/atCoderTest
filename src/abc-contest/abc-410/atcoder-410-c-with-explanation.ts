export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, Q] = lines[0].split(' ').map(Number)

  // 1-indexedの配列を0-indexedに変換して初期化
  const array = Array.from({ length: N }, (_, i) => i + 1)
  let offset = 0 // 回転のオフセット

  for (let i = 1; i <= Q; i++) {
    const query = lines[i].split(' ').map(Number)
    const type = query[0]

    if (type === 1) {
      const [, p, x] = query
      // 1-indexedを0-indexedに変換し、offsetを適用
      const actualIndex = (p - 1 + offset) % N
      array[actualIndex] = x
    } else if (type === 2) {
      const [, p] = query
      // 1-indexedを0-indexedに変換し、offsetを適用
      const actualIndex = (p - 1 + offset) % N
      console.log(array[actualIndex])
    } else if (type === 3) {
      const [, k] = query
      // offsetを更新するだけ（O(1)で回転効果を実現）
      offset = (offset + k) % N
    }
  }
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `5 5
2 3
1 2 1000000
3 4
2 2
2 3
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
