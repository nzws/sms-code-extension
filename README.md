![img](https://i.imgur.com/yBBokFm.png)

# sms-code-extension

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/nzws/sms-code-extension/Node%20CI?style=for-the-badge)](https://github.com/nzws/sms-code-extension/actions)
[![code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge&logo=prettier)](https://prettier.io/)
[![dependabot enabled](https://img.shields.io/badge/dependabot-enabled-0366D6.svg?style=for-the-badge&logo=dependabot)](https://github.com/nzws/sms-code-extension/pulls?utf8=%E2%9C%93&q=is%3Apr+label%3Adependencies+)

> SMS で受信した確認コードを Pushbullet を経由してクリップボードに自動コピーします。

- 「Pushbullet」というサービスが端末が受信した SMS を拡張機能に送信し、拡張機能は確認コードがあるか確かめます。
- 受信用端末は Pushbullet の仕様上 Android である必要があります。iOS は使用できません。
- この拡張機能は Pushbullet 以外にはアクセスしません。ソースコードを GitHub で公開しています: https://github.com/nzws/sms-code-extension
- Pushbullet の E2E 暗号化モードを有効にしている場合は正常に動作しない可能性があります。

## 使い方:

1. 拡張機能をインストールします。
2. [Pushbullet の設定](https://www.pushbullet.com/#settings) から `Create Access Token` をクリックしトークンを生成します。
3. 生成したトークンを拡張機能の設定の `API Token` に貼り付け、 `Submit` をクリックします。
4. ステータスが `Running` になっている事を確認したら完了です。もし `Stopping (...` になっていたら `Restart checker` をクリックすると再起動できます。
5. SMS を受信すると確認コードを探し、あれば SMS 全文を通知した上、コードのみクリップボードにコピーします。

## 対応しているコード

次の形式のコードに対応しています:

- `0000` ~ `000000`: 4-6 桁の数字
- `00-00` ~ `000-000`: 2-3 桁の数字 - 2-3 桁の数字
