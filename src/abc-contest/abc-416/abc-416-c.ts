export function solve (input: string) {
  const lines = input.trim().split('\n')
  // N...文字列群の数　、K...文字をどれだけ結合するか X ...結合文字列結果の辞書順の何番目を取り出すか
  const [N, K, X] = lines[0].split(' ').map(Number)

  /**
   * 計算量について　N ≦ 10, K ≦ 5 、　Siの文字列の長さは高々 10より、
   * すべての文字列の結合の組あわせはは
   * 10 C 5 * 10 .. 2520?
   * 愚直にやってみる？
   *  X ≦
   *
   */

  const concats = []
  //最初のループだけは実装する
  for (let i = 1; i < N + 1; i++) {
    // K = 1のときのハンドリング
    if (K === 1) {
      concats.push(lines[i])
      continue
    }

    concat(lines[i], 1)
  }

  function concat (processingString: string, concatCount: number) {
    for (let i = 1; i < N + 1; i++) {
      const concated = processingString + lines[i]
      const newConcatCount = concatCount + 1

      if (newConcatCount === K) {
        concats.push(concated)
        continue
      } else concat(concated, newConcatCount)
    }
  }
  // concats.sort((a, b) => a - b)
  concats.sort()

  console.log(concats[X - 1])
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `5 5 416
a
aa
aaa
aa
a
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
