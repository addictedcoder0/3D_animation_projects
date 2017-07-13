function init(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
    
    var renderer =  new THREE.WebGLRenderer();
    // setting up a clear background color
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(window.innerWidth,window.innerHeight);
    // enabling shadow property : remember it is costly operation.
    renderer.shadowMapEnabled = true;
    // attaching renderer to the dom-body , without this visibility is none .
    document.body.appendChild(renderer.domElement);
    // on resizing the browser , render the image again
            window.addEventListener('resize',function(){
                var width = window.innerWidth;
                var height = window.innerHeight;
                renderer.setSize(width,height);
                camera.aspect = width/height;
                camera.updateProjectionMatrix();
            });
    
    
    
    
    // axes 
    var axes = new THREE.AxisHelper(20);
    scene.add(axes);
    
    // plane
    var planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
    var planeMaterial = new THREE.MeshLambertMaterial({color:0xcccccc});
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add(plane);
    
    // cube
    var cubeGeometry = new THREE.BoxGeometry(4,4,4);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:0xff0000});
    var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    cube.castShadow = true;
    scene.add(cube);
    
    //sphere
    var sphereGeometry = new THREE.SphereGeometry(4,20,20);
    var sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
    var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;
    scene.add(sphere);
    
    //camera positioning
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    /*
    To make sure the camera is looking at our objects, 
    we use the lookAt function to point it at the center of our scene, 
    which is located at position (0, 0, 0) by default.
    */
    camera.lookAt(scene.position);
    
    // adding spotLight to the scene
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set( -40, 60, -10 );
    spotLight.castShadow = true;
    scene.add( spotLight );
    
    function initState(){
            var stats = new Stats();
            stats.setMode(0);
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';
            document.getElementById("Stats-output")
                .appendChild( stats.domElement );
            return stats;
        }
            var stats = initState();
    
    var update = function(){
    };
    
    // draw scene
    var render =  function(){
        renderer.render(scene , camera);
    };
    
    // run gameloop (update , render , repeat)
    var GameLoop = function(){
        stats.update();
        requestAnimationFrame(GameLoop);
        update();
        render();
    };
            
    GameLoop();
}

window.onload = init;