Claude Opus 4 の deep research 機能を使い、作成した学習ロードマップ

# 中級 業務 SaaS エンジニア向け転職技術面接対策 AtCoder 学習ロードマップ

## 概要と使い方

このロードマップは、中級 SaaS ソフトウェアエンジニアの転職技術面接対策として、AtCoder の ABC コンテスト（A・B・C・D 問題）を活用した体系的な学習プランです。実務での使用頻度と面接での重要度を考慮し、優先順位の高い順に構成しています。

**学習の進め方：**

- ✅ チェックボックスで進捗を管理
- 優先度の高い Phase から順に学習
- 各問題を解いた後、計算量とアプローチの説明ができるよう練習
- 同じトピック内では易しい問題から順番に挑戦

---

## Phase 1: 必須基礎編（最優先）

### 1. 計算量の理解

**なぜ最優先か:** SaaS 開発では大規模データを扱うため、アルゴリズムの効率性は最重要です。技術面接では必ず「なぜそのアルゴリズムを選んだか」を問われ、計算量で説明する能力が評価の基礎となります。

#### 学習問題

- [x] [ABC214 A - The Number of ABC Problems](https://atcoder.jp/contests/abc214/tasks/abc214_a) - O(1)の理解
- [ ] [ABC185 B - Smartphone Addiction](https://atcoder.jp/contests/abc185/tasks/abc185_b) - O(n)シミュレーション
- [ ] [ABC132 C - Divide the Problems](https://atcoder.jp/contests/abc132/tasks/abc132_c) - O(n log n)ソート
- [ ] [ABC146 C - Buy an Integer](https://atcoder.jp/contests/abc146/tasks/abc146_c) - O(log n)二分探索
- [ ] [ABC185 D - Stamp](https://atcoder.jp/contests/abc185/tasks/abc185_d) - 複数の計算量の組み合わせ

### 2. 配列とハッシュマップ

**なぜ最優先か:** 配列とハッシュマップは SaaS 開発で最も頻繁に使用するデータ構造です。キャッシュ、インデックス、データ検索など、実務のあらゆる場面で必要となります。

#### 学習問題

- [ ] [ABC288 A - Many A+B Problems](https://atcoder.jp/contests/abc288/tasks/abc288_a) - 配列の基本操作
- [ ] [ABC311 A - First ABC](https://atcoder.jp/contests/abc311/tasks/abc311_a) - ハッシュセットの活用
- [ ] [ABC187 C - 1-SAT](https://atcoder.jp/contests/abc187/tasks/abc187_c) - ハッシュマップの応用
- [ ] [ABC289 C - Coverage](https://atcoder.jp/contests/abc289/tasks/abc289_c) - セットの集合演算
- [ ] [ABC285 D - Change Usernames](https://atcoder.jp/contests/abc285/tasks/abc285_d) - ハッシュマップでのグラフ表現

### 3. ソートと探索

**なぜ最優先か:** データの並び替えと検索は SaaS 開発の基本操作です。ユーザーデータの表示、API レスポンスの最適化、ログ解析など、日常的に使用する技術です。

#### 学習問題

- [ ] [ABC132 B - Ordinary Number](https://atcoder.jp/contests/abc132/tasks/abc132_b) - ソートと線形探索
- [ ] [ABC191 B - Remove It](https://atcoder.jp/contests/abc191/tasks/abc191_b) - 条件付き要素探索
- [ ] [ABC077 C - Snuke Festival](https://atcoder.jp/contests/abc077/tasks/abc077_c) - ソート + 二分探索
- [ ] [ABC023 D - 射撃王](https://atcoder.jp/contests/abc023/tasks/abc023_d) - 答えで二分探索

---

## Phase 2: 実務重要編（高優先）

### 4. 文字列処理

**なぜ高優先か:** SaaS 開発では、ユーザー入力の処理、データのバリデーション、ログ解析など、文字列処理が頻繁に発生します。正規表現の基礎にもなる重要な技術です。

#### 学習問題

- [ ] [ABC289 A - Flip](https://atcoder.jp/contests/abc289/tasks/abc289_a) - 文字列の変換
- [ ] [ABC146 B - ROT N](https://atcoder.jp/contests/abc146/tasks/abc146_b) - 文字の変換操作
- [ ] [ABC237 C - Palindrome](https://atcoder.jp/contests/abc237/tasks/abc237_c) - 回文判定
- [ ] [ABC110 C - String Transformation](https://atcoder.jp/contests/abc110/tasks/abc110_c) - 文字列の写像

### 5. グラフ理論基礎（BFS/DFS）

**なぜ高優先か:** マイクロサービス間の依存関係、ユーザーの関係性、データフローの解析など、SaaS アーキテクチャでグラフ構造は頻出します。

#### 学習問題

- [ ] [ABC007 C - 幅優先探索](https://atcoder.jp/contests/abc007/tasks/abc007_3) - BFS の基本
- [ ] [ABC088 D - Grid Repainting](https://atcoder.jp/contests/abc088/tasks/abc088_d) - グリッド上の BFS
- [ ] [ABC138 D - Adjacency List](https://atcoder.jp/contests/abc138/tasks/abc138_d) - 木構造の DFS
- [ ] [ABC204 C - Tour](https://atcoder.jp/contests/abc204/tasks/abc204_c) - 到達可能性判定

### 6. 累積和とスライディングウィンドウ

**なぜ高優先か:** 時系列データの集計、パフォーマンスメトリクスの計算、ダッシュボードの実装など、SaaS のデータ分析機能で必須の技術です。

#### 学習問題

- [ ] [ABC037 C - Sum](https://atcoder.jp/contests/abc037/tasks/abc037_c) - 1 次元累積和
- [ ] [ABC172 C - Tsundoku](https://atcoder.jp/contests/abc172/tasks/abc172_c) - 累積和の活用
- [ ] [ABC125 C - GCD on Blackboard](https://atcoder.jp/contests/abc125/tasks/abc125_c) - 前後からの累積
- [ ] [ABC105 D - Candy Distribution](https://atcoder.jp/contests/abc105/tasks/abc105_d) - 累積和と mod

---

## Phase 3: 応用編（中優先）

### 7. 動的計画法（DP）

**なぜ中優先か:** 最適化問題の解法として重要ですが、SaaS 開発では限定的な場面で使用します。ただし、技術面接では論理的思考力を測る良い指標となるため出題頻度は高いです。

#### 学習問題

- [ ] [EDPC A - Frog 1](https://atcoder.jp/contests/dp/tasks/dp_a) - DP 入門
- [ ] [ABC129 C - Typical Stairs](https://atcoder.jp/contests/abc129/tasks/abc129_c) - 場合の数 DP
- [ ] [ABC099 C - Strange Bank](https://atcoder.jp/contests/abc099/tasks/abc099_c) - 最小回数 DP
- [ ] [EDPC D - Knapsack 1](https://atcoder.jp/contests/dp/tasks/dp_d) - ナップサック問題

### 8. グリーディ法

**なぜ中優先か:** リソース割り当て、スケジューリング、コスト最適化など、SaaS の実装で使用する場面があります。シンプルで実装しやすいアルゴリズムです。

#### 学習問題

- [ ] [ABC138 C - Alchemist](https://atcoder.jp/contests/abc138/tasks/abc138_c) - ソート + 貪欲
- [ ] [ABC072 C - Together](https://atcoder.jp/contests/abc072/tasks/abc072_c) - 頻度カウント
- [ ] [ABC121 C - Energy Drink Collector](https://atcoder.jp/contests/abc121/tasks/abc121_c) - コスト最適化
- [ ] [ABC085 C - Otoshidama](https://atcoder.jp/contests/abc085/tasks/abc085_c) - 全探索 + 貪欲

### 9. Union-Find

**なぜ中優先か:** データベースのトランザクション管理、ユーザーグループの管理、クラスタリングなど、特定の場面で有効な技術です。

#### 学習問題

- [ ] [Practice2 A - Disjoint Set Union](https://atcoder.jp/contests/practice2/tasks/practice2_a) - 基本実装
- [ ] [ABC177 D - Friends](https://atcoder.jp/contests/abc177/tasks/abc177_d) - グループ分け
- [ ] [ABC120 D - Decayed Bridges](https://atcoder.jp/contests/abc120/tasks/abc120_d) - 逆向き処理

---

## Phase 4: 発展編（低優先）

### 10. スタック・キュー・ヒープ

**なぜ低優先か:** 言語の標準ライブラリで提供されることが多く、実装の詳細を問われることは少ないです。ただし、使い方と適用場面の理解は必要です。

#### 学習問題

- [ ] [ABC389 C - Snake Queue](https://atcoder.jp/contests/abc389/tasks/abc389_c) - キューの基本
- [ ] [ABC141 D - Powerful Discount Tickets](https://atcoder.jp/contests/abc141/tasks/abc141_d) - ヒープの活用
- [ ] [ABC223 D - Restricted Permutation](https://atcoder.jp/contests/abc223/tasks/abc223_d) - 優先度付きキュー

### 11. 数学的手法

**なぜ低優先か:** SaaS 開発では特定の分野（暗号化、統計処理など）以外では使用頻度が低いです。ただし、問題解決能力の指標として面接で問われることがあります。

#### 学習問題

- [ ] [ABC145 C - Average Length](https://atcoder.jp/contests/abc145/tasks/abc145_c) - 期待値
- [ ] [ABC156 D - Bouquet](https://atcoder.jp/contests/abc156/tasks/abc156_d) - 組み合わせ論
- [ ] [ABC215 D - Coprime 2](https://atcoder.jp/contests/abc215/tasks/abc215_d) - 素因数分解

### 12. その他の実装テクニック

**なぜ低優先か:** 特殊なケースでの最適化技術であり、基本的な技術を習得後に学ぶべき内容です。

#### 学習問題

- [ ] [ABC091 C - 2D Plane 2N Points](https://atcoder.jp/contests/abc091/tasks/abc091_c) - マッチング
- [ ] [ABC116 C - Grand Garden](https://atcoder.jp/contests/abc116/tasks/abc116_c) - シミュレーション
- [ ] [ABC162 D - RGB Triplets](https://atcoder.jp/contests/abc162/tasks/abc162_d) - 全探索の最適化

---

## 学習のコツとポイント

### 効果的な学習方法

1. **優先順位に従った学習**: Phase 1 から順に、実務で使用頻度の高い技術から習得
2. **計算量の意識**: すべての問題で時間・空間計算量を明確に説明できるよう練習
3. **実装の標準化**: 同じデータ構造・アルゴリズムは毎回同じ実装パターンで書く
4. **実務との関連付け**: 各技術が SaaS 開発のどの場面で使われるか意識する

### 面接対策の重要ポイント

- **計算量の説明**: 必ず時間計算量と空間計算量の両方を説明
- **トレードオフの議論**: 複数の解法がある場合、それぞれの長所短所を説明
- **実装の改善**: 最初の実装後、より効率的な方法がないか検討
- **エラーハンドリング**: 境界値や異常系の考慮
