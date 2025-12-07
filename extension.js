const vscode = require('vscode');

function activate(context) {

  /** Open external URL */
  const openUrl = url => {
    vscode.env.openExternal(vscode.Uri.parse(url));
  };

  /** get selected text */
  const getSelectedText = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return "";
    return editor.document.getText(editor.selection).trim();
  };

  /**
   * メインコマンド： Search selected text..."
   */
  context.subscriptions.push(
    vscode.commands.registerCommand("ext.showSearchMenu", async () => {

      const query = getSelectedText();
      if (!query) return;

      const config = vscode.workspace.getConfiguration("contextSearchTools");

      /** 常に表示される検索メニュー */
      const customSearches = config.get("customSearches") || [];

      /** 正規表現マッチした時だけ表示される検索メニュー */
      const patternSearches = config.get("patternSearches") || [];

      /** QuickPick に表示する項目配列 */
      const items = [];

      // ----------------------------------------------------------
      // 1. patternSearches: 正規表現に一致するものだけ追加
      // ----------------------------------------------------------
      patternSearches.forEach(entry => {
        try {
          const regex = new RegExp(entry.pattern);

          if (regex.test(query)) {
            items.push({
              label: entry.label,
              run: () => {
                const url = entry.url.replace("${query}", encodeURIComponent(query));
                openUrl(url);
              }
            });
          }
        } catch (error) {
          // 正規表現エラーは無視 (表示しない)
        }
      });

      // ----------------------------------------------------------
      // 2. customSearches: 常に追加
      // ----------------------------------------------------------
      customSearches.forEach(entry => {
        items.push({
          label: entry.label,
          run: () => {
            const url = entry.url.replace("${query}", encodeURIComponent(query));
            openUrl(url);
          }
        });
      });

      // ----------------------------------------------------------
      // QuickPick 表示
      // ----------------------------------------------------------
      const pick = await vscode.window.showQuickPick(
        items.map(i => i.label),
        { placeHolder: "検索メニューを選択してください" }
      );

      // 選択されたものを実行
      const chosen = items.find(i => i.label === pick);
      chosen?.run();
    })
  );
}

module.exports = { activate };
