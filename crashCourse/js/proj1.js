function init(){
var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth,window.innerHeight);
            document.body.appendChild(renderer.domElement);
            
            // on resizing the browser , render the image again
            window.addEventListener('resize',function(){
                var width = window.innerWidth;
                var height = window.innerHeight;
                renderer.setSize(width,height);
                camera.aspect = width/height;
                camera.updateProjectionMatrix();
            });
            
            // adding up the control
            controls =  new THREE.OrbitControls(camera,renderer.domElement);
            
            //loading up the model-face
            var loader = new THREE.ObjectLoader();
            loader.load(
                'models/face.json',
                    function( object ){ // this function will be called once the model is loaded 
                        scene.add(object);  
                    },
                // Function called when download progresses
    function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },

    // Function called when download errors
    function ( xhr ) {
        console.error( 'An error happened' );
    }
            );            
            
            // ====================> Draw the Scene
            var geometry = new THREE.BoxGeometry(2,2,2);

            // creating new material containing images on the sides .
//            var cubeMaterials = [
//            new THREE.MeshBasicMaterial({map:new      THREE.TextureLoader().load('images/1.jpg'),side : THREE.DoubleSide}),//R
//           
//                new THREE.MeshBasicMaterial({map:new      THREE.TextureLoader().load('images/2.jpg'),side : THREE.DoubleSide}),//L
//            new THREE.MeshBasicMaterial({map:new      THREE.TextureLoader().load('images/3.jpg'),side : THREE.DoubleSide}),//T
//            new THREE.MeshBasicMaterial({map:new      THREE.TextureLoader().load('images/4.jpg'),side : THREE.DoubleSide}),//B
//            new THREE.MeshBasicMaterial({map:new      THREE.TextureLoader().load('images/5.jpg'),side : THREE.DoubleSide}),//F
//            new THREE.MeshBasicMaterial({map:new      THREE.TextureLoader().load('images/6.jpg'),side : THREE.DoubleSide}),//Bk
//            ];
            // var material = new THREE.MeshBasicMaterial({color:0xFFFFFF , wireframe : true}); 
            
            // creating new cubematerial which is responsive to lightening
            var cubeMaterials = [
            new THREE.MeshPhongMaterial({map:new      THREE.TextureLoader().load('images/1.jpg'),side : THREE.DoubleSide}),//R
           
                new THREE.MeshLambertMaterial({map:new      THREE.TextureLoader().load('images/2.jpg'),side : THREE.DoubleSide}),//L
            new THREE.MeshLambertMaterial({map:new      THREE.TextureLoader().load('images/3.jpg'),side : THREE.DoubleSide}),//T
            new THREE.MeshPhongMaterial({map:new      THREE.TextureLoader().load('images/4.jpg'),side : THREE.DoubleSide}),//B
            new THREE.MeshLambertMaterial({map:new      THREE.TextureLoader().load('images/5.jpg'),side : THREE.DoubleSide}),//F
            new THREE.MeshPhongMaterial({map:new      THREE.TextureLoader().load('images/6.jpg'),side : THREE.DoubleSide}),//Bk
            ];
            
            
            
            var cube = new THREE.Mesh(geometry,cubeMaterials);
           // scene.add(cube);
            // as cube and camera both are at origin , camera can't view it .. so move it outside the cube in order to see it .
            camera.position.z = 3;
            
            // floor 
            var floorGeometry =  new THREE.CubeGeometry(10,1,10);
            var floorMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('images/ceiling.jpg'),side : THREE.DoubleSide});
            var floorCube = new THREE.Mesh(floorGeometry,floorMaterial);
            floorCube.position.y=-5;
            scene.add(floorCube);
            
            // ceiling
            var ceilingGeometry =  new THREE.CubeGeometry(10,1,10);
            var ceilingMaterial =  new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('images/ceiling.jpg'),side : THREE.DoubleSide});
            var ceilingCube =  new THREE.Mesh(ceilingGeometry,ceilingMaterial);
            ceilingCube.position.y=5;
            scene.add(ceilingCube);
            //left wall
            var leftWallGeometry = new THREE.CubeGeometry(1,10,10);
            var leftWallMaterial =  new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('images/wall.jpg'),side : THREE.DoubleSide});
            var leftWallCube = new THREE.Mesh(leftWallGeometry,leftWallMaterial);
            leftWallCube.position.x =-5;
            scene.add(leftWallCube);
            
            
            // right wall
            var rightWallGeometry = new THREE.CubeGeometry(1,10,10);
            var rightWallMaterial =  new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('images/wall.jpg'),side:THREE.DoubleSide});
            var rightWallCube = new THREE.Mesh(rightWallGeometry,rightWallMaterial);
            rightWallCube.position.x=5;
            scene.add(rightWallCube);
            
            // adding lights to the faces.(lights don't affect MeshBasicMaterial)
            var ambientLight = new THREE.AmbientLight(0xFFFFFF,0.8);
            scene.add(ambientLight);
            
            //addup some pointlights and move them randomly
            var light1 = new THREE.PointLight(0xFFFFFF,0.5,50);//(color,intensity,dist)
            var light2 = new THREE.PointLight(0xFFFFFF,0.5,50);//(color,intensity,dist)
            var light3 = new THREE.PointLight(0xFFFFFF,0.5,50);//(color,intensity,dist)
            var light4 = new THREE.SpotLight(0xFFFFFF,0.5,50);
            scene.add(light1);
            scene.add(light2);
            scene.add(light3);
            scene.add(light4);
            // game logic will be here
            var update = function(){
               // cube.rotation.x +=0.01;
                //cube.rotation.y +=0.005;
                light1.position.x = 2;
                light1.position.y = 2;
                light1.position.z = 2;
            };
            // draw scene
            var render =  function(){
                renderer.render(scene , camera);
            };
            // run gameloop (update , render , repeat)
            var GameLoop = function(){
                requestAnimationFrame(GameLoop);
                
                update();
                render();
            };
            
            GameLoop();
}
window.onload=init;