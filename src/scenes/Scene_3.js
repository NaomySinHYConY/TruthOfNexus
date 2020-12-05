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

    }

    create(){
        this.registry.events.on('vidasRestantes3', (vidas) => {
            console.log('Vidas_escena3:',vidas);
            this.data.set('vidas', vidas);
        });
        this.registry.events.on('setDracmas3', (dracmas) =>{
            this.data.set('dracmas',dracmas);
            console.log('Dracmas_Scene3:',this.data.list.dracmas);
        });

        const eventos = Phaser.Input.Events;
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;

        this.fondo = this.add.sprite(0, 0,'fondo_3',0).setOrigin(0).setScale(1.25,1.907);
        //this.physics.add.existing(this.fondo, true);
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

        //plataformas
        this.platforms = this.physics.add.staticGroup();
        //this.platforms.create(10,615,'plataforma_3').setScale(1.9,1.3).setOrigin(0).refreshBody();
        this.platforms.create(0,615,'plataforma_3_gris').setScale(2,1.3).setOrigin(0).refreshBody();
        this.platforms.create(180,615,'plataforma_3_gris').setScale(2,1.3).setOrigin(0).refreshBody();
        this.platforms.create(360,615,'plataforma_3_gris').setScale(2,1.3).setOrigin(0).refreshBody();
        this.platforms.create(890,615,'plataforma_3_gris').setScale(2,1.3).setOrigin(0).refreshBody();
        //plataformas voladoras
        this.platforms.create(150,500,'plataforma_3_gris').setScale(1.8,1.3).setOrigin(0).refreshBody();
        this.platforms.create(320,400,'plataforma_3_gris').setScale(1.8,1.3).setOrigin(0).refreshBody();
        this.platforms.create(438,210,'plataforma_3_gris').setScale(2.2,1.3).setOrigin(0).refreshBody();
        //Piso de la muerte
        //this.piso_de_muerte = this.physics.add.group();
        this.piso_de_muerte1 = this.physics.add.image(540,639,'plataforma_3').setInteractive().setScale(2,1.3).setOrigin(0);
        this.physics.add.existing(this.piso_de_muerte1, true);
        this.piso_de_muerte2 = this.physics.add.image(720,639,'plataforma_3').setInteractive().setScale(2,1.3).setOrigin(0);
        this.physics.add.existing(this.piso_de_muerte2, true);
        this.piso_de_muerte2.body.setAllowGravity(false);
        this.piso_de_muerte1.body.setAllowGravity(false);

        //Sombras Enemigos
        this.minotauro = this.physics.add.sprite(450,100, 'minotauro', 0).setInteractive();
        this.minotauro.setScale(1);
        this.minotauro.setName('Mino');
        this.minotauro.setOrigin(0.5);
        this.minotauro.body.setSize(50,85);
        this.minotauro.body.setOffset(30,30);
        this.minotauro.setCollideWorldBounds(true);
        this.minotauro.anims.play('idle');
        // this.shadow = this.physics.add.sprite(500, 300, 'shadow_all', 0).setInteractive().setScale(1.3);
        // this.shadow.setName('Shadow');
        // this.shadow.body.setSize(50, 120);
        // this.shadow.setOffset(10, -20);
        // this.shadow.anims.play('shadow_stand');


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
        this.physics.add.collider(this.platforms, this.nexus);
        this.physics.add.collider(this.platforms, this.minotauro);

        this.nexusUp.on('down', () => {
            if(this.nexus.body.touching.down){
                this.nexus.body.setVelocityY(-600);
                this.nexus.anims.play('jump');
            }
        });
        this.nexusUp.on('up', () => {
            this.nexus.anims.play('stand');
            //this.nexus.body.setVelocity(0);
            if(this.nexusWalkDer.isDown){
                this.nexus.anims.play('walk');
            }
            if(this.nexusWalkIz.isDown){
                this.nexus.anims.play('walk');
            }
        });

        //Escena de muerte
        this.physics.add.overlap(this.nexus, this.piso_de_muerte1, this.muere_nexus, null, this);
        this.physics.add.overlap(this.nexus, this.piso_de_muerte2, this.muere_nexus, null, this);
        //Madrazos, man es que soy sanguinario  loco
        this.physics.add.overlap(this.nexus, this.minotauro, this.ataque, null, this);
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
    }

    muere_nexus()
    {
        console.log('Emite muerte');
        this.nexus.body.enable = false;
        this.registry.events.emit('menosVida');
        this.tweenMuerte = this.add.tween({
            targets: [this.nexus],
            ease: 'Power2',
            duration:3000,
            //y:posInY+50,
            x:{
                value: this.nexus.x-=1,
                duration: 1000
            },
            repeat: 0,
            onStart: () => {
                let end = this.sound.add("laugh",{loop:false});
                end.play();
                this.nexus.anims.play('die');
                //this.scene.restart();
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
    }

    ataque(){
        if(this.nexusAttack.isDown){
            this.tweenMuerte = this.add.tween({
                targets: [this.minotauro],
                ease: 'Power2',
                //y:posInY+50,
                x:{
                    value: this.minotauro.x+=110,
                    duration: 1000
                },
                repeat: 0,
                onStart: () => {
                    let hit = this.sound.add("hit",{loop:false});
                    hit.play();
                },
            });
            this.minotauro.anims.play('die');
            
        }
        else{
            this.muere_nexus();
        }
    }

}
export default Scene_3;



/*
    cuando te aparece un error de textura al cargar un sprite, "texture undefined"
    es porque debes nombrar a tu persoonaje de la misma manera en que esta en su
    archivo png
*/

