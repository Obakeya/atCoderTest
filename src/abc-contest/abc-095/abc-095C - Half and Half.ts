export function solve (input: string) {
  const [A, B, C, X, Y] = input.trim().split(' ').map(Number)
  /** Aピザ、Bピザを直接買うのか、ABピザを2枚買って、Aピザ1枚、
   * Bピザ1枚、にするのかいいのかをどう判定するのか
   *
   * 3段階ぐらいで考えるとよさそう。
   * Aピザ、Bピザ、まだ両方とも足りないとき、
   */
  // A、B両方足りないときに買うための判定
  const CReasonalbe = 2 * C < A + B

  const useA = A < 2 * C
  const useB = B < 2 * C

  let aCount = 0
  let bCount = 0
  let usedYen = 0

  if (CReasonalbe) {
    while (X !== aCount && Y !== bCount) {
      usedYen += 2 * C
      aCount++
      bCount++
    }
  }

  //Aピザをそろえる
  while (X !== aCount) {
    if (useA) {
      usedYen += A
    } else {
      usedYen += 2 * C
    }
    aCount++
  }
  //Bピザをそろえる
  while (Y !== bCount) {
    if (useB) {
      usedYen += B
    } else {
      usedYen += 2 * C
    }
    bCount++
  }

  return usedYen
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `1500 2000 500 90000 100000
`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  console.log(solve(testInput).toString())
}
// ローカル実行環境
else if (require.main === module) {
  const fs = require('fs')
  const input = fs.readFileSync(0, 'utf8') // 標準入力を直接読み取り
  console.log(solve(input).toString())
}
