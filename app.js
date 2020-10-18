var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: -100 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

// global variables
var bullet;
var bullets;
var bulletTime = 0;
var keyD;
var keyF;
var keyJ;
var keyK;
var buttons;


function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('main', 'assets/main.png');
    this.load.image('D', 'assets/button-D.png');
    this.load.image('F', 'assets/button-F.png');
    this.load.image('J', 'assets/button-J.png');
    this.load.image('K', 'assets/button-K.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('topbar', 'assets/topbar.png');
}

function create() {
    // create background
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.add.image(200, 0, 'main').setOrigin(0, 0);

    // create buttons group
    buttons = this.physics.add.staticGroup();
    buttons.create(200, 500, 'D').setOrigin(0, 0);
    buttons.create(300, 500, 'F').setOrigin(0, 0);
    buttons.create(400, 500, 'J').setOrigin(0, 0);
    buttons.create(500, 500, 'K').setOrigin(0, 0);

    // set key bindings
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    
    // create bullet group
    bullets = this.physics.add.group({
        key: 'bullet',
        maxSize: 20,
        runChildUpdate: true
    });

    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    // 
    topbar = this.physics.add.staticGroup();
    topbar.create(400, 10, 'topbar');

    // collision setup
    this.physics.add.collider(bullets, topbar);
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
    var bullet = this.bullets.get();
    if (bullet) {
        bullet.enableBody(true, 250, 470, true, true);
        bullet.setVelocityY(-1000);
    }
    
}

function resetBullet(bullet) {
    // Destroy the laser
    bullet.kill();
}