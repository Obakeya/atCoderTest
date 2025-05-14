/**　https://atcoder.jp/contests/abs/tasks/abc085_c */
export function solve (input: string): string {
  const [N /* お札の枚数 */, Y /* 合計金額 */] = input
    .trim()
    .split(' ')
    .map(x => +x)
  let xa = 0 //10000円札の数
  let ya = 0 //5000円札の数
  let za = 0 //1000円札の数

  /**　取りうる札のパターンは10000,5000,1000
   * 合計枚数をすべて使い切って出力しなければならない。
   * これが難しい。最小枚数で期待金額になるようにする、というのは簡単なのだが
   * きちんと期待枚数になるようにする、アルゴリズムが難しい。
   *
   * 方程式を書いてみる。
   * x + y + z = N ..(1)
   * 10000x + 5000y + 1000z = Y ...(2)
   *
   * (1)の式を変形し z = N - x - y
   * これを(2)に代入すると、
   * 10000x + 5000y + 1000(N - x - y) = Y
   * 9000x + 4000y + 1000N = Y
   * 9000x + 4000y = Y - 1000N
   * NとYは問題文から与えられるので、上記を満たすxとyの組を
   * ループ処理によって求めてみる。
   * x < N, y < Nを満たすので、ループは長くても x + y < N となる。
   * 大きい紙幣から加算したほうが効率が良いため、大きい紙幣から加算する。
   *
   * 大きい紙幣から加算して、足した結果、理想金額を超えてしまう場合は、
   * 加算をストップし、 y での加算に切り替える
   *
   * ///エッジケースを考える。例えば、z = 3で、 N = 3, Y =3000のとき、
   *  xとyはともに0になる。→デバッグ時クリア
   *
   * ///エッジケースを考える。例えば、N =2 Y =3000のとき、存在する組は存在しない。 →デバッグ時クリア
   * //最初は、貪欲法で考えていたが、貪欲法では限界がある。全部のパターンを検証する、
   * 全探索で検討する
   *
   */
  let needSum = true
  const expectSum = Y - 1000 * N
  for (let x = 0; x <= N && needSum; x++) {
    for (let y = 0; y <= N - x; y++) {
      if (9000 * x + 4000 * y === expectSum) {
        needSum = false
        xa = x
        ya = y
        break
      }
    }
  }

  if (needSum) {
    return '-1 -1 -1'
  }

  za = N - xa - ya

  return `${xa} ${ya} ${za}`
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `2000 20000000
`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  console.log(solve(testInput))
}
// ローカル実行環境の場合（テスト環境でない && require.mainがmodule）
else if (require.main === module) {
  // node.jsの標準モジュール
  const fs = require('fs')
  try {
    // Windows/Unix対応
    const input =
      process.platform === 'win32'
        ? fs.readFileSync(0, 'utf8')
        : fs.readFileSync('/dev/stdin', 'utf8')
    console.log(solve(input))
  } catch (e) {
    const input = []
    require('readline')
      .createInterface({ input: process.stdin })
      .on('line', line => input.push(line))
      .on('close', () => console.log(solve(input.join('\n'))))
  }
}
