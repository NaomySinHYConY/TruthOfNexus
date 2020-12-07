class Scene_tienda extends Phaser.Scene{
    constructor(){
        super({
            key: 'Scene_tienda'
        });
    }

    init() {
        console.log('Escena de la tienda');
    }

    preload(){
        this.load.path = "./assets/"; 
        
        this.load.image('dialogo1','/shop/dialogoVendedor1.png');
        this.load.image('dialogo2','/shop/dialogoVendedor2.png');
        this.load.image('dialogo3','/shop/dialogoVendedor3.png');
        this.load.image('dialogo4','/shop/dialogoVendedor4.png');
        //Dialogos en caso de que no tenga dracmas
        this.load.image('dialogo5','/shop/dialogoV5.png');
        this.load.image('dialogo6','/shop/dialogoV6.png');
        //Dialogos en caso de que le pegue al vendedor
        this.load.image('dialogo7','/shop/dialogoV8.png');
        this.load.image('dialogo8','/shop/dialogoV7.png');
        this.load.image('dialogo10','/shop/dialogoV10.png');
        //Flechas
        this.load.image('flechaDER','/shop/flechaDER.png');
        this.load.image('flechaIZ','/shop/flechaIZ.png');
        //Fondo
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

        this.load.spritesheet('vida', '/shop/items/vida.png', {
            frameWidth: 82.25,
            frameHeight: 85,
            margin: 0,
            spacing: 0
        });

        this.load.spritesheet('diamante', '/shop/items/diamante.png', {
            frameWidth: 82.25,
            frameHeight: 85,
            margin: 0,
            spacing: 0
        });

        this.load.spritesheet('talisman', '/shop/items/talisman.png', {
            frameWidth: 82.25,
            frameHeight: 85,
            margin: 0,
            spacing: 0
        });

        this.load.spritesheet('hierro', '/shop/items/hierro.png', {
            frameWidth: 60,
            frameHeight: 62,
            margin: 0,
            spacing: 0
        });

        this.load.spritesheet('llave', '/shop/items/llave.png', {
            frameWidth: 60,
            frameHeight: 62,
            margin: 0,
            spacing: 0
        });

        this.load.atlas('beer', 'shop/items/beer.png','shop/items/beer_atlas.json');
        this.load.animation('beerAnim', 'shop/items/beer_anim.json');

        //Armas
        this.load.image('axe','/shop/armas/axe.png');
        this.load.image('axeDoble','/shop/armas/axeDoble.png');
        this.load.image('mazo','/shop/armas/hammer.png');
        //Placas de los items
        this.load.image('pvida','/shop/pvida2.png');
        this.load.image('ptalisman','/shop/pvida4.png');
        this.load.image('pdiamante','/shop/pvida3.png');
        this.load.image('phierro','/shop/pvida5.png');
        this.load.image('pllave','/shop/pllave.png');
        this.load.image('pcerveza','/shop/pcerveza.png');

        this.load.image('btn_comprar','/shop/btn_comprar.png');

        this.load.audio('moneda', 'sounds/moneda.mp3');
        this.load.audio('hit', 'sounds/hit.mp3');
        this.load.audio('laugh', 'sounds/laugh.mp3');

        this.load.image('btn_armas','/shop/armas/btn_armas.png');
        this.load.image('piso','/shop/plataforma.png');

        this.load.image('btn_salir','/shop/btn_salir.png');
    }

    create() {
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
        this.nexus.setDepth(3);
        this.nexus.body.setSize(50,85);
        this.nexus.body.setOffset(-10,0);
        this.nexus.setCollideWorldBounds(true);

        //Controles de Nexus
        this.nexusWalkA     = this.input.keyboard.addKey(keyCodes.U);
        this.nexusWalkIz    = this.input.keyboard.addKey(keyCodes.LEFT);
        this.nexusWalkDer   = this.input.keyboard.addKey(keyCodes.RIGHT);
        this.nexusDown      = this.input.keyboard.addKey(keyCodes.DOWN);
        this.nexusUp        = this.input.keyboard.addKey(keyCodes.UP)
        this.nexusAttack    = this.input.keyboard.addKey(keyCodes.O);
        this.nexusJump      = this.input.keyboard.addKey(keyCodes.SPACE);

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
        //Diálogos del vendedor
        this.dialogo1 = this.add.image(270,270,'dialogo1').setScale(0.21).setOrigin(0).setDepth(4);
        this.dialogo2 = this.add.image(270,270,'dialogo2').setScale(0.21).setOrigin(0).setDepth(4).setVisible(false);
        this.dialogo3 = this.add.image(270,270,'dialogo3').setScale(0.21).setOrigin(0).setDepth(4).setVisible(false);
        this.dialogo4 = this.add.image(270,270,'dialogo4').setScale(0.21).setOrigin(0).setDepth(4).setVisible(false);
        this.dialogo5 = this.add.image(270,270,'dialogo5').setScale(0.21).setOrigin(0).setDepth(4).setVisible(false);
        this.dialogo6 = this.add.image(270,270,'dialogo6').setScale(0.21).setOrigin(0).setDepth(4).setVisible(false);
        this.dialogo7 = this.add.image(270,270,'dialogo7').setScale(0.21).setOrigin(0).setDepth(4).setVisible(false);
        this.dialogo8 = this.add.sprite(270,270,'dialogo8').setScale(0.21).setOrigin(0).setDepth(4).setVisible(false).setInteractive();
        this.dialogo10 = this.add.image(270,270,'dialogo10').setScale(0.21).setOrigin(0).setDepth(4).setVisible(false);
        //Placas de items
        this.placaVida      = this.add.image(580,70,'pvida').setOrigin(0).setScale(0.8).setDepth(3);
        this.placaDiamante  = this.add.image(580,70,'pdiamante').setOrigin(0).setScale(0.8).setDepth(3).setVisible(false);
        this.placaTalisman  = this.add.image(580,70,'ptalisman').setOrigin(0).setScale(0.8).setDepth(3).setVisible(false);
        this.placaHierro    = this.add.image(580,70,'phierro').setOrigin(0).setScale(0.8).setDepth(3).setVisible(false);
        this.placaLlave     = this.add.image(580,70,'pllave').setOrigin(0).setScale(0.8).setDepth(3).setVisible(false);
        this.placaCerveza   = this.add.image(580,70,'pcerveza').setOrigin(0).setScale(0.8).setDepth(3).setVisible(false);
        //Cargar flechas
        this.flechaI = this.add.image(595,350,'flechaIZ').setScale(0.5).setInteractive().setDepth(4);
        this.flechaD = this.add.image(880,350,'flechaDER').setScale(0.5).setInteractive().setDepth(4);
        //Cargar items
        //--->>Cerveza
        this.cerveza = this.add.sprite(730,500,'beer',0).setOrigin(0).setScale(0.35).setDepth(4).setInteractive().setVisible(false);
        this.cerveza.anims.play('beer_idle');
        //--->>Vida
        this.vida = this.add.sprite(680, 300, 'vida', 0).setOrigin(0).setScale(1.5);
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
        this.vida.setDepth(4);

        //--->>Diamante
        this.diamante = this.add.sprite(680, 300, 'diamante', 0).setOrigin(0).setVisible(false).setScale(1.5);
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
        this.diamante.setDepth(4);

        //--->>Talisman
        this.talisman = this.add.sprite(680, 300, 'talisman', 0).setOrigin(0).setVisible(false).setScale(1.5);
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
        this.talisman.setDepth(4);

        //--->>Hierro
        this.hierro = this.add.sprite(680, 300, 'hierro', 0).setOrigin(0).setVisible(false).setScale(2);
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
        this.hierro.setDepth(4);

        //--->>Llave
        this.llave = this.add.sprite(680, 300, 'llave', 0).setOrigin(0).setVisible(false).setScale(2);
        this.anims.create({
            key: 'llave_anim',
            frames: this.anims.generateFrameNumbers('llave', {
            start: 0,
            end: 8
            }),
            repeat: -1,
            frameRate: 8
        });
        this.llave.anims.play('llave_anim');
        this.llave.setDepth(4);

        //Botones para comprar
        this.btn_comprar = this.add.image(820,500,'btn_comprar').setDepth(4).setInteractive().setScale(0.55);
        //Botón para pasar al intercambio de armas
        this.btn_armas = this.add.image(650,500,'btn_armas').setDepth(4).setInteractive().setScale(0.55);
        //Botón para salir
        this.btn_salir = this.add.image(850,620,'btn_salir').setScale(0.25).setInteractive().setDepth(5);
        //Colisión entre el vendedor y Nexus
        
        this.physics.add.collider(this.nexus,this.vendedor, () => {
            this.vendedor.setVelocity(0);
            this.vendedor.setAcceleration(0);
            this.vendedor.setVelocityX(0);
            this.vendedor.setVelocityY(0);
        });

        this.physics.add.collider(this.nexus,this.piso);
        this.physics.add.collider(this.vendedor,this.piso);

        this.physics.add.overlap(this.nexus, this.vendedor, this.ataque, null, this);

        //Control para los diálogos
        var contador = 0;
        var contItem = 1;
        var precio = 0;
        this.input.on(eventos.GAMEOBJECT_UP,(pointer,gameObject) =>{
            console.log(contItem);
            if(gameObject === this.vendedor){
                contador = contador+1;
                if(contador === 1){
                    this.dialogo1.setVisible(false);
                    this.dialogo2.setVisible(true);
                    this.dialogo8.setVisible(false);
                }else if(contador === 2){
                    this.dialogo2.setVisible(false);
                    this.dialogo3.setVisible(true);
                    this.dialogo8.setVisible(false);
                }else if(contador === 3){
                    this.dialogo3.setVisible(false);
                    this.dialogo4.setVisible(true);
                    this.dialogo8.setVisible(false);
                    contador = 0;
                }else if(contador === 0){
                    this.dialogo1.setVisible(true);
                    this.dialogo4.setVisible(false);
                    this.dialogo8.setVisible(false);
                }
            }else if(gameObject === this.flechaI){
                contItem = contItem-1;
                if(contItem === 2){                 //Diamante
                    this.vida.setVisible(false);
                    this.talisman.setVisible(false);
                    this.diamante.setVisible(true);
                    this.hierro.setVisible(false);
                    this.llave.setVisible(false);
                    this.cerveza.setVisible(false);

                    //Mover placas
                    this.placaVida.setVisible(false);
                    this.placaDiamante.setVisible(true);
                    this.placaHierro.setVisible(false);
                    this.placaTalisman.setVisible(false);
                    this.placaLlave.setVisible(false);
                    this.placaCerveza.setVisible(false);
                    precio = 200;
                }else if(contItem === 3 || contItem === 0){           //Talisman
                    this.diamante.setVisible(false);
                    this.vida.setVisible(false);
                    this.talisman.setVisible(true);
                    this.hierro.setVisible(false);
                    this.llave.setVisible(false);
                    this.cerveza.setVisible(false);

                    //Mover placa
                    this.placaVida.setVisible(false);
                    this.placaDiamante.setVisible(false);
                    this.placaHierro.setVisible(false);
                    this.placaTalisman.setVisible(true);
                    this.placaLlave.setVisible(false);
                    this.placaCerveza.setVisible(false);

                    precio = 150;
                }else if(contItem === 4){           //Hierro
                    this.diamante.setVisible(false);
                    this.vida.setVisible(false);
                    this.talisman.setVisible(false);
                    this.hierro.setVisible(true);
                    this.llave.setVisible(false);
                    this.cerveza.setVisible(false);

                    //Mover placa
                    this.placaVida.setVisible(false);
                    this.placaDiamante.setVisible(false);
                    this.placaHierro.setVisible(true);
                    this.placaTalisman.setVisible(false);
                    this.placaLlave.setVisible(false);
                    this.placaCerveza.setVisible(false);
                    
                    precio = 150;
                }else if(contItem === 5){           //Llave
                    this.diamante.setVisible(false);
                    this.vida.setVisible(false);
                    this.talisman.setVisible(false);
                    this.hierro.setVisible(false);
                    this.llave.setVisible(true);
                    this.cerveza.setVisible(false);

                    //Mover placa
                    this.placaVida.setVisible(false);
                    this.placaDiamante.setVisible(false);
                    this.placaHierro.setVisible(false);
                    this.placaTalisman.setVisible(false);
                    this.placaLlave.setVisible(true);
                    this.placaCerveza.setVisible(false);
                    
                    precio = 50;
                }else if(contItem === 1){           //Vida
                    this.talisman.setVisible(false);
                    this.diamante.setVisible(false);
                    this.vida.setVisible(true);
                    this.hierro.setVisible(false);
                    this.llave.setVisible(false);
                    this.cerveza.setVisible(false);

                    //Mover placa
                    this.placaVida.setVisible(true);
                    this.placaDiamante.setVisible(false);
                    this.placaHierro.setVisible(false);
                    this.placaTalisman.setVisible(false);
                    this.placaLlave.setVisible(false);
                    this.placaCerveza.setVisible(false);

                    precio = 100;
                }
            }else if(gameObject === this.flechaD){
                contItem = contItem+1;
                if(contItem === 2){ //Diamante
                    this.vida.setVisible(false);
                    this.talisman.setVisible(false);
                    this.diamante.setVisible(true);
                    this.hierro.setVisible(false);
                    this.llave.setVisible(false);
                    this.cerveza.setVisible(false);

                    //Mover placa
                    this.placaVida.setVisible(false);
                    this.placaDiamante.setVisible(true);
                    this.placaHierro.setVisible(false);
                    this.placaTalisman.setVisible(false);
                    this.placaLlave.setVisible(false);
                    this.placaCerveza.setVisible(false);
                    precio = 200;
                }else if(contItem === 3 || contItem === 0){ //Talisman
                    this.diamante.setVisible(false);
                    this.vida.setVisible(false);
                    this.talisman.setVisible(true);
                    this.hierro.setVisible(false);
                    this.llave.setVisible(false);
                    this.cerveza.setVisible(false);
                     //Mover placa
                     this.placaVida.setVisible(false);
                     this.placaDiamante.setVisible(false);
                     this.placaHierro.setVisible(false);
                     this.placaTalisman.setVisible(true);
                     this.placaLlave.setVisible(false);
                     this.placaCerveza.setVisible(false);

                    precio = 150;
                    
                }else if(contItem === 4){ //Hierro
                    this.diamante.setVisible(false);
                    this.vida.setVisible(false);
                    this.talisman.setVisible(false);
                    this.hierro.setVisible(true);
                    this.llave.setVisible(false);
                    this.cerveza.setVisible(false);

                    //Mover placa
                    this.placaVida.setVisible(false);
                    this.placaDiamante.setVisible(false);
                    this.placaHierro.setVisible(true);
                    this.placaTalisman.setVisible(false);
                    this.placaLlave.setVisible(false);
                    this.placaCerveza.setVisible(false);

                    precio = 150;
                    
                }else if(contItem === 5){           //Llave
                    this.diamante.setVisible(false);
                    this.vida.setVisible(false);
                    this.talisman.setVisible(false);
                    this.hierro.setVisible(false);
                    this.llave.setVisible(true);
                    this.cerveza.setVisible(false);

                    //Mover placa
                    this.placaVida.setVisible(false);
                    this.placaDiamante.setVisible(false);
                    this.placaHierro.setVisible(false);
                    this.placaTalisman.setVisible(false);
                    this.placaLlave.setVisible(true);
                    this.placaCerveza.setVisible(false);
                    
                    precio = 50;
                   
                }else if(contItem === 6){           //Cerveza
                    this.diamante.setVisible(false);
                    this.vida.setVisible(false);
                    this.talisman.setVisible(false);
                    this.hierro.setVisible(false);
                    this.llave.setVisible(false);
                    this.cerveza.setVisible(true);

                    //Mover placa
                    this.placaVida.setVisible(false);
                    this.placaDiamante.setVisible(false);
                    this.placaHierro.setVisible(false);
                    this.placaTalisman.setVisible(false);
                    this.placaLlave.setVisible(false);
                    this.placaCerveza.setVisible(true);
                    
                    precio = 1000;
                   
                }
            }else if(gameObject === this.btn_comprar){
                /*
                console.log(precio);
                this.registry.events.on('cobrar', (precio) => {
                    if(this.data.list.score < precio){
                        console.log("No te alcanza->tienda");
                    }else if(this.data.list.score <= 0){
                        this.scoreText.setText(0);
                        console.log("No tienes dracmas");
                    }else if(this.data.list.score >= precio){
                        this.data.list.score -= precio;
                        this.scoreText.setText(this.data.list.score);
                        return true;
                    }
                    
                });*/
        
                this.registry.events.emit('cobrar', precio);
                //console.log(this.data.list.score);
                /*
                if(this.data.list.score >= precio){
                    this.comprar = this.sound.add("moneda",{loop:false});
                    this.comprar.play();
                }*/
                
                /*
                console.log(this.registry.events.emit('cantidadDracmas'));
                console.log(precio);
                if(this.data.list.score >= precio){
                    this.registry.events.emit('cobrar', precio);
                    this.comprar = this.sound.add("moneda",{loop:false});
                    this.comprar.play();
                }*/
                
            }else if(gameObject === this.btn_armas){
                this.scene.start('Scene_armas');
            }/*else if(gameObject === this.btn_comprar && this.data.list.score <= 0){
                this.dialogo6.setVisible(true);
                this.tweensTalk= this.add.tween({
                    targets: [this.dialogo6],
                    duration:5000,
                    repeat: 0,
                    onStart: () => {
                        //console.log('Inicia el tween');
                        this.dialogo6.setAlpha(1);
                    },
                    onComplete: () => {
                        this.dialogo6.setAlpha(0);
                    }
                });
            }else if(gameObject === this.btn_comprar && this.data.list.score < precio){
                this.dialogo10.setVisible(true);
                this.tweensTalk= this.add.tween({
                    targets: [this.dialogo10],
                    duration:5000,
                    repeat: 0,
                    onStart: () => {
                        //console.log('Inicia el tween');
                        this.dialogo10.setAlpha(1);
                    },
                    onComplete: () => {
                        this.dialogo10.setAlpha(0);
                    }
                });
            }*/

            if(this.score === 0 || this.score <= 0 ){
                //this.dialogo5.setVisible(true);
                this.tweenSinDinero1 = this.add.tween({
                    targets: [this.dialogo5],
                    ease: 'Expo',
                    y:{
                        value: -2,
                        duration: 1500
                    },
                    repeat: 0,
                    onStart: () => {
                        this.vendedor.setScale(1.9);
                        this.dialogo5.setVisible(true);
                    },
                    onComplete: () => {
                        //this.dialogo6.setAlpha(1);
                        this.dialogo5.setAlpha(0);
                        //this.dialogo5.setDepth(5);
                    }
                });
                this.tweenSinDinero = this.add.tween({
                    targets: [this.dialogo6],
                    ease: 'Expo',
                    y:{
                        value: -8,
                        duration: 1200
                    },
                    repeat: 0,
                    onStart: () => {
                        this.vendedor.setScale(2.2);
                        this.dialogo6.setVisible(true);
                    },
                    onComplete: () => {
                        this.dialogo6.setAlpha(0);
                        //this.dialogo5.setAlpha(0);
                        //this.dialogo5.setDepth(5);
                    }
                });
            }
        });

        //En caso de que Nexus no tenga dracmas
    
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

        if(Phaser.Input.Keyboard.JustDown(this.nexusAttack)){
            this.nexus.anims.play('attack');
             if(this.nexus.flipX){
                 this.nexus.body.setOffset(20, 10);
             }
             else{
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
            this.nexus.clearTint();
            this.nexus.setScale(1.7);
            this.nexus.setAngle(0);
            this.nexus.body.velocity.x = 0;
            this.nexus.body.velocity.y = 0;
        }
    }

    ataque(){
        if(this.nexusAttack.isDown){
            this.tweenRobo = this.add.tween({
                targets: [this.vendedor],
                ease: 'Power2',
                x:{
                    value: this.vendedor.x+=50,
                    duration: 1500
                },
                repeat: 0,
                onStart: () => {
                    let hit = this.sound.add("hit",{loop:false});
                    this.dialogo8.setVisible(true);
                    hit.play();
                },
                onComplete: () => {
                    this.dialogo8.setVisible(false);
                    this.dialogo8.setDepth(5);
                }
            });

            //this.score = 0;
            //this.scoreText.setText(this.score);
            //this.registry.events.emit('score',this.score);
            this.registry.events.emit('robarDracmas');
            let end = this.sound.add("laugh",{loop:false});
            end.play();
        }
    }
}
export default Scene_tienda;