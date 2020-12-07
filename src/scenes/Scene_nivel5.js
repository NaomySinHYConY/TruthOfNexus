class Scene_nivel5 extends Phaser.Scene{
    constructor(){
        super({
            key: 'Scene_nivel5'
        });
    }
    init() {
        console.log('Escena del nivel 5');
    }
    preload(){
        this.load.path = './assets/nivel5/';
        this.load.image(['plat1', 'plat2', 'plat3', 'plat4', 'plat5', 'plat6', 'plat7', 'plat8', 'plat9', 'plat11']);
        this.load.atlas('nexus_all', '../Nexus/nexus_all.png','../Nexus/nexus_all_atlas.json');
        this.load.animation('nexusAnim', '../Nexus/nexus_all_anim.json');
        this.load.atlas('shadow_all', '../shadow/shadow_all.png','../shadow/shadow_all_atlas.json');
        this.load.animation('shadowAnim', '../shadow/shadow_all_anim.json');
        this.load.atlas('dracmas','../dracma/dracmas.png','../dracma/dracma_atlas.json');
        this.load.animation('dracmasAnim','../dracma/dracma_anim.json');
        this.load.atlas('explosion','../explosion/explosion.png','../explosion/explosion_atlas.json');
        this.load.animation('explosionAnim','../explosion/explosion_anim.json');
        this.load.atlas('shadow_all', 'shadow/shadow_all.png','shadow/shadow_all_atlas.json');
        this.load.animation('shadowAnim', 'shadow/shadow_all_anim.json');

        this.load.audio('moneda', '../sounds/moneda.mp3');
        this.load.audio('laugh', '../sounds/laugh.mp3');
        this.load.audio('hit', '../sounds/hit.mp3');
        this.load.audio('impressive', '../sounds/impressive.mp3');
        this.load.audio('shadowDie', '../sounds/shadowDie.mp3');

    }
    create(){
        const eventos = Phaser.Input.Events;
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        this.giro_shadow1 = 631;
        this.giro_shadow2 = 221;
        this.giro_shadow3 = 541;
        this.registry.events.on('vidasRestantes', (vidas) => {
            this.data.set('vidas', vidas);
        });
        this.scene.launch('Scene_estado');
        this.plataformas = this.physics.add.group();
        this.plataformas.create(45, 550, 'plat1').setName('plat1');
        this.plataformas.create(250, 550, 'plat2').setName('plat2');
        this.plataformas.create(45, 155, 'plat3').setName('plat3');
        this.plataformas.create(650, 550, 'plat11').setName('plat11');
        this.plataformas.create(930, 250, 'plat5').setName('plat5');
        this.plataformas.create(500, 405, 'plat6').setName('plat6');
        this.plataformas.create(350, 260, 'plat7').setName('plat7');
        this.plataformas.create(960, 550, 'plat8').setName('plat8');
        this.plataformas.create(660, 150, 'plat9').setName('plat9');
        this.plataformas.children.iterate( (p) => {
            p.setImmovable(true);
            p.body.allowGravity = false;   
        });

        this.nexus = this.physics.add.sprite(30,370, 'nexus_all', 0).setInteractive();
        this.nexus.setScale(1.2);
        this.nexus.setName('Nexus');
        this.nexus.setFlipX(true);
        this.nexus.setOrigin(0.5);
        this.nexus.setDepth(2);
        this.nexus.body.setSize(50,85);
        this.nexus.body.setOffset(30,30);
        this.nexus.setCollideWorldBounds(true);
        this.nexus.anims.play('stand');

        this.dracmasIndv = this.physics.add.group();
        this.dracmasIndv.create(250, 55, 'dracmas', 0).setName('dracmaIndv1');
        this.dracmasIndv.create(550, 55, 'dracmas', 0).setName('dracmaIndv2');
        this.dracmasIndv.create(250, 55, 'dracmas', 0).setName('dracmaIndv3');

        this.dracmasIndv.children.iterate( (p) => {
            p.setScale(1.5);
            //p.setDepth(3);
            p.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            p.anims.play('dracma');
        });

        this.dracmasGrupo1 = this.physics.add.group({
            key: 'dracmas',
            repeat: 2,
            setXY: { x:20, y: 55, stepX: 30 }
        });
        this.dracmasGrupo1.children.iterate( (p) => {
            p.setScale(1.5);
            //p.setDepth(3);
            p.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            p.anims.play('dracma');
        });

        this.dracmasGrupo2 = this.physics.add.group({
            key: 'dracmas',
            repeat: 3,
            setXY: { x:550, y: 55, stepX: 30 }
        });

        this.dracmasGrupo2.children.iterate( (p) => {
            p.setScale(1.5);
            //p.setDepth(3);
            p.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            p.anims.play('dracma');
        });

        this.dracmasGrupo3 = this.physics.add.group({
            key: 'dracmas',
            repeat: 1,
            setXY: { x:960, y: 300, stepY: 100 }
        });

        this.dracmasGrupo3.children.iterate( (p) => {
            p.setScale(1.5);
            //p.setDepth(3);
            p.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            p.anims.play('dracma');
            p.body.allowGravity = false; 
        });

        this.shadows = this.physics.add.group();
        this.shadows.create(630, 300, 'shadow_all', 0).setInteractive().setName('shadow1');
        this.shadows.create(220, 200, 'shadow_all', 0).setInteractive().setName('shadow2');
        this.shadows.create(540, 500, 'shadow_all', 0).setInteractive().setName('shadow3');
        this.shadows.children.iterate( (p) => {
            p.body.setSize(60, 90);
            p.setOffset(10, -5);
            p.anims.play('shadow_stand');
            p.body.velocity.x = 100;  
            if(p.name == "shadow2" || p.name == "shadow3"){
                p.setFlipX(true);
            }
        });

        this.fuego = this.physics.add.sprite(140,700,'explosion').setInteractive();
        this.fuego.body.setCircle(35);
        this.fuego.body.setImmovable = true;
        this.fuego.body.setOffset(27,50);
        this.fuego.anims.play('explotar');
        this.fuego_2 = this.physics.add.sprite(815,700,'explosion').setInteractive();
        this.fuego_2.body.setCircle(35);
        this.fuego_2.body.setOffset(27,50);
        this.fuego_2.anims.play('explotar');

        //Controles:
        this.nexusWalkIz = this.input.keyboard.addKey(keyCodes.LEFT);
        this.nexusWalkDer = this.input.keyboard.addKey(keyCodes.RIGHT);
        this.nexusUp = this.input.keyboard.addKey(keyCodes.UP);
        this.nexusDown = this.input.keyboard.addKey(keyCodes.DOWN);
        this.nexusAttack = this.input.keyboard.addKey(keyCodes.O);


        //Colisiones
        this.physics.add.collider(this.nexus,this.plataformas);
        this.physics.add.collider(this.shadows,this.plataformas);
        this.physics.add.collider(this.dracmasIndv.getChildren().find(v => v.name == "dracmaIndv1"),this.plataformas.getChildren().find(v => v.name == "plat2"));
        this.physics.add.collider(this.dracmasIndv,this.plataformas.getChildren().find(v => v.name == "plat6"));
        this.physics.add.collider(this.dracmasIndv.getChildren().find(v => v.name == "dracmaIndv3"),this.plataformas.getChildren().find(v => v.name == "plat7"));
        this.physics.add.collider(this.dracmasGrupo1,this.plataformas);
        this.physics.add.collider(this.dracmasGrupo2,this.plataformas.getChildren().find(v => v.name == "plat11"));


        this.physics.add.overlap(this.nexus, this.dracmasIndv, this.recoger, null, this);
        this.physics.add.overlap(this.nexus, this.dracmasGrupo1, this.recoger, null, this);
        this.physics.add.overlap(this.nexus, this.dracmasGrupo2, this.recoger, null, this);
        this.physics.add.overlap(this.nexus, this.dracmasGrupo3, this.recoger, null, this);
        this.physics.add.overlap(this.nexus, this.shadows, this.ataque, null, this);
        this.physics.add.overlap(this.nexus, this.fuego, this.muere_nexus, null, this);
        this.physics.add.overlap(this.nexus, this.fuego_2, this.muere_nexus, null, this);

        this.tweenFuego = this.add.tween({
            targets: [this.fuego, this.fuego_2],
            ease: 'Power2',
            //y:posInY+50,
            y:{
                value: -100,
                duration: 2000
            },
            repeat: -1,
            yoyo: true,
            delay: 1000
        });

        //Saltar
        this.nexusUp.on('down', () => {
            if(this.nexus.body.touching.down){
                this.nexus.body.setVelocityY(-500);
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


    }
    update(time, delta) {
        var posInX =  this.nexus.x;
        var posInY =  this.nexus.y;



        //Movimiento de las sombras
        this.shadows.children.iterate( (p) => {  
            if(p.name == "shadow1"){
                if(p.body.velocity.x > 0 && p.x > this.giro_shadow1){
                    p.body.velocity.x *= -1;
                    this.giro_shadow1 = 360;
                    p.flipX = false;
                }
                if(p.body.velocity.x < 0 && p.x < this.giro_shadow1){
                    p.body.velocity.x *= -1;
                    this.giro_shadow1 = 630;
                    p.flipX = true;  
                }
            }else if(p.name == "shadow2"){
                if(p.body.velocity.x > 0 && p.x > this.giro_shadow2){
                    p.body.velocity.x *= -1;
                    this.giro_shadow2 = 220;
                    p.flipX = false;
                }
                if(p.body.velocity.x < 0 && p.x < this.giro_shadow2){
                    p.body.velocity.x *= -1;
                    this.giro_shadow2 = 480;
                    p.flipX = true;  
                }
            }else if(p.name == "shadow3"){
                if(p.body.velocity.x > 0 && p.x > this.giro_shadow3){
                    p.body.velocity.x *= -1;
                    this.giro_shadow3 = 540;
                    p.flipX = false;
                }
                if(p.body.velocity.x < 0 && p.x < this.giro_shadow3){
                    p.body.velocity.x *= -1;
                    this.giro_shadow3 = 750;
                    p.flipX = true;  
                }
            }
        });
        

        if( Phaser.Input.Keyboard.JustDown(this.nexusWalkDer)){
            this.nexus.setFlipX(true);
            this.nexus.body.setOffset(30,30);
            this.nexus.body.velocity.x = 160;
            this.nexus.anims.play('walk');
        }else if(Phaser.Input.Keyboard.JustDown(this.nexusWalkIz)){
            this.nexus.setFlipX(false);
            this.nexus.body.velocity.x = -160;
            this.nexus.body.setOffset(20,30);
            this.nexus.anims.play('walk');
        }
        else if(Phaser.Input.Keyboard.JustDown(this.nexusDown)){
            this.nexus.body.velocity.y = 160;
            this.nexus.anims.play('jump');
            this.tweensAtaque = this.add.tween({
                targets: [this.nexus],
                ease: 'Power2',
                y:{
                    value: this.nexus.y++,
                    duration: 500
                },
                repeat: 0,
                onComplete: () => {
                    this.nexus.anims.play('stand');
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
            this.nexus.setScale(1.2);
            this.nexus.setAngle(0);
            this.nexus.body.velocity.x = 0;
            this.nexus.body.velocity.y = 0;
        }

    }

    recoger(nexus, dracmas)
    {
       dracmas.destroy();
       this.data.list.dracmas += 20;
       this.registry.events.emit('recogeMoneda', 20);
       this.recoge = this.sound.add("moneda",{loop:false});
       this.recoge.play();
    }

    muere_nexus()
    {
        this.nexus.body.enable = false;
        this.data.list.vidas--;
        this.registry.events.emit('menosVida');
        this.tweenMuerte = this.add.tween({
            targets: [this.nexus],
            ease: 'Power2',
            duration:3000,
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
                this.nexus.x= 30;
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

    ataque(nexus, shadow){
        console.log(shadow.name);
        if(this.nexusAttack.isDown){
            let hit = this.sound.add("hit",{loop:false});
            hit.play();
            this.shadows.children.iterate( (p) => {
                if(p.name == shadow.name){
                    p.anims.play('shadow_die');
                    p.body.enable = false;
                    this.time.delayedCall(1000, function(){   
                    p.setVisible(false);
                }, [], this);
                } 
            });
            
        }
        else{
            this.muere_nexus();
        }
    }

}
export default Scene_nivel5;