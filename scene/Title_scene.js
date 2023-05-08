/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    
    タイトルシーン

  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
phina.define("Title_scene",
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



      /*-----=-----=-----=-----=-----=-----
          音量初期設定
        -----=-----=-----=-----=-----=-----*/
      SoundManager.setVolumeMusic(master_volume * BGM_volume / 10000);
      SoundManager.setVolume(master_volume * SE_volume / 10000);
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          描画グループ設定
        -----=-----=-----=-----=-----=-----*/
      this.タイトルロゴ = DisplayElement().addChildTo(this);
      this.説明テキスト = DisplayElement().addChildTo(this);
      this.音量バー = DisplayElement().addChildTo(this);
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          テキストオプション
        -----=-----=-----=-----=-----=-----*/
      let 文字サイズ = 64;
      let 文字色 = White;
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          タイトルロゴ
        -----=-----=-----=-----=-----=-----*/
      this.タイトル = new Label(
        {
          text: "隠れてゲーム",
          fontSize: 文字サイズ * 2,
          fill: 文字色
        }
      ).addChildTo(this.タイトルロゴ);
      this.タイトル.setPosition(CENTER_X, SCREEN_H * 0.2);
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          説明テキスト
        -----=-----=-----=-----=-----=-----*/
      this.テキスト = new Label(
        {
          text: "画面をタップでスタート",
          fontSize: 文字サイズ,
          fill: 文字色
        }
      ).addChildTo(this.説明テキスト);
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          音量バーオプション
        -----=-----=-----=-----=-----=-----*/
      this.音量設定中 = false;
      this.元の音量 = 0;

      this.音量バー幅 = SCREEN_W * 0.7;
      this.音量バー高 = 30;
      this.音量バー横位置 = CENTER_X + 75;
      this.音量バー縦基準位置 = SCREEN_H * 0.8;
      this.音量バー間隔 = 150;
      this.音量現在値アイコンサイズ = this.音量バー高 * 1.2;

      this.音量バー背景色 = darkGray;
      this.音量バー色 = Cyan;
      this.音量現在値アイコン色 = White;
      this.音量現在値アイコン縁色 = Gray;

      this.音量バーラベル余白 = 100;

      this.マスター音量バー幅 = this.音量バー幅 * master_volume / 100;
      this.BGM音量バー幅 = this.音量バー幅 * BGM_volume / 100;
      this.SE音量バー幅 = this.音量バー幅 * SE_volume / 100;
      /*-----=-----=-----=-----=-----=-----*/

      /*-----=-----=-----=-----=-----=-----
          音量バー定義
        -----=-----=-----=-----=-----=-----*/
      this.マスター音量ラベル = new Label(
        {
          text: "MAIN",
          fill: 文字色,
          fontSize: 文字サイズ
        }).addChildTo(this.音量バー);
      this.BGN音量ラベル = new Label(
        {
          text: "BGM",
          fill: 文字色,
          fontSize: 文字サイズ
        }).addChildTo(this.音量バー);
      this.SE音量ラベル = new Label(
        {
          text: "SE",
          fill: 文字色,
          fontSize: 文字サイズ
        }).addChildTo(this.音量バー);

      this.マスター音量バーベース = new RectangleShape(
        {
          width: this.音量バー幅,
          height: this.音量バー高,
          fill: this.音量バー背景色, strokeWidth: 0,
          cornerRadius: this.音量バー高 / 2
        }).addChildTo(this.音量バー);
      this.BGM音量バーベース = new RectangleShape(
        {
          width: this.音量バー幅,
          height: this.音量バー高,
          fill: this.音量バー背景色, strokeWidth: 0,
          cornerRadius: this.音量バー高 / 2
        }).addChildTo(this.音量バー);
      this.SE音量バーベース = new RectangleShape(
        {
          width: this.音量バー幅,
          height: this.音量バー高,
          fill: this.音量バー背景色, strokeWidth: 0,
          cornerRadius: this.音量バー高 / 2
        }).addChildTo(this.音量バー);

      this.マスター音量バー = new RectangleShape(
        {
          width: this.マスター音量バー幅 + this.音量バー高 / 2,
          height: this.音量バー高,
          fill: this.音量バー色, strokeWidth: 0,
          cornerRadius: this.音量バー高 / 2
        }).addChildTo(this.音量バー);
      this.BGM音量バー = new RectangleShape(
        {
          width: this.BGM音量バー幅 + this.音量バー高 / 2,
          height: this.音量バー高,
          fill: this.音量バー色, strokeWidth: 0,
          cornerRadius: this.音量バー高 / 2
        }).addChildTo(this.音量バー);
      this.SE音量バー = new RectangleShape(
        {
          width: this.SE音量バー幅 + this.音量バー高 / 2,
          height: this.音量バー高,
          fill: this.音量バー色, strokeWidth: 0,
          cornerRadius: this.音量バー高 / 2
        }).addChildTo(this.音量バー);

      this.マスター音量現在値 = new CircleShape(
        {
          radius: this.音量現在値アイコンサイズ / 2,
          fill: this.音量現在値アイコン色,
          stroke: this.音量現在値アイコン縁色, strokeWidth: 15
        }).addChildTo(this.音量バー);
      this.BGM音量現在値 = new CircleShape(
        {
          radius: this.音量現在値アイコンサイズ / 2,
          fill: this.音量現在値アイコン色,
          stroke: this.音量現在値アイコン縁色, strokeWidth: 15
        }).addChildTo(this.音量バー);
      this.SE音量現在値 = new CircleShape(
        {
          radius: this.音量現在値アイコンサイズ / 2,
          fill: this.音量現在値アイコン色,
          stroke: this.音量現在値アイコン縁色, strokeWidth: 15
        }).addChildTo(this.音量バー);
      /*-----=-----=-----=-----=-----=-----*/

      /*-----=-----=-----=-----=-----=-----
          音量バーラベル設定
        -----=-----=-----=-----=-----=-----*/
      this.マスター音量ラベル.setPosition(
        this.音量バー横位置 - this.音量バー幅 / 2 - this.音量バーラベル余白,
        this.音量バー縦基準位置 - this.音量バー間隔
      );

      this.BGN音量ラベル.setPosition(
        this.音量バー横位置 - this.音量バー幅 / 2 - this.音量バーラベル余白,
        this.音量バー縦基準位置
      );

      this.SE音量ラベル.setPosition(
        this.音量バー横位置 - this.音量バー幅 / 2 - this.音量バーラベル余白,
        this.音量バー縦基準位置 + this.音量バー間隔
      );
      /*-----=-----=-----=-----=-----=-----*/

      /*-----=-----=-----=-----=-----=-----
          音量バー位置設定
        -----=-----=-----=-----=-----=-----*/
      this.マスター音量バーベース.setPosition(
        this.音量バー横位置,
        this.音量バー縦基準位置 - this.音量バー間隔
      );
      this.BGM音量バーベース.setPosition(
        this.音量バー横位置,
        this.音量バー縦基準位置
      );
      this.SE音量バーベース.setPosition(
        this.音量バー横位置,
        this.音量バー縦基準位置 + this.音量バー間隔
      );
      /*-----=-----=-----=-----=-----=-----*/

      /*-----=-----=-----=-----=-----=-----
          音量バー設定
        -----=-----=-----=-----=-----=-----*/
      this.マスター音量バーベース.interactive = true;
      this.BGM音量バーベース.interactive = true;
      this.SE音量バーベース.interactive = true;

      this.マスター音量バーベース.on("pointstart", function (e)
      {
        pointer_x = e.pointer.x;

        let クリック位置 = e.pointer.x - self.マスター音量現在値.x;
        self.マスター音量バー幅 += クリック位置;

        if (self.マスター音量バー幅 < 0) self.マスター音量バー幅 = 0;
        if (self.マスター音量バー幅 > self.音量バー幅) self.マスター音量バー幅 = self.音量バー幅;

        self.元の音量 = self.マスター音量バー幅;
        self.音量設定中 = true;
      });
      this.BGM音量バーベース.on("pointstart", function (e)
      {
        pointer_x = e.pointer.x;

        let クリック位置 = e.pointer.x - self.BGM音量現在値.x;
        self.BGM音量バー幅 += クリック位置;

        if (self.BGM音量バー幅 < 0) self.BGM音量バー幅 = 0;
        if (self.BGM音量バー幅 > self.音量バー幅) self.BGM音量バー幅 = self.音量バー幅;

        self.元の音量 = self.BGM音量バー幅;
        self.音量設定中 = true;
      });
      this.SE音量バーベース.on("pointstart", function (e)
      {
        pointer_x = e.pointer.x;

        let クリック位置 = e.pointer.x - self.SE音量現在値.x;
        self.SE音量バー幅 += クリック位置;

        if (self.SE音量バー幅 < 0) self.SE音量バー幅 = 0;
        if (self.SE音量バー幅 > self.音量バー幅) self.SE音量バー幅 = self.音量バー幅;

        self.元の音量 = self.SE音量バー幅;
        self.音量設定中 = true;
      });

      this.マスター音量バーベース.on("pointmove", function (e)
      {
        pointer_move_x = e.pointer.x - pointer_x;
        self.マスター音量バー幅 = self.元の音量 + pointer_move_x;

        if (self.マスター音量バー幅 < 0) self.マスター音量バー幅 = 0;
        if (self.マスター音量バー幅 > self.音量バー幅) self.マスター音量バー幅 = self.音量バー幅;

        master_volume = 100 * self.マスター音量バー幅 / self.音量バー幅;
        master_volume = Math.floor(master_volume);

        if (master_volume < 0) master_volume = 0;
        if (master_volume > 100) master_volume = 100;

        SoundManager.setVolumeMusic(master_volume * BGM_volume / 10000);
        SoundManager.setVolume(master_volume * SE_volume / 10000);
      });
      this.BGM音量バーベース.on("pointmove", function (e)
      {
        pointer_move_x = e.pointer.x - pointer_x;
        self.BGM音量バー幅 = self.元の音量 + pointer_move_x;

        if (self.BGM音量バー幅 < 0) self.BGM音量バー幅 = 0;
        if (self.BGM音量バー幅 > self.音量バー幅) self.BGM音量バー幅 = self.音量バー幅;

        BGM_volume = 100 * self.BGM音量バー幅 / self.音量バー幅;
        BGM_volume = Math.floor(BGM_volume);

        if (BGM_volume < 0) BGM_volume = 0;
        if (BGM_volume > 100) BGM_volume = 100;

        SoundManager.setVolumeMusic(master_volume * BGM_volume / 10000);
      });
      this.SE音量バーベース.on("pointmove", function (e)
      {
        pointer_move_x = e.pointer.x - pointer_x;
        self.SE音量バー幅 = self.元の音量 + pointer_move_x;

        if (self.SE音量バー幅 < 0) self.SE音量バー幅 = 0;
        if (self.SE音量バー幅 > self.音量バー幅) self.SE音量バー幅 = self.音量バー幅;

        SE_volume = 100 * self.SE音量バー幅 / self.音量バー幅;
        SE_volume = Math.floor(SE_volume);

        if (SE_volume < 0) SE_volume = 0;
        if (SE_volume > 100) SE_volume = 100;

        SoundManager.setVolume(master_volume * SE_volume / 10000);
      });

      this.マスター音量バーベース.on("pointend", function (e)
      {
        master_volume = 100 * self.マスター音量バー幅 / self.音量バー幅;
        master_volume = Math.floor(master_volume);

        if (master_volume < 0) master_volume = 0;
        if (master_volume > 100) master_volume = 100;

        SoundManager.setVolumeMusic(master_volume * BGM_volume / 10000);
        SoundManager.setVolume(master_volume * SE_volume / 10000);
      });
      this.BGM音量バーベース.on("pointend", function (e)
      {
        BGM_volume = 100 * self.BGM音量バー幅 / self.音量バー幅;
        BGM_volume = Math.floor(BGM_volume);

        if (BGM_volume < 0) BGM_volume = 0;
        if (BGM_volume > 100) BGM_volume = 100;

        SoundManager.setVolumeMusic(master_volume * BGM_volume / 10000);
      });
      this.SE音量バーベース.on("pointend", function (e)
      {
        SE_volume = 100 * self.SE音量バー幅 / self.音量バー幅;
        SE_volume = Math.floor(SE_volume);

        if (SE_volume < 0) SE_volume = 0;
        if (SE_volume > 100) SE_volume = 100;

        SoundManager.setVolume(master_volume * SE_volume / 10000);
      });
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          タップでゲームスタート
        -----=-----=-----=-----=-----=-----*/
      this.on("pointend", function ()
      {
        if (this.音量設定中)
        {
          this.音量設定中 = false;
        }
        else
        {
          this.exit("メイン");
        }
        SoundManager.play("クリック");
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
      bgm_check();



      /*-----=-----=-----=-----=-----=-----
          説明文アニメーション
        -----=-----=-----=-----=-----=-----*/
      this.テキスト.setPosition(
        CENTER_X,
        CENTER_Y + (this.テキスト.fontSize / 4) * Math.sin(time / (app.fps * 2) / (Math.PI * 2))
      );
      /*-----=-----=-----=-----=-----=-----*/



      /*-----=-----=-----=-----=-----=-----
          音量バー幅設定
        -----=-----=-----=-----=-----=-----*/
      this.マスター音量バー.width = this.マスター音量バー幅 + this.音量バー高 / 2;
      this.BGM音量バー.width = this.BGM音量バー幅 + this.音量バー高 / 2;
      this.SE音量バー.width = this.SE音量バー幅 + this.音量バー高 / 2;
      /*-----=-----=-----=-----=-----=-----*/

      /*-----=-----=-----=-----=-----=-----
          音量バー位置設定
        -----=-----=-----=-----=-----=-----*/
      this.マスター音量バー.setPosition(
        this.音量バー横位置 - this.音量バー幅 / 2 + this.マスター音量バー.width / 2,
        this.音量バー縦基準位置 - this.音量バー間隔
      );
      this.BGM音量バー.setPosition(
        this.音量バー横位置 - this.音量バー幅 / 2 + this.BGM音量バー.width / 2,
        this.音量バー縦基準位置
      );
      this.SE音量バー.setPosition(
        this.音量バー横位置 - this.音量バー幅 / 2 + this.SE音量バー.width / 2,
        this.音量バー縦基準位置 + this.音量バー間隔
      );
      /*-----=-----=-----=-----=-----=-----*/

      /*-----=-----=-----=-----=-----=-----
          音量バー現在値位置設定
        -----=-----=-----=-----=-----=-----*/
      this.マスター音量現在値.setPosition(
        this.音量バー横位置 - this.音量バー幅 / 2 + this.マスター音量バー幅,
        this.音量バー縦基準位置 - this.音量バー間隔
      );
      this.BGM音量現在値.setPosition(
        this.音量バー横位置 - this.音量バー幅 / 2 + this.BGM音量バー幅,
        this.音量バー縦基準位置
      );
      this.SE音量現在値.setPosition(
        this.音量バー横位置 - this.音量バー幅 / 2 + this.SE音量バー幅,
        this.音量バー縦基準位置 + this.音量バー間隔
      );
      /*-----=-----=-----=-----=-----=-----*/
    }
    /*---=---=---=---=---=---=---=---=---=---=---=---=---=---=---=---*/
  }
);
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/

