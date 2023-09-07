This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## firebase のセットアップ
### npm install
```zsh
# ライブラリ全般をinstall
npm install 

# emulator立ち上げるためのtoolのinstall
npm install -g firebase-tools
```

### emulatorのインストール
```zsh
firebase init
```

### .env.localファイルを設置
なんらかの形で渡します

## Getting Started

開発用サーバーを立ち上げる:

```zsh
npm run dev
```

[http://localhost:3000](http://localhost:3000)をブラウザで開くとページの確認ができます

エミュレータ(開発の時に使うfirebase auth, firestoreなど)を立ち上げる:

```zsh
npm run firebase
```
[http://localhost:4000](http://localhost:4000)をブラウザで開くとエミュレータのGUI(ページ)が開けます

サーバを止める:

サーバをたてたターミナルで `ctrl + C`

## 構成について
### css
* CSS Modules & Sass
* 学習コストを下げるため, 一般的なcssを知っていればキャッチアップしやすいため
* globalなstyleのみsrc/stylesに配置, それ以外(pageとcomponents)は該当tsxと同階層に置く

### 状態管理
* jotai
* react useStateと似た使用感で使える, 

## 関連リンク
### デプロイ先(vercel)
[vercel](https://vercel.com/nanahiryu/mizu-portfolio)にデプロイ済み
一応本番環境(mainブランチに対応)とpreview環境(developブランチに対応)がある
今の所db(firestore)やストレージ(firebase storage)は本番環境とpreview環境ともに同じものを使っているので, 表示されるデータは連動している(あんまり良くないので今後変えて行きたい)
* 本番環境: https://mizu-portfolio.vercel.app
* preview環境: https://mizu-portfolio-develop.vercel.app

### db等(firebase)
[firebase console](https://console.firebase.google.com/u/0/project/mizu-portfolio/overview?hl=ja)から現在の本番環境のdb, auth, storageの状態が確認できる
* [Firestore database](https://console.firebase.google.com/u/0/project/mizu-portfolio/firestore/data/~2FphotoEvent~2FUI2bRIFK6P9G21euUNsT?hl=ja): dbの状態が確認できる
* [Authentication](https://console.firebase.google.com/u/0/project/mizu-portfolio/authentication/users?hl=ja): ログインユーザの追加、削除、パスワードの変更ができる
* [Storage](https://console.firebase.google.com/u/0/project/mizu-portfolio/storage/mizu-portfolio.appspot.com/files?hl=ja): アップロードした画像が確認できる

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
