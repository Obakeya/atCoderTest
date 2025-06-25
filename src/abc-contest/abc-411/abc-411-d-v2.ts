export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, Q] = lines[0].split(' ').map(Number)

  let bufText = []
  let currentPc = '0'

  for (let i = Q; 1 <= i; i--) {
    // pはPCの番号を指す
    const [type, p, s] = lines[i].split(' ')
    if (type === '1') {
      if (currentPc === p) currentPc = '0'
    } else if (type === '2') {
      if (currentPc === p) bufText.push(s)
    } else {
      if (currentPc === '0') currentPc = p
    }
  }

  /** 解説を見て解きなおす
   * 逆順にシュミレーションしていくことで、永続配列を使わないようにして
   * 処理できる
   * 最終的に出力するのはサーバーの文字列のため、PC→サーバーに行くときの動きに
   * 注目する（タイプ3）。
   * タイプ3が発生するときのPCの文字列を注目し、その時のPCについて記録し、
   * そのPCに対して文字が書き込まれるタイミングを覚えておく
   *
   * PC p の文字列をサーバーの文字列で置き換える、という処理についてはどう考えるといいか
   * →注目するPCがリセットされる、と考える。
   * サーバーに到来する文字列は、それまでの文字列、つまり末尾に使いするクエリタイプ2にする
   * PC p の文字列をサーバーの文字列で置き換える、というのは、注目していないPCならば無視してOK
   * 注目しているPCならば、それ以降、どのPCの文字列によって置き換わったことになったのか、
   * 直近のクエリ3まではサーバーのテキストは入っていないこととなるため、
   * いったん加算をリセットするため、currentPCにサーバーを設定する
   * 現在の注目PCがサーバーでないならば、サーバーへの文字列の置き換えは、無視しても良い。
   * 例えば、直近、サーバーに文字列を置き換えた
   *
   */

  const answer = bufText.reverse()
  console.log(answer.join(''))
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
