export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [Nbox, Qball] = lines[0].split(' ').map(Number)
  const X = lines[1].split(' ').map(Number)

  // let boxesMap = new Map<number, box>()

  // for (let i = 1; i <= Nbox; i++) {
  //   const b = new box()
  //   b.number = i
  //   boxesMap.set(i, b)
  // }
  let boxes = new Array(Nbox).fill(0)

  /**　ロジックの実装
   * 下記のアルゴリズムをどう処理するか
   * Xi=0のとき、ボールを現在入っているボールが最も少ない
   * 箱の内番号が最小である箱に入れる。
   *
   * 愚直に先頭から処理した場合、入っているボールが最も少ない箱と
   * そのグループが最小である箱、ということの判断には
   * まず、ボールの数での全体のソート、その後同じボールの数の中でのソートが必要
   *
   * 全体の数が100だが、
   *
   * 100 * 100 log 100 8 ...となるとパフォーマンスが厳しいかも
   *
   * --
   * 最後の答えでは、ボールをいれた箱のindexを管理しておく必要がある。
   *
   *
   *
   */
  let answer = []
  let minCount
  let minBoxNumber
  for (let q = 0; q < Qball; q++) {
    if (X[q] >= 1) {
      boxes[X[q] - 1]++
      answer.push(X[q])
    } else {
      minCount = 101
      minBoxNumber = 101
      for (let j = 0; j < Nbox; j++) {
        if (
          boxes[j] < minCount ||
          (boxes[j] <= minCount && j + 1 <= minBoxNumber)
        ) {
          minCount = boxes[j]
          minBoxNumber = j + 1
        }
      }
      answer.push(minBoxNumber)
      boxes[minBoxNumber - 1]++
    }
  }

  console.log(answer.join(' '))
}

// export class box {
//   ballCount = 0
//   number = 0
// }

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `6 20
4 6 0 3 4 2 6 5 2 3 0 3 2 5 0 3 5 0 2 0

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
