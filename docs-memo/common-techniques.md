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
