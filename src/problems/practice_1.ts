// ロジック関数
function solve (input: string): string {
  const lines = input.trim().split('\n')
  const [a, b] = lines[0].split(' ').map(Number)
  const c = parseInt(lines[1])
  const s = lines[2]

  return `${a + b + c} ${s}`
}

// メイン処理
function main () {
  // ローカルでテストするとき用
  if (process.env.NODE_ENV === 'test') {
    const testInput = `1 2
3
test`
    console.log(solve(testInput))
  }
  // 提出用（標準入力処理）
  else if (require.main === module) {
    try {
      // 標準入力を処理するコード
      // この部分はAtCoder提出時のみ実行される
      const fs = require('fs')
      const input =
        process.platform === 'win32'
          ? fs.readFileSync(0, 'utf8') // Windows用
          : fs.readFileSync('/dev/stdin', 'utf8') // Linux/Mac用
      console.log(solve(input))
    } catch (e) {
      // ローカル環境でのエラー処理
      console.error(
        '標準入力の読み込みに失敗しました。テスト環境では無視されます。'
      )
      console.error(e)
    }
  }
}

// プログラム実行
main()
