import './assets/main.css'

import * as THREE from 'three';
import { createApp } from 'vue'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// import App from './App.vue'

if (window.Worker) {
    const App = {
        mounted() {

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearAlpha(0.2);
            // scene.background = new THREE.Color('white');
            document.body.appendChild(renderer.domElement);

            // const loader = new GLTFLoader();
            // loader.load('/shiba/scene.gltf', (gltf) => {
            //     console.log(gltf.scene)
            //     scene.add(gltf.scene)
            // });

            const worker = new Worker(
                new URL('./worker.js', import.meta.url),
                { type: 'module'}
            );

            worker.addEventListener('message', async (event) => {
                console.log("Receiving:", event.data.model);
                const gltf = await new THREE.ObjectLoader().parseAsync(event.data.model);
                console.log("Parsed:", gltf);

                // gltf.traverse((child) => {
                //     if (child.isMesh && child.map){
                //       const texture = new THREE.TextureLoader().load("/shiba/textures/default_baseColor.png");
                //     //   const material = new THREE.MeshBasicMaterial({ map: texture });
                //       child.material.map = texture;
                //     }
                //   })

                scene.add( gltf );
                camera.position.z = 3;
                function animate() {
                    requestAnimationFrame( animate );
                    gltf.rotation.x += 0.01;
                    gltf.rotation.y += 0.01;
                    renderer.render( scene, camera );
                }
                animate();
            });

            const modelUrl = '/shiba/scene.gltf'
            // const modelUrl = '/three-assets/RobotExpressive.glb'
            // const modelUrl = '/shiba/shiba.glb'
            // worker.postMessage({ type: 'load-model', url: 'https://gitee.com/cqjsc_admin/glTF-Sample-Models/raw/master/1.0/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf' });
            worker.postMessage({ type: 'load-model', url: modelUrl });
        }
    };

    createApp(App).mount('#app')

}

