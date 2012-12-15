#pragma strict

var customSkin:GUISkin;
static var dialogueBoxFinish:boolean;
static var boxNumber = -1;
var boxMax = 6;
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
		GUI.Box(Rect(xstart, ystart, Screen.width * (800.0/1920.0), Screen.height * (200.0/1080.0)), "Hello, young jelly cube... welcome to the kitchen.\n \n (click to continue)");
	}
	if (boxNumber == 1) {
		GUI.Box(Rect(xstart, ystart, Screen.width * (800.0/1920.0), Screen.height * (200.0/1080.0)), "It seems your messy owner doesn't realize that\n bread kept outside the bag molds quickly...\n \n (click to continue)");
	}
	if(boxNumber == 2) {
		GUI.Box(Rect(xstart, ystart, Screen.width * (800.0/1920.0), Screen.height * (200.0/1080.0)), "To prevent catastrophe, you must make as many pbj sandwiches as possible for your lazy owner..\n \n (click to continue)");
	}
	if(boxNumber == 3) {
		GUI.Box(Rect(xstart, ystart, Screen.width * (800.0/1920.0), Screen.height * (200.0/1080.0)), "It's up to you now! Leave no sandwich unmade...\n \n (click to continue)");
	}
	if(boxNumber == 4) {
		GUI.Box(Rect(xstart, ystart, Screen.width * (800.0/1920.0), Screen.height * (200.0/1080.0)), "You've have been granted the ability to move...\n \n (click to continue)");
	}
	if(boxNumber == 5) {
		GUI.Box(Rect(xstart, ystart, Screen.width * (800.0/1920.0), Screen.height * (200.0/1080.0)), "Utilize your new ability by using the directional arrows...\n \n (click to continue)");
	}
	if(boxNumber == 6) {
		GUI.Box(Rect(xstart, ystart, Screen.width * (800.0/1920.0), Screen.height * (200.0/1080.0)), "Go on, try it.\n \n (click to continue)");
	}
	if(boxNumber == -1) {
		if(updateDialogueWait) {
			dialogueBoxFinish = true;
		}
		numberLock = true;
	}
}
