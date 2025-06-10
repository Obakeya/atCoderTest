今回の問題は、二分探索法が必要。通常の二分探索とは異なる。

## 普通の二分探索との違い

### 一般的な二分探索（値を見つける）

```typescript
function normalBinarySearch(arr: number[], target: number): number {
  let left = 0,
    right = arr.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === target) {
      return mid // 「位置」を返す
    } else if (arr[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1 // 見つからない
}
```

### 今回の二分探索（境界を見つけて個数を数える）

```typescript
function binarySearchLess(arr: number[], target: number): number {
  let left = 0,
    right = arr.length // rightの初期値が違う
  while (left < right) {
    // 条件が違う
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] < target) {
      // 等号なし
      left = mid + 1
    } else {
      right = mid // mid-1ではない
    }
  }
  return left // 「個数」を返す
}
```

## なぜ思いつくのが難しいのか

### 1. 発想の転換が必要

- 普通：「値を探す」→「位置を返す」
- 今回：「境界を探す」→「個数を数える」→「組み合わせに応用」

### 2. 複数段階の抽象化が必要

```typescript
// ステップ1: 問題の本質を見抜く
// 「A < B < C の組み合わせ数」→「Bを固定して考える」

// ステップ2: 計算方法を発見
// 「B固定時の組み合わせ数」→「B未満の個数 × B超過の個数」

// ステップ3: 効率的な実装を選択
// 「個数を数える」→「境界位置を見つける二分探索」
```

## 通常の二分探索と異なるポイントについて解説

## 1. right の初期値が違う

```typescript
// 普通の二分探索
let right = arr.length - 1 // 最後の要素の添字

// 境界二分探索
let right = arr.length // 配列の外（仮想的な位置）
```

**なぜ配列の外を初期値にするのか？**

境界探索では「挿入位置」を探すため、**配列の末尾への挿入**も考慮する必要があります。

```typescript
function demonstrateRightInit() {
  const arr = [1, 3, 5]
  const target = 10 // 全要素より大きい

  // target=10未満の要素数を求めたい（答え：3個）
  // 10の挿入位置は配列の末尾（添字3）
  // だから right = arr.length = 3 で初期化が必要
}
```

## 2. 条件が違う

```typescript
// 普通の二分探索
while (left <= right) {  // leftがrightを超えるまで

// 境界二分探索
while (left < right) {   // leftがrightと等しくなるまで
```

**なぜ等号なしなのか？**

境界探索は**区間を狭めて 1 点に収束**させるアルゴリズムです。left と right が一致しているところが、境界位置になる。

```typescript
function demonstrateCondition() {
  // 境界探索の収束過程
  // [left=0, right=5] → [left=0, right=3] → [left=2, right=3] → [left=2, right=2]
  // left == right になった時点で境界位置確定
  // もし left <= right なら無限ループの危険性
  // なぜなら right = mid で更新するため、left == right でも継続してしまう
}
```

## 3. 等号なし（符号のみ）

```typescript
// 普通の二分探索
if (arr[mid] === target) return mid;  // 完全一致を探す

// 境界二分探索
if (arr[mid] < target) {             // 完全一致は気にしない
```

**なぜ完全一致を気にしないのか？**

境界探索の目的は「条件の境界線」を見つけることで、特定の値の存在は関係ありません。

```typescript
function demonstrateNoEquals() {
  const arr = [1, 3, 5, 7, 9]
  const target = 4 // 配列に存在しない値

  // 4未満の要素数を求める（答え：2個 = [1,3]）
  // 4が存在しなくても、境界（4以上の最初の位置）は見つけられる
  // つまり === による完全一致チェックは不要
}
```

## 4. mid-1 ではない

```typescript
// 普通の二分探索
right = mid - 1 // midを除外して探索範囲を狭める

// 境界二分探索
right = mid // midを含めて探索範囲を狭める
```

**なぜ mid を除外しないのか？**

境界探索では、mid が境界位置の候補になる可能性があるためです。

```typescript
function demonstrateNoMidMinus1() {
  const arr = [1, 3, 5, 7, 9]
  const target = 5

  // mid=2, arr[2]=5 の場合
  // 5未満を探しているなら、arr[2]=5は境界の候補
  // もし right = mid - 1 にすると、この境界候補を見逃してしまう
  // だから right = mid で境界候補を保持する
}
```

excellent question! 「mid が境界位置の候補になる」について、具体例で詳しく解説します。

## 境界位置とは何か

境界位置とは、**「条件を満たす領域」と「条件を満たさない領域」の境目**のことです。

```typescript
function demonstrateBoundary() {
  const arr = [1, 3, 5, 7, 9]
  const target = 5 // 5未満の要素数を求める

  // 配列を条件で分割すると...
  // [1, 3] | [5, 7, 9]
  // ↑      ↑
  // 5未満   5以上
  //
  // 境界位置 = 添字2（値5の位置）
}
```

## mid が境界候補になるケース

二分探索の途中で、**mid が正に境界線上にある場合**があります：

```typescript
function demonstrateMidAsBoundary() {
  const arr = [1, 3, 5, 7, 9]
  const target = 5

  let left = 0,
    right = 5

  // ある時点で mid = 2, arr[2] = 5 になったとする
  const mid = 2

  if (arr[mid] < target) {
    // 5 < 5 → false
    left = mid + 1
  } else {
    // 5 >= 5 → true
    right = mid // right = 2 （midを保持！）
  }

  // なぜmidを保持するのか？
  // arr[2] = 5 は「5以上の最初の要素」= まさに境界位置！
  // もし right = mid - 1 にすると...
  console.log(`right = mid - 1 なら: ${mid - 1}`) // 1
  console.log(`arr[1] = ${arr[1]}`) // 3
  // 境界位置（5の位置）を見逃してしまう！
}
```

## right = mid - 1 だと何がまずいのか

```typescript
function demonstrateWrongBoundary() {
  const arr = [1, 3, 5, 7, 9]
  const target = 5

  // 間違った境界探索（right = mid - 1 を使った場合）
  let left = 0,
    right = arr.length

  // mid = 2, arr[2] = 5 の時点で
  if (arr[2] >= target) {
    // 5 >= 5 → true
    right = 2 - 1 // right = 1（間違い！）
  }

  // 結果：探索範囲が [0, 1] になってしまう
  // 正しい境界位置（添字2）が除外されてしまう

  console.log('間違った結果：5未満の要素数 = 1個') // [1] のみ
  console.log('正しい結果：5未満の要素数 = 2個') // [1, 3]
}
```

## 正しい境界探索の動作

```typescript
function demonstrateCorrectBoundary() {
  const arr = [1, 3, 5, 7, 9]
  const target = 5

  // 正しい境界探索（right = mid を使った場合）
  let left = 0,
    right = arr.length // [0, 5)

  // 1回目: mid = 2, arr[2] = 5
  if (arr[2] >= target) {
    // 5 >= 5 → true
    right = 2 // [0, 2) に狭める（境界候補を保持）
  }

  // 2回目: mid = 1, arr[1] = 3
  if (arr[1] < target) {
    // 3 < 5 → true
    left = 2 // [2, 2) に狭める
  }

  // left == right = 2 で終了
  // 結果：境界位置 = 2, 5未満の要素数 = 2個
}
```

## まとめ

**「mid が境界位置の候補」とは**：

- mid の値が境界線上にある可能性がある
- その位置を失わないように `right = mid` で保持する
- `right = mid - 1` だと、真の境界位置を除外してしまう危険性がある

つまり、境界探索では**潜在的な境界位置を常に保護する**ことが重要なのです。

あ、そうですね！基本に戻って、`mid`とは何かから説明します。

## mid とは

`mid`は**探索範囲の中央の添字（インデックス）**のことです。

```typescript
function demonstrateMid() {
  const arr = [1, 3, 5, 7, 9]
  let left = 0,
    right = 5 // 探索範囲: 添字0〜4

  const mid = Math.floor((left + right) / 2)
  console.log(`mid = ${mid}`) // mid = 2
  console.log(`arr[mid] = ${arr[mid]}`) // arr[2] = 5

  // midは「今見ている配列の要素の位置」
}
```

## 二分探索での mid の役割

mid は、配列を**2 つに分割する基準点**として使われます：

```typescript
function demonstrateMidRole() {
  const arr = [1, 3, 5, 7, 9]
  const target = 6
  let left = 0,
    right = 5

  const mid = 2 // 中央の添字

  console.log(`現在の探索範囲: 添字${left}〜${right - 1}`)
  console.log(`midが指す要素: arr[${mid}] = ${arr[mid]}`)

  // arr[mid]とtargetを比較して、次にどちら半分を探すかを決める
  if (arr[mid] < target) {
    console.log(`${arr[mid]} < ${target} なので、右半分を探索`)
    // left = mid + 1;  // 右半分 [mid+1, right) を探索
  } else {
    console.log(`${arr[mid]} >= ${target} なので、左半分を探索`)
    // right = mid;     // 左半分 [left, mid) を探索
  }
}
```

## mid の計算方法

```typescript
function demonstrateMidCalculation() {
  // 例1: left = 0, right = 5
  let mid1 = Math.floor((0 + 5) / 2) // mid = 2

  // 例2: left = 3, right = 5
  let mid2 = Math.floor((3 + 5) / 2) // mid = 4

  // 例3: left = 0, right = 2
  let mid3 = Math.floor((0 + 2) / 2) // mid = 1

  console.log(`範囲[0,5): mid = ${mid1}`)
  console.log(`範囲[3,5): mid = ${mid2}`)
  console.log(`範囲[0,2): mid = ${mid3}`)
}
```

## mid の変化の様子

```typescript
function demonstrateMidChanges() {
  const arr = [1, 3, 5, 7, 9]
  const target = 6

  let left = 0,
    right = 5
  console.log('二分探索の進行:')

  // 1回目
  let mid = Math.floor((left + right) / 2) // mid = 2
  console.log(
    `1回目: 範囲[${left},${right}), mid=${mid}, arr[${mid}]=${arr[mid]}`
  )

  // arr[2]=5 < 6 なので右半分を探索
  left = mid + 1 // left = 3

  // 2回目
  mid = Math.floor((left + right) / 2) // mid = 4
  console.log(
    `2回目: 範囲[${left},${right}), mid=${mid}, arr[${mid}]=${arr[mid]}`
  )

  // arr[4]=9 >= 6 なので左半分を探索
  right = mid // right = 4

  // 3回目
  mid = Math.floor((left + right) / 2) // mid = 3
  console.log(
    `3回目: 範囲[${left},${right}), mid=${mid}, arr[${mid}]=${arr[mid]}`
  )
}
```

つまり、**mid = 「今この瞬間に調べている配列要素の位置」**ということです！

excellent question! これは二分探索の**目的の違い**から生まれる重要な違いです。

## 通常の二分探索：「値を見つける」

```typescript
function normalBinarySearch(arr: number[], target: number): number {
  const arr = [1, 3, 5, 7, 9]
  const target = 5 // 値5を探す

  let left = 0,
    right = arr.length - 1

  // mid = 2, arr[2] = 5 の時点で
  if (arr[2] === target) {
    return 2 // 見つかった！終了
  }

  // もしarr[2] > targetなら
  if (arr[2] > target) {
    right = 2 - 1 // right = 1
    // 添字2を除外しても問題ない理由：
    // arr[2] = 5 > target だから、答えは左側にあると確定
    // 添字2はもう調べる必要がない
  }
}
```

**通常の二分探索では、mid を除外しても問題ない理由**：

- arr[mid]を既に調べた
- arr[mid] ≠ target なら、答えは別の場所にあると確定
- だから mid は除外して OK

## 境界探索：「境界位置を見つける」

```typescript
function boundaryBinarySearch(arr: number[], target: number): number {
  const arr = [1, 3, 5, 7, 9]
  const target = 5 // 5未満の要素数を求める

  let left = 0,
    right = arr.length

  // mid = 2, arr[2] = 5 の時点で
  if (arr[2] >= target) {
    // 5 >= 5 → true
    // この時点では何も「見つかっていない」
    // arr[2] = 5 は境界位置の「候補」でしかない

    if ((right = mid - 1)) {
      // もしこうすると...
      // 添字2を除外してしまう
      // でも添字2こそが境界位置！
      // まだ確定していないのに除外するのは間違い
    }

    right = mid // 正しい方法：候補を保持
  }
}
```

**境界探索では、mid を除外してはいけない理由**：

- arr[mid]は境界位置の**候補**でしかない
- まだ境界が確定していない
- mid を除外すると、真の境界位置を失う可能性がある

## 具体例での比較

```typescript
function compareSearchTypes() {
  const arr = [1, 3, 5, 7, 9]

  console.log('=== 通常の二分探索で5を探す ===')
  // mid = 2, arr[2] = 5
  // 5 === 5 → 見つかった！return 2
  // 除外の問題は発生しない（見つかったから終了）

  console.log('=== 境界探索で5未満の個数を求める ===')
  // mid = 2, arr[2] = 5
  // 5 >= 5 → 境界候補だが、まだ確定していない
  // right = mid で候補を保持する必要がある
  // right = mid - 1 だと境界候補を失ってしまう
}
```

## 根本的な違い

| 比較項目   | 通常の二分探索     | 境界探索               |
| ---------- | ------------------ | ---------------------- |
| 目的       | 特定の値を見つける | 境界位置を見つける     |
| 判定       | 完全一致で終了     | 条件分岐で範囲を狭める |
| mid の扱い | 調べ済み → 除外 OK | 境界候補 → 保持必要    |
| 終了条件   | 見つかった時点     | 範囲が 1 点に収束      |

つまり、**「調べ済みだから除外して OK」vs「まだ候補だから保持が必要」**という違いなのです！

## 5. 個数を返す

```typescript
// 普通の二分探索
return mid // 見つけた要素の位置
return -1 // 見つからない場合

// 境界二分探索
return left // 境界位置（＝条件を満たす要素の個数）
```

**なぜ left が個数になるのか？**

left は最終的に「条件の境界位置」を指し、これが要素数と一致するためです。

```typescript
function demonstrateReturnCount() {
  const arr = [1, 3, 5, 7, 9]
  const target = 6

  // 最終的に left = 3（arr[3]=7の位置）
  // これは「6以上の最初の位置」
  // つまり添字0〜2の要素[1,3,5]が6未満
  // 個数 = 3個 = left の値
}
```

## mid-1 をしなくても、 left < right を while の条件にすることで、無限ループを防止している

通常の二分探索では right に指定する値を mid-1 しないと、無限ループの問題があります。

## 通常の二分探索での無限ループリスク

```typescript
function demonstrateInfiniteLoopRisk() {
  const arr = [1, 3, 5]
  const target = 5

  let left = 0,
    right = 2 // arr.length - 1

  console.log('=== 通常の二分探索で right = mid にすると... ===')

  while (left <= right) {
    const mid = Math.floor((left + right) / 2) // mid = 1
    console.log(`left=${left}, right=${right}, mid=${mid}`)

    if (arr[mid] === target) {
      return mid
    } else if (arr[mid] < target) {
      // 3 < 5
      left = mid + 1 // left = 2
    } else {
      right = mid // もしこうすると...
      // 次のループ: left=2, right=2, mid=2
      // その次: left=2, right=2, mid=2... 無限ループ！
    }
  }
}
```

**通常の二分探索で`right = mid - 1`が必要な理由**：

- `while (left <= right)` の条件
- `left = right`でも継続するため、`right = mid`だと範囲が狭まらない

## 境界探索が無限ループにならない理由

```typescript
function demonstrateNoInfiniteLoop() {
  const arr = [1, 3, 5]
  const target = 5

  let left = 0,
    right = 3 // arr.length

  console.log('=== 境界探索では無限ループにならない ===')

  while (left < right) {
    // 重要：等号なし
    const mid = Math.floor((left + right) / 2)
    console.log(`left=${left}, right=${right}, mid=${mid}`)

    if (arr[mid] < target) {
      left = mid + 1
    } else {
      right = mid // これでも無限ループにならない
    }

    // なぜ？left < right の間は必ず範囲が狭まるから
  }

  console.log(`最終: left=${left}, right=${right}`)
}
```

## 2 つの重要な違い

### 1. ループ条件の違い

```typescript
// 通常の二分探索
while (left <= right) {
  // left = right でも継続
  // right = mid だと範囲が狭まらない場合がある
}

// 境界探索
while (left < right) {
  // left = right で終了
  // left = right になれば自動的に終了
}
```

### 2. 範囲狭縮の保証

```typescript
function demonstrateRangeReduction() {
  console.log('境界探索の範囲狭縮:')

  // ケース1: arr[mid] < target の場合
  console.log('left = mid + 1 → leftが必ず増加')

  // ケース2: arr[mid] >= target の場合
  console.log('right = mid → rightが減少（または同じ）')

  console.log('')
  console.log('重要：midの計算方法')
  console.log('mid = Math.floor((left + right) / 2)')
  console.log('left < right なら mid < right')
  console.log('だから right = mid で必ず範囲が狭まる')
}
```

## 具体例での検証

```typescript
function verifyNoInfiniteLoop() {
  const arr = [1, 3, 5, 7, 9]
  const target = 6

  let left = 0,
    right = 5
  let iteration = 0

  while (left < right && iteration < 10) {
    // 安全装置
    iteration++
    const mid = Math.floor((left + right) / 2)

    console.log(`${iteration}回目: [${left}, ${right}), mid=${mid}`)

    if (arr[mid] < target) {
      left = mid + 1
      console.log(`  → left = ${left}`)
    } else {
      right = mid
      console.log(`  → right = ${right}`)
    }
  }

  console.log(`収束: left=${left}, right=${right}`)
  console.log(`反復回数: ${iteration}回`)
}
```

## まとめ

- **通常の二分探索**: `while (left <= right)` + `right = mid - 1` が必要
- **境界探索**: `while (left < right)` + `right = mid` でも安全

境界探索の**ループ条件の違い**と**mid の特性**により、無限ループが回避されているのです！
