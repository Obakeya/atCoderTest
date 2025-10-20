/**
 * 特定の位置に加算していく処理と、　
すべての値を置き換える処理があることから、
特定の位置に加算される処理が無効化されることをコード上どう表現するかがポイント
素直にすべてクリアする。各値ごとの加算結果の管理を配列で行っていると、クリアに
O(N)かかってしまうか、Mapで管理しておくことで o(1)でクリアが行える
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  const A = lines[1].split(' ').map(Number)
  const Q = +lines[2]
  const ans = []

  let lastType1Index = -1 // 最後に出現したtype1のクエリ番号
  let lastType1Value = 0 // そのときのx値
  const sumAfterType1 = new Map<number, number>() // type1以降の各位置への加算累積

  for (let i = 0; i < Q; i++) {
    const [type, a, b] = lines[3 + i].split(' ').map(Number)

    if (type === 1) {
      // type1が出現 = 全リセット
      lastType1Index = i
      lastType1Value = a
      sumAfterType1.clear()
    } else if (type === 2) {
      // 位置aにbを加算
      const current = sumAfterType1.get(a) || 0
      sumAfterType1.set(a, current + b)
    } else if (type === 3) {
      // 位置aの現在値を出力
      const addedValue = sumAfterType1.get(a) || 0

      if (lastType1Index === -1) {
        // type1が一度も出現していない = 初期値ベース
        ans.push(A[a - 1] + addedValue)
      } else {
        // type1以降 = type1の値ベース
        ans.push(lastType1Value + addedValue)
      }
    }
  }

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
5
3 1 4 1 5
6
3 2
2 3 4
3 3
1 1
2 3 4
3 3

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
