/**　問題メモ */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  const A = lines[1].split(' ').map(Number)
  const B = lines[2].split(' ').map(Number)
  const C = lines[3].split(' ').map(Number)
  let count = 0

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < N; k++) {
        const ans = A[i] + B[j] + C[k]
        if (ans % 46 === 0) count++
      }
    }
  }
  /**　ロジックの実装 */

  console.log(count)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
20
238 395 46 238 264 114 354 52 324 14 472 64 307 280 209 24 165 194 179 248
270 83 377 332 173 21 362 75 66 342 229 117 124 481 48 235 376 13 420 74
175 427 76 278 486 169 311 47 348 225 41 482 355 356 263 95 170 156 340 289


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
