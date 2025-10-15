/**　問題メモ
 * N個の頂点とM本の辺からなるグラフ
 * 各頂点を0か1で塗る
 * 同じ色の頂点を結ぶ辺を削除
 * 削除する辺の最小数を求める
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, M] = lines[0].split(' ').map(Number)

  const edges: [number, number][] = []
  for (let i = 1; i <= M; i++) {
    const [u, v] = lines[i].split(' ').map(Number)
    edges.push([u - 1, v - 1]) // 0-indexed に変換
  }

  let ans = M // 最悪でもM本全て削除

  // 2^N 通りの塗り方を全探索
  for (let bit = 0; bit < 1 << N; bit++) {
    let deleteCount = 0

    // 各辺をチェック
    for (const [u, v] of edges) {
      // 頂点uの色と頂点vの色を取得している
      // bitという、現在の検証の組から、対象の頂点が塗られているか、塗られていないかを検証している
      const colorU = (bit >> u) & 1
      const colorV = (bit >> v) & 1

      // 同じ色なら削除が必要
      if (colorU === colorV) {
        deleteCount++
      }
    }

    ans = Math.min(ans, deleteCount)
  }

  console.log(ans)
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
  const input = fs.readFileSync(0, 'utf8')
  solve(input)
}
