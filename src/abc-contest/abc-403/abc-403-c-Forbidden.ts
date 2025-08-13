//検索用 Map,Setを組み合わせて、後からたどりやすい方法で管理することを問う問題
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, M, Q] = lines[0].split(' ')

  /**
   * タイプ1 ...ユーザーXにYページの閲覧権限を付与
   * タイプ2...ユーザーXにすべてのページの閲覧権限を付与
   * タイプ3...ユーザーXがYページを閲覧できるかを答える
   *
   * 用意が必要なもの：
   * ・すべてのページの閲覧権限があるかどうかを保持する集合
   * ・ユーザーごとに確認可能なページの閲覧権限を保持するための集合
   *
   * タイプ3のクエリの際に参照しやすいように、Setを使って参照しやすくする
   *
   */

  const allowedAllPagesUsersSet = new Set<Number>()
  const allowedPagesByUsersMap = new Map<number, Set<Number>>()
  for (let i = 1; i < lines.length; i++) {
    const [type, X, Y] = lines[i].split(' ').map(Number)

    if (type === 1) {
      if (!allowedPagesByUsersMap.has(X)) {
        allowedPagesByUsersMap.set(X, new Set<number>())
      }
      const allowedPagegSet = allowedPagesByUsersMap.get(X)
      allowedPagegSet.add(Y)
    } else if (type === 2) {
      allowedAllPagesUsersSet.add(X)
    } else {
      const allowedPagegSet = allowedPagesByUsersMap.get(X)
      if (allowedPagegSet?.has(Y) || allowedAllPagesUsersSet.has(X)) {
        console.log('Yes')
      } else {
        console.log('No')
      }
    }
  }
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `5 5 10
2 2
3 4 4
1 1 1
1 4 1
1 4 2
1 4 4
1 2 4
3 3 2
3 5 4
3 2 1

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
