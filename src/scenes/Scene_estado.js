class Scene_estado extends Phaser.Scene{
    constructor(){
        super({
            key: 'Scene_estado'
        });
    }

    init() {
        console.log('Escena de estado');
    }
    preload(){
        this.load.path = './assets/estado/';      
        this.load.image(['barraVida','cantDracmas', 'montoVida']);
    }
    create() {
        this.score = 0;
        this.titleDracmas = this.add.image(840, 45, 'cantDracmas').setScale(0.9);
        this.scoreText = this.add.text(920, 30, '0', { fontSize: '32px', fill: '#fff' });
        this.barra = this.add.image(120, 50, 'barraVida');
        this.registry.events.on('recogeMoneda', (valorMoneda) => {
            this.score+=valorMoneda;
            this.scoreText.setText(this.score);
            //console.log('Se ha emitido el evento score = ', this.score);
            });
    }
    update(time, delta) {

    }
}
export default Scene_estado;