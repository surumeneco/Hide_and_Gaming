/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    
    ゲームオーバーシーン

  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
phina.define("Gameover_scene",
  {
    /*---=---=---=---=---=---=---=---=---=---=---=---=---=---=---=---
      
        コンストラクタ

      ---=---=---=---=---=---=---=---=---=---=---=---=---=---=---=---*/
    superClass: "DisplayScene",
    init: function (option)
    {
      this.superInit(option);

      //thisが別のものを指す時に使えるように
      var self = this;

      //背景色
      this.backgroundColor = Black;

      //BGM再生
      SoundManager.playMusic("ゲームオーバー");



      /*-----=-----=-----=-----=-----=-----
          描画グループ設定
        -----=-----=-----=-----=-----=-----*/
      this.スコア関係 = DisplayElement().addChildTo(this);
      this.テキスト = DisplayElement().addChildTo(this);
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          テキストオプション
        -----=-----=-----=-----=-----=-----*/
      let 文字サイズ = 64;
      let 文字色 = White;
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          見出し
        -----=-----=-----=-----=-----=-----*/
      this.タイトル = new Label(
        {
          text: "バレてしまった……",
          fontSize: 文字サイズ * 1.5,
          fill: 文字色
        }
      ).addChildTo(this.テキスト);
      this.タイトル.setPosition(CENTER_X, SCREEN_H * 0.2);
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          スコア表示
        -----=-----=-----=-----=-----=-----*/
      this.スコア = new Label(
        {
          text: "スコア：" + score,
          fontSize: 文字サイズ,
          fill: 文字色
        }
      ).addChildTo(this.スコア関係);
      this.スコア.setPosition(CENTER_X, SCREEN_H * 0.4);
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          ボタン表示
        -----=-----=-----=-----=-----=-----*/
      this.タイトル = new Button(
        {
          text: "タイトルへ",
          fontSize: 文字サイズ,
          width: 400, height: 150, cornerRadius: 0,
          fill: darkGray,
          stroke: lightGray, strokeWidth: 15,
        }
      ).addChildTo(this.スコア関係);
      this.タイトル.on("pointend", function ()
      {
        SoundManager.stopMusic();
        self.exit("タイトル");
      });
      this.タイトル.setPosition(CENTER_X, SCREEN_H * 0.6);

      this.リスタート = new Button(
        {
          text: "もう一度",
          fontSize: 文字サイズ,
          width: 400, height: 150, cornerRadius: 0,
          fill: darkGray,
          stroke: lightGray, strokeWidth: 15,
        }
      ).addChildTo(this.スコア関係);
      this.リスタート.on("pointend", function ()
      {
        SoundManager.stopMusic();
        self.exit("メイン");
      });
      this.リスタート.setPosition(CENTER_X, SCREEN_H * 0.7);
      /*-----=-----=-----=-----=-----=-----*/
    },
    /*---=---=---=---=---=---=---=---=---=---=---=---=---=---=---=---*/



    /*---=---=---=---=---=---=---=---=---=---=---=---=---=---=---=---
      
        毎フレーム処理

      ---=---=---=---=---=---=---=---=---=---=---=---=---=---=---=---*/
    update: function (app)
    {
      always(app);
    }
    /*---=---=---=---=---=---=---=---=---=---=---=---=---=---=---=---*/
  }
);
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/

