/**　
 
 * 
 */
export function solve (input: string): Number {
  const digits = Array.from(input.trim(), Number)

  //まず、ボタンAを押下する回数は桁数と一致する
  let totalOperations = digits.length

  //桁ごとにボタンBを押下する回数を加算していく
  for (let i = 0; i < digits.length; i++) {
    const current = digits[i]
    const next = i < digits.length - 1 ? digits[i + 1] : 0 //最後の桁数のボタンBの押下の回数は、Sjの値と等しいため0でよい
    const bCount = (10 + current - next) % 10
    totalOperations += bCount
  }

  return totalOperations
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `2025524202552420255242025524


`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  console.log(solve(testInput))
}
// ローカル実行環境の場合（テスト環境でない && require.mainがmodule）
else if (require.main === module) {
  // node.jsの標準モジュール
  const fs = require('fs')
  try {
    // Windows/Unix対応
    const input =
      process.platform === 'win32'
        ? fs.readFileSync(0, 'utf8')
        : fs.readFileSync('/dev/stdin', 'utf8')
    console.log(solve(input))
  } catch (e) {
    const input = []
    require('readline')
      .createInterface({ input: process.stdin })
      .on('line', line => input.push(line))
      .on('close', () => console.log(solve(input.join('\n'))))
  }
}
