export function solve (input: string): void {
  const lines = input.trim().split('\n')

  const [H, W] = lines[0].split(' ').map(Number)
  const Q = +lines[1]

  UF.init(H * W)

  // used配列の初期化
  for (let i = 0; i <= H + 1; i++) {
    painted[i] = new Array(W + 2).fill(false)
  }

  const results: string[] = []

  // クエリのループは2から開始（0:H W, 1:Q, 2以降:クエリ）
  for (let i = 2; i < 2 + Q; i++) {
    const query = lines[i].split(' ').map(Number)
    const type = query[0]

    if (type === 1) {
      const [, x, y] = query
      query1(x, y, H, W)
    } else if (type === 2) {
      const [, xa, ya, xb, yb] = query
      const answer = query2(xa, ya, xb, yb, W)

      results.push(answer ? 'Yes' : 'No')
    }
  }

  console.log(results.join('\n'))
}

class UnionFind {
  private parent: number[]

  //マスの数分の配列を用意して初期化
  init (sz: number): void {
    //座標位置ごとに、座標位置からみた親を管理する
    this.parent = new Array(sz).fill(-1)
  }

  //与えられた座標が親座標かどうか判定する
  root (position: number): number {
    //まだグループ分けされていないなら、自身を親とする
    if (this.parent[position] === -1) return position

    //すでにグループ分けされているなら、親の親の値を自身の座標位置に格納する
    this.parent[position] = this.root(this.parent[position])
    //自身の親の値を返す
    return this.parent[position]
  }

  unite (u: number, v: number): void {
    u = this.root(u)
    v = this.root(v)
    if (u === v) return
    //親が同じじゃないなら、u側の親をvにする
    this.parent[u] = v
  }

  same (u: number, v: number): boolean {
    return this.root(u) === this.root(v)
  }
}

const UF = new UnionFind()
const painted: boolean[][] = []

/** 指定のマスを赤色で塗る　かつ
 * 隣接する赤いマス同士をグループ化する
 */
function query1 (
  presentX: number,
  presentY: number,
  H: number,
  W: number
): void {
  const directionX = [-1, 0, 1, 0]
  const directionY = [0, 1, 0, -1]
  //UnionFindの処理
  for (let i = 0; i < 4; i++) {
    const searchX = presentX + directionX[i]
    const searchY = presentY + directionY[i]
    // x(行指定)が1より小さいまたは行数より大きいときはスキップ
    // y(列指定)が1より小さいまたは列数より大きいときはスキップ
    if (searchX < 1 || searchX > H || searchY < 1 || searchY > W) continue
    // 赤く塗られていないならスキップ
    if (!painted[searchX][searchY]) continue

    //(x-1) * W ...何行目かを1次元位置に変換、 + (y-1)その行の中での位置を追加
    const hash1 = (presentX - 1) * W + (presentY - 1) // 2次元→1次元位置へ変換　UnionFindは1次元で配列管理する
    const hash2 = (searchX - 1) * W + (searchY - 1)
    UF.unite(hash1, hash2)
  }
  //指定マスを赤色で塗る
  painted[presentX][presentY] = true
}

function query2 (
  px: number,
  py: number,
  qx: number,
  qy: number,
  W: number
): boolean {
  //両方とも赤色でない場合は到達不可
  if (!painted[px][py] || !painted[qx][qy]) {
    return false
  }

  //1次元に座標位置を直す
  const hash1 = (px - 1) * W + (py - 1)
  const hash2 = (qx - 1) * W + (qy - 1)

  return UF.same(hash1, hash2)
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `3 3
10
1 2 2
1 1 1
2 1 1 2 2
1 3 2
2 1 1 2 2
2 2 2 3 2
1 2 3
1 2 1
2 1 1 2 2
2 1 1 3 3
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
