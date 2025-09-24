/**
 * どちらかのスキルが習得済みの解き、そのスキルを習得できる
 * 習得済みのスキルをどう管理するか
 * スキルを取得するための連結リストに従って、スキルを解いていくことになる
 *
 * 0→1→2...というように
 *
 *
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const N = +lines[0]
  //スキルを取得していくための関係性についてまとめる
  //index..習得しているスキル、持っている値...index値のときに習得可能なスキル群
  const graph: number[][] = Array.from({ length: N + 1 }, () => [])

  // const got = Array(N + 1).fill(false)
  // got[0] = true // 0だけは取得済み（スキルなくてもとれるスキル）
  // let curGotSkill = 0

  const skillSet = new Set<number>()

  //習得すべきスキルの関係を連結リストにまとめる
  for (let i = 1; i < lines.length; i++) {
    const [a, b] = lines[i].split(' ').map(Number)
    graph[a].push(i)
    if (a !== b) graph[b].push(i)
  }

  //0を入れて始める想定
  function getSkill (baseSkill: number) {
    for (let i = 0; i < graph[baseSkill].length; i++) {
      const canGetSkill = graph[baseSkill][i]

      if (!skillSet.has(canGetSkill)) {
        skillSet.add(canGetSkill)
        getSkill(canGetSkill)
      }
    }
  }

  /**　ロジックの実装 */
  getSkill(0)

  console.log(skillSet.size)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
4
0 0
0 0
0 0
0 0

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
