import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useBootStore } from "../hooks/useBootSequence";

const RED = "#d81f37";
const ICE = "#4fd8ff";

/** Two vertical panels that slide apart to reveal the scene behind them. */
function GarageDoors({ progress }: { progress: React.MutableRefObject<number> }) {
  const left = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const p = progress.current;
    if (left.current) left.current.position.x = -3 - p * 9;
    if (right.current) right.current.position.x = 3 + p * 9;
  });

  const doorGeo = useMemo(() => new THREE.PlaneGeometry(6.2, 14), []);
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(doorGeo), [doorGeo]);
  // Horizontal panel-seam lines etched into each door, purely cosmetic detail
  // so the doors read as machined panels rather than a flat silhouette.
  const panelLines = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 1; i < 5; i++) {
      const y = -7 + (14 / 5) * i;
      pts.push(new THREE.Vector3(-3.1, y, 0), new THREE.Vector3(3.1, y, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  return (
    <>
      <mesh ref={left} geometry={doorGeo} position={[-3, 0, 4]}>
        <meshStandardMaterial color="#111214" metalness={0.4} roughness={0.6} emissive={RED} emissiveIntensity={0.04} />
        <lineSegments geometry={edgeGeo}>
          <lineBasicMaterial color={RED} transparent opacity={0.5} />
        </lineSegments>
        <lineSegments geometry={panelLines}>
          <lineBasicMaterial color={RED} transparent opacity={0.18} />
        </lineSegments>
      </mesh>
      <mesh ref={right} geometry={doorGeo} position={[3, 0, 4]}>
        <meshStandardMaterial color="#111214" metalness={0.4} roughness={0.6} emissive={ICE} emissiveIntensity={0.04} />
        <lineSegments geometry={edgeGeo}>
          <lineBasicMaterial color={ICE} transparent opacity={0.5} />
        </lineSegments>
        <lineSegments geometry={panelLines}>
          <lineBasicMaterial color={ICE} transparent opacity={0.18} />
        </lineSegments>
      </mesh>
      {/* Seam glow between the doors, fades as they part */}
      <mesh position={[0, 0, 4.05]}>
        <planeGeometry args={[0.06, 14]} />
        <meshBasicMaterial color={RED} transparent opacity={0.8} />
      </mesh>
    </>
  );
}

/** Abstract wireframe silhouette suggesting a sports bike — two wheels, a
 * frame, no literal modeled geometry since no licensed asset is available. */
function BikeSilhouette() {
  const group = useRef<THREE.Group>(null);
  const mat = useMemo(() => new THREE.LineBasicMaterial({ color: RED, transparent: true, opacity: 0.85 }), []);

  const frame = useMemo(() => {
    const pts = [
      new THREE.Vector3(-1.3, -0.6, 0),
      new THREE.Vector3(-0.6, 0.35, 0),
      new THREE.Vector3(0.3, 0.4, 0),
      new THREE.Vector3(0.9, -0.1, 0),
      new THREE.Vector3(1.3, -0.6, 0),
      new THREE.Vector3(0.3, -0.6, 0),
      new THREE.Vector3(-0.6, 0.35, 0),
      new THREE.Vector3(-0.2, -0.6, 0),
      new THREE.Vector3(-1.3, -0.6, 0),
    ];
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
  });

  return (
    <group ref={group} position={[-2.6, -1.4, 5.5]} scale={1.15}>
      <primitive object={new THREE.Line(frame, mat)} />
      <mesh position={[-1.3, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.05, 8, 32]} />
        <meshBasicMaterial color={RED} wireframe transparent opacity={0.7} />
      </mesh>
      <mesh position={[1.3, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.05, 8, 32]} />
        <meshBasicMaterial color={RED} wireframe transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/** Abstract wireframe silhouette suggesting a low sports car. */
function CarSilhouette() {
  const group = useRef<THREE.Group>(null);
  const mat = useMemo(() => new THREE.LineBasicMaterial({ color: ICE, transparent: true, opacity: 0.85 }), []);

  const body = useMemo(() => {
    const pts = [
      new THREE.Vector3(-2.2, -0.5, 0),
      new THREE.Vector3(-1.6, 0.1, 0),
      new THREE.Vector3(-0.5, 0.42, 0),
      new THREE.Vector3(0.6, 0.42, 0),
      new THREE.Vector3(1.7, 0.05, 0),
      new THREE.Vector3(2.2, -0.5, 0),
      new THREE.Vector3(-2.2, -0.5, 0),
    ];
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12 + 1) * 0.08;
  });

  return (
    <group ref={group} position={[2.6, -1.7, 5]} scale={1.1}>
      <primitive object={new THREE.Line(body, mat)} />
      {[-1.4, 1.4].map((x) => (
        <mesh key={x} position={[x, -0.5, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.36, 0.05, 8, 28]} />
          <meshBasicMaterial color={ICE} wireframe transparent opacity={0.6} />
        </mesh>
      ))}
      {[-1.4, 1.4].map((x) => (
        <mesh key={`${x}-b`} position={[x, -0.5, -0.9]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.36, 0.05, 8, 28]} />
          <meshBasicMaterial color={ICE} wireframe transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/** Distant wireframe skyline — a grid of boxes at varying heights, standing
 * in for "an animated digital city" without needing real building assets. */
function CitySkyline() {
  const group = useRef<THREE.Group>(null);
  const buildings = useMemo(() => {
    const arr: { pos: [number, number, number]; h: number; color: string }[] = [];
    for (let i = 0; i < 40; i++) {
      const h = 2 + Math.random() * 10;
      arr.push({
        pos: [(Math.random() - 0.5) * 60, h / 2 - 6, -30 - Math.random() * 40],
        h,
        color: Math.random() > 0.5 ? RED : ICE,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15 + Math.abs(Math.sin(state.clock.elapsedTime * 0.2 + i)) * 0.12;
    });
  });

  return (
    <group ref={group}>
      {buildings.map((b, i) => (
        <mesh key={i} position={b.pos}>
          <boxGeometry args={[1.4, b.h, 1.4]} />
          <meshBasicMaterial color={b.color} wireframe transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * The 3D half of the boot cinematic, mounted for the "reveal" phase: garage
 * doors slide open, wireframe bike/car silhouettes and a city skyline fade
 * in behind them, camera pulls back and does one slow orbit, then hands off
 * to the normal chapter CameraRig.
 */
export function GarageReveal({ reducedMotion }: { reducedMotion: boolean }) {
  const doorProgress = useRef(0);
  const { phase, setPhase } = useBootStore();
  const vehicleOpacity = useRef({ v: 0 });

  useEffect(() => {
    if (phase !== "reveal") return;

    const tl = gsap.timeline({
      onComplete: () => setPhase("done"),
    });

    if (reducedMotion) {
      doorProgress.current = 1;
      vehicleOpacity.current.v = 1;
      tl.to({}, { duration: 0.4 });
      return () => {
        tl.kill();
      };
    }

    tl.to(doorProgress, { current: 1, duration: 1.8, ease: "power2.inOut" })
      .to(vehicleOpacity.current, { v: 1, duration: 1.4, ease: "power2.out" }, "-=1.0")
      .to({}, { duration: 1.2 }); // hold for the orbit / name reveal to read

    return () => {
      tl.kill();
    };
  }, [phase, reducedMotion, setPhase]);

  if (phase !== "reveal") return null;

  return (
    <group>
      <GarageDoors progress={doorProgress} />
      <CitySkyline />
      <BikeSilhouette />
      <CarSilhouette />
      <pointLight position={[0, 3, 8]} intensity={1.2} color={RED} />
      <pointLight position={[-3, 1, 6]} intensity={0.8} color={RED} />
      <pointLight position={[3, 1, 6]} intensity={0.8} color={ICE} />
      <ambientLight intensity={0.15} />
    </group>
  );
}
