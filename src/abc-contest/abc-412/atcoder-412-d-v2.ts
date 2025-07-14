export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, M] = lines[0].split(' ').map(Number)

  // 既存グラフ（a < b になる向きで保持）
  // 隣接リストで頂点がどこの頂点とつながっているかを持つ
  const defaultEdges: Set<number>[] = Array.from(
    { length: N },
    () => new Set<number>()
  )
  for (let i = 0; i < M; i++) {
    let [a, b] = lines[i + 1].split(' ').map(Number)
    a-- //こうすることで、頂点1のものはindex = 0として扱われるようになる
    b--
    if (a > b) [a, b] = [b, a] //無向グラフを意識した正規化処理
    defaultEdges[a].add(b)
  }

  // 全ての頂点ペア（i < j）を列挙
  const allEdges: [number, number][] = []
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) allEdges.push([i, j])
  }

  const visited: boolean[] = Array(allEdges.length).fill(false)
  const degree: number[] = Array(N).fill(0)
  let best = Infinity

  // N 本の辺を選んだ時点で各頂点次数が 2 となり、閉路が完成する
  const dfs = (idx: number, chosen: number): void => {
    // N 本の辺を選べば各頂点次数が 2 になる（閉路を作る）可能性がある
    if (chosen === N) {
      let diff = 0
      for (let k = 0; k < allEdges.length; k++) {
        const [u, v] = allEdges[k]
        const inDefault = defaultEdges[u].has(v) // 元々あったか ※ u < vは保証されている
        const inCurrent = visited[k] // 現在選んだか
        if (inDefault !== inCurrent) diff++ // 差分をカウント
      }
      best = Math.min(best, diff)
      return
    }
    if (idx === allEdges.length) return

    // 今選択中の辺idxを選ばない（新しいグラフに含めない）分岐
    dfs(idx + 1, chosen)

    // 今選択中の辺(idx)を選ぶ分岐（次数制約を満たすときのみ）
    const [u, v] = allEdges[idx]
    if (degree[u] < 2 && degree[v] < 2) {
      visited[idx] = true
      degree[u]++
      degree[v]++
      dfs(idx + 1, chosen + 1)
      degree[u]-- //バックトラッキング　あるdfsの探索が終わるときに、元に戻す
      degree[v]--
      visited[idx] = false
    }
  }

  dfs(0, 0)
  console.log(best.toString())
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `5 4
1 2
1 5
2 4
4 5

` // ここにテスト入力を記入
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
