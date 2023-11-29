
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
    }

    // シーン初期化処理
    create() {
         // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(D_WIDTH/2, D_HEIGHT/2, 'background');
        this.text1 = this.add.text(10, 10, 'Scene 1').setFontSize(32).setColor('#ff0');
        this.text2 = this.add.text(600, 400, 'MyWorld').setFontSize(32).setColor('#ff0');
        this.text3 = this.add.text(100, 50, '').setFontSize(32).setColor('#ff0');
        const player1 = this.physics.add.sprite(400, 200, 'taro');
        this.player1=player1;
        const player2 = this.physics.add.sprite(500, 150, 'jiro');
        this.player2 = player2
        //this.player.angle=0;
        ///WASDキーを検知できるようにする

        this.keys = {};
        this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    wasd_move(keys, object){
        if(keys.keyS.isDown){  //Sが押されている時
            this.text3 =this.add.text(100, 50, 'Hey!').setFontSize(32).setColor('#ff0');
        }else if(keys.keyA.isDown){  //Aが押されている時
            this.text3 =this.add.text(100, 50, 'Hello!').setFontSize(32).setColor('#ff0');
        }else if(keys.keyD.isDown){ //Dが押されている時
            this.text3 =this.add.text(100, 50, '').setFontSize(32).setColor('#ff0');
        }else{
            object.setVelocity(0,0);// 横方向の速度を0
        }

    }
    

  // 毎フレーム実行される繰り返し処理
    update() {
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
       this.player1.x -= 5;// 左方向に移動
       this.player2.x += 5;// 左方向に移動
       } else if (cursors.right.isDown) {
       this.player1.x += 5;// 右方向に移動
       this.player2.x -= 5;// 右方向に移動
       }
       this.wasd_move(this.keys, this.player2);
    }

}