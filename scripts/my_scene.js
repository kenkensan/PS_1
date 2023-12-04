
// MyScene1クラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MyScene extends Phaser.Scene {

    // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
    constructor() {
        super({ key: 'MyScene', active: true });
    }

    // シーンの事前読み込み処理
    preload() {
         // 画像の読み込み(使用する時の名前, パス)
        this.load.image('background', 'assets/background.png');
        this.load.image('taro', 'assets/taro.png');
        this.load.image('jiro', 'assets/kani.png');
        this.load.image('hanako', 'assets/hanako.png');
    }

    // シーン初期化処理
    create() {
        //タイマー
        this._timeCounter = 0;  
        //残り時間
        this._leftTime = 0;
        this.countdounTimer = true;
         // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(D_WIDTH/2, D_HEIGHT/2, 'background');
        this.text1 = this.add.text(10, 10, 'Scene 1').setFontSize(32).setColor('#ff0');
        this.text2 = this.add.text(600, 400, 'MyWorld').setFontSize(32).setColor('#ff0');
        const player1 = this.physics.add.sprite(400, 200, 'taro');
        this.player1=player1;
        // const player2 = this.physics.add.sprite(500, 150, 'jiro');
        // this.player2 = player2;
        
        //this.player.angle=0;
        ///WASDキーを検知できるようにする

        let physics = this.physics.add.group();// 動く物体をまとめる
        let  randx = Phaser.Math.Between(200, 400);
        let  randy = Phaser.Math.Between(100, 200);
        this.hanako= physics.create(randx, randy, 'hanako');

        this.keys = {};
        this.keys.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.gameClear=false;
         // hanakoに衝突したら実行する
         this.physics.add.overlap(player1, physics, collectHanako, null, this);
         function collectHanako(p,hanako){  
            // 物理演算(ボディ)の無効化 (非アクティブ化, 非表示)
             this.text3 = this.add.text(100, 150, '痛い!').setFontSize(32).setColor('#ff0');
             hanako.disableBody(false, true);
             hanako.destroy();
             this.gameClear=true;
 
         }
    }

    wasd_move(keys,object){
        if(keys.keyS.isDown){  //Sが押されている時
            object = this.add.text(100, 50, 'Hey!').setFontSize(32).setColor('#ff0');
        }else if(keys.keyA.isDown){  //Aが押されている時
            this.object = this.add.text(100, 50, 'Hello!').setFontSize(32).setColor('#ff0');
        }else if(keys.keyD.isDown){ //Dが押されている時
            object.destroy();
        // }else if(keys.keyW.isDown){
        //     let  randx = Phaser.Math.Between(100, 400); 
        //     this.physics.add.sprite(randx, 100, 'hanako');
        }

    }
    
    countdown(delta){
        // 毎フレーム事にタイマーを更新
        this._timeCounter += delta;
        // _timeCounterが1000になった1秒
        if(this._timeCounter > 1000) {
            // 1000ミリ秒経過したのでカウンターをリセット
            this._timeCounter = 0;
            // 残り時間を減らす
            this._leftTime ++;
        }
        if(this._leftTime %3 == 0 && this._leftTime != 0) {
            this.quitHanako();

        }

    }
  // 花子の表示処理

  quitHanako(){
    if(this.hanako != null){
       this.hanako.destroy();
    }
        let physics = this.physics.add.group();
        let  randx = Phaser.Math.Between(200, 400);
        let  randy = Phaser.Math.Between(100, 200);
        this.hanako= physics.create(randx, randy, 'hanako');

        
        
        
        this.countdounTimer= false;



    return;

}
  // ゲームクリア処理

  quitGame(){
    this.add.text(400,200, 'Taro Win!', { fontSize: '32px', fill: '#CDC' });
      //物理エンジンを止める
    this.physics.pause();
    return;
}
  // 毎フレーム実行される繰り返し処理
    update(time, delta) {
        //  if (this.player.x >= D_WIDTH - 100) this.player_direction = -1;
        //  if (this.player.x <= 100) this.player_direction = 1;
        //   プレイヤーの移動

        //  if (this.player_direction == 1) {
        //     this.player.setVelocity(20, 20);
            
        //  } else {
        //      this.player.setVelocity(-20, -20);

        //   }
        // this.player.angle += 5;
        // プレイヤーの移動

        // if (this.player_direction == 1) {
        //     this.player.x+=5;
        //     this.player.y-=5;
            
        // }
        // if(this.player.x >D_WIDTH-100 || this.player.y >D_HEIGHT-100){
        //     this.player.x=400;
        //     this.player.y=250;
        // }
       // キーボードの情報を取得
       let cursors = this.input.keyboard.createCursorKeys();
       if (cursors.left.isDown) {
        this.player1.setVelocityX(-30);
       //this.player2.x += 5;// 左方向に移動
       } else if (cursors.right.isDown) {
        this.player1.setVelocityX(30);
       //this.player2.x -= 5;// 右方向に移動
       }else if (cursors.up.isDown) {
        this.player1.setVelocityY(-30);
        }else if (cursors.down.isDown) {
            this.player1.setVelocityY(30);
        }
       this.wasd_move(this.keys,this.text2);
       if(this.countdounTimer) this.countdown(delta);
       if(this.gameClear==true){
        this.quitGame();
       }
    }

}