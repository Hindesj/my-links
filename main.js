import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

//document.getElementById('button').src = pdfUrl;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHw0UjC3E9_4jremYnm7Sm_rjrSDE8Mz4",
  authDomain: "links-16d13.firebaseapp.com",
  projectId: "links-16d13",
  storageBucket: "links-16d13.appspot.com",
  messagingSenderId: "691378664514",
  appId: "1:691378664514:web:4389a2073fc9fa33b2e9db",
  measurementId: "G-ZHJ1KS9QR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Getting the scene started
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener( 'resize', onWindowResize, false );
			
function onWindowResize() {

   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize( window.innerWidth, window.innerHeight );

}



//camera position
camera.position.setZ(0);
camera.position.setY(2);
camera.position.setX(4);

const assetLoader = new GLTFLoader();
let mixer;
assetLoader.load('/xWing.blend.glb', function(object){
  const model = object.scene;
  mixer = new THREE.AnimationMixer(model);
  object.animations.forEach((clip) => {mixer.clipAction(clip).play(); });
  const material = new THREE.MeshBasicMaterial({
    color: 0x00FF41,
    wireframe: true
  });
  model.position.setX(-2);
  model.position.setY(-1)
  model.traverse( function ( child ) {
  if ( child.isMesh ) child.material=material;
  } );
    scene.add(model);

});
//Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);


//animation of the scene
const clock = new THREE.Clock();
function animate(){
  requestAnimationFrame(animate);

  controls.update();
  if (mixer)
    mixer.update(clock.getDelta());
  renderer.render(scene, camera);
}

animate();

