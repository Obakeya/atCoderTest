/**　問題メモ */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, K] = lines[0].split(' ')
  const kNum = parseInt(K, 10)

  function convert (octalStr: string): string {
    const decimal = BigInt('0o' + octalStr)
    let nineBase = decimal.toString(9)

    nineBase = nineBase.replace(/8/g, '5')
    return nineBase
  }

  let target = N
  for (let j = 0; j < kNum; j++) target = convert(target)

  /**　ロジックの実装 */

  console.log(target)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
21 1



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
