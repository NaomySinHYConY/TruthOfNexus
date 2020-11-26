class Scene_puzzle1 extends Phaser.Scene{
    constructor(){
        super({
            key: 'Scene_puzzle1'
        });
    }

    init() {
        console.log('Escena del primer puzzle');
    }
    preload(){
        this.load.path = './assets/puzzle1/';
        this.load.image(['fondo', 'fondo-izq', 'fondo-der', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22']);
        this.load.atlas('monstruo_fly','mCueva/monstruo_fly.png','mCueva/monstruo_fly_atlas.json');
        this.load.animation('mCuevaAnim','mCueva/monstruo_fly_anim.json');
    }
    create() {
        this.fondo = this.add.image(500, 320, 'fondo');

        this.fondoizq = this.physics.add.image(0, 0, 'fondo-izq').setOrigin(0).setImmovable(true);
        this.fondoizq.body.allowGravity = false;

        this.fondoder = this.physics.add.image(1000, 0, 'fondo-der').setOrigin(1,0).setImmovable(true);
        this.fondoder.body.allowGravity = false;

        this.monstruo_fly = this.physics.add.sprite(500, 300, 'monstruo_fly', 0).setInteractive().setScale(0.1);
        this.monstruo_fly.setName('monstruo_fly');
        //this.monstruo_fly.body.setSize(50, 120);
        //this.monstruo_fly.setOffset(10, -20);
        this.monstruo_fly.setCollideWorldBounds(true);
        this.monstruo_fly.anims.play('mcueva_fly');

        this.paredes = this.physics.add.group();
        this.paredes.create(79.5, 351, 'p1');
        this.paredes.create(918.5, 366, 'p2');
        this.paredes.create(174.5, 366, 'p3');
        this.paredes.create(397.5, 142, 'p4');
        this.paredes.create(639.5, 142, 'p5');
        this.paredes.create(252, 190, 'p6');
        this.paredes.create(352, 372, 'p7');
        this.paredes.create(436, 286, 'p8');
        this.paredes.create(228, 478, 'p9');
        this.paredes.create(529, 478, 'p10');
        this.paredes.create(748, 478, 'p11');
        this.paredes.create(716.5, 286, 'p12');
        this.paredes.create(716.5, 372, 'p13');
        this.paredes.create(513.5, 286, 'p14');
        this.paredes.create(378.5, 478, 'p15');
        this.paredes.create(284.5, 286, 'p16');
        this.paredes.create(-4.5, 351, 'p17');
        this.paredes.create(352, 94, 'p18');
        this.paredes.create(546.5, 574, 'p19');
        this.paredes.create(779, 158, 'p20');
        this.paredes.create(504, 648, 'p21');
        this.paredes.create(1004, 386, 'p22');

        this.paredes.children.iterate( (p) => {
            p.setImmovable(true);
            p.body.allowGravity = false;    
        } );
        //physics.add.image(79.5, 351, 'p1');

    }
    update(time, delta) {}
}
export default Scene_puzzle1;