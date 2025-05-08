export function solve (input: string): string {
  const lines = input.trim().split('\n')
  const length = +lines[0]
  const nums = lines[1].split(' ').map(s => +s)
  let divisionLoopCount = 0
  let loop = true

  //2で割った余りが0で無くなるまで、ループする
  //2で割った数を配列に再度格納する
  //2で割った余りが0でない数字が現れた時点で、ループを終了する

  while (loop) {
    for (let i = 0; i < length; i++) {
      const rem = nums[i] % 2
      if (rem !== 0) {
        loop = false
        break
      }
      nums[i] = nums[i] / 2

      if (i === length - 1) {
        divisionLoopCount++
      }
    }
  }

  return divisionLoopCount.toString()
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `3
8 12 40
`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  console.log(solve(testInput))
}
// ローカル実行環境の場合
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
      .on('close', () => console.log(solve(input.join('\n'))))
  }
}
