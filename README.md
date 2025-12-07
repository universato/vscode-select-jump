# Select Jump (vscode-select-jump)

## English

### Description
A VS Code extension that adds a context menu for running custom searches and actions on selected text.

### Features
* **Search selected text**: Select any text in the editor, right-click, and choose from a list of configurable search engines or actions. The available options are filtered based on regular expression patterns defined in the settings.

### Installation
1. Open VS Code.
2. Go to Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Search for "Context Search Tools".
4. Click "Install".

### Usage
1. Select text in your editor.
2. Right-click on the selected text to open the context menu.
3. Choose "Search selected text..."
4. A Quick Pick menu will appear with search options relevant to your selected text (based on your configured `contextSearchTools.searchRules`).
5. Select a search option to open the result in your default browser.

### Configuration
You can customize the search rules in your VS Code settings:
`"contextSearchTools.searchRules"`: An array of objects, each defining a search rule.
* `label`: (string) The name displayed in the Quick Pick menu.
* `pattern`: (string) A regular expression pattern. The search option will only appear if the selected text matches this pattern.
* `url`: (string) The URL to open. Use `${text}` as a placeholder for the selected text, which will be URL-encoded.

Example default configuration:
```json
"contextSearchTools.searchRules": [
    {
        "label": "Google search",
        "pattern": "^(?!\\d+$).*",
        "url": "https://www.google.com/search?q=${text}"
    },
    {
        "label": "Google image search",
        "pattern": "^(?!\\d+$).*",
        "url": "https://www.google.com/search?q=${text}&udm=2"
    },
    {
        "label": "Wikipedia article",
        "pattern": "^(?!\\d+$).*",
        "url": "https://en.wikipedia.org/wiki/${text}"
    },
]
```

## Japanese (日本語)

### 説明
選択したテキストに対してカスタム検索やアクションを実行するためのコンテキストメニューを追加する VS Code 拡張機能です。

### 機能
* **選択テキストの検索**: エディターでテキストを選択し、右クリックして、設定可能な検索エンジンやアクションのリストから選択します。利用可能なオプションは、設定で定義された正規表現パターンに基づいてフィルタリングされます。

### インストール
1. VS Code を開きます。
2. 拡張機能ビュー (`Ctrl+Shift+X` または `Cmd+Shift+X`) を開きます。
3. "Context Search Tools" を検索します。
4. 「インストール」をクリックします。

### 使用方法
1. エディターでテキストを選択します。
2. 選択したテキストを右クリックしてコンテキストメニューを開きます。
3. 「Search selected text...」を選択します。
4. 選択したテキストに関連する検索オプション（設定されている `contextSearchTools.searchRules` に基づく）が表示されたクイックピックメニューが表示されます。
5. 検索オプションを選択すると、デフォルトのブラウザで結果が開きます。

### 設定
VS Code の設定で検索ルールをカスタマイズできます。
`"contextSearchTools.searchRules"`: 各検索ルールを定義するオブジェクトの配列。
* `label`: (string) クイックピックメニューに表示される名前。
* `pattern`: (string) 正規表現パターン。選択したテキストがこのパターンに一致する場合にのみ、検索オプションが表示されます。
* `url`: (string) 開く URL。選択したテキストは URL エンコードされて `${text}` のプレースホルダーに置換されます。

デフォルト設定の例:
```json
"contextSearchTools.searchRules": [
    {
        "label": "Google search",
        "pattern": "^(?!\\d+$).*",
        "url": "https://www.google.com/search?q=${text}"
    },
    {
        "label": "Google image search",
        "pattern": "^(?!\\d+$).*",
        "url": "https://www.google.com/search?q=${text}&udm=2"
    },
    {
        "label": "Wikipedia article",
        "pattern": "^(?!\\d+$).*",
        "url": "https://en.wikipedia.org/wiki/${text}"
    },
]
```

# Development (開発)

```
npx vsce package
```

.vsix拡張子のパッケージ化させる。

```
>Extensions: Install from VSIX...
```

.vsixをインストールする。

# package.json

```json
  "activationEvents": [
    "onCommand:ext.showSearchMenu"
  ],
```

> This activation event can be removed as VS Code generates these automatically from your package.json contribution declarations.

> このアクティベーションイベントは削除できます。なぜなら VS Code は、package.json の contribution(寄与)宣言から、これらを自動的に生成するためです。

VS Code 本体(1.75 以降)では、package.json の contributes.commands や menus の宣言を見て自動的に適切な activationEvents を生成する仕様になった。そのため、VS Codeではリムーヴできるようアナウンスが表示される。

しかし、.vsixファイルというパッケージを作成する`vsce`を用いるときに対応していなくて、エラーとなる。そのため、`vsce`が対応するまで、書いておく。