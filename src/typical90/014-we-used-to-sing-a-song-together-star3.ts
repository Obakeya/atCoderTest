/**　ソートした結果を比較していくことで最小値が求まることを理解できるかどうかが問われる
 *https://x.com/e869120/status/1382478816627478530/photo/1
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  const aArray = lines[1]
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b)
  const bArray = lines[2]
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b)

  let minSum = 0

  for (let i = 0; i < N; i++) {
    const dist = Math.abs(aArray[i] - bArray[i])
    minSum += dist
  }

  const ans = []
  ans.push(minSum)

  /**　ロジックの実装 */

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `20
804289382 846930886 681692776 714636914 957747792 424238335 719885386 649760491 596516649 189641420 25202361 350490026 783368690 102520058 44897761 967513925 365180539 540383425 304089172 303455735
35005211 521595368 294702567 726956428 336465782 861021530 278722862 233665123 145174065 468703135 101513928 801979801 315634021 635723058 369133068 125898166 59961392 89018454 628175011 656478041

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
