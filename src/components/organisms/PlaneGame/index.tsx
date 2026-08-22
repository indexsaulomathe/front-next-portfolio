"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Trail } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const LEGO_COLORS = ["#e3000b", "#ffcf00", "#006db7", "#00a850", "#f57c00", "#9c27b0", "#e91e63"];
const BOUNDS_X = 5;
const BOUNDS_Y = 3;
const PLANE_Z = 3;
const SPAWN_Z = -110;
const KILL_Z = 9;
const BULLET_SPEED = 2.2;

type Phase = "playing" | "gameover";

interface ObsEntry { mesh: THREE.Group; x: number; y: number; w: number; h: number; d: number; }
interface FragEntry { mesh: THREE.Mesh; vel: THREE.Vector3; life: number; }
interface BulletEntry { mesh: THREE.Mesh; x: number; y: number; }

function disposeMesh(obj: THREE.Object3D) {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((m) => m.dispose());
    }
  });
}

function spawnBrick(x: number, y: number): { group: THREE.Group; entry: Omit<ObsEntry, "mesh"> } {
  const h = 1.0 + Math.random() * 2.2;
  const w = 1.1 + Math.floor(Math.random() * 4) * 0.75;
  const d = 0.7 + Math.random() * 0.8;
  const color = LEGO_COLORS[Math.floor(Math.random() * LEGO_COLORS.length)];
  const studs = Math.max(1, Math.round(w / 0.5));

  const mat = new THREE.MeshStandardMaterial({
    color, roughness: 0.6, metalness: 0.05,
    emissive: new THREE.Color(color).multiplyScalar(0.22),
  });

  const group = new THREE.Group();
  group.position.set(x, y, SPAWN_Z);
  group.add(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat));

  const studMat = mat.clone();
  const studGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.12, 10);
  for (let i = 0; i < studs; i++) {
    const stud = new THREE.Mesh(studGeo, studMat);
    stud.position.set(-w / 2 + (w / studs) * (i + 0.5), h / 2 + 0.06, 0);
    group.add(stud);
  }

  return { group, entry: { x, y, w, h, d } };
}

function spawnPipe(x: number, y: number): { group: THREE.Group; entry: Omit<ObsEntry, "mesh"> } {
  const radius = 0.55 + Math.random() * 0.6;
  const len = 1.4 + Math.random() * 1.6;
  const color = LEGO_COLORS[Math.floor(Math.random() * LEGO_COLORS.length)];

  const mat = new THREE.MeshStandardMaterial({
    color, roughness: 0.35, metalness: 0.4,
    emissive: new THREE.Color(color).multiplyScalar(0.22),
  });

  const group = new THREE.Group();
  group.position.set(x, y, SPAWN_Z);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, len, 16), mat);
  mesh.rotation.x = Math.PI / 2;
  group.add(mesh);

  const ringMat = mat.clone();
  ringMat.emissiveIntensity = 1.4;
  for (const side of [-1, 1]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.95, 0.05, 8, 20), ringMat);
    ring.position.z = (len / 2) * side;
    group.add(ring);
  }

  return { group, entry: { x, y, w: radius * 2, h: radius * 2, d: len } };
}

function spawnObstacle(x: number, y: number) {
  return Math.random() < 0.35 ? spawnPipe(x, y) : spawnBrick(x, y);
}

function spawnFrags(
  fragGroup: THREE.Group,
  x: number, y: number, z: number,
  color: string,
  count: number,
): FragEntry[] {
  const frags: FragEntry[] = [];
  for (let i = 0; i < count; i++) {
    const s = 0.06 + Math.random() * 0.2;
    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.5,
      transparent: true,
      emissive: new THREE.Color(color).multiplyScalar(0.4),
    });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(s, s * 0.7, s * 0.5), mat);
    mesh.position.set(x, y, z);
    const ang = Math.random() * Math.PI * 2;
    const elev = (Math.random() - 0.5) * Math.PI;
    const spd = 0.03 + Math.random() * 0.14;
    fragGroup.add(mesh);
    frags.push({
      mesh,
      vel: new THREE.Vector3(
        Math.cos(ang) * Math.cos(elev) * spd,
        Math.sin(elev) * spd + 0.02,
        (Math.random() - 0.5) * spd * 0.5,
      ),
      life: 1,
    });
  }
  return frags;
}

function GameScene({ onUpdate }: { onUpdate: (phase: Phase, score: number) => void }) {
  const planeRef = useRef<THREE.Group>(null!);
  const obsRef = useRef<THREE.Group>(null!);
  const fragRef = useRef<THREE.Group>(null!);
  const bulletRef = useRef<THREE.Group>(null!);
  const gridRef = useRef<THREE.GridHelper>(null!);
  const { gl, camera } = useThree();

  // inputRef and shootRequestRef are separate from gs so react-hooks/immutability
  // doesn't flag gs mutations in useFrame. The rule fires when a ref accessed in
  // a useEffect callback is also mutated elsewhere.
  const inputRef = useRef({ tx: 0, ty: 0 });
  const shootRequestRef = useRef(false);

  const gs = useRef({
    phase: "playing" as Phase,
    frame: 0, score: 0,
    px: 0, py: 0,
    obstacles: [] as ObsEntry[],
    fragments: [] as FragEntry[],
    bullets: [] as BulletEntry[],
    restartTimer: 0, shake: 0, speed: 0.32,
  });

  // Input — pointer events unify mouse/touch/pen: move aims, pointerdown shoots.
  // (Old click-to-shoot missed most mobile taps because the drag already in
  // progress suppresses the synthetic click; pointerdown always fires.)
  useEffect(() => {
    const el = gl.domElement;
    const inp = inputRef.current;

    const updateAim = (clientX: number, clientY: number) => {
      const r = el.getBoundingClientRect();
      inp.tx = ((clientX - r.left) / r.width * 2 - 1) * BOUNDS_X;
      inp.ty = (1 - (clientY - r.top) / r.height * 2) * BOUNDS_Y;
    };

    const onPointerMove = (e: PointerEvent) => updateAim(e.clientX, e.clientY);
    const onPointerDown = (e: PointerEvent) => {
      updateAim(e.clientX, e.clientY);
      shootRequestRef.current = true;
    };

    const prevTouchAction = el.style.getPropertyValue("touch-action");
    el.style.setProperty("touch-action", "none");

    window.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerdown", onPointerDown);
      el.style.setProperty("touch-action", prevTouchAction);
    };
  }, [gl]);

  useFrame(() => {
    const g = gs.current;
    const inp = inputRef.current;
    if (!planeRef.current || !obsRef.current || !fragRef.current || !bulletRef.current) return;

    // Always update fragments (hit sparks during play + death cloud during gameover)
    const doneFrag: FragEntry[] = [];
    for (const f of g.fragments) {
      f.mesh.position.add(f.vel);
      f.vel.y -= 0.003;
      f.vel.multiplyScalar(0.97);
      f.life -= 0.005;
      f.mesh.rotation.x += 0.05;
      f.mesh.rotation.y += 0.03;
      (f.mesh.material as THREE.MeshStandardMaterial).opacity = Math.max(0, f.life);
      if (f.life <= 0) doneFrag.push(f);
    }
    for (const f of doneFrag) {
      fragRef.current.remove(f.mesh);
      disposeMesh(f.mesh);
      g.fragments.splice(g.fragments.indexOf(f), 1);
    }

    if (g.phase === "playing") {
      g.frame++;
      const newScore = Math.floor(g.frame / 60);
      if (newScore !== g.score) { g.score = newScore; onUpdate("playing", g.score); }

      g.speed = 0.32 + g.score * 0.016;
      const every = Math.max(30, 82 - g.score * 3);

      if (gridRef.current) {
        gridRef.current.position.z = (gridRef.current.position.z + g.speed) % 5;
      }

      // Plane movement + bank
      g.px += (inp.tx - g.px) * 0.22;
      g.py += (inp.ty - g.py) * 0.22;
      const bank = -(inp.tx - g.px) * 0.14;
      planeRef.current.position.set(g.px, g.py, PLANE_Z);
      planeRef.current.rotation.set(0, Math.PI / 2, bank);

      // Camera parallax — follows the plane a little for a stronger sense of depth
      const camX = camera.position.x + (g.px * 0.12 - camera.position.x) * 0.06;
      const camY = camera.position.y + (1.5 + g.py * 0.08 - camera.position.y) * 0.06;
      camera.position.set(camX, camY, camera.position.z);
      camera.lookAt(g.px * 0.3, g.py * 0.3, PLANE_Z - 6);

      // Process shoot request
      if (shootRequestRef.current && bulletRef.current) {
        shootRequestRef.current = false;
        const mat = new THREE.MeshStandardMaterial({
          color: "#00ff88", emissive: "#00ff88", emissiveIntensity: 4,
        });
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), mat);
        mesh.position.set(g.px, g.py, PLANE_Z - 1.2);
        bulletRef.current.add(mesh);
        g.bullets.push({ mesh, x: g.px, y: g.py });
      }

      // Spawn brick
      if (g.frame % every === 0) {
        const x = (Math.random() - 0.5) * BOUNDS_X * 2;
        const y = (Math.random() - 0.5) * BOUNDS_Y * 2;
        const { group, entry } = spawnObstacle(x, y);
        obsRef.current.add(group);
        g.obstacles.push({ mesh: group, ...entry });
      }

      // Move bullets + bullet-obstacle collision
      const doneBullets: BulletEntry[] = [];
      for (const b of g.bullets) {
        b.mesh.position.z -= BULLET_SPEED;
        if (b.mesh.position.z < SPAWN_Z) { doneBullets.push(b); continue; }

        let hit = false;
        for (let i = g.obstacles.length - 1; i >= 0; i--) {
          const obs = g.obstacles[i];
          const dz = Math.abs(b.mesh.position.z - obs.mesh.position.z);
          if (
            dz < obs.d / 2 + 0.12 &&
            Math.abs(b.x - obs.x) < obs.w / 2 + 0.15 &&
            Math.abs(b.y - obs.y) < obs.h / 2 + 0.15
          ) {
            const boxMesh = obs.mesh.children[0] as THREE.Mesh;
            const hexColor = "#" + (boxMesh.material as THREE.MeshStandardMaterial).color.getHexString();
            g.fragments.push(...spawnFrags(fragRef.current, obs.x, obs.y, obs.mesh.position.z, hexColor, 14));
            obsRef.current.remove(obs.mesh);
            disposeMesh(obs.mesh);
            g.obstacles.splice(i, 1);
            g.score += 1;
            onUpdate("playing", g.score);
            hit = true;
            break;
          }
        }
        if (hit) doneBullets.push(b);
      }
      for (const b of doneBullets) {
        bulletRef.current.remove(b.mesh);
        disposeMesh(b.mesh);
        g.bullets.splice(g.bullets.indexOf(b), 1);
      }

      // Move obstacles + plane collision
      let planeHit = false;
      const doneObs: ObsEntry[] = [];
      for (const obs of g.obstacles) {
        obs.mesh.position.z += g.speed;
        if (obs.mesh.position.z > KILL_Z) { doneObs.push(obs); continue; }

        const dz = Math.abs(obs.mesh.position.z - PLANE_Z);
        if (
          dz < obs.d / 2 + 0.3 &&
          Math.abs(g.px - obs.x) < obs.w / 2 + 0.28 &&
          Math.abs(g.py - obs.y) < obs.h / 2 + 0.22
        ) planeHit = true;
      }
      for (const obs of doneObs) {
        obsRef.current.remove(obs.mesh);
        disposeMesh(obs.mesh);
        g.obstacles.splice(g.obstacles.indexOf(obs), 1);
      }

      if (planeHit) {
        const cols = ["#dde1e7", "#a8b2c1", "#b3e5fc", "#e53935", ...LEGO_COLORS];
        for (let i = 0; i < 50; i++) {
          const s = 0.07 + Math.random() * 0.22;
          const mat = new THREE.MeshStandardMaterial({
            color: cols[Math.floor(Math.random() * cols.length)],
            roughness: 0.5, transparent: true,
            emissive: new THREE.Color(cols[Math.floor(Math.random() * cols.length)]).multiplyScalar(0.3),
          });
          const mesh = new THREE.Mesh(new THREE.BoxGeometry(s, s * 0.7, s * 0.5), mat);
          mesh.position.set(g.px, g.py, PLANE_Z);
          const ang = Math.random() * Math.PI * 2;
          const elev = (Math.random() - 0.5) * Math.PI;
          const spd = 0.04 + Math.random() * 0.18;
          fragRef.current.add(mesh);
          g.fragments.push({
            mesh,
            vel: new THREE.Vector3(
              Math.cos(ang) * Math.cos(elev) * spd,
              Math.sin(elev) * spd + 0.05,
              (Math.random() - 0.5) * spd * 0.4,
            ),
            life: 1,
          });
        }
        planeRef.current.visible = false;
        g.phase = "gameover"; g.restartTimer = 210; g.shake = 30;
        onUpdate("gameover", g.score);
      }

    } else {
      // Gameover — camera shake + restart countdown
      g.restartTimer--;
      g.shake = Math.max(0, g.shake - 1);
      if (g.shake > 0) {
        const s = g.shake * 0.004;
        camera.position.set((Math.random() - 0.5) * s, 1.5 + (Math.random() - 0.5) * s, 14);
      } else {
        camera.position.set(0, 1.5, 14);
      }

      if (g.restartTimer <= 0) {
        for (const obs of g.obstacles) { obsRef.current.remove(obs.mesh); disposeMesh(obs.mesh); }
        for (const b of g.bullets) { bulletRef.current.remove(b.mesh); disposeMesh(b.mesh); }
        g.obstacles = []; g.fragments = []; g.bullets = [];
        g.frame = 0; g.score = 0; g.px = 0; g.py = 0;
        inputRef.current.tx = 0; inputRef.current.ty = 0;
        g.phase = "playing";
        planeRef.current.visible = true;
        planeRef.current.position.set(0, 0, PLANE_Z);
        planeRef.current.rotation.set(0, Math.PI / 2, 0);
        camera.position.set(0, 1.5, 14);
        if (gridRef.current) gridRef.current.position.z = 0;
        onUpdate("playing", 0);
      }
    }
  });

  return (
    <>
      <fog attach="fog" args={["#030a05", 18, 128]} />
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={2} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 3]} intensity={1.4} />
      <pointLight position={[0, 3, 0]} color="#00ff88" intensity={2.5} distance={25} />

      {/* Animated grid floor */}
      <primitive
        ref={gridRef}
        object={new THREE.GridHelper(200, 60, "#00ff44", "#001a0d")}
        position={[0, -4, 0]}
      />

      {/* Plane — rotation.y = -PI/2 makes local +X align with world -Z (nose faces obstacles) */}
      <group ref={planeRef} position={[0, 0, PLANE_Z]} rotation={[0, Math.PI / 2, 0]}>
        {/* Engine flame trail — at local -X = world +Z toward camera */}
        <Trail width={1.1} color="#ff6600" length={9} decay={1.4} attenuation={(w) => w * w}>
          <mesh position={[-1.15, 0, 0]}>
            <sphereGeometry args={[0.01]} />
            <meshBasicMaterial color="#ff6600" />
          </mesh>
        </Trail>

        {/* Fuselage */}
        <mesh>
          <boxGeometry args={[2.2, 0.42, 0.52]} />
          <meshStandardMaterial color="#dde1e7" roughness={0.25} metalness={0.75} />
        </mesh>

        {/* Nose cone — at local +X = world -Z */}
        <mesh position={[1.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.21, 0.65, 14]} />
          <meshStandardMaterial color="#a8b2c1" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Cockpit glass */}
        <mesh position={[0.28, 0.26, 0]}>
          <sphereGeometry args={[0.2, 16, 10]} />
          <meshStandardMaterial
            color="#b3e5fc"
            emissive="#0288d1"
            emissiveIntensity={2}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Main wing — local Z = world X (left-right) */}
        <mesh position={[-0.25, 0, 0]}>
          <boxGeometry args={[0.85, 0.06, 3.2]} />
          <meshStandardMaterial color="#a8b2c1" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Tail fin vertical */}
        <mesh position={[-0.9, 0.32, 0]} rotation={[0, 0, 0.18]}>
          <boxGeometry args={[0.48, 0.58, 0.06]} />
          <meshStandardMaterial color="#a8b2c1" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Tail horizontal stabilizer */}
        <mesh position={[-0.92, 0.04, 0]}>
          <boxGeometry args={[0.38, 0.05, 1.15]} />
          <meshStandardMaterial color="#bac2cc" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Red stripe */}
        <mesh position={[0.1, 0, 0]}>
          <boxGeometry args={[1.6, 0.09, 0.53]} />
          <meshStandardMaterial color="#e53935" emissive="#e53935" emissiveIntensity={1.2} />
        </mesh>

        {/* Engine glow */}
        <mesh position={[-1.15, 0, 0]}>
          <sphereGeometry args={[0.11, 10, 10]} />
          <meshStandardMaterial color="#ff7700" emissive="#ff5500" emissiveIntensity={5} />
        </mesh>
        <pointLight position={[-1.15, 0, 0]} color="#ff6600" intensity={14} distance={5} />
      </group>

      <group ref={obsRef} />
      <group ref={fragRef} />
      <group ref={bulletRef} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.22} luminanceSmoothing={0.85} intensity={2} />
      </EffectComposer>
    </>
  );
}

const HIGH_SCORE_KEY = "plane-game-high-score";

function readStoredHighScore(): number {
  try {
    return Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
  } catch {
    return 0; // localStorage unavailable (private mode, blocked) — high score just won't persist
  }
}

export default function PlaneGame() {
  const [state, setState] = useState<{ phase: Phase; score: number }>({ phase: "playing", score: 0 });
  const [highScore, setHighScore] = useState(readStoredHighScore);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const highScoreRef = useRef(highScore);

  const handle = useCallback((phase: Phase, score: number) => {
    setState({ phase, score });

    if (phase === "gameover") {
      const isNew = score > highScoreRef.current;
      if (isNew) {
        highScoreRef.current = score;
        setHighScore(score);
        try {
          localStorage.setItem(HIGH_SCORE_KEY, String(score));
        } catch {
          // ignore — best effort persistence
        }
      }
      setIsNewRecord(isNew && score > 0);
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 1.5, 14], fov: 60 }}
        gl={{ antialias: true }}
        style={{ background: "#030a05" }}
      >
        <GameScene onUpdate={handle} />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none select-none font-mono">
        <div className="absolute top-3 left-4 text-sm text-green-400 drop-shadow-[0_0_6px_rgba(74,222,128,0.7)]">
          score: {state.score}
        </div>
        <div className="absolute top-3 right-4 text-sm text-white/40">
          recorde: {highScore}
        </div>
        <div className="absolute bottom-3 left-0 right-0 text-center text-[11px] text-white/30">
          mova o mouse ou toque para desviar · clique/toque para atirar
        </div>

        {state.phase === "gameover" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="text-4xl font-bold text-red-400 animate-pulse drop-shadow-[0_0_20px_rgba(239,68,68,0.9)]">
              BOOM!
            </div>
            <div className="text-sm text-white/70">score: {state.score}</div>
            {isNewRecord && (
              <div className="text-xs font-bold text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]">
                novo recorde!
              </div>
            )}
            <div className="text-xs text-white/40 mt-1">reiniciando…</div>
          </div>
        )}
      </div>
    </div>
  );
}
