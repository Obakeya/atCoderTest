//https://atcoder.jp/contests/abs/tasks/abc087_b
export function solve (input: string): string {
  const lines = input.trim().split('\n')
  //ロジックの実装
  const a = +lines[0] //500yen
  const b = +lines[1] //100yen
  const c = +lines[2] //50yen
  const x = +lines[3] //expect

  //足し算の組み合わせは、 (a + 1) * (b +1) * (c+1) 通り存在する。これらの組み合わせによる足し算を行い、
  //期待合計値になるかを検討する
  //組み合わせ通りに実行するロジック
  // Xは50の倍数であるから、　500, 100 にはループ脱出ロジックを用意する

  let ok = 0
  for (let i = 0; i <= a; i++) {
    for (let j = 0; j <= b; j++) {
      for (let k = 0; k <= c; k++) {
        if (i * 500 + j * 100 + k * 50 === x) {
          ok++
        }
      }
    }
  }

  return ok.toString()
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `30
40
50
6000


`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  console.log(solve(testInput))
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
      .on('close', () => console.log(solve(input.join('\n'))))
  }
}
