class Shop extends Phaser.Scene{
    constructor(){
        super({
            key: 'Shop'
        });
    }

    init() {
        console.log('Escena Shop');
    }

    preload(){
        this.load.path = "./assets/"; 
        this.load.image('dialogo1','/shop/dialogoVendedor1.png');
        this.load.image('dialogo2','/shop/dialogoVendedor2.png');
        this.load.image('dialogo3','/shop/dialogoVendedor3.png');
        this.load.image('dialogo4','/shop/dialogoVendedor4.png');
        this.load.image('flechaDER','/shop/flechaDER.png');
        this.load.image('flechaIZ','/shop/flechaIZ.png');
        //this.load.image('fondo','fondoNegro.png');

        this.load.spritesheet('fondo', 'shop/fondo.png', {
            frameWidth: 828,
            frameHeight: 358,
            margin: 0,
            spacing: 0
        });

        //Vendedor para la escena de la tienda
        this.load.spritesheet('vendedor', 'shop/vendedor.png', {
            frameWidth: 160,
            frameHeight: 128,
            margin: 0,
            spacing: 0
        });

        this.load.spritesheet('vida', 'shop/vida.png', {
            frameWidth: 82.25,
            frameHeight: 85,
            margin: 0,
            spacing: 0
        });

        this.load.spritesheet('diamante', 'shop/diamante.png', {
            frameWidth: 82.25,
            frameHeight: 85,
            margin: 0,
            spacing: 0
        });

        this.load.spritesheet('talisman', 'shop/talisman.png', {
            frameWidth: 82.25,
            frameHeight: 85,
            margin: 0,
            spacing: 0
        });

        this.load.spritesheet('hierro', 'shop/hierro.png', {
            frameWidth: 60,
            frameHeight: 62,
            margin: 0,
            spacing: 0
        });

        //Placas de los items
        this.load.image('pvida','/shop/pvida2.png');
        this.load.image('ptalisman','/shop/pvida4.png');
        this.load.image('pdiamante','/shop/pvida3.png');
        this.load.image('phierro','/shop/pvida5.png');

        this.load.image('btn_comprar','/shop/btn_comprar.png');

        this.load.image('inventario','inventario.png');

        //this.load.audio('shopSound', ["/sounds/shop.wav"]);
        this.load.audio('moneda', 'sounds/moneda.mp3');
    }
    
    create() {
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;

        //Fondo negro
        //this.fondo = this.add.image(0,0,'fondo').setOrigin(0);
        //this.fondo.setScale(2);
        this.fondo = this.add.sprite(0, 0,'fondo',0).setOrigin(0);
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

        //Nexus
        this.nexus = this.physics.add.sprite(80,300, 'nexus_all', 0).setInteractive();
        this.nexus.setScale(1.7);
        this.nexus.setName('Nexus');
        this.nexus.setFlipX(true);
        this.nexus.setOrigin(0.5);
        this.nexus.setDepth(2);
        this.nexus.body.setSize(50,85);
        this.nexus.body.setOffset(-10,0);
        this.nexus.setCollideWorldBounds(true);

        //Controles de Nexus
        this.nexusWalkA = this.input.keyboard.addKey(keyCodes.U);
        this.nexusWalkIz = this.input.keyboard.addKey(keyCodes.LEFT);
        this.nexusWalkDer = this.input.keyboard.addKey(keyCodes.RIGHT);
        this.nexusDown = this.input.keyboard.addKey(keyCodes.DOWN);

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
        this.vendedor.setDepth(2);
        this.vendedor.setCollideWorldBounds(true);
        //Diálogos del vendedor
        this.dialogo1 = this.add.image(270,400,'dialogo1').setScale(0.21).setOrigin(0).setDepth(3);
        this.dialogo2 = this.add.image(270,400,'dialogo2').setScale(0.21).setOrigin(0).setDepth(3).setVisible(false);
        this.dialogo3 = this.add.image(270,400,'dialogo3').setScale(0.21).setOrigin(0).setDepth(3).setVisible(false);
        this.dialogo4 = this.add.image(270,400,'dialogo4').setScale(0.21).setOrigin(0).setDepth(3).setVisible(false);
        //Placas de items
        this.placaVida = this.add.image(520,0,'pvida').setOrigin(0).setScale(1).setDepth(2);
        this.placaDiamante = this.add.image(520,0,'pdiamante').setOrigin(0).setScale(1).setDepth(2).setVisible(false);
        this.placaTalisman = this.add.image(520,0,'ptalisman').setOrigin(0).setScale(1).setDepth(2).setVisible(false);
        this.placaHierro = this.add.image(520,0,'phierro').setOrigin(0).setScale(1).setDepth(2).setVisible(false);

        //Cargar flechas
        this.flechaI = this.add.image(550,350,'flechaIZ').setScale(0.7).setInteractive().setDepth(3);
        this.flechaD = this.add.image(900,350,'flechaDER').setScale(0.7).setInteractive().setDepth(3);
        //Cargar items
        //--->>Vida
        this.vida = this.add.sprite(660, 300, 'vida', 0).setOrigin(0).setScale(1.5);
        //this.physics.add.existing(this.vida, true);
        this.anims.create({
            key: 'vida_anim',
            frames: this.anims.generateFrameNumbers('vida', {
            start: 0,
            end: 8
            }),
            repeat: -1,
            frameRate: 8
        });
        this.vida.anims.play('vida_anim');
        //this.vida.setScale(1.5);
        this.vida.setDepth(2);

        //--->>Diamante
        this.diamante = this.add.sprite(660, 300, 'diamante', 0).setOrigin(0).setVisible(false).setScale(1.5);
        //this.physics.add.existing(this.diamante, true);
        this.anims.create({
            key: 'diamante_anim',
            frames: this.anims.generateFrameNumbers('diamante', {
            start: 0,
            end: 8
            }),
            repeat: -1,
            frameRate: 8
        });
        this.diamante.anims.play('diamante_anim');
        //this.vida.setScale(1.5);
        this.diamante.setDepth(2);

        //--->>Talisman
        this.talisman = this.add.sprite(660, 300, 'talisman', 0).setOrigin(0).setVisible(false).setScale(1.5);
        //this.physics.add.existing(this.talisman, true);
        this.anims.create({
            key: 'talisman_anim',
            frames: this.anims.generateFrameNumbers('talisman', {
            start: 0,
            end: 8
            }),
            repeat: -1,
            frameRate: 8
        });
        this.talisman.anims.play('talisman_anim');
        //this.vida.setScale(1.5);
        this.talisman.setDepth(2);

        //--->>Hierro
        this.hierro = this.add.sprite(660, 300, 'hierro', 0).setOrigin(0).setVisible(false).setScale(2);
        this.anims.create({
            key: 'hierro_anim',
            frames: this.anims.generateFrameNumbers('hierro', {
            start: 0,
            end: 8
            }),
            repeat: -1,
            frameRate: 8
        });
        this.hierro.anims.play('hierro_anim');
        //this.vida.setScale(1.5);
        this.hierro.setDepth(2);

        //Letrero de cantidad de dracmas
        this.titleDracmas = this.add.image(160, 45, 'cantDracmas');
        this.score = 600;
        this.scoreText = this.add.text(230, 30, '600', { fontSize: '32px', fill: '#fff' });

        //Botones para comprar
        this.btn_comprar = this.add.image(730,550,'btn_comprar').setDepth(4).setInteractive().setScale(0.7);

        //Colisión entre el vendedor y Nexus
        this.physics.add.collider(this.nexus,this.vendedor);

        //Control para los diálogos
        var contador = 0;
        var contItem = 0;
        var cantidad = 0;
        var precio = 0;
        this.input.on(eventos.GAMEOBJECT_UP,(pointer,gameObject) =>{
            console.log(contItem);
            if(gameObject === this.vendedor){
                contador = contador+1;
                if(contador === 1){
                    this.dialogo1.setVisible(false);
                    this.dialogo2.setVisible(true);
                }else if(contador === 2){
                    this.dialogo2.setVisible(false);
                    this.dialogo3.setVisible(true);
                }else if(contador === 3){
                    this.dialogo3.setVisible(false);
                    this.dialogo4.setVisible(true);
                    contador = 0;
                }else if(contador === 0){
                    this.dialogo1.setVisible(true);
                    this.dialogo4.setVisible(false);
                }
            }else if(gameObject === this.flechaI){
                contItem = contItem-1;
                if(contItem === 1){                 //Diamante
                    this.vida.setVisible(false);
                    this.talisman.setVisible(false);
                    this.diamante.setVisible(true);
                    this.hierro.setVisible(false);

                    //Mover placa
                    this.placaVida.setVisible(false);
                    this.placaDiamante.setVisible(true);
                    this.placaHierro.setVisible(false);
                    this.placaTalisman.setVisible(false);

                    precio = 200;
                    console.log(this.score);
                    cantidad = this.score - precio;
                }else if(contItem === 2){           //Talisman
                    this.diamante.setVisible(false);
                    this.vida.setVisible(false);
                    this.talisman.setVisible(true);
                    this.hierro.setVisible(false);

                    //Mover placa
                    this.placaVida.setVisible(false);
                    this.placaDiamante.setVisible(false);
                    this.placaHierro.setVisible(false);
                    this.placaTalisman.setVisible(true);

                    precio = 150;
                    cantidad = this.score - precio;
                    //contItem = 0;
                }else if(contItem === 3){           //Hierro
                    this.diamante.setVisible(false);
                    this.vida.setVisible(false);
                    this.talisman.setVisible(false);
                    this.hierro.setVisible(true);

                    //Mover placa
                    this.placaVida.setVisible(false);
                    this.placaDiamante.setVisible(false);
                    this.placaHierro.setVisible(true);
                    this.placaTalisman.setVisible(false);
                    
                    precio = 150;
                    cantidad = this.score - precio;
                }else if(contItem === 0){           //Vida
                    this.talisman.setVisible(false);
                    this.diamante.setVisible(false);
                    this.vida.setVisible(true);
                    this.hierro.setVisible(false);

                    //Mover placa
                    this.placaVida.setVisible(true);
                    this.placaDiamante.setVisible(false);
                    this.placaHierro.setVisible(false);
                    this.placaTalisman.setVisible(false);

                    precio = 100;
                    cantidad = this.score - precio;
                }else if(contItem === -1){          //Talisman
                    this.diamante.setVisible(false);
                    this.vida.setVisible(false);
                    this.talisman.setVisible(true);
                    this.hierro.setVisible(false);

                    //Mover placa
                    this.placaVida.setVisible(false);
                    this.placaDiamante.setVisible(false);
                    this.placaHierro.setVisible(false);
                    this.placaTalisman.setVisible(true);

                    //contItem = 0;
                    precio = 150;
                    cantidad = this.score - precio;
                }
            }else if(gameObject === this.flechaD){
                contItem = contItem+1;
                if(contItem === 1){
                    this.vida.setVisible(false);
                    this.talisman.setVisible(false);
                    this.diamante.setVisible(true);
                    this.hierro.setVisible(false);

                    //Mover placa
                    this.placaVida.setVisible(false);
                    this.placaDiamante.setVisible(true);
                    this.placaHierro.setVisible(false);
                    this.placaTalisman.setVisible(false);

                    precio = 200;
                    cantidad = this.score - precio;
                }else if(contItem === 2){
                    this.diamante.setVisible(false);
                    this.vida.setVisible(false);
                    this.talisman.setVisible(true);
                    this.hierro.setVisible(false);

                     //Mover placa
                     this.placaVida.setVisible(false);
                     this.placaDiamante.setVisible(false);
                     this.placaHierro.setVisible(false);
                     this.placaTalisman.setVisible(true);

                    precio = 150;
                    cantidad = this.score - precio;
                    //contItem = 0;
                }else if(contItem === 3){
                    this.diamante.setVisible(false);
                    this.vida.setVisible(false);
                    this.talisman.setVisible(false);
                    this.hierro.setVisible(true);

                    //Mover placa
                    this.placaVida.setVisible(false);
                    this.placaDiamante.setVisible(false);
                    this.placaHierro.setVisible(true);
                    this.placaTalisman.setVisible(false);

                    precio = 150;
                    cantidad = this.score - precio;
                }else if(contItem === 0){
                    this.talisman.setVisible(false);
                    this.diamante.setVisible(false);
                    this.vida.setVisible(true);
                    this.hierro.setVisible(false);

                    //Mover placa
                    this.placaVida.setVisible(true);
                    this.placaDiamante.setVisible(false);
                    this.placaHierro.setVisible(false);
                    this.placaTalisman.setVisible(false);

                    precio = 100;
                    cantidad = this.score - precio;
                }
            }else if(gameObject === this.btn_comprar){
                this.score = cantidad;
                this.scoreText.setText(this.score);
                this.recoge = this.sound.add("moneda",{loop:false});
                this.recoge.play();
            }
            
        });
        
        //Falta el boton o puerta para salir

        
    }

    update(time, delta) {
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

        if(Phaser.Input.Keyboard.JustUp(this.nexusWalkDer) || Phaser.Input.Keyboard.JustUp(this.nexusWalkIz) || Phaser.Input.Keyboard.JustUp(this.nexusDown)){
            this.nexus.anims.play('stand');
            this.nexus.clearTint();
            this.nexus.setScale(1.7);
            this.nexus.setAngle(0);
            this.nexus.body.velocity.x = 0;
            this.nexus.body.velocity.y = 0;
        }

        
    }


    
}

export default Shop;