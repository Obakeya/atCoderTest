export function solve (input: string) {
  const lines = input.trim().split('\n')
  const nums = lines[1].split(' ').map(Number)

  let answer = 0n
  let sum = 0n

  for (let i = 0; i < nums.length; i++) {
    const current = BigInt(nums[i])
    answer += sum * current
    sum += current
  }

  console.log(answer.toString())
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `3
4 2 3

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
