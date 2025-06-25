export function solve (input: string) {
  const it = input.trim().split('\n')[Symbol.iterator]()
  const T = Number(it.next().value)
  const out: string[] = []

  for (let _ = 0; _ < T; _++) {
    it.next() // 長さは使わない
    const s = it.next().value!
    const a: string[] = []

    let moved = false
    for (let i = 0; i < s.length; i++) {
      while (!moved && a.length > 0 && a[a.length - 1] > s[i]) {
        moved = true
        const x = a.pop()!
        a.push(s[i])
        a.push(x)
        i++ // 既に s[i] を処理済み
        break
      }
      if (i < s.length) a.push(s[i])
    }
    out.push(a.join(''))
  }
  console.log(out.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `3
7
atcoder
1
x
5
snuke
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
