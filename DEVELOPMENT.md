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
    "onCommand:ext.showSelectJumpMenu"
  ],
```

> This activation event can be removed as VS Code generates these automatically from your package.json contribution declarations.

> このアクティベーションイベントは削除できます。なぜなら VS Code は、package.json の contribution(寄与)宣言から、これらを自動的に生成するためです。

VS Code 本体(1.75 以降)では、package.json の contributes.commands や menus の宣言を見て自動的に適切な activationEvents を生成する仕様になった。そのため、VS Codeではリムーヴできるようアナウンスが表示される。

しかし、.vsixファイルというパッケージを作成する`vsce`を用いるときに対応していなくて、エラーとなる。そのため、`vsce`が対応するまで、書いておく。
