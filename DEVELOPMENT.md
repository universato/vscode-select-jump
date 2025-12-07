# Development (開発)

```
npx vsce package
```

.vsix拡張子のパッケージ化させる。

```
>Extensions: Install from VSIX...
```

.vsixをインストールする。

## npx

npx: npm exc (npm execute)の略。
npm でインストールしたパッケージを 実行(execute) する機能。

## vsce: “Visual Studio Code Extensions”

VSCode拡張機能。

npm vsce package で、 VSCode拡張を.vsixファイルにパッケージするコマンド。

## .vsix

.vsixは、“Visual Studio Extension” の略だとか(?)
もともとは、VSIX = Visual Studio Installer XML だとか。
Visual Studioで使われており、VSCodeでも使われるようになった。
でも、VSCodeの.vsixの中身はXMLではなく、JSONマニフェスト(package.json)が中心。

# Visual Studio Marketplace

[Visual Studio Marketplace](https://marketplace.visualstudio.com/)

1. Publish extensions をクリック。
2. ⋯ をクリック。
3. update をクリック。
4. .vsixファイルをアップロードする。

# package.json

```json
  "activationEvents": [
    "onCommand:ext.showSelectJumpMenu"
  ],
```

> This activation event can be removed as VS Code generates these automatically from your package.json contribution declarations.

> このアクティベーションイベントは削除できます。なぜなら VS Code は、package.json の contribution(寄与)宣言から、これらを自動的に生成するためです。

VS Code 本体(1.75 以降)では、package.json の contributes.commands や menus の宣言を見て自動的に適切な activationEvents を生成する仕様になった。そのため、VS Codeではリムーヴできるようアナウンスが表示される。

しかし、.vsixファイルというパッケージを作成する`vsce`を用いるときに対応していなくて、エラーとなる。そのため、`vsce`が対応するまで、書いておく。
