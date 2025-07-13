export function solve (input: string) {
  const lines = input.trim().split('\n')
  const A = +lines[0] //進法
  const N = BigInt(+lines[1]) //最大値

  /**　ロジックの実装
   * 30分経っても正解できなかったら次にいこう
   * A進法での表記も回文であるものをどう求めるか
   *
   * 十進法での表記が回文であるかどうか
   * 先頭、後半を同時にindexとして探索する処理をかいて、
   * 一致していたら一致しているとわかる
   *
   * 10の12乗って全探索いけるのかな、、、わからん
   * →だめだ。 10の12乗かつ、それぞれのステップで探索が入るから愚直法だと間に合わない
   * なんらかの方法で、回文になるデータ特徴をもっと効率的に見つけないと
   * どうしようもなさそう。
   *
   * 愚直にカウントアップするのではなく、10進数で最初から回文となる
   * 数字を必ず作る構造を作るのが楽そう
   *
   */

  let sum = 0n

  function isKaibun (iString: string) {
    for (let j = 0; j < iString.length; j++) {
      if (iString[j] !== iString[iString.length - 1 - j]) return false
    }
    return true
  }

  /**
   * 回文の作り方
   * 最大の桁数を決める。その桁数になるまで、数字をカウントアップしていき、
   * 逆順にした文字列を結合する
   * 元の文字列の2で割った余りが1以上の場合は、単純に文字列を逆順結合すると
   * 1文字増えてしまうため、逆順の結合時に、文末の文字を削除して結合する
   * 例：　123→123321となってしまうのを避けるために 12321 とする
   *
   * 桁数ごとに作成していく。それぞれの最小値、最大値を求めるためにべき乗を使う
   * 回文の値生成時に、Nの値自体を超えたらその時点で判定をブレイクする
   *
   * 総和の最中で、 2 ^ 53を超える恐れがあるため、BigIntを用いて総合の和算は計算する
   */

  //桁数ごとに回文の半分の文字を生成していく
  for (
    let currentLength = 1;
    currentLength <= N.toString().length;
    currentLength++
  ) {
    //回文の半分のベースの最大値を考える必要がある。桁数ごとに開始値、終了値を算出
    // lengthが1 のとき、1 lengthが2のとき、1 lengthが3のとき、2
    const limitHalfLength = Math.ceil(currentLength / 2)

    //lengthgが1のとき1, lengthが2のとき、1、lengthが3のとき、10, lengthが4のとき、10  lengthが5のとき100
    const start = limitHalfLength === 1 ? 1 : 10 ** (limitHalfLength - 1)
    //lengthgが1のとき9, lengthが2のとき、9、lengthが3のとき、99, lengthが4のとき99
    const end = 10 ** limitHalfLength - 1
    for (let temp = start; temp <= end; temp++) {
      const tempStr = temp.toString()

      let createdPal: string
      if (currentLength % 2 === 0) {
        createdPal = tempStr + tempStr.split('').reverse().join('')
      } else {
        // 桁数1のときも、slice(0,-1)によって、回文となる
        createdPal = tempStr + tempStr.slice(0, -1).split('').reverse().join('')
      }

      const bigIntTemp = BigInt(createdPal)
      if (N < bigIntTemp) break //ここでbreakをするとき、上位ループではすでに最大の桁数での処理のため、処理が終わる

      const baseChanged = bigIntTemp.toString(A) //N進数変換

      if (isKaibun(baseChanged)) {
        sum += bigIntTemp
      }
    }
  }

  console.log(sum.toString())
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `6
999999999999

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
