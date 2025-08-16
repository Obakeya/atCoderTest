export function solve (input: string) {
  const lines = input.trim().split('\n')
  //N...N種類の食材が存在し、すぬけくんはN種類の食材がすべて苦手な状態からスタート
  //M...M個の料理を提供している。料理 i　にはKi種類の食材が使われている
  const [N, M] = lines[0].split(' ').map(Number)

  const sourceToMealMap = new Map<number, Set<number>>()
  //料理側からみたら、克服する必要のある食材数だけ覚えておけばよかった
  const canNotEatFoodsCounterByMeals = Array(M + 1).fill(0)

  /**
   * 克服する食材が増えていくことに、食べられる料理が増える。
   * どのように食材→料理の関係性を把握するかが必要
   * まず、食材→料理でたどるための集合が必要
   * ある食材を克服したときのみ、食べられる料理が増えうる可能性がある
   * 食材番号から料理をたどる
   * その後、　料理→食材をたどる。　ここで、克服した食材を、料理に紐づく食材から削除する。（これはSetで管理する)
   * Setのサイズがこの操作によって0になった場合、食べられる料理のカウントを増やす。
   * そのカウントアップ後の処理の結果を出力する
   */

  //準備
  for (let mealNum = 1; mealNum < lines.length - 1; mealNum++) {
    const mealAndSources = lines[mealNum].split(' ').map(Number)
    const sourceSet = new Set<number>()

    for (let j = 1; j < mealAndSources.length; j++) {
      const source = mealAndSources[j]
      sourceSet.add(source)
      if (!sourceToMealMap.has(source)) {
        const mealSets = new Set<number>()
        sourceToMealMap.set(source, mealSets)
      }
      const mealSets = sourceToMealMap.get(source)
      mealSets.add(mealNum)
    }

    //料理は到来する順番ごとに番号で設定する
    canNotEatFoodsCounterByMeals[mealNum] = sourceSet.size
  }

  //食材の克服を開始
  const okSources = lines[lines.length - 1].split(' ').map(Number)
  let okMeals = 0
  for (const source of okSources) {
    //食材から、その食材を使う料理を特定

    if (!sourceToMealMap.has(source)) {
      console.log(okMeals)
      continue
    }

    const mealSets = sourceToMealMap.get(source)

    for (const meal of mealSets) {
      //料理ごとに未克服の食材を取得
      canNotEatFoodsCounterByMeals[meal]--

      if (canNotEatFoodsCounterByMeals[meal] === 0) {
        okMeals++
      }
    }
    console.log(okMeals)
  }
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `9 8
1 4
5 6 9 7 4 3
4 2 4 1 3
1 1
5 7 9 8 1 5
2 9 8
1 2
1 1
6 5 2 7 8 4 1 9 3

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
