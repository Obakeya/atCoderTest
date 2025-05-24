## 計算量とは

アルゴリズムの効率性を測る指標

### 時間計算量（Time Complexity）

「どのくらい時間がかかるか」 = 実行される処理の回数

```typescript
// O(1) - 定数時間
const first = arr[0]

// O(N) - 線形時間
for (let i = 0; i < N; i++) {
  console.log(arr[i])
}

// O(N²) - 二次時間
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    console.log(arr[i], arr[j])
  }
}
```

### 空間計算量（Space Complexity）

「どのくらいメモリを使うか」 = 使用される変数・配列のサイズ

```typescript
// O(1) - 定数空間
let sum = 0
for (let i = 0; i < N; i++) {
  sum += arr[i] // 新しい変数は作らない
}

// O(N) - 線形空間
const copy = []
for (let i = 0; i < N; i++) {
  copy.push(arr[i]) // N 個の要素を保存
}
```
