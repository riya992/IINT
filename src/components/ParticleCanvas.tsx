import { useEffect, useRef, useState } from "react";

interface ParticleCanvasProps {
  scrollProgress: number;
}

export default function ParticleCanvas({ scrollProgress }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [glSupported, setGlSupported] = useState(true);

  // Mouse coordinate tracking (mapped to [-1, 1])
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  // Use refs to pass the scroll progress and target weights into the WebGL animation loop safely
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) {
      console.warn("WebGL not supported in this browser.");
      setGlSupported(false);
      return;
    }

    // --- MATH GENERATORS FOR SHAPES ---
    const N = 10000;

    // 1. SPHERE (Hero Stage)
    const spherePositions = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;
      const r = 1.3;
      spherePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      spherePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      spherePositions[i * 3 + 2] = r * Math.cos(phi);
    }

    // 2. GRADUATION CAP (Academics / About Stage)
    const capPositions = new Float32Array(N * 3);
    // Let's divide N particles:
    // - 4,500 for the flat mortarboard top (a tilted square)
    // - 3,500 for the skull cap dome underneath
    // - 2,000 for the tassel hanging down
    for (let i = 0; i < N; i++) {
      if (i < 4500) {
        // Flat diamond mortarboard top: u, v in [-1, 1]
        // Grid-like pattern or random pattern inside a square rotated 45 degrees
        const u = (Math.random() * 2 - 1) * 1.3;
        const v = (Math.random() * 2 - 1) * 1.3;
        // Rotated by 45 degrees
        const rx = (u - v) * 0.7;
        const rz = (u + v) * 0.7;
        capPositions[i * 3] = rx;
        capPositions[i * 3 + 1] = 0.45; // elevated horizontal surface
        capPositions[i * 3 + 2] = rz;
      } else if (i < 8000) {
        // Skull cap dome underneath (downward hemisphere)
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * (Math.PI / 2); // only top hemisphere, then invert y
        const r = 0.55;
        capPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        // Curve downward below the flat mortarboard (which is at y=0.45)
        capPositions[i * 3 + 1] = 0.45 - r * Math.cos(phi);
        capPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      } else {
        // Tassel draping down
        const t = (i - 8000) / 2000; // 0 to 1
        if (t < 0.6) {
          // Horizontal section from center (0, 0.45, 0) to corner (0.7, 0.45, 0.7)
          const fraction = t / 0.6;
          capPositions[i * 3] = fraction * 0.65;
          capPositions[i * 3 + 1] = 0.45;
          capPositions[i * 3 + 2] = fraction * 0.65;
        } else {
          // Vertical section draping down from (0.65, 0.45, 0.65) to (0.7, 0.0, 0.7)
          const fraction = (t - 0.6) / 0.4;
          // Add a little drop tassel brush cluster at the end
          const noiseX = fraction > 0.95 ? (Math.random() * 2 - 1) * 0.08 : 0;
          const noiseY = fraction > 0.95 ? (Math.random() * 2 - 1) * 0.08 : 0;
          const noiseZ = fraction > 0.95 ? (Math.random() * 2 - 1) * 0.08 : 0;

          capPositions[i * 3] = 0.65 + fraction * 0.05 + noiseX;
          capPositions[i * 3 + 1] = 0.45 - fraction * 0.45 + noiseY;
          capPositions[i * 3 + 2] = 0.65 + fraction * 0.05 + noiseZ;
        }
      }
    }

    // 3. DNA HELIX (Future Innovation Stage)
    const dnaPositions = new Float32Array(N * 3);
    // Double helix structure
    // - Strand 1 (4,000 points)
    // - Strand 2 (4,000 points)
    // - Connectors / Base pairs (2,000 points)
    for (let i = 0; i < N; i++) {
      if (i < 4000) {
        // Strand A
        const t = (i / 4000) * 2.8 - 1.4; // y position from -1.4 to 1.4
        const angle = t * 4.5;
        const r = 0.65;
        dnaPositions[i * 3] = r * Math.cos(angle);
        dnaPositions[i * 3 + 1] = t;
        dnaPositions[i * 3 + 2] = r * Math.sin(angle);
      } else if (i < 8000) {
        // Strand B (180 deg shifted)
        const t = ((i - 4000) / 4000) * 2.8 - 1.4;
        const angle = t * 4.5 + Math.PI;
        const r = 0.65;
        dnaPositions[i * 3] = r * Math.cos(angle);
        dnaPositions[i * 3 + 1] = t;
        dnaPositions[i * 3 + 2] = r * Math.sin(angle);
      } else {
        // Connectors between Strand A and Strand B
        const pairIndex = i - 8000;
        const totalPairs = 40;
        const segment = Math.floor(pairIndex / (2000 / totalPairs)); // select height row
        const t = (segment / totalPairs) * 2.8 - 1.4; // height of the row

        const angleA = t * 4.5;
        const angleB = t * 4.5 + Math.PI;
        const r = 0.65;

        const pAx = r * Math.cos(angleA);
        const pAy = t;
        const pAz = r * Math.sin(angleA);

        const pBx = r * Math.cos(angleB);
        const pBy = t;
        const pBz = r * Math.sin(angleB);

        // Linear interpolation parameter for particles along this connector bar
        const lerpVal = (pairIndex % (2000 / totalPairs)) / (2000 / totalPairs);

        dnaPositions[i * 3] = pAx + (pBx - pAx) * lerpVal;
        dnaPositions[i * 3 + 1] = pAy + (pBy - pAy) * lerpVal;
        dnaPositions[i * 3 + 2] = pAz + (pBz - pAz) * lerpVal;
      }
    }

    // 4. NEURAL BRAIN GLOBE (Admissions / Intelligence Stage)
    const brainPositions = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      // Base sphere coordinates
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;

      // Make a brain-like shape (oval, symmetrically folded, separate hemispheres)
      const baseR = 1.0;
      // Longitudinal fold wave
      const foldWave = 1.0 + 0.22 * Math.sin(5 * phi) * Math.cos(6 * theta);
      
      let x = baseR * Math.sin(phi) * Math.cos(theta) * foldWave;
      let y = baseR * Math.sin(phi) * Math.sin(theta) * foldWave * 0.85; // slightly shorter vertical
      let z = baseR * Math.cos(phi) * foldWave * 1.25; // slightly elongated front-to-back

      // Shift hemispheres slightly apart
      if (x > 0) {
        x += 0.08;
      } else {
        x -= 0.08;
      }

      brainPositions[i * 3] = x;
      brainPositions[i * 3 + 1] = y;
      brainPositions[i * 3 + 2] = z;
    }

    // Random offsets for organic turbulent flow
    const randomOffsets = new Float32Array(N * 3);
    for (let i = 0; i < N * 3; i++) {
      randomOffsets[i] = Math.random() * 2.0 - 1.0;
    }

    // Custom IDs
    const particleIds = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      particleIds[i] = i;
    }

    // --- SHADER COMPILATION ---
    const vsSource = `
      attribute vec3 aPositionSphere;
      attribute vec3 aPositionCap;
      attribute vec3 aPositionDna;
      attribute vec3 aPositionBrain;
      attribute vec3 aRandomOffset;
      attribute float aParticleId;

      uniform float uBlendWeights[4];
      uniform float uTime;
      uniform vec2 uMousePos;
      uniform float uMouseInfluence;
      uniform mat4 uProjectionMatrix;
      uniform mat4 uModelViewMatrix;

      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        // Blend positions based on active stage weights
        vec3 position = aPositionSphere * uBlendWeights[0] +
                        aPositionCap * uBlendWeights[1] +
                        aPositionDna * uBlendWeights[2] +
                        aPositionBrain * uBlendWeights[3];

        // Ambient noise fluctuation (gentle floating motion)
        float noiseFreq = 0.5 + 0.2 * sin(aParticleId * 0.001);
        float noiseAmp = 0.05 + 0.03 * cos(aParticleId * 0.005);
        vec3 noiseVec = vec3(
          sin(uTime * 1.5 * noiseFreq + position.y * 2.0) * noiseAmp,
          cos(uTime * 1.2 * noiseFreq + position.x * 2.0) * noiseAmp,
          sin(uTime * 1.8 * noiseFreq + position.z * 1.5) * noiseAmp
        );

        // Reduce ambient float noise for structures like DNA and cap to maintain structural fidelity
        float ambientReduction = 1.0 - (0.5 * uBlendWeights[1] + 0.3 * uBlendWeights[2]);
        position += noiseVec * ambientReduction;

        // Interactive mouse force (repulsion)
        // Project mouse coordinates to coordinates around depth 0
        vec3 mouseWorld = vec3(uMousePos.x * 1.8, uMousePos.y * 1.2, 0.0);
        float dist = distance(position, mouseWorld);
        if (dist < 0.75) {
          vec3 repelDir = normalize(position - mouseWorld);
          float repelForce = (1.0 - dist / 0.75) * 0.18 * uMouseInfluence;
          // Apply gentle repulsion
          position += repelDir * repelForce;
        }

        // Color blending based on current state weights
        // Stage 0 (Sphere): Nebula blue / Deep Indigo
        vec3 colorSphere = mix(vec3(0.12, 0.36, 1.0), vec3(0.58, 0.05, 0.95), sin(position.y * 2.0 + uTime * 0.5) * 0.5 + 0.5);

        // Stage 1 (Cap): Elegant Royalty - Deep violet to lavender
        vec3 colorCap = mix(vec3(0.55, 0.2, 0.9), vec3(0.35, 0.65, 1.0), position.y + 0.2);

        // Stage 2 (DNA): Biotech Cyan / Glowing Emerald
        vec3 colorDna = mix(vec3(0.0, 0.85, 0.82), vec3(0.48, 0.0, 0.95), sin(position.y * 4.0 + uTime * 1.0) * 0.5 + 0.5);

        // Stage 3 (Brain): Quantum Neural - Electric magenta, pink, and core violet
        vec3 colorBrain = mix(vec3(1.0, 0.15, 0.58), vec3(0.28, 0.18, 0.95), cos(position.x * 3.0) * 0.5 + 0.5);

        vec3 finalColor = colorSphere * uBlendWeights[0] +
                          colorCap * uBlendWeights[1] +
                          colorDna * uBlendWeights[2] +
                          colorBrain * uBlendWeights[3];

        vColor = finalColor;

        // Soft edges, size variance
        vec4 mvPosition = uModelViewMatrix * vec4(position, 1.0);
        
        // Depth-based particle size
        float baseSize = 25.0; // scale size
        // Reduce slightly for denser helix/brain structures
        float sizeReduction = 1.0 - (0.2 * uBlendWeights[2] + 0.1 * uBlendWeights[3]);
        gl_PointSize = (baseSize * sizeReduction) / -mvPosition.z;

        gl_Position = uProjectionMatrix * mvPosition;

        // Depth sorting alpha effect
        vAlpha = clamp(1.8 / (-mvPosition.z), 0.2, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        // High quality radial glow inside the point bounds
        vec2 r = gl_PointCoord - vec2(0.5);
        float d = length(r);
        if (d > 0.5) discard;

        // Inverse exponential glow
        float glow = (1.0 - d * 2.0);
        glow = pow(glow, 1.6);

        gl_FragColor = vec4(vColor, glow * vAlpha * 0.85);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compiler error: ", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    if (!program || !vs || !fs) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Shader program linker error: ", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Get attribute & uniform locations
    const locs = {
      aPositionSphere: gl.getAttribLocation(program, "aPositionSphere"),
      aPositionCap: gl.getAttribLocation(program, "aPositionCap"),
      aPositionDna: gl.getAttribLocation(program, "aPositionDna"),
      aPositionBrain: gl.getAttribLocation(program, "aPositionBrain"),
      aRandomOffset: gl.getAttribLocation(program, "aRandomOffset"),
      aParticleId: gl.getAttribLocation(program, "aParticleId"),

      uBlendWeights: gl.getUniformLocation(program, "uBlendWeights"),
      uTime: gl.getUniformLocation(program, "uTime"),
      uMousePos: gl.getUniformLocation(program, "uMousePos"),
      uMouseInfluence: gl.getUniformLocation(program, "uMouseInfluence"),
      uProjectionMatrix: gl.getUniformLocation(program, "uProjectionMatrix"),
      uModelViewMatrix: gl.getUniformLocation(program, "uModelViewMatrix"),
    };

    // Helper to upload array buffers
    const initBuffer = (data: Float32Array, attributeLoc: number, size: number) => {
      if (attributeLoc === -1) return;
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(attributeLoc);
      gl.vertexAttribPointer(attributeLoc, size, gl.FLOAT, false, 0, 0);
    };

    initBuffer(spherePositions, locs.aPositionSphere, 3);
    initBuffer(capPositions, locs.aPositionCap, 3);
    initBuffer(dnaPositions, locs.aPositionDna, 3);
    initBuffer(brainPositions, locs.aPositionBrain, 3);
    initBuffer(randomOffsets, locs.aRandomOffset, 3);
    initBuffer(particleIds, locs.aParticleId, 1);

    // Setup viewport & depth state
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // additive glow blending!
    gl.disable(gl.DEPTH_TEST); // allow particles to merge/glow together beautifully

    // Projection and Model-View Matrix utilities
    let width = canvas.width;
    let height = canvas.height;

    const projectionMatrix = new Float32Array(16);
    const modelViewMatrix = new Float32Array(16);

    const makePerspective = (matrix: Float32Array, fov: number, aspect: number, near: number, far: number) => {
      const f = 1.0 / Math.tan(fov / 2);
      const rangeInv = 1.0 / (near - far);
      matrix[0] = f / aspect; matrix[1] = 0; matrix[2] = 0; matrix[3] = 0;
      matrix[4] = 0; matrix[5] = f; matrix[6] = 0; matrix[7] = 0;
      matrix[8] = 0; matrix[9] = 0; matrix[10] = (near + far) * rangeInv; matrix[11] = -1;
      matrix[12] = 0; matrix[13] = 0; matrix[14] = (2 * near * far) * rangeInv; matrix[15] = 0;
    };

    const makeIdentity = (matrix: Float32Array) => {
      for (let i = 0; i < 16; i++) matrix[i] = i % 5 === 0 ? 1 : 0;
    };

    // Current state values for animations
    let currentWeights = [1.0, 0.0, 0.0, 0.0];
    let startTime = performance.now();
    let rotationAngleY = 0;
    let rotationAngleX = 0;

    // Handle resizing beautifully
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);

      const fov = 45 * (Math.PI / 180);
      const aspect = width / height;
      makePerspective(projectionMatrix, fov, aspect, 0.1, 100);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    let animationId: number;

    // --- RENDER LOOP ---
    const render = () => {
      const time = (performance.now() - startTime) / 1000;

      // Calculate target morph weights based on current scroll
      const progress = scrollRef.current;
      const targetWeights = [0, 0, 0, 0];

      if (progress < 0.22) {
        // Pure Stage 0 (Sphere)
        targetWeights[0] = 1;
      } else if (progress < 0.48) {
        // Transition 0 -> 1
        const t = (progress - 0.22) / (0.48 - 0.22);
        // Custom cubic-like easing for smoother transition entry
        const eased = t * t * (3 - 2 * t);
        targetWeights[0] = 1 - eased;
        targetWeights[1] = eased;
      } else if (progress < 0.72) {
        // Transition 1 -> 2
        const t = (progress - 0.48) / (0.72 - 0.48);
        const eased = t * t * (3 - 2 * t);
        targetWeights[1] = 1 - eased;
        targetWeights[2] = eased;
      } else if (progress < 0.88) {
        // Transition 2 -> 3
        const t = (progress - 0.72) / (0.88 - 0.72);
        const eased = t * t * (3 - 2 * t);
        targetWeights[2] = 1 - eased;
        targetWeights[3] = eased;
      } else {
        // Pure Stage 3 (Brain)
        targetWeights[3] = 1;
      }

      // Smoothly interpolate weights with spring-like physics
      for (let i = 0; i < 4; i++) {
        currentWeights[i] += (targetWeights[i] - currentWeights[i]) * 0.055;
      }

      // Update mouse coordinate lerping for highly premium, organic feedback
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.07;
      mouse.y += (mouse.targetY - mouse.y) * 0.07;

      // Clear with transparent black
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Setup Model-View Matrix
      makeIdentity(modelViewMatrix);

      // Camera distance: Pull back on portrait screens (e.g. mobile preview) so the 3D particle sphere fits neatly in the phone view
      const isPortrait = width / (height || 1) < 1.0;
      modelViewMatrix[14] = isPortrait ? -5.6 : -4.0;

      // Apply base continuous rotation
      rotationAngleY += 0.005;
      // Add a slight interactive tilt based on mouse position
      const mouseTiltY = mouse.active ? mouse.x * 0.25 : 0;
      const mouseTiltX = mouse.active ? mouse.y * 0.25 : 0;

      // We implement a simple 3D rotation matrix multiplication in C-style arrays
      const cosY = Math.cos(rotationAngleY + mouseTiltY);
      const sinY = Math.sin(rotationAngleY + mouseTiltY);
      const cosX = Math.cos(rotationAngleX + mouseTiltX);
      const sinX = Math.sin(rotationAngleX + mouseTiltX);

      // Dynamic rotation matrix (Y-Axis then X-Axis)
      const r0 = cosY;
      const r1 = sinY * sinX;
      const r2 = sinY * cosX;
      const r4 = 0;
      const r5 = cosX;
      const r6 = -sinX;
      const r8 = -sinY;
      const r9 = cosY * sinX;
      const r10 = cosY * cosX;

      // Apply rotation elements to our ModelView matrix
      modelViewMatrix[0] = r0;
      modelViewMatrix[1] = r1;
      modelViewMatrix[2] = r2;
      modelViewMatrix[8] = r8;
      modelViewMatrix[9] = r9;
      modelViewMatrix[10] = r10;
      modelViewMatrix[4] = r4;
      modelViewMatrix[5] = r5;
      modelViewMatrix[6] = r6;

      // Upload uniforms
      gl.uniform1f(locs.uTime, time);
      gl.uniform1fv(locs.uBlendWeights, currentWeights);
      gl.uniform2f(locs.uMousePos, mouse.x, mouse.y);
      gl.uniform1f(locs.uMouseInfluence, mouse.active ? 1.0 : 0.0);
      gl.uniformMatrix4fv(locs.uProjectionMatrix, false, projectionMatrix);
      gl.uniformMatrix4fv(locs.uModelViewMatrix, false, modelViewMatrix);

      // Draw!
      gl.drawArrays(gl.POINTS, 0, N);

      animationId = requestAnimationFrame(render);
    };

    // Start loop
    render();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  if (!glSupported) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-zinc-500 font-mono text-sm z-0">
        [WebGL Context required for immersive particle engine]
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      id="particle-webgl-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent transition-all duration-500"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
