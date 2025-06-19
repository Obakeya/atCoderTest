export function solve (input: string) {
  const lines = input.trim().split('\n')
  //Nが頂点の数、Mが辺の数
  const [N, M] = lines[0].split(' ').map(Number)
  /**
   * この問題の解き方
   * N個のノードがある
   * N個のノードの次数が2つであることをチェック
   * 頂点1からDFSを行い、すべてのノードに到達できたならサイクルグラフと判定できる
   */
  const graph: number[][] = Array.from({ length: N + 1 }, () => [])
  for (let i = 1; i <= M; i++) {
    const [a, b] = lines[i].split(' ').map(Number)
    graph[b].push(a)
    graph[a].push(b)
  }

  for (let i = 1; i <= N; i++) {
    if (graph[i].length !== 2) {
      console.log('No')
      return
    }
  }

  const visited = Array(N + 1).fill(false)
  //1つのノードから探索して、すべてのノードにたどり着けるがどうかがサイクルグラフの検証
  dfsSearch(1)

  function dfsSearch (node: number) {
    visited[node] = true
    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        dfsSearch(neighbor)
      }
    }
  }

  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      console.log('No')
      return
    }
  }

  console.log('Yes')
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `4 4
2 4
3 1
4 1
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
