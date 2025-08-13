## アルゴリズムメモ

- 境界制約最適化...変数の取りうる範 囲を求めて処理範囲を狭める
- 変数削減法...方程式を変形してループを減らす

### 二分探索

「ソート済み配列から目的の値を効率的に見つける」アルゴリズム
考え方：毎回探索範囲を半分に絞り込む。真ん中の値と比較して、目的の値がどちら側にあるかを判断し、該当しない半分を捨てる。

応用：「答えで二分探索」...答えの候補範囲で二分探索し、「その値が達成可能か？」を判定関数で確認する。判定可能なら上を、不可能なら下を探索。

```typescript
function binarySearch(arr:number[], target:number) : number{
    let left = - 0;
    let right = arr.length - 1;

    while (left <= right){
        const mid = Math.floor((left + right)/2)

        if(arr[mid] === target) return mid;
        else if (arr[mid] < target> left = mid + 1)
        else right = mid - 1;
    }
}

```

「最小値を最大化してください」という問題では二分探索が有効であることが多い。  
毎回探索範囲を半分にするので、計算量は O(logN) です。  
具体例
N = 1000 の配列での探索：

- 1 回目：1000 個 →500 個
- 2 回目：500 個 →250 個
- 3 回目：250 個 →125 個
  ... 最大 10 回程度で終了する。

数学的に表現すると、　 k 回で探索が終了するとき、 N/2^k = 1 (1 は探索範囲が 1 個になったら終了、という意味)
2^k = N
よって
k = log2(N)

#### 二分境界探索

「ソート済み配列で条件の境界位置を効率的に見つける」アルゴリズム
考え方：探索範囲を段階的に狭めて 1 点に収束させる。条件を満たす領域と満たさない領域の境界線を特定する。

**通常の二分探索との違い：**

- 目的：特定の値を見つける → 境界位置を見つける
- 終了：値が見つかった時点 → 範囲が 1 点に収束
- 更新：`right = mid - 1` → `right = mid`（境界候補を保持）
- 条件：`while (left <= right)` → `while (left < right)`

```typescript
// target未満の要素数を返す
function binarySearchLess(arr: number[], target: number): number {
  let left = 0
  let right = arr.length // 配列外も考慮

  while (left < right) {
    // 等号なしで1点収束
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] < target) {
      left = mid + 1
    } else {
      right = mid // 境界候補を保持
    }
  }
  return left // 境界位置=個数
}

// target超過の要素数を返す
function binarySearchGreater(arr: number[], target: number): number {
  let left = 0
  let right = arr.length

  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] <= target) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return arr.length - left // 配列長から引く
}
```

**主な応用：**

- 配列内で条件を満たす要素の個数を求める
- `A < B < C`の組み合わせ数（B を固定して境界探索）
- 範囲クエリの効率化

計算量は通常の二分探索と同じ O(log N)。
境界を「見つける」のではなく「作り出す」アルゴリズムとも言える。最終的に`left`が境界位置を表し、これを使って目的の個数や位置を計算する。

### imos 法

「区間に対する一律加算を高速化する」アルゴリズム  
考え方：差分配列を使って区間加算を O(1)で実行し、最後に累積和で元配列を復元する。「開始点で+1、終了点の次で-1」を記録し、後で累積和を取ることで区間加算の効果を得る。

imos 法では、最初から必要な範囲だけに + 1 をすることはしない。それだと、遅くなる。
区間が 1000 個あったら、1000 個のループを回す必要がある。

```typescript
function imosMethod(N: number, ranges: [number, number][]): number[] {
  // 差分配列（長さN+1で余裕を持たせる）
  const imos = new Array(N + 1).fill(0)

  // 各区間[L,R]に+1を加算
  for (const [L, R] of ranges) {
    imos[L] += 1 // 開始点で+1
    imos[R + 1] -= 1 // 終了点の次で-1
  }

  // 累積和で実際の値を復元
  for (let i = 1; i <= N; i++) {
    imos[i] += imos[i - 1]
  }

  return imos.slice(0, N) // 最初のN個が答え
}
```

愚直に区間加算すると O(NM)、imos 法なら O(N+M) に改善される。

### 累積和(Prefix Sum)

「区間の合計値を高速に求める」アルゴリズム
考え方：事前に「位置 0 から i 番目までの累計」をすべて計算しておく。任意の区間（1,r）の合計は
「prefixSum[r]- prefixSUm[l]」の引き算 1 回で求められる。

```typescript
function buildPrefixSum(S: string): number[] {
  const N = S.length
  const prefixSum = new Array(N + 1).fill(0) // N+1 サイズの配列

  let beforeChar = ''
  let nowCount = 0

  for (let i = 0; i < N; i++) {
    // 条件判定（例：AC パターンの検出）
    if (beforeChar === 'A' && S[i] === 'C') {
      nowCount += 1
    }

    prefixSum[i + 1] = nowCount // i+1番目に「0からi番目まで」の累計を保存
    beforeChar = S[i]
  }

  return prefixSum
}

// 区間[l,r)の AC 個数を O(1)で取得
function getCount(prefixSum: number[], l: number, r: number): number {
  return prefixSum[r] - prefixSum[l]
}
```

愚直な区間クエリだと O(Q\*N)、累積和なら前処理 O(N) + 各クエリ O(1)=O(N+Q)に改善される。

#### imos 法 の具体的なメカニズムの説明

利用例を用いて説明する例えば、問題
長さ 4 の配列で、区間[1,2]と区間[2,3]に+1 を加算したいとする。

```typescript
imosMethod(4, [
  [1, 2],
  [2, 3]
])
```

２～６行目：変化点を記録

```typescript
for (const [L, R] of ranges) {
  imos[L] += 1
  imos[R + 1] -= 1
}
```

具体的に、どういう値が設定されていくか。下記のような振る舞いになる。

1 回目のループ:[L,R]=[1,2]

```
imos[1] += 1 → imos = [0,1,0,0]
imos[3] -= 1 → imos = [0,1,1,-1,-1]
```

2 回目のループ：[L,R] = [2,3]

```
imos[2] +=1 → imos = [0,1,1,-1,0]
imos[4] -=1 → imos = [0,1,1,-1,-1]
```

8~10 行目：累積和で復元する

```typescript
for (let i = 1; i <= N; i++) {
  imos += imoos[i - 1]
}
```

「区間加算クエリが大量にある」「各位置の累積値を求めたい」問題でよく使用される。

### kadane（カダネ）法ー連続部分和の最大値を O（N）で求める

- 目的
  配列（数列）の中で「連続したひとかたまり」を選び、その合計が最大になる値（と区間）を一走査で得る。
- しくみ

1. `current`...「今伸ばしている区間の合計」
2. `best`...「これまでで最大だった合計」
   各要素`v`を読んだら

```typescript
function kadane(arr: number[]): number {
  let best = 0 //最大値
  let cur = 0 //伸ばし中の和
  for (const v of arr) {
    cur = Math.max(v, cur + v) // 続行 or 再スタート
    best = Math.max(best, cur) // 更新
  }
  return best
}
```

負の累積は即リセット、プラスの流れだけを伸ばすーーそれを左 →→ へ一度なめるだけ

- 計算量
  時間 O(N)/追加メモリ O(1)
- 使える場面
  「連続区間でスコア最大化」「利益最大の売買機関」「± で評価した文字列の最適かたまり」など。

### ランレングス圧縮（Run-Length Encoding:RLE）

連続する同一値を **(個数, 値)** のペアにまとめて列を表す圧縮法。

- メモリ削減：元の長さではなく「区間数」に比例したサイズで保持
- オンライン更新に強い：末尾への追加はペアを push するだけ、先頭からの削除も先頭ペアを「食べる」だけで O(1)
- 部分展開が容易：必要な要素数だけペアを分割して取り出せるため、大規模列でも高速に処理ができる

どんな問題で活躍するか

- 同値が大量に並ぶ列を順次更新する
- 同一文字が続く文字列処理
- ビット・符号列の圧縮処理
- 時間軸イベントの集約処理

コード例について

```typescript
/**
 * Run-Length Encoding (RLE) - 典型的実装
 *
 * 1) runLengthEncode: 連続する同一値を(count, value)のペア列に圧縮
 * 2) runLengthDecode: ペア列を展開して元の配列に戻す
 *
 * ジェネリック Tを使っているので数値・文字列どちらでも利用可
 *
 * */
export function runLengthEncode<T>(array: T[]): Array<[number, T]> {
  const result: Array<[number, t]> = []
  if (array.length === 0) return result

  let previous = array[0]
  let count = 1

  for (let i = 1; i < array.length; i++) {
    if (array[i] === perv) count++
    else {
      //値が切り替わるタイミングで、ペア配列にpush
      result.push([count, prev])
      prev = arr[i]
      count = 1 //違う値が見つかったら、countをもとに戻す
    }
  }
  result.push([count, previous])
  return result
}

/*　デコード */
export function runLengthDecode<T>(pairs: Array<[number, T]>): T[] {
  const result: T[] = []
  for (const [count, value]) of pairs) {
    for (let i =0; i < count; i++) result.push(value)
  }
return result
}
```

### アモチ化解析

重い操作と軽い操作をひとまとめにして、ならして、1 回平均のコストを測る手法。全体としての計算量を表現したいときに使ったりするワーｌ

ある配列を処理するときに、通常の処理の場合は簡単な O(1)で済むが、場合によっては少し重い処理になる。
