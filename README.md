# Select Jump (vscode-select-jump)

## English

### Description
A VS Code extension that adds a context menu for running custom searches and actions on selected text.

### Features
* **Select Jump**: Select any text in the editor, right-click, and choose from a list of configurable search engines or actions. The available options are filtered based on regular expression patterns defined in the settings.

### Installation
1. Open VS Code.
2. Go to Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Search for "Select Jump".
4. Click "Install".

### Usage
1. Select text in your editor.
2. Right-click on the selected text to open the context menu.
3. Choose "Select Jump"
4. A Quick Pick menu will appear with search options relevant to your selected text (based on your configured `selectJump.searchRules`).
5. Select a search option to open the result in your default browser.

### Configuration
You can customize the search rules in your VS Code settings:
`"selectJump.searchRules"`: An array of objects, each defining a search rule.
* `label`: (string) The name displayed in the Quick Pick menu.
* `pattern`: (string) A regular expression pattern. The search option will only appear if the selected text matches this pattern.
* `url`: (string) The URL to open. Use `${0}` as a placeholder for the selected text, which will be URL-encoded.

Example default configuration:
```json
"selectJump.searchRules": [
    {
        "label": "Google search",
        "pattern": "^(?!\\d+$).*",
        "url": "https://www.google.com/search?q=${0}"
    },
    {
        "label": "Google image search",
        "pattern": "^(?!\\d+$).*",
        "url": "https://www.google.com/search?q=${0}&udm=2"
    },
    {
        "label": "Wikipedia article",
        "pattern": "^(?!\\d+$).*",
        "url": "https://en.wikipedia.org/wiki/${0}"
    }
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
3. "Select Jump" を検索します。
4. 「インストール」をクリックします。

### 使用方法
1. エディターでテキストを選択します。
2. 選択したテキストを右クリックしてコンテキストメニューを開きます。
3. 「Select Jump」を選択します。
4. 選択したテキストに関連する検索オプション(設定されている `selectJump.searchRules` に基づく)が表示されたクイックピックメニューが表示されます。
5. 検索オプションを選択すると、デフォルトのブラウザで結果が開きます。

### 設定
VS Code の設定で検索ルールをカスタマイズできます。
`"selectJump.searchRules"`: 各検索ルールを定義するオブジェクトの配列。
* `label`: (string) クイックピックメニューに表示される名前。
* `pattern`: (string) 正規表現パターン。選択したテキストがこのパターンに一致する場合にのみ、検索オプションが表示されます。
* `url`: (string) 開く URL。選択したテキストは URL エンコードされて `${0}` のプレースホルダーに置換されます。

デフォルト設定の例:
```json
"selectJump.searchRules": [
    {
        "label": "Google検索",
        "pattern": "^(?!\\d+$).*",
        "url": "https://www.google.com/search?q=${0}"
    },
    {
        "label": "Google画像検索",
        "pattern": "^(?!\\d+$).*",
        "url": "https://www.google.com/search?q=${0}&udm=2"
    },
    {
        "label": "Wikipedia記事",
        "pattern": "^(?!\\d+$).*",
        "url": "https://ja.wikipedia.org/wiki/${0}"
    }
]
```

### 発展: キーボードショートカット

```
> Preferences: Open Keyboard Shortcuts (JSON)
```

keybingindg.json
```json
  {
    "key": "cmd+s cmd+j",
    "command": "ext.showSelectJumpMenu",
    "when": "editorTextFocus && editorHasSelection && !inDebugRepl"
  },
  {
    "key": "ctrl+s ctrl+j",
    "command": "ext.showSelectJumpMenu",
    "when": "editorTextFocus && editorHasSelection && !inDebugRepl"
  },
  {
    "key": "cmd+s cmd+s",
    "command": "workbench.action.files.save",
    "when": "editorTextFocus && editorHasSelection && !inDebugRepl"
  },
  {
    "key": "ctrl+s ctrl+s",
    "command": "workbench.action.files.save",
    "when": "editorTextFocus && editorHasSelection && !inDebugRepl"
  },
```

単に「ctrl+s ctrl+j」とすると、保存のctrl+sが効かなくなるので、
選択しているときだけSelect Jumpできるようにする。
そうすると、選択していないときは、通常通りctrl+sで保存できる。

選択しているときでも「ctrl+s」を2連続で保存するようにすると良いかも。
