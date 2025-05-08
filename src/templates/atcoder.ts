export function solve (input: string): string {
  const lines = input.trim().split('\n')
  //ロジックの実装
  return ''
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = ``
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

// 提出環境では以下が自動的に実行される
if (!process.env.NODE_ENV && require.main === module) {
  const fs = require('fs')
  const input = fs.readFileSync('/dev/stdin', 'utf8')
  console.log(solve(input))
}
