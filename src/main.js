import Bootloader from "./scenes/Bootloader.js"
import Scene_estado from "./scenes/Scene_estado.js"
import Scene_1 from "./scenes/Scene_1.js"
import Scene_tienda from "./scenes/Scene_tienda.js"
import Scene_puzzle1 from "./scenes/Scene_puzzle1.js"
import Scene_puzzle1_caida from "./scenes/Scene_puzzle1_caida.js"

const config = {
    title: "Curso Phaser",		    //Nombre del juego (opcional)
    url: "http://google.es",	    //Dirección de la página del juego (opcional)
    version: "0.0.1",		        //Versión alfanumérica (opcional)
    type: Phaser.AUTO,		        //Tipo de renderizado (WEBGL, CANVAS, AUTO)
                                    // AUTO: busca primero WEBGL y si no está disponible eligirá CANVAS
    width: 1000,			            //Ancho de pantalla del juego
    height: 640, 			        //Alto de pantalla del juego
    parent: "contenedor",		    //Nombre del id del elemento <div> en el index.html
                                    // se refiere a dónde se pondrá el canvas o lienzo
    pixelArt: true,		            //Diseño con pixeles definidos (no borrosos)
    // scale: {
    //     parent: "contenedor",
    //     width: 1000,
    //     height: 640,
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    //     },
    backgroundColor: "#34495e", 	//Color de fondo del canvas ()
    scene: [Bootloader, Scene_1, Scene_puzzle1, Scene_puzzle1_caida, Scene_tienda, Scene_estado],    //Aquí irá la lista de scenas del juego
    banner:{
        hidePhaser: true,
        text: "#fff00f",
        background: [
                "#16a085",
                "#2ecc71",
                "#e74c3c", 
                "#000000"] 
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity:{
                y:800
            },
            debug: true
        }
    }
};

const game = new Phaser.Game(config);