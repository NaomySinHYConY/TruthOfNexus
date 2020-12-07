class Scene_3 extends Phaser.Scene{
    constructor(){
        super({
            key: 'Scene_3'
        });
    }

    init() {
        console.log('Tecera escena');
    }

    preload() {
        this.load.path = './assets/';
        this.load.spritesheet('fondo_3', 'fondo/fondoR.png', {
            frameWidth: 800,
            frameHeight: 336,
            margin: 0,
            spacing: 0
        });
        this.load.image('plataforma_3','fondo/plataforma_3.png');
        this.load.image('plataforma_3_gris','fondo/plataforma_3_gris.png');
        
        this.load.atlas('nexus_all', 'Nexus/nexus_all.png','Nexus/nexus_all_atlas.json');
        this.load.animation('nexusAnim', 'Nexus/nexus_all_anim.json');
        
        this.load.atlas('shadow_all', 'shadow/shadow_all.png','shadow/shadow_all_atlas.json');
        this.load.animation('shadowAnim', 'shadow/shadow_all_anim.json');

        this.load.atlas('minotauro','Minotauro/minotauro.png','Minotauro/minotauro_atlas.json');
        this.load.animation('minotauroAnim','Minotauro/minotauro_anim.json');

        this.load.atlas('key','key/key.png','key/key_atlas.json');
        this.load.animation('keyAnim','key/key_anim.json');

        this.load.image('entrada','fondo/salida.png');

    }

    create(){
    //DAtos
        this.data.set('Mvidas',3);
        this.data.set('keys',0);
        this.mino_acata = false;
        const eventos = Phaser.Input.Events;
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;

        this.fondo = this.add.sprite(0, 0,'fondo_3',0).setOrigin(0).setScale(1.25,1.907);
        this.anims.create({
            key: 'fondo_anim_3',
            frames: this.anims.generateFrameNumbers('fondo_3', {
            start: 0,
            end: 7
            }),
            repeat: -1,
            frameRate: 8
        });
        this.fondo.anims.play('fondo_anim_3');

        this.entrada = this.add.image(890, 550, 'entrada').setInteractive().setOrigin(0, 0.5).setScale(.25,.33);
        this.physics.add.existing(this.entrada, true);
        this.entrada.body.setSize(50, 400);
        this.entrada.body.setOffset(60, 0);

    //plataformas
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(  0, 635, 'plataforma_3_gris').setScale(2, 1).setOrigin(0).refreshBody();
        this.platforms.create(180, 635, 'plataforma_3_gris').setScale(2, 1).setOrigin(0).refreshBody();
        this.platforms.create(360, 635, 'plataforma_3_gris').setScale(2, 1).setOrigin(0).refreshBody();
        this.platforms.create(880, 635, 'plataforma_3_gris').setScale(2, 1).setOrigin(0).refreshBody();

    //plataformas voladoras
        this.platforms.create(150, 500, 'plataforma_3_gris').setScale(1.8, 0.3).setOrigin(0).refreshBody();
        this.platforms.create(320, 400, 'plataforma_3_gris').setScale(1.8, 0.3).setOrigin(0).refreshBody();
        this.platforms.create(438, 200, 'plataforma_3_gris').setScale(2.2, 0.3).setOrigin(0).refreshBody();
    
    //Piso de la muerte
        this.piso_de_muerte1 = this.physics.add.image(540, 639, 'plataforma_3').setInteractive().setScale(2, 1.3).setOrigin(0);
        this.piso_de_muerte2 = this.physics.add.image(720, 639, 'plataforma_3').setInteractive().setScale(2, 1.3).setOrigin(0);
        this.physics.add.existing(this.piso_de_muerte1, true);
        this.physics.add.existing(this.piso_de_muerte2, true);
        this.piso_de_muerte2.body.setAllowGravity(false);
        this.piso_de_muerte1.body.setAllowGravity(false);

    //Sombras Enemigos
        this.mino_vivo = true;
        this.minotauro = this.physics.add.sprite(500,80, 'minotauro', 0).setInteractive();
        this.minotauro.setScale(1.7);
        this.minotauro.setName('Mino');
        this.minotauro.setOrigin(0.5);
        this.minotauro.body.setSize(50,100);
        this.minotauro.body.setOffset(30,40);
        this.minotauro.setCollideWorldBounds(true);
        this.minotauro.anims.play('idle');

    //Protagonista
        this.nexus = this.physics.add.sprite(35,170, 'nexus_all', 0).setInteractive().setScale(1.9);
        this.nexus.setName('Nexus');
        this.nexus.setFlipX(true);
        this.nexus.setOrigin(0.5);
        this.nexus.setDepth(2);
        this.nexus.body.setSize(50,85);
        this.nexus.body.setOffset(30,30);
        this.nexus.setCollideWorldBounds(true);
        this.nexus.anims.play('stand');

    //Controles:
        this.nexusWalkIz = this.input.keyboard.addKey(keyCodes.LEFT);
        this.nexusWalkDer = this.input.keyboard.addKey(keyCodes.RIGHT);
        this.nexusUp = this.input.keyboard.addKey(keyCodes.UP);
        this.nexusDown = this.input.keyboard.addKey(keyCodes.DOWN);
        this.nexusAttack = this.input.keyboard.addKey(keyCodes.O);

        this.nexusUp.on('down', () => {
            if(this.nexus.body.touching.down){
                this.nexus.body.setVelocityY(-600);
                this.nexus.anims.play('jump');
            }
        });
        this.nexusUp.on('up', () => {
            this.nexus.anims.play('stand');
            if(this.nexusWalkDer.isDown){
                this.nexus.anims.play('walk');
            }
            if(this.nexusWalkIz.isDown){
                this.nexus.anims.play('walk');
            }
        });

    //choque de personajes
        this.physics.add.collider(this.platforms, this.nexus);
        this.physics.add.collider(this.platforms, this.minotauro);
        this.data.set('vidas',4);

    //CAmbio de escena
        this.physics.add.collider(this.nexus, this.entrada, this.avanza_nivel, null, this);
    //Escena de muerte
        this.physics.add.overlap(this.nexus, this.piso_de_muerte1, this.muere_nexus, null, this);
        this.physics.add.overlap(this.nexus, this.piso_de_muerte2, this.muere_nexus, null, this);

    //Madrazos, man es que soy sanguinario  loco
        this.physics.add.overlap(this.nexus, this.minotauro, this.ataque, null, this);

    //PowerUps
        this.shield = false;

    }

    update(){
        var posInX =  this.nexus.x;
        var posInY =  this.nexus.y;

        if( Phaser.Input.Keyboard.JustDown(this.nexusWalkDer)){
            //band = true;
            this.nexus.setFlipX(true);
            //this.nexus.body.setSize(50,85);
            this.nexus.body.setOffset(30,30);
            this.nexus.body.velocity.x = 160;
            this.nexus.anims.play('walk');
        }else if(Phaser.Input.Keyboard.JustDown(this.nexusWalkIz)){
            //band = false;
            this.nexus.setFlipX(false);
            this.nexus.body.velocity.x = -160;
            //this.nexus.body.setSize(50,85);
            this.nexus.body.setOffset(20,30);
            this.nexus.anims.play('walk');
        }
        else if(Phaser.Input.Keyboard.JustDown(this.nexusDown)){
            this.nexus.body.velocity.y = 160;
            this.nexus.anims.play('jump');
            //this.nexus.setScale(1.5);
            //this.nexus.body.setSize(50, 50);
            this.tweensAtaque = this.add.tween({
                targets: [this.nexus],
                ease: 'Power2',
                //y:posInY+50,
                y:{
                    value: this.nexus.y++,
                    duration: 500
                },
                repeat: 0,
                onComplete: () => {
                    this.nexus.anims.play('stand');
                    //this.nexus.body.setOffset(0,0);
                    //this.nexus.body.setSize(50, 85);
                    //this.nexus.setX(posInX);
                    //this.nexus.setY(posInY);
                }
            });
        }

        if(Phaser.Input.Keyboard.JustDown(this.nexusAttack)){
            //this.nexus.anims.play('attack');
            this.tweensAtaque = this.add.tween({
                targets: [this.nexus],
                ease: 'Power2',
                //y:posInY+50,
                x:{
                    //delay: 100,
                    value: posInX+10,
                    ease: 'Circ',
                    duration: 600
                },
                y:{
                    //delay: 100,
                    value: posInY--,
                    duration: 600,
                    offset: true
                },
                repeat: 0,
                onStart: () =>{
                    this.nexus.anims.play('attack');
                    if(this.nexus.flipX){
                        this.nexus.body.setSize(70,85);
                        this.nexus.body.setOffset(40, 30);
                    }
                    else{
                        this.nexus.body.setSize(70,85);
                        this.nexus.body.setOffset(0, 30);
                    }
                },
                onComplete: () => {
                    this.nexus.anims.play('stand');
                    this.nexus.body.setSize(50,85);
                    this.nexus.setOffset(30,30);
                    //this.nexus.setX(posInX);
                    //this.nexus.setY(posInY);
                }
            });
        }

        if( Phaser.Input.Keyboard.JustUp(this.nexusAttack) || Phaser.Input.Keyboard.JustUp(this.nexusWalkDer) || Phaser.Input.Keyboard.JustUp(this.nexusWalkIz) || Phaser.Input.Keyboard.JustUp(this.nexusDown)){
            this.nexus.anims.play('stand');
            //this.nexus.setFlipX(true);
            this.nexus.clearTint();
            this.nexus.setScale(1.7);
            this.nexus.setAngle(0);
            this.nexus.body.velocity.x = 0;
            this.nexus.body.velocity.y = 0;
        }

        if(this.shield==false){
            this.nexus.clearTint();
        }else if(this.shield==true){
            this.nexus.setTint(Math.random() * 0xffffff);
        }
    }

    muere_nexus()
    {
        console.log('Emite muerte');
        this.nexus.body.enable = false;
        
        this.registry.events.emit('menosVida');
        this.tweenMuerte = this.add.tween({
            targets: [this.nexus],
            ease: 'Power2',
            duration:2000,
            x:{
                value: this.nexus.x-=1,
                duration: 1000
            },
            repeat: 0,
            onStart: () => {
                let end = this.sound.add("laugh",{loop:false});
                end.play();
                this.nexus.anims.play('die');
            },
            onComplete: () => {
                this.nexus.x= 20;
                this.nexus.y = 370;
                this.nexus.anims.play('stand');
                if(this.data.list.vidas!=0){
                    this.nexus.body.enable = true;
                }
                else{
                    this.scene.stop();
                }
            }
        });

        if(this.shield==true){
            this.shield=false;
            this.registry.events.emit('shieldOff');
        }else{
            this.data.list.vidas--;
        }
    }

    ataque(){
        if(this.nexusAttack.isDown){
            this.minotauro_ataca();
            this.data.list.Mvidas--;
            this.tweenMuerte = this.add.tween({
                targets: [this.minotauro],
                ease: 'Power2',
                x:{
                    value: this.minotauro.x+=90,
                    duration: 1000
                },
                repeat: 0,
                onStart: () => {
                    let hit = this.sound.add("hit",{loop:false});
                    hit.play();
                },
            });
            if(this.data.list.Mvidas <= 0 && this.mino_vivo == true){
                this.mino_vivo = false;
                this.minotauro.anims.play('die_mino');

        //NO se pase de listo compa
                this.muro0 = this.physics.add.image(630, 180, 'plataforma_3', 0).setInteractive().setScale(2,1).setOrigin(0).setImmovable(true);
                this.muro1 = this.physics.add.image(630, 160, 'plataforma_3', 0).setInteractive().setScale(2,1).setOrigin(0).setImmovable(true);
                this.muro2 = this.physics.add.image(630, 140, 'plataforma_3', 0).setInteractive().setScale(2,1).setOrigin(0).setImmovable(true);
                this.muro3 = this.physics.add.image(630, 120, 'plataforma_3', 0).setInteractive().setScale(2,1).setOrigin(0).setImmovable(true);
                this.muro4 = this.physics.add.image(630, 100, 'plataforma_3', 0).setInteractive().setScale(2,1).setOrigin(0).setImmovable(true);
                this.muro5 = this.physics.add.image(630,  80, 'plataforma_3', 0).setInteractive().setScale(2,1).setOrigin(0).setImmovable(true);
                this.muro6 = this.physics.add.image(630,  60, 'plataforma_3', 0).setInteractive().setScale(2,1).setOrigin(0).setImmovable(true);
                this.muro7 = this.physics.add.image(630,  40, 'plataforma_3', 0).setInteractive().setScale(2,1).setOrigin(0).setImmovable(true);
                this.muro8 = this.physics.add.image(630,  20, 'plataforma_3', 0).setInteractive().setScale(2,1).setOrigin(0).setImmovable(true);
                this.muro9 = this.physics.add.image(630,   0, 'plataforma_3', 0).setInteractive().setScale(2,1).setOrigin(0).setImmovable(true);
            //Agregando a la fisica
                this.physics.add.existing(this.muro0, true);
                this.physics.add.existing(this.muro1, true);
                this.physics.add.existing(this.muro2, true);
                this.physics.add.existing(this.muro3, true);
                this.physics.add.existing(this.muro4, true);
                this.physics.add.existing(this.muro5, true);
                this.physics.add.existing(this.muro6, true);
                this.physics.add.existing(this.muro7, true);
                this.physics.add.existing(this.muro8, true);
                this.physics.add.existing(this.muro9, true);
            //Desactivando gravedad
                this.muro0.body.setAllowGravity(false);
                this.muro1.body.setAllowGravity(false);
                this.muro2.body.setAllowGravity(false);
                this.muro3.body.setAllowGravity(false);
                this.muro4.body.setAllowGravity(false);
                this.muro5.body.setAllowGravity(false);
                this.muro6.body.setAllowGravity(false);
                this.muro7.body.setAllowGravity(false);
                this.muro8.body.setAllowGravity(false);
                this.muro9.body.setAllowGravity(false);
            //que choquen
                this.physics.add.collider(this.nexus, this.muro9);
                this.physics.add.collider(this.nexus, this.muro8);
                this.physics.add.collider(this.nexus, this.muro7);
                this.physics.add.collider(this.nexus, this.muro6);
                this.physics.add.collider(this.nexus, this.muro5);
                this.physics.add.collider(this.nexus, this.muro4);
                this.physics.add.collider(this.nexus, this.muro3);
                this.physics.add.collider(this.nexus, this.muro2);
                this.physics.add.collider(this.nexus, this.muro1);
                this.physics.add.collider(this.nexus, this.muro0);
                
                /*
            Aparicion de la llave y de lo que deberia ser el pinche booster
                */
                // this.boost = this.physics.add.group({
                //     key: '',
                //     repeat: 0,
                //     setXY:{ x:70, y:100}
                // })
                this.keys = this.physics.add.group({
                    key: 'key',
                    repeat: 1,
                    setXY:{ x:70, y:100, stepX: 820}
                });

                this.keys.playAnimation('key_roll');
                this.physics.add.collider(this.keys, this.platforms);
                this.physics.add.overlap(this.nexus, this.keys, this.toma_keys, null, this);
            //ACtivar boost
                //this.physics.add.collider(this.boost, this.platforms);
                //this.physics.add.overlap(this.nexus, this.keys, this.booster, null, this);
                
                
        
                this.minotauro.body.setVelocityX(0);
            }
        }
        else{
            this.muere_nexus();
        }
    }

    shadow_die(nexus, shadow){
        if(this.nexusAttack.isDown){
            let shadDie = this.sound.add("shadowDie",{loop:false});
            shadDie.play();
            shadow.destroy();
        }
        else{
            this.muere_nexus();
        }
    }

    toma_keys(nexus, keys){
        console.log("Recoge llave");
        keys.destroy();
        this.data.list.keys += 1;

//Por si se suman a las llaves de la tienda aqui se descomenta
//this.registry.events.emit('recogeKey', 20);
        let recoge = this.sound.add("moneda",{loop:false});
        recoge.play();

    //Matando al minotauro y generando villanos
    //y quitando la plataforma que no deja pasar
        if(this.data.list.keys==1){
            this.adios_muros();
//COMENTAR LA SIGUIENTES 2 SI YA HAY BOOST 
            this.shield=true;
            this.registry.events.emit('shieldOn');
            this.minotauro.destroy();
            
    //Aqui agregamos los pinches villanos xD
            /*
    Generamos todo esto despues de que muere el minotauro
            */
    //shadows
            this.shadows = this.physics.add.group({
                key: 'shadow_all',
                repeat: 2,
                setXY: { x:280, y: 100, stepX: 160 }
            });

            this.shadows.children.iterate( (shadow) => {
                shadow.setScale(1.5);
                shadow.setDepth(3);
            });
            this.shadows.setVelocityX(-30, 0);
            this.shadows.playAnimation('shadow_stand');

            this.physics.add.collider(this.shadows, this.platforms);
            this.physics.add.collider(this.shadows, this.platforms);
            this.physics.add.overlap(this.nexus, this.shadows, this.shadow_die, null, this);
            this.piso_temp = this.physics.add.image(540,500,'plataforma_3').setInteractive().setScale(0.8,1.3).setOrigin(0);
            this.physics.add.existing(this.piso_temp, true);
            this.piso_temp.body.setAllowGravity(false);
            this.physics.add.collider(this.nexus, this.piso_temp);
            this.physics.add.overlap(this.nexus, this.piso_temp, this.destruye_piso, null, this);

        }                
    }

    destruye_piso(){
        this.piso_temp.destroy();
    }

    adios_muros(){
        this.muro0.destroy();
        this.muro1.destroy();
        this.muro2.destroy();
        this.muro3.destroy();
        this.muro4.destroy();
        this.muro5.destroy();
        this.muro6.destroy();
        this.muro7.destroy();
        this.muro8.destroy();
        this.muro9.destroy();
    }

    avanza_nivel(){
        if(this.data.list.keys==2){
            if(this.data.list.vidas==4){
                let win = this.sound.add("impressive",{loop:false});
                win.play();        
            }
            this.scene.stop();
/**
 * Escena que sigue
 */
            //            this.scene.launch('Scene_final');
        }
    }

    minotauro_ataca(){
        this.minotauro.setY(this.minotauro.y-30);
        this.minotauro.body.setVelocityX(-20);
        this.minotauro.anims.stop();
        this.minotauro.anims.play('golpe_mino');
    }

    booster(){
        this.shield=true;
        this.registry.events.emit('shieldOn');
    }

}
export default Scene_3;

/*
    cuando te aparece un error de textura al cargar un sprite, "texture undefined"
    es porque debes nombrar a tu persoonaje de la misma manera en que esta en su
    archivo png
*/

