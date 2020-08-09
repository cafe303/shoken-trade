
const { program } = require('commander')

// 証券会社での取引設定
program.requiredOption('--shoken_select <shoken_company>', '利用する証券会社を指定してください (現在 sbi のみ)')
program.requiredOption('--login_id <login id>', 'ログインIDを指定してください')
program.requiredOption('--login_password <login password>', 'ログインパスワードを指定してください')
program.requiredOption('--shoken_password <trade password>', '取引パスワードを指定してください')

program.option('--shoken_action <buy>', '取引内容を指定してください (現在 buy のみ)', 'buy')
program.option('--shoken_category <toshi_shintaku>', '取引カテゴリを指定してください (現在 toshi_shintaku のみ)', 'toshi_shintaku')
program.requiredOption('--shoken_code <code>', '銘柄コードを指定してください')
program.option('--shoken_by_price', '「金額買付」をする場合は指定してください', false)
program.requiredOption('--shoken_amount <amount>', '取引する数量を指定してください')
program.option('--shoken_azukari_kubun <default>', '預かり区分 default or nisa', 'default')
// program.option('--shoken_use_point <amount>', 'ポイント利用 all or amount', 0)
program.option('--shoken_bunpai <saitoshi>', '分配金受取方法 saitoshi or uketori', 'saitoshi')
program.option('--shoken_auto_agreement', '同意して次へ ボタンを自動でクリックする', false)
program.option('--shoken_retry <count>', '途中で接続に失敗した場合、リトライする回数', 0)

// 取引内容
program.option('--trade_algorithm <algorithm>', '取引アルゴリズム設定')

// ブラウザ設定
program.option('--headless', 'ブラウザーを非表示にする', false)
program.option('--page_timeout <timeout>', 'ブラウザーのタイムアウト時間', 30000)

program.option('--not_end', 'テスト用 [ブラウザーを終了しない]', false)

program.parse(process.argv)

// console.log(program)
module.exports = program
