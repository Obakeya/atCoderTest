export function solve (input: string) {
  const lines = input.trim().split('\n')
  /**　oはどのように使い切ってもいい
   * Sが#のときはTも#に揃える
   * oが2つ以上登場するときに、は、2つ以上登場するoの間に最低#が1つ必要となる
   * ↑をどう実装するか
   *　Sにおいて、.が与えられたときに、#を置けるかどうかを検討したい
   */
  const SArray = lines[0].split('')
  const tBase = []
  let oCount = 0
  let betweenSharpApperead = false
  for (let i = 0; i < SArray.length; i++) {
    if (SArray[i] === '#') {
      tBase.push('#')
      betweenSharpApperead = true
      continue
    }
    //'.'のとき　　. にするか oにするか検証する
    //1つめの oは何も気にせず置ける
    // 2つめ以降は手前に # の出現が1つ以上必要
    if (oCount === 0 || betweenSharpApperead) {
      tBase.push('o')
      oCount++
      betweenSharpApperead = false
      continue
    }

    //#が登場していない状態の時
    tBase.push('.')
  }

  console.log(tBase.join(''))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `...#..#.##.#.
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
