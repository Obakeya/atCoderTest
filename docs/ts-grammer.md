### モジュロ演算子について

モジュロ演算子(%)は、割り算の余りを求める演算子。

```typescript
10 % 3 //結果は1になる
15 % 5 //結果は0になる
7 % 2 //結果は1になる
```

モジュロ(modulo)は数学用語で、割り算の余りを求める演算を意味します。「法」とも呼ばれる。
ラテン語の「modulus(尺 t 度、基準)」に由来している。数学的には「mod」と略されることもあり、「n modulo m」または「n mod m」と表記され、「n を m で割った余り」を意味する。

計算量が多い場合は、ビット演算を利用したほうがパフォーマンスは良くなる。

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

### 名づけ

競技プログラミング上では、単語の名づけは可能な限り、a,b,c のような、記入量が少なくすむ文字であるべきだが、一定なれるまでは、アルゴリズムを理解しながら解くために、意味のある名づけをする。

割り算のあまり..`remainder`
割り算..`division`

### 数字文字列を桁ごとの数字に変換する

```typescript
const digits = Array.from(String(1234), Number)

const digits2 = Array.from('1234', Number)
```

### 数字を文字列に変える

```typescript
const str = num.toString()
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

```typescript


### 計算量をイメージするために

https://www.bigocheatsheet.com/
オーダー記法ごとの計算量の増加がグラフ化されており、視覚的に分かりやすい。

Big-O...入力サイズに応じて実行時間や空間使用量がどれだけ増加するかを表す数学的な記法

Complexity...複雑性/計算量

「n log n」は「データ量(n)に対して、処理回数がn*log(n)回になる」という意味

「log」とは、「ある数を何回半分にすると1になるか」を表す：
- log₂(8)= 3 → 8 を3回半分にすると1になる（8→4→2→1）

ある処理の計算量が n log n だとします。この時、「n 個のデータを処理する際に、各データに対して、約log(n)回の操作が比兆」と考えれる。
例えば、マージソートでは：
1. データを繰り返し半分に分割（log n回の分割ステップ）
2. 各ステップで全データ(n)を処理

--
となります。多くのソートアルゴリズムにlog n が現れるのは、データを分割して処理する、という方法に由来します。
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

### ある数字を整数かどうか検証する

```typescript
Number.isInteger(value) //整数ならtrueを返す。 //ES6以降で使える
```

上記が使えない場合、

```typescript
value % 1 === 0 //整数ならtrue
```

### 小数点以下を切り捨てる

```typescript
Math.floor(value)
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

### マンハッタン距離を求める時

絶対値を求める時に活躍します

```typescript
Math.abs(5) //5
Math.abs(-5) //5
Math.abs(x - xi)
```

### 四捨五入をしたいとき

`Math.round()`を使おう

```typescript
const [A, B] = input.trim().split(' ').map(Number)
return Math.round(A / B).toString()
```
