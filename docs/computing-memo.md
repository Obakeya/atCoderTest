## 浮動小数点数とは

浮動小数点数は、コンピューターが限られたメモリで実数を**近似的に**表現する仕組みです。科学記数法（1.23×10^4）のように、符号・指数・仮数の 3 つの部分で数値を構成し、非常に大きな数から小さな数まで幅広く扱えます。

ただし、コンピューターは内部で 2 進数を使うため、10 進数の 0.1 や 0.3 などは正確に表現できず、微小な誤差が発生します。この誤差により、`0.1 + 0.2 === 0.3`が`false`になるような現象が起きます。

つまり浮動小数点数は「便利だが完璧ではない実数の近似表現」であり、金融計算など精度が重要な場面では整数ベースの計算や専用ライブラリの使用が推奨されます。

##　桁数が大きい数字の計算方法

桁数が大きい数字の計算方法  
JavaScript の number 型は、15 桁（正確には 15-17 桁）を超える整数で精度が失われるという重要な制約があります。これは Number.MAX_SAFE_INTEGER（2^53 - 1 = 9,007,199,254,740,991）を超える数値で発生し、競技プログラミングや金融システムでは致命的な問題となります。

代わりに`BigInt`を利用しましょう。

## なぜメモリ使用量を減らすことが重要か

結論、パフォーマンスを上げるため。

1. ガベージコレクションへの直接的影響
   現代のオブジェクト指向言語の多くはガベージコレクションを採用していますが、メモリ使用量が GC の頻度と停止時間に直結します。メモリを大量消費すると、GC が頻繁に発生し、アプリケーションの応答性が著しく悪化します。
2. キャッシュヒット率の決定的影響
   メモリ使用量が増加すると、必要なデータが CPU キャッシュに収まらなくなり、キャッシュミス率が急激に上昇します。その結果、同じアルゴリズムでも実行時間が数倍から数十倍に増加し、システム全体のスループットが劇的に低下します。
3. オブジェクト間参照によるメモリ断片化による、ヒット率の低下
   オブジェクト指向設計では、オブジェクト間の関連により間接的なメモリアクセスが多発します。これらのオブジェクトはヒープ上に散在するため、関連するデータが物理的に離れた場所に配置され、メモリの断片化が進行します。メモリ使用量が多いほど、この断片化は深刻化します。

補足

### 「必要なデータが CPU キャッシュに収まらなくなる」とは？

CPU キャッシュは容量が限られています（L1: 32KB、L2: 256KB、L3: 8MB 程度）。メモリ使用量が多いと、頻繁に使用するデータがキャッシュから追い出され、300 倍遅いメインメモリへのアクセスが必要になります。キャッシュは「最近使ったデータを保持する場所」なので、データ量が多いほど「最近使ったデータ」がキャッシュに残らなくなります。

### メモリ断片化についてキャッシュ効率が悪くなるとは

断片化により関連するデータが物理的に離れた場所に配置されます。CPU は 64 バイト単位でデータを読み込むため、関連データが近くにないと複数回のメモリアクセスが必要となり、キャッシュ効率が悪化します。また、大きな連続領域が確保できないため、メモリ不足エラーが発生しやすくなります。

### スタックは使いまくっていいのか？

スタックは GC の対象外で高速ですが、容量が極めて限られています（通常 1-8MB）。大量のデータや深い再帰処理ではスタックオーバーフローが発生します。また、スコープを出ると自動的にデータが消えるため、長期間保持したいデータには使えません。適材適所での使い分けが重要です。
