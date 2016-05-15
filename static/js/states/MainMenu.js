BasicGame.MainMenu = function(game) {

    //this.music = null;
    this.playButton = null;

};

BasicGame.MainMenu.prototype = {

    create: function() {

        //We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //Here all we're doing is playing some music and adding a picture and button
        //Naturally I expect you to do something significantly better :)

        //this.music = this.add.audio('titleMusic');
        //this.music.play();

        this.add.sprite(0, 0, 'titlepage');

    this.infotext = "Hej,\nLösenordsstyrka kan mätas i entropi."
                  + "\nEntropi är ett mått av slumpmässighet, ju högre entropi ett lösenord har desto lägre\n"
                  + "är sannolikheten att man spontant kan gissa sig till ett lösenord.\n"
                  + "Entropins sannolikhetsgrad anges i bits, man kan säga att ju fler bits ett lösenord har\n"
                  + "desto säkrare är lösenordet.\n\n Mer bits = Säkrare lösenord"
                  + "\n\nDu ska nu med hjälp av en lösenordstestare testa och se vilket lösenord som har\n"
                  + "högst entropi och därefter välja det lösenordet som har högst entropi."
                  + "\n\nTryck på START för att börja!";
    style = { font: "18px Arial", fill: "#ffffff", align: "left"};
    this.add.text(20,10, this.infotext, style);

        this.playButton = this.add.button(380, 430, 'playButton', this.startGame, this);

    },

    update: function() {

        //Do some nice funky main menu effect here

    },

    startGame: function(pointer) {

        //Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        //this.music.stop();

        //And start the actual game
        this.game.state.start('Game');

    }

};
