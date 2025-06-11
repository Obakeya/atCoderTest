export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, K] = lines[0].split(' ').map(Number)

  const NKArray = []
  for (let i = 1; i < lines.length; i++) {
    NKArray.push(lines[i].split(' ').map(Number))
  }
  NKArray.sort((a, b) => a[0] - b[0])

  /** 素直に計算すると思うと、
   * N * Nの計算量になって、間に合わない。なんらか工夫が必要。
   * N 回の挿入操作後の配列の中で、K番目に小さい数を求める。
   * 少なくともO(n)ぐらいにはしたい。
   * ソートして貪欲法を使う。
   * 計算量
   * N -1　+ n log n + N(貪欲法)
   */

  let currentCount = 0
  // Kに到達した時点で処理をbreak
  for (let i = 0; i < N; i++) {
    const a = NKArray[i][0]
    const b = NKArray[i][1]
    currentCount += b

    if (K <= currentCount) {
      console.log(a)
      return
    }
  }
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `3 4
1 1
2 2
3 3

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
