/**　問題メモ */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  const arr = Array(N + 1).fill(0)

  arr[0] = 1
  arr[1] = 1
  // arr[2] = 2

  // let valueAcc = 2
  // let lastValue = 2

  for (let i = 2; i <= N; i++) {
    let sum = 0
    for (let j = 0; j <= i; j++) {
      sum += convert(arr[j])
    }

    arr[i] = sum
  }

  function convert (number: number) {
    let sum = 0
    const numStr = number.toString()
    const numArr = numStr.split('')

    for (const num of numArr) {
      sum += +num
    }
    return sum
  }

  /**　ロジックの実装 */

  console.log(arr[N])
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
45
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
