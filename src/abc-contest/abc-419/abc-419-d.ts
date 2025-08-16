export function solve (input: string) {
  const lines = input.trim().split('\n')

  //長さNの英子文字列 S, T
  const [N, M] = lines[0].split(' ').map(Number)
  let S = lines[1].split('')
  let T = lines[2].split('')

  //実際の入れかを操作をするのは1回でいい
  //出力時に、どちらの
  /** Sなのか、Tなのか　どちらの文字を出力するのかさえ分かればいいはず
   * 全部記録しているとぎりぎい間に合わないかも...がやってみるか。
   *
   * なんとか準備段階を　O(N)できないだろうか
   * 究極的には、1文字ずつ入れ替わる可能性はある。
   * そのため、最終的には、文字の位置レベルで入れ替え操作を要求する記憶は必要
   * ただ、毎回都度indexレベルで記憶が必要か、というとそうでない気がする
   * 5→8とか 4→8とかは、その情報だけ圧縮して覚えておけるはず
   *
   *
   */

  let memory = Array(N).fill(false)
  for (let i = 3; i < lines.length; i++) {
    const [l, r] = lines[i].split(' ').map(Number)
    for (let j = l; j <= r; j++) {
      memory[j - 1] = !memory[j - 1]
    }
  }

  let ans = Array(N).fill('')

  for (let i = 0; i < N; i++) {
    if (memory[i]) ans[i] = T[i]
    else ans[i] = S[i]
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
