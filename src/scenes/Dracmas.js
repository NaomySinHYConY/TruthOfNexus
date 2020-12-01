
class Dracmas extends Phaser.Scene{
    constructor(){
        super({
            key: 'Dracmas'
        });
    }

    init() {
        console.log('Escena de los DRACMAS');
    }

    preload(){
        this.load.atlas('dracmas','dracma/dracmas.png','dracma/dracma_atlas.json');
        this.load.animation('dracmasAnim','dracma/dracma_anim.json');
    }

    create(){
        this.titleDracmas = this.add.image(160, 45, 'cantDracmas');
        //this.score = 600;
        //this.scoreText = this.add.text(230, 30, '600', { fontSize: '32px', fill: '#fff' });

        this.score = this.add.text(230,20,'0',{color:'#fff', fontSize:50});

        this.registry.events.on('score', (score) => {
            /*if(key === 'puntos'){
                this.puntos.setText(data);
            }*/
            this.score.setText(score);
        });
    }

    update(){

    }
/*
    addPoints(puntos){
        this.puntos.setText(puntos);
    }*/
}
export default Dracmas;