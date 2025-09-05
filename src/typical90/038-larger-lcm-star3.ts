/**　問題メモ: 最小公倍数を求める。10^18を超える場合は"Large"を出力
 * lcm...最小公倍数の意味
 *
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [A, B] = lines[0].split(' ').map(x => BigInt(x))

  const ans = []

  /**　最大公約数と最小公倍数の関係性メモ
   * lcm(A,B) = (A * B) / gcd( A,B)
   * lcm(A,B) * gcd(A,B) = A * B
   * コードに落とすと
   * lcm(A,B) = (A * B) / g
   * → lcm(A,B) = C * B
   *
   */

  // 最大公約数を求める（ユークリッドの互除法）
  function gcd (a: bigint, b: bigint): bigint {
    if (b === 0n) return a
    return gcd(b, a % b)
  }

  const THRESHOLD = 1000000000000000000n // 10^18

  const g = gcd(A, B) // 最大公約数
  const C = A / g // A を gcd で割った値

  // lcm(A, B) = C * B だが、オーバーフローを避けるため事前チェック
  // B * Cを直接計算すると、オーバーフローする可能性がある
  // 判定したい条件は C * B <= THRESHOLDかどうか、
  // 式変形を行って B <= THRESHOLD /C
  if (B <= THRESHOLD / C) {
    ans.push((C * B).toString())
  } else {
    ans.push('Large')
  }

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
1000000000000000000 1
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
