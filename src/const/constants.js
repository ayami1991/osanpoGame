const stories = {
    0: { disc: "今日はいい天気なので散歩をしよう", amount: 0 },
    1: { disc: "犬のうんちを踏んだ。ショックで500円落とした", amount: -500 },
    2: { disc: "軽くジョギングをしてみた。ポケットに穴があいていた。3000円落とした。", amount: -3000 },
    3: { disc: "500円拾った。ラッキー", amount: 500 },
    4: { disc: "親戚のおじさんにあった。お小遣いを1000円もらった。", amount: 1000 },
    5: { disc: "不良にたかられた。6000円カツアゲされた", amount: -6000 },
    6: { disc: "暇なので隙間バイトをした7000円ゲットした", amount: 7000 },
    7: { disc: "なぜかいい気分になった。1000円募金した。", amount: -1000 },
    8: { disc: "ロトシックスが当たった。50000円ゲットした", amount: 50000 },
    9: { disc: "財布を丸ごと落とした。所持金をすべて失った", amount: "all" }, // すべて失う場合に特殊値を設定
};

const battleStories = [
    { id: 0, disc: "たんぱんこぞうがバトルを仕掛けてきた！", money: 3000 },
    { id: 1, disc: "やまおとこがバトルを仕掛けてきた！", money: 5000 },
    { id: 2, disc: "ジェントルマンがバトルを仕掛けてきた！", money: 8000 },
]

const constants = {
    stories, battleStories
}

export default constants;