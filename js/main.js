import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

  const fov = 45;
  const aspect = 2;
  const near = 0.1;
  const far = 2000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 20, 40);

  const controls = new OrbitControls(camera, canvas);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("white");

  const loader = new THREE.TextureLoader();

  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);
  }

  // {

  //   const planeSize = 40;
  //   const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png')
  //   texture.wrapS = THREE.RepeatWrapping;
  //   texture.wrapT = THREE.RepeatWrapping;
  //   texture.magFilter = THREE.NearestFilter;
  //   const repeats = planeSize / 2;
  //   texture.repeat.set(repeats, repeats);

  //   const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
  //   const planeMat = new THREE.MeshPhongMaterial({
  //     map: texture,
  //     side: THREE.DoubleSide
  //   });
  //   const mesh = new THREE.Mesh(planeGeo, planeMat);
  //   mesh.receiveShadow = true;
  //   mesh.rotation.x = Math.PI * -0.5;
  //   scene.add(mesh)

  // }

  {
    const galaxyWidth = 1000;
    const galaxyHeight = 1000;
    const galaxyDepth = 1000;
    const galaxyBox = new THREE.BoxGeometry(
      galaxyWidth,
      galaxyHeight,
      galaxyDepth
    );

    const galaxyMaterials = [
      new THREE.MeshBasicMaterial({
        map: loader.load("../img/skybox_front.png"),
        side: THREE.BackSide,
      }),
      new THREE.MeshBasicMaterial({
        map: loader.load("../img/skybox_back.png"),
        side: THREE.BackSide,
      }),
      new THREE.MeshBasicMaterial({
        map: loader.load("../img/skybox_up.png"),
        side: THREE.BackSide,
      }),
      new THREE.MeshBasicMaterial({
        map: loader.load("../img/skybox_down.png"),
        side: THREE.BackSide,
      }),
      new THREE.MeshBasicMaterial({
        map: loader.load("../img/skybox_right.png"),
        side: THREE.BackSide,
      }),
      new THREE.MeshBasicMaterial({
        map: loader.load("../img/skybox_left.png"),
        side: THREE.BackSide,
      }),
    ];

    const galaxy = new THREE.Mesh(galaxyBox, galaxyMaterials);
    scene.add(galaxy);
  }

  const objects = [];

  const radius = 1;
  const widthSegments = 10;
  const heightSegments = 10;
  const sphereGeometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  );

  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem);

  const texture = loader.load("../img/sun-removebg-preview.png");
  const sunMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    emissive: 0xffff00,
    side: THREE.DoubleSide,
  });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
  sunMesh.scale.set(10, 10, 10);
  solarSystem.add(sunMesh);
  objects.push(sunMesh);

  // const mercuryOrbit = new THREE.Object3D();
  // mercuryOrbit.position.x = 45;
  // solarSystem.add(mercuryOrbit);
  // objects.push(mercuryOrbit)

  // const mercuryMaterial = new THREE.MeshPhongMaterial({color: 0x929094});
  // const merucryMesh = new THREE.Mesh(sphereGeometry, mercuryMaterial);
  // mercuryOrbit.add(merucryMesh);
  // objects.push(merucryMesh)

  // const venusMaterial = new THREE.MeshPhongMaterial({color: 0xF1E5D9});
  // const venusMesh = new THREE.Mesh(sphereGeometry, venusMaterial);
  // venusMesh.position.x = 60;
  // venusMesh.scale.set(2, 2, 2);
  // solarSystem.add(venusMesh);
  // objects.push(venusMesh)

  // const marsMaterial = new THREE.MeshPhongMaterial({color: 0xFC8C00});
  // const marsMesh = new THREE.Mesh(sphereGeometry, marsMaterial);
  // marsMesh.position.x = 70;
  // marsMesh.scale.set(2, 2, 2);
  // solarSystem.add(marsMesh);
  // objects.push(marsMesh)

  // const jupiterMaterial = new THREE.MeshPhongMaterial({color: 0x8C7555});
  // const jupiterMesh = new THREE.Mesh(sphereGeometry, jupiterMaterial);
  // jupiterMesh.position.x = 135;
  // jupiterMesh.scale.set(11, 11, 11)
  // solarSystem.add(jupiterMesh);
  // objects.push(jupiterMesh)

  // const saturnMaterial = new THREE.MeshPhongMaterial({color: 0xC19B5E});
  // const saturnMesh = new THREE.Mesh(sphereGeometry, saturnMaterial);
  // saturnMesh.position.x = 160;
  // saturnMesh.scale.set(9, 9, 9)
  // solarSystem.add(saturnMesh);
  // objects.push(saturnMesh)

  // const uranusMaterial = new THREE.MeshPhongMaterial({color: 0x7298F8});
  // const uranusMesh = new THREE.Mesh(sphereGeometry, uranusMaterial);
  // uranusMesh.position.x = 300;
  // uranusMesh.scale.set(4, 4, 4)
  // solarSystem.add(uranusMesh);
  // objects.push(uranusMesh)

  // const neptuneMaterial = new THREE.MeshPhongMaterial({color: 0x4A87EC});
  // const neptuneMesh = new THREE.Mesh(sphereGeometry, neptuneMaterial);
  // neptuneMesh.position.x = 370;
  // neptuneMesh.scale.set(4, 4, 4)
  // solarSystem.add(neptuneMesh);
  // objects.push(neptuneMesh)

  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.x = 25;
  solarSystem.add(earthOrbit);
  objects.push(earthOrbit);

  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244,
  });
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
  earthOrbit.add(earthMesh);
  earthMesh.scale.set(2, 2, 2);
  objects.push(earthMesh);

  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 5;
  earthOrbit.add(moonOrbit);

  const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
    emissive: 0x222222,
  });
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.set(0.5, 0.5, 0.5);
  moonOrbit.add(moonMesh);
  objects.push(moonMesh);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.heigth !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((obj) => {
      obj.rotation.y = time;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
