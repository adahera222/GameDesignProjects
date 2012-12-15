#pragma strict

var customSkin:GUISkin;
var camSkin:GUISkin;
var menuTexture:Texture2D;
var instrTexture:Texture2D;
var halfScreenW:float;
var halfScreenH:float;
var drawMenu:boolean = false;
var drawInstructions:boolean = false;
static var pause:boolean = false;

function Start () {
	halfScreenW = Screen.width/2;
	halfScreenH = Screen.height/2;
}

function Update () {
		
	var x = GameObject.FindGameObjectsWithTag("other").Length + GameObject.FindGameObjectsWithTag("Jelly").Length;
	if(x <= 1)
	{
		var currentLevel:int = PlayerPrefs.GetInt("LevelsUnlocked");
		PlayerPrefs.SetInt("LevelsUnlocked", currentLevel + 1);
		Application.LoadLevel(Application.loadedLevel + 1);	
	}


}

function OnGUI () {
	GUI.skin = customSkin;
	GUI.depth = 0;
	var xstart:float = Screen.width * (10.0/1920.0);
	var ystart:float = Screen.height * (10.0/1080.0);
	var buttonWidth:float = Screen.width * (250.0/1920.0);
	var buttonHeight:float = Screen.height * (50.0/1080.0);
	if(GUI.Button(Rect(xstart, ystart, buttonWidth, buttonHeight), "Menu"))
	{
		if(!drawMenu && !drawInstructions)
		{
			drawMenu = true;
			pause = true;
		}
		else if(!drawInstructions)
		{
			drawMenu = false;
			pause = false;
		}
	}
	if(GUI.Button(Rect(xstart + buttonWidth + (buttonWidth/16), ystart, buttonWidth, buttonHeight), "Reset Camera"))
	{
		if(!drawMenu && !drawInstructions)
		{
			AdjustableSmoothFollow.buttonReset = true;
		}
	}
	if(GUI.Button(Rect(xstart + 2 * (buttonWidth + (buttonWidth/16)), ystart, buttonWidth, buttonHeight), "Reset Level"))
	{
		if(!drawMenu && !drawInstructions)
		{
			Application.LoadLevel(Application.loadedLevel);
		}
	}
	if(GUI.Button(Rect(xstart + 3 * (buttonWidth + (buttonWidth/16)), ystart, buttonWidth, buttonHeight), "Find Next Bread"))
	{
		if(!drawMenu && !drawInstructions)
		{
			AdjustableSmoothFollow.buttonLookBread = true;
		}
	}
	if(GUI.Button(Rect(xstart + 4 * (buttonWidth + (buttonWidth/16)), ystart, buttonWidth, buttonHeight), "Instructions"))
	{
		if(!drawInstructions)
		{
			drawInstructions = true;
			pause = true;
		}
	}
	if(drawInstructions)
	{
		DrawInstructions();
	}
	if(drawMenu)
	{
		DrawMenu();
	}
	GUI.skin = camSkin;
	if(!drawInstructions)
	{
		GUI.Box(Rect(Screen.width/2 + Screen.width/3, Screen.height * (10.0/1080.0), Screen.width * (250.0/1920.0), Screen.height * (600.0/1920.0)), "\n Camera Controls: \n \n Left click to pivot camera \n  \nScroll Wheel to zoom in/out");
	}
}

function DrawInstructions () {
	var buttonWidth:float = Screen.width * (300/1920.0);
	var buttonHeight:float = Screen.width * (50.0/1080.0);
	var xstart:float = halfScreenW - (buttonWidth/2) - (buttonWidth/16);
	var ystart:float = halfScreenH - (halfScreenH/2) - (halfScreenH/16);
	
	GUI.DrawTexture(Rect(0,0, Screen.width, Screen.height), instrTexture, ScaleMode.StretchToFill, false);
	
	if(GUI.Button(Rect(halfScreenW + buttonWidth + buttonWidth/2, ystart + buttonHeight * 6, buttonWidth, buttonHeight), "RETURN")) {
		drawInstructions = false;
		if(!drawMenu)
		{
			pause = false;
		}
	}
}

function DrawMenu () {
	var menuWidth:float = Screen.width * (300.0/1920.0);
	var menuHeight:float = Screen.height * (700.0/1080.0);
	var xstart:float = halfScreenW - (menuWidth / 2);
	var ystart:float = Screen.height * (100.0/1080.0);
	var buttonWidth:float = Screen.width * (200.0/1920.0);
	var buttonHeight:float = Screen.height * (75.0/1080.0);
	
	GUI.DrawTexture(Rect(xstart, ystart, menuWidth, menuHeight), menuTexture);
	
	if(GUI.Button(Rect(xstart + (buttonWidth/5) + (buttonWidth/18), ystart + buttonHeight + (buttonHeight/2), buttonWidth, buttonHeight), "Main Menu")) {
		JellyMoveScript.waitForDialogue = false;
		pause = false;
		Application.LoadLevel("menu");
	}

	if(GUI.Button(Rect(xstart + (buttonWidth/5) + (buttonWidth/18), ystart + 2* buttonHeight + (buttonHeight/2), buttonWidth, buttonHeight), "Level Select")) {
		JellyMoveScript.waitForDialogue = false;
		pause = false;
		Application.LoadLevel("levelselect");
	}
	if(GUI.Button(Rect(xstart + (buttonWidth/5) + (buttonWidth/18), ystart + 7 * (buttonHeight + (buttonHeight/10)), buttonWidth, buttonHeight), "Return"))
	{
		drawMenu = false;
		pause = false;
	}
	
}