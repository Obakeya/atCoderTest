export function solve (input: string) {
  const [S, T] = input
    .trim()
    .split('\n')
    .map(x => x.split(''))

  /**　ロジックの実装
   * 全体の文字サイズを考えると、全探索でも問題なさそう。(50 * 50)
   * 後ろから、マッチするかどうかを判定し、
   * もしマッチしなければ、1つ探索する文字列を変化させていく
   */

  let find = false
  let s
  let hitCount
  for (let i = S.length - 1; 0 <= i; i--) {
    if (find) break
    s = i
    hitCount = 0
    for (let t = T.length - 1; 0 <= t; t--) {
      if (S[s] === '?' || S[s] === T[t]) {
        s--
        hitCount++
      }

      if (hitCount === T.length) {
        find = true
        s += 1 //開始位置を戻す
        break
      }
    }
  }
  if (!find) {
    console.log('UNRESTORABLE')
    return
  }

  // T文字列での置き換え
  for (let j = 0; j < T.length; j++) {
    S[s + j] = T[j]
  }
  //?の置き換え
  for (let k = 0; k < S.length; k++) {
    if (S[k] === '?') S[k] = 'a'
  }

  console.log(S.join(''))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `??p??d??
abc
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
