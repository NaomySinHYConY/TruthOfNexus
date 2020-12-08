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
        this.load.audio('open_door', './assets/sounds/open_door.mp3');
        this.load.path = './assets/estado/';      
        this.load.image(['barraVida','cantDracmas', 'montoVida', 'boosters', 'botonBoosters', 'llave', 'escudo', 'videncia','btn_tienda']);
    } 
    create() {
        const eventos = Phaser.Input.Events;
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
        //Para saber si ya se activa el boton
        this.data.set('botonT',"");

        const eventos = Phaser.Input.Events;

        this.registry.events.on('botonTienda',(escena) => {
            this.data.set('botonT',escena);
            this.btn_tienda.setVisible(true);
        });

        this.btn_tienda = this.add.image(840,90,'btn_tienda').setScale(0.20).setInteractive().setDepth(4).setVisible(false);
            this.input.on(eventos.GAMEOBJECT_UP,(pointer,gameObject) =>{
                if(gameObject === this.btn_tienda){
                    this.scene.launch('Scene_tienda',this.data.list.score,this.data.list.botonT);
                    let open_door = this.sound.add("open_door",{loop:false});
                    open_door.play();
                    this.registry.events.emit('dame_datos', 0);
                }
            });
    

        this.titleDracmas = this.add.image(840, 45, 'cantDracmas').setScale(0.9);
        this.scoreText = this.add.text(920, 30, '0', { fontSize: '32px', fill: '#fff' });

        //this.btn_tienda = this.add.image();

        this.barra = this.add.image(120, 50, 'barraVida');

        this.grupoV = this.add.group({
            key: 'montoVida',
            repeat: 3,
            setXY: { x:68, y: 57, stepX: 35 }
        });

        this.contenedor = this.add.container(29, 611);
        //this.contenedor = this.add.container(815, 521);
        //var container = this.add.container(400, 300);

        this.botonBoosters = this.add.image(84, 18.5, 'botonBoosters').setInteractive();
        this.boosters = this.add.image(83.5, 72.5, 'boosters');
        this.llave = this.add.image(152.5, 74.5, 'llave');
        this.escudo = this.add.image(14, 74.5, 'escudo');
        this.videncia = this.add.image(85, 74.5, 'videncia');
        this.llavesText = this.add.text(132, 77, this.data.list.llaves, { fontSize: '20px', fill: '#fff' });

        this.contenedor.add(this.botonBoosters);
        this.contenedor.add(this.boosters);
        this.contenedor.add(this.llave);
        this.contenedor.add(this.escudo);
        this.contenedor.add(this.videncia);
        this.contenedor.add(this.llavesText);

        this.input.on(eventos.GAMEOBJECT_UP, (pointer, gameObject) => {
            //this.contenedor = this.add.container(815, 521);
            this.tweens = this.add.tween({
                targets: [this.contenedor],
                ease: 'Linear',
                y: 521,
                duration: 1000,
                yoyo: true,
                //repeatDelay:5000,
                hold: 2000,
                //delay: 3000
            });
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

        this.registry.events.on('adquiereLlave', () => {
            //console.log("Recibe moneda");
            this.data.list.llaves++;
            this.llavesText.setText(this.data.list.llaves);
            //console.log('Se ha emitido el evento score = ', this.score);
        });
        });        
    }

    click(){
        this.contenedor = this.add.container(815, 521);
        this.tweens = this.add.tween({
            targets: [this.contenedor],
            ease: 'Linear',
            y: 521,
            duration: 3000,
            yoyo: true,
            loopDelay: 2000
            // onStart: () => {
            //     nexus.body.enable = false;
            //     this.golpe.play(this.musicConf2);
                
            //     //nexus.anims.play('nexus_dead');
            // },
            // onComplete: () => {
            //     //nexus.body.enable = true;
            //     nexus.x = 40;
            //     nexus.y = 531;
            //     nexus.setVelocity(0);
            //     nexus.alpha = 1;
            //     nexus.setFrame(0);
            //     this.input.keyboard.enabled = true;

            //     if(this.data.list.vidas!=0){
            //         this.nexus.body.enable = true;
            //     }
            //     else{
            //         this.scene.stop();
            //     }
            // }, 
        });
    }

    update(time, delta) {

    }
}
export default Scene_estado;