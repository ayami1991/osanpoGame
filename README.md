# おさんぽアプリ (osanpo)

「おさんぽアプリ」は、Vue.js と Vite を使用して構築されたシンプルなゲーム。ボタンを押してランダムイベントを発生させ、所持金を増減させるシステム。最終的な所持金を競うことが目的である。
作成者のアプリ開発のリハビリとして製作。(ブランク約3か月)

## 製作工数
- 約15.0h

## バージョン情報
- **アーリーアクセス版**: v0.5 2024.11.6

## 目的
このアプリは、アプリ開発のリハビリとして、Vue.js と JavaScript を使ってシンプルなゲームアプリを制作することを目的としています。

## 機能
- **イベント発生**: ボタンを押すとランダムイベントが発生し、所持金が増えたり減ったりします。
- **所持金の変動**: 各イベントに応じて所持金が増減し、所持金の変化を楽しめます。
- **ゲーム終了時の所持金**: 最終的な所持金を競う要素があります。

## 改善箇所
- **2024.11.6**: 所持金がマイナスになる不具合修正、所持金がゼロの際に所持金を失うイベントの調整が必要

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize Configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
