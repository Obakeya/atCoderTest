export function solve (input: string): string {
  const lines = input.trim().split('\n')
  const a = parseInt(lines[0])
  const [b, c] = lines[1].split(' ').map(Number)
  const s = lines[2]
  return `${a + b + c} ${s}`
}

// --- 提出時ここから削除 ---
// テスト実行用のコード
if (process.env.NODE_ENV === 'test') {
  // シンプルなテストケース
  const testInput = `1
2 3
test
`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  console.log(solve(testInput))
}
// --- 提出時ここまで削除 ---

// 提出時に残す部分
if (require.main === module && process.env.NODE_ENV !== 'test') {
  const fs = require('fs')
  const input =
    process.platform === 'win32'
      ? fs.readFileSync(0, 'utf8')
      : fs.readFileSync('/dev/stdin', 'utf8')
  console.log(solve(input))
}
