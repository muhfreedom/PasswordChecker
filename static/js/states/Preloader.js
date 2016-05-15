BasicGame.Preloader = function(game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

BasicGame.Preloader.prototype = {

    preload: function() {

        //These are the assets we loaded in Boot.js
        //A nice sparkly background and a loading progress bar
        this.background = this.add.sprite(0, 0, 'preloaderBackground');


        //This sets the preloadBar sprite as a loader sprite.
        //What that does is automatically crop the sprite from 0 to full-width
        //as the files below are loaded in.
        //this.load.setPreloadSprite(this.preloadBar);

        //Here we load the rest of the assets our game needs.
        //As this is just a Project Template I've not provided these assets, swap them for your own.
        this.load.image('logo', 'assets/img/logo.png');
        this.load.image('go', 'assets/img/go.png');
        this.load.image('wave', 'assets/img/wave.png');
        this.load.image('gameover', 'assets/img/gameover.png');
        this.load.image('collision', 'assets/img/collision.png');
        this.load.spritesheet('Gamma', 'assets/img/gamma.png', 150, 150);
        this.load.image('orange', 'assets/img/orange.png');
        this.load.image('rightOrange', 'assets/img/orange.png');
        this.load.image('leftOrange', 'assets/img/orange.png');
        this.load.image('doubleOrange', 'assets/img/orange.png');
        this.load.image('kitchen', 'assets/img/kitchen.png');
        this.load.image('titlepage', 'assets/images/skies/deepblue2.png');
        this.load.image('playButton', 'assets/img//buttonAfter.png');
        this.load.image('restartButton', 'assets/images/buttons/tryagain2.png');
        this.load.image('nextButton', 'assets/images/buttons/next.png');
        this.load.image('blazeit', 'assets/images/pics/einstein1.png');
        this.load.image('close', 'assets/images/sprites/close_button_circle.png');
        this.game.load.image('bg', 'assets/bg.png');
        this.game.load.nineSlice('input', 'assets/inputfield.png', 15);
        this.game.load.nineSlice('btn', 'assets/btn_clean.png', 20, 23, 27, 28);
 


        //this.load.audio('titleMusic', ['assets/audio/buttonClick.wav']);
        //this.load.audio('introMusic', ['assets/audio/introOne.wav']);
        //this.load.audio('hit', ['assets/audio/punch.mp3']);

        //+ lots of other required assets here

    },

    create: function() {

        //Logo Components
        var logo = this.game.add.sprite(130, 20, 'logo')
        logo.alpha = -2;
        this.game.add.tween(logo).to({
            alpha: 1
        }, 1000, Phaser.Easing.Linear.None, true, 0);
        //intro = this.game.add.audio('introMusic');
        //intro.play();
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.goToMenu, this);

    },

    update: function() {

        //You don't actually need to do this, but I find it gives a much smoother game experience.
        //Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
        //You can jump right into the menu if you want and still play the music, but you'll have a few
        //seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
        //it's best to wait for it to decode here first, then carry on.

        //If you don't have any music in your game then put the game.state.start line into the create function and delete
        //the update function completely.

    },

    goToMenu: function() {
        this.game.state.start('MainMenu');
    }

};
