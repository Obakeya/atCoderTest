/**　隣り合わない、ということをどうプログラムに落とし込むか
 * →交互に色分けしたグループを作成する
 * →二部グラフの性質を利用する。交互に色分けしても、矛盾が生じない
 *
 * 1. 二色での色分け：隣接する頂点が異なる色になるよう、DFSで頂点を2つのグループに分ける
 * 2. グループ選択：2つのグループのうち、サイズがN/2以上のグループを選ぶ
 * 3. 頂点出力：そのグループからN/2個の頂点を出力する
 *
 * 解きなおす
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]

  //隣接リストの構築。インデックス番号と親としてノード番号を一致させる
  const graph: number[][] = Array.from({ length: N + 1 }, () => [])

  for (let i = 1; i < N; i++) {
    const [A, B] = lines[i].split(' ').map(Number)
    graph[A].push(B)
    graph[B].push(A)
  }

  // 各頂点の色（グループ）を管理：0=未訪問, 1=グループ1, 2=グループ2
  const color = new Array(N + 1).fill(0)

  //DFSｄ二部グラフの色分けを実行
  function dfs (node: number, currentColor: number) {
    color[node] = currentColor

    for (const neighbor of graph[node]) {
      if (color[neighbor] === 0) {
        // 隣接頂点は異なる色で塗る
        dfs(neighbor, currentColor === 1 ? 2 : 1)
      }
    }
  }
  // 頂点1から開始してグループ1で色分け
  dfs(1, 1)

  // 各グループの頂点を収集
  const group1: number[] = []
  const group2: number[] = []

  for (let i = 1; i <= N; i++) {
    if (color[i] === 1) {
      group1.push(i)
    } else {
      group2.push(i)
    }
  }

  // N/2 以上のサイズを持つグループを選択
  const seletedGroup = group1.length >= N / 2 ? group1 : group2

  const ans = seletedGroup.slice(0, N / 2)

  /**　ロジックの実装 */

  console.log(ans.join(' '))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `6
1 3
2 4
3 5
2 5
3 6

  
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
