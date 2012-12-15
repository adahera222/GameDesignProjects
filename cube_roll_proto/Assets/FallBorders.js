#pragma strict
var endtimer:boolean = false;
var timer :float =0.0;

function Start () {

}

function Update () {
	
	if(endtimer)
	{
		timer +=Time.deltaTime;
	}
	if(timer > 4.0)
		Application.LoadLevel(Application.loadedLevel);

}


function OnTriggerEnter(col : Collider) 
{
	Debug.Log(col.name);
	if ((col.tag == "other") ||(col.tag == "Jelly"))
	{
		Debug.Log("FALL");
		col.rigidbody.isKinematic = false;
		col.rigidbody.useGravity = true;
		endtimer = true;
	}
	if (col.tag == "joints")
	{
		col.gameObject.transform.parent.gameObject.rigidbody.isKinematic = false;
		col.gameObject.transform.parent.gameObject.rigidbody.useGravity = true;
		endtimer = true;
	}

}