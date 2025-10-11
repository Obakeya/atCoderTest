/**
 * 地殻変動後、新しい不便さを求める時に、元の絶対値の値だけ分かればいいのか、
 * それとも、元の要素が分かればいいのかどうかを知りたい
 *　E2...5
 *  E3...2
 * だとする。　このとき |E2 - E3| = 3
 * とする。
 * 　パターン1 E1, E2が4上がる地殻変動が起きたとする
 * 　このとき、3 + 4 =7 で求められる
 *  パターン2 E1,E2 が 7 下がる　地殻変動が起きたとする
 * 　|3 -7 |= -4 あっている
 * パターン3 E3,E4が 3上がる地殻変動が起きたとする
 * 　このとき、 3 -3 = 0 で求められる
 *  パターン4 E3, E4 が3下がる地殻変動が起きたとする
 * |5 - (-1) | = 6 となる。　 3 -(-3) = 6よ
 *
 * 結論、各種元の位置の記憶は必要なく、各区間ごとの不便さだけの記憶だけあればよさそう
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, Q] = lines[0].split(' ').map(Number)
  const A = lines[1].split(' ').map(Number)
  const unConvi = []

  unConvi.push(0) // 1の値を受け取って、ターゲットの配列の値を受け取るため、設定しておく
  let unConviSum = 0
  for (let i = 1; i < A.length; i++) {
    const result = A[i - 1] - A[i] //ここでは、絶対値にしちゃダメ
    unConvi.push(result)
    unConviSum += Math.abs(result)
  }
  const ans = []

  for (let i = 2; i < lines.length; i++) {
    const [L, R, V] = lines[i].split(' ').map(Number)
    let leftBeforeAbs = 0,
      leftAfterAbs = 0

    if (L !== 1) {
      const leftBefore = unConvi[L - 1]
      leftBeforeAbs = Math.abs(leftBefore)
      const leftAfter = leftBefore - V
      unConvi[L - 1] = leftAfter
      leftAfterAbs = Math.abs(leftAfter)
    }

    let rightBeforeAbs = 0,
      rightAfterAbs = 0

    if (R !== N) {
      const rightBefore = unConvi[R]
      rightBeforeAbs = Math.abs(rightBefore)
      const rightAfter = rightBefore + V
      unConvi[R] = rightAfter
      rightAfterAbs = Math.abs(rightAfter)
    }
    unConviSum += -leftBeforeAbs + leftAfterAbs - rightBeforeAbs + rightAfterAbs

    ans.push(unConviSum)
  }

  /**　ロジックの実装 */

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
20 10
61 51 92 -100 -89 -65 -89 -64 -74 7 87 -2 51 -39 -50 63 -23 36 74 37
2 2 -45
6 19 82
2 9 36
7 13 71
16 20 90
18 20 -24
14 17 -78
10 11 -55
7 19 -26
20 20 -7
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
