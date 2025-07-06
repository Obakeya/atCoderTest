export function solve (input: string) {
  const lines = input.trim().split('\n')
  /**　選んだ i,jが異なっていても、連結した文字列が同じ場合は
   * 1通りで数えることに注意する
   * 数が少ないので、全探索でいけそう
   */

  const sets = new Set<string>()

  for (let i = 1; i < lines.length; i++) {
    for (let j = 1; j < lines.length; j++) {
      if (i === j) continue
      const concat = lines[i] + lines[j]
      sets.add(concat)
    }
  }

  console.log(sets.size)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `10
armiearggc
ukupaunpiy
cogzmjmiob
rtwbvmtruq
qapfzsitbl
vhkihnipny
ybonzypnsn
esxvgoudra
usngxmaqpt
yfseonwhgp

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
