/**
 * Statue of Chokudai 俯角計算問題
 * 観覧車から高橋直大像を見下ろす俯角を計算する
 * https://x.com/e869120/status/1384276005330690049
 */
export function solve (input: string) {
  const lines = input.trim().split('\n')
  const T = +lines[0] // 観覧車が一周するのにかかる時間
  const [L, X, Y] = lines[1].split(' ').map(Number) // L:観覧車の高さ, (X,Y):銅像の位置
  const Q = +lines[2] // クエリ数

  //円周率
  const PI = 3.14159265358979

  /**
   * 指定時刻での俯角を計算する関数
   * @param I 観覧車に乗ってからの経過時間
   * @returns 俯角（度数法）
   */
  function query (I: number): number {
    // === 観覧車の現在位置を計算 ===
    const cx = 0 // x座標は常に0（平面x=0上を動く）

    // y座標: 時刻Iでの観覧車のy位置（円運動の水平成分）
    const cy = -(L / 2.0) * Math.sin((I / T) * 2.0 * PI)

    // z座標: 時刻Iでの観覧車の高さ（円運動の垂直成分）
    // 最下点が0、最高点がLになるように調整
    const cz = L / 2.0 - (L / 2.0) * Math.cos((I / T) * 2.0 * PI)

    // === 距離計算 ===
    // d1: 観覧車から銅像への水平距離（3D空間でのxy平面上の距離）
    const d1 = Math.sqrt((cx - X) ** 2 + (cy - Y) ** 2)

    // d2: 観覧車と銅像の高さの差（銅像は地面にあるのでz=0）
    const d2 = cz

    // === 俯角計算 ===
    // atan2(高さの差, 水平距離) で俯角をラジアンで取得
    const kaku = Math.atan2(d2, d1)
    // ラジアンから度数法に変換して返す
    return (kaku * 180.0) / PI
  }

  // === メイン処理 ===
  const results: string[] = []

  for (let i = 0; i < Q; i++) {
    const E = +lines[3 + i] // 各クエリの時刻
    const angle = query(E)
    results.push(angle.toFixed(12)) // 12桁まで出力
  }

  console.log(results.join('\n'))
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `
4
2 1 1
4
0
1
2
3
`.trim()

  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  solve(testInput)
  // 期待値: 0.000000000000 24.094842552111 54.735610317245 45.000000000000
}
// ローカル実行環境
else if (require.main === module) {
  const fs = require('fs')
  const input = fs.readFileSync(0, 'utf8')
  solve(input)
}
