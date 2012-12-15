#pragma strict

var done:boolean = false;
function Start () {

}

function Update () {

}



function OnTriggerEnter(col : Collider) 
{
	//Debug.Log(col.name);
	if (!done)
	{
		if(col.name=="JellyFollower")// &&(/*other buttons done*/)
		{
			done = true;
			GetComponentInChildren(MeshRenderer).enabled = true;
			Destroy(col.transform.gameObject);
			//Destroy(gameObject);
		}
	}
}