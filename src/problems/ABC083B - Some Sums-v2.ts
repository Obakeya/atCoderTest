//https://atcoder.jp/contests/abs/tasks/abc083_b
/* 他人の答えを参考にしながら書き直したコード。
自分のオリジナルのコードよりも実行時間が 5 ms時間
メモリは 1608 kb 改善した。

**/
export function solve (input: string): string {
  const [N, A, B] = input.split(' ').map(x => +x)

  let totalSum = 0

  for (let target = 1; target <= N; target++) {
    let targetString = `${target}`
    let targetSums = 0
    for (let i = 0; i < targetString.length; i++) {
      targetSums += Number(targetString[i])
    }

    if (A <= targetSums && targetSums <= B) {
      totalSum += target
    }
  }
  return totalSum.toString()
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `20 2 5
`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  console.log(solve(testInput))
  const beforeUseMemory = Number(48580)
  const afterUseMemory = Number(46972)
  if (beforeUseMemory !== 0) {
    console.log(`改善したメモリkb:${beforeUseMemory - afterUseMemory}`)
  }
  const beforeTime = Number(0)
  const afterTime = Number(0)
  if (beforeTime !== 0) {
    console.log(`改善した実行時間ms:${beforeTime - afterTime}`)
  }
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
