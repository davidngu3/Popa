var Popa = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Popa() {
            Phaser.Scene.call(this, { key: 'Popa' });
            this.bricks;
            this.bullet;
            this.background;
            this.main;
            this.buttons;
            this.topbar;
        },

    preload: function () {
        this.load.image('background', 'assets/background.png');
        this.load.image('main', 'assets/main.png');
        this.load.image('D', 'assets/button-D.png');
        this.load.image('F', 'assets/button-F.png');
        this.load.image('J', 'assets/button-J.png');
        this.load.image('K', 'assets/button-K.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('topbar', 'assets/topbar.png');
    },

    create: function () {
        //  Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        //  Create the bricks in a 10x6 grid
        this.bricks = this.physics.add.staticGroup({
            key: 'assets', frame: ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1'],
            frameQuantity: 10,
            gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
        });

        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.add.image(200, 0, 'main').setOrigin(0, 0);

        // create buttons group
        this.buttons = this.physics.add.staticGroup();
        this.buttons.create(200, 500, 'D').setOrigin(0, 0);
        this.buttons.create(300, 500, 'F').setOrigin(0, 0);
        this.buttons.create(400, 500, 'J').setOrigin(0, 0);
        this.buttons.create(500, 500, 'K').setOrigin(0, 0);


        // set key bindings
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        this.topbar = this.physics.add.staticGroup();
        this.topbar.create(400, 10, 'topbar');

        this.bullet = this.physics.add.group();

        //  Our colliders
        this.physics.add.collider(this.bullet, this.topbar, this.collideWithTop, null, this);

        //  Input events

    },

    collideWithTop: function (bullet, topbar) {
        console.log("COLLISION");
        bullet.disableBody(true, true);
    },

    // hitPaddle: function (ball, paddle) {
    //     var diff = 0;

    //     if (ball.x < paddle.x) {
    //         //  Ball is on the left-hand side of the paddle
    //         diff = paddle.x - ball.x;
    //         ball.setVelocityX(-10 * diff);
    //     }
    //     else if (ball.x > paddle.x) {
    //         //  Ball is on the right-hand side of the paddle
    //         diff = ball.x - paddle.x;
    //         ball.setVelocityX(10 * diff);
    //     }
    //     else {
    //         //  Ball is perfectly in the middle
    //         //  Add a little random X to stop it bouncing straight up!
    //         ball.setVelocityX(2 + Math.random() * 8);
    //     }
    // },

    update: function () {
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.bullet.create(250, 470, 'bullet');
            this.bullet.setVelocityY(-100);
        }
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.bullet.create(350, 470, 'bullet');
            this.bullet.setVelocityY(-100);
        }
        if (Phaser.Input.Keyboard.JustDown(keyJ)) {
            this.bullet.create(450, 470, 'bullet');
            this.bullet.setVelocityY(-100);
        }
        if (Phaser.Input.Keyboard.JustDown(keyK)) {
            this.bullet.create(550, 470, 'bullet');
            this.bullet.setVelocityY(-100);
        }

    }

});

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [Popa],
    physics: {
        default: 'arcade'
    }
};

var game = new Phaser.Game(config);
