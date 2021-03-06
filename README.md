# Tweet Notifier

## 概要

自分のアカウントの最新ツイートを取得して、小さく表示するChrome拡張機能です。


## 使い方

### インストール

1. レポジトリのトップにある「Download ZIP」からtweet-notifierをダウンロードして解凍します。
1. Chromeのメニュー（右上にある）から、「ツール→拡張機能(E)」を選択します。
1. ダウンロードしたフォルダをChromeの拡張機能画面へドラッグ&ドロップします。
1. アドレスバーの隣にボタンが現れればインストール成功です。

### ツイートの取得

以下の条件を前提とします。

* インターネットに接続していること。
* Chrome上でTwtterの認証が済んでいること（ログインしている）。

インストールした際に表示されるようになったボタンをクリックすると、設定した数だけ最新からツイートを取得します。
（デフォルトは5件）

### 各部位の説明

#### __本体__

ツイートをしたユーザーと、ツイートの内容を表示します。  
リツイートであった場合は、下部に薄くリツイートしたユーザーが表示されます。  
クリックすると、ポップアップが消えます。

#### __アイコン__

通常のツイートとリツイートでアイコンが異なります。


#### __クリアボタン__

クリックすると全てのツイートのポップアップを消去します。  
緊急避難の時や、ポップアップがじゃまになった時用です。


#### __リンクボタン__

ツイート内にリンクがあった場合に表示されます。  
クリックすると新しいウインドウでリンクを開きます。  
ウインドウの大きさとシークレットモードで開くかは、設定画面で変更できます。
