/**　問題メモ
 * ABC249 C - Just K
 * N個の文字列から部分集合を選び、
 * その中でちょうどK回出現する文字の種類数を最大化
 *
 * 文字列を選ぶ、選ばない状態の組を、2進数として0,1で表現する
 * 2進数を使って、ある文字列を選ぶ、選ばない、というパターンを簡潔に表現、ループ処理として指示したら、
 * そのケースにおける、ちょうどk回出現する文字列の回数を数える。
 *
 * 全探索し、その中で最大の値をとって更新していくことで、「あり得る最大値」として答えが出せる
 
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, K] = lines[0].split(' ').map(Number)
  const s: string[] = []

  for (let i = 1; i <= N; i++) {
    s.push(lines[i])
  }

  let ans = 0

  /**　ロジックの実装 */
  // 2^N通りの部分集合を全探索。ここで生成される数字が実質選び方の組を決定する
  for (let i = 0; i < 1 << N; i++) {
    // 各文字('a'～'z')の出現回数を記録
    const count = new Array(26).fill(0)

    // i番目のビットパターンに従って文字列を選択
    for (let j = 0; j < N; j++) {
      //決定している数値の2進数変換し、順番に文字列として選ばれているかどうかを確認していく
      if ((i >> j) & 1) {
        //選ばれている場合、下記のループへ

        // j番目の文字列を選ぶ場合、その文字列内の全文字をカウント
        for (let k = 0; k < s[j].length; k++) {
          //アルファベットの文字ごとに、配列格納先のindexを取得するためのコード
          const charCode = s[j].charCodeAt(k) - 'a'.charCodeAt(0)
          count[charCode]++
        }
      }
    }

    // ちょうどK回出現する文字の種類数を数える
    let current = 0
    for (let j = 0; j < 26; j++) {
      if (count[j] === K) {
        current++
      }
    }

    ans = Math.max(ans, current)
  }

  console.log(ans)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
5 2
abpqxyz
az
pq
bc
cy

`.trim()
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
