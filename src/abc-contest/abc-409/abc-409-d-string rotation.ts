export function solve (input: string) {
  const lines = input.trim().split('\n')

  for (let i = 1; i < lines.length; i++) {
    i++
    const text = lines[i].split('')

    let movingChar = ''
    let deleteIndex = 0
    let logged = false
    for (let j = 0; j < text.length - 1; j++) {
      const currentChar = text[j]
      const nextChar = text[j + 1]
      if (movingChar === '') {
        //a, c, b のように、後の文字のほうが今の文字より小さい場合、今の文字を後ろに送る必要がある
        if (currentChar > nextChar) {
          movingChar = currentChar
          deleteIndex = j
          //ここでcontinueしてはダメ。 a,c,bのように、最後の文字列の探索のループ処理で c > bを発見したさいに
          // cをbに送る隙が無くなるため
        }
      }

      if (movingChar !== '') {
        if (movingChar < text[j]) {
          text.splice(j, 0, movingChar)
          text.splice(deleteIndex, 1)
          console.log(text.join(''))
          logged = true
          break
        } else if (movingChar < text[j + 1]) {
          //最後の文字の手前に置くべき分かった場合
          text.splice(j + 1, 0, movingChar)
          text.splice(deleteIndex, 1)
          console.log(text.join(''))
          logged = true
          break
        } else if (j === text.length - 2) {
          // 最後の文字の位置におくべきと分かった阿合
          text.push(movingChar)
          text.splice(deleteIndex, 1)
          console.log(text.join(''))
          logged = true
          break
        }
      }
    }
    if (!logged) console.log(lines[i]) ///すべて辞書順だったとき
  }
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `3
7
atcoder
1
x
5
snuke
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
