import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useEffect, useRef } from "react";

function MyThree() {
    const refContainer = useRef(null);
    useEffect(() => {
        // === THREE.JS CODE START ===
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        refContainer.current && refContainer.current.appendChild( renderer.domElement );

        // Replace BoxGeometry with SphereGeometry
        var geometry = new THREE.SphereGeometry(2, 32, 32);

        const loader = new THREE.TextureLoader();
        const texture = loader.load( 'world_maps/Spoon.png' );
        texture.colorSpace = THREE.SRGBColorSpace;

        const material = new THREE.MeshBasicMaterial({
            color: 0xFF8844,
            map: texture,
        });

        var sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        camera.position.z = 5;

        var controls = new OrbitControls(camera, renderer.domElement);
        controls.update();

        var animate = function () {
            requestAnimationFrame(animate);
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();
    }, []);
    return (
        <div ref={refContainer}></div>
    );
}

export default MyThree;