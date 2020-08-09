
const { program } = require('commander')

program.requiredOption('--shoken_select <shoken_company>', '利用する証券会社を指定してください (sbi)')
program.requiredOption('--login_id <login id>', 'ログインIDを指定してください')
program.requiredOption('--login_password <login password>', 'ログインパスワードを指定してください')
program.requiredOption('--trade_password <trade password>', '取引パスワードを指定してください')

program.option('--trade_action <buy>', '取引内容を指定してください', 'buy')
program.option('--trade_category <toshi_shintaku>', '取引カテゴリを指定してください', 'toshi_shintaku')
program.requiredOption('--trade_code <code>', '銘柄コードを指定してください')
program.option('--trade_by_price', '「金額買付」をする場合は指定してください', false)
program.requiredOption('--trade_amount <amount>', '取引する数量を指定してください')
program.option('--trade_azukari_kubun <default>', '預かり区分 default or nisa', 'default')
// program.option('--trade_use_point <amount>', 'ポイント利用 all or amount', 0)
program.option('--trade_bunpai <saitoshi>', '分配金受取方法 saitoshi or uketori', 'saitoshi')
program.option('--trade_auto_agreement', '同意して次へ ボタンを自動でクリックする', false)
program.option('--trade_retry <count>', '途中で接続に失敗した場合、リトライする回数', 0)

program.option('--headless', 'ブラウザーを非表示にする', false)
program.option('--page_timeout <timeout>', 'ブラウザーのタイムアウト時間', 30000)

program.option('--not_end', 'テスト用 [ブラウザーを終了しない]', false)

program.parse(process.argv)

// console.log(program)
module.exports = program
