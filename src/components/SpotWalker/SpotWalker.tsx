import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import styles from './SpotWalker.module.css';

const MODEL_URL = '/media/spotboston_dynamic_high_poly/scene.gltf';
const TARGET_HEIGHT = 2.4;
// 135° + 40° = 175°
const BASE_ROT_Y = (175 * Math.PI) / 180;

// Shared mouse state (normalized -1..1)
const mouseNorm = { x: 0, y: 0 };

function SpotScene() {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null!);
  const readyRef = useRef(false);
  const baseYRef = useRef(0);
  const rotY = useRef(BASE_ROT_Y);
  const rotX = useRef(0);

  useEffect(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => {
        const mat = m as THREE.MeshStandardMaterial;
        if (!mat) return;
        // Force fully opaque — prevents see-through artifacts on overlapping mesh layers
        mat.transparent = false;
        mat.opacity = 1;
        mat.depthWrite = true;
        mat.alphaTest = 0;
        mat.side = THREE.FrontSide;
        mat.needsUpdate = true;
      });
    });
  }, [scene]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseNorm.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNorm.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    if (!readyRef.current) {
      const box = new THREE.Box3().setFromObject(group);
      const size = new THREE.Vector3();
      box.getSize(size);
      if (size.y > 0.001) {
        const s = TARGET_HEIGHT / size.y;
        group.scale.setScalar(s);
        const box2 = new THREE.Box3().setFromObject(group);
        group.position.y = -box2.min.y;
        baseYRef.current = group.position.y;
        readyRef.current = true;
      }
      return;
    }

    const t = state.clock.getElapsedTime();

    // Mouse subtly tilts around the base -45° pose (±25° horizontal, ±12° vertical)
    const targetY = BASE_ROT_Y + mouseNorm.x * (Math.PI / 7.2);
    const targetX = -mouseNorm.y * (Math.PI / 15);
    rotY.current += (targetY - rotY.current) * 0.05;
    rotX.current += (targetX - rotX.current) * 0.05;

    group.rotation.y = rotY.current;
    group.rotation.x = rotX.current;

    // Subtle idle breathe
    group.position.y = baseYRef.current + 0.018 * Math.sin(t * 1.2);
  });

  return (
    <group ref={groupRef} rotation={[0, BASE_ROT_Y, 0]} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);

export default function SpotWalker() {
  return (
    <div className={styles.wrap}>
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        style={{ pointerEvents: 'none' }}
        camera={{ position: [0, 1.6, 4.5], fov: 52 }}
        onCreated={({ gl, camera }) => {
          // useLegacyLights=false enables physically correct (PBR) lighting in Three 0.169
          (gl as any).useLegacyLights = false;
          camera.lookAt(0, 1.1, 0);
          camera.updateMatrixWorld();
        }}
      >
        {/* Ambient fill */}
        <ambientLight intensity={1.2} />
        {/* Key light — upper front-right */}
        <directionalLight position={[4, 6, 4]} intensity={3.5} castShadow />
        {/* Fill light — left side */}
        <directionalLight position={[-3, 3, 2]} intensity={1.4} />
        {/* Rim light — back */}
        <pointLight position={[0, 3, -4]} intensity={2.0} color="#aaccff" />
        <Suspense fallback={null}>
          <SpotScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
