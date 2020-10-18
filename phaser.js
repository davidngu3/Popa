var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var bullets;
var game = new Phaser.Game(config);

var bulletTime = 0;
var keyD;
var buttons;


function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('main', 'assets/main.png');
    this.load.image('D', 'assets/button-D.png');
    this.load.image('F', 'assets/button-F.png');
    this.load.image('J', 'assets/button-J.png');
    this.load.image('K', 'assets/button-K.png');
    this.load.image('bullet', 'assets/bullet.png');
}

function create() {
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

    this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.add.image(200, 0, 'main').setOrigin(0, 0);
    // this.add.image(200, 500, 'D').setOrigin(0, 0);
    // this.add.image(300, 500, 'F').setOrigin(0, 0);
    // this.add.image(400, 500, 'J').setOrigin(0, 0);
    // this.add.image(500, 500, 'K').setOrigin(0, 0);

    buttons = this.physics.add.staticGroup();

    buttons.create(200, 500, 'D').setOrigin(0, 0);
    buttons.create(300, 500, 'F').setOrigin(0, 0);
    buttons.create(400, 500, 'J').setOrigin(0, 0);
    buttons.create(500, 500, 'K').setOrigin(0, 0);

    bullets = this.physics.add.group({
        key: 'bullet',
        setXY: { x: 500, y: 0 },
        velocity: { x: 100 }
    });

    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(1, 'bullet');
    bullets.setVelocity(30);

    this.physics.add.collider(bullets, buttons);
}

function update() {

    if (Phaser.Input.Keyboard.JustDown(keyD)) {
        fireBullet()
    }
    if (Phaser.Input.Keyboard.JustDown(keyF)) {
        console.log('F');
    }
    if (Phaser.Input.Keyboard.JustDown(keyJ)) {
        console.log('J');
    }
    if (Phaser.Input.Keyboard.JustDown(keyK)) {
        console.log('K');
    }

}

function fireBullet() {
    bullets.create(200, 100, 'bullet');

}

function resetBullet(bullet) {
    // Destroy the laser
    bullet.kill();
}