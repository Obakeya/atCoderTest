/**　コミット時問題のurlを書く */
export function solve (input: string): number {
  const tokens = input.trim().split(/\s+/) // \s人気の空白文字 +は直前のパターンの1回以上の繰り返し
  let index = 0

  // 便利な入力関数群
  const next = () => tokens[index++] // 次の文字列を取得
  const nextNum = () => +tokens[index++] // 次の数値を取得
  const nextBigInt = () => BigInt(tokens[index++]) // 次のBigIntを取得

  // 配列取得用のヘルパー関数 1 2 3 のような、行ごとの指定の値が配列の時に利用しても良い
  const nextNums = (length: number) => {
    const arr = Array(length)
    for (let i = 0; i < length; i++) arr[i] = nextNum()
    return arr
  }

  // ===== ここからロジックを実装 =====
  // 例: N個の入力を読み込む場合
  const N = nextNum()

  // ここに問題固有のロジックを実装

  return 0 // 解答を返す
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = ``
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
    console.log(solve(input).toString())
  } catch (e) {
    const input = []
    require('readline')
      .createInterface({ input: process.stdin })
      .on('line', line => input.push(line))
      .on('close', () => console.log(solve(input.join('\n')).toString()))
  }
}
