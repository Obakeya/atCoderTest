/**　問題メモ
 * ABC286-C: Rotate and Palindrome
 * 文字列を回転させ、回文にするための最小コストを求める
 * - 左に1文字回転: コストa
 * - 任意の文字を変更: コストb
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, A, B] = lines[0].split(' ').map(Number)
  const S = lines[1]

  /**　ロジックの実装 */

  // 文字列を2倍にすることで、回転操作を簡潔に表現
  const doubledS = S + S

  let ans = Number.MAX_SAFE_INTEGER

  // すべての回転位置を試す (0回転 ~ N-1回転)
  for (let i = 0; i < N; i++) {
    // i回回転させるコスト
    let cost = A * i

    // 回転後の文字列で回文チェック
    // 前半と後半を比較し、異なる文字のペア数を数える
    for (let j = 0; j < Math.floor(N / 2); j++) {
      const leftPos = i + j
      const rightPos = i + N - 1 - j

      if (doubledS[leftPos] !== doubledS[rightPos]) {
        cost += B
      }
    }

    ans = Math.min(ans, cost)
  }

  console.log(ans)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
8 1000000000 1000000000
bcdfcgaa


`.trim()
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  solve(testInput)
}
// ローカル実行環境
else if (require.main === module) {
  const fs = require('fs')
  const input = fs.readFileSync(0, 'utf8')
  solve(input)
}
