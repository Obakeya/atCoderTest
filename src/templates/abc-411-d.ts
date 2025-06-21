export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, Q] = lines[0].split(' ').map(Number)

  let serverText = ''
  //pcごとの文字列の記憶が必要
  const pc = Array(N).fill('')
  for (let i = 1; i <= Q; i++) {
    // pはPCの番号を指す
    const [type, p, s] = lines[i].split(' ')
    if (type === '1') {
      pc[+p - 1] = serverText
    } else if (type === '2') {
      pc[+p - 1] += s
    } else {
      serverText = pc[+p - 1]
    }
  }

  /**　ロジックの実装
   *　Qの最大数は100万
   *
   * すべてのクエリを処理したときの答えの文字列を求める
   */
  console.log(serverText)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `10 10
2 7 ladxf
2 7 zz
2 7 kfm
3 7
1 5
2 5 irur
3 5
1 6
2 6 ptilun
3 6

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
