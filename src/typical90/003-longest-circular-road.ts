/**　もう一度解く */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const n = +lines[0]

  // 隣接リストでグラフを表現する。隣接している都市同士の関係を隣接リストで保有する
  const graph: number[][] = Array.from({ length: n }, () => [])

  for (let i = 1; i < n; i++) {
    const [a, b] = lines[i].split(' ').map(num => +num - 1) // 0-indexed
    graph[a].push(b)
    graph[b].push(a)
  }

  //指定した頂点からDFS各頂点への距離を計算
  function dfs (start: number): number[] {
    //indexと都市の位置を同一にして扱う
    const distances = Array(n).fill(-1)
    distances[start] = 0

    const stack: number[] = [start]

    // 0の隣接都市の取得からスタート
    while (stack.length > 0) {
      //vertex..頂点　　stackに入っている最後の要素を削除して取り出す
      const vertex = stack.pop()

      for (const neighbor of graph[vertex]) {
        //まだ距離が未計算の都市があれば、スタックに追加する
        if (distances[neighbor] === -1) {
          stack.push(neighbor)
          distances[neighbor] = distances[vertex] + 1 //startからの距離を求めるため + 1して格納する
        }
      }
    }
    return distances //startからの距離を都市ごとに格納する
  }

  // 頂点0から最も遠い頂点を見つける
  const distFromZero = dfs(0)
  const farthestFromZero = distFromZero.indexOf(Math.max(...distFromZero))

  //その頂点から最も遠い頂点までの距離を求める
  const distFromFarthest = dfs(farthestFromZero)
  const diameter = Math.max(...distFromFarthest)
  // 最後、1に戻ってくる分の+1
  console.log(diameter + 1)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `31
1 2
1 3
2 4
2 5
3 6
3 7
4 8
4 9
5 10
5 11
6 12
6 13
7 14
7 15
8 16
8 17
9 18
9 19
10 20
10 21
11 22
11 23
12 24
12 25
13 26
13 27
14 28
14 29
15 30
15 31
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
