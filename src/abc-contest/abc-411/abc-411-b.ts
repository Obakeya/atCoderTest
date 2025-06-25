export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  const D = lines[1].split(' ').map(Number)

  /**
   * Nの駅分ループして、距離を記録、スタート駅ごとに
   * console.log
   * 　ロジックの実装 */

  let sumDistance = 0
  let array = []
  for (let i = 0; i < D.length; i++) {
    for (let j = i; j < D.length; j++) {
      const result = sumDistance + D[j]
      array.push(result)
      sumDistance += D[j]
    }
    console.log(array.join(' '))
    sumDistance = 0 //初期化
    array = []
  }
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `2
100

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
