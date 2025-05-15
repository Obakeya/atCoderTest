/**　https://atcoder.jp/contests/abs/tasks/abc085_c
 *
 * v1よりの改善
 * 実行時間 40ms→44ms
 * メモリ　45836 KB→42884 KB
 *
 * 今回使ったテクニック名
 * 変数削減法...方程式変形によって未知数を減らす
 * 境界制約最適化法...変数の理論的な上かげんを数学的に導出して探索範囲を絞る方法
 */
export function solve (input: string): string {
  const [N /* お札の枚数 */, Y /* 合計金額 */] = input
    .trim()
    .split(' ')
    .map(x => +x)

  /** v2 として、生成AIからもらったヒントをベースに改訂版を作ってみる
   *  ■ヒント
   * ・今は、O(n²)になっているけど、x の値が決定以降、それを方程式気に代入することでO(n)にすることが可能
   * ・取ることが不可能と分かっているxの値の場合は、ループをスキップして次にいってよい
   * ・満たす値が発見されたら、その場で早期returnしてしまえばよい
   * 　・満たす値と判定する方法...yの計算結果が整数となり、yの値の条件（各値との大小関係の比較）を満たすもの
   *   ・これにより、y用のループを削減可能。

   * x + y + z = N ..(1)
   * 10000x + 5000y + 1000z = Y ...(2)
   *
   * (1)の式を変形し z = N - x - y これを(2)に代入すると、
   * 10000x + 5000y + 1000(N - x - y) = Y
   * 9000x + 4000y + 1000N = Y
   * 9000x + 4000y = Y - 1000N
   * 
   * ループ内でyの値を求めるため、式を変形して
   * 4000y = Y - 1000N - 9000x
   * y = (y -1000N - 9000x) / 4000
   * 
   * x,yの取りうる値の範囲も整理する。(1)より、
   * x + y + z <= N(3),  0 <= z は保障されているからことより、
   * x + y <= N 。これを変形して y <= N -x
   * 
   * xについて。xは10000円札であるから、 x < FLOOR(Y /10000) かつ x < N となる。
   * 実際の制約としては上記の制約のうち、より小さい値で制約し探索を行う。
   * 
   * Y - 1000N(期待値)のエッジケース判定について。Y - 1000Nの結果によって、存在しない組であることの判別ができる可能性がある
   * Y - 1000N < 0 となる場合、これを満たすx,y,zの組は存在しない。例えば Y = 1000で、 N = 5のようなケース。
   * また、9000x + 4000y = 期待値となる組を探す上で、 9000x + 4000yの最大値は x = Nとなるときである。
   * したがって、 9000 * N < expectSumの関係のとき、これを満たすx,y,zの組は存在しない。
   *

   */
  const expectSum = Y - 1000 * N
  //expectSumから分かる早期ガード
  if (expectSum < 0 || expectSum > 9000 * N) {
    return '-1 -1 -1'
  }
  const xmax = Math.min(N, Math.floor(Y / 10000))
  for (let x = 0; x <= xmax; x++) {
    let y = (expectSum - 9000 * x) / 4000
    if (Number.isInteger(y) && y <= N - x && 0 <= y) {
      return `${x} ${y} ${N - x - y}`
    }
  }

  return '-1 -1 -1'
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
