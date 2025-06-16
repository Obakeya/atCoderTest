export function solve (input: string) {
  const lines = input.trim().split('\n')
  let answer = 0
  const nums = lines[1].split(' ').map(Number)

  calc(nums, 0)

  /**
   * 現在だと、、計算量がO(Nの2乗)のため、TLEになる。計算量をO(N)ぐらいにできないか。
   */
  function calc (array: number[], startIndex: number) {
    let targetNum = array[startIndex]
    for (let i = startIndex; i + 1 < array.length; i++) {
      answer += targetNum * array[i + 1]
    }

    if (startIndex + 1 < array.length) calc(nums, startIndex + 1)
    else return
  }
  /**　ロジックの実装 */
  console.log(answer)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `10
7781 8803 8630 9065 8831 9182 8593 7660 7548 8617
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
