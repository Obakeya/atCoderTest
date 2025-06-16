export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [N, Q] = lines[0].split(' ').map(Number)
  let array: Number[] = []
  for (let n = 1; n <= N; n++) {
    array.push(n)
  }

  // type 3発生時のoffsetを計算する
  let offset = 0
  for (let i = 1; i < lines.length; i++) {
    const [type, pk, x] = lines[i].split(' ').map(Number)
    if (type === 2) {
      console.log(array[(pk - 1 + offset) % N])
    } else if (type === 1) {
      array[(pk - 1 + offset) % N] = x
    } else if (type === 3) {
      /*  配列の実際の組み換えは行わず、offsetを計算して持っておく。
      そのoffsetの値を利用して、タイプ1、タイプ2のクエリを処理する
      1 2 3 4 とあったとき
      2 3 4 1 (1)　先頭の位置~末端の位置 i =1,2,3,0
      3 4 1 2 (2)　先頭の位置 i =2,3,0,1
      4 1 2 3 (3)  先頭の位置 i = 3,0,1,2
      1 2 3 4 (4)
      4回目でもとに戻る。ここで、 5回 k 処理をする、というのは、1回処理をするのと変わらない。
      したがって、　実体として意味ある振る舞いは k % N  で求められる。
       5÷4 はあまり1, 1÷4は1回 

       ここでは、offsetを計算する。(1)のときは、offset = 1を意味する
       (0) p=1→array[0]
       (1) p=1→array[1]
       (2) p=1→array[2]
       (3) p=1→array[3]
       (4) p=1→array[0] ※offsetは4とはならない。余り演算して計算しておくため。
       (0) p=2→array[1]
       (1) p=2→array[2]
       (2) p=2→array[3]
       (3) p=2→array[0]
       (0) p=3→array[2]
       (1) p=3→array[3]
       (2) p=3→array[0]
       (3) p=3→array[1]     

       上記、より、インデックス位置 = p-1 + offset

      **/
      offset = (pk + offset) % N
    }
  }
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `1000000 2
1 1000000 999999
3 1000000000

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
