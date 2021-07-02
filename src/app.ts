import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, SceneLoader, StandardMaterial, Color3, Texture } from "@babylonjs/core";
class App {
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;
  private _scene: Scene;
  private _camera: ArcRotateCamera;
  private _light: HemisphericLight;

  constructor() {
      // create the canvas html element and attach it to the webpage
      this._canvas = this.initCanvas();

      // initialize babylon scene and engine
      this._engine = new Engine(this._canvas, true);
      this._scene = new Scene(this._engine);

      // init camera
      this._camera = this.initArcRotateCamera();
      
      // init light for scene
      this._light = this.initHemisphericLight(this._scene);

      const ground = MeshBuilder.CreateGround("ground", {width: 10, height: 10});
      const groundMaterial = new StandardMaterial("groundMaterial", this._scene);
      groundMaterial.diffuseColor = new Color3(0,1,0);
      ground.material = groundMaterial;

      // var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
      const box = MeshBuilder.CreateBox("box", {});
      box.position.y = 0.5;

      const boxMaterial = new StandardMaterial("boxMaterial", this._scene);
      boxMaterial.diffuseTexture = new Texture("https://www.babylonjs-playground.com/textures/floor.png", this._scene);
      box.material = boxMaterial;

      const roof = MeshBuilder.CreateCylinder("roof", { diameter: 1.3, height: 1.2, tessellation: 3});
      roof.scaling.x = 0.75;
      roof.rotation.z = Math.PI / 2;
      roof.position.y = 1.22;

      const roofMaterial = new StandardMaterial("roofMaterial", this._scene);
      roofMaterial.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/roof.jpg", this._scene);
      roof.material = roofMaterial;


      // hide/show the Inspector
      this.initSceneDebugger(this._scene);

      // run the main render loop
      this.initEngineRenderLoop(this._engine, this._scene);
  }

  initHemisphericLight = (scene: Scene) => {
    this._light = new HemisphericLight("light1", new Vector3(1, 1, 0), this._scene);

    return this._light;
  }

  initArcRotateCamera = () => {
    this._camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this._scene);
    this._camera.attachControl(this._canvas, true);

    return this._camera;
  }

  initCanvas = () => {
    this._canvas = document.createElement("canvas");
    this._canvas.style.width = "100%";
    this._canvas.style.height = "100%";
    this._canvas.id = "gameCanvas";
    document.body.appendChild(this._canvas);

    return this._canvas;
  }

  initEngineRenderLoop = (engine: Engine, scene: Scene) => {
    engine.runRenderLoop(() => {
      scene.render();
  });
  }
  initSceneDebugger = (scene: Scene) => {
    window.addEventListener("keydown", (ev) => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
          if (scene.debugLayer.isVisible()) {
              scene.debugLayer.hide();
          } else {
              scene.debugLayer.show();
          }
      }
  });
  }
}
new App();