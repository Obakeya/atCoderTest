/**　典型的な、imos法を使って解ける、典型的な問題 */
export function solve (input: string) {
  const lines = input.trim().split('\n')

  const [NWall, MHoudai] = lines[0].split(' ').map(Number)

  let imos = Array(NWall + 1).fill(0)

  for (let i = 1; i <= MHoudai; i++) {
    const [L, R] = lines[i].split(' ').map(Number)
    imos[L - 1] += 1
    imos[R] -= 1
  }

  let minHoudaiCount = imos[0] //初期化
  for (let i = 1; i <= NWall; i++) {
    imos[i] += imos[i - 1]
    minHoudaiCount = Math.min(minHoudaiCount, imos[i - 1])
  }

  return minHoudaiCount
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `5 10
2 5
1 5
1 2
2 4
2 2
5 5
2 4
1 2
2 2
2 3

`
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
