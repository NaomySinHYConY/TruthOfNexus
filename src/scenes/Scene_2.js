import Shop from "../scenes/Shop.js"

class Scene_2 extends Phaser.Scene{
    constructor(){
        super({
            key: 'Scene_2'
        });
    }

    init() {
        console.log('Escena del segundo nivel');
    }

    preload(){
        this.load.path = "./assets/"; 
        this.load.image('fondoN', 'fondoNegro.png');
        this.load.image(['p1', 'p2', 'p3', 'cantDracmas', 'salida', 'aviso', 'aviso_1', 'aviso_2']);
        this.load.image('inventario','inventario.png');
        this.load.image('entradaShop','entradaLibre.png');

        this.load.atlas('nexus_all', 'Nexus/nexus_all.png','Nexus/nexus_all_atlas.json');
        this.load.animation('nexusAnim', 'Nexus/nexus_all_anim.json');

        this.load.atlas('dracmas','dracma/dracmas.png','dracma/dracma_atlas.json');
        this.load.animation('dracmasAnim','dracma/dracma_anim.json');

        //this.load.audio('shopSound', ["/sounds/shop.wav"]);
        this.load.audio('moneda', 'sounds/moneda.mp3');
    }
    
    create() {
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;

        //lineas necesarias para la tienda
        this.scene.add('Shop',Shop);

        this.cueva = this.add.image(300,450,'entradaShop').setInteractive().setOrigin(0);
        this.physics.add.existing(this.cueva, true);
        this.cueva.body.setOffset(70, 0);

        //Nexus:
        this.nexus = this.physics.add.sprite(100,300, 'nexus_all', 0).setInteractive();
        this.nexus.setScale(1.7);
        this.nexus.setName('Nexus');
        this.nexus.setFlipX(true);
        this.nexus.setOrigin(0.5);
        this.nexus.setDepth(2);
        this.nexus.body.setSize(50,85);
        this.nexus.body.setOffset(-10,0);

        //Controles:
        this.nexusWalkA = this.input.keyboard.addKey(keyCodes.U);
        this.nexusWalkIz = this.input.keyboard.addKey(keyCodes.LEFT);
        this.nexusWalkDer = this.input.keyboard.addKey(keyCodes.RIGHT);
        this.nexusUp = this.input.keyboard.addKey(keyCodes.UP);
        this.nexusDown = this.input.keyboard.addKey(keyCodes.DOWN);
        this.nexusAttack = this.input.keyboard.addKey(keyCodes.O);
        this.nexusJump = this.input.keyboard.addKey(keyCodes.SPACE);

        this.titleDracmas = this.add.image(160, 45, 'cantDracmas');
        this.score = 600;
        this.scoreText = this.add.text(230, 30, '600', { fontSize: '32px', fill: '#fff' });

        this.nexus.body.setCollideWorldBounds(true);

        this.physics.add.overlap(this.nexus, this.cueva, this.store, null, this);
    }

    update(time, delta) {
        if( Phaser.Input.Keyboard.JustDown(this.nexusWalkDer)){
            //band = true;
            this.nexus.setFlipX(true);
            this.nexus.body.velocity.x = 160;
            this.nexus.anims.play('walk');
        }else if(Phaser.Input.Keyboard.JustDown(this.nexusWalkIz)){
            //band = false;
            this.nexus.setFlipX(false);
            this.nexus.body.velocity.x = -160;
            this.nexus.anims.play('walk');
         }
    }
//Función para entrar a la tienda
    store(){
        if(this.score==600){
            //Se muestra la pantalla negra de cambio de escena
            this.fN = this.add.image(0, 0,'fondoN').setAlpha(0);
            this.fN.setDepth(3);
           // this.fN.setOrigin(0);

            this.add.tween({
                targets: [this.fN],
                y:{
                    value: 510,
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
                    this.fN.setAlpha(0);
                }
            });

            //Inicia la otra escena
            this.scene.start('Shop');
        }
    }
}

export default Scene_2;