#pragma strict

var customSkin:GUISkin;

var introTexture:Texture2D;

var halfScreenW:float;
var halfScreenH:float;
var buttonWidth:float;
var buttonHeight:float;

function Start () {
	halfScreenW = Screen.width/2;
	halfScreenH = Screen.height/2;
	buttonWidth = Screen.width * (400.0/1920.0);
	buttonHeight = Screen.height * (150.0/1080.0);
	PlayerPrefs.SetInt("LevelsUnlocked", 0);
	//Debug.Log(halfScreenW);
	//Debug.Log(halfScreenH);
	//Debug.Log(buttonWidth);
	//Debug.Log(buttonHeight);
}

function Update () {

}

function OnGUI() {
	GUI.skin = customSkin;
	GUI.DrawTexture(Rect(0,0, Screen.width, Screen.height), introTexture, ScaleMode.StretchToFill, false);
	DrawButtons();
}

function DrawButtons() {
	var xstart:float = halfScreenW - (buttonWidth/4);
	var ystart:float = halfScreenH + (halfScreenH/4) + (halfScreenH/8);
	if(GUI.Button(Rect(xstart, ystart, buttonWidth, buttonHeight), "MENU")) {
		Application.LoadLevel("menu");
	}
	if(GUI.Button(Rect(xstart + buttonWidth + (buttonWidth/8), ystart, buttonWidth, buttonHeight), "EXIT")) {
		Application.Quit();
	}
}
