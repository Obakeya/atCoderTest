/**
 * このアプローチについて
 * 山と谷のペアを基準とした解法。
 *
 * 1.山の検出：P[i-1] < P[i] > P[i+1]の形で山（ピーク）を見つけて記録します
 * 2.谷の検出：P[i-1] > P[i] < P[i+1]の形で谷（ボトム）を見つけます
 * 3.区間長の計算：山から左に向かって増加している部分と、谷から右に向かって増加している部分の長さを求める
 * 4.組み合わせ計算：左右の区間長の積が、その山-谷ペアから生成される有効な部分配列の数になる
 *
 * この解法、というか強みは、山と谷のペアというのは基本的に1:1で、独立であり、1つの山が複数の谷につながったり、
 * 1つの谷が複数の山とつながったりしない、ということを問題文の条件を踏まえて理解できるか、というのがポイント。
 * A1 < A2 から問題文がはじまるので、山→谷→山...という繰り返しが保証されている。
 *
 * そこで、解法としては山と谷のペアが現れるまで待ち、現れた時点でそれまでの山の幅、谷の幅を数えて
 * 組み合わせを取得する。数列の個数を、山と谷のペアごとに、それぞれのペアの長さの組み合わせの積で決まる、という発想にたどりつけるかどうか
 *
 */
export function solve (input: string): void {
  const lines = input.trim().split('\n')
  const N = parseInt(lines[0]) // 整数列の数
  const p = lines[1].split(' ').map(Number)

  let lastMountain = -1 //山のピークの座標位置を記録する
  let ans = 0

  for (let i = 1; i < N - 1; i++) {
    // 山（ピーク）を検出して記録
    if (p[i - 1] < p[i] && p[i] > p[i + 1]) {
      lastMountain = i
    }

    // 谷（ボトム）を検出したときの処理
    if (p[i - 1] > p[i] && p[i] < p[i + 1]) {
      // 山から左側の増加区間の長さを計算
      let leftLength = 0
      for (let j = lastMountain - 1; j >= 0; j--) {
        if (p[j] < p[j + 1]) leftLength++
        else break
      }

      // 谷から右側の増加区間の長さを計算
      let rightLength = 0
      for (let j = i + 1; j < N; j++) {
        if (p[j - 1] < p[j]) rightLength++
        else break
      }

      // 左右の区間の組み合わせ数を加算
      ans += leftLength * rightLength
      lastMountain = -1 //リセット
    }
  }

  console.log(ans)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `6
1 3 6 4 2 5

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
