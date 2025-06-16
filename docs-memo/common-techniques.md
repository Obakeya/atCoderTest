# 競技プログラミング 頻出テクニック

### 頻度配列の作成

各座標に何個ずつ点があるかをカウントする場合などに利用する方法（ABC 409 C など）

```typescript
// 頻度配列パターン
const array = [1, 3, 1, 2, 3, 1] //出現座標を示すデータ
const freq = new Array(4).fill(0) // [0, 0, 0, 0]　出現座標の最大値+1の長さの配列を作成
for (const value of array) {
  freq[value]++ //出現した座標の値をindexで指定しカウントすることで、座標の出現科数を記憶する
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
