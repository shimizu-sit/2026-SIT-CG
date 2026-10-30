# Computer Graphics 2026

湘南工科大学 情報学部「コンピュータグラフィックス」の
授業資料およびサンプルプログラムを管理するリポジトリです．

## Course

- 科目名：コンピュータグラフィックス
- English: Computer Graphics
- 対象：情報学部 情報学科 2年次
- 授業形態：講義・実習
- 使用環境：Processing

## Overview

Processingを用いたプログラミングを通して，
コンピュータグラフィックスの基礎概念と実装方法を学習します．

主に以下の内容を扱います．

- 2D図形描画
- カラー表現
- アニメーション
- 座標変換
- 3Dモデル
- 陰影・照明
- ベクトル
- 物理モデル
- 再帰
- 数学アート
- Generative Art

## Lectures

|  No  |    Day     |         Topic          |                  Slide/Material                  |                        Remarks                        |
| ---: | :--------: | ---------------------- | ------------------------------------------------ | ----------------------------------------------------- |
|   01 | 2026-09-25 | ガイダンス             | [01-guidance](lectures/01-guidance/)             | 2クラス合同ガイダンス，授業の進め方，評価，クラス分け |
|   02 | 2026-10-02 | Processingと基本図形   | [02-basic-drawing](lectures/02-basic-drawing/)   | Processingの使い方，座標系，基本構文                  |
|   03 | 2026-10-09 | 繰り返し・条件分岐     | [03-loop-condition](lectures/03-loop-condition/) |                                                       |
|   04 | 2026-10-16 | アニメーション         | [04-animation](lectures/04-animation/)           |                                                       |
|   05 | 2026-10-23 | 座標変換               | [05-transformation](lectures/05-transformation/) |                                                       |
|   06 | 2026-11-06 | 3Dモデル               | [06-3d-model](lectures/06-3d-model/)             |                                                       |
|   07 | 2026-11-13 | 陰影・照明             | [07-lighting](lectures/07-lighting/)             |                                                       |
|   08 | 2026-11-20 | 前半まとめ             | [08-review](lectures/08-review/)                 |                                                       |
|   09 | 2026-11-27 | 物理モデル I           | [09-physics-01](lectures/09-physics-01/)         |                                                       |
|   10 | 2026-12-04 | 物理モデル II          | [10-physics-02](lectures/10-physics-02/)         |                                                       |
|   11 | 2026-12-11 | 数学アート I           | [11-math-art-01](lectures/11-math-art-01/)       |                                                       |
|   12 | 2026-12-18 | 数学アート II          | [12-math-art-02](lectures/12-math-art-02/)       |                                                       |
|   13 | 2027-01-08 | オリジナル作品制作 I   | [13-project-01](lectures/13-project-01/)         |                                                       |
|   14 | 2027-01-15 | オリジナル作品制作 II  | [14-project-02](lectures/14-project-02/)         |                                                       |
|   15 | 2027-01-22 | オリジナル作品制作 III | [15-project-03](lectures/15-project-03/)         |                                                       |
|   16 | 2027-01-29 | 発表・総評             | [16-presentation](lectures/16-presentation/)     |                                                       |

## Repository Structure

```text
lectures/     授業資料
assignments/  課題資料
docs/         環境・運用ドキュメント
scripts/      Marpビルド・教材検証用スクリプト
themes/       Marpテーマsubmodule
```

授業資料は[`lectures/`](lectures/)，課題資料は[`assignments/`](assignments/)に保存します．
正式な開発・ビルド環境の詳細は[`docs/environment.md`](docs/environment.md)を参照してください．

## Setup

MarpテーマはGit submoduleとして管理しています．初回cloneでは，submoduleも同時に取得してください．

```bash
git clone --recurse-submodules <repository-url>
cd 2026-SIT-CG
```

通常の`git clone`を行った場合や，既存のcloneでsubmoduleが未初期化の場合は，次を実行します．

```bash
git submodule update --init --recursive
```

Node.jsはリポジトリの`.node-version`を基準に管理しています．現在の基準環境はNode.js 24.22.1，npm 11.19.1です．
環境の詳細と確認方法は[`docs/environment.md`](docs/environment.md)を参照してください．

`package-lock.json`に固定された依存関係を使用するため，初回の依存パッケージのインストールには次を使用します．

```bash
npm ci
```

## Processing

https://processing.org/

本授業ではProcessingを使用します．

## PDF Build

### 講義資料

講義資料はMarp Markdownを原本とし，Node.js 24系LTS上のMarp CLIでPDFを生成します．初回は，先に「Setup」の手順でsubmoduleと依存パッケージを準備してください．

```bash
npm run build
npm run build:lectures
npm run build:lecture -- lectures/05-transformation/05-transformation.md
```

`npm run build`は講義資料だけをビルドします．講義PDFは`lectures/NN-topic/NN-topic.md`から生成します．

### 課題資料

課題資料は通常Markdownを原本とし，VS Codeの拡張機能`yzane.markdown-pdf`でPDFを手動Exportします．npmやMarp CLIでは課題PDFを生成しません．

1. `assignments/NN/NN.md`をVS Codeで開く．
2. `Markdown PDF: Export (pdf)`を実行する．
3. `assignments/NN/NN.pdf`が生成されたことを確認する．
4. PDFを目視確認する．
5. `npm run check`を実行する．

課題PDFはA4縦で出力し，`convertOnSave`には依存しません．`npm run build:assignments`と`npm run build:assignment`は誤操作防止のため案内だけを表示して非0で終了します．

### 共通検証

```bash
npm run check
```

Markdownを変更した場合は対応するPDFも再生成し，PDFはGit管理します．
評価用の`README.md`はPDF生成対象に含めません．

`npm run check`は，PDF，画像参照，講義用assets，課題用READMEの扱いを検証します．

## Submodule Operations

通常の教材作成時に，テーマsubmoduleを最新版へ更新する必要はありません．親リポジトリが記録しているcommitをそのまま使用してください．

テーマリポジトリの最新版を親リポジトリへ反映する場合は，テーマ側で変更をcommit・pushした後，親リポジトリで次を実行します．

```bash
git submodule update --remote themes/marp-themes
git status
```

submoduleの参照commitが変更されたことを確認したら，親リポジトリ側のgitlink更新をcommitします．テーマsubmodule自体の更新は，教材への影響を確認してから行ってください．

## Important

**試験問題**，**模範解答**，**採点基準**は本リポジトリでは管理していません．

これらは別の非公開リポジトリで管理しています．

また，学生情報，成績情報，学生提出物はGitHubでは管理をせず教員PCのローカルでのみ管理する．

## License

教材およびプログラムの利用条件については[LICENSE](./LICENSE)を参照してください．
