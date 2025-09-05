/**　問題メモ
 * K種類以下の異なる要素を含む最長の部分配列の長さを求める
 * しゃくとり法を使用
 *
 * Mapをどう使っているか...要素ごとの出現回数をカウントしている
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, K] = lines[0].split(' ').map(Number)
  const A = lines[1].split(' ').map(Number)

  const ans = []

  /**　ロジックの実装 */
  const elementCount = new Map<number, number>()
  let distinctCount = 0 // 現在の区間に含まれる異なる要素の種類数
  let maxLength = 0
  let left = 0

  for (let right = 0; right < N; right++) {
    // 右端を伸ばす
    const rightElement = A[right]
    const currentCount = elementCount.get(rightElement) || 0

    if (currentCount === 0) {
      distinctCount++ // 新しい要素が追加される
    }
    elementCount.set(rightElement, currentCount + 1)

    // K種類を超える場合、左端を縮める
    while (distinctCount > K) {
      const leftElement = A[left]
      //現在の区間で、左端の要素が何回出現しているかを表す
      const leftCount = elementCount.get(leftElement)!

      if (leftCount === 1) {
        distinctCount-- // 1つしかいないため、この要素がなくなる
        elementCount.delete(leftElement)
      } else {
        elementCount.set(leftElement, leftCount - 1)
      }
      left++
    }

    // 現在の区間の長さで最大値を更新
    maxLength = Math.max(maxLength, right - left + 1)
  }

  ans.push(maxLength.toString())
  console.log(ans.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
10 2
1 2 3 4 4 3 2 1 2 3

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
