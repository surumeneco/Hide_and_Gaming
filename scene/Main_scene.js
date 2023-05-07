/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    
    メインシーン

  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
phina.define("Main_scene",
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



      //操作説明フラグ
      this.is_操作説明ing = true;

      //隠れているフラグ
      this.is_hiding = false;
      score = 0;

      //イベントフラグ
      this.フラグ = "無し";
      this.イベント発生時間 = 0;



      /*-----=-----=-----=-----=-----=-----
          描画グループ設定
        -----=-----=-----=-----=-----=-----*/
      this.スコア関係 = DisplayElement().addChildTo(this);
      this.画像 = DisplayElement().addChildTo(this);
      this.操作説明 = DisplayElement().addChildTo(this);
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          テキストオプション
        -----=-----=-----=-----=-----=-----*/
      let 左右余白 = 15 * 9;
      let 上下余白 = 15 * 16;
      let ウィンドウ幅 = SCREEN_W - 左右余白 * 2;
      let ウィンドウ高 = SCREEN_H - 上下余白 * 2;
      let 文字サイズ = 64;
      let 文字色 = White;
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          操作説明ウィンドウ設定
        -----=-----=-----=-----=-----=-----*/
      this.操作説明ウィンドウ = RectangleShape(
        {
          width: ウィンドウ幅, height: ウィンドウ高,
          fill: darkGray,
          stroke: White,
          strokeWidth: 10,
          cornerRadius: 15
        }
      ).addChildTo(this.操作説明);
      this.操作説明ウィンドウ.setPosition(CENTER_X, CENTER_Y);
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          操作説明テキスト設定
        -----=-----=-----=-----=-----=-----*/
      this.操作説明見出し = Label(
        {
          text: "操作説明",
          fontSize: 文字サイズ * 1.5,
          fill: 文字色
        }
      ).addChildTo(this.操作説明);
      this.操作説明見出し.setPosition(CENTER_X, 上下余白 + 文字サイズ * 1.5);

      this.操作説明テキスト = Label(
        {
          text: "",
          fontSize: 文字サイズ,
          fill: 文字色
        }
      ).addChildTo(this.操作説明);
      this.操作説明テキスト.setPosition(CENTER_X, CENTER_Y);
      this.操作説明テキスト.text += "画面を押すと隠れる！\n";
      this.操作説明テキスト.text += "\n";
      this.操作説明テキスト.text += "親にバレないように\n";
      this.操作説明テキスト.text += "ゲームをし続けよう！\n";
      this.操作説明テキスト.text += "\n";
      this.操作説明テキスト.text += "\n";
      this.操作説明テキスト.text += "タップでゲームスタート";
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          スコア表示設定
        -----=-----=-----=-----=-----=-----*/
      this.スコア = Label(
        {
          text: "",
          fontSize: 文字サイズ,
          fill: 文字色
        }
      );
      this.スコア.setPosition(CENTER_X, SCREEN_H / 5);
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          仮UI
        -----=-----=-----=-----=-----=-----*/
      this.仮プレイヤー = Label(
        {
          text: "ゲーム中",
          fontSize: 文字サイズ * 1.5,
          fill: 文字色
        }
      ).addChildTo(this.画像);
      this.仮プレイヤー.setPosition(SCREEN_W * 0.4, SCREEN_H * 0.6);

      this.仮ドア = Label(
        {
          text: "閉まってる",
          fontSize: 文字サイズ * 1.5,
          fill: 文字色
        }
      ).addChildTo(this.画像);
      this.仮ドア.setPosition(SCREEN_W * 0.6, SCREEN_H * 0.4);
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          タップ操作
        -----=-----=-----=-----=-----=-----*/
      this.on("pointstart", function ()
      {
        this.is_hiding = true;
        this.仮プレイヤー.text = "寝たフリ";
      });

      this.on("pointend", function ()
      {
        this.is_hiding = false;
        this.仮プレイヤー.text = "ゲーム中";

        if (this.is_操作説明ing)
        {
          this.操作説明.children.clear();
          this.is_操作説明ing = false;
          this.スコア.addChildTo(this.スコア関係);
        }
      });
      /*-----=-----=-----=-----=-----=-----*/
    },
    /*---=---=---=---=---=---=---=---=---=---=---=---=---=---=---=---*/



    /*---=---=---=---=---=---=---=---=---=---=---=---=---=---=---=---
      
        毎フレーム処理

      ---=---=---=---=---=---=---=---=---=---=---=---=---=---=---=---*/
    update: function (app)
    {
      always(app);

      let transition_flag = Math.random() * 10000;

      if (!this.is_操作説明ing)
      {
        switch (this.フラグ)
        {
          default:
            if (transition_flag < 1000 / app.fps)
            {
              this.フラグ = "イベント発生";
              this.イベント発生時間 = time;
              this.仮ドア.text = "ノック";
            }
            break;
          case "イベント発生":
            if (time - this.イベント発生時間 >= 500)
            {
              this.フラグ = "母親登場";
              this.イベント発生時間 = time;
              this.仮ドア.text = "母親「ガチャッ」";
            }
            break;
          case "母親登場":
            if (time - this.イベント発生時間 >= 3000)
            {
              this.フラグ = "無し";
              this.仮ドア.text = "閉まってる";
            }
            if (!this.is_hiding)
            {
              score = Math.floor(score * 10 / app.fps);
              this.exit("ゲームオーバー");
            }
            break;
        }

        if (!this.is_hiding) score++;
      }

      this.スコア.text = Math.floor(score * 10 / app.fps);
    }
    /*---=---=---=---=---=---=---=---=---=---=---=---=---=---=---=---*/
  }
);
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/

