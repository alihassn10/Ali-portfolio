import React, { Suspense, useCallback, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { AdditiveBlending, CanvasTexture, MathUtils, SRGBColorSpace } from "three";
import Avatar, { MODEL_HEIGHT } from "./Avatar";

const CAMERA_Z = 10;
const FOV = 30;
const TURN = Math.PI * 2;

// One pose per page section, in screen space so it holds on any aspect ratio.
//   x       : character centre line, NDC (-1..1)
//   feet    : where the feet / platform sit, NDC (-1..1)
//   size    : character height as a fraction of the viewport height
//   rotY    : turn (radians). Hero → about adds a full spin, so the
//             character twirls once as you scroll into the résumé.
//   opacity : how strongly the whole stage shows
const DESKTOP_POSES = {
  intro: { x: 0.57, feet: -0.47, size: 0.5, rotY: -0.28, opacity: 1 },
  about: { x: -0.5, feet: -0.82, size: 0.78, rotY: TURN + 0.38, opacity: 1 },
  work: { x: -0.5, feet: -0.82, size: 0.78, rotY: TURN + 0.38, opacity: 0 },
  contact: { x: -0.45, feet: -0.6, size: 0.62, rotY: TURN + 0.45, opacity: 1 },
};
const MOBILE_POSES = {
  intro: { x: 0, feet: -0.14, size: 0.4, rotY: -0.15, opacity: 1 },
  about: { x: 0.1, feet: -0.95, size: 0.72, rotY: TURN - 0.2, opacity: 0.2 },
  work: { x: 0.1, feet: -0.95, size: 0.72, rotY: TURN - 0.2, opacity: 0 },
  contact: { x: 0, feet: 0.32, size: 0.25, rotY: TURN, opacity: 1 },
};
const SECTION_IDS = ["intro", "about", "work", "contact"];

const pointer = { x: 0, y: 0 };

function lerpPose(a, b, t) {
  const o = {};
  for (const k in a) o[k] = MathUtils.lerp(a[k], b[k], t);
  return o;
}

// Pose for the current scroll position: hold a section's pose, and blend into
// the next one while that next section's top travels from 85% to 30% of the
// viewport height.
function currentPose() {
  const h = window.innerHeight;
  const poses = window.innerWidth <= 800 ? MOBILE_POSES : DESKTOP_POSES;
  const start = h * 0.85;
  const end = h * 0.3;
  const tops = SECTION_IDS.map((id) => {
    const el = document.getElementById(id);
    return el ? el.getBoundingClientRect().top : Infinity;
  });
  const poseOf = (i) => poses[SECTION_IDS[i]];

  let i = 0;
  for (let k = 0; k < tops.length; k++) if (tops[k] <= end) i = k;
  const next = i + 1;
  if (next >= tops.length || !isFinite(tops[next])) return poseOf(i);

  const t = MathUtils.clamp((start - tops[next]) / (start - end), 0, 1);
  return t === 0 ? poseOf(i) : lerpPose(poseOf(i), poseOf(next), MathUtils.smoothstep(t, 0, 1));
}

function radialTexture(stops, size = 256) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([at, color]) => grad.addColorStop(at, color));
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

// Teal backlight + glowing platform ring + soft contact shadow, built to sit
// under a MODEL_HEIGHT-tall character with its feet at y = 0.
function Stage() {
  const glow = useMemo(
    () =>
      radialTexture([
        [0, "rgba(100,255,218,0.7)"],
        [0.4, "rgba(70,200,180,0.3)"],
        [1, "rgba(40,120,140,0)"],
      ]),
    []
  );
  const shadow = useMemo(
    () =>
      radialTexture([
        [0, "rgba(0,0,0,0.6)"],
        [0.55, "rgba(0,0,0,0.25)"],
        [1, "rgba(0,0,0,0)"],
      ]),
    []
  );
  const floorGlow = useMemo(
    () =>
      radialTexture([
        [0, "rgba(100,255,218,0.28)"],
        [0.7, "rgba(100,255,218,0.08)"],
        [1, "rgba(100,255,218,0)"],
      ]),
    []
  );
  const r = MODEL_HEIGHT * 0.44;
  const tilt = -Math.PI / 2 + 0.2; // seen from just above, like the reference

  return (
    <group>
      {/* backlight behind the character */}
      <mesh position={[0, MODEL_HEIGHT * 0.4, -1.2]} scale={[1, 1.15, 1]} renderOrder={-2}>
        <planeGeometry args={[MODEL_HEIGHT * 2.1, MODEL_HEIGHT * 2.1]} />
        <meshBasicMaterial map={glow} transparent depthWrite={false} blending={AdditiveBlending} />
      </mesh>
      <group rotation={[tilt, 0, 0]} position={[0, 0.005, 0]}>
        {/* floor glow inside the ring */}
        <mesh renderOrder={-1}>
          <circleGeometry args={[r * 1.05, 64]} />
          <meshBasicMaterial map={floorGlow} transparent depthWrite={false} blending={AdditiveBlending} />
        </mesh>
        {/* contact shadow */}
        <mesh position={[0, 0, 0.002]} scale={[0.55, 0.55, 1]} renderOrder={-1}>
          <circleGeometry args={[r, 48]} />
          <meshBasicMaterial map={shadow} transparent depthWrite={false} />
        </mesh>
        {/* the ring */}
        <mesh position={[0, 0, 0.004]}>
          <ringGeometry args={[r * 0.985, r, 128]} />
          <meshBasicMaterial color="#64ffda" transparent opacity={0.55} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

function Rig({ onOpacity }) {
  const stage = useRef();
  const character = useRef();
  const opacity = useRef(0);
  const ready = useRef(false);
  const { viewport, camera } = useThree();

  useFrame((state, dt) => {
    const s = stage.current;
    const c = character.current;
    if (!s || !c) return;
    const { width: visW, height: visH } = viewport.getCurrentViewport(camera, [0, 0, 0]);
    const p = currentPose();
    const t = state.clock.elapsedTime;
    const d = Math.min(dt, 0.05);
    const tx = (p.x * visW) / 2;
    const ty = (p.feet * visH) / 2;
    const ts = (p.size * visH) / MODEL_HEIGHT;

    if (!ready.current) {
      // first frame: drop into place, then fade/grow in
      ready.current = true;
      s.position.set(tx, ty, 0);
      s.scale.setScalar(ts * 0.9);
      c.rotation.y = p.rotY;
      document.documentElement.classList.add("scene-ready");
    }

    s.position.x = MathUtils.damp(s.position.x, tx, 5, d);
    s.position.y = MathUtils.damp(s.position.y, ty, 5, d);
    s.scale.setScalar(MathUtils.damp(s.scale.x, ts, 5, d));

    // the character idles on the platform: a small bob and sway, and looks
    // toward the cursor on top of the section pose
    c.position.y = Math.abs(Math.sin(t * 1.6)) * 0.035;
    c.rotation.y = MathUtils.damp(c.rotation.y, p.rotY + pointer.x * 0.4, 4, d);
    c.rotation.x = MathUtils.damp(c.rotation.x, -pointer.y * 0.06, 4, d);
    c.rotation.z = Math.sin(t * 0.8) * 0.02;

    opacity.current = MathUtils.damp(opacity.current, p.opacity, 4, d);
    onOpacity(opacity.current);
  });

  return (
    <group ref={stage}>
      <Stage />
      <group ref={character}>
        <Avatar />
      </group>
    </group>
  );
}

// Soft front key, teal rims from behind (the reference's edge glow) and a
// teal bounce from the platform.
function Lights() {
  return (
    <>
      <hemisphereLight args={["#cfe6ff", "#0a1729", 0.55]} />
      <directionalLight position={[2, 3, 6]} intensity={1.7} color="#fff4e6" />
      <directionalLight position={[-3, 1.5, 4]} intensity={0.45} color="#d6e6ff" />
      <directionalLight position={[4, 3, -4]} intensity={2.6} color="#64ffda" />
      <directionalLight position={[-4, 2.5, -3]} intensity={1.6} color="#5fd6ff" />
      <pointLight position={[0, -1.2, 1.5]} intensity={6} distance={6} color="#64ffda" />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={1} position={[0, 3, 5]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={0.8} color="#64ffda" position={[5, 1, -3]} scale={[2, 6, 1]} />
        <Lightformer form="rect" intensity={0.4} color="#ffe2c0" position={[-6, 0, 2]} scale={[2, 6, 1]} />
      </Environment>
    </>
  );
}

export default function Scene() {
  const wrapper = useRef();
  const setOpacity = useCallback((v) => {
    if (wrapper.current) wrapper.current.style.opacity = v.toFixed(3);
  }, []);

  useEffect(() => {
    const move = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("scene-ready");
    };
  }, []);

  return (
    <div className="scene-canvas" aria-hidden="true" ref={wrapper} style={{ opacity: 0 }}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, CAMERA_Z], fov: FOV }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Lights />
        <Suspense fallback={null}>
          <Rig onOpacity={setOpacity} />
        </Suspense>
      </Canvas>
    </div>
  );
}
