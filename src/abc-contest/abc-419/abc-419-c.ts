export function solve (input: string) {
  const lines = input.trim().split('\n')
  //グリッド上に存在するN人
  const N = +lines[0]
  /**　N人の人が全員同じマスに集まる時刻として考えられる最小値を求める
   * どのように移動先のマスを決定するか
   * 例で考える
   *
   */

  ///初期値設定
  const [r, c] = lines[1].split(' ').map(BigInt)
  let rMax = r
  let rMin = r
  let cMax = c
  let cMin = c

  for (let i = 2; i < lines.length; i++) {
    const [r, c] = lines[i].split(' ').map(BigInt)

    if (rMax < r) rMax = r

    if (r < rMin) rMin = r

    if (cMax < c) cMax = c

    if (c < cMin) cMin = c
  }
  //最小位置座標
  const goalR = (rMax + rMin) / 2n
  const goalC = (cMax + cMin) / 2n

  let tempMaxDistance = 0n
  //最大となる距離座標を求める
  for (let i = 1; i < lines.length; i++) {
    const [r, c] = lines[i].split(' ').map(BigInt)
    let diffR = goalR - r
    let diffC = goalC - c
    if (diffR < 0n) diffR = diffR * -1n
    if (diffC < 0n) diffC = diffC * -1n

    const largetDeistance = diffR < diffC ? diffC : diffR
    if (tempMaxDistance < largetDeistance) tempMaxDistance = largetDeistance
  }

  console.log(tempMaxDistance.toString())
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `3
2 3
5 1
8 1

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
