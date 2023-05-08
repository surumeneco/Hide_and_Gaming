/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    グローバル変数

  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/

//phinaのグローバライズ
phina.globalize();

//ロード用のパス(loadingからのローカル)
const path = "../../";

//ウィンドウサイズを取得
var SCREEN_W = 1080;
var SCREEN_H = 1920;

var CENTER_X = SCREEN_W / 2;
var CENTER_Y = SCREEN_H / 2;

//音量設定
var master_volume = 25;
var BGM_volume = 50;
var SE_volume = 100;

//ポインタ管理変数
var pointer_x, pointer_move_x;

var time = 0;

var score = 0;

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/



/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    関数定義

  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/

//常駐関数
const always = function (app)
{
  time = app.currentTime;
};

//BGMチェック
const bgm_check = function ()
{
  if (SoundManager.currentMusic == null)
  {
    SoundManager.playMusic("タイトル");
  }
};

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/

