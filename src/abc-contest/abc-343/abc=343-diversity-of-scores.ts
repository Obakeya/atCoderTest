import { Socket } from 'dgram'

/**　問題メモ */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, T] = lines[0].split(' ').map(Number)

  const scores = Array(N + 1).fill(0)
  const set = new Set<Number>()
  set.add(0)
  const map = new Map<number, number>() //キー：スコア、値：そのスコアを持つ選手の数
  map.set(0, N)
  const ans = []

  for (let i = 1; i < lines.length; i++) {
    const [a, b] = lines[i].split(' ').map(Number)
    const beforeScore = scores[a]
    const curCnt = map.get(beforeScore)
    if (curCnt === 1) {
      set.delete(beforeScore)
    }
    map.set(beforeScore, curCnt - 1)

    scores[a] += b
    const newScore = scores[a]
    if (map.has(newScore)) {
      const curCnt = map.get(newScore)
      map.set(newScore, curCnt + 1)
    } else {
      map.set(newScore, 1)
    }
    set.add(newScore)

    ans.push(set.size)
  }

  /**　ロジックの実装 */

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
10 10
7 2620
9 2620
8 3375
1 3375
6 1395
5 1395
6 2923
10 3375
9 5929
5 1225

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
