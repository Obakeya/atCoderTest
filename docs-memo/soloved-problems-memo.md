# 競技プログラミング典型 90

- 001 Yokan Party（★4）:二分探索法と貪欲法
- 002 Encyclopedia of ParentTheses（★3）:バックトラッキング
- 003 Longes Circular Road（★4）：円の直径の計算、DFS、隣接リスト
- 004 Cross Sum（★2）：前処理、累積和
- 007 Cp Classes（★3）:二分法探索法（与えられた値以上の最小の位置を返す）
- 008 AtCouter（★4）:動的計画法
- 010 Score Sum Queries（★2）：累積和、座標同士での引き算
- 012 Red Painting（★4）: UnionFind,2 次元 →1 次元変換
- 014 We Used to Singa a Song Together（★3）:ソートして貪欲法
- 016 Mininum Coins（★3）：式変形によりループを減らしして全探索。余りが 0→ 有効な組という判定
- 018 Statue of Chokudai（★3）：三角関数（円運動の公式、アークタンジェント（逆正接関数）、ピタゴラスの定理）
- 020 Log Inequality（★3）：小数点を避けて計算する、BigInt を用いる
- 022 Cubic Cake（★2）：最大公約数 → ユーグリッドの互除法、BigInt
- 024 Select+/-One（★2）：偶奇性（パリティ）を考える
- 026 Independent Set on a Tree（★4）：木 → 二部グラフかつ隣り合わない頂点 → 色塗りによるグループ分け。　隣り合わない N/2 個の頂点 → グループわけが必要。
- 027 Sign UP Requests（★2）：すでに扱ったデータかどうか、ハッシュを使って判定する
- 028 cluttered paper（★4）：領域加算は二次元いもす法。左 → 右、上 → 下への累積加算をする。累積和を-1 でストップする考え方
- 032 AtCoder Ekiden（★3）：順列生成、制約チェック、バックトラッキングの基本実装が行えるかどうか、全探索、隣接リスト
- 033 Not Too Bright（★2）：境界値用のロジックを用意する。
- 034 There are few types of elements（★4）:単調性を利用した尺とり法
- 038 Large LCM（★3）：オーバーフローを避けるために式変形して除算をする。最大公約数から最小公倍数を求める
- 042 Multiple of 9（★4）：DP を使って解く。数が 1 増えるごとの解がどう変化していくかに着目する

# AtCoder Beginer Contest

- 293

  - C - Make Takahashi Happy：後戻り方向のない移動なので DFS ではなく、バックトラッキング。二次元座標での x,y の取り違え注意

- 420
  - C - Sum of Min QUery：事前の和計算と差分計算
  - D - Toogle Maze：3 次元 BFS[状態,x,y]、2 次元グリッドでの A→B の最短距離を求める
- 421
  - C Alternated（交互の）：出現順序と目標位置のマッピング（A は A 同士の比較において相対的位置は変わらない）→A の位置のみに注目し、理想位置との現在位置の理想距離の累積和で考える（前の処理で A の位置がずれることは、相対的な位置が変わらない以上、六）
