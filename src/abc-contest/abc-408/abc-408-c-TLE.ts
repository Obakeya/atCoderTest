/**　コミット時問題のurlを書く */
export function solve (input: string) {
  const lines = input.trim().split('\n')

  const [NWall, MHoudai] = lines[0].split(' ').map(Number)
  /**
   * 砲台による壁の守られ方をどうカウントするかがポイントになる。
   * 守る壁はL-Rの範囲指定で決定される
   * Nの上限が10の6乗であることに注意。純粋な計算量量をとらえると、だいぶ数が多くなる
   * 知りたいのは、砲台に守られていない城壁が存在する状態にするために、破壊する必要がある砲台の
   * 個数の最小値、
   * つまり、壁ごとに守られている砲台の数をカウントアップ、メモしておき、
   * 守られている砲台の数が最小である壁を覚えておけば、その壁に紐づく守られている砲台の数が
   * 答えになる
   *
   * 最小をメモしないといけないから、最小じゃなくなるタイミングをメモしないといけない
   * 最小じゃなくなる時に、
   *
   * どの砲台も城壁を守っていない、というケースも検知が必要である
   * どの砲台も守っていない場合は、その壁の存在を踏まえ、0をreturnする必要がある。
   *
   * 一度も降られていない数字があるかどうかって、どうやって判別するねん。
   * →Setを使うか。壁番号ごとにSetを使う。
   * もし、一度も守られている壁があれば、Setに追加する。
   * Setのサイズが、壁サイズと一致しないなら、0が答えである
   *
   * 計算量をどう減らすか。砲台のループは変えるのは難しそう。
   * これはどうやってもベースのデータ。変えるとしたら、砲台が守る壁の範囲ループ。
   * たぶん、壁の守り方について、全然違う考え方をする必要があるのだと思う。
   * ここまでのシュミレーションじゃない方法。もっと、スマートな抽出方法があるはず。
   *
   * たぶん、集合的な考え方をするのはどうか。
   * 砲台ごとに、集合の組を作っていく、
   */

  // // 全部の壁についてメモしないと、最小ってわからない、、？
  // let minHoudaiCount = 1
  // const minHoudaiWallNumberSets = new Set<number>()

  // const wallHoudaiMap = new Map<number, number>() //壁番号、砲台の数
  // const guradWallNumberSet = new Set<number>()
  // //砲台の数ループ
  // for (let i = 1; i < MHoudai + 1; i++) {
  //   let [Li, Ri] = lines[i].split(' ').map(Number)

  //   let houdaiCount = 1

  //   //砲台が守る壁の範囲ループ
  //   for (Li; Li <= Ri; Li++) {
  //     if (wallHoudaiMap.has(Li)) {
  //       houdaiCount = wallHoudaiMap.get(Li) + 1
  //       wallHoudaiMap.set(Li, houdaiCount)
  //     } else {
  //       wallHoudaiMap.set(Li, 1)
  //     }

  //     //最小の砲台の壁番号を覚えておき、最小の砲台数では
  //     //無くなった壁があれば、メモSetから削除する
  //     if (houdaiCount > minHoudaiCount) {
  //       if (minHoudaiWallNumberSets.size === 1) {
  //         minHoudaiCount = houdaiCount //Setから削除しない
  //       } else {
  //         minHoudaiWallNumberSets.delete(Li)
  //       }
  //     }

  //     //最小ガード数の壁発見
  //     if (houdaiCount <= minHoudaiCount) {
  //       minHoudaiCount = houdaiCount
  //       minHoudaiWallNumberSets.add(Li)
  //     }

  //     //壁番号発見メモ
  //     guradWallNumberSet.add(Li)
  //   }
  // }

  // 全部の壁についてメモしないと、最小ってわからない、、？
  const minHoudaiWallNumberSets = new Set<number>()

  type Group = {
    minNumber: number
    maxNumber: number
    wallCount: number
  }

  const wallHoudaiGroupArray = [] //壁番号、砲台の数

  const guradWallNumberSet = new Set<number>()

  const firstGroup = {
    wallCount: 0,
    minNumber: 1,
    maxNumber: NWall
  }
  wallHoudaiGroupArray.push(firstGroup)

  let minHoudaiCount = 0
  for (let i = 1; i < MHoudai + 1; i++) {
    let [Li, Ri] = lines[i].split(' ').map(Number)

    for (let j = 0; j < wallHoudaiGroupArray.length; j++) {
      let kaburi = false

      if (Li <= wallHoudaiGroupArray[j].minNumber) {
        wallHoudaiGroupArray[j].minNumber = Li
        kaburi = true
      }

      if (wallHoudaiGroupArray[j].maxNumber <= Ri) {
        wallHoudaiGroupArray[j].maxNumberNumber = Ri
        kaburi = true
      }

      if (kaburi) wallHoudaiGroupArray[i].wallCount += 1

      if (wallHoudaiGroupArray[j].minNumber < minHoudaiCount) {
      }
    }
  }

  return 0
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `5 2
1 2
3 4

`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  console.log(solve(testInput).toString())
}
// ローカル実行環境
else if (require.main === module) {
  const fs = require('fs')
  const input = fs.readFileSync(0, 'utf8') // 標準入力を直接読み取り
  console.log(solve(input).toString())
}
