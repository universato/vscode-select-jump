const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

console.log("★ sql-atat-jump ★");

/**
 * 与えられたパスから Git リポジトリのルートディレクトリを見つけます。
 * @param {string} startPath - 検索を開始するパス。
 * @returns {string|null} Git リポジリのルートディレクトリ、または見つからない場合は null。
 */
function getGitRoot(startPath) {
    let currentPath = startPath;
    // ルートディレクトリに到達するまで上位ディレクトリを探索
    while (currentPath !== path.parse(currentPath).root) {
        if (fs.existsSync(path.join(currentPath, '.git'))) {
            return currentPath;
        }
        currentPath = path.dirname(currentPath);
    }
    // ファイルシステムのルートに到達した場合
    if (fs.existsSync(path.join(currentPath, '.git'))) {
        return currentPath;
    }
    return null;
}

/**
 * 指定されたファイルを、与えられた開始パスからGitリポジトリのルートまで上位ディレクトリを検索します。
 * @param {string} startPath - 検索を開始するパス。
 * @param {string} fileName - 検索するファイル名。
 * @returns {string|null} ファイルの絶対パス、または見つからない場合は null。
 */
function findFileUpwards(startPath, fileName) {
    let currentPath = startPath;
    const gitRoot = getGitRoot(startPath);

    while (true) {
        const targetPath = path.join(currentPath, fileName);
        if (fs.existsSync(targetPath)) {
            return targetPath;
        }

        if (currentPath === gitRoot) {
            break; // Gitルートに到達したら検索を停止
        }
        if (currentPath === path.parse(currentPath).root) {
            break; // ファイルシステムのルートに到達したら検索を停止
        }
        currentPath = path.dirname(currentPath);
    }
    return null;
}

function activate(context) {
    console.log("★ sql-atat-jump (JS) will activate ★");

    const provider = vscode.languages.registerDocumentLinkProvider(
        { language: "sql" },
        {
            provideDocumentLinks(document) {
                const text = document.getText();
                // @ と @@ の両方に対応する正規表現
                const regexp = /(@|@@)([A-Za-z0-9_\-./]+)/g;
                const links = [];

                let match;
                while ((match = regexp.exec(text)) !== null) {

                    const start = match.index;
                    const end = start + match[0].length;

                    const startPos = document.positionAt(start);
                    const endPos = document.positionAt(end);

                    const range = new vscode.Range(startPos, endPos);

                    const prefix = match[1]; // "@" or "@@"
                    const filePath = match[2]; // 相対パス部分

                    const base = path.dirname(document.uri.fsPath);
                    let target = null;

                    if (prefix === '@@') {
                        // @@ の場合、カレントディレクトリからGitルートまで遡って検索
                        target = findFileUpwards(base, filePath);
                    } else {
                        // @ の場合、カレントディレクトリを基準に検索
                        const resolvedPath = path.resolve(base, filePath);
                        if (fs.existsSync(resolvedPath)) {
                            target = resolvedPath;
                        }
                    }

                    if (target) {
                        const link = new vscode.DocumentLink(
                            range,
                            vscode.Uri.file(target)
                        );
                        links.push(link);
                    }
                }

                return links;
            }
        }
    );

    context.subscriptions.push(provider);
    console.log("★ sql-atat-jump (JS) activated ★");
}

// function deactivate() {}

module.exports = {
    activate,
    // deactivate
};
