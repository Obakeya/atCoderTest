export function solve (input: string) {
  const lines = input.trim().split('\n')
  // N...円周上に存在する点。等間隔で並ぶ
  // M...相異なる直線で、点Ai, Biを2つ通る直線の個数
  const [N, M] = lines[0].split(' ').map(Number)

  /**
   * 以下の条件を両方満たす、 i,jの組の個数を求める
   * 1 ≤ i ≤ j ≤ M
   * i本目の直線とj本目の直線は交わる
   *
   * 円における直線が交わる、交わらない、ということをどう判断するか
   * 点と点の間の点が同じであれば、共通としてみなせるかも。
   * 
   * 直線が交わらない条件について：
   * 点と点の間の点が同じである直線同士は、交わらない 
   * 例：　1,5 → 3、 2,4 → 3、　8,6 → 7
   *  足して2で割った値が同じにならないものは、どう区別するべきか
   * 始点からの距離が同じであること
   * 7 をどう3と同じように距離が一緒とみなすか →点の位置を反転させて一致するかどうか
   * 点の位置を反転させる方法...半分の点の数分でマイナスする
   * 7-4=3 ここで、4は、点の数が8/2より 4 　それより、点と点の間の点が同じであるグループと分かる
   * 
   * ■交わる線と線の組数をどのように求めるか
   * 線の数は 3 * 10＾5 ある。そのため、すべての線を線同士で比較していくと間に合わなさそう
   * O(N)で求める方法はないか...効率的な求め方を考える
   * 
   * 中心点が1である線　 3 つ
   * 中心点が2である線 5つ
   * があったとする。　この時、交わる線の組は、3*5 =15となる
  * 中心点が1である線　 3 つ
   * 中心点が2である線 5つ
   *　中心点が3である線 4 つ　
  　　があったとする。この時、交わる線の組は、 3 *5 + 3 * 4 + 5 *4である
   *
  *   8,1 と　4，5とが一緒になるかどうかを考える
   *  (8+1)/2= 4.5 、　ここにおいて、中心点は5だから、r
   */

  //交わらない直線のグループ同士事にカウントする
  // グループのカウントが完了したら、後はその前提で計算関数に渡すだけ

  //初期配列
  let lineGroup = new Map<number, number>()
  const halfN = 1 + N / 2
  const halfNum = N / 2

  for (let i = 1; i < lines.length; i++) {
    const [a, b] = lines[i].split(' ').map(Number)
    let halfAB = (a + b) / 2

    if (halfN < halfAB) halfAB -= halfNum

    if (!lineGroup.has(halfAB)) {
      lineGroup.set(halfAB, 1)
      continue
    }

    const count = lineGroup.get(halfAB)
    lineGroup.set(halfAB, count + 1)
  }

  const stackForMultiplicaton = []
  let maxSum = 0

  for (const num of lineGroup.values()) {
    stackForMultiplicaton.push(num)
    maxSum += num
  }

  let crossCount = 0

  //ここの考え方がポイント。愚直に組み合わせを計算していくと、 2/N!の計算量だったが、
  //合計値を引くことで、最大でも 2/Nのループに変更した
  for (let i = 0; i <= stackForMultiplicaton.length - 1; i++) {
    const baseNum = stackForMultiplicaton[i]
    maxSum -= baseNum
    crossCount += baseNum * maxSum
  }

  console.log(crossCount)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `5 10
2 5
1 5
1 2
2 4
2 3
1 3
1 4
3 5
3 4
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
