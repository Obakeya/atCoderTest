export function solve (input: string): string {
  const lines = input.trim().split('\n')

  // ここに問題を解くコードを書く

  return ''
}

// ===== テストケース =====
const testCases = {
  case1: ``, // 基本的なテストケース
  case2: `` // 別のテストケース
  // 必要に応じてケースを追加
}

// メイン処理
function main () {
  // ローカルでテストするとき用
  if (process.env.NODE_ENV === 'test') {
    // テストケースを選択（TEST_CASE環境変数があればそれを使用、なければcase1）
    const testCaseKey = process.env.TEST_CASE || 'case1'
    const testInput = testCases[testCaseKey]

    console.log(`===== テストケース: ${testCaseKey} =====`)
    console.log(testInput || '（テストケースが空です）')
    console.log('===== 結果 =====')
    console.log(solve(testInput))
  }
  // 提出用（標準入力処理）
  else if (require.main === module) {
    try {
      // AtCoder提出時はこちらが実行される
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

      // 代替手段としてreadlineを使用
      const input: string[] = []
      const reader = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      })

      reader.on('line', (line: string) => {
        input.push(line)
      })

      reader.on('close', () => {
        console.log(solve(input.join('\n')))
      })
    }
  }
}

// プログラム実行
main()
