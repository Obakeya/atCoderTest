/**　問題メモ
 * N個の整数から5個を選び、その積をPで割った余りがQになる組み合わせの数を求める
 * 大きな数の乗算でオーバーフローを防ぐため、prod関数で数値を分割して計算
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, P, Q] = lines[0].split(' ').map(Number)
  const A = lines[1].split(' ').map(Number)

  // 大きな数の乗算時のオーバーフローを防ぐ関数
  // 数値を100万で区切って上位部分と下位部分に分け、分配法則で計算
  const prod = (a: number, b: number, mod: number): number => {
    const al = Math.floor(a / 1e6) // aの上位部分
    const ar = a % 1e6 // aの下位部分
    const bl = Math.floor(b / 1e6) // bの上位部分
    const br = b % 1e6 // bの下位部分
    let p = 0
    p += ar * br // 下位同士
    p += (al * br + ar * bl) * 1e6 // 上位と下位の組み合わせ
    p += al * bl * (1e12 % mod) // 上位同士
    return p % mod
  }

  let ans = 0

  /**　ロジックの実装 */
  // 5重ループで5つの要素を選ぶ（i < j < k < l < m の順序）
  for (let i = 0; i < N - 4; i++) {
    for (let j = i + 1; j < N - 3; j++) {
      const ij = prod(A[i], A[j], P)
      for (let k = j + 1; k < N - 2; k++) {
        const ijk = prod(ij, A[k], P)
        for (let l = k + 1; l < N - 1; l++) {
          const ijkl = prod(ijk, A[l], P)
          for (let m = l + 1; m < N; m++) {
            if (prod(ijkl, A[m], P) === Q) {
              ans++
            }
          }
        }
      }
    }
  }

  console.log(ans)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
10 1 0
0 0 0 0 0 0 0 0 0 0
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
