export function solve (input: string) {
  const lines = input.trim().split('\n');
  /**　ロジックの実装 */

  let currentBag = [];
  for (let i = 1; i < lines.length; i++) {
    const [ type, x ] = lines[ i ].split(' ').map(Number);

    if (type === 1) {
      currentBag.push(x);
    } else if (type === 2) {
      currentBag.sort((a, b) => a - b);
      console.log(currentBag[ 0 ]);
      currentBag.shift();
    }
  }
}
  // テスト環境の場合
  if (process.env.NODE_ENV === 'test') {
    const testInput = `5
1 6
1 7
2
1 1
2
`
    console.log('===== テスト =====')
    console.log(testInput)
    console.log('===== 結果 =====')
    solve(testInput)
  }
  // ローカル実行環境
  else if (require.main === module) {
    const fs = require('fs')
    const input = fs.readFileSync(0, 'utf8') // 標準入力を直接読み取り
    solve(input)
  }
}
