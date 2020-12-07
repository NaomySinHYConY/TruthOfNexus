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
        this.load.image(['barraVida','cantDracmas', 'montoVida','btn_tienda']);
    } 
    create() {
        //Cantidad de dracmas
        this.data.set('score', 0);

        //Cantidad de vidas
        this.data.set('vidas', 4);

        //Llaves que tiene de la tienda
        this.data.set('llaves', 0);

        //Cantidad de talismanes
        this.data.set('talismanes',0);
        //Cantidad de diamantes
        this.data.set('diamantes',0);

        //console.log('Datos escena estado');
        //console.log(this.data.getAll());
        //this.score = 0;
        this.titleDracmas = this.add.image(840, 45, 'cantDracmas').setScale(0.9);
        this.scoreText = this.add.text(920, 30, '0', { fontSize: '32px', fill: '#fff' });

        //this.btn_tienda = this.add.image();

        this.barra = this.add.image(120, 50, 'barraVida');

        this.grupoV = this.add.group({
            key: 'montoVida',
            repeat: 3,
            setXY: { x:68, y: 57, stepX: 35 }
        });
        
        // this.grupod.children.iterate( (girar) => {
        //     girar.setScale(1.5);
        //     girar.setDepth(3);
        //     girar.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        // });

        this.registry.events.on('talisman',(valor) => {
            this.data.list.talismanes+=valor;
        });

        this.registry.events.on('diamantes',(valor) => {
            this.data.list.diamantes+=valor;
        });

        this.registry.events.on('recogeMoneda', (valorMoneda) => {
            //console.log("Recibe moneda");
            this.data.list.score+=valorMoneda;
            this.scoreText.setText(this.data.list.score);
            //console.log('Se ha emitido el evento score = ', this.score);
        });

        this.registry.events.on('cobrar', (cantidad) => {
            if(this.data.list.score < cantidad){
                console.log("No te alcanza");
            }else if(this.data.list.score <= 0){
                this.scoreText.setText(0);
                console.log("No tienes dracmas");
            }else if(this.data.list.score >= cantidad){
                this.data.list.score -= cantidad;
                this.scoreText.setText(this.data.list.score);
                return true;
            }
            
        });

        this.registry.events.on('robarDracmas',() => {
            this.data.set('score',0);
            this.scoreText.setText(this.data.list.score);
        });

        this.registry.events.on('dame_datos', (datos) => {
            this.registry.events.emit('setDracmas3', this.data.list.score);
            this.scoreText.setText(this.data.list.score);
            this.registry.events.emit('vidasRestantes3', this.data.list.vidas);
            console.log('Se ha emitido el evento Get Data ');
            console.log("");
            console.log("");
        });

        this.registry.events.on('menosVida', () => {
            //console.log("Recibe muerte");
            this.data.list.vidas--;
            //console.log(this.data.list.vidas);
            this.grupoV.getChildren()[this.data.list.vidas].destroy();
            if(this.data.list.vidas <= 0){
                this.scene.start('Scene_gameOver');
                this.scene.stop();
            }
            // this.score+=valorMoneda;
            // this.scoreText.setText(this.score);
            //console.log('Se ha emitido el evento score = ', this.score);
        }); 

    }
    update(time, delta) {

    }
}
export default Scene_estado;