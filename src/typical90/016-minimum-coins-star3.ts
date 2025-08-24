/**
 * 式変形と全探索で解く問題。式変形によるループを1つ減らせる
 * もとは ax + by + cz = Nとなる
 * これを変形し z = (N - ax -by) /c とすることで、ループを一つ減らし、
 * xの組だけを探索すれば様なる
 * ここでいう、 z = (N -a x -by) / c　というのは、余りがない、という条件と判定する
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  const [A, B, C] = lines[1]
    .split(' ')
    .map(Number)
    .sort((a, b) => b - a)

  let bigCoinCount = Math.floor(N / A) //理論上、コインの最大枚数からスタート

  let lastX = 9999 //問題の制約上の最大の枚数
  let lastY = 0
  let lastZ = 0

  //大きいコインの枚数が最大の状態から試す（全探索だが、全探索の総数を減らせるはず）
  for (let i = bigCoinCount; 0 <= i; i--) {
    const tempXSum = A * i
    const remain = N - tempXSum
    let j = Math.floor(remain / B) //理論上のBの取りうる最大値(コインの枚数が一番少なく済む)からスタート

    while (0 <= j) {
      const mod = (N - i * A - B * j) % C
      if (mod === 0) {
        let tempZ = (N - i * A - B * j) / C

        if (i + j + tempZ < lastX + lastY + lastZ) {
          lastX = i
          lastY = j
          lastZ = tempZ
        }
      }
      j--
    }
  }

  const ans = []
  ans.push(lastX + lastY + lastZ)

  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `100000000
10001 10002 10003
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
