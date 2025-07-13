# 競技プログラミング 頻出テクニック

### 頻度配列の作成

各座標に何個ずつ点があるかをカウントする場合などに利用する方法（ABC 409 C など）

```typescript
// 頻度配列パターン
const array = [1, 3, 1, 2, 3, 1] //出現座標を示すデータ
const freq = new Array(4).fill(0) // [0, 0, 0, 0]　出現座標の最大値+1の長さの配列を作成
for (const value of array) {
  freq[value]++ //出現した座標の値をindexで指定しカウントすることで、座標の出現回数を記憶する
}
// 結果: freq = [0, 3, 1, 2]
//       意味: 値0→0回, 値1→3回, 値2→1回, 値3→2回
```

### 余り演算による周期処理

```typescript
// 円周/周期パターン
const postion = (currentPos + move) % length
//例：時計の12時間表示
const hour = (currentHour + addhours) % 12

//配列の循環アクセス
const index = (currentIndex + step) % array.length
const nextelement = array[index]
```

よくある用途

- 円周移動：座標が周囲をループ
- 時間計算：24 時間、7 曜日、12 か月
- 配列ローテーション：末尾の次は先頭
- 周期パターン：繰り返し処理

### オフセットによる仮想的操作

実際のデータ移動を行わず、アクセス時の計算でデータの位置関係を変更する手法（ABC 410 D など）

```typescript
// 配列回転のオフセットパターン
const array = [1, 2, 3, 4, 5]
let offset = 0

// 右回転操作：実際の配列は変更せず、offsetのみ更新
function rotate(k: number) {
  offset = (offset + k) % array.length // O(1)で完了
}

// アクセス時に実際の位置を計算
function getValue(logicalIndex: number): number {
  const actualIndex = (logicalIndex + offset) % array.length
  return array[actualIndex]
}

// 設定時も同様
function setValue(logicalIndex: number, value: number) {
  const actualIndex = (logicalIndex + offset) % array.length
  array[actualIndex] = value
}
```

よくある用途

配列回転：O(N)操作を O(1)に高速化
循環バッファ：先頭位置の管理
座標変換：基準点のずらし
区間操作：範囲の仮想的移動

### 二次元配列の回転操作

■ 座標変換の発想
盤面を「左上原点 (0,0)」で考えると，
元の座標: (i, j) … i=行, j=列
を 90° 時計回りすると，
新しい座標: ( j , N-1-i )
になる。─── 行と列を入れ替え，列側を左右反転するだけ。

      ┌─────┐      ┌─────┐
      │(0,0)│ ⇒   │     │(0,N-1)
      └─────┘      └─────┘

■ 180°・270° は 90° を重ねるだけ
180° : (i,j) → (N-1-i , N-1-j)
270° : (i,j) → (N-1-j , i) // ＝反時計回り 90°

■ 実装の型 1. 空配列 res を作る 2. 元配列を二重ループで走査し，変換先へコピー 3. 元配列には手を触れず，新しい配列を返す

```typescript
;/_ ===== 90° Clockwise ===== _/
export function rotate90Clockwise(grid: string[][]): string[][] {
  const N = grid.length
  const res: string[][] = Array.from({ length: N }, () => Array(N))
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      res[j][N - 1 - i] = grid[i][j]
    }
  }
  return res
}

;/_ ===== 180° ===== _/
export function rotate180(grid: string[][]): string[][] {
  const N = grid.length
  const res: string[][] = Array.from({ length: N }, () => Array(N))
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      res[N - 1 - i][N - 1 - j] = grid[i][j]
    }
  }
  return res
}

;/_ ===== 270° Clockwise (＝ 90° Counter-clockwise) ===== _/
export function rotate270Clockwise(grid: string[][]): string[][] {
  const N = grid.length
  const res: string[][] = Array.from({ length: N }, () => Array(N))
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      res[N - 1 - j][i] = grid[i][j]
    }
  }
  return res
}
```

逆順シュミレーション

「最終状態だけが欲しい」操作列では、前向きシミュレーションより 後ろから辿るほうが速い ことが多い。ポイントは次の 3 ステップだけ。

注目対象 cur を 1 変数で持つ例: 0=サーバー, 1‥N=各 PC。

クエリを末尾 → 先頭へ走査

1 p (PC→Server): cur==p なら cur=0 へ切替。

3 p (Server→PC): cur==0 なら cur=p へ切替。

2 p s (PC に追加): cur==p なら buf.push(reverse(s))。

バッファを最後に 1 度だけ反転 answer = reverse(buf.join("")) – コピーは合計長さ分だけ。

この形に落とし込めば計算量は O(Q + Σ|s|)、余計な PC 状態は一切持たない。ABC411 D など、コピーと追加が混じる問題でよく刺さるテクニック。
