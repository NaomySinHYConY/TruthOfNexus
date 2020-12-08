class Scene_pantallaFinal extends Phaser.Scene{
    constructor(){
        super({
            key: 'Scene_pantallaFinal'
        });
    }

    init() {
        console.log('Pantalla final');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('paFinal','pantallaFinal2.png');

        this.load.audio('laugh', 'sounds/laugh.mp3');

        this.load.atlas('nexus_all', 'Nexus/nexus_all.png','Nexus/nexus_all_atlas.json');
        this.load.animation('nexusAnim', 'Nexus/nexus_all_anim.json');
    }

    create(){
        this.spriteF = this.add.sprite(500, 320, 'paFinal').setOrigin(0.5).setScale(1).setAlpha(0);

        this.tweens2 = this.add.tween({
            targets: this.spriteF,
            
            props: {
              alpha: { value: 1, duration: 3000}
            },
            yoyo: false,
            repeat: 0,
            
        });
        let risa_final = this.sound.add("laugh",{loop:false});
        risa_final.play();

        //Nexus
        this.nexusF = this.physics.add.sprite(20,530, 'nexus_all', 0).setInteractive();
        this.nexusF.setScale(1.7);
        this.nexusF.setName('Nexus');
        this.nexusF.setFlipX(true);
        this.nexusF.setOrigin(0.5);
        this.nexusF.setDepth(2);
        this.nexusF.setCollideWorldBounds(true);
        this.nexusF.anims.play('walk');
    }

    update(time,delta){
        this.nexusF.body.velocity.x = 160;
    }
}
export default Scene_pantallaFinal;