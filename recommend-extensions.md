# VSCode 拡張機能：AtCoder 用 TypeScript 環境ガイド

VSCode で TypeScript を使って AtCoder 問題を効率的に解くための推奨拡張機能をご紹介します。これらの拡張機能を活用することで、コーディング効率が向上し、アルゴリズム問題解決に集中できます。

## 基本的な開発用拡張機能

### 1. TypeScript 関連

#### [TypeScript Debugger](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-js-profile-flame)

TypeScript コードのデバッグを強化します。ブレークポイントの設定、変数の監視、コールスタックの確認など、デバッグに必要な機能を提供します。

#### [JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)

最新の TypeScript 言語機能を VSCode で利用できるようにします。新しい構文や機能をいち早く試すことができます。

### 2. 実行支援

#### [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)

エディタ上から直接コードを実行できる拡張機能です。ショートカットキー（Ctrl+Alt+N）で TypeScript ファイルを実行できるため、素早いテストが可能です。

設定例:

```json
{
  "code-runner.executorMap": {
    "typescript": "npx ts-node"
  },
  "code-runner.runInTerminal": true
}
```

#### [Run on Save](https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave)

ファイル保存時に自動的にコマンドを実行できます。保存するたびにテストを実行したい場合に便利です。

設定例:

```json
{
  "emeraldwalk.runonsave": {
    "commands": [
      {
        "match": "src/problems/.+\\.ts$",
        "cmd": "cross-env NODE_ENV=test npx ts-node ${file}"
      }
    ]
  }
}
```

## 競技プログラミング特化拡張機能

### 1. [Competitive Programming Helper (cph)](https://marketplace.visualstudio.com/items?itemName=DivyanshuAgrawal.competitive-programming-helper)

競技プログラミングに特化した拡張機能で、テストケースの管理、実行、提出をサポートします。問題からテストケースを自動抽出する機能もあります。

### 2. [Competitive Companion](https://marketplace.visualstudio.com/items?itemName=DivyanshuAgrawal.competitive-companion)

ブラウザ拡張機能と連携して、問題のテストケースを自動的に VSCode に取り込みます。

### 3. [AtCoder](https://marketplace.visualstudio.com/items?itemName=not-dev.atcoder-helper)

AtCoder 専用の拡張機能で、問題の取得、テスト、提出を VSCode 内から行えます。

## コード品質・効率化拡張機能

### 1. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

TypeScript のコード品質を確保するリンターです。特に AtCoder 用に設定をカスタマイズすることで、競技プログラミングに適したルールを適用できます。

設定例（.eslintrc.js）:

```javascript
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    // 競技プログラミングでは短い変数名も許可
    '@typescript-eslint/naming-convention': 'off',
    // console.logを許可
    'no-console': 'off'
  }
}
```

### 2. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

コードフォーマッターで、一貫したスタイルのコードを維持します。保存時に自動フォーマットするように設定すると便利です。

### 3. [TabNine](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode) または [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

AI によるコード補完機能を提供し、アルゴリズム実装の効率化をサポートします。特に競技プログラミングでよく使われるパターンの提案に役立ちます。

## テスト・デバッグ拡張機能

### 1. [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner)

テストファイルを簡単に実行できます。複数のテストケースを体系的に管理したい場合に便利です。

### 2. [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)

エラーや警告をインラインで表示し、素早く問題を発見できます。実行前にコードの問題を特定するのに役立ちます。

### 3. [Debug Visualizer](https://marketplace.visualstudio.com/items?itemName=hediet.debug-visualizer)

データ構造を視覚化する拡張機能です。配列、グラフ、ツリーなどの可視化に役立ち、アルゴリズムの動作を確認しやすくなります。

## 生産性向上拡張機能

### 1. [Snippet Generator](https://marketplace.visualstudio.com/items?itemName=wenfangdu.snippet-generator)

競技プログラミングで頻繁に使うコードをスニペットとして登録できます。例えば、入力処理や典型的なアルゴリズムなどを素早く挿入できるようになります。

### 2. [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks)

コード内の重要な箇所にブックマークを設定できます。大きなコードベースを扱う問題で特定の部分を素早く行き来したい場合に便利です。

### 3. [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

コメント内の TODO や FIXME などのマーカーを一覧表示します。問題を解く過程で「後で最適化」などのメモを残しておくのに便利です。

## セットアップと設定

### 拡張機能のインストールと設定手順

1. VSCode を開き、左側のメニューから拡張機能アイコンをクリックします
2. 検索バーに拡張機能名を入力してインストールします
3. インストール後、必要に応じて設定をカスタマイズします

### 競技プログラミング用の推奨設定

以下の設定を VSCode の`settings.json`に追加すると、AtCoder 向けの開発環境が整います:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.tabSize": 2,
  "terminal.integrated.defaultProfile.windows": "Command Prompt",
  "code-runner.clearPreviousOutput": true,
  "code-runner.saveFileBeforeRun": true,
  "code-runner.respectShebang": false,
  "code-runner.executorMapByFileExtension": {
    ".ts": "npx ts-node"
  }
}
```

## AtCoder 用テンプレートスニペット

以下のスニペットを`.vscode/snippets/typescript.json`に保存すると便利です：

```json
{
  "AtCoder Template": {
    "prefix": "atcoder",
    "body": [
      "export function solve(input: string): string {",
      "  const lines = input.trim().split('\\n');",
      "  $1",
      "  return '';",
      "}",
      "",
      "// ローカルでのテスト",
      "if (process.env.NODE_ENV === 'test') {",
      "  const testInput = `$2`;",
      "  console.log(solve(testInput));",
      "}",
      "",
      "// AtCoder提出用",
      "if (require.main === module) {",
      "  const input: string[] = [];",
      "  const reader = require('readline').createInterface({",
      "    input: process.stdin,",
      "    output: process.stdout",
      "  });",
      "",
      "  reader.on('line', (line: string) => {",
      "    input.push(line);",
      "  });",
      "",
      "  reader.on('close', () => {",
      "    console.log(solve(input.join('\\n')));",
      "  });",
      "}"
    ],
    "description": "AtCoder用のTypeScriptテンプレート"
  }
}
```

## まとめ

これらの拡張機能を組み合わせることで、VSCode 上で TypeScript を使用した AtCoder 問題解決の効率が大幅に向上します。問題を理解し、コードを書き、テストし、提出するまでの一連の流れがスムーズになり、アルゴリズムの実装に集中できるようになります。

特に初めのうちは必要最低限（TypeScript Debugger、Code Runner、ESLint、Prettier）からスタートし、慣れてきたら他の拡張機能も試してみることをお勧めします。
