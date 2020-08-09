## 自動トレードプログラム

本プログラムは、ブラウザーを利用して、自動的に証券会社に注文を行っています。
確実な動作を保証するものではありません。エラーが発生しても、当方では責任を持てませんのでご注意ください。

### インストール方法

1. nodejsをインストールする。https://nodejs.org/ja/download/
2. `npm install -g shoken-trade` のコマンドを実行して、本ソフトウェアをインストールする。

### 実行方法

shoken-tradeコマンドを実行する。コマンドラインオプション

```
--shoken_select <shoken_company>   利用する証券会社を指定してください (sbi)
--login_id <login id>              ログインIDを指定してください
--login_password <login password>  ログインパスワードを指定してください
--trade_password <trade password>  取引パスワードを指定してください
--trade_action <buy>               取引内容を指定してください (default: "buy")
--trade_category <toshi_shintaku>  取引カテゴリを指定してください (default: "toshi_shintaku")
--trade_code <code>                銘柄コードを指定してください
--trade_by_price                   「金額買付」をする場合は指定してください (default: false)
--trade_amount <amount>            取引する数量を指定してください
--trade_azukari_kubun <default>    預かり区分 default or nisa (default: "default")
--trade_bunpai <saitoshi>          分配金受取方法 saitoshi or uketori (default: "saitoshi")
--trade_auto_agreement             同意して次へ ボタンを自動でクリックする (default: false)
--trade_retry <count>              途中で接続に失敗した場合、リトライする回数 (default: 0)
--headless                         ブラウザーを非表示にする (default: false)
--page_timeout <timeout>           ブラウザーのタイムアウト時間 (default: 30000)
--not_end                          テスト用 [ブラウザーを終了しない] (default: false)
-h, --help                         ヘルプ
```

### 現在対応している売買

現在以下の取引に対応しています。
その他、対応して欲しい取引内容があれば、対応できるものもあると思いますので、Issuesからご依頼下さい。

1. SBI証券 投資信託 金額買付
