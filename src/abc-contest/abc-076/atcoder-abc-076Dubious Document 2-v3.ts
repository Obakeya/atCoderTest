export function solve (input: string) {
  const [S, T] = input
    .trim()
    .split('\n')
    .map(x => x.split(''))

  // 後ろから全探索
  for (let i = S.length - T.length; i >= 0; i--) {
    // 位置iからTがマッチするかチェック
    let canMatch = true
    for (let j = 0; j < T.length; j++) {
      if (S[i + j] !== '?' && S[i + j] !== T[j]) {
        canMatch = false
        break
      }
    }

    // マッチした場合、この位置で置き換えを実行
    if (canMatch) {
      // T文字列で置き換え
      for (let j = 0; j < T.length; j++) {
        S[i + j] = T[j]
      }

      // 残りの?をaに置き換え
      for (let k = 0; k < S.length; k++) {
        if (S[k] === '?') S[k] = 'a'
      }

      console.log(S.join(''))
      return
    }
  }

  console.log('UNRESTORABLE')
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `?tc????
coder

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
