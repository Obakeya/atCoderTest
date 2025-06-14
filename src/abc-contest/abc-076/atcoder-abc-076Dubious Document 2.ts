export function solve (input: string) {
  const [S, T] = input
    .trim()
    .split('\n')
    .map(x => x.split(''))

  /**　ロジックの実装
   * 全体の文字サイズを考えると、全探索でも問題なさそう。
   */

  const startTIndex = T.length - 1
  let t = startTIndex //Tの文字列にアクセスしていく。
  let i = S.length - 1 //置き換え可能と判明したときの文字列の最後の位置が格納されている
  let find = false
  for (i; 0 <= i; i--) {
    if (S[i] === '?' || S[i] === T[t]) t--
    else if (S[i] === T[startTIndex]) t = startTIndex - 1
    //最終文字とマッチしたら、次回は2文字目からマッチさせる
    else t = startTIndex
    //Tの文字列マッチングが、Tのindexを超えたタイミングでbreak
    if (t === -1) {
      find = true
      break
    }
  }
  if (!find) {
    console.log('UNRESTORABLE')
    return
  }

  // 修正箇所：置き換え開始位置の計算
  let startIndex = i + 1 // マッチング完了時のiの次の位置が開始位置

  // T文字列での置き換え
  for (let j = 0; j < T.length; j++) {
    S[startIndex + j] = T[j] // インデックス計算も修正
  }

  //?の置き換え
  for (let k = 0; k < S.length; k++) {
    if (S[k] === '?') S[k] = 'a'
  }

  console.log(S.join(''))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `???????
atcoder

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
