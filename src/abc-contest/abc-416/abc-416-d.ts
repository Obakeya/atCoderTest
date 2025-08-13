export function solve (input: string) {
  const lines = input.trim().split('\n')
  const T = +lines[0] // テストケース数
  const anwser = []
  /**
   *
   *
   * T行の出力が必要
   *
   * Aの数列は自由に並び替えが可能
   * 愚直に組み合わせを計算する場合
   * 計算量 = T *  N! * N※
   * N※...1つの数列の走査分
   *
   * 1≦T≦10^5
   * 1≦N≦3 * 10^5　より、愚直法では絶対に間に合わない。2secで完了させる必要がある
   *
   * 計算量を圧縮する必要がある。現実的なのは
   * T * N ぐらいにすること。1つのテストケースがNで終われば何とかなるかも。10^10だから
   * きついかもだが... 並び替えはやっている時間はなさそう。
   *
   */
  // for (let i = 1; i < lines.length; i++) {
  //   // N は長さNの非負整数数列A,B を指す。 Mは正整数
  //   const [N, M] = lines[i].split(' ').map(Number)
  // }

  /**
   *
   *
   * テストケースごとの最小値をどう計算量を抑えて求めるか。ポイントは
   * 組の合計値の総和の最小値である、ということ
   *
   * MODの特徴として、　値が0~Mに近づくにつれて線形に増加し、 Mと一致するタイミングで
   * MOD の結果は0 となり、また線形にあたいを増加させていくが、　N * M ごとに MODの結果は0
   * になる。したがって、 0もしくは N * Mに近い値となるように、 A と Bを組み合わせを作っていくことが
   * 大事。
   *
   * どうやって N * Mに近似させる組を作るのか？ A と Bごとに、 一番近い N * Mとの距離を算出する
   * 比較する数字が大きい場合は
   *
   *
   *
   */
  function caluculateAnswer (index: number, M: number) {
    let anResults = 0
    const AN = lines[index + 1].split(' ').map(Number)
    for (const anNum of AN) {
      anResults += anNum - M
    }
    const BN = lines[index + 2].split(' ').map(Number)

    let bNResults = 0
    for (const bnNum of BN) {
      bNResults += bnNum - M
    }
  }

  console.log(7)
  console.log(7 % 10)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `3
3 6
3 1 4
2 0 1
1 1000000000
999999999
999999999
10 201
144 150 176 154 110 187 38 136 111 46
96 109 73 63 85 1 156 7 13 171
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
