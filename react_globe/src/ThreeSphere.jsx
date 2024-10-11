import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeSphere = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);

    // Define colors for the segments
    const colors = [
      new THREE.Color(0xff0000), // Red
      new THREE.Color(0x00ff00), // Green
      new THREE.Color(0x0000ff), // Blue
      new THREE.Color(0xffff00), // Yellow
      new THREE.Color(0xff00ff), // Magenta
      new THREE.Color(0x00ffff)  // Cyan
    ];

    // Assign colors to the vertices
    const position = geometry.attributes.position;
    const color = new Float32Array(position.count * 3);

    for (let i = 0; i < position.count; i++) {
      const colorIndex = Math.floor(i / (position.count / colors.length));
      color[i * 3] = colors[colorIndex].r;
      color[i * 3 + 1] = colors[colorIndex].g;
      color[i * 3 + 2] = colors[colorIndex].b;
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(color, 3));

    const material = new THREE.MeshBasicMaterial({ vertexColors: true });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeSphere;