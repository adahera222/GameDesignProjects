#pragma strict

var customSkin:GUISkin;

var menuTexture:Texture2D;

var defaultReturn:Texture2D;
var hoverReturn:Texture2D;
var clickedReturn:Texture2D;

var returnDraw:Texture2D;

var clicked:boolean = false;

var halfScreenW:float;
var halfScreenH:float;
var buttonWidth:float;
var buttonHeight:float;

var selectedResolution:int;
var previousResolution:int;
var resolutions:Resolution[];
var resStrings:String[];

var res800x600:Resolution;
var res1200x780:Resolution;
var res1680x1050:Resolution;
var res1920x1080:Resolution;

var fullScreen:boolean;

function Start () {
	halfScreenW = Screen.width/2;
	halfScreenH = Screen.height/2;
	buttonWidth = Screen.width * (300.0/1920.0);
	buttonHeight = Screen.height * (100.0/1080.0);
	
	resolutions = new Resolution[4];
	resStrings = new String[4];
	
	resStrings[0] = "800x600";
	res800x600.width = 800;
	res800x600.height = 600;
	resolutions[0] = res800x600;
	resStrings[1] = "1200x780";
	res1200x780.width = 1200;
	res1200x780.height = 780;
	resolutions[1] = res1200x780;
	resStrings[2] = "1680x1050";
	res1680x1050.width = 1680;
	res1680x1050.height = 1050;
	resolutions[2] = res1680x1050;
	resStrings[3] = "1920x1080";
	res1920x1080.width = 1920;
	res1920x1080.height = 1080;
	resolutions[3] = res1920x1080;
	
	var currentResolution:Resolution = Screen.currentResolution;
	for(var i = 0; i < 4; i++) {
		if((currentResolution.width == resolutions[i].width) && (currentResolution.height == resolutions[i].height)) {
			break;
		}
	}
	
	selectedResolution = i;	
	previousResolution = i;
	fullScreen = Screen.fullScreen;
}

function Update () {
	halfScreenW = Screen.width/2;
	halfScreenH = Screen.height/2;
	buttonWidth = Screen.width * (300.0/1920.0);
	buttonHeight = Screen.height * (100.0/1080.0);

}

function OnGUI() {
	GUI.skin = customSkin;
	var xstart = halfScreenW - (buttonWidth/2) - (buttonWidth/16);
	var ystart = halfScreenH - (halfScreenH/2) - (halfScreenH/16);
	GUI.DrawTexture(Rect(0,0, Screen.width, Screen.height), menuTexture, ScaleMode.StretchToFill, false);
	selectedResolution = GUI.SelectionGrid(Rect(xstart, ystart, buttonWidth, buttonHeight * resolutions.Length), previousResolution, resStrings, 1);
	previousResolution = selectedResolution;
	fullScreen = GUI.Toggle(Rect(xstart + (buttonWidth/4), ystart + (buttonHeight * resolutions.Length) + buttonHeight, buttonWidth, buttonHeight), fullScreen, "Full Screen");
	if(GUI.Button(Rect(halfScreenW - buttonWidth - (buttonWidth/8), ystart + (buttonHeight * resolutions.Length) + buttonHeight * 2, buttonWidth, buttonHeight), "ACCEPT")) {
		Screen.SetResolution(resolutions[selectedResolution].width, resolutions[selectedResolution].height, fullScreen);
	}
	if(GUI.Button(Rect(halfScreenW, ystart + (buttonHeight * resolutions.Length) + buttonHeight * 2, buttonWidth, buttonHeight), "RETURN")) {
		Application.LoadLevel("menu");
	}
}