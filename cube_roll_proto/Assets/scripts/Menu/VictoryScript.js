#pragma strict

var victoryBackground:Texture2D;
var customSkin:GUISkin;

var halfScreenW:float;
var halfScreenH:float;
var buttonWidth:float;
var buttonHeight:float;

function Start () {
halfScreenW = Screen.width/2;
	halfScreenH = Screen.height/2;
	buttonWidth = Screen.width * (400.0/1920.0);
	buttonHeight = Screen.height * (150.0/1080.0);
}

function Update () {

}

function OnGUI () {
	GUI.skin = customSkin;
	GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height), victoryBackground, ScaleMode.StretchToFill, false);
	
	var xstart:float = Screen.width * (10.0/1920.0);
	var ystart:float = Screen.height * (10.0/1080.0);
	
	GUI.Box(Rect(xstart, ystart, Screen.width * (1900.0/1920.0), Screen.height * (300.0/1080.0)), "Congratulations! You've won!");
	
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
