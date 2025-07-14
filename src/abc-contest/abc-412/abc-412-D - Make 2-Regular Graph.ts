export function solve (input: string) {
  const lines = input.trim().split('\n')
  /**　解き方の方法論
   * 単純無向グラフ...点が〇のようにつなっているグラフ
   *
   * 図べ手
   * 3 ≦ N ≦ 8 より、順列の全パターンを試すことで最小値は求められそう
   * 全パターンをどう試すかが課題
   * 1つ目の頂点を選択→2つ目の頂点を選択..というパターンを再帰で繰り返す必要あり
   * 再帰で処理していくため、渡したか、渡していないかのフラグを作るよりも、毎回
   * 配列を作り直して渡すのも一つの手な気はする
   *
   * どういうデータを用意するかもちょっと課題
   * ある点が、どこの点につながっているかも、管理する必要はある
   *
   * 頂点1と頂点2が連続するとする。この時、何が知りたいか。
   * →頂点1目線、頂点2を持っているか
   * →頂点2目線、頂点1を持っているか
   * 上記をO(1)で特定したい
   *
   * 頂点1を持っている場合、→追加処理不要
   * 頂点1を持っていない場合、追加処理必要
   *
   * 辺の刈り取り処理をするタイミングについて。
   * ある点について、ノードの前後の頂点を確定したタイミングで刈り取り処理をする。
   * 前後のノードが確定していないなら、刈り取りしていいかどうかの判断がつかない
   * --下記のように、2のノードを刈り取りしてよいとわかるのは、3のノードが決定したタイミングである
   * 1 2 3
   * 1 3 2
   * 2 1 3
   * 2 3 1
   * 3 1 2
   * 3 2 1
   *
   * --うーんもっとシンプルに考えられないかなぁ。毎回、刈り取りにtryしたくない。
   * ノードごとに、隣接するノードが登場したかどうかを記録しておく、
   * ノードの隣接順序が決定した段階で、隣接する値について、記憶配列をカウントアップする。
   * 追加処理の必要有無の判断後に、カウントが2であれば、カウント処理もしておく
   * 最初の操作の時のみ、ノードが1つしか指定がないので、続けて再帰呼び出しを行う処理をする
   * カウントが2になる、つまり、次数が2つになった時、不要な辺の削除処理が行えるため、削除操作を記録しておく
   * 通常のDFSと違い、全探索アプローチが必要なことに注意
   *
   * ループ処理のイメージ
   * 1階層目のループ
   * 2階層目のループ
   * 3階層目のループ
   *
   */

  const nodeMap = new Map<number, Set<number>>()
  const decidedMap = new Map<number, number[]>()

  const [N, M] = lines[0].split(' ').map(Number) //N頂点、 M辺の数
  const nodes = Array.from({ length: N }, (_, i) => i + 1)
  //いったん全ノード分の連結リストを用意
  for (const node of nodes) {
    nodeMap.set(node, new Set<number>())
    decidedMap.set(node, [])
  }

  //点の関係性を連結リストにまとめていく
  for (let i = 1; i < lines.length; i++) {
    const [A, B] = lines[i].split(' ').map(Number) //A、Bはそれぞれ頂点の値
    nodeMap.get(A).add(B)
    nodeMap.get(B).add(A)
  }
  const degreeCount = new Array(N + 1).fill(0) // ノードの確定した次数を記録しておく

  let operationCount = 0
  processing(nodes, undefined, undefined)

  function processing (
    remainTargets: number[],
    currentNode: number,
    beforeNode: number
  ) {
    //初回~2回目の探索は値を決定して渡す必要あり
    if (!beforeNode || !currentNode) {
      for (const target of remainTargets) {
        const newArray = remainTargets.filter(x => x !== target)
        processing(newArray, target, currentNode)
      }
    }

    degreeCount[currentNode]++

    const targetMap = nodeMap.get(currentNode)

    if (!targetMap.has(beforeNode)) {
      operationCount++
      targetMap.add(beforeNode)
    } else {
      if (decidedMap.has(currentNode)) {
        const map = decidedMap.get(currentNode)
        map.push(beforeNode)
      } else {
        decidedMap.set(currentNode, [beforeNode])
      }
    }
    //連結しているノード以外は削除する
    if (degreeCount[currentNode] === 2) {
      const targetMap = nodeMap.get(currentNode)
      for (const node of targetMap.values()) {
        if (!decidedMap.has(node)) {
          operationCount++
          targetMap.delete(node)
        }
      }
    }

    if (1 < remainTargets.length) {
      for (const nextNode of remainTargets) {
        processing(
          remainTargets.filter(x => x !== nextNode),
          nextNode,
          currentNode
        )
      }
    } else return //最後のパターンまで到達したら、戻る
  }

  console.log(operationCount)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `5 4
1 2
1 5
2 4
4 5

  
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
