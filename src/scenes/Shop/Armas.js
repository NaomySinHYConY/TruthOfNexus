class Armas extends Phaser.Scene{
    constructor(){
        super({
            key: 'Armas'
        });
    }

    init() {
        console.log('Escena - Intercambio de armas');
       // console.log('Tienes ',dato,' dracmas');
       // this.dato = dato;
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
    }

    create(){
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;

        //Fondo

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
        this.nexusUp = this.input.keyboard.addKey(keyCodes.UP)
        this.nexusAttack = this.input.keyboard.addKey(keyCodes.O);
        this.nexusJump = this.input.keyboard.addKey(keyCodes.SPACE);

        //Placas de items
        this.placaAxe = this.add.image(520,0,'paxe').setOrigin(0).setScale(1).setDepth(2);
        this.placaAxeDoble = this.add.image(520,0,'paxeDoble').setOrigin(0).setScale(1).setDepth(2).setVisible(false);
        this.placaHammer = this.add.image(520,0,'pmazo').setOrigin(0).setScale(1).setDepth(2).setVisible(false);

        //Cargar flechas
        this.flechaI = this.add.image(550,350,'flechaIZ').setScale(0.7).setInteractive().setDepth(3);
        this.flechaD = this.add.image(890,350,'flechaDER').setScale(0.7).setInteractive().setDepth(3);

        //Cargar armas
        //--->>Axe
        this.axe = this.add.image(660, 300, 'axe').setOrigin(0).setScale(1.5).setInteractive();
        this.axe.setDepth(3);
        //--->>Axe doble
        this.axeDoble = this.add.sprite(660, 300, 'axeDoble', 0).setOrigin(0).setScale(1.5).setVisible(false);
        this.axeDoble.setDepth(2);
        //--->>Hammer
        this.hammer = this.add.sprite(660, 300, 'hammer', 0).setOrigin(0).setScale(1.5).setVisible(false);
        this.hammer.setDepth(2);

        //Tween para que las armas no se queden estáticas
        this.tweensArma = this.add.tween({
            targets: [this.axe],
            ease: 'Bounce',
            y: 300
            //repeat: -1
        });

        //Cargar items necesarios
        //--->>Diamante
        this.diamante = this.add.sprite(557, 450, 'diamante', 0).setOrigin(0);
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
        this.diamante.setDepth(3);

        //--->>Talisman
        this.talisman = this.add.sprite(657, 450, 'talisman', 0).setOrigin(0);
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
        this.talisman.setDepth(3);

        //--->>Hierro
        this.hierro = this.add.sprite(700, 450, 'hierro', 0).setOrigin(0);
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
        this.hierro.setDepth(3);
    }

    update(){
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


    }
}
export default Armas;