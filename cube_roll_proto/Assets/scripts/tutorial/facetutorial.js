#pragma strict

var customSkin:GUISkin;
static var dialogueBoxFinish:boolean;
static var boxNumber = -1;
var boxMax = 2;
var startBoxes:boolean = false;
var numberLock:boolean = false;
var clickTimer:float = 0.0;
var cameraInitTimer:float = 0.0;
var useInitTimer:boolean = true;
var updateDialogueWait = false;

function Start () {
	dialogueBoxFinish = false;
	boxNumber = -1;
	cameraInitTimer = 0.0;
}

function Update () {
	if(!GeneralLevelManager.pause) {
		JellyMoveScript.waitForDialogue = !dialogueBoxFinish;
		
		if(useInitTimer) {
			cameraInitTimer += Time.deltaTime;
		}
		if(cameraInitTimer > 2.5)
		{
			updateDialogueWait = true;
			useInitTimer = false;
			boxNumber = 0;
			numberLock = false;
			cameraInitTimer = 0.0;
		}
			
		if(Input.GetMouseButtonDown(0) && clickTimer > 0.3 && GUIUtility.hotControl == 0)
		{
			clickTimer = 0.0;
			if(!numberLock) {
				boxNumber += 1;
			}
			if(boxNumber > boxMax) {
				boxNumber = -1;
			}
		}
		clickTimer += Time.deltaTime;
	}
}

function OnGUI () {
	GUI.skin = customSkin;
	GUI.depth = 1;
	var xstart:float = (Screen.width/2) - (Screen.width/5);
	var ystart:float = Screen.height * (100.0/1080.0);
	
	if (boxNumber == 0) {
		GUI.Box(Rect(xstart, ystart, Screen.width * (800.0/1920.0), Screen.height * (200.0/1080.0)), "Hello, let me introduce you to the face cube.\n \n (click to continue)");
	}
	if (boxNumber == 1) {
		GUI.Box(Rect(xstart, ystart, Screen.width * (800.0/1920.0), Screen.height * (200.0/1080.0)), "To proceed, you must plant the peanut butter face \n of the cube onto the bread\n \n (click to continue)");
	}
	if(boxNumber == 2) {
		GUI.Box(Rect(xstart, ystart, Screen.width * (800.0/1920.0), Screen.height * (200.0/1080.0)), "Good luck!...\n \n (click to continue)");
	}
	if(boxNumber == -1) {
		if(updateDialogueWait) {
			dialogueBoxFinish = true;
		}
		numberLock = true;
	}
}