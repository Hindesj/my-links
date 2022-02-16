import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Mesh } from 'three';

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

const material = new THREE.MeshBasicMaterial({color: 0x00FF41, wireframe: true});

//camera position
camera.position.setZ(7);
camera.position.setY(-50);

function  cameraAnimation(){
  renderer.render(scene, camera);
  
    for (let i = 0; i<=50; i++){
      camera.position.y += .003;
      //camera.rotation.z += .006;
      if (camera.position.y >= 50){
        break;
      }
    
  }
    
  
  requestAnimationFrame(cameraAnimation);
}


//Torus
/*
const geometry = new THREE.TorusGeometry(30,10,16,100);
const torus = new THREE.Mesh( geometry, material);
torus.position.set(10,100,0);
scene.add(torus);
*/
//Plane
const planeGeometry = new THREE.PlaneGeometry(200, 100, 15, 15);
const plane = new THREE.Mesh(planeGeometry, material);
scene.add(plane);

//Cone
const coneGeometry = new THREE.ConeGeometry(30, 20, 10, 10);
const cone = new THREE.Mesh(coneGeometry, material);
cone.rotation.x = Math.PI /2;
cone.position.set(70,20,10);
scene.add( cone );

//Dode 
const dodeGeometry = new THREE.DodecahedronGeometry(10);
const dode = new THREE.Mesh(dodeGeometry, material);
dode.position.set(-20, 20, 10);
scene.add( dode );

//Sphere Geometry X
const sphereGeometry = new THREE.SphereGeometry(5, 32, 8);
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.set(-50, -20, 0)
scene.add( sphere );

function  roll(){
  renderer.render(scene, camera);
  for (let i = 0; i<= 100; i++){
    sphere.position.x += .003;
    sphere.rotation.y += .006;
  }
  requestAnimationFrame(roll);
}

//Sphere Geometry Y
const sphereGeometry1 = new THREE.SphereGeometry(5, 32, 16);
const sphere1 = new THREE.Mesh(sphereGeometry1, material);
sphere1.position.set(0, -43, 0)
scene.add( sphere1 );

function roll1(){
  //const targetPositionY = 100
  renderer.render(scene, camera);

  for (let i = 0; i <= 100; i++){
    sphere1.position.y += .001;
    sphere1.rotation.x += .0005
  }
  requestAnimationFrame(roll1);
}


//Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);


//animation of the scene
function animate(){
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

cameraAnimation();
roll1();
roll();
animate();

