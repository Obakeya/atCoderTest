/**　コミット時問題のurlを書く */
export function solve (input: string): string {
  const [NK, AN] = input.trim().split('\n')
  const [N, K] = NK.split(' ').map(Number)
  const A = AN.split(' ').map(BigInt)

  let now = BigInt(1)
  const KBig = BigInt(K)
  const ten = BigInt(10)

  for (let i = 0; i < N; i++) {
    now *= A[i]
    if (now >= ten ** KBig) {
      now = BigInt(1)
    }
  }

  return now.toString()
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `5 2
7 13 3 2 5

`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  console.log(solve(testInput).toString())
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
      .on('close', () => console.log(solve(input.join('\n')).toString()))
  }
}
