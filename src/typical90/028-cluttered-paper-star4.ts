/**
 * 問題メモ: 二次元imos法を使って長方形の重なりを効率的に計算
 * N個の長方形が与えられ、各i(1≤i≤N)について、
 * i個の長方形が重なっている座標の数を求める
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]

  // 長方形の座標を格納
  const rectangles: { lx: number; ly: number; rx: number; ry: number }[] = []
  for (let i = 1; i <= N; i++) {
    const [lx, ly, rx, ry] = lines[i].split(' ').map(Number)
    rectangles.push({ lx, ly, rx, ry })
  }

  // 二次元imos法用の差分配列 (存在可能な座標分、二次元配列を用意する)
  const cnt: number[][] = Array(1001)
    .fill(null)
    .map(() => Array(1001).fill(0))

  // Step 1: 差分配列に長方形を追加
  for (const rect of rectangles) {
    cnt[rect.lx][rect.ly] += 1 // 左上角に+1
    cnt[rect.lx][rect.ry] -= 1 // 右上角に-1
    cnt[rect.rx][rect.ly] -= 1 // 左下角に-1
    cnt[rect.rx][rect.ry] += 1 // 右下角に+1
  }

  // Step 2: 横方向の累積和　ここも座標分のループ
  for (let i = 0; i <= 1000; i++) {
    for (let j = 1; j <= 1000; j++) {
      cnt[i][j] += cnt[i][j - 1]
    }
  }

  // Step 3: 縦方向の累積和　ここも座標分のループ
  for (let i = 1; i <= 1000; i++) {
    for (let j = 0; j <= 1000; j++) {
      cnt[i][j] += cnt[i - 1][j]
    }
  }

  // Step 4: 各重なり数の座標をカウント ここも座標分のループ
  const answer: number[] = Array(N + 1).fill(0)
  for (let i = 0; i <= 1000; i++) {
    for (let j = 0; j <= 1000; j++) {
      if (cnt[i][j] >= 1 && cnt[i][j] <= N) {
        answer[cnt[i][j]]++
      }
    }
  }

  // Step 5: 結果出力
  const result: string[] = []
  for (let i = 1; i <= N; i++) {
    result.push(answer[i].toString())
  }

  console.log(result.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
20
61 98 76 100
70 99 95 100
10 64 96 91
12 37 99 66
63 93 65 95
16 18 18 67
30 47 88 56
33 6 38 8
37 19 40 68
4 56 12 84
3 16 92 78
39 24 67 96
46 1 69 57
40 34 65 65
20 38 51 92
5 32 100 73
7 33 92 55
4 46 97 85
43 18 57 87
15 29 54 74


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
