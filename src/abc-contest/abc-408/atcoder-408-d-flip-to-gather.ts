export function solve (a: string) {
  const input = a.trim().split(/\s+/) // \s...スペース、タブ、改行など空白の一文字を表す
  let idx = 0
  const T = Number(input[idx++])
  const answers: number[] = []

  // 一度だけ走査し、1をまとめる必要がある最小の区間を発見する
  // ケース数はTの数だけ存在するため、Tの数分、処理が必要
  for (let t = 0; t < T; ++t) {
    const N = Number(input[idx++]) // 使わないが読み飛ばす
    const S = input[idx++]

    //ケースが変わるごとにリセット
    let totalOnes = 0
    let best = 0
    let current = 0
    for (let i = 0; i < S.length; ++i) {
      const v = S[i] === '1' ? +1 : -1 //0のコストは-1として扱う
      if (v === 1) totalOnes++

      current = Math.max(v, current + v) // Kadane
      best = Math.max(best, current)
    }

    // 答え = 1の出現回数 - ベストの区間値になる。
    // 答えは最小のビットの反転回数となる。トータルの1のうち、ベストとなる区間以外は0にする必要があるため
    const flips = totalOnes - best
    answers.push(flips)
  }

  //最終的な答えを出力する
  console.log(answers.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `5
2
01
10
1000010011
12
111100010011
3
111
8
00010101

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
