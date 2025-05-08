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
