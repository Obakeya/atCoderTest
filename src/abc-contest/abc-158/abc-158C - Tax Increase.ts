export function solve (input: string) {
  const [A, B] = input.trim().split(' ').map(Number)

  /**
   * 方程式で一部求められそう
   *  Math.floor(x * 0.08) = A
   *  Math.floor(x * 0.1) = B
   * と思ったが、 切り捨てが前提のため式変形が厳しそう。
   *
   * 初期値を求めたい。2が与えられて、消費税額が2円になる整数の計算って8%をかけて小数点を切り捨てない場合、
   * Aは税率8%の時の税額期、 B は税率10%の時の税額
   * 　A / 0.08 = 本体金額（A）
   *   B / 0.1 =  本体金額（B)
   *
   * となり、本体金額が答え候補になる。ただ、ここでは、消費税計算の結果、切り捨てした結果をこたえ、本体金額になる。
   * つまり、上記の計算で求まる本体金額の数値は、理論上、A、Bからそれぞれみて、理論上最小の金額になる。
   * そこで、上記の本体金額の大きいほうの金額から1円ずつあげて税計算を始める。
   * どちらか一方A,Bでも金額を超えるタイミングになったら、チャレンジを終えることにする。
   * --ここから解説読んでのコメント
   * ここでは、制約が小さいため、単純な全探索でよい。そのため、A,B<=100であることより、本体金額の最大金額は
   * 10000であることがわかるから、 1 から 10000までカウントアップしながら全探索でもよかたｔ。
   *
   */
  const aAmount = A / 0.08
  const bAmount = B / 0.1
  let currentAmount = 0
  if (aAmount < bAmount) currentAmount = Math.floor(bAmount)
  else currentAmount = Math.floor(aAmount)

  let find = false
  while (true) {
    const aFloored = Math.floor(currentAmount * 0.08)
    const bFloored = Math.floor(currentAmount * 0.1)

    if (aFloored === A && bFloored === B) {
      find = true
      break
    } else if (A < aFloored || B < bFloored) {
      break
    }
    currentAmount++
  }

  if (find) console.log(currentAmount)
  else console.log(-1)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `19 99

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
