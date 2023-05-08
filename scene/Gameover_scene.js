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
      this.クレジット = DisplayElement().addChildTo(this);
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
        SoundManager.play("クリック");
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
        SoundManager.play("クリック");
      });
      this.リスタート.setPosition(CENTER_X, SCREEN_H * 0.7);
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          クレジット設定
        -----=-----=-----=-----=-----=-----*/
      文字サイズ = 32;
      文字色 = White;
      var クレジット位置 = SCREEN_H - 25;
      /*-----=-----=-----=-----=-----=-----*/

      /*-----=-----=-----=-----=-----=-----
          クレジット表示
        -----=-----=-----=-----=-----=-----*/
      var bgm_credit1 = Label("BGM:DOVA-SYNDROME").addChildTo(this.クレジット);
      bgm_credit1.fill = 文字色;
      bgm_credit1.fontSize = 文字サイズ;
      bgm_credit1.align = "right";
      bgm_credit1.baseline = "bottom";
      bgm_credit1.setPosition(SCREEN_W - 25, クレジット位置 - 文字サイズ * 3.9);
      /*-----=-----=-----=-----=-----=-----*/
      var bgm_credit2 = Label("    MusMus       ").addChildTo(this.クレジット);
      bgm_credit2.fill = 文字色;
      bgm_credit2.fontSize = 文字サイズ;
      bgm_credit2.align = "right";
      bgm_credit2.baseline = "bottom";
      bgm_credit2.setPosition(SCREEN_W - 25, クレジット位置 - 文字サイズ * 2.6);
      /*-----=-----=-----=-----=-----=-----*/
      var se_credit = Label("SE:効果音ラボ   ").addChildTo(this.クレジット);
      se_credit.fill = 文字色;
      se_credit.fontSize = 文字サイズ;
      se_credit.align = "right";
      se_credit.baseline = "bottom";
      se_credit.setPosition(SCREEN_W - 25, クレジット位置 - 文字サイズ * 1.3);
      /*-----=-----=-----=-----=-----=-----*/
      var my_credit = Label("制作:スルメねこ。 ").addChildTo(this.クレジット);
      my_credit.fill = 文字色;
      my_credit.fontSize = 文字サイズ;
      my_credit.align = "right";
      my_credit.baseline = "bottom";
      my_credit.setPosition(SCREEN_W - 25, クレジット位置);
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

