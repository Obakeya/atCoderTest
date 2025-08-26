/**　問題メモ */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, Q] = lines[0].split(' ').map(Number)
  const aArray = lines[1].split(' ').map(Number)
  const bArray = lines[2].split(' ').map(Number)
  const ans = []

  let cuurentSum = 0
  for (let i = 0; i < aArray.length; i++) {
    const min = Math.min(aArray[i], bArray[i])
    cuurentSum += min
  }

  for (let i = 3; i < lines.length; i++) {
    const tempLines = lines[i].split(' ')
    const type = tempLines[0]
    const x = +tempLines[1]
    const v = +tempLines[2]

    const beforeMin = Math.min(aArray[x - 1], bArray[x - 1])

    if (type === 'A') {
      aArray[x - 1] = v
    } else {
      bArray[x - 1] = v
    }

    const newMin = Math.min(aArray[x - 1], bArray[x - 1])
    cuurentSum -= beforeMin
    cuurentSum += newMin
    ans.push(cuurentSum.toString())
  }

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
5 3
100 100 100 100 100
100 100 100 100 100
A 4 21
A 2 99
B 4 57

`.trim()
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
