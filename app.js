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
            this.bartop;
            this.pieces;
            this.timedEvent;
            this.buttonD;
            this.buttonF;
            this.buttonJ;
            this.buttonK;
            this.bgm;
            this.score = 0;
            this.hp = 100;
            this.hpbar;
            this.hpbase;
            this.hpText;
            this.scoreText;
            this.lvlText;
            this.lvl = 1;
            this.nextLevelScore = 10;
            this.nextLevelScoreDiff = 10;
            this.speed = 1;
            this.delay;
            this.DCD = false;
            this.FCD = false;
            this.JCD = false;
            this.KCD = false;
            this.time = 0;
            this.gameOverText = "Game Over";
            this.stopGame = false;
        },

    preload: function () {
        this.load.image('background', 'assets/background.png');
        this.load.image('main', 'assets/main.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('bartop', 'assets/bartop.png');
        this.load.image('piece', 'assets/piece.png');
        this.load.spritesheet('spriteD', 'assets/spriteD.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('spriteF', 'assets/spriteF.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('spriteJ', 'assets/spriteJ.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('spriteK', 'assets/spriteK.png', { frameWidth: 100, frameHeight: 100 });
        this.load.audio('bass', 'assets/Popa Theme.mp3');
        this.load.audio('blop', 'assets/blop.wav');
        this.load.audio('press', 'assets/togglesound.mp3');
    },

    create: function () {

        this.hpText = 100;
        this.lvlText = 1;
        this.scoreText = 0;

        this.bgm = this.sound.add('bass', {
            mute: false,
            volume: 1,
            rate: this.speed,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });

        this.bgm.play();

        //  Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.main = this.physics.add.staticGroup();
        this.main.create(200, 0, 'main').setOrigin(0, 0);

        // create buttons group

        this.buttons = this.physics.add.staticGroup();
        this.buttons.create(250, 550, 'spriteD');
        this.buttons.create(350, 550, 'spriteF');
        this.buttons.create(450, 550, 'spriteJ');
        this.buttons.create(550, 550, 'spriteK');
        this.buttonD = this.physics.add.sprite(250, 550, 'spriteD');
        this.buttonF = this.physics.add.sprite(350, 550, 'spriteF');
        this.buttonJ = this.physics.add.sprite(450, 550, 'spriteJ');
        this.buttonK = this.physics.add.sprite(550, 550, 'spriteK');

        //Timer for button CD and overall game time

        // create pieces group
        this.pieces = this.physics.add.group({
            velocityY: this.speed * 100,
        });

        // set key bindings
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        // top bar
        this.bartop = this.physics.add.staticGroup();
        this.bartop.create(400, 10, 'bartop');

        // bullet
        this.bullet = this.physics.add.group({
            velocityY: -600
        });

        this.hpText = this.add.text(630, 300, "HP: 100", { fontFamily: 'Orbitron', fontSize: '28px', fill: '#ffffff' });
        this.scoreText = this.add.text(630, 500, "Score: 0", { fontFamily: 'Orbitron', fontSize: '28px', fill: '#ffffff' });
        this.lvlText = this.add.text(630, 400, "Level: 1", { fontFamily: 'Orbitron', fontSize: '28px', fill: '#ffffff' });

        //  Our colliders
        this.physics.add.collider(this.bullet, this.bartop, this.collideWithTop, null, this);
        this.physics.add.collider(this.bullet, this.pieces, this.collideWithPiece, null, this);
        this.physics.add.collider(this.pieces, this.buttons, this.collideWithButton, null, this);


        //  Our Button Sprites, Pressing and releasing
        this.anims.create({
            key: 'pressD',
            frames: [{ key: 'spriteD', frame: 1 }],
            frameRate: 10,
        });

        this.anims.create({
            key: 'releaseD',
            frames: [{ key: 'spriteD', frame: 0 }],
            frameRate: 10,
        });

        this.anims.create({
            key: 'pressF',
            frames: [{ key: 'spriteF', frame: 1 }],
            frameRate: 10,
        });

        this.anims.create({
            key: 'releaseF',
            frames: [{ key: 'spriteF', frame: 0 }],
            frameRate: 10,
        });

        this.anims.create({
            key: 'pressJ',
            frames: [{ key: 'spriteJ', frame: 1 }],
            frameRate: 10,
        });

        this.anims.create({
            key: 'releaseJ',
            frames: [{ key: 'spriteJ', frame: 0 }],
            frameRate: 10,
        });

        this.anims.create({
            key: 'pressK',
            frames: [{ key: 'spriteK', frame: 1 }],
            frameRate: 10,
        });

        this.anims.create({
            key: 'releaseK',
            frames: [{ key: 'spriteK', frame: 0 }],
            frameRate: 10,
        });

        // timers
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.createPiece, callbackScope: this, loop: true });

    },

    updateHp: function () {
        this.hpText.setText('HP: ' + this.hp);
    },

    collideWithPiece: function (bullet, piece) {
        this.sound.play('blop');
        bullet.disableBody(true, true);
        piece.disableBody(true, true);
        this.score++;
        this.scoreText.setText('Score: ' + this.score);
        if (this.score == this.nextLevelScore) {
            this.lvl++;
            this.lvlText.setText('Level: ' + this.lvl);
            this.speed *= 1.2;
            this.bgm.rate *= 1.05;
            this.pieces.setVelocityY(this.speed * 100);
            this.timedEvent.delay *= 0.8;
            this.nextLevelScore = this.nextLevelScoreDiff + this.score;
            this.nextLevelScoreDiff = Math.ceil(this.nextLevelScoreDiff * 1.5);
            console.log(this.lvl, this.nextLevelScore, this.nextLevelScoreDiff);
        }
    },

    collideWithTop: function (bullet, bartop) {
        bullet.disableBody(true, true);
        this.hp = this.hp <= 5 ? this.endGame() : this.hp - 5;
        this.updateHp();
    },

    collideWithButton: function (piece, button) {
        piece.disableBody(true, true);
        this.hp = this.hp <= 5 ? this.endGame() : this.hp - 5;
        this.updateHp();
    },

    endGame: function () {
        this.timedEvent.loop = false;
        console.log("GAME END");
        this.gameOverText = this.add.text(200, 200, "Game Over", { fontFamily: 'Orbitron', fontSize: '72px', fill: '#ff3729' });
        this.add.text(220, 400, "Hit F5 to play again!", { fontFamily: 'Orbitron', fontSize: '36px', fill: '#ff3729' });
        this.stopGame = true;
        return 0;
    },

    resetDCD: function () {
        this.DCD = false
        this.buttonD.play('releaseD', true);
    },

    resetFCD: function () {
        this.FCD = false
        this.buttonF.play('releaseF', true);
    },

    resetJCD: function () {
        this.JCD = false
        this.buttonJ.play('releaseJ', true);
    },

    resetKCD: function () {
        this.KCD = false
        this.buttonK.play('releaseK', true);
    },

    update: function () {
        //  Input events
        if (!this.stopGame) {
            if (Phaser.Input.Keyboard.JustDown(keyD)) {
                if (!this.DCD) {
                    this.sound.play('press');
                    this.bullet.create(250, 470, 'bullet');
                    this.buttonD.play('pressD', true);
                    this.DCD = true;
                    this.time.addEvent({ delay: 125, callback: this.resetDCD, callbackScope: this });
                } else {
                    this.buttonD.play('releaseD', true);
                }
            }
            if (Phaser.Input.Keyboard.JustDown(keyF)) {
                if (!this.FCD) {
                    this.sound.play('press');
                    this.bullet.create(350, 470, 'bullet');
                    this.buttonF.play('pressF', true);
                    this.FCD = true;
                    this.time.addEvent({ delay: 125, callback: this.resetFCD, callbackScope: this });
                } else {
                    this.buttonF.play('releaseF', true);
                }
            }
            if (Phaser.Input.Keyboard.JustDown(keyJ)) {
                if (!this.JCD) {
                    this.sound.play('press');
                    this.bullet.create(450, 470, 'bullet');
                    this.buttonJ.play('pressJ', true);
                    this.JCD = true;
                    this.time.addEvent({ delay: 125, callback: this.resetJCD, callbackScope: this });
                } else {
                    this.buttonJ.play('releaseJ', true);
                }
            }
            if (Phaser.Input.Keyboard.JustDown(keyK)) {
                if (!this.KCD) {
                    this.sound.play('press');
                    this.bullet.create(550, 470, 'bullet');
                    this.buttonK.play('pressK', true);
                    this.KCD = true;
                    this.time.addEvent({ delay: 125, callback: this.resetKCD, callbackScope: this });
                } else {
                    this.buttonK.play('releaseK', true);
                }
            }
        }
    },

    //Ticks once every timer delay
    createPiece: function () {
        var randColumn = Math.floor(Math.random() * 4); // random int from 0-3

        this.pieces.create(250 + randColumn * 100, 65, 'piece');
        this.pieces.setVelocityY(this.speed * 100);
    },

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
