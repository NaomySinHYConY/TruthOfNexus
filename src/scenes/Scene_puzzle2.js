class Scene_puzzle2 extends Phaser.Scene{
    constructor(){
        super({
            key: 'Scene_puzzle2'
        });
    }

    init() {
        console.log('Escena del segundo puzzle');
    }
    preload(){
        
        this.load.path = './assets/puzzle2/';
        this.load.image(['fondoP2', 'fondo-izq2', 'fondo-der2', 'salida2', 'hoyo2', 'piedraParo', 'pa1', 'pa2', 'pa3']);
        this.load.atlas('slime','slime/slime.png','slime/slime_atlas.json');
        this.load.animation('slimeAnim','slime/slime_anim.json');
        this.load.atlas('piedras','piedras/piedras.png','piedras/piedras_atlas.json');
        this.load.animation('pidrasAnim','piedras/piedras_anim.json');
        this.load.atlas('nexus_head','nexusHead/nexus_head.png','nexusHead/nexus_head_atlas.json');
        this.load.animation('nexusHeadAnim','nexusHead/nexus_head_anim.json');

        this.load.audio("fondopuzzle", ["../sounds/puzzle.mp3"]);
        
        this.load.audio("golpe", ["../sounds/golpe.mp3"]);
        this.load.audio("sPuzzle8", ["../sounds/sPuzzle8.mp3"]);
        
        this.load.audio("sPuzzle15", ["../sounds/sPuzzle15.mp3"]);
       
        this.load.audio("salida", ["../sounds/salida.mp3"]);
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
        //console.log(this.data.getAll());

        this.registry.events.on('vidasRestantes', (vidas) => {
            this.data.set('vidas', vidas);
        });

        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        this.velocidadNexus = 300;
        this.musica();
        this.fondoP2 = this.add.image(500, 320, 'fondoP2');

        this.fondoizq2 = this.physics.add.image(0, 0, 'fondo-izq2').setOrigin(0).setImmovable(true);
        this.fondoizq2.body.allowGravity = false;

        this.fondoder2 = this.physics.add.image(1000, 0, 'fondo-der2').setOrigin(1,0).setImmovable(true);
        this.fondoder2.body.allowGravity = false;

        this.salida2 = this.physics.add.image(496.5, 48.5, 'salida2').setImmovable(true);
        this.salida2.body.allowGravity = false;

        this.zonaInicial = this.add.zone(20, 520).setSize(70, 100);
        this.physics.world.enable(this.zonaInicial);
        this.zonaInicial.body.setAllowGravity(false);
        this.zonaInicial.body.moves = false;

        this.grupoMonstruos2 = this.physics.add.group();
        this.grupoMonstruos2.create(45, 181.5, 'slime');
        this.grupoMonstruos2.create(477, 94.5, 'slime');
        this.grupoMonstruos2.create(960, 218.5, 'slime');
        this.grupoMonstruos2.children.iterate( (mS) => {
            mS.setInteractive().setScale(1);
            mS.body.allowGravity = false;
            mS.body.velocity.x=-100;
            mS.setImmovable = true;
            //mS.setCollideWorldBounds(true);
        } );
        this.grupoMonstruos2.playAnimation('walk');

        this.grupoPiedras = this.physics.add.group();
        this.grupoPiedras.create(50.5, 470.5, 'piedras');
        this.grupoPiedras.create(145.5, 595.5, 'piedras');
        this.grupoPiedras.create(328.5, 270.5, 'piedras');
        this.grupoPiedras.create(651.5, 531.5, 'piedras');
        this.grupoPiedras.create(732.5, 595.5, 'piedras');
        //this.paredes.getChildren()[i];
        
        this.grupoPiedras.children.iterate( (p) => {
            //p.setImmovable(true);
            p.body.allowGravity = false;
            p.body.setOffset(25, 15);
            p.body.setCircle(15);
            //this.physics.add.collider(this.monstruo_fly,p);    
        } );
        //this.grupoPiedras.playAnimation('marcar');

        this.hoyos2 = this.physics.add.group();
        this.hoyos2.create(37.5, 403.5, 'hoyo2');
        this.hoyos2.create(217.5, 606.5, 'hoyo2');
        this.hoyos2.create(392.5, 95.5, 'hoyo2');
        //this.hoyos.create(228.5, 424.5, 'hoyo');
        this.hoyos2.create(637.5, 95.5, 'hoyo2');
        this.hoyos2.create(649, 605.5, 'hoyo2');
        this.hoyos2.create(963.5, 450.5, 'hoyo2');
        //this.hoyos.create(965.5, 196.5, 'hoyo');
        
        this.hoyos2.children.iterate((h) =>{
            h.body.allowGravity = false;
            h.alpha = 0.1;
            h.setImmovable(true);
            h.body.setSize(45,45);
        });

        this.grupoPiedrasParo = this.physics.add.group();
        this.grupoPiedrasParo.create(332.5, 176, 'piedraParo');
        this.grupoPiedrasParo.create(637.5, 223, 'piedraParo');
        
        this.grupoPiedrasParo.children.iterate((pp) =>{
            pp.body.allowGravity = false;
            //pp.alpha = 0.1;
            pp.setImmovable(true);
            //pp.body.setSize(45,45);
        });

        this.paredes = this.physics.add.group();
        this.paredes.create(5, 380, 'pa1');
        this.paredes.create(504.5, 633, 'pa2');
        this.paredes.create(993, 380, 'pa3');

        //this.paredes.getChildren()[i];
        
        this.paredes.children.iterate( (p) => {
            p.setImmovable(true); 
            p.body.allowGravity = false;
            //this.physics.add.collider(this.monstruo_fly,p);    
        } );

        
        this.nexus = this.physics.add.sprite(40, 531, 'nexus_head').setInteractive().setScale(1.3).setCollideWorldBounds(true);
        this.nexus.body.allowGravity = false;
        this.nexus.body.setSize(25,20);
        this.nexus.body.setOffset(-2,2);
        //this.nexus.anims.play('nexus_dead');
        //this.nexus.setFrame('head_6');


        this.physics.add.collider(this.grupoPiedrasParo,this.grupoMonstruos2, this.choquePared, null, this);
        this.physics.add.collider(this.paredes,this.grupoMonstruos2, this.choquePared, null, this);
        this.physics.add.collider(this.hoyos2,this.grupoMonstruos2, this.choquePared, null, this);
        this.physics.add.overlap(this.nexus, this.grupoPiedras, this.areaLimpia, null, this);
        this.physics.add.collider(this.fondoder2, this.nexus, this.nexusPared, null, this);
        this.physics.add.collider(this.fondoizq2, this.nexus, this.nexusPared, null, this);
        this.physics.add.collider(this.paredes,this.nexus, this.nexusPared, null, this);
        this.physics.add.collider(this.grupoPiedrasParo,this.nexus, this.nexusPared, null, this);
        this.physics.add.overlap(this.nexus,this.zonaInicial);
        //this.physics.add.overlap(this.nexus, this.hoyos, this.caida, null, this);
        // this.physics.add.overlap(this.nexus, this.salida, this.salir, null, this);

        //Controles
        //this.nexusWalkA = this.input.keyboard.addKey(keyCodes.U);
        this.nexusWalkIz = this.input.keyboard.addKey(keyCodes.LEFT);
        this.nexusWalkDer = this.input.keyboard.addKey(keyCodes.RIGHT);
        this.nexusUp = this.input.keyboard.addKey(keyCodes.UP);
        this.nexusDown = this.input.keyboard.addKey(keyCodes.DOWN);

    }

    areaLimpia(nexus, piedras){
        this.tweens = this.add.tween({
            targets: [this.nexus],
            ease: 'Linear',
            y: piedras.y,
            x: piedras.x,
            duration: 500,
            onStart: () => {
                this.reiniciarAreasLimpias();
                nexus.setVelocity(0);
                nexus.body.enable = false;
                //this.salidaS.play(this.musicConf2);
            },
            onComplete: () => {
                nexus.body.enable = true;
                piedras.body.enable = false;
                this.input.keyboard.enabled = true;
                piedras.anims.play('marcar');
                //nexus.x = 30;
                //nexus.y = 600;
                //nexus.alpha = 1;
            }, 
        });
    }

    nexusPared(paredes, nexus){
        this.reiniciarAreasLimpias();
        nexus.setVelocity(0);
        this.input.keyboard.enabled = true;
    }

    choquePared(pared, monstruo){
        //this.reiniciarAreasLimpias();
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
        nexus.anims.play('nexus_dead');
        this.data.list.vidas--;
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
                //nexus.body.enable = true;
                nexus.x = 30;
                nexus.y = 600;
                nexus.alpha = 1;
                nexus.setFrame(0);
                if(this.data.list.vidas!=0){
                    this.nexus.body.enable = true;
                }
                else{
                    this.scene.stop();
                }
            }, 
        });
        
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
                this.scene.pause();
                this.scene.start('Scene_puzzle1_caida', hoyo);
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
                nexus.body.enable = true;
                nexus.x = 30;
                nexus.y = 600;
                //nexus.alpha = 1;
            }, 
        });
        this.salidaS.play(this.musicConf2);

    }

    reiniciarAreasLimpias(){
        this.grupoPiedras.children.iterate( (p) => {
            p.body.enable = true;    
        });
    }

    update(time, delta) {
        console.log(this.input.keyboard.enabled);
        //Dejar esto en vez del choque y la velocidad para que sigan a nexus.
        // this.grupoMonstruos.children.iterate( (mC) => {
        //     this.physics.moveToObject(mC, this.nexus, 200);
        // } );

        // if(!this.zonaInicial.body.touching.none){
        //     this.input.keyboard.enabled = true;
        //     console.log("Está dentro");
        // }
        // else{
        //     //this.input.keyboard.enabled = false;
        //     console.log("Salió");
        // }

        if( Phaser.Input.Keyboard.JustDown(this.nexusWalkDer)){
            console.log("derecha");
            //band = true;
            // if(this.estaEnPiedra){
            //     this.grupoPiedras.children.iterate( (p) => {
            //         p.body.enable = false;    
            //     } );
            // }
            this.nexus.setFrame('head_10');
            this.nexus.body.velocity.x = this.velocidadNexus;
            this.nexus.body.velocity.y = 0;
            //this.input.keyboard.enabled = this.zonaInicial.body.touching.none ? false : true;
            this.input.keyboard.enabled = false;
        }        
        else if(Phaser.Input.Keyboard.JustDown(this.nexusWalkIz)){
            console.log("izquierda");
            this.nexus.setFrame('head_2');
            this.nexus.body.velocity.x = this.velocidadNexus*-1;
            this.nexus.body.velocity.y = 0;
            //this.input.keyboard.enabled = this.zonaInicial.body.touching.none ? false : true;
            this.input.keyboard.enabled = false;
            //this.nexus.body.setVelocity(-100,0);
        }
        else if(Phaser.Input.Keyboard.JustDown(this.nexusUp)){
            console.log("arriba");
            this.nexus.setFrame('head_6');
            this.nexus.body.velocity.y = this.velocidadNexus*-1;
            this.nexus.body.velocity.x = 0;
            //this.input.keyboard.enabled = this.zonaInicial.body.touching.none ? false : true;
            this.input.keyboard.enabled = false;
        }
        else if(Phaser.Input.Keyboard.JustDown(this.nexusDown)){
            console.log("abajo");
            this.nexus.setFrame('head_1');
            this.nexus.body.velocity.y = this.velocidadNexus;
            this.nexus.body.velocity.x = 0;
            //this.input.keyboard.enabled = this.zonaInicial.body.touching.none ? false : true;
            this.input.keyboard.enabled = false;
        }
        // if( Phaser.Input.Keyboard.JustUp(this.nexusWalkDer) || Phaser.Input.Keyboard.JustUp(this.nexusWalkIz) || Phaser.Input.Keyboard.JustUp(this.nexusDown)
        // || Phaser.Input.Keyboard.JustUp(this.nexusUp) ){
        //     this.nexus.body.setVelocity(0);
        // }
    }
}
export default Scene_puzzle2;