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
      this.操作説明見出し.setPosition(CENTER_X, 上下余白 + 文字サイズ * 2);

      this.操作説明テキスト = Label(
        {
          text: "",
          fontSize: 文字サイズ,
          fill: 文字色
        }
      ).addChildTo(this.操作説明);
      this.操作説明テキスト.setPosition(CENTER_X, CENTER_Y);
      this.操作説明テキスト.text += "画面を押している間\n";
      this.操作説明テキスト.text += "布団に隠れる！\n";
      this.操作説明テキスト.text += "\n";
      this.操作説明テキスト.text += "母親にバレないように\n";
      this.操作説明テキスト.text += "ゲームをしよう！\n";
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
        SoundManager.playMusic("寝たフリ");
      });

      this.on("pointend", function ()
      {
        this.is_hiding = false;
        this.仮プレイヤー.text = "ゲーム中";
        SoundManager.playMusic("ゲーム中");

        if (this.is_操作説明ing)
        {
          this.操作説明.children.clear();
          this.is_操作説明ing = false;
          this.スコア.addChildTo(this.スコア関係);
          SoundManager.play("クリック");
        }
      });
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          イベント発生
        -----=-----=-----=-----=-----=-----*/
      this.イベント = function ()
      {
        let flag = Math.random() * 100;
        if (flag < 30)
        {
          this.フラグ = "普通の母親";
          this.イベント発生時間 = time;
          SoundManager.play("2回ノック");
        }
        else if (flag < 45)
        {
          this.フラグ = "早い母親";
          this.イベント発生時間 = time;
          SoundManager.play("5回ノック");
        }
        else if (flag < 50)
        {
          this.フラグ = "めっちゃ早い母親";
          this.イベント発生時間 = time;
          SoundManager.play("2回ノック");
        }
        else if (flag < 65)
        {
          this.フラグ = "遅い母親";
          this.イベント発生時間 = time;
          SoundManager.play("2回ノック");
        }
        else if (flag < 85)
        {
          this.フラグ = "父親";
          this.イベント発生時間 = time;
          SoundManager.play("2回ノック");
        }
        else if (flag < 95)
        {
          this.フラグ = "猫";
          this.イベント発生時間 = time;
          SoundManager.play("5回ノック");
        }
        else if (flag < 100)
        {
          this.フラグ = "物音";
          this.イベント発生時間 = time;
          SoundManager.play("2回ノック");
        }
      };
      /*-----=-----=-----=-----=-----=-----*/
    },
    /*---=---=---=---=---=---=---=---=---=---=---=---=---=---=---=---*/



    /*---=---=---=---=---=---=---=---=---=---=---=---=---=---=---=---
      
        毎フレーム処理

      ---=---=---=---=---=---=---=---=---=---=---=---=---=---=---=---*/
    update: function (app)
    {
      always(app);
      bgm_check();

      let transition_flag = Math.random() * 100;

      if (!this.is_操作説明ing)
      {
        switch (this.フラグ)
        {
          default:
            if (transition_flag < 20 / app.fps)
            {
              this.フラグ = "イベント発生";
            }
            break;
          case "イベント発生":
            this.イベント();
            break;
          case "普通の母親":
            if (time - this.イベント発生時間 >= 1500)
            {
              this.フラグ = "母親登場";
              this.イベント発生時間 = time;
              this.仮ドア.text = "母親「ガチャッ」";
              SoundManager.play("ドアを開ける");
            }
            break;
          case "早い母親":
            if (time - this.イベント発生時間 >= 1000)
            {
              this.フラグ = "母親登場";
              this.イベント発生時間 = time;
              this.仮ドア.text = "母親「ガチャッ」";
              SoundManager.play("ドアを開ける");
            }
            break;
          case "めっちゃ早い母親":
            if (time - this.イベント発生時間 >= 750)
            {
              this.フラグ = "母親登場";
              this.イベント発生時間 = time;
              this.仮ドア.text = "母親「ガチャッ」";
              SoundManager.play("ドアを開ける");
            }
            break;
          case "遅い母親":
            if (time - this.イベント発生時間 >= 3000)
            {
              this.フラグ = "母親登場";
              this.イベント発生時間 = time;
              this.仮ドア.text = "母親「ガチャッ」";
              SoundManager.play("ドアを開ける");
            }
            break;
          case "父親":
            if (time - this.イベント発生時間 >= 1500)
            {
              this.フラグ = "父親登場";
              this.イベント発生時間 = time;
              this.仮ドア.text = "父親「バレんなよ」";
              SoundManager.play("ドアを開ける");
            }
            break;
          case "猫":
            if (time - this.イベント発生時間 >= 1000)
            {
              this.フラグ = "猫登場";
              this.イベント発生時間 = time;
              this.仮ドア.text = "猫「にゃー」";
              SoundManager.play("ドアを開ける");
            }
            break;
          case "母親登場":
            if (time - this.イベント発生時間 >= 3000)
            {
              this.フラグ = "無し";
              this.仮ドア.text = "閉まってる";
              SoundManager.play("ドアを閉める");
            }
            if (!this.is_hiding)
            {
              score = Math.floor(score * 10 / app.fps);
              this.exit("ゲームオーバー");
            }
            break;
          case "父親登場":
            if (time - this.イベント発生時間 >= 5000)
            {
              this.フラグ = "無し";
              this.仮ドア.text = "閉まってる";
              SoundManager.play("ドアを閉める");
            }
          case "猫登場":
            if (time - this.イベント発生時間 >= 3000)
            {
              this.フラグ = "無し";
              this.仮ドア.text = "閉まってる";
              SoundManager.play("ドアを閉める");
            }
          case "物音":
            if (time - this.イベント発生時間 >= 5000)
            {
              this.フラグ = "無し";
              this.仮ドア.text = "閉まってる";
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

