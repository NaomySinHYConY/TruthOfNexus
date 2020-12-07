//import Scene_estado from "./Scene_estado";

class Scene_gameOver extends Phaser.Scene{
    constructor(){
        super({
            key: 'Scene_gameOver'
        });
    }

    init() {
        console.log('Escena de fin del juego por morición unu');
    }
    preload(){
        this.load.path = './assets/';      
        this.load.image(['gameOver', 'salir']);
    }
    create() {
        const eventos = Phaser.Input.Events;
        this.gameOver = this.add.image(500, 320, 'gameOver');
        this.gameOver.alpha = 0;
        this.salirButton = this.add.image(500, 501, 'salir').setInteractive().setName('Salir');
        this.salirButton.alpha = 0;

//        this.barra = this.add.image(120, 50, 'barraVida');

        this.tweens2 = this.add.tween({
            targets: [this.gameOver, this.salirButton],
            props: {
              alpha: { value: 1, duration: 3000}
            },
            repeat: 0,
        });

        this.input.on(eventos.GAMEOBJECT_DOWN, (pointer, gameObject) => {
            if(gameObject.name == 'Salir'){
                //this.scene.bringToTop('Bootloader');
                this.scene.start('Bootloader');
                this.scene.stop('Scene_1');
                this.scene.stop('Scene_estado');
                this.scene.stop('Scene_puzzle1');
                this.scene.stop('Scene_puzzle1_caida');
                this.scene.stop('Scene_3');
                this.scene.stop();

                location.reload();
            }
        });

        this.salirButton.on(eventos.POINTER_OVER, function() {
            this.setTint(0xa4effc);
            });
        this.salirButton.on(eventos.POINTER_OUT, function() {
            this.clearTint();
            });
    }

    update(time, delta) {

    }
}
export default Scene_gameOver;