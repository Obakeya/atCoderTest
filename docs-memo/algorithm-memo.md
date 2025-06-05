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
