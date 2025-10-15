/**　問題メモ
 * 2部グラフを作る問題。
 * 2部グラフにするには、頂点を白、黒色で塗り、
 * それによって、辺が結ぶ頂点が塗られた色が異なる必要がある
 *  ○1 → 2●
 *  ●3 → 2○　にはできないので
 *  ○1 → 2●
 *  ○3 → 2●
 * 　にはできる。
 *  頂点 N≤10より、制約数は小さい。
 *  辺Mは高々　N(N-1)/2 より、 辺の数は高々 45
 *  45 の辺ごとに削除する、削除しないを検証する場合、　削除の組は 2^45
 *  全探索は削除の組数が多いため、現実的ではなさそう。
 *  考え方を変えるか。頂点を白、黒、として、最初にグループ分けし、
 *  そのグループ分けを実現するための削除数を数えて、検証する、
 *  というアプローチであれば、O(2^N)で解けるかも、？
 *
 * 「最低でも何回操作を行う必要があるか」を検証する必要があるため、
 *
 *
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, M] = lines[0].split(' ').map(Number)

  // 隣接リストの初期化
  const graph: number[][] = Array.from({ length: N + 1 }, () => [])

  const nodeToNodeSetMap = new Map<number, Set<number>>()
  for (let i = 1; i < lines.length; i++) {
    const [v1, v2] = lines[i].split(' ').map(Number)
    graph[v1].push(v2)
    graph[v2].push(v1)
  }

  let ansDeleteCount = Number.MAX_SAFE_INTEGER
  //点のグループ分けについて、検証していく
  for (let i = 0; i < 1 << N; i++) {
    //すべて同じグループの場合は二部グラフにならない
    if (i === 0) continue

    //実際の番号に対して、indexは-1されていることに注意
    const falseNodes = []
    const falseNodeSets = new Set<number>()
    const trueNodes = []
    const trueNodeSets = new Set<number>()

    //頂点ごとの検証 trueグループ、falseグループに分ける
    //jは確認対象の頂点を指す
    for (let j = 0; j < N; j++) {
      if ((i >> j) & 1) {
        trueNodes.push(j + 1)
        trueNodeSets.add(j + 1)
      } else {
        falseNodes.push(j + 1)
        falseNodeSets.add(j + 1)
      }
    }
    //同じ頂点のグループ同士がつながっている辺があった場合、削除が必要
    let deleteCount = 0
    const deleteNodes = new Set<string>()
    for (let k = 1; k <= N; k++) {
      ifNeedDelete(k)
    }
    ansDeleteCount = Math.min(deleteCount, ansDeleteCount)

    function ifNeedDelete (num: number) {
      for (const node of graph[num]) {
        //同じグループなのに隣接している場合
        if (
          (falseNodeSets.has(node) && falseNodeSets.has(num)) ||
          (trueNodeSets.has(node) && trueNodeSets.has(num))
        ) {
          if (!isUsed(node, num)) {
            deleteCount++
            markUsed(node, num)
          }
        }
      }
    }

    //すでに削除済みの辺を、再削除カウントしたくない
    function markUsed (a: number, b: number) {
      const key = a < b ? `${a},${b}` : `${b},${a}`
      deleteNodes.add(key)
    }

    function isUsed (a: number, b: number): boolean {
      const key = a < b ? `${a},${b}` : `${b},${a}`
      return deleteNodes.has(key)
    }
  }

  /**　ロジックの実装 */

  console.log(ansDeleteCount)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
10 20
5 9
1 4
3 8
1 6
4 10
5 7
5 6
3 7
3 6
5 10
1 3
3 4
6 7
1 2
4 7
1 5
1 9
9 10
4 5
8 9


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
