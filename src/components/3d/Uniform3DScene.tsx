"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, PerspectiveCamera, Float } from "@react-three/drei";
import * as THREE from "three";

interface UniformModelProps {
  color?: string;
  accentColor?: string;
  activeItem?: "blazer" | "shirt" | "full" | "sports";
  mousePosition?: { x: number; y: number };
}

/* -------------------------------------------------------------
 * Floating Studio Particles
 * ------------------------------------------------------------- */
function FloatingParticles({ count = 35 }: { count?: number }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 5;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 5;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return coords;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      ref.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#FF8533"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* -------------------------------------------------------------
 * Sartorial Tailor's Dress Form / Uniform Mannequin (No Human)
 * ------------------------------------------------------------- */
function SartorialUniformMannequin({
  color = "#0B192C",
  accentColor = "#FF6500",
  activeItem = "full",
  mousePosition = { x: 0, y: 0 },
}: UniformModelProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Gentle rotation and parallax response to mouse
    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mousePosition.y * 0.2,
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -mousePosition.x * 0.15,
      0.05
    );
  });

  // Tailored Garment Materials
  const blazerMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.65,
        metalness: 0.08,
      }),
    [color]
  );

  const shirtMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#F8FAFC"),
        roughness: 0.35,
        metalness: 0.02,
      }),
    []
  );

  const tieMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(accentColor),
        roughness: 0.45,
        metalness: 0.15,
      }),
    [accentColor]
  );

  const tieStripeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#FFFFFF"),
        roughness: 0.4,
      }),
    []
  );

  const mannequinLinenMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E2DCD5"),
        roughness: 0.8,
        metalness: 0.02,
      }),
    []
  );

  const woodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3E2723"),
        roughness: 0.4,
        metalness: 0.1,
      }),
    []
  );

  const chromeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E2E8F0"),
        metalness: 0.95,
        roughness: 0.12,
      }),
    []
  );

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E5A93C"),
        metalness: 0.9,
        roughness: 0.2,
      }),
    []
  );

  const isBlazerActive = activeItem === "full" || activeItem === "blazer";

  return (
    <group ref={groupRef} position={[0, -0.15, 0]}>
      {/* ========================================================
          1. SARTORIAL TAILOR'S DRESS FORM STAND & FINIAL CAP
         ======================================================== */}
      {/* Turned Wooden Neck Cap (Sartorial Finial) */}
      <group position={[0, 1.05, 0]}>
        {/* Wooden Finial Dome */}
        <mesh material={woodMat} position={[0, 0.08, 0]}>
          <sphereGeometry args={[0.075, 20, 20]} />
        </mesh>
        {/* Wooden Neck Block */}
        <mesh material={woodMat}>
          <cylinderGeometry args={[0.065, 0.08, 0.1, 24]} />
        </mesh>
        <mesh material={chromeMat} position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.02, 24]} />
        </mesh>
      </group>

      {/* Tailor's Inner Linen Torso Form */}
      <mesh material={mannequinLinenMat} position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 1.05, 24]} />
      </mesh>

      {/* ========================================================
          2. CRISP WHITE SHIRT & COLLAR
         ======================================================== */}
      {/* White Shirt Collar Stand */}
      <mesh material={shirtMat} position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.16, 0.18, 0.16, 24]} />
      </mesh>

      {/* Left & Right Folded Collar Lapels */}
      <mesh material={shirtMat} position={[-0.13, 0.82, 0.13]} rotation={[0.4, 0.45, -0.3]}>
        <boxGeometry args={[0.16, 0.11, 0.025]} />
      </mesh>
      <mesh material={shirtMat} position={[0.13, 0.82, 0.13]} rotation={[0.4, -0.45, 0.3]}>
        <boxGeometry args={[0.16, 0.11, 0.025]} />
      </mesh>

      {/* Shirt Front Button Placket */}
      <mesh material={shirtMat} position={[0, 0.55, 0.16]}>
        <boxGeometry args={[0.08, 0.55, 0.02]} />
      </mesh>

      {/* ========================================================
          3. STRIPED SCHOOL REGALIA TIE
         ======================================================== */}
      <group position={[0, 0.64, 0.17]}>
        {/* Knot */}
        <mesh material={tieMat} position={[0, 0.16, 0]}>
          <coneGeometry args={[0.075, 0.11, 4]} />
        </mesh>
        {/* Tie Blade */}
        <mesh material={tieMat} position={[0, -0.1, 0]}>
          <boxGeometry args={[0.095, 0.48, 0.02]} />
        </mesh>
        {/* Institutional Diagonal Stripes */}
        <mesh material={tieStripeMat} position={[0, 0.04, 0.012]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.11, 0.018, 0.008]} />
        </mesh>
        <mesh material={tieStripeMat} position={[0, -0.12, 0.012]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.11, 0.018, 0.008]} />
        </mesh>
        {/* Pointed Tip */}
        <mesh material={tieMat} position={[0, -0.37, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.067, 0.067, 0.02]} />
        </mesh>
        {/* Golden Tie Bar Clip */}
        <mesh material={goldMat} position={[0, -0.05, 0.016]}>
          <boxGeometry args={[0.1, 0.016, 0.008]} />
        </mesh>
      </group>

      {/* ========================================================
          4. TAILORED SCHOOL UNIFORM BLAZER
         ======================================================== */}
      {isBlazerActive && (
        <group>
          {/* Main Jacket Torso */}
          <mesh material={blazerMat} position={[0, 0.42, 0]}>
            <cylinderGeometry args={[0.42, 0.47, 0.95, 24]} />
          </mesh>

          {/* Left Notched Lapel */}
          <mesh material={blazerMat} position={[-0.19, 0.65, 0.17]} rotation={[0.2, 0.3, -0.22]}>
            <boxGeometry args={[0.2, 0.5, 0.05]} />
          </mesh>
          {/* Right Notched Lapel */}
          <mesh material={blazerMat} position={[0.19, 0.65, 0.17]} rotation={[0.2, -0.3, 0.22]}>
            <boxGeometry args={[0.2, 0.5, 0.05]} />
          </mesh>

          {/* Left Shoulder & Tailored Sleeve */}
          <mesh material={blazerMat} position={[-0.48, 0.64, 0]} rotation={[0, 0, 0.12]}>
            <sphereGeometry args={[0.14, 16, 16]} />
          </mesh>
          <mesh material={blazerMat} position={[-0.52, 0.34, 0.02]} rotation={[0.05, 0, 0.16]}>
            <capsuleGeometry args={[0.11, 0.56, 8, 16]} />
          </mesh>
          {/* White Shirt Cuff Peeking from Left Sleeve */}
          <mesh material={shirtMat} position={[-0.59, 0.02, 0.03]} rotation={[0.05, 0, 0.16]}>
            <cylinderGeometry args={[0.095, 0.1, 0.06, 16]} />
          </mesh>

          {/* Right Shoulder & Tailored Sleeve */}
          <mesh material={blazerMat} position={[0.48, 0.64, 0]} rotation={[0, 0, -0.12]}>
            <sphereGeometry args={[0.14, 16, 16]} />
          </mesh>
          <mesh material={blazerMat} position={[0.52, 0.34, 0.02]} rotation={[0.05, 0, -0.16]}>
            <capsuleGeometry args={[0.11, 0.56, 8, 16]} />
          </mesh>
          {/* White Shirt Cuff Peeking from Right Sleeve */}
          <mesh material={shirtMat} position={[0.59, 0.02, 0.03]} rotation={[0.05, 0, -0.16]}>
            <cylinderGeometry args={[0.095, 0.1, 0.06, 16]} />
          </mesh>

          {/* School Monogram Crest / Badge (Left Breast Pocket) */}
          <group position={[-0.2, 0.54, 0.24]}>
            {/* Outer Golden Shield */}
            <mesh material={goldMat}>
              <boxGeometry args={[0.11, 0.13, 0.018]} />
            </mesh>
            {/* Inner Accent Fabric Inset */}
            <mesh material={tieMat} position={[0, 0, 0.01]}>
              <boxGeometry args={[0.08, 0.1, 0.01]} />
            </mesh>
            {/* Embroidered Gold Emblem Star */}
            <mesh material={goldMat} position={[0, 0, 0.018]}>
              <sphereGeometry args={[0.02, 8, 8]} />
            </mesh>
          </group>

          {/* Waist Flap Pockets */}
          <mesh material={blazerMat} position={[-0.23, 0.12, 0.22]} rotation={[0, 0.08, 0]}>
            <boxGeometry args={[0.15, 0.05, 0.025]} />
          </mesh>
          <mesh material={blazerMat} position={[0.23, 0.12, 0.22]} rotation={[0, -0.08, 0]}>
            <boxGeometry args={[0.15, 0.05, 0.025]} />
          </mesh>

          {/* Golden Embossed Center Buttons */}
          <mesh material={goldMat} position={[0, 0.32, 0.24]}>
            <sphereGeometry args={[0.032, 16, 16]} />
          </mesh>
          <mesh material={goldMat} position={[0, 0.16, 0.25]}>
            <sphereGeometry args={[0.032, 16, 16]} />
          </mesh>

          {/* Sleeve Buttons */}
          <mesh material={goldMat} position={[-0.6, 0.07, 0.08]}>
            <sphereGeometry args={[0.014, 8, 8]} />
          </mesh>
          <mesh material={goldMat} position={[0.6, 0.07, 0.08]}>
            <sphereGeometry args={[0.014, 8, 8]} />
          </mesh>
        </group>
      )}

      {/* ========================================================
          5. POLISHED CHROME SARTORIAL STAND & WEIGHTED BASE
         ======================================================== */}
      {/* Central Brushed Chrome Pole */}
      <mesh material={chromeMat} position={[0, -0.65, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.4, 24]} />
      </mesh>
      {/* Chrome Height Adjustment Collar */}
      <mesh material={chromeMat} position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.08, 24]} />
      </mesh>

      {/* Weighted Studio Pedestal Base */}
      <group position={[0, -1.35, 0]}>
        {/* Circular Weighted Studio Base */}
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.65, 0.72, 0.05, 36]} />
          <meshStandardMaterial color="#0B132B" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Glowing Brand Accent Ring */}
        <mesh position={[0, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.58, 0.64, 36]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.85} />
        </mesh>
        {/* Chrome Flange Connecting Pole to Base */}
        <mesh material={chromeMat} position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.1, 0.14, 0.04, 24]} />
        </mesh>
      </group>
    </group>
  );
}

/* -------------------------------------------------------------
 * Main Exported Component: Uniform3DScene
 * ------------------------------------------------------------- */
export function Uniform3DScene({
  color = "#0B192C",
  accentColor = "#FF6500",
  activeItem = "full",
  className = "w-full h-full",
}: {
  color?: string;
  accentColor?: string;
  activeItem?: "blazer" | "shirt" | "full" | "sports";
  className?: string;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0.25, 3.4]} fov={40} />

        {/* 360° Orbit Controls with Smooth Damping */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={1.8}
          maxDistance={5.0}
          minPolarAngle={Math.PI / 4.5}
          maxPolarAngle={Math.PI / 1.85}
          dampingFactor={0.06}
          enableDamping={true}
          autoRotate={false}
        />

        {/* Studio Lighting */}
        <ambientLight intensity={1.0} />
        {/* Main Key Light */}
        <directionalLight position={[4, 5, 4]} intensity={1.8} color="#FFFFFF" />
        {/* Cool Fill Light */}
        <directionalLight position={[-4, 3, 2]} intensity={0.7} color="#BAE6FD" />
        {/* Warm Golden Rim Light */}
        <directionalLight position={[0, 4, -4]} intensity={1.2} color="#FED7AA" />
        {/* Focused Lapel Spotlight */}
        <spotLight
          position={[0, 3.5, 3.0]}
          angle={0.5}
          penumbra={0.9}
          intensity={1.5}
          color="#FFF7ED"
        />

        {/* Floating Studio Dust Particles */}
        <FloatingParticles count={35} />

        {/* Floating Uniform Mannequin on Tailor Stand */}
        <Float speed={2.0} rotationIntensity={0.2} floatIntensity={0.35}>
          <SartorialUniformMannequin
            color={color}
            accentColor={accentColor}
            activeItem={activeItem}
            mousePosition={mousePos}
          />
        </Float>

        {/* Soft Contact Floor Shadow */}
        <ContactShadows
          position={[0, -1.45, 0]}
          opacity={0.5}
          scale={4.5}
          blur={2.4}
          far={3}
          color="#0B132B"
        />
      </Canvas>
    </div>
  );
}

export default Uniform3DScene;
