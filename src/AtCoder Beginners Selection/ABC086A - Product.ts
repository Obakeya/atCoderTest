export function solve (input: string): string {
  const lines = input.trim().split('\n')
  const a = lines[0]
  let b = 0
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '1') {
      b++
    }
  }
  return b.toString()
}

// --- 提出時ここから削除 ---
// デバッグ用コード
if (process.env.NODE_ENV === 'test') {
  const testInput = `000
`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  console.log(solve(testInput))
} else {
  // ローカル実行用（Windows対応）
  if (require.main === module) {
    const fs = require('fs')
    const input =
      process.platform === 'win32'
        ? fs.readFileSync(0, 'utf8')
        : fs.readFileSync('/dev/stdin', 'utf8')
    console.log(solve(input))
  }
}
// --- 提出時ここまで削除し、下記のコメントアウトを解除する
// const fs = require('fs')
// const input = fs.readFileSync('/dev/stdin', 'utf8')
// console.log(solve(input))
