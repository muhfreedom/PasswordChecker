var game = new Phaser.Game(800, 768, Phaser.CANVAS, '', {
  init: function(){
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.maxWidth = 800;
    this.scale.maxHeight = 768;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.updateLayout();
  },
  create: function(){
    
    this.myInput = this.createInput(this.game.world.centerX, 50);
    this.myInput.anchor.set(0.5);
    this.myInput.canvasInput.value('Esto es la verga! :D');
    this.myInput.canvasInput.focus();
    
  },
  render: function(){
    //this.game.debug.spriteBounds(this.myInput);
  },
  inputFocus: function(sprite){
    sprite.canvasInput.focus();
  },
  createInput: function(x, y){
    var bmd = this.add.bitmapData(400, 50);    
    var myInput = this.game.add.sprite(x, y, bmd);
    
    myInput.canvasInput = new CanvasInput({
      canvas: bmd.canvas,
      fontSize: 30,
      fontFamily: 'Arial',
      fontColor: '#212121',
      fontWeight: 'bold',
      width: 400,
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 3,
      boxShadow: '1px 1px 0px #fff',
      innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      placeHolder: 'Enter message here...'
    });
    myInput.inputEnabled = true;
    myInput.input.useHandCursor = true;    
    myInput.events.onInputUp.add(this.inputFocus, this);
    
    return myInput;
  }
});
