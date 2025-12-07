const vscode = require('vscode');

function activate(context) {

  // Open external URL
  const openUrl = url => {
    vscode.env.openExternal(vscode.Uri.parse(url));
  };

  // get selected text
  const getSelectedText = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return "";
    return editor.document.getText(editor.selection).trim();
  };

  /**
   * メインコマンド： Select Jump
   */
  context.subscriptions.push(
    vscode.commands.registerCommand("ext.showSelectJumpMenu", async () => {

      const text = getSelectedText();
      if (!text) return;

      const config = vscode.workspace.getConfiguration("selectJump");

      // すべての検索ルール(正規表現 + URL)
      const searchRules = config.get("searchRules") || [];

      // QuickPick に表示する項目リスト
      const items = [];

      // searchRules: pattern に一致するものだけ追加
      searchRules.forEach(entry => {
        try {
          const regex = new RegExp(entry.pattern);

          if (regex.test(text)) {
            items.push({
              label: entry.label,
              run: () => {
                const encoded = encodeURIComponent(text);
                const url = entry.url.replace("${text}", encoded);
                openUrl(url);
              }
            });
          }

        } catch (error) {
          // 正規表現エラーは無視(表示させない)
        }
      });

      // QuickPick 表示
      const pick = await vscode.window.showQuickPick(
        items.map(i => i.label),
        { placeHolder: `select! (${text})` }
      );

      // 選択された項目の実行
      const chosen = items.find(i => i.label === pick);
      chosen?.run();
    })
  );
}

module.exports = { activate };
