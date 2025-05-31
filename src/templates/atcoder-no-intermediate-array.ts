/**　コミット時問題のurlを書く */
export function solve (input: string) {
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
// ローカル実行環境
else if (require.main === module) {
  const fs = require('fs')
  const input = fs.readFileSync(0, 'utf8') // 標準入力を直接読み取り
  console.log(solve(input).toString())
}
