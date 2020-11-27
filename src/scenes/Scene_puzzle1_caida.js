class Scene_puzzle1_caida extends Phaser.Scene{
    constructor(){
        super({
            key: 'Scene_puzzle1_caida'
        });
    }

    init() {
        console.log('Escena del primer puzzle, caida');
    }
    preload(){
        this.load.path = './assets/puzzle1/';
        this.load.image(['fondoCaida', 'puerta']);
    }
    create() {
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        this.velocidadNexus = 300;
        this.musica();
        this.fondo = this.add.image(500, 320, 'fondoCaida');

        this.puerta = this.physics.add.image(496.5, 48.5, 'puerta').setImmovable(true);
        this.puerta.body.allowGravity = false;

        this.nexus = this.physics.add.sprite(30, 600, 'nexus_head').setInteractive().setScale(1.3).setCollideWorldBounds(true);
        this.nexus.body.allowGravity = false;

        this.physics.add.collider(this.puerta,this.nexus, this.subir, null, this);

        this.nexusWalkIz = this.input.keyboard.addKey(keyCodes.LEFT);
        this.nexusWalkDer = this.input.keyboard.addKey(keyCodes.RIGHT);
        this.nexusUp = this.input.keyboard.addKey(keyCodes.UP);
        this.nexusDown = this.input.keyboard.addKey(keyCodes.DOWN);
    }

    musica(){
        this.fondopuzzle = this.sound.add("fondopuzzle");
        
        this.golpe = this.sound.add("sPuzzle7");
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
            duration: 3000,
            onStart: () => {
                nexus.body.enable = false;
                this.subida.play(this.musicConf2);
            },
            onComplete: () => {
                nexus.body.enable = true;
                this.scene.stop();
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