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

//cookie
var load_type = window.performance.navigation.type;

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

//Cookieの書き込み
function set_cookies()
{
  let データ = "";

  let 保存日数 = 30;
  let 保存期間 = new Date();
  保存期間.setTime(保存期間.getTime() + 1000 * 60 * 60 * 24 * 保存日数);
  保存期間.toUTCString();

  データ = "Master=" + master_volume + ";";
  データ += "expires=" + 保存期間 + ";";
  document.cookie = データ;

  データ = "BGM=" + BGM_volume + ";";
  データ += "expires=" + 保存期間 + ";";
  document.cookie = データ;

  データ = "SE=" + SE_volume + ";";
  データ += "expires=" + 保存期間 + ";";
  document.cookie = データ;
}

//Cookieの削除
function delete_cookies()
{
  データ = "Master=;max-age=0";
  cookie = データ;
  データ = "BGM=;max-age=0";
  cookie = データ;
  データ = "SE=;max-age=0";
  cookie = データ;
}

//Cookieの読み込み
function get_cookies()
{
  if (document.cookie != "")
  {
    let data = document.cookie.split(";");
    let splited_data;

    data.forEach(
      function (key_n_value)
      {
        splited_data = key_n_value.split("=");
        splited_data[0] = splited_data[0].trim();
        switch (splited_data[0])
        {
          case "Master":
            master_volume = splited_data[1];
            break;
          case "BGM":
            BGM_volume = splited_data[1];
            break;
          case "SE":
            SE_volume = splited_data[1];
            break;
        }
      }
    );

    SoundManager.setVolumeMusic(master_volume * BGM_volume / 10000);
    SoundManager.setVolume(master_volume * SE_volume / 10000);
  }
}

//リロード時データ読み込み
function reload_check(app)
{
  if (window.performance)
  {
    if (load_type == 1)
    {
      get_cookies();
      load_type = -1;
      return true;
    }
  }
  return false;
}

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/

