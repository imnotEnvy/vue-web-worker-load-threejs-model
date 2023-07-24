import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

self.addEventListener('message', (event) => {
    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const cube = new THREE.Mesh( geometry, material );
    // console.log(cube.toJSON())
    // self.postMessage({ model: cube.toJSON() });

    console.log("Loading model: " + event.data.url);
    const loader = new GLTFLoader();
    loader.load(event.data.url, (gltf) => {
        console.log("Model: ", gltf.scene)
        self.postMessage({ type: 'load-model', model: gltf.scene.toJSON() });
    });
})
