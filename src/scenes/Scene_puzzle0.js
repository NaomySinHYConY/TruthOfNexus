class Scene_puzzle0 extends Phaser.Scene{
    constructor(){
        super({
            key: 'Scene_puzzle0'
        });
    }

    init() {
        console.log('Escena del primer puzzle, el tutorial');
    }
    preload(){
        
        this.load.path = './assets/puzzle1/';
        this.load.image(['fondoP', 'fondo-izq', 'fondo-der', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'hoyo', 'salida']);
        // this.load.atlas('monstruo_fly','mCueva/monstruo_fly.png','mCueva/monstruo_fly_atlas.json');
        // this.load.animation('mCuevaAnim','mCueva/monstruo_fly_anim.json');
        this.load.atlas('nexus_head','nexusHead/nexus_head.png','nexusHead/nexus_head_atlas.json');
        this.load.animation('nexusHeadAnim','nexusHead/nexus_head_anim.json');

        this.load.atlas('chest','cofre/chest.png','cofre/chest_atlas.json');
        this.load.animation('chestAnim','cofre/chest_anim.json');
        this.load.atlas('dracmas','dracma/dracmas.png','dracma/dracma_atlas.json');
        this.load.animation('dracmasAnim','dracma/dracma_anim.json');

        this.load.audio("fondopuzzle", ["../sounds/puzzle.mp3"]);
        
        this.load.audio("golpe", ["../sounds/golpe.mp3"]);
        this.load.audio("sPuzzle8", ["../sounds/sPuzzle8.mp3"]);
        
        this.load.audio("sPuzzle15", ["../sounds/sPuzzle15.mp3"]);
       
        this.load.audio("salida", ["../sounds/salida.mp3"]);
    }

    create() {
        
        //console.log(this.data.getAll());
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
        //console.log(this.data.getAll());

        this.registry.events.on('vidasRestantes', (vidas) => {
            this.data.set('vidas', vidas);
        });

        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        this.velocidadNexus = 300;
        this.musica();
        this.fondoP0 = this.add.image(500, 320, 'fondoP');

        this.fondoizq0 = this.physics.add.image(0, 0, 'fondo-izq').setOrigin(0).setImmovable(true);
        this.fondoizq0.body.allowGravity = false;

        this.fondoder0 = this.physics.add.image(1000, 0, 'fondo-der').setOrigin(1,0).setImmovable(true);
        this.fondoder0.body.allowGravity = false;

        this.salida0 = this.physics.add.image(496.5, 48.5, 'salida').setImmovable(true);
        this.salida0.body.allowGravity = false;

        // this.grupoMonstruos = this.physics.add.group();
        // this.grupoMonstruos.create(500, 525, 'monstruo_fly');
        // this.grupoMonstruos.create(600, 330, 'monstruo_fly');
        // this.grupoMonstruos.create(300, 330, 'monstruo_fly');
        // this.grupoMonstruos.children.iterate( (mC) => {
        //     mC.setInteractive().setScale(0.12);
        //     mC.body.allowGravity = false;
        //     mC.body.velocity.x=-100;
        //     mC.setImmovable = true;
        // } );
        // this.grupoMonstruos.playAnimation('mcueva_fly');

        this.paredes0 = this.physics.add.group();
        this.paredes0.create(79.5, 351, 'p1');
        this.paredes0.create(918.5, 366, 'p2');
        this.paredes0.create(174.5, 366, 'p3');
        this.paredes0.create(397.5, 142, 'p4');
        this.paredes0.create(639.5, 142, 'p5');
        this.paredes0.create(252, 190, 'p6');
        this.paredes0.create(352, 372, 'p7');
        this.paredes0.create(436, 286, 'p8');
        this.paredes0.create(228, 478, 'p9');
        this.paredes0.create(529, 478, 'p10');
        this.paredes0.create(748, 478, 'p11');
        this.paredes0.create(716.5, 286, 'p12');
        this.paredes0.create(716.5, 372, 'p13');
        this.paredes0.create(513.5, 286, 'p14');
        this.paredes0.create(378.5, 478, 'p15');
        this.paredes0.create(284.5, 286, 'p16');
        this.paredes0.create(5, 351, 'p17');
        this.paredes0.create(352, 94, 'p18');
        this.paredes0.create(546.5, 574, 'p19');
        this.paredes0.create(779, 158, 'p20');
        this.paredes0.create(504, 638, 'p21');
        this.paredes0.create(1000, 386, 'p22');

        //this.paredes0.getChildren()[i];
        
        this.paredes0.children.iterate( (p) => {
            p.setImmovable(true);
            p.body.allowGravity = false;
            //this.physics.add.collider(this.monstruo_fly,p);    
        } );

        this.hoyos0 = this.physics.add.group();
        this.hoyos0.create(174.5, 2611.5, 'hoyo');
        this.hoyos0.create(228.5, 289.5, 'hoyo');
        this.hoyos0.create(433, 478.5, 'hoyo');
        //this.hoyos0.create(228.5, 424.5, 'hoyo');
        this.hoyos0.create(639.5, 238.5, 'hoyo');
        this.hoyos0.create(726.5, 333.5, 'hoyo');
        // this.hoyos0.create(860.5, 228.5, 'hoyo');
        // this.hoyos0.create(965.5, 196.5, 'hoyo');
        
        this.hoyos0.children.iterate((h) =>{
            h.body.allowGravity = false;
            h.alpha = 0.9;
            h.setImmovable(true);
            h.body.setSize(50,5);
        });

        
        this.nexus = this.physics.add.sprite(30, 600, 'nexus_head').setInteractive().setScale(1.3).setCollideWorldBounds(true);
        this.nexus.body.allowGravity = false;
        this.nexus.body.setSize(20,15);
        this.nexus.body.setOffset(5,10);
        //this.nexus.anims.play('nexus_dead');
        //this.nexus.setFrame('head_6');

        this.chest = this.physics.add.sprite(965,300,'chest').setInteractive().setScale(0.6);
        this.chest.setDepth(2);
        this.chest.setImmovable(true);
        //this.chest.body.setMass(2);
        this.chest.body.allowGravity = false;
        this.chest.setCollideWorldBounds(true);


        //this.physics.add.collider(this.paredes0,this.grupoMonstruos, this.choquePared, null, this);
        this.physics.add.collider(this.fondoder0, this.nexus);
        this.physics.add.collider(this.fondoizq0, this.nexus);
        this.physics.add.collider(this.paredes0,this.nexus);
        //this.physics.add.overlap(this.nexus,this.grupoMonstruos, this.choqueNexus, null, this);
        this.physics.add.collider(this.nexus, this.hoyos0, this.caida, null, this);
        this.physics.add.overlap(this.nexus, this.salida0, this.salir, null, this);
        this.physics.add.overlap(this.nexus, this.chest, this.open, null, this);

        //Controles
        //this.nexusWalkA = this.input.keyboard.addKey(keyCodes.U);
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
        this.salidaS = this.sound.add('salida');

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
        this.abajo.play(this.musicConf2);
    }

    caida(nexus, hoyo){
        hoyo.body.enable = false;
        nexus.body.enable = false;
        // setTimeout(() => {
        //     this.caer.play(this.musicConf2);
        //     nexus.anims.play('nexus_fall');
        // }, 2000);
        this.tweens = this.add.tween({
            targets: [this.nexus],
            ease: 'Linear',
            alpha: 0,
            x: hoyo.x,
            y: hoyo.y,
            duration: 2000,
            onStart: () => {
                this.caer.play(this.musicConf2);
                nexus.anims.play('nexus_fall');
                hoyo.alpha = 1;
            },
            onComplete: () => {
                //nexus.body.x = 30;
                //nexus.body.y = 600;
                nexus.x = 30;
                nexus.y = 600;
                nexus.alpha = 1;
                hoyo.body.enable = true;
                nexus.body.enable = true;
                this.nexus.setFrame('head_1');
                //this.scene.pause();
                //this.scene.start('Scene_puzzle1_caida', hoyo);
                //this.registry.events.emit('posCaida', 30, 300);
                //console.log('evento caída 1');
            }, 
        });
    }

    salir(nexus){
        this.tweens = this.add.tween({
            targets: [this.nexus],
            ease: 'Linear',
            y: 10,
            x:500,
            duration: 3000,
            onStart: () => {
                nexus.body.enable = false;
                this.salidaS.play(this.musicConf2);
            },
            onComplete: () => {
                this.registry.events.emit('vidasRestantes', this.data.list.vidas);
                this.salidaS.play(this.musicConf2);
                //this.scene.stop('Scene_puzzle1_caida');
                //this.scene.stop();
                //this.scene.launch('Scene_puzzle1');
                // this.scene.transition({
                //     target: 'Scene_puzzle2',
                //     duration: 1000,
                //     moveAbove: true,
                //     onUpdate: this.transitionOut,
                //     data: { x: 500, y: 320 }
                // });
                nexus.body.enable = true;
                //nexus.x = 30;
                //nexus.y = 600;
                //nexus.alpha = 1;
                this.scene.stop();
                this.scene.start('Scene_3');
                this.registry.events.emit('dame_datos', 0);
                
            }, 
        });
    }

    update(time, delta) {

        //Dejar esto en vez del choque y la velocidad para que sigan a nexus.
        // this.grupoMonstruos.children.iterate( (mC) => {
        //     this.physics.moveToObject(mC, this.nexus, 200);
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

        if(Phaser.Input.Keyboard.JustDown(this.abrir) && this.data.list.dracmas<140 && this.data.list.monedas<10){
            this.chest.anims.play('abrir');
            let cofreOpen = this.sound.add("cofreOpen",{loop:false});
            cofreOpen.play();
            
            this.grupod = this.physics.add.group({
                key: 'dracmas',
                repeat: 5,
                setXY: { x:968, y: 180, stepY: 65 }
            });
            
            this.grupod.children.iterate( (girar) => {
                girar.setScale(0.9);
                girar.setDepth(3);
                girar.body.allowGravity = false;
                girar.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            });
    
            this.grupod.playAnimation('dracma');
            this.physics.add.collider(this.grupod,this.paredes0);
            this.physics.add.overlap(this.nexus, this.grupod, this.recoger, null, this);
            this.data.list.monedas+=5;
        }

    }
}
export default Scene_puzzle0;