/**　問題メモ
 * N個のサイコロの出目の積の総和を求める問題
 * 各サイコロの面の値の総和を掛け合わせることで解決
 * 因数分解の性質を利用: (a₁+...+a₆) × (b₁+...+b₆) × ...
 * これを因数分解すると：
 * (a1 + a2 + ... + a6) * (b1 + b2 + ... + b6) となる。
 * つあんり、各サイコロの面の値の総和の積が答えとなる。計算量はO(N)
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]

  const MOD = 1000000007
  let answer = 1

  /**　ロジックの実装 */
  for (let i = 1; i <= N; i++) {
    const diceValues = lines[i].split(' ').map(Number)

    // 各サイコロの面の値の総和を計算
    const sum = diceValues.reduce((acc, val) => acc + val, 0)

    // 答えに掛け合わせ（mod演算）
    answer = (answer * sum) % MOD
  }

  console.log(answer)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `         
7
19 23 51 59 91 99
15 45 56 65 69 94
7 11 16 34 59 95
27 30 40 43 83 85
19 23 25 27 45 99
27 48 52 53 60 81
21 36 49 72 82 84
              

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
