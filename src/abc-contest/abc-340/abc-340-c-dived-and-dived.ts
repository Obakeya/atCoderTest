/**
 * BigIntで扱う必要あり。
 * 問題文通りの実装をした場合、2secの制限時間に間に合わなさそう
 * 圧縮の計算式を考えるため、方程式を考えてみる
 *
 * 総和 = N + 2/n * 2 + 4/N
 * 2 → 2 = 2
 * 3 → 5 = 3 + 2
 * 4 → 8 = 4 + (2+2)
 * 5 → 12 = 5 + [2] + [3]　...
 * DPで解く問題に間違いない。
 *
 *
 * 下から順番に解いていくと、O(N)で最大 10^17の計算となり、メモリがオーバーフローする。
 * 最大値から分割して値を求めていくことで、O(logN * logN)のざっくりの計算量で求められる。
 *
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = BigInt(lines[0])

  const dpMap = new Map<bigint, bigint>() // 型名は小文字のbigint
  dpMap.set(1n, 0n)
  dpMap.set(0n, 0n)

  function dp (x: bigint) {
    if (dpMap.has(x)) {
      return dpMap.get(x)
    }

    const div1 = x / 2n // BigIntの小数点以下繰りさげ（デフォルト）
    const div2 = x / 2n + (x % 2n) // BigIntの小数点以下繰り上げの実装方法

    const result = x + dp(div1) + dp(div2)
    dpMap.set(x, result)
    return result
  }

  console.log(dp(N).toString())
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
100000000000000000

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
