export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  const T = lines[1]
  const A = lines[2]

  for (let i = 0; i < N; i++) {
    if (T[i] === 'o' && A[i] === 'o') {
      console.log('Yes')
      return
    }
  }
  console.log('No')
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `10
xoooxoxxxo
ooxooooxoo

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
