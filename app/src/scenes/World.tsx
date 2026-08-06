import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RED = "#d81f37";
const ICE = "#4fd8ff";
const PURPLE = "#9b5cff";
const ORANGE = "#ff6a1f";

function Particles({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.008;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.6;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.045} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function FloatingPolygons() {
  const group = useRef<THREE.Group>(null);
  const shapes = useMemo(() => {
    const colors = [RED, ICE, PURPLE, ORANGE];
    return Array.from({ length: 14 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 34,
        (Math.random() - 0.5) * 22,
        -5 - Math.random() * 45,
      ] as [number, number, number],
      scale: 0.4 + Math.random() * 1.1,
      color: colors[i % colors.length],
      speed: 0.1 + Math.random() * 0.25,
      geo: i % 3,
    }));
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const s = shapes[i];
      child.rotation.x = state.clock.elapsedTime * s.speed;
      child.rotation.y = state.clock.elapsedTime * s.speed * 0.7;
      child.position.y = s.pos[1] + Math.sin(state.clock.elapsedTime * s.speed + i) * 1.2;
    });
  });

  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.pos} scale={s.scale}>
          {s.geo === 0 ? (
            <octahedronGeometry args={[1, 0]} />
          ) : s.geo === 1 ? (
            <tetrahedronGeometry args={[1, 0]} />
          ) : (
            <icosahedronGeometry args={[1, 0]} />
          )}
          <meshBasicMaterial color={s.color} wireframe transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function MovingGrid() {
  const ref = useRef<THREE.GridHelper>(null);
  const baseZ = -20;

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.z = baseZ + ((state.clock.elapsedTime * 1.5) % 10);
  });

  const grid = useMemo(() => {
    const g = new THREE.GridHelper(120, 60, RED, "#222222");
    const mat = g.material as THREE.LineBasicMaterial;
    mat.transparent = true;
    mat.opacity = 0.12;
    return g;
  }, []);

  return <primitive ref={ref} object={grid} position={[0, -10, baseZ]} />;
}

function LightBeams() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = 0.05 + Math.abs(Math.sin(state.clock.elapsedTime * 0.3 + i * 2)) * 0.06;
    });
  });

  const beams = [
    { pos: [-8, 4, -18] as [number, number, number], color: RED },
    { pos: [9, -3, -25] as [number, number, number], color: ICE },
    { pos: [0, 6, -30] as [number, number, number], color: PURPLE },
  ];

  return (
    <group ref={group}>
      {beams.map((b, i) => (
        <mesh key={i} position={b.pos} rotation={[0, 0, Math.PI / 8]}>
          <cylinderGeometry args={[0.15, 3, 40, 24, 1, true]} />
          <meshBasicMaterial color={b.color} transparent opacity={0.08} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function AnimatedRings() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      child.rotation.z = state.clock.elapsedTime * (0.05 + i * 0.02) * (i % 2 === 0 ? 1 : -1);
    });
  });

  const rings = [
    { pos: [-10, 2, -15] as [number, number, number], r: 3, color: RED },
    { pos: [11, -4, -22] as [number, number, number], r: 4.5, color: ICE },
    { pos: [3, 7, -28] as [number, number, number], r: 2.5, color: PURPLE },
  ];

  return (
    <group ref={group}>
      {rings.map((r, i) => (
        <mesh key={i} position={r.pos}>
          <torusGeometry args={[r.r, 0.02, 8, 80]} />
          <meshBasicMaterial color={r.color} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function TechMonuments() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => { if (!group.current) return; group.current.rotation.y = state.clock.elapsedTime * 0.025; group.current.children.forEach((child, index) => { child.position.y += Math.sin(state.clock.elapsedTime * .45 + index) * .002; child.rotation.y += .001 + index * .00008; }); });
  return <group ref={group} position={[0, 0, -24]}>
    <group position={[-11, 3, 0]}><mesh><boxGeometry args={[2.3, 1.5, .14]} /><meshBasicMaterial color={ICE} wireframe transparent opacity={.34} /></mesh><mesh position={[0,-.88,.12]}><boxGeometry args={[2.7,.12,.65]} /><meshBasicMaterial color={ICE} transparent opacity={.18} /></mesh></group>
    <group position={[-6, -2, -4]}><mesh><boxGeometry args={[.8,1.55,.35]} /><meshBasicMaterial color={PURPLE} wireframe transparent opacity={.36} /></mesh></group>
    <group position={[1, 2, -3]}><mesh><boxGeometry args={[1.45,3.1,1]} /><meshBasicMaterial color={RED} wireframe transparent opacity={.29} /></mesh><mesh position={[0,.5,.55]}><boxGeometry args={[1.05,.05,.03]} /><meshBasicMaterial color={RED} /></mesh></group>
    <mesh position={[8,-1,-2]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[1.15,1.15,1.5,22,1,true]} /><meshBasicMaterial color={ORANGE} wireframe transparent opacity={.35} /></mesh>
    <mesh position={[7,5,-3]}><icosahedronGeometry args={[1.35,2]} /><meshBasicMaterial color={ICE} wireframe transparent opacity={.28} /></mesh>
    <mesh position={[-2,6,-5]}><sphereGeometry args={[1.45,20,14]} /><meshBasicMaterial color={PURPLE} wireframe transparent opacity={.3} /></mesh>
    <mesh position={[12,4,-6]}><sphereGeometry args={[1.7,16,12]} /><meshBasicMaterial color={RED} wireframe transparent opacity={.22} /></mesh>
    <mesh position={[-10,-4,-5]}><boxGeometry args={[2.2,2.2,2.2]} /><meshBasicMaterial color={ICE} wireframe transparent opacity={.22} /></mesh>
    <mesh position={[3,-5,-7]} rotation={[0,.5,.2]}><boxGeometry args={[2.8,.12,2]} /><meshBasicMaterial color={ORANGE} wireframe transparent opacity={.3} /></mesh>
  </group>;
}
export function World() {
  return (
    <>
      <fog attach="fog" args={["#050505", 8, 42]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color={RED} />
      <pointLight position={[-8, -3, -10]} intensity={0.3} color={ICE} />

      <Particles />
      <FloatingPolygons />
      <MovingGrid />
      <LightBeams />
      <AnimatedRings />
      <TechMonuments />
    </>
  );
}
