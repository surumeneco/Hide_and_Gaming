/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    中央処理

  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
phina.main(function ()
{
  var app = GameApp({
    //画面サイズ設定
    width: SCREEN_W,
    height: SCREEN_H,
    fit: true,

    //アセット読み込み
    // assets: ASSETS,

    //fps設定
    fps: 60,

    startLabel: "タイトル",
    scenes:
      [
        {
          label: "タイトル",
          className: "Title_scene",
        },
        {
          label: "メイン",
          className: "Main_scene",
        },
        {
          label: "ゲームオーバー",
          className: "Gameover_scene",
        }
      ]
  });
  app.run();
});
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/

