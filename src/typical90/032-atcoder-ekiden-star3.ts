/**　問題メモ
 * N人の並び順を決める問題
 * - A[i][j]: 人iがj番目に来た時のコスト
 * - M組の仲の悪いペアがあり、隣り合えない
 * - 全順列を試して制約を満たす最小コストを求める
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  let lineIdx = 0

  const N = +lines[lineIdx++]

  // コスト行列 A[人][位置] (1-indexed)
  const A: number[][] = Array(N + 1)
    .fill(null)
    .map(() => Array(N + 1).fill(0))

  for (let i = 1; i <= N; i++) {
    const costs = lines[lineIdx++].split(' ').map(Number)
    for (let j = 1; j <= N; j++) {
      A[i][j] = costs[j - 1]
    }
  }

  const M = +lines[lineIdx++]

  // 仲の悪いペアを記録
  const kenaku: boolean[][] = Array(N + 1)
    .fill(null)
    .map(() => Array(N + 1).fill(false))
  for (let i = 0; i < M; i++) {
    const [x, y] = lines[lineIdx++].split(' ').map(Number)
    kenaku[x][y] = true
    kenaku[y][x] = true // 双方向
  }

  let minCost = Infinity

  // 順列を生成する再帰関数
  function generatePermutation (current: number[], used: boolean[]) {
    //人数の組を全員選んだら、コスト計算を始める
    if (current.length === N) {
      // 隣り合う人が仲悪くないかチェック
      let isValid = true
      for (let i = 0; i < N - 1; i++) {
        if (kenaku[current[i]][current[i + 1]]) {
          isValid = false //もし隣同士に仲が良くない人同士を設定していたら、コスト計算をしないためのフラグをオン
          break
        }
      }

      //人の組がすべて仲が悪くない人同士ったら、コストを計算する
      if (isValid) {
        // コスト計算: 人current[i]が(i+1)番目に来る
        let cost = 0
        for (let i = 0; i < N; i++) {
          cost += A[current[i]][i + 1] //iは0始まりで、Aは1位置から設定したため、コストを取り出す
        }
        minCost = Math.min(minCost, cost) //今までの組の中で最小のコストだったら、最小値を更新する
      }
      return
    }

    // 次の人を選ぶ
    /** バックトラッキングの探索技法の基本パターン
     * やってみる→元に戻して別のを試す という構造にすることで、すべてのパターンを網羅的に探索可能
     */
    for (let person = 1; person <= N; person++) {
      if (!used[person]) {
        current.push(person) //「選手personを次の区に配置してみる」
        used[person] = true //「選手personは使用済み」
        generatePermutation(current, used) //「この状態から続きを探してみる」
        current.pop() // 「やっぱり選手personの配置を取り消す」
        used[person] = false //「選手personを元に戻す」
      }
    }
  }

  const used = Array(N + 1).fill(false)
  generatePermutation([], used)

  const ans = minCost === Infinity ? -1 : minCost
  console.log(ans)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `3
1 10 100
10 1 100
100 10 1
0

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
