/**
 * ほかの方の回答ベースんもの
 *
 * BigIntへの変換が必要な理由
 *  number型が誤差なく表せるのは 2^53（9*10^15）まで
 *  N は最大 10^12と比較的小さいが、求める挿話は2^63未満、つまり　9 * 10 ^ 18となるので、 numberで足し続けると丸め誤差が入り始める
 *　2＾53以上になるときは、bigIntを使う必要あり
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const A = Number(lines[0]) // 基数
  const limitStr = lines[1].trim()
  const limit = BigInt(limitStr) // 上限 N
  let result = 0n

  // 回文判定（基数 A 表記用）
  const isPalindrome = (s: string): boolean => {
    for (let i = 0, j = s.length - 1; i < j; ++i, --j) {
      if (s[i] !== s[j]) return false
    }
    return true
  }

  const maxLen = limitStr.length // N の桁数ぶんまで見れば十分
  for (let len = 1; len <= maxLen; ++len) {
    const halfLen = Math.floor((len - 1) / 2) + 1 // 回文生成のための十分な半分の文字数を用意
    const start = halfLen === 1 ? 1 : Math.pow(10, halfLen - 1) // 桁数ごとの開始値をべき乗を利用して算出
    const end = Math.pow(10, halfLen) - 1 // 桁数ごとの最終意をべき乗を利用して算出

    for (let half = start; half <= end; ++half) {
      const halfStr = String(half) //回文にするために、文字列に変換

      // 回文生成
      let palStr: string
      if (len % 2 === 0) {
        palStr = halfStr + halfStr.split('').reverse().join('') // 文字を逆順に変換したものを結合
      } else {
        palStr = halfStr + halfStr.slice(0, -1).split('').reverse().join('') // 右側の文字は、最後の文字を取り除いて結合する　例：　123 → 123321となってはダメなので、　12321とする
      }

      const pal = BigInt(palStr)
      if (pal > limit) break // これ以上の長さは全て上限超え

      if (isPalindrome(pal.toString(A))) {
        result += pal
      }
    }
  }
  console.log(result.toString())
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `6
999999999999
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
