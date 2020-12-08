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
        this.load.atlas('chest','cofre/chest.png','cofre/chest_atlas.json');
        this.load.animation('chestAnim','cofre/chest_anim.json');
        
        this.load.atlas('dracmas','dracma/dracmas.png','dracma/dracma_atlas.json');
        this.load.animation('dracmasAnim','dracma/dracma_anim.json');

    }
    create() {
        this.data.set('monedas', 0);
        
        this.data.set('dracmas', 0);
        
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

        this.chest = this.physics.add.sprite(500,320,'chest').setInteractive().setScale(0.6);
        this.chest.setDepth(2);
        this.chest.setImmovable(true);
        //this.chest.body.setMass(2);
        this.chest.body.allowGravity = false;
        //this.chest.setCollideWorldBounds(true);

        this.physics.add.collider(this.puerta,this.nexus, this.subir, null, this);

        this.nexusWalkIz = this.input.keyboard.addKey(keyCodes.LEFT);
        this.nexusWalkDer = this.input.keyboard.addKey(keyCodes.RIGHT);
        this.nexusUp = this.input.keyboard.addKey(keyCodes.UP);
        this.nexusDown = this.input.keyboard.addKey(keyCodes.DOWN);
        this.abrir = this.input.keyboard.addKey(keyCodes.ENTER);
    }

    recoger(nexus, dracmas)
    {
    //console.log("Emite moneda");
       dracmas.destroy();
       this.data.list.dracmas += 20;
       //console.log(this.score);
       this.registry.events.emit('recogeMoneda', 20);
       //this.scene.launch('Scene_estado');
    //    this.score += 20;
       this.recoge = this.sound.add("moneda",{loop:false});
       this.recoge.play();
    //    this.scoreText.setText(this.score);
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

        if(Phaser.Input.Keyboard.JustDown(this.abrir) && this.data.list.dracmas<500 && this.data.list.monedas<6){
            this.chest.anims.play('abrir');
            let cofreOpen = this.sound.add("cofreOpen",{loop:false});
            cofreOpen.play();
            
            this.grupod = this.physics.add.group({
                key: 'dracmas',
                repeat: 1,
                setXY: { x:460, y: 320, stepX: 80 }
            });
            
            this.grupod.children.iterate( (girar) => {
                girar.setScale(0.9);
                girar.setDepth(3);
                girar.body.allowGravity = false;
                //girar.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            });
    
            this.grupod.playAnimation('dracma');
            //this.physics.add.collider(this.grupod,this.paredes0);
            this.physics.add.overlap(this.nexus, this.grupod, this.recoger, null, this);
            this.data.list.monedas+=2;
        }
    }

}
export default Scene_puzzle1_caida;