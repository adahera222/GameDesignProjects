#pragma strict

var menuTexture:Texture2D;
var customSkin:GUISkin;

var halfScreenW:float;
var halfScreenH:float;
var buttonWidth:float;
var buttonHeight:float;

function Start () {
	halfScreenW = Screen.width/2;
	halfScreenH = Screen.height/2;
	buttonWidth = Screen.width * (300.0/1920.0);
	buttonHeight = Screen.height * (75.0/1080.0);
}

function Update () {

}

function OnGUI () {
	GUI.skin = customSkin;
	GUI.DrawTexture(Rect(0,0, Screen.width, Screen.height), menuTexture, ScaleMode.StretchToFill, false);
	var LevelsUnlocked:int = PlayerPrefs.GetInt("LevelsUnlocked");
	var xstart:float = halfScreenW - 3*(buttonWidth/2) - (buttonWidth/16);
	var ystart:float = halfScreenH - (halfScreenH/2) - (halfScreenH/16);
	if(GUI.Button(Rect(xstart, ystart, buttonWidth, buttonHeight), "Tutorial")) {
		Application.LoadLevel("level1");
	}
	if(LevelsUnlocked < 1) {
		GUI.enabled = false;
	}
	if(GUI.Button(Rect(xstart + buttonWidth, ystart, buttonWidth, buttonHeight), "Level 1")) {
		Application.LoadLevel("level2");
	}
	GUI.enabled = true;
	if(LevelsUnlocked < 2) {
		GUI.enabled = false;
	}
	if(GUI.Button(Rect(xstart+ 2 * buttonWidth, ystart, buttonWidth, buttonHeight), "Level 2")) {
		Application.LoadLevel("level3");
	}
	GUI.enabled = true;
	if(LevelsUnlocked < 3) {
		GUI.enabled = false;
	}
	if(GUI.Button(Rect(xstart, ystart + buttonHeight, buttonWidth, buttonHeight), "Level 3")) {
		Application.LoadLevel("level4");
	}
	GUI.enabled = true;
	if(LevelsUnlocked < 4) {
		GUI.enabled = false;
	}
	if(GUI.Button(Rect(xstart + buttonWidth, ystart + buttonHeight, buttonWidth, buttonHeight), "Level 4")) {
		Application.LoadLevel("level5");
	}
	GUI.enabled = true;
	if(LevelsUnlocked < 5) {
		GUI.enabled = false;
	}
	if(GUI.Button(Rect(xstart + 2 * buttonWidth, ystart + buttonHeight, buttonWidth, buttonHeight), "Level 5")) {
		Application.LoadLevel("level6");
	}
	GUI.enabled = true;
	if(LevelsUnlocked < 6) {
		GUI.enabled = false;
	}
	if(GUI.Button(Rect(xstart, ystart + 2 * buttonHeight, buttonWidth, buttonHeight), "Level 6")) {
		Application.LoadLevel("level7");
	}
	GUI.enabled = true;
	if(LevelsUnlocked < 7) {
		GUI.enabled = false;
	}
	if(GUI.Button(Rect(xstart + buttonWidth, ystart + 2 * buttonHeight, buttonWidth, buttonHeight), "Level 7")) {
		Application.LoadLevel("level8");
	}
	GUI.enabled = true;
	if(LevelsUnlocked < 8) {
		GUI.enabled = false;
	}
	if(GUI.Button(Rect(xstart + 2 * buttonWidth, ystart + 2 * buttonHeight, buttonWidth, buttonHeight), "Level 8")) {
		Application.LoadLevel("level9");
	}
	GUI.enabled = true;
	if(GUI.Button(Rect(halfScreenW, ystart + buttonHeight * 6, buttonWidth, buttonHeight), "MAIN MENU")) {
		Application.LoadLevel("menu");
	}
	if(GUI.Button(Rect(halfScreenW - buttonWidth - (buttonWidth/8), ystart + buttonHeight * 6, buttonWidth, buttonHeight), "EXIT")) {
		Application.Quit();
	}
}
	