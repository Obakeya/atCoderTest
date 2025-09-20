/**
 * ある問題について、部分回答と完答のときのスコアの取り方の整理が難しかった
 * 気づけば簡単なことだが、部分点は必ず完答のスコアよりも効率が高いため、
 * ある問題を完答するときは、必ず部分点も取っている
 * そのため、　部分点をとるかつ、完答もするときのスコアは
 * B + A - B で求めることができた。
 *
 * 1分あたりのスコアとして効率の良さを考える場合に、A-Bで考えられればそれでよかった
 * 問題メモ */
// N問の試験でK分間の最大得点を求める
// 各問題：1分で部分点Bi、2分で満点Ai
// 貪欲法：全ての「1分選択肢」を効率順に並べてK個選ぶ
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, K] = lines[0].split(' ').map(Number)

  const choices: number[] = []

  /**　ロジックの実装 */
  // 各問題について2つの選択肢を作成
  for (let i = 1; i <= N; i++) {
    const [A, B] = lines[i].split(' ').map(Number)

    // 1分目：部分点を取る（効率：B点/分）
    choices.push(B)

    // 2分目：部分点から満点への追加（効率：(A-B)点/分）
    choices.push(A - B)
  }

  // 効率の良い順にソート（降順）
  choices.sort((a, b) => b - a)

  // 上位K個を選んで合計
  const ans = choices.slice(0, K).reduce((sum, score) => sum + score, 0)

  console.log(ans.toString())
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
2 2
7 6
3 2
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
