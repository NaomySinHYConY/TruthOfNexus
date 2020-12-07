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
        this.load.image(['barraVida','cantDracmas', 'montoVida','barraVida_enemigo','montoVida_enemigo']);
    } 
    create() {
        //Cantidad de dracmas
        this.data.set('score', 0);

        //Cantidad de vidas
        this.data.set('vidas', 4);

        //Llaves que tiene de la tienda
        this.data.set('llaves', 0);

        //Escudo
        this.data.set('escudo',false);

        //Final
        this.data.set('final',false);

        //console.log('Datos escena estado');
        //console.log(this.data.getAll());
        //this.score = 0;
        this.titleDracmas = this.add.image(840, 45, 'cantDracmas').setScale(0.9);
        this.scoreText = this.add.text(920, 30, '0', { fontSize: '32px', fill: '#fff' });

        this.barra = this.add.image(120, 50, 'barraVida');

        this.grupoV = this.add.group({
            key: 'montoVida',
            repeat: 3,
            setXY: { x:68, y: 57, stepX: 35 }
        });

        this.registry.events.on('recogeMoneda', (valorMoneda) => {
            //console.log("Recibe moneda");
            this.data.list.score+=valorMoneda;
            this.scoreText.setText(this.data.list.score);
            //console.log('Se ha emitido el evento score = ', this.score);
        });

        this.registry.events.on('menosVida', () => {
            //console.log("Recibe muerte");
            //Comprobamos si hay escudo activo
            if(this.data.list.escudo==false){
                this.data.list.vidas--;
                //console.log(this.data.list.vidas);
                this.grupoV.getChildren()[this.data.list.vidas].destroy();
                if(this.data.list.vidas <= 0){
                    this.scene.start('Scene_gameOver');
                    this.scene.stop();
                }
            }
            // this.score+=valorMoneda;
            // this.scoreText.setText(this.score);
            //console.log('Se ha emitido el evento score = ', this.score);
        }); 

        this.registry.events.on('shieldOn', () => {
            //console.log("Recibe moneda");
            this.data.list.escudo = true;
            //Aqui activamos el que se vea el escudo xd
            /*
            
            */
        });
        
        this.registry.events.on('shieldOff', ()=>{
            this.data.list.escudo = false;
        });

        this.registry.events.on('finalOn', ()=>{
            this.data.list.final = true;
            console.log('barraVillano');
            this.barra_enemigo = this.add.image(480, 100, 'barraVida_enemigo');
            this.grupoE = this.add.group({
                key: 'montoVida_enemigo',
                repeat: 3,
                setXY: { x:429, y: 93, stepX: 35 },
            });
            console.log('la pinche barra ya se deberia ver');
        });
        
    }
    update(time, delta) {

    }
}
export default Scene_estado;