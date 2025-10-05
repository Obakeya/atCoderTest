/**　問題メモ
 * K個離れた要素同士を入れ替える操作で昇順ソートできるか判定
 * 位置を K で割った余りが同じ要素同士は自由に並び替え可能
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, K] = lines[0].split(' ').map(Number)
  const a = lines[1].split(' ').map(Number)

  /**　ロジックの実装 */

  // 配列を K 個のグループに分ける（位置 % K ごと）
  const groups: number[][] = []
  for (let i = 0; i < K; i++) {
    groups.push([])
  }

  for (let i = 0; i < N; i++) {
    groups[i % K].push(a[i])
  }

  // 各グループを降順にソート（後で pop するため）
  for (let i = 0; i < K; i++) {
    groups[i].sort((x, y) => y - x)
  }

  // 元の配列をソート
  const sortedA = [...a].sort((x, y) => x - y)

  // 各グループから順番に要素を取り出して新しい配列を構築
  const reconstructed: number[] = []
  for (let i = 0; i < N; i++) {
    reconstructed.push(groups[i % K].pop()!)
  }

  // ソートした配列と再構築した配列が一致するか確認
  let canSort = true
  for (let i = 0; i < N; i++) {
    if (sortedA[i] !== reconstructed[i]) {
      canSort = false
      break
    }
  }

  const ans = canSort ? 'Yes' : 'No'
  console.log(ans)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
5 2
3 4 1 3 4
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
