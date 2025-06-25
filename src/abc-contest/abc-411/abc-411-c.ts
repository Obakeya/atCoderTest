import { count } from 'console'

export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, Q] = lines[0].split(' ').map(Number)
  const AQuery = lines[1].split(' ').map(Number)
  const array = Array(N).fill(0) // 0は白を指す
  /**　ロジックの実装
   *　Qの最大数は50万。全探索だと 50万×50万となってTLE
   *　Q行分出力する。i　のクエリの答えを出力する
      i番目について、白黒反転後、
  　　黒く塗られたマスが連続している区間の個数を求める
    　区間というのがポイントで、色が途切れた後に、黒がもう一度登場する
   *
   *  クエリごとに全探索していると、TLE。効率のいい方法を考える。
   * 　ポイントは、連続していない黒の区間が何度あるかを判断すること。
   * 　累積和と記録用配列の方針でアプローチする
   * 
   * クエリによる結果は3パターン
   * 黒→白となった場合、
   * 1...区間が1つ増える
   * →クエリの前後が黒のケース
   * 2...区間はそのまま
   * クエリの前または後ろで黒、白と隣接しているとき
   * 3...区間が1つ減る
   * 区間の前後が白のケース
   * 
   * 白→黒となった場合、結果は3パターン
   * 1...区間が1つ増える
   * →queryの前後が白のケース
   * 2...区間はそのまま
   * →queryの前または後ろで黒、白と隣接しているとき
   * 3...区間が1つ減る
   * →queryの前後が黒のケース
   * 
   * 
   * ※境界値の時を考える。境界値のとき
   * クエリによる結果は3パターン
   * 黒→白となった場合、
   * 1...区間が1つ増える　（このケースは存在しない）
   
   * 2...区間はそのまま　
  　　クエリの前（後ろ）が黒の状態
   * 3...区間が1つ減る
  　　クエリの前（後ろ）が白の状態
    
   * 白→黒となった場合、結果は3パターン
   * 1...区間が1つ増える
   * →queryの前（後ろ）が白のケース
   * 2...区間はそのまま
   * →queryの前（後ろ）が黒のケース
   * 3...区間が1つ減る（このケースは存在しない）
   * 
   * 
   */

  let blackZoneCount = 0
  for (let i = 0; i < Q; i++) {
    const query = AQuery[i]
    let blacked = false

    // 黒か白にしたかの記憶と、黒と白の入れ替え操作
    if (array[query - 1] === 0) {
      array[query - 1] = 1
      blacked = true
    } else array[query - 1] = 0

    //境界値処理
    if (query === 1 || query === N) {
      const sideColor = edgeSideIsBlack(query)
      if (blacked) {
        if (sideColor === 0) blackZoneCount++
      } else {
        if (sideColor === 0) blackZoneCount--
      }
      console.log(blackZoneCount)
      continue
    }
    const countBlack = countSideBlack(query)
    if (blacked) {
      if (countBlack == 2) blackZoneCount--
      else if (countBlack == 0) blackZoneCount++
    } else {
      if (countBlack == 2) blackZoneCount++
      else if (countBlack == 0) blackZoneCount--
    }

    console.log(blackZoneCount)
  }

  function edgeSideIsBlack (query: number) {
    let side

    // クエリが左端なら、左から2番目の値をチェックする
    if (query === 1) side = array[1]
    // クエリが右端なら、右から2番目の値をチェックする
    else side = array[N - 2]

    if (side === 1) return 1

    return 0
  }
  function countSideBlack (query: number) {
    //クエリの両端の黒の数を数える
    // クエリの位置の値が query -1 となるので、
    //その左は query -2, その右は queryとなる
    return array[query - 2] + array[query]
  }
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `5 7
2 3 3 5 1 5 2

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
