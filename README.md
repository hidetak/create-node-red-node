<!-- @format -->

# create-node-red-node

command line tool for creating node-red node template.

# 使い方

## 環境構築

- ノードモジュールをインストールします。
  `npm install`

## 作成するノードの定義

- `node-gen-config.json`のファイルを編集し、作成したいノードの定義を記載してください。

##　ノードテンプレート作成

- ビルドコマンドを実行します。
  `npm run build:node`
- ノードテンプレートは`out-node`フォルダに作成されますので、このフォルダをコピーしてノードの作成に利用してください。

## ノードテンプレートのビルド

作成されたノードテンプレート(`out-node`フォルダに作成されたファイル群)は以下の手順でビルドします。

- 作成されたフォルダ(デフォルトでは`out-node`フォルダ)に移動します。
  `cd out-node`
- ノードモジュールをインストールします。
  `npm install`
- ビルドします。
  `npm run build`
