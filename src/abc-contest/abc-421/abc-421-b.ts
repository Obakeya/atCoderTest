/**　問題メモ */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [X, Y] = lines[0].split(' ').map(Number)
  /**　ロジックの実装
   * 和算の結果が2桁以上になったら逆の値で取り始める
   *
   *
   */

  const ans = []

  let nums = Array(10 + 1).fill(0)
  nums[1] = X
  nums[2] = Y

  for (let i = 3; i <= 10; i++) {
    const temp = nums[i - 2] + nums[i - 1]

    if (temp < 10) {
      nums[i] = temp
      continue
    }

    const tempStr = temp.toString()
    const process = Array(tempStr.length).fill('')
    for (let j = tempStr.length - 1; 0 <= j; j--) {
      process[process.length - 1 - j] = tempStr[j]
    }

    while (process[0] === '0') process.shift()

    const newNum = +process.join('')

    nums[i] = newNum
  }

  console.log(nums[10])
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
90701 90204

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
