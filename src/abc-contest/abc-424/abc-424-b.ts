/**　問題メモ */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, M, K] = lines[0].split(' ').map(Number)

  const map = new Map<number, number>() //キー人の番号、解..問題に正解した数

  const ans = []
  for (let i = 1; i < lines.length; i++) {
    //aが人、bが問題
    const [a, b] = lines[i].split(' ').map(Number)

    if (!map.has(a)) map.set(a, 0)

    const curAnsCnt = map.get(a)

    map.set(a, curAnsCnt + 1)

    if (curAnsCnt + 1 === M) ans.push(a)
  }

  /**　ロジックの実装 */

  console.log(ans.join(' '))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
2 2 2
1 1
2 2


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
