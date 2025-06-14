Claude4 sonnet、Opus を作って作成。比較的業務に近い概念について学べる問題をピックアップ。

# 中級業務 SaaS エンジニア向け AtCoder 学習ロードマップ 2025

## 概要と使い方

このロードマップは、中級 SaaS ソフトウェアエンジニアの転職技術面接対策として、AtCoder を活用した**実務重視**の学習プランです。総問題数 42 問に絞り込み、SaaS 開発で本当に使用する技術に特化しています。

**学習の進め方：**

- ✅ チェックボックスで進捗を管理
- 優先度の高い Phase から順に学習
- 各問題を解いた後、計算量とアプローチの説明ができるよう練習
- 実務での活用場面を意識した学習

---

## Phase 1: 必須基礎編（最優先）

### 1. 基本的な配列とループ処理

**なぜ最優先か:** SaaS 開発での条件分岐、基本的な論理演算、ビジネスロジック実装の基礎となります。API の条件分岐処理や機能フラグ制御など、日常的に使用する技術です。

#### 学習問題

- [x] [ABC214 A - Bitwise Exclusive Or](https://atcoder.jp/contests/abc214/tasks/abc214_a) - 基本的な条件分岐
- [x] [ABC086 A - Product](https://atcoder.jp/contests/abc086/tasks/abc086_a) - 剰余計算
- [x] [ABC081 A - Placing Marbles](https://atcoder.jp/contests/abc081/tasks/abc081_a) - 文字列処理、カウント

### 2. 配列とハッシュマップ

**なぜ最優先か:** 重複除去、ユニークユーザー数の計算、キャッシュ処理など、SaaS 開発で最も頻繁に使用するデータ構造です。

#### 学習問題

- [x] [ABC085 B - Kagami Mochi](https://atcoder.jp/contests/abc085/tasks/abc085_b) - Set、重複除去
- [x] [ABC087 B - Coins](https://atcoder.jp/contests/abc087/tasks/abc087_b) - 全探索、組み合わせ
- [x] [ABC083 B - Some Sums](https://atcoder.jp/contests/abc083/tasks/abc083_b) - 各桁処理

### 3. ソートと探索

**なぜ最優先か:** データの並び替えと検索は SaaS 開発の基本操作です。ユーザーデータの表示、API レスポンスの最適化、ログ解析など、日常的に使用する技術です。

#### 学習問題

- [x] [ABC088 B - Card Game for Two](https://atcoder.jp/contests/abc088/tasks/abc088_b) - ソート、グリーディ法
- [x] [ABC086 C - Traveling](https://atcoder.jp/contests/abc086/tasks/abc086_c) - 制約条件分析
- [x] [ABC061 C - Big Array](https://atcoder.jp/contests/abc061/tasks/abc061_c) - ソートと貪欲法での探索

---

## Phase 2: 実務重要編（高優先）

### 4. 文字列処理

**なぜ高優先か:** 入力値検証、データバリデーション、ログ解析など、SaaS 開発で頻繁に発生する文字列処理の基礎技術です。

#### 学習問題

- [x] [ABC122 B - ATCoder](https://atcoder.jp/contests/abc122/tasks/abc122_b) - 文字列検証
- [x] [ABC158 C - Tax Increase](https://atcoder.jp/contests/abc158/tasks/abc158_c) - 全探索、逆算
- [x] [ABC076 C - Dubious Document](https://atcoder.jp/contests/abc076/tasks/abc076_c) - パターンマッチング

### 5. BFS/DFS の基礎

**なぜ高優先か:** マイクロサービス間の依存関係、組織階層の処理、ナビゲーションシステムなど、SaaS アーキテクチャでグラフ構造は重要です。

#### 学習問題

- [ ] [ABC007 C - Breadth-First Search](https://atcoder.jp/contests/abc007/tasks/abc007_c) - BFS 実装、最短経路
- [ ] [ABC138 D - Ki](https://atcoder.jp/contests/abc138/tasks/abc138_d) - ツリー探索、DFS
- [ ] [ABC168 D - .. (Double Dots)](https://atcoder.jp/contests/abc168/tasks/abc168_d) - BFS、親子関係

### 6. 累積和とスライディングウィンドウ

**なぜ高優先か:** 時系列データの集計、パフォーマンスメトリクスの計算、ダッシュボードの実装など、SaaS のデータ分析機能で必須の技術です。

#### 学習問題

- [ ] [ABC127 C - Prison](https://atcoder.jp/contests/abc127/tasks/abc127_c) - 区間処理
- [ ] [ABC098 C - Attention](https://atcoder.jp/contests/abc098/tasks/abc098_c) - 累積和
- [ ] [ABC130 D - Enough Array](https://atcoder.jp/contests/abc130/tasks/abc130_d) - スライディングウィンドウ

### 7. 二分探索

**なぜ高優先か:** 大量データでの効率的な検索、価格設定最適化、在庫管理など、SaaS の性能最適化で必須の技術です。

#### 学習問題

- [x] [ABC077 C - Snuke Festival](https://atcoder.jp/contests/abc077/tasks/abc077_c) - 二分探索の応用
- [ ] [ABC146 C - Buy an Integer](https://atcoder.jp/contests/abc146/tasks/abc146_c) - 答えで二分探索
- [ ] [ABC023 D - 射撃王](https://atcoder.jp/contests/abc023/tasks/abc023_d) - 二分探索の実践

---

## Phase 3: 応用編（中優先）

### 8. 基本的なデータ構造

**なぜ中優先か:** スタック、キュー、ヒープは言語標準ライブラリで提供されることが多いですが、使い方と適用場面の理解は必要です。

#### 学習問題

- [ ] [ABC141 D - Powerful Discount Tickets](https://atcoder.jp/contests/abc141/tasks/abc141_d) - ヒープ（Priority Queue）
- [ ] [ABC128 C - Switches](https://atcoder.jp/contests/abc128/tasks/abc128_c) - ビット演算、全列挙

### 9. 動的計画法の基礎

**なぜ中優先か:** 最適化問題の解法として重要ですが、SaaS 開発では限定的な場面で使用します。ただし、技術面接では論理的思考力を測る良い指標となるため出題頻度は高いです。

#### 学習問題

- [ ] [ABC040 C - Pillars](https://atcoder.jp/contests/abc040/tasks/abc040_c) - 基本 DP
- [ ] [ABC129 C - Typical Stairs](https://atcoder.jp/contests/abc129/tasks/abc129_c) - 制約付き DP
- [ ] [ABC099 C - Strange Bank](https://atcoder.jp/contests/abc099/tasks/abc099_c) - 最小回数 DP

### 10. グリーディ法

**なぜ中優先か:** リソース割り当て、スケジューリング、コスト最適化など、SaaS の実装で使用する場面があります。シンプルで実装しやすいアルゴリズムです。

#### 学習問題

- [ ] [ABC131 D - Megalomania](https://atcoder.jp/contests/abc131/tasks/abc131_d) - スケジューリング
- [ ] [ABC134 C - Exception Handling](https://atcoder.jp/contests/abc134/tasks/abc134_c) - 最大値除外
- [x] [ABC095 C - Half and Half](https://atcoder.jp/contests/abc095/tasks/abc095_c) - 料金最適化

---

## Phase 4: 発展編（低優先）

### 11. 組み合わせとカウント

**なぜ低優先か:** A/B テスト分析、統計処理で使用しますが、高度な数学知識は実務では限定的です。基本的なパターンのみ学習します。

#### 学習問題

- [ ] [ABC145 C - Average Length](https://atcoder.jp/contests/abc145/tasks/abc145_c) - 順列、期待値
- [ ] [ABC150 C - Count Order](https://atcoder.jp/contests/abc150/tasks/abc150_c) - 順列の順序
- [ ] [ABC132 D - Blue and Red Balls](https://atcoder.jp/contests/abc132/tasks/abc132_d) - 組み合わせ論

### 12. 実装テクニック

**なぜ低優先か:** 特殊なケースでの最適化技術であり、基本的な技術を習得後に学ぶべき内容です。面接での差別化要素となります。

#### 学習問題

- [ ] [ABC155 D - Pairs](https://atcoder.jp/contests/abc155/tasks/abc155_d) - 大量データでの二分探索
- [ ] [ABC139 C - Lower](https://atcoder.jp/contests/abc139/tasks/abc139_c) - 連続データ解析
- [ ] [ABC124 C - Coloring Colorfully](https://atcoder.jp/contests/abc124/tasks/abc124_c) - パターン最適化

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
