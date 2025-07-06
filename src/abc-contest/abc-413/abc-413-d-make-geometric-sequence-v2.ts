/** 解説をベースにC++ → typescriptに置き換えたコード
 * ポイントとして、公比rの絶対値を考えて解く、ということ
 * パターンは3つ。下記のすべてのパターンに合致するかどうかを確認し、
 * 合致しなかったら No を出力する、という考え方とする。
 * 1...|r|= 1 ...配列の要素が1種類しかないならば、この判定となる
 * 2...|r|< 1
 * 絶対値降順にソートする。 BigInt で積比較。
 * 3...|r|> 1
 *
 *
 *
 */
export function solve (input: string): void {
  const tok = input.trim().split(/\s+/)
  let idx = 0
  const T = Number(tok[idx++])
  const out: string[] = []

  const abs = (x: bigint): bigint => (x < 0n ? -x : x)

  for (let tc = 0; tc < T; ++tc) {
    const N = Number(tok[idx++])
    const A: bigint[] = new Array(N)
    for (let i = 0; i < N; ++i) A[i] = BigInt(tok[idx++])

    /* ---- |r| = 1 判定 ---- */
    // r = 1で条件を満たすか
    const first = A[0]
    let same = true
    for (const v of A)
      if (v !== first) {
        same = false
        break
      }
    if (same) {
      out.push('Yes')
      continue
    } // r = 1 の判定はここまで

    // r = -1 で条件を満たすか
    const cntX = A.filter(v => v === first).length
    const cntNegX = A.filter(v => v === -first).length
    //正の数、負の数が同一で、正負の個体差が高々1であることを確かめる。※正負の個体数は同一でなくてもよく
    //正と負の数の個体差は1以内であれば、r =-1で等比数列となる
    if (cntX + cntNegX === N && Math.min(cntX, cntNegX) === Math.floor(N / 2)) {
      out.push('Yes')
      continue
    }

    /* ---- |r| < 1 判定 ---- */
    A.sort((a, b) => {
      const da = abs(a),
        db = abs(b)
      if (da > db) return -1
      if (da < db) return 1
      // 絶対値が同じなら大きい方を先に（なくても AC）
      return a > b ? -1 : a < b ? 1 : 0
    })

    let ok = true
    for (let i = 0; i + 2 < N; ++i) {
      if (A[i] * A[i + 2] !== A[i + 1] * A[i + 1]) {
        ok = false
        break
      }
    }
    out.push(ok ? 'Yes' : 'No')
  }

  console.log(out.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `3
5
1 8 2 4 16
5
-16 24 54 81 -36
7
90000 8100 -27000 729 -300000 -2430 1000000
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
