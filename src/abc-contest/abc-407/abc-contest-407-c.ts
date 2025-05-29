/**
 * 解説を踏まえての Claude Sonnet4のレビュー
 * このコードの問題点
 * ・本来は数学的アプローチを採用するべきだった、しかし、このコードはシュミレーション方式
 * 　・シュミレーション方式の問題
 * 　　・可読性が悪い、保守性が悪い、不要な計算が多い
 *
 * この問題は数学的な法則を抑えて解くこと。この問題の核心は
 * j文字目に必要なボタンBの回数は、下記の式で表せる
 * (10 + S[j] - S[j+1]) % 10 ...★　この式にたどり着けるかが大事。
 *
 * ★の導出方法
 * bi..各桁ごとで押すボタンBの回数
 * tのj文字目がSjとすると、その値は、(bj+...bN) mod 10 = Sj ...aと表せる
 * ↓　言い換えると、
 * ・j番目の桁の数値を目標の値Sjにするには、j番目以降で押すボタンBの総回数が
 * Sjと一致する、　または
 * ・j番目の桁は、j番目以降で行われるすべてのボタンのB操作の累積効果がSjと一致する
 * 必要がある
 * j+1文字目に対して、同様の式を考えると (bj+1....bN) mod 10 = Sj+1 ..bと
 * なる
 *  a-b より、 bj mod 10 = Sj - Sj+1 となる。
 * 合同式の関係性より、 a mod b = n のとき（aをbで割った余りがnである）
 * a ≡ b(mod n)と導けることから、
 * bj ≡ Sj - Sj+1(mod10)  bjと Sj - Sj+1は 10で割る場合において、合同である。
 *
 *
 *
 *
 */
export function solve (input: string): string {
  const S = Array.from(input.trim(), Number)

  /**　ロジックの実装
   * 実際に、この変換のアルゴリズムを作って、そこに一致させていくのがよさそう。
   *
   * ボタンA →　末尾に0追加
   * ボタンB →  全数字のカウントアップを行う
   *
   * 必要な判定は2つ
   * (1)Sの数と一致するまでボタンAをどこかで押す
   * (2)どこのタイミングでBを押すかが問題。
   * 　　すべての数字が置き換わるので、ボタンAを押す前に、何度ボタンBを押す必要か判断する
   * 　　一度同じ文字列に加わってしまうと、二度と配列間の数字の差を作ることはできないため、
   * 　　必ずボタンAを押す前に、適切なずれを作ってカウントする必要がある
   * あーこれ、別に配列を保有していなくてもボタンのカウントアップの数自体は分かりそう。
   */

  function CalculateDiff (a: number, b: number) {
    let expectTempDiff = a - b
    if (expectTempDiff >= 0) {
      return expectTempDiff
    }

    return 10 - Math.abs(expectTempDiff)
  }
  let startNum = 0
  let buttonCount = 1 // 最初にBを押す
  for (let i = 0; i < S.length - 1; i++) {
    //次の組のチェック
    let expectDiff = CalculateDiff(S[i], S[i + 1])

    let currentDiff = 0 //初期値0のため
    let tempNum = 0

    //もし、次の0と直前の差がそろっていなかったら、そろうまでボタンBを押す必要がある
    if (expectDiff !== currentDiff) {
      while (tempNum - 0 !== expectDiff) {
        buttonCount++

        //ボタンBを押すので全体を1カウントアップ..のシュミレーション
        startNum = countUp(startNum)
        tempNum = countUp(tempNum)
      }
    }
    //ボタンAを押し、末尾に0追加
    buttonCount++
  }

  function countUp (num: number) {
    if (num <= 8) return num + 1
    return 0
  }

  //最後、値がそろうまでボタンAを押す
  while (S[0] !== startNum) {
    startNum = countUp(startNum)
    buttonCount++
  }

  return buttonCount.toString()
}

// テスト環境の場合
if (process.env.NODE_ENV === 'test') {
  const testInput = `407

`
  console.log('===== テスト =====')
  console.log(testInput)
  console.log('===== 結果 =====')
  console.log(solve(testInput))
}
// ローカル実行環境の場合（テスト環境でない && require.mainがmodule）
else if (require.main === module) {
  // node.jsの標準モジュール
  const fs = require('fs')
  try {
    // Windows/Unix対応
    const input =
      process.platform === 'win32'
        ? fs.readFileSync(0, 'utf8')
        : fs.readFileSync('/dev/stdin', 'utf8')
    console.log(solve(input))
  } catch (e) {
    const input = []
    require('readline')
      .createInterface({ input: process.stdin })
      .on('line', line => input.push(line))
      .on('close', () => console.log(solve(input.join('\n'))))
  }
}
