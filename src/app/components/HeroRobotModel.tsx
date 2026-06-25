import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import robotModelUrl from '../../assets/robot-toy-3d-model.glb?url';

const FRONT_YAW = -1.2;

export const HeroRobotModel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.08, 6.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.domElement.className = 'home-robot-canvas';
    container.appendChild(renderer.domElement);

    const ambient = new THREE.HemisphereLight(0xf5fff9, 0x272033, 1.75);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.1);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x87c8aa, 1.45);
    fillLight.position.set(-4, 2.5, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x8f6fc2, 1.05);
    rimLight.position.set(0, 2.5, -4);
    scene.add(rimLight);

    const loader = new GLTFLoader();
    const clock = new THREE.Clock();
    let robot: THREE.Group | null = null;
    let baseY = 0;
    let baseScale = 1;
    let loadedAt = 0;
    let rafId = 0;
    let disposed = false;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.fov = width < 560 ? 34 : 30;
      camera.position.z = width < 560 ? 7.05 : 6.8;
      camera.updateProjectionMatrix();
    };

    const fitRobotToScene = (model: THREE.Group) => {
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxAxis = Math.max(size.x, size.y, size.z) || 1;

      model.position.sub(center);
      baseScale = (window.innerWidth < 560 ? 3.55 : 3.35) / maxAxis;
      model.scale.setScalar(baseScale);

      const fittedBox = new THREE.Box3().setFromObject(model);
      const fittedSize = fittedBox.getSize(new THREE.Vector3());
      baseY = fittedSize.y > fittedSize.x ? 0.08 : 0.04;
      model.position.y = baseY;
      model.rotation.set(0.03, FRONT_YAW, 0);
    };

    loader.load(robotModelUrl, gltf => {
      if (disposed) return;

      robot = gltf.scene;
      loadedAt = clock.getElapsedTime();
      robot.traverse(child => {
        if (!(child instanceof THREE.Mesh)) return;

        child.castShadow = false;
        child.receiveShadow = false;

        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach(material => {
          if ('roughness' in material) material.roughness = Math.min(material.roughness ?? 0.6, 0.72);
          if ('metalness' in material) material.metalness = Math.min(material.metalness ?? 0, 0.25);
        });
      });

      fitRobotToScene(robot);
      scene.add(robot);
    });

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (robot) {
        const sinceLoaded = elapsed - loadedAt;
        const entrance = Math.min(sinceLoaded / 1.2, 1);
        const entranceEase = 1 - Math.pow(1 - entrance, 3);
        const idleYaw = Math.sin(elapsed * 0.45) * 0.035;
        const idlePitch = Math.sin(elapsed * 0.8) * 0.018;
        const idleRoll = Math.sin(elapsed * 0.65) * 0.025;

        robot.rotation.x = 0.03 + idlePitch;
        robot.rotation.y = THREE.MathUtils.lerp(-0.55, FRONT_YAW + idleYaw, entranceEase);
        robot.rotation.z = idleRoll;
        robot.position.x = Math.sin(elapsed * 0.5) * 0.018;
        robot.position.y = baseY + Math.sin(elapsed * 0.95) * 0.045;
        robot.scale.setScalar(baseScale * (1 + Math.sin(elapsed * 1.3) * 0.012));
      }

      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);

      scene.traverse(object => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach(material => material.dispose());
      });

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className="home-robot-stage" aria-hidden="true" />;
};
