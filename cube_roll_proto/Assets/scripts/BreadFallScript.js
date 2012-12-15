#pragma strict

static var breadFall:boolean;
var time:float;

function Start () {
	time = 0.0;
	breadFall = false;
}

function Update () {
	if(breadFall) {
		time += Time.deltaTime;
		transform.position.y -= time;
	}
	if(time >= 1) {
		Application.LoadLevel(Application.loadedLevel);
	}
}