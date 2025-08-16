export function solve (input: string) {
  const lines = input.trim().split('\n')

  //長さNの英子文字列 S, T
  const [N, M] = lines[0].split(' ').map(Number)
  let S = lines[1].split('')
  let T = lines[2].split('')

  /** 解説を読んで答えを把握した。差分配列と累積和を組み合わせて解く。
   * imos法っぽい感じで解く問題
   *
   * 差分配列...変化量だけ記録するテクニック
   *
   */

  //cummulative 累積和　の意味。終わりを管理するために +1で用意する
  const cummulative = Array(N + 1).fill(0)
  for (let i = 3; i < lines.length; i++) {
    const [l, r] = lines[i].split(' ').map(Number)
    cummulative[l - 1] += 1 //区間開始
    cummulative[r] -= 1 //区間終了
  }

  // 累積和で実際の操作回数を復元
  for (let i = 0; i < N; i++) {
    cummulative[i + 1] += cummulative[i]
  }

  const ans = Array(N).fill('')
  for (let i = 0; i < N; i++) {
    if (cummulative[i] % 2 === 0) ans[i] = S[i]
    else ans[i] = T[i]
  }

  /**　ロジックの実装 */
  console.log(ans.join(''))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `10 5
lemwrbogje
omsjbfggme
5 8
4 8
1 3
6 6
1 4

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
