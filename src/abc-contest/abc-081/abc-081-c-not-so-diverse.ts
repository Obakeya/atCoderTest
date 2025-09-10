/**
 * 登場する数が多い順に数をリストアップし、
 * 多い順のK種類分は入れて、
 * 残りの種類分のボールの数分書き換えを行う、というアルゴリズムが必要
 *
 * 登場する数のカウントアップはMapで行えそうだが
 * どの種類のどの数がどれだけ多いか、というのをどう効率的に管理するかが問題になりそう
 *
 * カウントアップ用の配列を用意して、それ以外の配列の数を足すアプローチにしてみるか
 *
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, K] = lines[0].split(' ').map(Number)
  const A = lines[1].split(' ').map(Number)

  const memory = Array(N + 1).fill(0)

  for (const a of A) memory[a] += 1

  memory.sort((a, b) => b - a)

  let rewriteCount = 0
  for (const m of memory.slice(K)) rewriteCount += m

  /**　ロジックの実装 */

  console.log(rewriteCount)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
10 3
5 1 3 2 4 1 1 2 3 4
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
