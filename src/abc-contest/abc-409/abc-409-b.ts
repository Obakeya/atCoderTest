export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  /**　ロジックの実装
   * 最大の非負整数xを求める...Aに、x以上の要素が重複を含めてx回以上現れる
   * 平たくいうと、集合に含まれる数値ごとに、該当の数値以上となる
   * 数値の数分をカウントし、その中で、自信の数字より大きくなったものが提出候補になる
   *
   * そのため、数値のカウントは、大きいものから順に行いたいため、事前にソートをする
   * ソートを行い、大きい順に値をチェックし、要素数をカウント。
   * 自信の値より、多くなったタイミングの数値が答えとなる
   *
   *
   * エッジケース...x以上の要素が重複を含めてx回以上現れる
   * 上記を満たしたら、超吹くであろうと、なかろうと、そのタイミングでの値を出力する
   * このとき、重複があるかどうかは、console.logする値に影響はなく、あくまで、
   * x回以上であるかということのカウントである
   *
   * ※終端が答えになるとき
   *
   * ※開始が答えになるとき
   */

  const Aarray = lines[1]
    .split(' ')
    .map(Number)
    .sort((a, b) => b - a) //降順

  for (let i = 0; i < Aarray.length; i++) {
    //確認した値が、要素数よりも大きい場合、条件を満たすことは必ず無いため、確認をスキップする
    if (Aarray[i] > Aarray.length) {
      continue
    }

    //確認した値が、確認した値より大きい数の出現回数以下であった場合に、returnする
    if (Aarray[i] <= i + 1) {
      console.log(Aarray[i])
      return
    }
  }

  console.log(0)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
5
0 6 6 6 6 10000000000 45 65 34

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
