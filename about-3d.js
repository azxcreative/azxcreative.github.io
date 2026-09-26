/* ============================================================
   WORTEX — About section 3D object
   ============================================================ */

import * as THREE from "https://esm.sh/three@0.170.0";
import { GLTFLoader } from "https://esm.sh/three@0.170.0/examples/jsm/loaders/GLTFLoader.js";

const ABOUT_MODEL_URL = "assets/img/wortex-3d.glb";
const ABOUT_MODEL_SCALE_DESKTOP = 1.06;
const ABOUT_MODEL_SCALE_TABLET = 0.96;
const ABOUT_MODEL_SCALE_MOBILE = 0.94;
const ABOUT_AUTO_ROTATE_SPEED = 0.0016;
const ABOUT_DRAG_SENSITIVITY = 0.0054;
const ABOUT_RESUME_DELAY = 2800;
const ABOUT_PITCH_LIMIT = 1.05;
const ABOUT_DISPLAY_TILT_X = -0.86;
const ABOUT_DISPLAY_TILT_Y = 1.57;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function viewportScale() {
  const width = window.innerWidth;
  if (width <= 430) return ABOUT_MODEL_SCALE_MOBILE;
  if (width <= 768) return ABOUT_MODEL_SCALE_MOBILE + 0.04;
  if (width <= 1024) return ABOUT_MODEL_SCALE_TABLET;
  if (width <= 1366) return ABOUT_MODEL_SCALE_DESKTOP * 0.94;
  return ABOUT_MODEL_SCALE_DESKTOP;
}

function cameraFrame() {
  const width = window.innerWidth;
  if (width <= 860) return { x: 0.05, y: 0.03, z: 2.72 };
  if (width <= 1024) return { x: 0.2, y: 0.04, z: 2.7 };
  if (width <= 1366) return { x: 0.3, y: 0.04, z: 2.68 };
  return { x: 0.4, y: 0.04, z: 2.66 };
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch (error) {
    return false;
  }
}

function dragSensitivity() {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  return ABOUT_DRAG_SENSITIVITY * (coarse ? 0.68 : 1);
}

function setCursorLabel(text) {
  const cursor = document.querySelector(".cursor");
  const label = document.querySelector(".cursor-label");
  if (!cursor || !label) return;
  if (text) {
    cursor.classList.add("is-hover", "is-label");
    label.textContent = text;
    return;
  }
  cursor.classList.remove("is-label");
  label.textContent = "";
}

function sculptureMaterial() {
  const options = {
    color: new THREE.Color("#0d3a82"),
    metalness: 0.74,
    roughness: 0.36,
      envMapIntensity: 1.55,
      emissive: new THREE.Color("#082044"),
      emissiveIntensity: 0.3,
    side: THREE.DoubleSide,
  };

  try {
    return new THREE.MeshPhysicalMaterial({
      ...options,
      clearcoat: 0.34,
      clearcoatRoughness: 0.36,
      sheen: 0.26,
      sheenColor: new THREE.Color("#29c8ff"),
      sheenRoughness: 0.55,
      reflectivity: 0.62,
      specularIntensity: 0.55,
      specularColor: new THREE.Color("#29c8ff"),
    });
  } catch (error) {
    return new THREE.MeshStandardMaterial(options);
  }
}

function createBlueEnvironment(renderer) {
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color("#030814");

  const hemi = new THREE.HemisphereLight("#1367ff", "#030814", 1.1);
  envScene.add(hemi);

  const key = new THREE.DirectionalLight("#1367ff", 3.4);
  key.position.set(2.4, 3.2, 3.6);
  envScene.add(key);

  const face = new THREE.DirectionalLight("#b9e9ff", 4.6);
  face.position.set(0.35, 1.15, 5.2);
  envScene.add(face);

  const rim = new THREE.DirectionalLight("#29c8ff", 2.2);
  rim.position.set(-3.2, 1.4, -2.8);
  envScene.add(rim);

  const fill = new THREE.DirectionalLight("#0a2d6f", 1.5);
  fill.position.set(-1.2, -2.4, 2.2);
  envScene.add(fill);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envMap = pmrem.fromScene(envScene, 0.06).texture;
  pmrem.dispose();
  return envMap;
}

function addLights(scene) {
  scene.add(new THREE.AmbientLight("#0a1c3f", 0.58));
  scene.add(new THREE.HemisphereLight("#7ad4ff", "#030814", 0.42));

  const key = new THREE.DirectionalLight("#3d8cff", 2.35);
  key.position.set(2.2, 2.4, 3.2);
  scene.add(key);

  const face = new THREE.DirectionalLight("#d4f4ff", 2.7);
  face.name = "aboutFaceKey";
  face.position.set(0.4, 0.85, 4.2);
  scene.add(face);
  scene.add(face.target);

  const faceFill = new THREE.PointLight("#5ecbff", 7, 11, 1.55);
  faceFill.name = "aboutFaceFill";
  faceFill.position.set(0.25, 0.4, 2.35);
  scene.add(faceFill);

  const rim = new THREE.DirectionalLight("#29c8ff", 1.25);
  rim.position.set(-2.8, 1.1, -2.4);
  scene.add(rim);

  const bounce = new THREE.DirectionalLight("#0a2d6f", 0.7);
  bounce.position.set(0.4, -2.6, 1.6);
  scene.add(bounce);

  const fill = new THREE.DirectionalLight("#9ec4e8", 0.42);
  fill.position.set(-1.2, 1.8, 2.6);
  scene.add(fill);

  return { face, faceFill };
}

function showFallback(root, status) {
  root.classList.add("is-fallback");
  root.classList.remove("is-ready");
  if (status) status.hidden = true;
}

function initAboutModel() {
  const root = document.getElementById("about-model");
  if (!root) return;

  const status = root.querySelector("[data-about-status]");
  const fallback = root.querySelector(".about-model-fallback");

  if (!hasWebGL()) {
    showFallback(root, status);
    return;
  }

  if (status) status.hidden = false;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch (error) {
    showFallback(root, status);
    return;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.24;
  renderer.domElement.className = "about-model-canvas";
  renderer.domElement.setAttribute("aria-hidden", "true");
  root.append(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 24);
  camera.position.set(0, 0.05, 2.85);
  camera.lookAt(0, 0, 0);

  const envMap = createBlueEnvironment(renderer);
  scene.environment = envMap;
  const { face: faceKey, faceFill } = addLights(scene);

  function aimFrontLights() {
    const origin = new THREE.Vector3(0, 0, 0);
    const toward = camera.position.clone().sub(origin).normalize();
    faceKey.position.copy(camera.position).add(new THREE.Vector3(-0.12, 0.72, 0.18));
    faceKey.target.position.copy(origin);
    faceKey.target.updateMatrixWorld();
    faceFill.position.copy(camera.position).add(toward.multiplyScalar(-0.22)).add(new THREE.Vector3(0.08, 0.22, 0));
  }

  const stage = new THREE.Group();
  const pivot = new THREE.Group();
  stage.add(pivot);
  scene.add(stage);

  const clock = new THREE.Clock();
  const pointer = { x: 0, y: 0, active: false, mode: null };
  let autoRotate = !reduceMotion;
  let resumeTimer = 0;
  let visible = true;
  let raf = 0;
  let maxDim = 1;
  const targetRot = { x: 0.04, y: 0.12 };

  function fitRenderer() {
    const width = Math.max(1, root.clientWidth);
    const height = Math.max(1, root.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    if (maxDim > 0 && pivot.children.length) {
      const fill = 1.48 * viewportScale();
      pivot.scale.setScalar(fill / maxDim);
    }

    const frame = cameraFrame();
    camera.position.set(frame.x, frame.y, frame.z);
    camera.lookAt(0, 0, 0);
    aimFrontLights();
  }

  function applyMaterial(rootObject) {
    const material = sculptureMaterial();
    material.envMap = envMap;
    rootObject.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = false;
      child.receiveShadow = false;
      child.material = material;
      if (child.geometry && !child.geometry.attributes.normal) {
        child.geometry.computeVertexNormals();
      }
    });
  }

  function worldBox(object) {
    object.updateMatrixWorld(true);
    const box = new THREE.Box3();
    object.traverse((child) => {
      if (!child.isMesh || !child.geometry) return;
      child.geometry.computeBoundingBox();
      if (!child.geometry.boundingBox) return;
      const meshBox = child.geometry.boundingBox.clone();
      meshBox.applyMatrix4(child.matrixWorld);
      box.union(meshBox);
    });
    if (box.isEmpty()) box.setFromObject(object);
    return box;
  }

  function frameModel(object) {
    const oriented = new THREE.Group();
    oriented.add(object);
    oriented.rotation.set(ABOUT_DISPLAY_TILT_X, ABOUT_DISPLAY_TILT_Y, 0);
    oriented.updateMatrixWorld(true);

    const box = worldBox(oriented);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    oriented.position.sub(center);
    maxDim = Math.max(size.x, size.y, size.z) || 1;
    pivot.add(oriented);
    pivot.rotation.set(targetRot.x, targetRot.y, 0);
    fitRenderer();
  }

  function stopAutoRotate() {
    autoRotate = false;
    window.clearTimeout(resumeTimer);
  }

  function scheduleAutoRotate() {
    window.clearTimeout(resumeTimer);
    if (reduceMotion) return;
    resumeTimer = window.setTimeout(() => {
      autoRotate = true;
    }, ABOUT_RESUME_DELAY);
  }

  function onPointerDown(event) {
    pointer.active = true;
    pointer.mode = event.pointerType === "touch" ? null : "rotate";
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    if (pointer.mode === "rotate") {
      stopAutoRotate();
      root.classList.add("is-dragging");
      root.setAttribute("data-cursor", "HOLD");
      setCursorLabel("HOLD");
      try {
        renderer.domElement.setPointerCapture(event.pointerId);
      } catch (error) {
        /* capture is optional */
      }
    }
  }

  function onPointerMove(event) {
    if (!pointer.active) return;

    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;

    if (!pointer.mode) {
      if (Math.abs(dx) + Math.abs(dy) < 8) return;
      if (Math.abs(dy) > Math.abs(dx) * 1.15) {
        pointer.mode = "scroll";
        pointer.active = false;
        return;
      }
      pointer.mode = "rotate";
      stopAutoRotate();
      root.classList.add("is-dragging");
      try {
        renderer.domElement.setPointerCapture(event.pointerId);
      } catch (error) {
        /* capture is optional */
      }
    }

    if (pointer.mode !== "rotate") return;

    event.preventDefault();
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    const sensitivity = dragSensitivity();
    targetRot.y += dx * sensitivity;
    targetRot.x = THREE.MathUtils.clamp(targetRot.x + dy * sensitivity, -ABOUT_PITCH_LIMIT, ABOUT_PITCH_LIMIT);
  }

  function onPointerUp(event) {
    if (pointer.mode === "rotate") {
      scheduleAutoRotate();
      try {
        renderer.domElement.releasePointerCapture(event.pointerId);
      } catch (error) {
        /* already released */
      }
    }
    pointer.active = false;
    pointer.mode = null;
    root.classList.remove("is-dragging");
    root.setAttribute("data-cursor", "DRAG");
    if (root.matches(":hover")) setCursorLabel("DRAG");
  }

  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  renderer.domElement.addEventListener("pointermove", onPointerMove, { passive: false });
  renderer.domElement.addEventListener("pointerup", onPointerUp);
  renderer.domElement.addEventListener("pointercancel", onPointerUp);
  renderer.domElement.addEventListener("pointerenter", () => setCursorLabel("DRAG"));
  renderer.domElement.addEventListener("pointerleave", () => {
    if (!pointer.active) setCursorLabel("");
  });
  renderer.domElement.addEventListener("contextmenu", (event) => event.preventDefault());

  const resizeObserver = new ResizeObserver(fitRenderer);
  resizeObserver.observe(root);
  window.addEventListener("resize", fitRenderer);

  function tick() {
    raf = requestAnimationFrame(tick);
    if (!visible) return;

    const delta = clock.getDelta();
    const frame = Math.min(delta * 60, 2.2);

    if (autoRotate && !pointer.active) {
      targetRot.y += ABOUT_AUTO_ROTATE_SPEED * frame;
    }

    pivot.rotation.y += (targetRot.y - pivot.rotation.y) * 0.14;
    pivot.rotation.x += (targetRot.x - pivot.rotation.x) * 0.14;

    if (!reduceMotion && !pointer.active) {
      stage.position.y = Math.sin(clock.elapsedTime * 0.62) * 0.028;
    } else {
      stage.position.y = 0;
    }

    renderer.render(scene, camera);
  }

  function startLoop() {
    if (raf) return;
    clock.getDelta();
    tick();
  }

  function stopLoop() {
    window.cancelAnimationFrame(raf);
    raf = 0;
  }

  const section = document.getElementById("about") || root;
  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) startLoop();
      else stopLoop();
    },
    { rootMargin: "18% 0px", threshold: 0.05 }
  );
  observer.observe(section);

  const loader = new GLTFLoader();
  loader.load(
    ABOUT_MODEL_URL,
    (gltf) => {
      applyMaterial(gltf.scene);
      frameModel(gltf.scene);
      root.classList.add("is-ready");
      if (status) status.hidden = true;
      if (fallback) fallback.setAttribute("aria-hidden", "true");
      visible = true;
      startLoop();
    },
    undefined,
    () => {
      showFallback(root, status);
      stopLoop();
    }
  );
}

try {
  initAboutModel();
} catch (error) {
  const root = document.getElementById("about-model");
  if (root) {
    root.classList.add("is-fallback");
    const status = root.querySelector("[data-about-status]");
    if (status) status.hidden = true;
  }
}
