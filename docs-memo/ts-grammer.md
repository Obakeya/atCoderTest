# 数学系演算

### 複数の数値の最も小さい値または最も大きい値を求めたいとき

```typescript
const a = 10,
  b = 5
const smaller = Math.min(a, b) // 5

// 2 つ以上の値でも同じ文法
console.log(Math.min(10, 5, 8, 3)) // 3

// 配列の場合はスプレッド演算子
const numbers = [10, 5, 8, 3]
console.log(Math.min(...numbers)) // 3
```

### 余りを求めたいときはモジュロ演算子を使う

モジュロ演算子(%)は、割り算の余りを求める演算子。

```typescript
10 % 3 //結果は1になる
15 % 5 //結果は0になる
7 % 2 //結果は1になる
```

モジュロ(modulo)は数学用語で、割り算の余りを求める演算を意味します。「法」とも呼ばれる。
ラテン語の「modulus(尺 t 度、基準)」に由来している。数学的には「mod」と略されることもあり、「n modulo m」または「n mod m」と表記され、「n を m で割った余り」を意味する。

計算量が多い場合は、ビット演算を利用したほうがパフォーマンスは良くなる。

### マンハッタン距離を求めたいときは`Math.abs()`を使う

絶対値を求める時に活躍します

```typescript
Math.abs(5) //5
Math.abs(-5) //5
Math.abs(x - xi)
```

### 小数点処理の文法について

```typescript
Math.floor(value) //切り捨て

Math.ceil(value) //切り上げ

Math.round(value) //四捨五入
```

### ある小数点を含む可能性がある数字を整数かどうか検証する

```typescript
Number.isInteger(value) //整数ならtrueを返す。 //ES6以降で使える
```

上記が使えない場合、

```typescript
value % 1 === 0 //整数ならtrue
```

### 数字の配列を降順にソートする方法

配列サイズが小さい（N<10^4）の時

比較ベースのソートを行う。
計算量 O ( n log n)

```typescript
nums.sort((a, b) => b - a)
```

配列サイズが大きいとき（N>10^5）のとき
カウンティングソートを検討する。  
カウンティングソートは、値の範囲が事前に分かっている必要がある。
計算量 O ( n + k) n...配列サイズ、k は値の範囲

### べき乗を求めたいときは`**`を使う

```typescript
// 基本的な使い方
console.log(2 ** 3) // 8 (2 の 3 乗)
console.log(5 ** 2) // 25 (5 の 2 乗)
console.log(10 \*\* 4) // 10000 (10 の 4 乗)
```

### 大きな桁の数値の計算を行う

JavaScript の Number 型は 2⁵³-1 (約 9×10¹⁵) までしか正確に表現できない。
競技プログラミングでは答えが 10¹⁸ を超える場合があるため、BigInt を使用する。

```typescript
// 基本的な使い方
let bigNumber = 0n // BigInt リテラル（末尾にn）
let converted = BigInt(123) // Number からの変換

// 四則演算
let result = 123n + 456n // 579n
let product = 999999999999999999n * 888888888888888888n
```

**型の注意点：number と bigint は混在できない**

```typescript
let sum = 0n // BigInt
let nums = [1, 2, 3] // number[]

// ❌ エラー：型が合わない
answer += sum * nums[i]

// ✅ 正しい：BigInt に変換
answer += sum * BigInt(nums[i])
```

**AtCoder での典型的な使用例**

```typescript
// 累積和やDPで答えが大きくなる問題
let answer = 0n
let sum = 0n

for (let i = 0; i < n; i++) {
  answer += sum * BigInt(nums[i])
  sum += BigInt(nums[i])
}

console.log(answer.toString()) // 出力時は文字列化
```

計算量が多い場合でも、BigInt の演算速度は実用的なレベル。

```

```

# 文字列系操作

## 文字列型への操作

### 文字列から特定の文字のカウントをする

```typescript
function countOnes(str: string): number {
  let count = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '1') {
      count++
    }
  }
  return count
}
```

小さな文字列では、Split 法や正規表現でもパフォーマンスに大差はない。ループ法は、大量のデータを処理する場合や、何度も関数が呼ばれる場合に強い。

### 文字列から数値に変換する方法

```typescript
// 1. 単項プラス演算子（最も高速）
const num1 = +'123' // 123

// 2. Number 関数（ほぼ同等の速度）
const num2 = Number('123') // 123

// 3. parseInt 関数（やや遅い）
const num3 = parseInt('123', 10) // 123

// 4. parseFloat 関数（やや遅い）
const num4 = parseFloat('123.45') // 123.45
```

効率性の順位として、単項プラス演算子が、最も高速でコード量も最小。  
Number()関数は単項演算子とほぼ同じ速度  
parseInt()/parseFloat()-文字列を解析する文だけ遅い

競技プログラミングでよく使う使用例。

```typescript
// 空白区切りの数値配列への変換
const numbers = line.split(' ').map(s => +s) // 最も効率的

// または
const numbers2 = line.split(' ').map(Number) // 可読性が高く、ほぼ同等の効率性
```

### 文字列を、特定の文字列の出現位置の前後で分割したいとき

C#だと便利な記法がある。

```csharp
//最初の改行で分割され、残りの改行はそのまま保持される
string [] parts = input.Split(new[] {'\n'},2)

```

typescript だと、上記のような記法がない。

最初の改行までの文字列は無視して、残りの文字列を受け取りたいとき。

```typescript
const parts = input
  .trim()
  .split('\n')
  .slice(1)
  .map(x => +x)
```

### 文字列の一部分を取り出す一効率のいい方法

`slice()`メソッドを推奨する。パフォーマンスが良く、文字列の後ろから値を取ることも容易。

基本的な使い方

```typescript
const str = 'Hello, TypeScript!'

// 基本形： 開始位置から終了位置まで（終了位置の文字は含まない）
str.slice(0, 5) // 'Hello'

// 開始位置のみ指定： 開始位置から文字列の最後まで取得
str.slice(7) // TypeScript!

//全文字取得
str.slice() // 'Hello, TypeScript!'
str.slice(0) // 'Hello, TypeScript!'
```

負のインデックスの使用（末尾からカウント）

```typescript
cons str = 'Hello, TypeScript!'

// 末尾から数えて5文字目から末尾まで
str.slice(-5) // 'ript!'

// 末尾から数えて12文字目から、末尾から数えて7文字
str.slice(-12, -7) // ' TypeSc'

// 先頭から5文字目まで、末尾から数えて1文字目を除く
str.slice(0, -1) // 'Hello, TypeScript'

// 末尾の5文字を削除
str.slice(0,-5) // 'Hello, TypeSc'

```

## 数値型への操作

### 数字を桁ごとの数字に変換する

```typescript
const digits = Array.from(String(1234), Number)

const digits2 = Array.from('1234', Number)
```

### 数字を文字列に変える

```typescript
const str = num.toString()
```

# 配列系操作

## 配列のうち、ある位置から特定の位置までの値を取得したい場合

手法別のパフォーマンス特性

1.`slice()` を利用する...
新しい配列を作成するため、大きな配列では メモリコストが高くなります。

```typescript
const receipts = getReceiptList() // 10 万件の入金データ
const targetReceipts = receipts.slice(1000, 2000) // 新しい配列作成
```

## すべて 0 の値を持つ配列を指定のサイズで用意する

imos 法で利用する。Array(n).fill(0)を利用する

```typescript
const n = 5
const arr = Array(n).fill(0)
//Array(n)で空っぽの配列を作り、
//fill()で配列のすべてを指定した要素で埋める
```

2. インデックス直接参照...メモリの効率性重視

```typescript
const receipts = getReceiptList()
const startIndex = 1000
const endIndex = 2000

// 新しい配列を作らずに処理
for (let i = startIndex; i < endIndex; i++) {
  processReceipt(receipts[i]) // メモリコピーなし
}
```

3. サブアレイビュー...最高性能  
   通常の配列操作では「データのコピー」が発生するが、サブアレイビューは「参照とインデックス計算のみ」で動作するため、メモリ帯域幅と CPU 処理の両方で大幅な効率化を実現します。

```typescript
class ReceiptView {
  constructor(
    private receipts: Receipt[], // 参照のみ（8 バイト）
    private startIdx: number, // インデックス（4 バイト）
    private endIdx: number // インデックス（4 バイト）
  ) {} // 合計 16 バイトのメモリ使用量

  getReceipt(index: number): Receipt {
    // 単純な加算のみ（1CPU 命令）
    return this.receipts[this.startIdx + index]
  }

  processMatching(): void {
    // ループでもメモリコピーは発生しない
    for (let i = 0; i < this.length; i++) {
      const receipt = this.getReceipt(i) // 参照取得のみ
      // 入金消込処理
    }
  }
}

// 使用例：10 万件の配列から 1 万件を処理
const allReceipts = getReceiptList() // 仮に 400MB
const receiptView = new ReceiptView(allReceipts, 1000, 11000) // 16 バイト

// slice()なら 40MB の新しい配列作成が必要
// ビューなら 16 バイトで同等の操作が可能
```

文字列の配列を 1 つの文字列にする
文字列配列の結合において、パフォーマンス的に最も効率的なのは**Array.prototype.join()メソッド**です。
理由と最適化のポイント
join()メソッドが最高効率な理由：

ネイティブ実装: C++レベルで最適化されており、JavaScript ループより圧倒的に高速
メモリ効率: 結合前に必要なメモリサイズを事前計算し、一度に確保
中間オブジェクト不要: 文字列連結で発生する中間文字列オブジェクトを作らない

コード例

```typescript
// 基本的な結合
const receiptNumbers = ['RCP001', 'RCP002', 'RCP003']
const combined = receiptNumbers.join('') // "RCP001RCP002RCP003"

// 区切り文字付きの結合
const csvContent = receiptData.map(r => `${r.amount},${r.account}`).join('\n')
```

パフォーマンス比較（1000 要素での測定）

join(""): 最速（基準）
reduce((a,b) => a + b): 約 3-5 倍遅い
for ループでの+=: 約 5-10 倍遅い
concat()の連続使用: 約 10-20 倍遅い

## N 個の要素を持つ、連番の値となる配列を作成したい場合

```typescript
const numbers = Array.from({ length: 10 }, (\_, i) => i + 1);

// N = 5のとき、 array = [1, 2, 3 ,4, 5]
```

Array.from は「配列のようなオブジェクト」から実際の配列を作成するメソッドです。第二引数にマップ関数を渡すことで、作成と同時に各要素を変換できます。

第一引数：{ length: N } の意味
{ length: N } は「length プロパティを持つオブジェクト」です。JavaScript では、length プロパティがあれば配列のようなオブジェクト（Array-like）として扱えます。これにより、長さ N の空の配列スロットが作られます。

第二引数：マップ関数の動作
(\_, i) => i + 1 は各スロットに対して実行される関数です：

\_：現在の要素の値（今回は使わないのでアンダースコアで無視）
i：現在のインデックス（0 から始まる）
戻り値：i + 1（1 から始まる連番）

### Array-like オブジェクト

JavaScript では`length`プロパティを持つオブジェクトを「配列のようなオブジェクト」として扱えます。DOM 操作や一部のライブラリで頻繁に遭遇しますが、配列メソッドは直接使用できないため配列への変換が必要です。

**主な遭遇場面**

- DOM 要素の取得：`querySelectorAll()`、`getElementsByClassName()`
- 関数の引数：`arguments`オブジェクト（ES5 時代）
- 外部ライブラリ：jQuery オブジェクトなど

**配列への変換方法**

```typescript
// DOM要素の一括処理例
const buttons = document.querySelectorAll('.receipt-button') // NodeList（Array-like）

// 方法1：Array.from()
const buttonArray1 = Array.from(buttons)

// 方法2：スプレッド構文（モダン）
const buttonArray2 = [...buttons]

// 方法3：for...of（変換不要）
for (const button of buttons) {
  button.addEventListener('click', handleReceiptClick)
}

// 配列メソッドを使用したい場合
;[...buttons]
  .filter(btn => !btn.disabled)
  .forEach(btn => btn.classList.add('processed'))
```

# キー付きコレクション系操作

## 2 つの数字を使ってキーにしたこコレクションを利用したい場合

数値ハッシュを推奨する

```typescript
const visited = new Map<number, boolean>()

function hash(x: number, y: number): number {
  return x * 100000 + Y
}

//使用例：迷路探索
function dfs(x: number, y: number): void {
  const key = hash(x, y)
  if (visited.has(key)) return

  visited.set(key, true)
}
```

## すでにある値を変えたい場合、 map.set()を利用する

```typescript
const matchingMap = new Map<string, Matching>()

// 新規追加
const newMatching = new Matching(1001, 2001, 50000)
matchingMap.set('1001-2001', newMatching)

// 既存値の更新（同じ set メソッド）
const updatedMatching = new Matching(1001, 2001, 75000)
matchingMap.set('1001-2001', updatedMatching) // 値が置き換わる

// 値の累積更新
function addReceiptAmount(
  billingId: number,
  receiptId: number,
  amount: number
): void {
  const key = `${billingId}-${receiptId}`
  const existing = matchingMap.get(key)

  if (existing) {
    // 既存値更新
    existing.amount += amount
    matchingMap.set(key, existing)
  } else {
    // 新規追加
    const newMatching = new Matching(billingId, receiptId, amount)
    matchingMap.set(key, newMatching)
  }
}
```

## すでにあるキーを削除したい場合、 delete()を利用する

```typescript
const matchingMap = new Map<string, Matching>()

// 消込データの追加
matchingMap.set('1001-2001', new Matching(1001, 2001, 50000))
matchingMap.set('1002-2002', new Matching(1002, 2002, 75000))

// 特定の消込データを削除
const deleted = matchingMap.delete('1001-2001') // true（削除成功）
const notFound = matchingMap.delete('9999-9999') // false（存在しない）

// 削除後の状態確認
console.log(matchingMap.has('1001-2001')) // false
console.log(matchingMap.size) // 1
```
