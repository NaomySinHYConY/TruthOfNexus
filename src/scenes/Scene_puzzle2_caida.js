class Scene_puzzle2_caida extends Phaser.Scene{
    constructor(){
        super({
            key: 'Scene_puzzle2_caida'
        });
    }

    init(hoyo) {
        console.log('Escena del segundo puzzle, caida');
        //console.log(hoyo.y);
        this.data.set('X', hoyo.x);
        this.data.set('Y', hoyo.y);
    }
    preload(){
        this.load.path = './assets/puzzle2/';
        this.load.image(['fondoCaida2', 'puerta2', 'pa4', 'pa5', 'pa6', 'arbusto']);
        this.load.atlas('bat','bat/bat.png','bat/bat_atlas.json');
        this.load.animation('batAnim','bat/bat_anim.json');

        this.load.atlas('dracmas','../dracma/dracmas.png','../dracma/dracma_atlas.json');
        this.load.animation('dracmasAnim','../dracma/dracma_anim.json');
        this.load.audio('moneda', '../sounds/moneda.mp3');
        this.load.audio('golpe', '../sounds/golpe.mp3');
    }
    create() {
        
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
        this.fondo2 = this.add.image(500, 320, 'fondoCaida2');

        this.puerta2 = this.physics.add.image(496.5, 48.5, 'puerta2').setImmovable(true);
        this.puerta2.body.allowGravity = false;

        this.paredes2 = this.physics.add.group();
        this.paredes2.create(5, 380, 'pa4');
        this.paredes2.create(504.5, 633, 'pa5');
        this.paredes2.create(993, 380, 'pa6');

        //this.paredes.getChildren()[i];
        
        this.paredes2.children.iterate( (p) => {
            p.setImmovable(true); 
            p.body.allowGravity = false;
            //this.physics.add.collider(this.monstruo_fly,p);    
        } );

        this.grupoMurcielagos = this.physics.add.group();
        this.grupoMurcielagos.create(45, 581.5, 'bat');
        this.grupoMurcielagos.create(477, 94.5, 'bat');
        this.grupoMurcielagos.create(960, 218.5, 'bat');
        this.grupoMurcielagos.children.iterate( (mS) => {
            mS.setInteractive().setScale(1);
            mS.body.allowGravity = false;
            //mS.body.velocity.x=-100;
            mS.setImmovable = true;
            mS.setCollideWorldBounds(true);
            mS.body.bounce.set(1);
        } );
        this.grupoMurcielagos.playAnimation('bat_fly');

        this.grupod = this.physics.add.group();
        this.grupod.create(49.5, 407, 'dracmas');
        this.grupod.create(205.5, 608, 'dracmas');
        this.grupod.create(392.5, 105, 'dracmas');
        this.grupod.create(504.5, 336.5, 'dracmas');
        this.grupod.create(639.5, 105, 'dracmas');
        this.grupod.create(649.5, 605.5, 'dracmas');
        this.grupod.create(951.5, 473, 'dracmas');
        this.grupod.children.iterate( (a) => {
            a.setInteractive().setScale(1.5);
            a.alpha = 0.5;
            a.body.allowGravity = false;
            //mS.body.velocity.x=-100;
            //a.setImmovable = true;

            //girar.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            //mS.setCollideWorldBounds(true);
            this.tweens = this.add.tween({
                targets: [a],
                ease: 'Bounce',
                y: a.y-=40,
                duration: 3000,
                yoyo:true,
                repeat: -1 
            });
        } );
        this.grupod.playAnimation('dracma');

        this.grupoArbustos = this.physics.add.group();
        this.grupoArbustos.create(49.5, 397, 'arbusto');
        this.grupoArbustos.create(205.5, 598, 'arbusto');
        this.grupoArbustos.create(392.5, 95, 'arbusto');
        this.grupoArbustos.create(504.5, 326.5, 'arbusto');
        this.grupoArbustos.create(639.5, 95, 'arbusto');
        this.grupoArbustos.create(649.5, 595.5, 'arbusto');
        this.grupoArbustos.create(951.5, 463, 'arbusto');
        this.grupoArbustos.children.iterate( (a) => {
            a.setInteractive().setScale(1);
            a.body.allowGravity = false;
            //mS.body.velocity.x=-100;
            a.setImmovable = true;
            //mS.setCollideWorldBounds(true);
        } );

        this.nexus = this.physics.add.sprite(this.data.list.X, this.data.list.Y, 'nexus_head').setInteractive().setScale(1.3).setCollideWorldBounds(true);
        this.nexus.body.allowGravity = false;

        this.physics.add.collider(this.puerta2,this.nexus, this.subir, null, this);
        this.physics.add.collider(this.paredes2,this.nexus, this.nexusPared, null, this);
        this.physics.add.overlap(this.grupoArbustos,this.nexus, this.protegido, null, this);
        this.physics.add.overlap(this.nexus, this.grupod, this.recoger, null, this);
        this.physics.add.overlap(this.nexus, this.grupoMurcielagos, this.choqueNexus, null, this);

        this.nexusWalkIz = this.input.keyboard.addKey(keyCodes.LEFT);
        this.nexusWalkDer = this.input.keyboard.addKey(keyCodes.RIGHT);
        this.nexusUp = this.input.keyboard.addKey(keyCodes.UP);
        this.nexusDown = this.input.keyboard.addKey(keyCodes.DOWN);

        //this.physics.world.on('worldbounds', this.choqueMundo);
    }

    recoger(nexus, dracmas)
    {
    //console.log("Emite moneda");
       dracmas.destroy();
       //this.data.list.dracmas += 20;
       //console.log(this.score);
       this.registry.events.emit('recogeMoneda', 20);
       //this.scene.launch('Scene_estado');
    //    this.score += 20;
       this.recoge = this.sound.add("moneda",{loop:false});
       this.recoge.play();
    //    this.scoreText.setText(this.score);
    }

    choqueNexus(nexus, monstruo){
        nexus.anims.play('nexus_dead');
        //this.data.list.vidas--;
        this.registry.events.emit('menosVida');

        this.tweens = this.add.tween({
            targets: [this.nexus],
            ease: 'Linear',
            alpha: 0,
            duration: 2000,
            onStart: () => {
                nexus.body.enable = false;
                this.golpe.play(this.musicConf2);
                //nexus.anims.play('nexus_dead');
            },
            onComplete: () => {
                nexus.body.enable = true;
                nexus.x = this.data.list.X;
                nexus.y = this.data.list.Y;
                nexus.setVelocity(0);
                nexus.alpha = 1;
                nexus.setFrame(0);
                //this.input.keyboard.enabled = true;

                // if(this.data.list.vidas!=0){
                //     this.nexus.body.enable = true;
                // }
                // else{
                //     this.scene.stop();
                // }
            }, 
        });
        
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
                this.scene.start('Scene_puzzle2');
                //nexus.alpha = 1;
            }, 
        });
        
    }

    nexusPared(paredes, nexus){
        //this.reiniciarAreasLimpias();
        nexus.setVelocity(0);
        //this.input.keyboard.enabled = true;
    }

    protegido(nexus, arbusto){
        arbusto.body.debugBodyColor = arbusto.body.touching.none ? 0x00ffff : 0xffff00;
        this.velocidad = arbusto.body.touching.none ? -30 : 200;
        this.grupoMurcielagos.children.iterate( (mC) => {
            this.physics.moveToObject(mC, this.nexus, this.velocidad);
        } );
    }

    // protegidoTest(){
    //     let bool = false;
    //     console.log("Probando");
    //     this.grupoArbustos.children.iterate( (mC) => {
    //         if(mC.body.onOverlap){
    //             console.log("Entró");
    //             return true;
    //         }
    //     } );
    //     return bool;
    // }

    update(time, delta) {
        // this.grupoMurcielagos.children.iterate( (mC) => {
        //     this.physics.moveToObject(mC, this.nexus, 200);
        // } );
        //this.velocidad = this.protegidoTest() ? 100 : -100;
        // console.log(this.velocidad);

        // this.grupoMurcielagos.children.iterate( (mC) => {
        //     this.physics.moveToObject(mC, this.nexus, this.velocidad);
        // } );

        //this.velocidad = arbusto.body.touching.none ? -50 : 100;
        // this.grupoMurcielagos.children.iterate( (mC) => {
        //     this.physics.moveToObject(mC, this.nexus, 10);
        // } );


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
export default Scene_puzzle2_caida;