//Escena dummie de la p10 o algo así, nivel creado por Dama y Lluvia.

class Scene_1 extends Phaser.Scene{
    constructor(){
        super({
            key: 'Scene_1'
        });
    }

    init() {
        console.log('Primera escena');
    }
    preload() {
        this.load.path = './assets/';      
        this.load.image(['pl1', 'pl2', 'pl3', 'aCueva', 'aviso', 'aviso_1', 'aviso_2']);
        this.load.spritesheet('fondo', 'fondo/fondoAnim.png', {
            frameWidth: 2000,
            frameHeight: 640,
            margin: 0,
            spacing: 0
        });
        this.load.atlas('nexus_all', 'Nexus/nexus_all.png','Nexus/nexus_all_atlas.json');
        this.load.animation('nexusAnim', 'Nexus/nexus_all_anim.json');
        this.load.atlas('shadow_all', 'shadow/shadow_all.png','shadow/shadow_all_atlas.json');
        this.load.animation('shadowAnim', 'shadow/shadow_all_anim.json');

        this.load.atlas('chest','cofre/chest.png','cofre/chest_atlas.json');
        this.load.animation('chestAnim','cofre/chest_anim.json');

        this.load.atlas('dracmas','dracma/dracmas.png','dracma/dracma_atlas.json');
        this.load.animation('dracmasAnim','dracma/dracma_anim.json');

        this.load.atlas('explosion','explosion/explosion.png','explosion/explosion_atlas.json');
        this.load.animation('explosionAnim','explosion/explosion_anim.json');

        this.load.audio('moneda', 'sounds/moneda.mp3');
        this.load.audio('cofreOpen', 'sounds/cofre.mp3');
        this.load.audio('laugh', 'sounds/laugh.mp3');
        this.load.audio('hit', 'sounds/hit.mp3');
        this.load.audio('impressive', 'sounds/impressive.mp3');
        this.load.audio('shadowDie', 'sounds/shadowDie.mp3');
    }
    create() {
        this.time.delayedCall(2000, function(){   
            this.cameras.main.setViewport(0, 0, 1000, 640)
            .fadeOut(1000)
            .shake(1000, 0.01)
            .setBackgroundColor('rgba(0, 0, 0, 0)')
            .flash(2000);

            this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.cameras.main.fadeIn(1000);
            });
        }, [], this);
        this.events.on('transitionstart', function (fromScene, duration) {

            this.cameras.main.setZoom(2);

        }, this);

        this.events.on('transitioncomplete', () => { 
           this.cameras.main.setZoom(1);
        });


        const eventos = Phaser.Input.Events;
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        
        this.data.set('dracmas', 0);
        this.data.set('monedas', 0);
        this.data.set('vidas', 4);

        //console.log(this.data.getAll());
        this.scene.launch('Scene_estado');

        this.fondo = this.add.sprite(0, 0, 'fondo', 1).setOrigin(0).setInteractive();
        this.physics.add.existing(this.fondo, true);
        this.anims.create({
            key: 'fondo_anim',
            frames: this.anims.generateFrameNumbers('fondo', {
            start: 1,
            end: 8
            }),
            repeat: -1,
            frameRate: 6
        });
        this.fondo.anims.play('fondo_anim');
        this.fondo.body.setSize(1000, 40);
        this.fondo.body.setOffset(0, 570);
        
        // this.titleDracmas = this.add.image(860, 45, 'cantDracmas').setScale(0.9);
        // this.score = 0;
        // this.scoreText = this.add.text(940, 30, '0', { fontSize: '32px', fill: '#fff' });
        this.aCueva = this.add.image(920, 330, 'aCueva').setInteractive().setOrigin(0).setScale(0.15);
        this.physics.add.existing(this.aCueva, true);
        this.aCueva.body.setSize(50, 400);
        this.aCueva.body.setOffset(60, 0);

        this.control = this.add.image(260,40,'aviso').setScale(0.3).setAlpha(0);
        this.control_2 = this.add.image(450,40,'aviso_1').setScale(0.3).setAlpha(0);
        this.control_3 = this.add.image(650,40,'aviso_2').setScale(0.3).setAlpha(0);

        this.add.tween({
            targets: [this.control, this.control_2, this.control_3],
            y:{
                value: 110,
                duration: 5000,
            },
            alpha:{
                value: 1
            },
            duration: 5000,
            yoyo: true,
            repeat: 0,
            
            easy: 'Expo',
            onComplete: () => {
                this.control.setAlpha(0);
                this.control_2.setAlpha(0);
                this.control_3.setAlpha(0);
            }
        });
        //let cofreOpen = this.sound.add("cofreOpen",{loop:false});
        //Plataformas
        this.plat1 = this.add.image(0, 510, 'pl1').setInteractive().setOrigin(0).setScale(1.1);
        this.physics.add.existing(this.plat1, true);
        this.plat2 = this.add.image(895, 515, 'pl2').setInteractive().setOrigin(0).setScale(1.1);
        this.physics.add.existing(this.plat2, true);
        this.plat3 = this.add.image(500, 300, 'pl3').setInteractive();
        this.physics.add.existing(this.plat3, true);
        this.plat3.body.setSize(470, 70);
        this.plat3.body.setOffset(0, 250);

        this.fuego = this.physics.add.sprite(180,600,'explosion').setInteractive();
        this.fuego.body.setCircle(35);
        this.fuego.body.setImmovable = true;
        this.fuego.body.setOffset(27,50);
        this.fuego.anims.play('explotar');
        this.fuego_2 = this.physics.add.sprite(800,600,'explosion').setInteractive();
        this.fuego_2.body.setCircle(35);
        this.fuego_2.body.setOffset(27,50);
        this.fuego_2.anims.play('explotar');

        //Enemigos
        this.shadow = this.physics.add.sprite(500, 300, 'shadow_all', 0).setInteractive().setScale(1.3);
        this.shadow.setName('Shadow');
        this.shadow.body.setSize(50, 120);
        this.shadow.setOffset(10, -20);
        this.shadow.anims.play('shadow_stand');

        //Nexus
        this.nexus = this.physics.add.sprite(20,370, 'nexus_all', 0).setInteractive();
        this.nexus.setScale(1.7);
        this.nexus.setName('Nexus');
        this.nexus.setFlipX(true);
        this.nexus.setOrigin(0.5);
        this.nexus.setDepth(2);
        this.nexus.body.setSize(50,85);
        this.nexus.body.setOffset(30,30);
        this.nexus.setCollideWorldBounds(true);
        this.nexus.anims.play('stand');

        this.chest = this.physics.add.sprite(500,300,'chest').setInteractive();
        this.chest.setDepth(2);
        //this.chest.body.setMass(2);
        this.chest.setCollideWorldBounds(true);
        
        //Controles:
        //this.nexusWalkA = this.input.keyboard.addKey(keyCodes.U);
        this.nexusWalkIz = this.input.keyboard.addKey(keyCodes.LEFT);
        this.nexusWalkDer = this.input.keyboard.addKey(keyCodes.RIGHT);
        this.nexusUp = this.input.keyboard.addKey(keyCodes.UP);
        this.nexusDown = this.input.keyboard.addKey(keyCodes.DOWN);
        this.nexusAttack = this.input.keyboard.addKey(keyCodes.O);
        //this.nexusJump = this.input.keyboard.addKey(keyCodes.SPACE);
        this.abrir = this.input.keyboard.addKey(keyCodes.ENTER);

        //Colisiones
        this.physics.add.collider(this.nexus,this.chest, () => {
            this.chest.setVelocity(0);
            this.chest.setAcceleration(0);
            this.chest.setVelocityX(0);
            this.chest.setVelocityY(0);
        });

        this.physics.add.collider(this.nexus,this.plat1);
        //this.physics.add.collider(this.nexus,this.aCueva);
        this.physics.add.collider(this.nexus,this.plat2);
        this.physics.add.collider(this.nexus,this.plat3);
        this.physics.add.collider(this.shadow,this.plat3);
        //this.physics.add.collider(this.shadow,this.fondo);
        this.physics.add.collider(this.nexus,this.fondo, () =>{
            this.muere_nexus();
            //this.nexus.anims.play('die');
        });
        

        this.physics.add.collider(this.chest,this.plat1);
        this.physics.add.collider(this.chest,this.plat2);
        this.physics.add.collider(this.chest,this.fondo);
        this.physics.add.collider(this.chest,this.plat3);

        this.physics.add.collider(this.fuego,this.plat1);
        this.physics.add.collider(this.fuego,this.plat2);
        this.physics.add.collider(this.fuego,this.fondo);
        this.physics.add.collider(this.fuego,this.plat3);
        this.physics.add.collider(this.fuego,this.nexus);

        this.physics.add.collider(this.fuego_2,this.plat1);
        this.physics.add.collider(this.fuego_2,this.plat2);
        this.physics.add.collider(this.fuego_2,this.fondo);
        this.physics.add.collider(this.fuego_2,this.plat3);
        this.physics.add.collider(this.fuego_2,this.nexus);

        //this.physics.add.collider(this.shadow,this.fondo);

        this.physics.add.overlap(this.nexus, this.fuego, this.muere_nexus, null, this);
        this.physics.add.overlap(this.nexus, this.fuego_2, this.muere_nexus, null, this);
        this.physics.add.overlap(this.nexus, this.shadow, this.ataque, null, this);
        this.physics.add.collider(this.nexus, this.aCueva, this.ganar, null, this);
        this.physics.add.overlap(this.shadow, this.fondo, this.shadDi, null, this);

        this.tweenFuego = this.add.tween({
            targets: [this.fuego, this.fuego_2],
            ease: 'Power2',
            //y:posInY+50,
            y:{
                value: 10,
                duration: 2000
            },
            repeat: -1,
            yoyo: true,
            delay: 1000
        });

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

        

        /*this.events.on('transitionstart', function (fromScene, duration) {

            this.tweens.add({
                targets: [this.fondo],
                scaleX: 1.5,
                scaleY: 1.5,
                duration: duration
            });

        }, this);

        this.events.on('transitioncomplete', () => { 
            this.fondo.scaleX = 1;
            this.fondo.scaleY = 1;
        });

        this.events.on('transitionout', function (toScene, duration) {

            this.tweens.add({
                targets: this.fondo,
                scaleX: 1,
                scaleY: 1,
                duration: duration
            });

        }, this);*/


        
    }

    update(time, delta) {
        var posInX =  this.nexus.x;
        var posInY =  this.nexus.y;
        

        if(Phaser.Input.Keyboard.JustDown(this.abrir) && this.data.list.dracmas<140 && this.data.list.monedas<12){
            this.chest.anims.play('abrir');
            let cofreOpen = this.sound.add("cofreOpen",{loop:false});
            cofreOpen.play();
            this.chest.destroy();
            
            this.grupod = this.physics.add.group({
                key: 'dracmas',
                repeat: 6,
                setXY: { x:300, y: 300, stepX: 70 }
            });
            
            this.grupod.children.iterate( (girar) => {
                girar.setScale(1.5);
                girar.setDepth(3);
                girar.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            });
    
            this.grupod.playAnimation('dracma');
            this.physics.add.collider(this.grupod,this.plat1);
            this.physics.add.collider(this.grupod,this.plat2);
            this.physics.add.collider(this.grupod,this.fondo);
            this.physics.add.collider(this.grupod,this.plat3);
            this.physics.add.overlap(this.nexus, this.grupod, this.recoger, null, this);
            this.data.list.monedas+=6;
        }

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
/*
        if (this.cursors.up.isDown && this.nexus.body.touching.down)
        {
            this.nexus.setVelocityY(-330);
        }*/

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

    muere_nexus()
    {
        console.log('Emite muerte');
        this.nexus.body.enable = false;
        this.data.list.vidas--;
        
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
                targets: [this.shadow],
                ease: 'Power2',
                //y:posInY+50,
                x:{
                    value: this.shadow.x+=110,
                    duration: 1000
                },
                repeat: 0,
                onStart: () => {
                    let hit = this.sound.add("hit",{loop:false});
                    hit.play();
                    //this.nexus.anims.play('die');
                    //this.scene.restart();
                },
            });
            this.shadow.anims.play('shadow_die');
        }
        else{
            this.muere_nexus();
            // this.tweenMuerte = this.add.tween({
            //     targets: [this.nexus],
            //     ease: 'Power2',
            //     //y:posInY+50,
            //     y:{
            //         value: this.nexus.y-=110,
            //         duration: 1000
            //     },
            //     repeat: 0,
            //     onStart: () => {
            //         let end = this.sound.add("laugh",{loop:false});
            //         end.play();
            //         //this.nexus.anims.play('die');
            //         this.scene.restart();
            //     },
            // });
        }
    }

    ganar(){
        //console.log('POs ya ganó xd');
        if(this.data.list.dracmas>=140){
            if(this.data.list.vidas==4){
                let win = this.sound.add("impressive",{loop:false});
                win.play();        
            }
            //Agregar cámar o r something
            this.registry.events.emit('vidasRestantes', this.data.list.vidas);
            this.scene.stop();
            //this.scene.launch('Scene_puzzle1');
            this.scene.transition({
                target: 'Scene_puzzle1',
                duration: 1000,
                moveAbove: true,
                onUpdate: this.transitionOut,
                data: { x: 500, y: 320 }
            });
        }
    }

    shadDi(shadow, fondo){
        this.shadow.destroy();
        let shadDie = this.sound.add("shadowDie",{loop:false});
        shadDie.play();
    }

    transitionOut(progress){
        this.nexus.body.enable = false;
        this.nexus.setVisible(false);
        this.chest.setVisible(false);
        this.plat2.setVisible(false);
        this.plat1.setVisible(false);
        this.aCueva.setVisible(false);
        this.fondo.x = (640 * progress);
        this.grupo = this.add.group();
        this.grupo.add(this.plat3);
        this.grupo.add(this.chest);
        this.grupo.add(this.fuego);
        this.grupo.add(this.fuego_2);
        this.grupo.children.iterate( (elemento) => {
             elemento.x = (1300 * progress);
        });
    }
}
export default Scene_1;