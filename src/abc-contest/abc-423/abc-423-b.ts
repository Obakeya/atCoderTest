/**
 * 0,1,2,3,4,5 と部屋がある
 *
 * このとき、N個のドアがある
 * 0なら移動可能、1なら移動不可
 *
 * 0 1 0 0 1
 *
 * 2,3,4が到達できない部屋　このとい、Aの位置は1,Bの位置は5
 *
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  const L = lines[1].split(' ').map(Number)

  //左から右に0が移動できるまで移動する
  let aSanCurPos = 0
  for (let i = 0; i < L.length; i++) {
    const door = L[i]

    if (door === 0) aSanCurPos++
    else break
  }

  let bSanCurPos = N
  for (let i = L.length - 1; 0 <= i; i--) {
    const door = L[i]

    if (door === 0) bSanCurPos--
    else break
  }

  let ans = 0
  if (bSanCurPos <= aSanCurPos) ans = 0
  else ans = bSanCurPos - aSanCurPos - 1

  /**　ロジックの実装 */

  console.log(ans)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
5
0 1 0 0 1


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
