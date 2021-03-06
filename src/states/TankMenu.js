import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default class TankMenu extends Phaser.State {
  constructor () {
    super();
    this.x = 32;
    this.y = 80;
  }

  init () {
    this.titleText = this.make.text(this.world.centerX, 100, 'Tank Destruction\nPress <esc> to exit', {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText2 = this.make.text(this.world.centerX, 500, 'Testing...', {
      font: 'bold 60pt TheMinion',
      fill: 'red',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  }

  preload () {
    this.load.image('startButton', 'assets/Menu/power.png');
    this.load.image('stopButton', 'assets/Menu/cancel.png');
    this.load.image('background', 'assets/Menu/paperBG.jpg');
    this.load.audio('music', 'assets/audio/QuantumLap.mp3');
    this.load.image('tank', 'assets/Menu/tank.png');

  }

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.add.sprite(0, 0, 'background');

    this.add.existing(this.titleText);
    this.add.existing(this.titleText2);

    this.music = this.add.audio('music');
    this.music.play();

    this.tank = this.add.sprite(100, 400, 'tank');
    this.physics.arcade.enable(this.tank);
    this.tank.body.immovable = true;
    this.tank.body.collideWorldBounds = true;

    this.stopButton2 = this.add.sprite(400, 400, 'stopButton');
    this.physics.arcade.enable(this.stopButton2);
    this.stopButton2.body.immovable = true;
    this.stopButton2.body.collideWorldBounds = true;

    this.player = this.add.sprite(350, 250, 'dude');
    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.cursors = this.input.keyboard.createCursorKeys();
    this.escape = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
  }

  update () {
    if (this.escape.isDown) {
      this.goHome();
    }
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    // this.physics.arcade.collide(this.button, this.dude);
    if (this.cursors.left.isDown) {
      //  Move to the left
      this.player.body.velocity.x = -150;
      this.player.animations.play('left');
    } else if (this.cursors.right.isDown) {
      //  Move to the right
      this.player.body.velocity.x = 150;
      this.player.animations.play('right');
    } else if (this.cursors.up.isDown) {
      //  Move to the right
      this.player.body.velocity.y = -150;
      this.player.animations.play('up');
    } else if (this.cursors.down.isDown) {
      //  Move to the right
      this.player.body.velocity.y = 150;
      this.player.animations.play('down');
    } else {
      //  Stand still
      this.player.animations.stop();
      this.player.frame = 4;
    }
    if (this.physics.arcade.collide(this.player, this.tank)) {
      this.goToTank();
    }
    if (this.physics.arcade.collide(this.player, this.stopButton2)) {
      this.goHome();
    }
  }

  goToTank () {
    this.state.start('Tank');
    this.music.stop();
  }

  goHome () {
    this.state.start('Splash');
    // this.resetGame();
  }
}
