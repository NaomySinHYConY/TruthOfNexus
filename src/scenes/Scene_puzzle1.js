class Scene_puzzle1 extends Phaser.Scene{
    constructor(){
        super({
            key: 'Scene_puzzle1'
        });
    }

    init() {
        console.log('Escena del primer puzzle');
    }
    preload(){
        
        this.load.path = './assets/puzzle1/';
        this.load.image(['fondoP', 'fondo-izq', 'fondo-der', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'hoyo', 'salida']);
        this.load.atlas('monstruo_fly','mCueva/monstruo_fly.png','mCueva/monstruo_fly_atlas.json');
        this.load.animation('mCuevaAnim','mCueva/monstruo_fly_anim.json');
        this.load.atlas('nexus_head','nexusHead/nexus_head.png','nexusHead/nexus_head_atlas.json');
        this.load.animation('nexusHeadAnim','nexusHead/nexus_head_anim.json');

        this.load.audio("fondopuzzle", ["../sounds/puzzle.mp3"]);
        
        this.load.audio("sPuzzle7", ["../sounds/sPuzzle7.mp3"]);
        this.load.audio("sPuzzle8", ["../sounds/sPuzzle8.mp3"]);
        
        this.load.audio("sPuzzle15", ["../sounds/sPuzzle15.mp3"]);
       
        this.load.audio("salida", ["../sounds/salida.mp3"]);
    }

    create() {
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        this.velocidadNexus = 300;
        this.musica();
        this.fondoP = this.add.image(500, 320, 'fondoP');

        this.fondoizq = this.physics.add.image(0, 0, 'fondo-izq').setOrigin(0).setImmovable(true);
        this.fondoizq.body.allowGravity = false;

        this.fondoder = this.physics.add.image(1000, 0, 'fondo-der').setOrigin(1,0).setImmovable(true);
        this.fondoder.body.allowGravity = false;

        this.salida = this.physics.add.image(496.5, 48.5, 'salida').setImmovable(true);
        this.salida.body.allowGravity = false;

        this.nexus = this.physics.add.sprite(30, 600, 'nexus_head').setInteractive().setScale(1.3).setCollideWorldBounds(true);
        this.nexus.body.allowGravity = false;
        //this.nexus.anims.play('nexus_dead');
        //this.nexus.setFrame('head_6');


        this.grupoMonstruos = this.physics.add.group();
        this.grupoMonstruos.create(500, 525, 'monstruo_fly');
        this.grupoMonstruos.create(600, 330, 'monstruo_fly');
        this.grupoMonstruos.create(300, 330, 'monstruo_fly');
        this.grupoMonstruos.children.iterate( (mC) => {
            mC.setInteractive().setScale(0.12);
            mC.body.allowGravity = false;
            mC.body.velocity.x=-100;
            mC.setImmovable = true;
        } );
        this.grupoMonstruos.playAnimation('mcueva_fly');

        this.paredes = this.physics.add.group();
        this.paredes.create(79.5, 351, 'p1').setName('p1');
        this.paredes.create(918.5, 366, 'p2').setName('p2');
        this.paredes.create(174.5, 366, 'p3');
        this.paredes.create(397.5, 142, 'p4');
        this.paredes.create(639.5, 142, 'p5');
        this.paredes.create(252, 190, 'p6');
        this.paredes.create(352, 372, 'p7');
        this.paredes.create(436, 286, 'p8');
        this.paredes.create(228, 478, 'p9');
        this.paredes.create(529, 478, 'p10');
        this.paredes.create(748, 478, 'p11');
        this.paredes.create(716.5, 286, 'p12');
        this.paredes.create(716.5, 372, 'p13');
        this.paredes.create(513.5, 286, 'p14');
        this.paredes.create(378.5, 478, 'p15');
        this.paredes.create(284.5, 286, 'p16');
        this.paredes.create(5, 351, 'p17');
        this.paredes.create(352, 94, 'p18');
        this.paredes.create(546.5, 574, 'p19');
        this.paredes.create(779, 158, 'p20');
        this.paredes.create(504, 638, 'p21');
        this.paredes.create(1000, 386, 'p22');

        //this.paredes.getChildren()[i];
        
        this.paredes.children.iterate( (p) => {
            p.setImmovable(true);
            p.body.allowGravity = false;
            //this.physics.add.collider(this.monstruo_fly,p);    
        } );

        this.hoyos = this.physics.add.group();
        this.hoyos.create(37.5, 266.5, 'hoyo');
        this.hoyos.create(455.5, 183.5, 'hoyo');
        this.hoyos.create(335, 285.5, 'hoyo').setScale(0.6);
        //this.hoyos.create(228.5, 424.5, 'hoyo');
        this.hoyos.create(326.5, 478.5, 'hoyo').setScale(0.6);
        this.hoyos.create(638.5, 478.5, 'hoyo').setScale(0.65);
        this.hoyos.create(860.5, 228.5, 'hoyo');
        this.hoyos.create(965.5, 196.5, 'hoyo');
        
        this.hoyos.children.iterate((h) =>{
            h.body.allowGravity = false;
            h.alpha = 0.1;
            h.setImmovable(true);
        });

        this.physics.add.collider(this.paredes,this.grupoMonstruos, this.choquePared, null, this);
        this.physics.add.collider(this.fondoder, this.nexus);
        this.physics.add.collider(this.fondoizq, this.nexus);
        this.physics.add.collider(this.paredes,this.nexus);
        this.physics.add.overlap(this.nexus,this.grupoMonstruos, this.choqueNexus, null, this);
        this.physics.add.overlap(this.nexus, this.hoyos, this.caida, null, this);
        this.physics.add.overlap(this.nexus, this.salida, this.salir, null, this);

        //Controles
        //this.nexusWalkA = this.input.keyboard.addKey(keyCodes.U);
        this.nexusWalkIz = this.input.keyboard.addKey(keyCodes.LEFT);
        this.nexusWalkDer = this.input.keyboard.addKey(keyCodes.RIGHT);
        this.nexusUp = this.input.keyboard.addKey(keyCodes.UP);
        this.nexusDown = this.input.keyboard.addKey(keyCodes.DOWN);

    }

    choquePared(pared, monstruo){
        let direccion = monstruo.body.velocity.x;
        //console.log(direccion);
        if (direccion == 0 && monstruo.flipX){
            monstruo.flipX = false;
            monstruo.body.velocity.x = -100;
        }
        else{
            monstruo.flipX = true;
            monstruo.body.velocity.x = 100;
        }
        //monstruo.

        this.nexusUp.on('down', () => {
            
        });
    }

    choqueNexus(nexus, monstruo){
        this.tweens = this.add.tween({
            targets: [this.nexus],
            ease: 'Linear',
            alpha: 0,
            duration: 2000,
            onStart: () => {
                nexus.body.enable = false;
                this.golpe.play(this.musicConf2);
                nexus.anims.play('nexus_dead');
            },
            onComplete: () => {
                nexus.body.enable = true;
                nexus.x = 30;
                nexus.y = 600;
                nexus.alpha = 1;
            }, 
        });
        
    }

    
    musica(){
        this.fondopuzzle = this.sound.add("fondopuzzle");
        
        this.golpe = this.sound.add("sPuzzle7");
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
        //nexus.body.enable = false;
        // setTimeout(() => {
        //     this.caer.play(this.musicConf2);
        //     nexus.anims.play('nexus_fall');
        // }, 2000);
        this.tweens = this.add.tween({
            targets: [this.nexus],
            ease: 'Linear',
            alpha: 0,
            duration: 2000,
            onStart: () => {
                this.caer.play(this.musicConf2);
                nexus.anims.play('nexus_fall');
            },
            onComplete: () => {
                this.scene.pause();
                this.scene.launch('Scene_puzzle1_caida');
            }, 
        });
    }

    salir(nexus){
        this.tweens = this.add.tween({
            targets: [this.nexus],
            ease: 'Linear',
            y: 10,
            duration: 3000,
            onStart: () => {
                nexus.body.enable = false;
                this.salidaS.play(this.musicConf2);
            },
            onComplete: () => {
                nexus.body.enable = true;
                nexus.x = 30;
                nexus.y = 600;
                //nexus.alpha = 1;
            }, 
        });
        this.salidaS.play(this.musicConf2);

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
export default Scene_puzzle1;