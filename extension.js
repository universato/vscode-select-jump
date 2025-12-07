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

      // すべての検索ルール(正規表現 + URL) を取得。
      const config = vscode.workspace.getConfiguration("selectJump");
      const searchRules = config.get("searchRules") || [];

      // searchRulesのpatternに一致するものだけ、QuickPickに表示する項目リストに追加。
      const items = [];
      searchRules.forEach(entry => {
        try {
          const regex = new RegExp(entry.pattern);
          const match = text.match(regex);

          if (match) {
            console.log(regex.test(text))
            items.push({
              label: entry.label,
              run: () => {
                let url = entry.url;

                // ${text} -> text (= macth[0])
                url = url.replace("${text}", encodeURIComponent(text));

                // ${k} -> macth[k]
                match.forEach((value, index) => {
                  const encoded = encodeURIComponent(value);
                  url = url.replaceAll(`\${${index}}`, encoded);
                });

                openUrl(url)
              }
            });
          }

        } catch (error) {
          // 正規表現エラーは無視(表示させない)
        }
      });

      if (items.length === 0) {
        vscode.window.showInformationMessage(`No matching Select Jump rule for: ${text}`);
        return;
      }

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
