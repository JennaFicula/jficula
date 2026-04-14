import React, { useRef, useEffect, Suspense, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import styles from './SpotWalker.module.css';

const MODEL_URL = '/media/spotboston_dynamic_high_poly/scene.gltf';
const TARGET_HEIGHT = 2.4;
// 135° + 40° = 175°
const BASE_ROT_Y = (175 * Math.PI) / 180;
// 60° diagonal turn so you can still see Spot's face while walking
const WALK_ROT_RIGHT = BASE_ROT_Y + Math.PI / 3;
const WALK_ROT_LEFT  = BASE_ROT_Y - Math.PI / 3;

// Shared mouse state (normalized -1..1)
const mouseNorm = { x: 0, y: 0 };

type AnimState = 'idle' | 'petting' | 'jumping';

interface SpotSceneProps {
  animStateRef: React.MutableRefObject<AnimState>;
  onAnimDone: () => void;
  walkModeRef: React.MutableRefObject<boolean>;
  keysRef: React.MutableRefObject<{ left: boolean; right: boolean }>;
  walkXRef: React.MutableRefObject<number>;
}

function SpotScene({ animStateRef, onAnimDone, walkModeRef, keysRef, walkXRef }: SpotSceneProps) {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null!);
  const readyRef = useRef(false);
  const baseYRef = useRef(0);
  const rotY = useRef(BASE_ROT_Y);
  const rotX = useRef(0);
  const animStartRef = useRef<number | null>(null);
  const lastAnimState = useRef<AnimState>('idle');
  const onAnimDoneRef = useRef(onAnimDone);
  useEffect(() => { onAnimDoneRef.current = onAnimDone; }, [onAnimDone]);

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
    const anim = animStateRef.current;

    // Record start time whenever animation state changes
    if (anim !== lastAnimState.current) {
      animStartRef.current = t;
      lastAnimState.current = anim;
    }

    const elapsed = animStartRef.current !== null ? t - animStartRef.current : 0;

    if (anim === 'petting') {
      // Excited wiggle for 1.2s — rapid oscillation decaying to zero
      const duration = 1.2;
      if (elapsed < duration) {
        const decay = 1 - elapsed / duration;
        group.rotation.y = BASE_ROT_Y + Math.sin(elapsed * 18) * 0.28 * decay;
        group.rotation.x = Math.sin(elapsed * 14 + 1) * 0.1 * decay;
        group.position.y = baseYRef.current + Math.abs(Math.sin(elapsed * 10)) * 0.06 * decay;
      } else {
        group.rotation.y = BASE_ROT_Y;
        group.rotation.x = 0;
        group.position.y = baseYRef.current;
        onAnimDoneRef.current();
      }
      group.position.x = walkXRef.current;
    } else if (anim === 'jumping') {
      // Single jump arc over 0.8s
      const duration = 0.8;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        group.position.y = baseYRef.current + Math.sin(progress * Math.PI) * 0.55;
        // Slight nose-down lean at peak
        group.rotation.x = Math.sin(progress * Math.PI) * -0.12;
        const targetY = BASE_ROT_Y + mouseNorm.x * (Math.PI / 7.2);
        rotY.current += (targetY - rotY.current) * 0.05;
        group.rotation.y = rotY.current;
      } else {
        group.position.y = baseYRef.current;
        group.rotation.x = 0;
        onAnimDoneRef.current();
      }
      group.position.x = walkXRef.current;
    } else {
      // Idle — walk mode or mouse tracking
      const walking = walkModeRef.current;
      const dir = keysRef.current.right ? 1 : keysRef.current.left ? -1 : 0;

      if (walking) {
        if (dir !== 0) {
          walkXRef.current = walkXRef.current + 0.035 * dir;
          const walkFaceY = dir > 0 ? WALK_ROT_RIGHT : WALK_ROT_LEFT;
          rotY.current += (walkFaceY - rotY.current) * 0.12;
        } else {
          // Standing still in walk mode — face camera again
          rotY.current += (BASE_ROT_Y - rotY.current) * 0.06;
        }
        group.rotation.x = 0;
      } else {
        // Walk mode off — slide back to center and resume mouse tracking
        walkXRef.current += (0 - walkXRef.current) * 0.04;
        const targetY = BASE_ROT_Y + mouseNorm.x * (Math.PI / 7.2);
        const targetX = -mouseNorm.y * (Math.PI / 15);
        rotY.current += (targetY - rotY.current) * 0.05;
        rotX.current += (targetX - rotX.current) * 0.05;
        group.rotation.x = rotX.current;
      }

      group.rotation.y = rotY.current;
      group.position.x = walkXRef.current;
      group.position.y = baseYRef.current + 0.018 * Math.sin(t * 1.2);
    }
  });

  return (
    <group ref={groupRef} rotation={[0, BASE_ROT_Y, 0]} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);

export default function SpotWalker() {
  const [animState, setAnimState] = useState<AnimState>('idle');
  const [walkMode, setWalkMode] = useState(false);
  const [toast, setToast] = useState(false);
  const animStateRef = useRef<AnimState>('idle');
  const walkModeRef = useRef(false);
  const keysRef = useRef({ left: false, right: false });
  const walkXRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const setAnim = useCallback((next: AnimState) => {
    animStateRef.current = next;
    setAnimState(next);
  }, []);

  const handleDone = useCallback(() => setAnim('idle'), [setAnim]);

  // Arrow key listeners — only active in walk mode
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!walkModeRef.current) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const down = e.type === 'keydown';
        keysRef.current = {
          left:  e.key === 'ArrowLeft'  ? down : keysRef.current.left,
          right: e.key === 'ArrowRight' ? down : keysRef.current.right,
        };
      }
      if (e.key === 'Escape' && e.type === 'keydown') {
        walkModeRef.current = false;
        setWalkMode(false);
        keysRef.current = { left: false, right: false };
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('keyup', onKey);
    };
  }, []);

  const toggleWalkMode = useCallback(() => {
    const next = !walkModeRef.current;
    if (next && wrapRef.current) {
      // Seed Spot's X so it appears in the same screen position when the
      // canvas expands from the modelCol to the full viewport.
      const rect = wrapRef.current.getBoundingClientRect();
      const canvasCenterX = rect.left + rect.width / 2;
      const vpHalfW = window.innerWidth / 2;
      const fovRad = (52 * Math.PI) / 180;
      // Full-page frustum half-width at the model plane (camera z = 4.5)
      const frustumHalfW = Math.tan(fovRad / 2) * 4.5 * (window.innerWidth / window.innerHeight);
      walkXRef.current = ((canvasCenterX - vpHalfW) / vpHalfW) * frustumHalfW;
    }
    walkModeRef.current = next;
    setWalkMode(next);
    if (!next) keysRef.current = { left: false, right: false };
  }, []);

  const handleClick = useCallback(() => {
    if (animStateRef.current !== 'idle') return;
    // Short delay to let double-click cancel this
    clickTimerRef.current = setTimeout(() => {
      setAnim('petting');
      setToast(true);
      setTimeout(() => setToast(false), 1800);
    }, 220);
  }, [setAnim]);

  const handleDoubleClick = useCallback(() => {
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }
    if (animStateRef.current !== 'idle') return;
    setAnim('jumping');
  }, [setAnim]);

  const isIdle = animState === 'idle';

  return (
    <div ref={wrapRef} className={walkMode ? styles.wrapWalk : styles.wrap}>
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        style={{ cursor: isIdle && !walkMode ? 'pointer' : 'default', pointerEvents: walkMode ? 'none' : 'auto' }}
        camera={{ position: [0, 1.6, 4.5], fov: 52 }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
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
          <SpotScene
            animStateRef={animStateRef}
            onAnimDone={handleDone}
            walkModeRef={walkModeRef}
            keysRef={keysRef}
            walkXRef={walkXRef}
          />
        </Suspense>
      </Canvas>

      {/* Walk mode toggle */}
      <button
        className={`${styles.walkBtn}${walkMode ? ' ' + styles.walkBtnActive + ' ' + styles.walkBtnFixed : ''}`}
        onClick={toggleWalkMode}
        aria-label={walkMode ? 'Stop walking Spot' : 'Take Spot for a walk'}
      >
        {walkMode ? '× stop' : 'Take Spot for a walk →'}
      </button>

      {/* Arrow key hint shown while walk mode is active */}
      {walkMode && <div className={styles.walkHint}>← →</div>}

      {/* Click-to-pet toast */}
      {toast && <div className={styles.toast}>Good boy! 🐾</div>}
    </div>
  );
}
