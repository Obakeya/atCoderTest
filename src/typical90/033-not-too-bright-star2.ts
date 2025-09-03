/**
 * マスは高々100^2
 * マスのすべての点灯パターンは 2^10000
 * なんらか簡略化した計算が必要
 * 隣接4マスの中に、LEDは1つしか配置できない
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [H, W] = lines[0].split(' ').map(Number)
  const h2 = Math.ceil(H / 2)
  const w2 = Math.ceil(W / 2)

  const ans = []

  let count = 0

  if (H === 1 || W === 1) count = H * W
  else count = h2 * w2

  ans.push(count)

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
3 6

 
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
