class Bootloader extends Phaser.Scene{
    constructor(){
        super({
            key: 'Bootloader'
        });
    }

    init() {
        console.log('Escena Bootloader');
    }
    preload() {
        this.load.path = './assets/';
              
        this.load.image(['fondoI', 'titulo', 'menu', 'btnComenzar', 'btnConf', 'btnVid', 'menuConfig', 
                        'btnMas', 'btnMenos', 'btnCancelar', 'btnCerrar', 'btnAceptar', 'btnDificultad',
                        'adorno', 'fondoLogoInicio']);

        this.load.atlas('mono_all','mono/mono_all.png','mono/mono_all_atlas.json');
        this.load.animation('monoAnim','mono/mono_all_anim.json');
        this.load.atlas('dragon_all','dragon/dragon_all.png','dragon/dragon_all_atlas.json');
        this.load.animation('dragonAnim','dragon/dragon_all_anim.json');
        this.load.atlas('karin_all','karin/karin_all.png','karin/karin_all_atlas.json');
        this.load.animation('karinAnim','karin/karin_all_anim.json');
        this.load.atlas('shadow_all','shadow/shadow_all.png','shadow/shadow_all_atlas.json');
        this.load.animation('shadowAnim','shadow/shadow_all_anim.json');

        this.load.audio("fondo1", ["/sounds/fondo1.mp3"]);
        this.load.audio("hover2", ["/sounds/hover2.mp3"]);
        this.load.audio("abrirConf", ["/sounds/abrir_menu_config.mp3"]);
    }
    create() {
        this.musica();
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;
        this.dificultad = 1;    // 1: fácil, 2: moderado, 3: difícil
        this.volumen = 1;
        this.dificultadAux = 1;
        this.volumenAux = 1;
        
        this.fondo = this.add.image(500, 320, 'fondoI').setScale(1);
        
        this.titulo = this.add.image(500, 70, 'titulo');
        this.menu = this.add.image(220, 480, 'menu');
        this.comenzar = this.add.image(216, 502, 'btnComenzar').setInteractive().setName('comenzar');
        this.conf = this.add.image(180, 567, 'btnConf').setInteractive().setName('conf');
        this.vid = this.add.image(250, 567, 'btnVid').setInteractive().setName('vid');
        this.menu_config = this.add.image(450, 410, 'menuConfig');
        this.aceptar = this.add.image(555, 560, 'btnAceptar').setInteractive().setName('aceptar');
        this.cancelar = this.add.image(350, 560, 'btnCancelar').setInteractive().setName('cancelar');
        this.modo_facil = this.add.image(300, 410, 'btnDificultad').setInteractive().setName('facil');
        this.modo_moderado = this.add.image(300, 450, 'btnDificultad').setInteractive().setName('moderado');
        this.modo_dificil = this.add.image(300, 490, 'btnDificultad').setInteractive().setName('dificil');
        this.subir_volumen = this.add.image(610, 450, 'btnMas').setInteractive().setName('subir_vol');
        this.bajar_volumen = this.add.image(500, 450, 'btnMenos').setInteractive().setName('bajar_vol');
        this.adorno = this.add.image(630, 220, 'adorno');
        this.cerrar = this.add.image(630, 215, 'btnCerrar').setInteractive().setName('cerrar');
        this.txtDificultad = this.add.text(290, 360, "Dificultad del juego:", 
        {font: '16px Arial', fill: '#ffffff'});
        this.txtFacil = this.add.text(330, 400, "Fácil.", 
        {font: '14px Arial', fill: '#ffffff'});
        this.txtModerado = this.add.text(330, 440, "Moderado.", 
        {font: '14px Arial', fill: '#ffffff'});
        this.txtDificil = this.add.text(330, 480, "Difícil.", 
        {font: '14px Arial', fill: '#ffffff'});
        this.txtOpcionesAudio = this.add.text(490, 360, "Opciones de audio:", 
        {font: '16px Arial', fill: '#ffffff'});
        this.txtVolumen = this.add.text(490, 410, "Volumen.", 
        {font: '14px Arial', fill: '#ffffff'});
        this.txtNumVolumen = this.add.text(550, 440, "1", 
        {font: '16px Arial', fill: '#ffffff'});
        //this.fondo.setScale(1.7);
        this.menu_config.setScale(1.3);
        this.adorno.setScale(1.7);
        this.selecModoFacil();
        
        this.mono = this.add.sprite(45, 565, 'mono_all').setInteractive().setScale(0.7);
        //this.mono.anims.play('mono_eat');
        this.mono.anims.play('mono_jump');
        this.dragon = this.add.sprite(1000, 200, 'dragon_all').setInteractive();
        this.dragon.anims.play('dragon_fly');
        this.karin = this.add.sprite(75, 565, 'karin_all').setInteractive().setScale(1.7);
        this.karin.anims.play('karin_walk');
        this.shadow = this.add.sprite(825, 565, 'shadow_all').setInteractive().setScale(1.7);
        this.shadow.anims.play('shadow_stand');
    
        this.tweens = this.add.tween({
          targets: [this.dragon],
          //ease: 'Bounce',
          y: 100,
          x: {
            value:-100,
            //ease: 'Elastic',
            duration: 7000,
            offset: true,
          },
          repeat: -1,
          yoyo: true,
          duration: 7000,
          onYoyo: () => {
            this.dragon.flipX = true;
          },
          onRepeat: () => {
            this.dragon.flipX = false;
          }
        });

        this.sprite = this.add.sprite(500, 320, 'fondoLogoInicio').setOrigin(0.5).setScale(1.3);

        this.tweens2 = this.add.tween({
            targets: this.sprite,
            props: {
              alpha: { value: 0, duration: 3000}
            },
            yoyo: false,
            repeat: 0,
        });

        this.grupoMenu = this.add.group();
        this.grupoMenu.add(this.menu);
        this.grupoMenu.add(this.comenzar);
        this.grupoMenu.add(this.conf);
        this.grupoMenu.add(this.vid);

        this.grupoMenuConfig = this.add.group();
        this.grupoMenuConfig.add(this.menu_config);
        this.grupoMenuConfig.add(this.aceptar);
        this.grupoMenuConfig.add(this.cancelar);
        this.grupoMenuConfig.add(this.modo_facil);
        this.grupoMenuConfig.add(this.modo_moderado);
        this.grupoMenuConfig.add(this.modo_dificil);
        this.grupoMenuConfig.add(this.subir_volumen);
        this.grupoMenuConfig.add(this.bajar_volumen);
        this.grupoMenuConfig.add(this.adorno);
        this.grupoMenuConfig.add(this.cerrar);
        this.grupoMenuConfig.add(this.txtDificultad);
        this.grupoMenuConfig.add(this.txtFacil);
        this.grupoMenuConfig.add(this.txtModerado);
        this.grupoMenuConfig.add(this.txtDificil);
        this.grupoMenuConfig.add(this.txtOpcionesAudio);
        this.grupoMenuConfig.add(this.txtVolumen);
        this.grupoMenuConfig.add(this.txtNumVolumen);
        this.grupoMenuConfig.add(this.mono);
        this.grupoMenuConfig.add(this.karin);
        this.grupoMenuConfig.add(this.shadow);

        this.grupoMenuConfig.children.iterate( (elemento) => {
            elemento.setVisible(false);
            } );
        //this.grupoMenuConfig.setVisible(false);
        this.grupoMenuConfig.setDepth(1);

        this.input.on(eventos.GAMEOBJECT_OVER, (pointer, gameObject) => {
            //console.log(gameObject.name);
            if(gameObject.name == 'comenzar' || gameObject.name=='conf'|| gameObject.name=='vid' ||
               gameObject.name == 'aceptar' || gameObject.name == 'cancelar' || gameObject.name == 'cerrar' ||
               gameObject.name == 'subir_vol' || gameObject.name == 'bajar_vol' || gameObject.name == 'facil' ||
               gameObject.name == 'moderado' || gameObject.name == 'dificil'){
                this.hover.play(this.musicConf2);
                gameObject.setScale(1.01);
            }
        });
        this.input.on(eventos.GAMEOBJECT_OUT, (pointer, gameObject) => {
            //console.log(gameObject.name);
            if(gameObject.name == 'comenzar' || gameObject.name == 'conf'|| gameObject.name == 'vid' ||
               gameObject.name == 'aceptar' || gameObject.name == 'cancelar' || gameObject.name == 'cerrar' ||
               gameObject.name == 'subir_vol' || gameObject.name == 'bajar_vol' || gameObject.name == 'facil' ||
               gameObject.name == 'moderado' || gameObject.name == 'dificil'){
                //this.hover.play(this.musicConf2);
                gameObject.setScale(1);
            }
        });
        this.conf.on(eventos.POINTER_DOWN, () => {
            //this.grupoMenu.setVisible(false);
            this.grupoMenu.children.iterate( (elemento) => {
                elemento.setVisible(false);
                } );
            this.grupoMenuConfig.children.iterate( (elemento) => {
                elemento.setVisible(true);
                } );
            //this.grupoMenuConfig.setVisible(true);
            this.dificultadAux = this.dificultad;
            this.volumenAux = this.volumen;
            this.abrirConfig.play(this.musicConf2);
        });
        this.comenzar.on(eventos.POINTER_DOWN, () => {
            //Escena dummie
            this.scene.stop(this);
            //this.scene.start('Scene_puzzle2');

            this.scene.transition({
                target: 'Scene_1', //cambiar a Scene_1
                duration: 4000,
                moveBelow: true,
                onUpdate: this.transitionOut,
                data: { x: 500, y: 320 }
            });
            //this.scene.launch('Scene_estado');
        });
        this.cerrar.on(eventos.POINTER_DOWN, () => {
            this.grupoMenu.children.iterate( (elemento) => {
                elemento.setVisible(true);
                } );
            //this.grupoMenu.setVisible(true);
            this.grupoMenuConfig.children.iterate( (elemento) => {
                elemento.setVisible(false);
                } );
            //this.grupoMenuConfig.setVisible(false);
            this.noGuardarCambios();
        });
        this.cancelar.on(eventos.POINTER_DOWN, () => {
            this.grupoMenu.children.iterate( (elemento) => {
                elemento.setVisible(true);
                } );
            //this.grupoMenu.setVisible(true);
            this.grupoMenuConfig.children.iterate( (elemento) => {
                elemento.setVisible(false);
                } );
            this.noGuardarCambios();
        });
        this.aceptar.on(eventos.POINTER_DOWN, () => {
            this.grupoMenu.children.iterate( (elemento) => {
                elemento.setVisible(true);
                } );
            //this.grupoMenu.setVisible(true);
            this.grupoMenuConfig.children.iterate( (elemento) => {
                elemento.setVisible(false);
                } );
        });
        this.modo_facil.on(eventos.POINTER_DOWN, () => {
            this.selecModoFacil();
        });
        this.modo_moderado.on(eventos.POINTER_DOWN, () => {
            this.selecModoModerado();
        });
        this.modo_dificil.on(eventos.POINTER_DOWN, () => {
            this.selecModoDificl();
        });
        this.subir_volumen.on(eventos.POINTER_DOWN, () => {
            this.selecMas();
        });
        this.bajar_volumen.on(eventos.POINTER_DOWN, () => {
            this.selecMenos();
        });
        this.vid.on(eventos.POINTER_DOWN, () =>{
          this.tweens2 = this.add.tween({
            targets: this.sprite,
            props: {
              alpha: { value: 1, duration: 3000}
            },
            yoyo: true,
            repeat: 0,
          });
        });
        
        this.cameras.main.setViewport(0, 0, 1000, 640)
        .fadeOut(4000)
        .setBackgroundColor('rgba(0, 0, 0, 0)')
        .flash(5000);

        this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.cameras.main.fadeIn(4000);
        });

        //this.cameras.main.setSize(1000, 640);
        //this.cameras.add(500, 0, 1000, 640);

        /*const camara1 = 
        this.cameras.add(220, 480, 497, 318)
        .fadeOut(2000);*/

        //this.cameras.main.fadeOutScene('Scene_1', this);

    }

    transitionOut(progress){
        this.fondo.y = (1000 * progress);
        /*this.grupoMenu.children.iterate( (elemento) => {
            elemento.y = (1300 * progress);
        });*/
        this.menu.y = (1300 * progress);
        this.comenzar.y = (1350 * progress);
        this.conf.y = (1450 * progress);
        this.vid.y = (1450 * progress);
        this.titulo.y = (650 * progress);
        this.dragon.y = (730 * progress);
    }

    musica(){
        this.fondo1 = this.sound.add("fondo1");
        this.hover = this.sound.add("hover2");
        this.abrirConfig = this.sound.add("abrirConf");

        this.musicConf3 = {
            mute: false,
            volume: 0.1,
            loop: false
        }
        this.musicConf2 = {
            mute: false,
            volume: 0.1,
            loop: false
        }
        this.musicConf = {
            mute: false,
            volume: 0.1,
            loop: true
        }
        
        this.fondo1.play(this.musicConf);
    }

    selecModoFacil(){
        this.modo_facil.setTint(0x5b1a05);
        this.modo_moderado.clearTint();
        this.modo_dificil.clearTint();
        this.dificultad = 1;
    }
    selecModoModerado(){
        this.modo_facil.clearTint();
        this.modo_moderado.setTint(0x5b1a05);
        this.modo_dificil.clearTint();
        this.dificultad = 2;
    }
    selecModoDificl(){
        this.modo_facil.clearTint();
        this.modo_moderado.clearTint();
        this.modo_dificil.setTint(0x5b1a05);
        this.dificultad = 3;
    }
    selecMas(){
        if (this.volumen <= 9){
            this.volumen +=1;
            this.txtNumVolumen.setText(this.volumen.toString());
            this.controlarVolumen(this.volumen);
            //console.log(this.volumen);
        }
    }
    selecMenos(){
        if(this.volumen >= 1){
            this.volumen -= 1;
            this.txtNumVolumen.setText(this.volumen.toString());
            this.controlarVolumen(this.volumen);
            //console.log(this.volumen);
        }
    }
    controlarVolumen(num){
        this.fondo1.setVolume(num*0.1);
    }

    noGuardarCambios(){
        if(this.dificultadAux == 1){
            this.selecModoFacil();
        }else if(this.dificultadAux == 2){
            this.selecModoModerado();
        }else if(this.dificultadAux == 3){
            this.selecModoDificl();
        }
        this.txtNumVolumen.setText(this.volumenAux.toString());
        this.controlarVolumen(this.volumenAux);
        this.volumen = this.volumenAux;
    }

    update(time, delta) {
        // ESTA FUNCION CREA UN CICLO INFINITO
    }
}

export default Bootloader;