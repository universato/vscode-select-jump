const vscode = require('vscode');

function activate(context) {

  const openUrl = (url) => {
    vscode.env.openExternal(vscode.Uri.parse(url));
  };

  const getSelectedText = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return '';
    const sel = editor.selection;
    return editor.document.getText(sel).trim();
  };

  // Google検索
  const searchGoogle = vscode.commands.registerCommand('ext.searchGoogle', () => {
    const text = getSelectedText();
    if (!text) return;

    const url = `https://www.google.com/search?q=${encodeURIComponent(text)}`;
    openUrl(url);
  });

  // Google画像検索
  const searchImages = vscode.commands.registerCommand('ext.searchImages', () => {
    const text = getSelectedText();
    if (!text) return;

    const url = `https://www.google.com/search?q=${encodeURIComponent(text)}&udm=2`;
    openUrl(url);
  });

  // GitHub Issue検索(選択が数字だけのとき)
  const searchGithubIssue = vscode.commands.registerCommand('ext.searchGithubIssue', () => {
    const text = getSelectedText();
    if (!text) return;

    if (!/^\d+$/.test(text)) {
      vscode.window.showWarningMessage("数字のみが選択されたときにIssue検索します。");
      return;
    }

    // ★必要に応じてリポジトリを設定
    const repo = "owner/repository";

    const url = `https://github.com/${repo}/issues/${text}`;
    openUrl(url);
  });

  context.subscriptions.push(searchGoogle, searchImages, searchGithubIssue);
}

function deactivate() {}

module.exports = { activate, deactivate };
