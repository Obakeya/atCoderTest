/**　問題メモ
 * 記憶配列の作り方として、左→右で訪れる場合、
 * 上→下で訪れる場合を管理しておくことで、そのパターンでの訪問が行われているかどうかは
 * 判断できそう。
 *
 * 通ったマスに書かれた整数がすべて異なるときのみ、高橋君はうれしくなるとのこと。
 * 探索ごとにSetを使って、判定できるかでやってみる？
 *
 *マス数は高々
 *　バックトラッキングで解けそう？
 * その経路にたどり着いた時点で、これまで取ったマスの数をどう管理するかが
 * 問題
 * 次のマスに行くごとに、
 * その数値を持っていない前提で管理する必要がありそう
 *
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [H, W] = lines[0].split(' ').map(Number)
  const A = lines.slice(1).map(x => x.split(' ').map(Number))

  const dx = [1, 0]
  const dy = [0, 1]
  let ansCount = 0
  const foundNumbers = new Set<number>()

  function dfs (x: number, y: number) {
    if (x === W - 1 && y === H - 1) {
      ansCount++
      return
    }

    for (let k = 0; k < 2; k++) {
      const xx = x + dx[k]
      const yy = y + dy[k]
      //もし境界からはみ出していたら、探索終了
      if (W - 1 < xx || H - 1 < yy) continue

      const a = A[yy][xx]

      //そのマスへの移動は嬉しくないことが確定したので探索打ち切り
      if (foundNumbers.has(a)) continue

      //到達を確定して次の位置へ
      foundNumbers.add(a)
      dfs(xx, yy)
      //先ほどの位置を通らなかった場合の検証を行えるようにする
      foundNumbers.delete(a)
    }
  }

  foundNumbers.add(A[0][0])
  dfs(0, 0)

  console.log(ansCount)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
3 3
3 2 2
2 1 3
1 5 4

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
