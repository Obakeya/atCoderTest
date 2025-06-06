## 導出の詳細な手順

### ステップ 1: 合同式の意味を確認

**bⱼ ≡ Sⱼ - Sⱼ₊₁ (mod 10)**

これは「bⱼ と Sⱼ - Sⱼ₊₁ を 10 で割った余りが等しい」ことを意味します。

### ステップ 2: 問題の制約を考慮

問題では **0 ≤ bⱼ ≤ 9** という制約があります。つまり、bⱼ は 0 から 9 までの値しか取れません。

### ステップ 3: 具体例で問題を理解

例えば、Sⱼ = 2, Sⱼ₊₁ = 7 の場合：

**Sⱼ - Sⱼ₊₁ = 2 - 7 = -5**

しかし、bⱼ は 0 以上でなければならないので、-5 では不適切です。

### ステップ 4: 合同な正の値を探す

-5 と合同で、かつ 0 ≤ bⱼ ≤ 9 の範囲にある値を探します：

- -5 ≡ ? (mod 10)

合同な値の一般形は：**-5 + 10k** (k は整数)

- k = 0: -5 (範囲外)
- k = 1: -5 + 10 = 5 (範囲内！)
- k = 2: -5 + 20 = 15 ≡ 5 (mod 10) (範囲外だが、mod 10 で 5)

### ステップ 5: 一般的な公式の導出

任意の整数に対して、0 ≤ x ≤ 9 の範囲での合同な代表元を求める方法：

**場合 1**: Sⱼ - Sⱼ₊₁ ≥ 0 の場合

- そのまま mod 10 を取る：(Sⱼ - Sⱼ₊₁) mod 10

**場合 2**: Sⱼ - Sⱼ₊₁ < 0 の場合

- 10 を足してから mod 10 を取る：(Sⱼ - Sⱼ₊₁ + 10) mod 10

### ステップ 6: 統一公式の完成

両方の場合を統一するために：

**(10 + Sⱼ - Sⱼ₊₁) mod 10**

#### 検証 1: Sⱼ - Sⱼ₊₁ ≥ 0 の場合

例：Sⱼ = 7, Sⱼ₊₁ = 3 → Sⱼ - Sⱼ₊₁ = 4

(10 + 4) mod 10 = 14 mod 10 = 4 ✓

#### 検証 2: Sⱼ - Sⱼ₊₁ < 0 の場合

例：Sⱼ = 2, Sⱼ₊₁ = 7 → Sⱼ - Sⱼ₊₁ = -5

(10 + (-5)) mod 10 = 5 mod 10 = 5 ✓

### ステップ 7: 数学的な正当性

この変換が正しい理由：

1. **10 ≡ 0 (mod 10)** なので、10 を足しても合同関係は変わらない
2. 10 を足すことで、負の値も正の値に変換される
3. mod 10 により、0 ≤ bⱼ ≤ 9 の範囲に正規化される

## まとめ

**bⱼ ≡ Sⱼ - Sⱼ₊₁ (mod 10)** → **bⱼ = (10 + Sⱼ - Sⱼ₊₁) mod 10**

この変換は：

- 合同関係を保持したまま
- 負の値を正の値に変換し
- 指定された範囲 [0, 9] での代表元を求める

という 3 つの目的を同時に達成する数学的に正当な変換です。

## なぜ、合同式が等価式に変換できるのか？

## 合同式と等式の根本的違い

### 合同式の意味

**bⱼ ≡ Sⱼ - Sⱼ₊₁ (mod 10)**

これは「bⱼ の候補が無限にある」ことを意味します。

例：Sⱼ - Sⱼ₊₁ = -5 の場合
**bⱼ ≡ -5 (mod 10)**

bⱼ の候補：..., -25, -15, -5, 5, 15, 25, 35, ...
（すべて 10 で割った余りが 5（または-5 と合同））

### なぜ等式に変換できるのか？

**制約条件があるから**です！

問題では **0 ≤ bⱼ ≤ 9** という制約があります。

上記の無限の候補の中で、この範囲に入るのは **bⱼ = 5 のみ**です。

## 一般的な変換過程

### ステップ 1: 合同式から候補を特定

**bⱼ ≡ Sⱼ - Sⱼ₊₁ (mod 10)**

### ステップ 2: 制約範囲での唯一解を求める

0 ≤ bⱼ ≤ 9 の範囲で、上記合同式を満たす値は **ただ一つ**

### ステップ 3: その唯一解の計算公式

**bⱼ = (10 + Sⱼ - Sⱼ₊₁) mod 10**

## 具体例での確認

**例 1**: Sⱼ - Sⱼ₊₁ = -7

- 合同式：bⱼ ≡ -7 (mod 10)
- 候補：..., -17, -7, 3, 13, 23, ...
- 制約 0 ≤ bⱼ ≤ 9 での解：**bⱼ = 3**
- 公式確認：(10 + (-7)) mod 10 = 3 ✓

**例 2**: Sⱼ - Sⱼ₊₁ = 4

- 合同式：bⱼ ≡ 4 (mod 10)
- 候補：..., -6, 4, 14, 24, ...
- 制約 0 ≤ bⱼ ≤ 9 での解：**bⱼ = 4**
- 公式確認：(10 + 4) mod 10 = 4 ✓

## 要点

**合同式 → 等式への変換は、制約条件によって唯一解に絞られるから可能**

制約がなければ、合同式は等式にはなりません。今回は問題の制約 0 ≤ bⱼ ≤ 9 があるからこそ、各合同類に対して唯一の代表元が決まり、等式として表現できるのです。

# 制約条件によって、唯一解に絞られる、とはどういうことか

## 「絞られる」の意味

### 例：bⱼ ≡ -5 (mod 10) の場合

#### ステップ 1: 合同式が表す「すべての解」

bⱼ ≡ -5 (mod 10) を満たす整数 bⱼ は**無限にあります**：

...、-25、-15、**-5**、**5**、15、25、35、...

これらすべてが 10 で割ると同じ余り（5）になります。

#### ステップ 2: 制約条件を適用

問題の制約：**0 ≤ bⱼ ≤ 9**

無限の候補を制約でフィルタリング：

| 候補  | 制約チェック  | 結果  |
| ----- | ------------- | ----- |
| -25   | 0 ≤ -25 ≤ 9   | ×     |
| -15   | 0 ≤ -15 ≤ 9   | ×     |
| -5    | 0 ≤ -5 ≤ 9    | ×     |
| **5** | **0 ≤ 5 ≤ 9** | **✓** |
| 15    | 0 ≤ 15 ≤ 9    | ×     |
| 25    | 0 ≤ 25 ≤ 9    | ×     |

#### ステップ 3: 唯一解の確定

制約を満たす解は **bⱼ = 5 のみ**

## もう一つの例：bⱼ ≡ 4 (mod 10) の場合

#### すべての解

...、-16、-6、**4**、14、24、...

#### 制約適用後

| 候補  | 制約チェック  | 結果  |
| ----- | ------------- | ----- |
| -6    | 0 ≤ -6 ≤ 9    | ×     |
| **4** | **0 ≤ 4 ≤ 9** | **✓** |
| 14    | 0 ≤ 14 ≤ 9    | ×     |

唯一解：**bⱼ = 4**

## 「絞られる」メカニズム

### 制約なし（合同式のみ）

```
解の集合 = {無限の整数}
例：{..., -15, -5, 5, 15, 25, ...}
```

### 制約あり（0 ≤ bⱼ ≤ 9）

```
解の集合 = {制約を満たす1つの整数}
例：{5}
```

## なぜ必ず 1 つになるのか？

**0 から 9 までの 10 個の連続する整数の中で、同じ余りを持つものは必ず 1 つだけ**だからです。

mod 10 での余りは 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 の 10 種類しかなく、0≤bⱼ≤9 の範囲にはそれぞれ 1 つずつしか存在しません。

## まとめ

**「絞られる」= 無限の候補 → 制約により → ただ 1 つの解**

これにより、合同式（関係性）から等式（具体的な値）への変換が可能になるのです。
