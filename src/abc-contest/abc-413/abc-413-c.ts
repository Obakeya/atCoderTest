//コンテスト中に解いたコード。コンテスト中はBigIntの扱いが誤っていて正答できなかった
export function solve (input: string) {
  const lines = input.trim().split('\n')

  // 0にc, 1 にxを追加する
  let memory: number[][] = []
  let currentMemoryIndex = 0
  for (let i = 1; i < lines.length; i++) {
    const type = lines[i][0]

    if (type === '1') {
      const [t, c, x] = lines[i].split(' ').map(Number)

      memory.push([c, x, 0]) //ラストは削除数。 x をc個追加する。
    } else {
      const [t, k] = lines[i].split(' ').map(Number) // kが削除数

      /**
       *  タイプごとの区分けではなく、区間ごとに加算していく、という方針にしたい
       * ・区間の開始位置からスタート。もし、終わりの要素数より次の階層に進む必要があれば進む
       * ・希望の削除数まで実施したところでブレイク。その時の削除カウント及び、テーブル位置を覚えておく
       */
      let need = true
      let tempSum = 0n
      let tempDeleteCount = 0

      while (need) {
        const c = memory[currentMemoryIndex][0] //持っている要素数
        const x = memory[currentMemoryIndex][1] //要素の値
        const deleteCount = memory[currentMemoryIndex][2] //テーブルごとの削除数
        const kakezanSize = Math.min(k - tempDeleteCount, c - deleteCount) // 総合の削除数または残りの要素数で小さいほうを取得
        tempSum += BigInt(x) * BigInt(kakezanSize)

        memory[currentMemoryIndex][2] += kakezanSize //削除サイズを記録
        tempDeleteCount += kakezanSize
        // まだ、削除数が期待削除数に満たない場合はテーブルを変えて再度削除実施
        if (tempDeleteCount < k) {
          currentMemoryIndex++
        } //削除数が、期待した削除数まで　到達したらwhileループは抜けて、結果を出力する
        else need = false
      }
      console.log(tempSum.toString())
    }
  }
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `10
1 160449218 954291757
2 17217760
1 353195922 501899080
1 350034067 910748511
1 824284691 470338674
2 180999835
1 131381221 677959980
1 346948152 208032501
1 893229302 506147731
2 298309896

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
