/**　問題メモ
 * 回転寿司問題：N人の人がいて、M個の寿司が順に流れる
 * 各人は美味しさ>=自分の美食度の寿司を食べる
 * 各寿司を誰が食べるかを効率的に求める
 *
 * 誰がどの寿司を食べるか、という決まり方の本質を理解する。
 * 人は、自分の美食度以上の寿司が来たら漏れなく食べる。
 * したがって、人1、人2がいて、　人2に回ってくる寿司は、人1の美食度以下の寿司しか回ってこない
 * したがって、すべての寿司のおいしさごとに、だれが食べるか決まる決定配列を作成していく
 * 貪欲法的に、maxのおいしさの寿司から順に、最初の人で試行していく
 * 最初の人が食べられなくなるおいしさまで下がったら、次の人で試していく
 * 次の人でも食べられなくなるおいしさまで下げていく
 * これにより、おいしさ1になるまで、どの美味しさの寿司がだれに食べられるかを判断できる。
 * 寿司ごとに美食度があるが、その寿司において、美食度から食べられる人の番号を算出できる。
 *
 * 繰り返しになるが、人は、自分の美食度以上の寿司をすべて食べてしまう、という観点がアルゴリズムを考えるポイント。
 * 次の人が、前の人より、美食度が高い寿司を食べることはあり得ない。
 * そのため、美食度のMax値から初めて、少しずつ低くしていき、だれに食べるかをメモしておくことができる
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, M] = lines[0].split(' ').map(Number)
  const A = lines[1].split(' ').map(Number)
  const B = lines[2].split(' ').map(Number)

  const ans = []

  /**　ロジックの実装 */
  const K = 200010 // 美味しさの最大値+余裕

  // id[v] = 美味しさvの寿司を最初に食べる人の番号（1-indexed、いなければ-1）
  const id: number[] = new Array(K).fill(-1)

  // 右端から左に向かって処理（前の人か後ろの人へ）
  let r = K
  for (let i = 0; i < N; i++) {
    const a = A[i]
    // 人i+1の美食度以上の値について、この人が最初に食べる人として記録
    while (r > a) {
      r--
      id[r] = i + 1 // 1-indexedの人番号
    }
  }

  // 各寿司について答えを求める
  for (let i = 0; i < M; i++) {
    const b = B[i]
    ans.push(id[b])
  }

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
10 5
60 83 76 45 70 91 37 58 94 22
70 39 52 33 18

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
