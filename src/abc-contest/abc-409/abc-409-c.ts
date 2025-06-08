export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, L] = lines[0].split(' ').map(Number)
  const dMove = lines[1].split(' ').map(Number)

  /**　ロジックの実装
   * 解説を読み、可能な限り答えを読まずに回答を記述する
   * 下記のステップで回答をする
   * N個の点の座標位置を計算する。累積和と余り演算を利用する。
   * 上記踏まえ、円周Lの距離1ごとに、存在する点の数をカウントする。頻度配列を利用する
   * 円周の距離はLであるから、円周L上の3つの点を選択したとき、各点間の距離が 3/Lになるとき、
   * 正三角形ができる。
   * 各座標で点の個数をカウントしているので、1～3/Lになるところまで、正三角形が作成できるかどうかを計算する
   *
   * 全体の計算量は下記の和になる
   * 座標位置の計算...N
   * 点の個数の計算...L
   * 正三角形ができるかどうかの計算 3/L
   */

  if (L % 3 !== 0) return console.log(0)

  // N個の点の座標位置を計算する
  const Nposition = Array(N + 1).fill(0) // 開始点を含めるために、+1で作成する
  for (let i = 1; i <= N; i++) {
    Nposition[i] = (Nposition[i - 1] + dMove[i - 1]) % L //円周を超える場合があるので余り演算
  }

  // L上の1ごとの距離に出現する点の位置をカウントする
  const Lpoints = Array(L + 1).fill(0)

  for (let n = 0; n < Nposition.length; n++) {
    Lpoints[Nposition[n]]++ //座標位置を順番に取り出し、その座標位置の値 => 円周上の点、という観点で計算する
  }

  const side = L / 3
  let triangleCount = 0

  for (let l = 0; l <= side; l++) {
    //最初の位置

    //2つめの点の位置
    const secondPosition = side + l
    //3つめの点の位置
    const thirdPosition = side + secondPosition

    triangleCount +=
      Lpoints[l] * Lpoints[secondPosition] * Lpoints[thirdPosition]
  }
  console.log(triangleCount)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `10 12
4 4 5 7 1 7 0 8 5

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
