/** 問題メモ
 * HxWのグリッドでSからGへの最短距離を求める問題
 * '#': 障害物
 * 'x', 'o': 特殊なマス（状態によって通れるかが決まる）
 * '?': 状態を切り替えるマス
 * 状態0: 'x'を通れない、'o'は通れる
 * 状態1: 'o'を通れない、'x'は通れる
 *
 * すでに通ったマスを、もう一度通る可能性がある問題
 * 到達済みかどうかは、通るマスの状態とセットで管理する
 *
 * BFSの基本的なことだが、一度訪問したところは再訪問しないことで、ある地点に到達したときには、最短距離で
 * 求められている
 *
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const [h, w] = lines[0].split(' ').map(Number)
  const a = lines.slice(1, h + 1)

  let sx = -1,
    sy = -1,
    gx = -1,
    gy = -1

  // スタートとゴールを見つける
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (a[i][j] === 'S') {
        sx = i
        sy = j
      }
      if (a[i][j] === 'G') {
        gx = i
        gy = j
      }
    }
  }

  const INF = 10 ** 9
  const dx = [-1, 1, 0, 0]
  const dy = [0, 0, -1, 1]

  // 3次元配列の用意
  // d[状態][x][y] = 最短距離
  // 状態0: 'x'を通れない、状態1: 'o'を通れない
  const d = Array.from({ length: 2 }, () =>
    Array.from({ length: h }, () => Array(w).fill(INF))
  )

  const queue: [number, number, number][] = []
  queue.push([0, sx, sy])
  d[0][sx][sy] = 0 //ここで0を設定しておくことで、 0 +1 が伝播していく

  while (queue.length > 0) {
    const [c, x, y] = queue.shift()!

    for (let k = 0; k < 4; k++) {
      const xx = x + dx[k]
      const yy = y + dy[k]

      // 境界チェック
      if (!(0 <= xx && xx < h && 0 <= yy && yy < w)) {
        continue
      }

      // 障害物チェック
      if (a[xx][yy] === '#') {
        continue
      }

      // 状態による通行制限チェック
      if ((c === 0 && a[xx][yy] === 'x') || (c === 1 && a[xx][yy] === 'o')) {
        continue
      }

      // 状態の更新（'?'を通ると状態が反転）
      // cc..計算後の体、次の値
      // c ^ 1 ... 0 を1で返す、 1 を 0で返すXOR演算子
      const cc = a[xx][yy] === '?' ? c ^ 1 : c

      // 既に訪問済みかチェック
      if (d[cc][xx][yy] !== INF) {
        continue
      }

      queue.push([cc, xx, yy])
      // + 1は移動コストを入れておく
      //d[c][x][y]は現在いる地点での距離
      //d[cc][xx][yy]は移動先の状態での距離
      d[cc][xx][yy] = d[c][x][y] + 1
    }
  }

  const ans = Math.min(d[0][gx][gy], d[1][gx][gy])
  console.log(ans === INF ? -1 : ans)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `5 5
Sx?x?
o#o#x
?o?o?
x#x#o
?x?oG

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
