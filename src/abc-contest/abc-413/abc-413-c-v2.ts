//解説をもとにtypescriptに置き換えたコート。
//私の元の実行時間が 619msに対し、こちらのコードの実行時間は 200msとだいぶ早まった
export function solve (input: string) {
  const data = input.trim().split(/\s+/)

  let idx = 0
  const Q = Number(data[idx++])

  // (count, value) を保持するキューを配列+headポインタで実装
  const cnt: bigint[] = [] //削除したらその分をひておく
  const val: bigint[] = []
  let head = 0

  const outputs: string[] = []

  for (let qi = 0; qi < Q; qi++) {
    const t = Number(data[idx++])

    //Type1のクエリ
    if (t === 1) {
      // 1 c x : 末尾に x を c 個追加
      const c = BigInt(data[idx++])
      const x = BigInt(data[idx++])
      cnt.push(c)
      val.push(x)
    } else {
      // 2 k : 先頭 k 個削除して和を出力
      let k = BigInt(data[idx++])
      let sum = 0n

      while (k > 0n) {
        const curCnt = cnt[head]
        const curVal = val[head]

        // 削除する方の数のほうが、残りの数より大きい場合
        if (curCnt <= k) {
          // ペアを丸ごと削除
          sum += curCnt * curVal
          k -= curCnt // 削除した分、引いておく
          head++ // 実質 pop、次のpush分に移動
        } else {
          //のk理
          // 一部だけ削除して残りを更新
          sum += k * curVal
          cnt[head] = curCnt - k
          k = 0n
        }
      }
      outputs.push(sum.toString())
    }
  }

  //最後にまとめて出力したほうがパフォーマンスがよい
  console.log(outputs.join('\n'))
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
