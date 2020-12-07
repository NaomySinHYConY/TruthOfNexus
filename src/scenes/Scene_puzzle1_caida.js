class Scene_puzzle1_caida extends Phaser.Scene{
    constructor(){
        super({
            key: 'Scene_puzzle1_caida'
        });
    }

    init(hoyo) {
        console.log('Escena del primer puzzle, caida');
        console.log(hoyo.y);
        this.data.set('X', hoyo.x);
        this.data.set('Y', hoyo.y);
    }
    preload(){
        this.load.path = './assets/puzzle1/';
        this.load.image(['fondoCaida', 'puerta']);
    }
    create() {
        //Karin
        var posX = this.data.list.X + 40;
        var posY = this.data.list.Y -20;
        this.dragon = this.add.sprite(posX,posY , 'dragon_all').setInteractive().setScale(0.85).setDepth(2);
        this.dragon.anims.play('dragon_fly');

        var posX2 = this.data.list.X + 60;
        var posY2 = this.data.list.Y - 40;

        this.consejo2_4 = this.add.image(posX2,posY2,'ayuda2_4').setDepth(3).setScale(0.17).setInteractive();
        this.consejo2_5 = this.add.image(posX2,posY2,'ayuda2_5').setDepth(3).setScale(0.17).setVisible(false).setInteractive();

        const eventos = Phaser.Input.Events;
        var num = 1;

        this.input.on(eventos.GAMEOBJECT_UP,(pointer,gameObject) =>{
            num = num+1;
            if(num === 2){
                this.consejo2_4.setVisible(false);
                this.consejo2_5.setVisible(true);
            }else if(num === 3){
                this.consejo2_5.setVisible(false);
                this.dragon.destroy();
            }
        });

        
        this.cameras.main.setViewport(0, 0, 1000, 640)
        .fadeOut(2000)
        .shake(2000, 0.01)
        .setBackgroundColor('rgba(0, 0, 0, 0)')
        .flash(2000);

        this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.cameras.main.fadeIn(2000);
        });
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;

        this.velocidadNexus = 300;
        this.musica();
        this.fondo = this.add.image(500, 320, 'fondoCaida');

        this.puerta = this.physics.add.image(496.5, 48.5, 'puerta').setImmovable(true);
        this.puerta.body.allowGravity = false;

        this.nexus = this.physics.add.sprite(this.data.list.X, this.data.list.Y, 'nexus_head').setInteractive().setScale(1.3).setCollideWorldBounds(true);
        this.nexus.body.allowGravity = false;

        

        this.physics.add.collider(this.puerta,this.nexus, this.subir, null, this);

        this.nexusWalkIz = this.input.keyboard.addKey(keyCodes.LEFT);
        this.nexusWalkDer = this.input.keyboard.addKey(keyCodes.RIGHT);
        this.nexusUp = this.input.keyboard.addKey(keyCodes.UP);
        this.nexusDown = this.input.keyboard.addKey(keyCodes.DOWN);
    }

    musica(){
        this.fondopuzzle = this.sound.add("fondopuzzle");
        
        this.golpe = this.sound.add("golpe");
        this.caer = this.sound.add("sPuzzle8");
        this.abajo = this.sound.add("sPuzzle15");
        this.subida = this.sound.add('salida');

        this.musicConf2 = {
            mute: false,
            volume: 0.4,
            loop: false
        }
        this.musicConf = {
            mute: false,
            volume: 0.5,
            loop: true
        }
        this.sound.stopAll();
        this.fondopuzzle.play(this.musicConf);
    }

    subir(puerta, nexus){
        this.tweens = this.add.tween({
            targets: [this.nexus],
            ease: 'Linear',
            y: 10,
            x:500,
            duration: 3000,
            onStart: () => {
                nexus.body.enable = false;
                this.subida.play(this.musicConf2);
            },
            onComplete: () => {
                nexus.body.enable = true;
                this.scene.pause();
                this.scene.start('Scene_puzzle1');
                //nexus.alpha = 1;
            }, 
        });
        
    }

    update(time, delta) {
        
        if(this.nexusWalkDer.isDown){
            this.nexus.setFrame('head_10');
            this.nexus.body.velocity.x = this.velocidadNexus;
            this.nexus.body.velocity.y = 0;
        }
        else if(this.nexusWalkIz.isDown){
            this.nexus.setFrame('head_2');
            this.nexus.body.velocity.x = this.velocidadNexus*-1;
            this.nexus.body.velocity.y = 0;
            //this.nexus.body.setVelocity(-100,0);
        }
        else if(this.nexusUp.isDown){
            this.nexus.setFrame('head_6');
            this.nexus.body.velocity.y = this.velocidadNexus*-1;
            this.nexus.body.velocity.x = 0;
        }
        else if(this.nexusDown.isDown){
            this.nexus.setFrame('head_1');
            this.nexus.body.velocity.y = this.velocidadNexus;
            this.nexus.body.velocity.x = 0;
        }
        if( Phaser.Input.Keyboard.JustUp(this.nexusWalkDer) || Phaser.Input.Keyboard.JustUp(this.nexusWalkIz) || Phaser.Input.Keyboard.JustUp(this.nexusDown)
        || Phaser.Input.Keyboard.JustUp(this.nexusUp) ){
            this.nexus.body.setVelocity(0);
        }
    }

}
export default Scene_puzzle1_caida;