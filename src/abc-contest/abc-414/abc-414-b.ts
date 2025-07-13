export function solve (input: string) {
  const lines = input.trim().split('\n')
  /**　ロジックの実装 */

  let Slength = 0
  for (let i = 1; i < lines.length; i++) {
    const [c, l] = lines[i].split(' ') //c 文字、 lが数
    Slength += +l
    if (100 < Slength) {
      console.log('Too Long')
      return
    }
  }

  let processString = ''
  for (let i = 1; i < lines.length; i++) {
    const [c, l] = lines[i].split(' ') //c 文字、 lが数

    for (let j = 0; j < +l; j++) {
      processString += c
    }
  }

  console.log(processString)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `6
g 4
j 1
m 4
e 4
d 3
i 4

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
