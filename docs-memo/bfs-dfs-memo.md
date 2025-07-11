## BFS/DFS とは：

- **BFS (Breadth-First Search)**: **幅優先探索**

  - グラフや木構造を**幅（横）方向**に探索するアルゴリズム
  - キュー（queue）を使って実装
  - 最短経路を求めるのに適している

- **DFS (Depth-First Search)**: **深さ優先探索**
  - グラフや木構造を**深さ（縦）方向**に探索するアルゴリズム
  - スタック（stack）や再帰関数で実装
  - 連結成分を調べるのに適している

## 具体例

```
    1
   / \
  2   3
 /   / \
4   5   6
```

- **DFS**: 1→2→4→3→5→6 (深く潜ってから隣へ)
- **BFS**: 1→2→3→4→5→6 (同じ深さを全部見てから次の深さへ)

競技プログラミングでは、グラフ問題の基本アルゴリズムとして必須の知識です。

## **Breadth**とは

**Breadth**とは「**幅**」「**広がり**」という意味の英単語です。

#### 基本的な意味

- **幅**: 物理的な横の長さ
- **広がり**: 範囲の広さ、多様性

#### BFS（Breadth-First Search）での意味

「幅優先探索」の「幅」は、**同じ階層・レベルの要素を横方向に広く探索する**ことを表しています。

#### 視覚的なイメージ

```
レベル0:     A          ← まずここから開始
            / \
レベル1:   B   C        ← 次にこのレベル全体を探索
          /|   |\
レベル2: D E   F G      ← その次にこのレベル全体を探索
```

**BFS（幅優先）**: A → B,C → D,E,F,G（横に広く）
**DFS（深さ優先）**: A → B → D → E → C → F → G（縦に深く）

#### 他の使用例

- **breadth of knowledge**: 知識の幅広さ
- **breadth of experience**: 経験の豊富さ

つまり「Breadth-First」は「幅を最初に、広がりを優先して」という意味になります。

## プログラミングにおける距離とは

「距離」とは、**ある地点から別の地点まで何歩で行けるか**という概念です。

## 身近な例で理解

### 1. 電車の駅

```
新宿 ー 渋谷 ー 品川 ー 田町 ー 浜松町
```

- 新宿 → 渋谷：距離 1（1 駅）
- 新宿 → 品川：距離 2（2 駅）
- 新宿 → 浜松町：距離 4（4 駅）

### 2. SNS の友達関係

```
あなた → 友達A → 友達Aの友達B → 友達Bの友達C
```

- あなた → 友達 A：距離 1
- あなた → 友達 B：距離 2（友達の友達）
- あなた → 友達 C：距離 3（友達の友達の友達）

### プログラミングでの「距離」

#### グラフでの距離

```cpp
// 例：友達関係のグラフ
// 人物を番号で表現：0=あなた, 1=友達A, 2=友達B, 3=友達C
vector<vector<int>> friends = {
    {1},        // 0(あなた) → 1(友達A)
    {0, 2},     // 1(友達A) → 0(あなた), 2(友達B)
    {1, 3},     // 2(友達B) → 1(友達A), 3(友達C)
    {2}         // 3(友達C) → 2(友達B)
};
```

#### 二次元グリッドでの距離

```
S . . G
. # . .
. . . .
```

- S（スタート）から G（ゴール）まで
- 「.」は通れる、「#」は壁
- 上下左右に 1 マスずつ移動可能
- 最短距離は？ → **5 歩**

```cpp
// 移動の例
int dx[] = {0, 0, 1, -1};  // 右、左、下、上
int dy[] = {1, -1, 0, 0};

// 現在位置(x,y)から隣接する4方向への距離は全て1
```

### まとめ

- **距離** = 最小限の移動回数・ステップ数
- **BFS** = 近い場所から順番に探索するので距離を正確に測れる
- **-1 や大きな値** = 「行けない」「まだ行ったことがない」を表現
- **実際の問題** = 迷路、友達関係、ネットワーク、ゲームのレベルなど

「何歩で行けるか？」を考えるときは、まず BFS を思い出してください！

# Graph と Vector の意味

## Graph（グラフ）

**Graph** は「点と線で関係を表現したもの」です。

**身近な例**:

- 駅と路線図：駅が「点」、線路が「線」
- SNS の友達関係：人が「点」、友達関係が「線」
- 家系図：人が「点」、親子関係が「線」

**プログラミングでの意味**:
数学のグラフ理論から来ており、「頂点（vertex）」と「辺（edge）」で構成される構造のことです。BFS/DFS で探索する対象がまさにこのグラフです。

「グラフを探索する」= 点から点へ線を辿って移動しながら調べること

## Vector（ベクター）

**Vector** は「複数の要素を順番に並べて格納できる箱」です。配列と理解していいかも。

**身近な例**:

- 本棚：本を順番に並べて保管
- 電車の車両：乗客を順番に座らせる
- 買い物リスト：商品を順番に書き出す

## BFS/DFS コードでの登場

**Graph**:

```
vector<vector<int>> graph
```

これは「グラフを表現するために、vector を使って隣接リストを作っている」という意味です。

**Vector**:

```
vector<bool> visited
```

これは「各頂点を訪問したかどうかを記録する配列」として使っています。

## 日本語での理解

- **Graph** = 関係図、ネットワーク図
- **Vector** = 動的配列、リスト

どちらもプログラミングでデータを整理・管理するための基本的な道具として使われています。

# BFS/DFS 典型コードの構造解説

### 前提：何を解決したいのか？

「つながりのあるもの同士を、効率的に探索したい」

例：友達関係で「A さんから B さんに辿り着けるか？」

## 1. まず必要な材料を考える

### 探索に必要な情報

1. **どこを調べるか**：グラフ（つながりの情報）
2. **どこから始めるか**：開始地点
3. **どこを調べ済みか**：訪問済み記録
4. **次にどこを調べるか**：待ちリスト

これらが揃わないと、探索できません。

## 2. DFS（深さ優先探索）の構造

### 基本的な考え方

「一本道を突き進み、行き止まったら戻る」

```typescript
function dfs(graph: number[][], start: number): void {
  const visited: boolean[] = new Array(graph.length).fill(false)

  function explore(current: number): void {
    visited[current] = true // ここに来たことを記録

    for (const neighbor of graph[current]) {
      if (!visited[neighbor]) {
        explore(neighbor) // 隣の場所を探索
      }
    }
  }

  explore(start)
}
```

### なぜこの構造？

#### ステップ 1：なぜ `visited` 配列が必要？

**問題**: 同じ場所を何度も訪問してしまう

例：A→B→A→B→A... 無限ループ

**解決**: 「ここは調べた」という記録を残す

```typescript
const visited: boolean[] = new Array(graph.length).fill(false)
// 最初は全部false（未訪問）
```

#### ステップ 2：なぜ再帰関数？

**DFS の本質**: 「行き止まったら元の場所に戻る」

再帰関数は**自動的に元の場所に戻ってくれる**仕組み：

```
explore(A)
  → explore(B)
    → explore(C) ← 行き止まり
  ← Bに自動で戻る
  → explore(D)
← Aに自動で戻る
```

#### ステップ 3：なぜ `for` ループ？

一つの場所から**複数の道**がある場合、全部試す必要があります：

```typescript
for (const neighbor of graph[current]) {
  // currentから行ける場所を一つずつ試す
}
```

#### ステップ 4：なぜ `if (!visited[neighbor])`？

**既に調べた場所は調べない**ため：

```typescript
if (!visited[neighbor]) {
  explore(neighbor) // 未訪問なら探索
}
// 訪問済みならスキップ
```

## 3. BFS（幅優先探索）の構造

### 基本的な考え方

「波紋のように同心円状に広がる」

```typescript
function bfs(graph: number[][], start: number): void {
  const visited: boolean[] = new Array(graph.length).fill(false)
  const queue: number[] = []

  queue.push(start)
  visited[start] = true

  while (queue.length > 0) {
    const current = queue.shift()!

    for (const neighbor of graph[current]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true
        queue.push(neighbor)
      }
    }
  }
}
```

### なぜこの構造？

#### ステップ 1：なぜキュー（queue）？

**BFS の本質**: 「近い場所から順番に調べる」

キューは**先入先出**なので、先に見つけた場所から順番に処理されます：

```
距離1の場所をキューに追加 → [B, C]
距離2の場所をキューに追加 → [C, D, E]  （Bを処理してD,Eを追加）
```

#### ステップ 2：なぜ DFS と違って再帰じゃない？

**BFS**は「同じ距離のものを一度に処理」したいため、**順番を制御**する必要があります。

再帰だと順番を制御できないので、**明示的にキューで管理**します。

#### ステップ 3：なぜ最初にキューに入れる？

```typescript
queue.push(start)
visited[start] = true
```

**開始地点を処理対象に登録**するため。
「距離 0 の場所」として最初にキューに入れます。

#### ステップ 4：なぜ `while` ループ？

**調べる場所がなくなるまで**続ける必要があります：

```typescript
while (queue.length > 0) {
  // キューが空になるまで＝調べる場所がなくなるまで
}
```

## 4. なぜ graph は `number[][]` 型？

### グラフの表現方法

**隣接リスト**という形でつながりを表現：

```typescript
// 例：0→1, 0→2, 1→3 のつながり
const graph: number[][] = [
  [1, 2], // 0番から行ける場所：1と2
  [3], // 1番から行ける場所：3
  [], // 2番から行ける場所：なし
  [] // 3番から行ける場所：なし
]
```

### なぜこの形？

1. **効率的**: つながりのある場所だけ記録
2. **自然**: 「A から行ける場所のリスト」という考え方
3. **処理しやすい**: `for` ループで簡単に隣接する場所を調べられる

## 5. まとめ：なぜこの構造が生まれたか

### DFS

- **再帰**: 「戻る」動作を自動化
- **visited 配列**: 無限ループ防止
- **for ループ**: 複数の道を全部試す

### BFS

- **キュー**: 「近い順」を保証
- **while ループ**: すべての場所を調べ尽くす
- **visited 配列**: 重複防止と効率化

どちらも**「つながりを効率的に辿る」**という同じ目的のために、**それぞれの特性に最適化された構造**になっています。
