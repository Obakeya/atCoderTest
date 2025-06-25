export function solve (input: string): void {
  const lines = input.trim().split('\n')
  const [, Q] = lines[0].split(' ').map(Number)

  const seg: string[] = [] // 逆向きに蓄える
  let pc = 0 // 今注目している PC  (サーバー=0)

  for (let t = Q; t >= 1; --t) {
    const [type, pRaw, s] = lines[t].split(' ')
    const p = Number(pRaw)

    if (type === '1') {
      // reset
      if (pc === p) pc = 0
    } else if (type === '2') {
      // append
      if (pc === p) seg.push(s) // 逆順シミュレーションなので末尾に push
    } else {
      // type === '3' (upload to server)
      if (pc === 0) pc = p
    }
  }

  seg.reverse() // 時系列を正順に戻す
  console.log(seg.join(''))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `2 6
2 1 at
3 1
2 2 on
1 2
2 2 coder
3 2


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
