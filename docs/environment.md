# 教材作成・実行環境

この文書では，2026年度「コンピュータグラフィックス」で使用する教材作成環境および基準実行環境を定義する．

---

## Processing

### 基準環境

- Processing：**4.5.7**
- Mode：**Java**

授業資料，サンプルコード，演習コードは，Processing 4.5.7のJava Modeを基準として作成・検証する．

### 学生環境について

学生が使用するProcessingのバージョンは統一しない．

そのため，Processing 4.5.7は**必須バージョンではなく，授業側の基準・検証バージョン**として扱う．

教材のサンプルコードは，可能な範囲でProcessing 4系の一般的なJava Mode環境で動作するように作成する．

バージョン依存のAPIや機能を使用する場合は，授業資料等で必要に応じて注意事項を示す．

### Renderer

用途に応じて以下を使用する．

- 通常の2D描画：デフォルトRenderer
- 2D高速描画が必要な場合：`P2D`
- 3D描画：`P3D`

Rendererを使用する場合は，授業資料内でその目的を説明する．

---

## Marp

### 基準環境

- `@marp-team/marp-cli`：**4.5.1**
- `@marp-team/marp-core`：**4.4.0**

Node.js 24系LTSと，リポジトリの`package.json`に定義されたMarp CLIを使用する．
Marp CoreはMarp CLIの依存関係として`package-lock.json`で固定する．

確認コマンド：

```bash
npm exec -- marp --version
```

想定される表示：

```text
@marp-team/marp-cli v4.5.1
(w/ @marp-team/marp-core v4.4.0)
```

### Theme

- Theme：`sit-lecture`
- CSS：`themes/marp-themes/themes/sit-lecture.css`
- Submodule：`themes/marp-themes/`
- Commit：`c9b635d`

授業資料では原則として，

```yaml
theme: sit-lecture
```

を使用する．

Marpテーマは，

```text
themes/marp-themes/
```

Git submoduleで管理する．

テーマのバージョンは，submoduleのコミットで固定する．

---

## PDF生成

Markdownを原本とし，PDFは生成物として扱う．

PDFを直接編集しない．

### Node.js / npm

- Node.js：**24.22.1**
- npm：**11.19.1**
- Node.js管理方法：`.node-version`で指定し，Node.jsバージョンマネージャーまたは公式配布版で切り替える
- `package.json`：`engines.node`を`24.x`に固定する
- `packageManager`：`npm@11.19.1`

Marp CLIは`package.json`の`devDependencies`に定義したローカルインストールを正式な実行環境とする．
開発者環境にHomebrew版Marpが存在していても，リポジトリの正式ビルド環境とはしない．
`package-lock.json`はGit管理する．

### PDF生成ブラウザ

Marp CLIはGoogle Chromeを使用する．現在確認できた基準ブラウザは次のとおりである．

- Google Chrome：**155.0.8059.85**

PDF生成スクリプトでは`--browser chrome`を指定する．

### npmによるPDF生成

```bash
npm ci
npm run build
npm run build:lectures
npm run build:assignments
npm run build:lecture -- lectures/05-transformation/05-transformation.md
npm run build:assignment -- assignments/05/05.md
npm run check
```

PDF生成には，ローカル画像を読み込むため，次のMarpオプションを使用する．

```text
--pdf
--allow-local-files
--theme themes/marp-themes/themes/sit-lecture.css
```

---

## 環境変更

Processing，Marp CLI，Marp Core，Marpテーマなどの基準環境を変更するときは，既存教材への影響を確認する．

変更時には，

1. 変更前のバージョン
2. 変更後のバージョン
3. 変更理由
4. 動作確認結果
5. 既存PDFへの影響

を確認・記録する．
