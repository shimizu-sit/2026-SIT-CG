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

確認コマンド：

```bash
marp --version
```

想定される表示：

```text
@marp-team/marp-cli v4.5.1
(w/ @marp-team/marp-core v4.4.0)
```

### Theme

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

Marp CLIによる生成方法は，`package.json` 導入後にnpm scriptとして統一する．

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