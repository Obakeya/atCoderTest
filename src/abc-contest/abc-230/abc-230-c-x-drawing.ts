/**
 * この問題で要求していること
 * P行目からQ行目かつ
 * R列目からS列目の出力をする。
 *
 * 出力時、i行目はP+i-jで表現でき、
 * R列目は R+j-iで表現できる
 *
 * Nは10 ^18であることから、全探索は現実的ではない
 * あるマスが黒かどうか、白かどうかを判定する関数を用意し、
 * それを基に、あるマスが黒かどうかを判定する
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')

  const [N, A, B] = lines[0].split(' ').map(BigInt)
  const [P, Q, R, S] = lines[1].split(' ').map(BigInt)

  // BigInt用のmax/min関数
  // reduceで配列の要素を順番に処理し、1つにまとめる
  // 三項演算子で値の大きさを比較し、値の大きいほうまたは低い方を維持し続ける
  const BigIntMax = (...args: bigint[]) =>
    args.reduce((a, b) => (a > b ? a : b))
  const BigIntMin = (...args: bigint[]) =>
    args.reduce((a, b) => (a < b ? a : b))

  const max1miusA1minusB = BigIntMax(1n - A, 1n - B)
  const minNminusANminusB = BigIntMin(N - A, N - B)
  const max1minusABminusN = BigIntMax(1n - A, B - N)
  const minNminusABminus1 = BigIntMin(N - A, B - 1n)

  const isBlack = (i: bigint, j: bigint) => {
    // 1つ目の操作: (A+k, B+k) → i-j = A-B の直線上
    if (i - j === A - B) {
      const k = i - A
      if (max1miusA1minusB <= k && k <= minNminusANminusB) {
        return true
      }
    }

    // 2つ目の操作: (A+k, B-k) → i+j = A+B の直線上
    if (i + j === A + B) {
      const k = i - A
      if (max1minusABminusN <= k && k <= minNminusABminus1) {
        return true
      }
    }

    return false
  }

  const ans = []

  // Q-P+1行分処理する（ループカウンタは通常のnumberでOK）
  const rowCount = Number(Q - P + 1n)
  const colCount = Number(S - R + 1n)

  for (let i = 1; i <= rowCount; i++) {
    // S-R+1列分処理する
    const row = []
    for (let j = 1; j <= colCount; j++) {
      const ii = P + BigInt(i) - 1n
      const jj = R + BigInt(j) - 1n

      if (isBlack(ii, jj)) row.push('#')
      else row.push('.')
    }
    ans.push(row.join(''))
  }

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
1000000000000000000 999999999999999999 999999999999999999
999999999999999998 1000000000000000000 999999999999999998 1000000000000000000
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
