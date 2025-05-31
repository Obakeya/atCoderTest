/**　O( N +Q) で処理できること気づけるがが重要
 * Nはゴミの数、Qはクエリの数
 *
 * Nでゴミを管理するキー付きコレクションを用意し、
 * Qで作成したキー付きコレクションから、ゴミを削除、管理していくことで
 * 正確な数がカウントできる
 *--v2としたが、こちらの方が実行時間は100ms悪化した
 1546 ms → 1667ms
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [HRowCount, WColumnCount, NGarbagesCount] = lines[0]
    .split(' ')
    .map(Number)
  const rowGarbages = new Map<number, Set<number>>() //行番号→その行にあるゴミのy座標集合
  const colGarbages = new Map<number, Set<number>>() //列番号→その行にあるゴミのx座標集合
  for (let i = 1; i <= NGarbagesCount; i++) {
    const [Xi, Yi] = lines[i].split(' ').map(Number)

    if (!rowGarbages.has(Xi)) rowGarbages.set(Xi, new Set<number>())

    rowGarbages.get(Xi).add(Yi)

    if (!colGarbages.has(Yi)) colGarbages.set(Yi, new Set<number>())

    colGarbages.get(Yi).add(Xi)
  }

  /**　複数のクエリを順に演算して回答する必要がある
   * タイプ1、タイプ2で、ゴミを発見、除去を繰り返す
   * クエリの実行ごとにゴミが取り除かれていくことに注意
   */

  for (let j = NGarbagesCount + 2; j < lines.length; j++) {
    const [queryType, targetPosition] = lines[j].split(' ').map(Number)

    let findCount = 0
    //該当行のゴミの削除 x行目のゴミチェックアンド除去
    if (queryType === 1) {
      if (!rowGarbages.get(targetPosition)) {
        console.log(0)
        continue
      }
      const cols = rowGarbages.get(targetPosition)
      for (const col of cols) {
        findCount++
        //colGarbages側からも削除する
        colGarbages.get(col).delete(targetPosition)
      } //最後、行目のy座標集合を削除
      rowGarbages.delete(targetPosition)
    } else {
      if (!colGarbages.get(targetPosition)) {
        console.log(0)
        continue
      }
      const rows = colGarbages.get(targetPosition)
      for (const row of rows) {
        findCount++
        //colGarbages側からも削除する
        rowGarbages.get(row).delete(targetPosition)
      } //最後、列目のx座標集合を削除
      colGarbages.delete(targetPosition)
    }

    console.log(findCount)
  }
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `4 4 16
1 1
1 2
1 3
1 4
2 1
2 2
2 3
2 4
3 1
3 2
3 3
3 4
4 1
4 2
4 3
4 4
7
2 1
1 1
2 2
1 2
2 3
1 3
2 4

`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  const result = solve(testInput)
}
// ローカル実行環境
else if (require.main === module) {
  const fs = require('fs')
  const input = fs.readFileSync(0, 'utf8') // 標準入力を直接読み取り
  const result = solve(input)
}
