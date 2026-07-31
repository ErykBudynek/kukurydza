import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function KernelCob({ reduced }) {
  const group = useRef(null);
  const kernels = useMemo(() => {
    const items = [];
    const rows = 18;
    const cols = 12;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const t = r / (rows - 1);
        const y = THREE.MathUtils.lerp(-2.35, 2.2, t);
        const radius = 0.72 + Math.sin(t * Math.PI) * 0.38;
        const angle = (c / cols) * Math.PI * 2 + r * 0.18;
        const lit = (r + c) % 5 === 0 || (r * 3 + c) % 7 === 0;
        items.push({
          position: [
            Math.cos(angle) * radius,
            y,
            Math.sin(angle) * radius,
          ],
          rotation: [0.15, -angle + Math.PI / 2, 0.1],
          lit,
          scale: 0.86 + ((r + c) % 3) * 0.05,
        });
      }
    }
    return items;
  }, []);

  useFrame((_, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * 0.28;
  });

  return (
    <group ref={group} rotation={[0.18, 0.4, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.28, 0.34, 4.7, 20]} />
        <meshStandardMaterial color="#5a3a16" roughness={0.85} metalness={0.05} />
      </mesh>

      {kernels.map((k, i) => (
        <mesh key={i} position={k.position} rotation={k.rotation} scale={k.scale} castShadow>
          <capsuleGeometry args={[0.13, 0.16, 4, 8]} />
          <meshStandardMaterial
            color={k.lit ? "#f2c14e" : "#c8922a"}
            emissive={k.lit ? "#e85d04" : "#3a2208"}
            emissiveIntensity={k.lit ? 0.85 : 0.08}
            roughness={0.35}
            metalness={0.18}
          />
        </mesh>
      ))}

      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 1.15, 0.2, -0.2]}
          rotation={[0.2, side * 0.9, side * 0.35]}
        >
          <planeGeometry args={[1.8, 4.4, 1, 12]} />
          <meshStandardMaterial
            color="#3d6b2f"
            side={THREE.DoubleSide}
            roughness={0.9}
            metalness={0.05}
            transparent
            opacity={0.92}
          />
        </mesh>
      ))}

      <mesh position={[0, 2.55, 0]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color="#6b4a1e" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Scene() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      <color attach="background" args={["#0a0704"]} />
      <fog attach="fog" args={["#0a0704", 8, 18]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        castShadow
        position={[4, 6, 3]}
        intensity={1.35}
        color="#ffe08a"
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 1, 4]} intensity={0.7} color="#e85d04" />
      <pointLight position={[2, -1, -3]} intensity={0.35} color="#3d6b2f" />

      <Float
        speed={reduced ? 0 : 1.1}
        rotationIntensity={reduced ? 0 : 0.25}
        floatIntensity={reduced ? 0 : 0.35}
      >
        <KernelCob reduced={reduced} />
      </Float>

      <ContactShadows
        position={[0, -2.7, 0]}
        opacity={0.45}
        scale={12}
        blur={2.6}
        far={6}
        color="#000000"
      />
      <Environment preset="night" />
      <OrbitControls
        enablePan={false}
        minDistance={4.2}
        maxDistance={9}
        minPolarAngle={Math.PI * 0.28}
        maxPolarAngle={Math.PI * 0.72}
        autoRotate={!reduced}
        autoRotateSpeed={0.55}
      />
    </>
  );
}

export default function Cob3DCanvas() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 6.2], fov: 38 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
