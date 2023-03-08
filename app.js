// create a scene
const scene = new THREE.Scene();

// create a camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById("container").appendChild( renderer.domElement );

// create a variable to hold the current shape
let currentShape = null;

// create a function to add a new shape to the scene
function addShape( shape ) {
  // remove the current shape, if any
  if ( currentShape !== null ) {
    scene.remove( currentShape );
  }

  // create a new shape mesh
  let geometry, material;
  switch ( shape ) {
    case "cube":
      geometry = new THREE.BoxGeometry();
      material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
      break;
    case "cylinder":
     geometry = new THREE.CylinderGeometry();
     material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe:true } );
     break;
    case "torus":
      geometry = new THREE.TorusGeometry();
      material = new THREE.MeshBasicMaterial( { color: 0xff7700 } );
      break;
    case "tetrahedron":
      geometry = new THREE.TetrahedronGeometry();
      material = new THREE.MeshBasicMaterial( { color: 0xff00ff } );
      break;   
    case "sphere":
      geometry = new THREE.SphereGeometry();
      material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      break;
    case "cone":
      geometry = new THREE.ConeGeometry();
      material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
      break;
    default:
      console.error( "Invalid shape: " + shape );
      return;
  }
  const shapeMesh = new THREE.Mesh( geometry, material );
  scene.add( shapeMesh );

  // update the current shape
  currentShape = shapeMesh;
}

// create a speech recognition object
const recognition = new webkitSpeechRecognition();
recognition.onresult = function( event ) {
  const result = event.results[ event.resultIndex ][0].transcript;
  addShape( result );
};

// start the speech recognition
recognition.start();

// render the scene
function animate() {
  requestAnimationFrame( animate );
  if ( currentShape !== null ) {
    currentShape.rotation.x += 0.01;
    currentShape.rotation.y += 0.01;
  }
  renderer.render( scene, camera );
}
animate();
