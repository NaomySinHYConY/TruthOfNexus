class Scene_armas extends Phaser.Scene{
    constructor(){
        super({
            key: 'Scene_armas'
        });
    }

    init() {
        console.log('Escena - Intercambio de armas');
    }

    preload(){
        this.load.path = "./assets/"; 

        //Placas de las  armas
        this.load.image('paxe','/shop/armas/paxe.png');
        this.load.image('paxeDoble','/shop/armas/paxeDoble.png');
        this.load.image('pmazo','/shop/armas/pmazo.png');

        //Armas
        this.load.image('axe','/shop/armas/axe.png');
        this.load.image('axeDoble','/shop/armas/axeDoble.png');
        this.load.image('hammer','/shop/armas/hammer.png');

        this.load.image('btn_adquirir','/shop/armas/btn_adquirir.png');

        this.load.image('candado','/shop/armas/candado.png');
        this.load.image('dialogo','/shop/armas/dialogoV9.png');
       
    }

    create(){
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;

        //Fondo
        this.fondo = this.add.sprite(0, 0,'fondo',0).setOrigin(0).setDepth(2);
        this.anims.create({
            key: 'fondo_anim',
            frames: this.anims.generateFrameNumbers('fondo', {
            start: 0,
            end: 11
            }),
            repeat: -1,
            frameRate: 8
        });
        this.fondo.anims.play('fondo_anim');
        this.fondo.setScale(1.8);
        //Botón para salir
        this.btn_salir = this.add.image(850,620,'btn_salir').setScale(0.20).setInteractive().setDepth(5);

        //Piso
        this.piso = this.physics.add.image(0,600,'piso').setOrigin(0).setDepth(3);
        this.piso.setScale(1.3);
        this.piso.setCollideWorldBounds(true);

        //Nexus
        this.nexus = this.physics.add.sprite(80,300, 'nexus_all', 0).setInteractive();
        this.nexus.setScale(1.7);
        this.nexus.setName('Nexus');
        this.nexus.setFlipX(true);
        this.nexus.setOrigin(0.5);
        this.nexus.setDepth(4);
        this.nexus.body.setSize(50,85);
        this.nexus.body.setOffset(-10,0);
        this.nexus.setCollideWorldBounds(true);

        //Vendedor
        this.vendedor = this.physics.add.sprite(320, 100, 'vendedor', 0).setInteractive();
        this.anims.create({
            key: 'vendedor_anim',
            frames: this.anims.generateFrameNumbers('vendedor', {
            start: 0,
            end: 6
            }),
            repeat: -1,
            frameRate: 8
        });
        this.vendedor.anims.play('vendedor_anim');
        this.vendedor.setScale(1.6);
        this.vendedor.body.setSize(80,100);
        this.vendedor.body.setOffset(35,20);
        this.vendedor.setDepth(3);
        this.vendedor.setCollideWorldBounds(true);

        //Controles de Nexus
        this.nexusWalkA = this.input.keyboard.addKey(keyCodes.U);
        this.nexusWalkIz = this.input.keyboard.addKey(keyCodes.LEFT);
        this.nexusWalkDer = this.input.keyboard.addKey(keyCodes.RIGHT);
        this.nexusDown = this.input.keyboard.addKey(keyCodes.DOWN);
        this.nexusUp = this.input.keyboard.addKey(keyCodes.UP)
        this.nexusAttack = this.input.keyboard.addKey(keyCodes.O);
        this.nexusJump = this.input.keyboard.addKey(keyCodes.SPACE);

        //Placas de items
        this.placaAxe = this.add.image(580,70,'paxe').setOrigin(0).setScale(0.8).setDepth(4);
        this.placaAxeDoble = this.add.image(580,70,'paxeDoble').setOrigin(0).setScale(0.8).setDepth(4).setVisible(false);
        this.placaHammer = this.add.image(580,70,'pmazo').setOrigin(0).setScale(0.8).setDepth(4).setVisible(false);

        //Cargar flechas
        this.flechaI = this.add.image(595,350,'flechaIZ').setScale(0.5).setInteractive().setDepth(4);
        this.flechaD = this.add.image(880,350,'flechaDER').setScale(0.5).setInteractive().setDepth(4);

        //Cargar armas
        //--->>Axe
        this.axe = this.add.image(685, 300, 'axe').setOrigin(0).setScale(1.5).setInteractive();
        this.axe.setDepth(4);
        //--->>Axe doble
        this.axeDoble = this.add.sprite(685, 300, 'axeDoble', 0).setOrigin(0).setScale(1.5).setVisible(false);
        this.axeDoble.setDepth(4);
        //--->>Hammer
        this.hammer = this.add.sprite(685, 300, 'hammer', 0).setOrigin(0).setScale(1.5).setVisible(false);
        this.hammer.setDepth(4);

        this.btn_adquirir = this.add.image(750,530,'btn_adquirir').setDepth(5).setInteractive().setScale(0.55);

        //Candado
        this.candado = this.add.image(700,305,'candado').setOrigin(0).setScale(0.10).setDepth(5);
        //Dialogo del vendedor
        this.dialogo = this.add.image(260,260,'dialogo').setScale(0.21).setOrigin(0).setDepth(4).setVisible(false);
        //Cargar items necesarios

        //--->>Hierro
        this.hierro1 = this.add.sprite(615, 430, 'hierro', 0).setOrigin(0);
        this.anims.create({
            key: 'hierro_anim',
            frames: this.anims.generateFrameNumbers('hierro', {
            start: 0,
            end: 8
            }),
            repeat: -1,
            frameRate: 8
        });
        this.hierro1.anims.play('hierro_anim');
        this.hierro1.setDepth(4);

        //--->>Hierro
        this.hierro2 = this.add.sprite(700, 430, 'hierro', 0).setOrigin(0);
        this.anims.create({
            key: 'hierro_anim',
            frames: this.anims.generateFrameNumbers('hierro', {
            start: 0,
            end: 8
            }),
            repeat: -1,
            frameRate: 8
        });
        this.hierro2.anims.play('hierro_anim');
        this.hierro2.setDepth(4);

        //--->>Hierro
        this.hierro3 = this.add.sprite(815, 430, 'hierro', 0).setOrigin(0);
        this.anims.create({
            key: 'hierro_anim',
            frames: this.anims.generateFrameNumbers('hierro', {
            start: 0,
            end: 8
            }),
            repeat: -1,
            frameRate: 8
        });
        this.hierro3.anims.play('hierro_anim');
        this.hierro3.setDepth(4);

        this.physics.add.collider(this.nexus,this.vendedor, () => {
            this.vendedor.setVelocity(0);
            this.vendedor.setAcceleration(0);
            this.vendedor.setVelocityX(0);
            this.vendedor.setVelocityY(0);
        });

        this.physics.add.collider(this.nexus,this.piso);
        this.physics.add.collider(this.vendedor,this.piso);

       

        this.input.on(eventos.GAMEOBJECT_UP,(pointer,gameObject) =>{
            if(gameObject === this.btn_adquirir){
                this.dialogo.setVisible(true);
                this.tweensTalk= this.add.tween({
                    targets: [this.dialogo],
                    ease:'Bounce',
                    y:255,
                    duration:5000,
                    repeat: 0,
                    onStart: () => {
                        //console.log('Inicia el tween');
                        this.dialogo.setAlpha(1);
                    },
                    onComplete: () => {
                        this.dialogo.setAlpha(0);
                    }
                });
            }else if(gameObject === this.btn_salir){
                this.scene.stop();
                this.scene.resume('Scene_tienda');
            }
        });
    }

    update(){
        var posInX =  this.nexus.x;
        var posInY =  this.nexus.y;

        if( Phaser.Input.Keyboard.JustDown(this.nexusWalkDer)){
            this.nexus.setFlipX(true);
            this.nexus.body.velocity.x = 160;
            this.nexus.anims.play('walk');
        }else if(Phaser.Input.Keyboard.JustDown(this.nexusWalkIz)){
            this.nexus.setFlipX(false);
            this.nexus.body.velocity.x = -160;
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
            this.nexus.anims.play('attack');
             if(this.nexus.flipX){
                 //this.nexus.body.setSize(70,85);
                 this.nexus.body.setOffset(20, 10);
             }
             else{
                 //this.nexus.body.setSize(70,85);
                 this.nexus.body.setOffset(-20, 10);
             }
            this.tweensAtaque = this.add.tween({
                targets: [this.nexus],
                ease: 'Power2',
                //y:posInY+50,
                x:{
                    value: posInX+10,
                    ease: 'Circ',
                    duration: 300
                },
                y:{
                    value: posInY--,
                    duration: 300,
                    offset: true
                },
                repeat: 0,
                onComplete: () => {
                    this.nexus.anims.play('stand');
                    //this.nexus.body.setSize(50,85);
                    this.nexus.setOffset(0);
                    this.nexus.setX(posInX);
                    this.nexus.setY(posInY);
                }
            });
        }

        if( Phaser.Input.Keyboard.JustUp(this.nexusAttack) || Phaser.Input.Keyboard.JustUp(this.nexusWalkDer) || Phaser.Input.Keyboard.JustUp(this.nexusWalkIz) || Phaser.Input.Keyboard.JustUp(this.nexusDown)
        || Phaser.Input.Keyboard.JustUp(this.nexusJump) ){
            this.nexus.anims.play('stand');
            //this.nexus.setFlipX(true);
            this.nexus.clearTint();
            this.nexus.setScale(1.7);
            this.nexus.setAngle(0);
            this.nexus.body.velocity.x = 0;
            this.nexus.body.velocity.y = 0;
        }
    }
}
export default Scene_armas;