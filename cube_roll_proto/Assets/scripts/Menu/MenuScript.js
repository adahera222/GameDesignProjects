#pragma strict

var customSkin:GUISkin;

var menuTexture:Texture2D;

var halfScreenW:float;
var halfScreenH:float;
var buttonWidth:float;
var buttonHeight:float;

function Start () {
	halfScreenW = Screen.width/2;
	halfScreenH = Screen.height/2;
	buttonWidth = Screen.width * (300.0/1920.0);
	buttonHeight = Screen.height * (100.0/1080.0);
}

function Update () {

}

function OnGUI() {
	GUI.skin = customSkin;
	GUI.DrawTexture(Rect(0,0, Screen.width, Screen.height), menuTexture, ScaleMode.StretchToFill, false);
	DrawButtons();
}

function DrawButtons() {
	var xstart:float = halfScreenW - (buttonWidth/2) - (buttonWidth/16);
	var ystart:float = halfScreenH - (halfScreenH/2) - (halfScreenH/16);
	if(GUI.Button(Rect(xstart, ystart, buttonWidth, buttonHeight), GUIContent("PLAY", "Play current level"))) {
		var curLevel:int = PlayerPrefs.GetInt("LevelsUnlocked");
		curLevel += 1;
		Application.LoadLevel("level"+curLevel.ToString());
	}
	if(GUI.Button(Rect(xstart, ystart + buttonHeight, buttonWidth, buttonHeight), GUIContent("LEVELS", "Select a level"))) {
		Application.LoadLevel("levelselect");
	}
	if(GUI.Button(Rect(xstart, ystart + 2 * buttonHeight, buttonWidth, buttonHeight), GUIContent("GRAPHICS", "Graphics Options"))) {
		Application.LoadLevel("graphicsmenu");
	}
	if(GUI.Button(Rect(halfScreenW, ystart + buttonHeight * 6, buttonWidth, buttonHeight), "INTRO")) {
		Application.LoadLevel("intro");
	}
	if(GUI.Button(Rect(halfScreenW - buttonWidth - (buttonWidth/8), ystart + buttonHeight * 6, buttonWidth, buttonHeight), "EXIT")) {
		Application.Quit();
	}
	if(GUI.tooltip == "Play current level") {
		GUI.Label(Rect(xstart + buttonWidth + (buttonWidth/6), ystart + (buttonHeight/3), buttonWidth, buttonHeight), GUI.tooltip);
	}
	else if(GUI.tooltip == "Select a level") {
		GUI.Label(Rect(xstart + buttonWidth + (buttonWidth/6), ystart + buttonHeight + (buttonHeight/3), buttonWidth, buttonHeight), GUI.tooltip);
	}
	else if(GUI.tooltip == "Graphics Options") {
		GUI.Label(Rect(xstart + buttonWidth + (buttonWidth/6), ystart + 2 * buttonHeight + (buttonHeight/3), buttonWidth, buttonHeight), GUI.tooltip);
	}
}
