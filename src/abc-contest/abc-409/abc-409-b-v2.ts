export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  /**　ロジックの実装
   * コンテスト中は正答できなかったため、解説をベースに回答を作成

   */

  const A = lines[1].split(' ').map(Number)

  for (let x = N; 0 <= x; x--) {
    const count = A.filter(value => value >= x).length

    if (x <= count) {
      console.log(x)
      return
    }
  }

  console.log(0)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
7
1 6 2 10 2 3 2


`
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
