/**　https://atcoder.jp/contests/abc139/tasks/abc139_b */
export function solve (input: string): number {
  const [A, B] = input.trim().split(' ').map(Number)

  /*  公式を導出する
  A =4, B=10, nをタップ数、 pをその時のコンセント数とする
   n = 0 のとき、 p =1
   n = 1のとき、 p =4
   n = 2のとき、 p=7
   n =3 → p =10
   これより、 p =  (A-1)*n + 1
   変形して、　  n = (p-1) /(A -1)
   nは整数でなければならない、かつ　B がpとなるタイミングを求めるため、
   */

  return Math.ceil((B - 1) / (A - 1))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `8 8

`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  console.log(solve(testInput).toString())
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
      .on('close', () => console.log(solve(input.join('\n')).toString()))
  }
}
