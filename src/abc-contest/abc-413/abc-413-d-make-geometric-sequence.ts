///正答しなかった
export function solve (input: string) {
  const lines = input.trim().split('\n')
  /**　全探索で解けるかどうか
   * テストケースは 10^5あり、テストケース内のAは 2 * 10 ^5 ある
   * まず愚直法で解けるか試してみるか
   *
   */

  let answer = []
  for (let i = 1; i < lines.length; i++) {
    const N = +lines[i]
    i++
    const Ai = lines[i].split(' ').map(Number)
    Ai.sort((a, b) => Math.abs(a) - Math.abs(b))
    const r = Ai[1] / Ai[0]

    let yesResult = true

    for (let j = 0; j < Ai.length - 1; j++) {
      const current = Ai[j]
      const next = Ai[j + 1]
      if (current * r === next) continue
      else {
        yesResult = false
        break
      }
    }

    if (yesResult) answer.push('Yes')
    else answer.push('No')
  }
  console.log(answer.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `3
5
1 8 2 4 16
5
-16 24 54 81 -36
7
90000 8100 -27000 729 -300000 -2430 1000000
`
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
