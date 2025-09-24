/**　問題メモ
 * H×Wグリッドで隣接制約のあるタイル配置問題
 * ビットマスクDPで各行の状態を管理
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  let lineIndex = 0

  const t = +lines[lineIndex++]
  const results: string[] = []

  // ビットカウント関数
  function popcount (x: number): number {
    let count = 0
    while (x) {
      count += x & 1 // 最下位ビットが1ならカウント
      x >>= 1 // 次のビットを確認するために右シフト
    }
    return count
  }

  for (let _ = 0; _ < t; _++) {
    const [h, w] = lines[lineIndex++].split(' ').map(Number)
    const k = 1 << w // 2^w通りの状態

    const s: string[] = []
    for (let i = 0; i < h; i++) {
      s.push(lines[lineIndex++])
    }

    // 状態遷移可能性を事前計算
    const allow: boolean[][] = Array(k)
      .fill(null)
      .map(() => Array(k).fill(true))

    for (let i = 0; i < k; i++) {
      for (let j = 0; j < k; j++) {
        for (let ii = 0; ii < w - 1; ii++) {
          // 隣接する2ビットが両方1なら遷移不可能
          if (((i >> ii) & 3) === 3 && ((j >> ii) & 3) === 3) {
            allow[i][j] = false
            break
          }
        }
      }
    }

    // DP配列初期化
    const INF = 1e9
    let dp: number[] = Array(k).fill(INF)
    dp[0] = 0 // 初期状態

    // 各行を処理
    for (let i = 0; i < h; i++) {
      let state = 0
      // '#'の位置をビットマスクで表現
      for (let j = 0; j < w; j++) {
        if (s[i][j] === '#') {
          state += 1 << j
        }
      }

      const dp2: number[] = Array(k).fill(INF)

      // 全ての次状態を試行
      for (let j = 0; j < k; j++) {
        // 必須位置('#')を含む状態のみ有効
        if ((j | state) === state) {
          // 全ての前状態から遷移を試行
          for (let jj = 0; jj < k; jj++) {
            if (allow[jj][j]) {
              // 追加コストは新たに配置する位置数
              dp2[j] = Math.min(dp2[j], dp[jj] + popcount(j ^ state))
            }
          }
        }
      }

      dp = dp2
    }

    // 最小値を取得
    let ans = INF
    for (let i = 0; i < k; i++) {
      ans = Math.min(ans, dp[i])
    }

    results.push(ans.toString())
  }

  console.log(results.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
2
5 5
####.
##.##
#####
.####
##.#.
2 2
..
..

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
