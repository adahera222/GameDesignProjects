#pragma strict


function Start () {

}

function Update () {

}


function OnTriggerEnter(col : Collider) 
{
	//Debug.Log(col.tag);
	if(col.tag == "face")
	{
		//Debug.Log("destroy");
		GetComponentInChildren(MeshRenderer).enabled = true;
		Destroy(col.transform.parent.gameObject);
		//Destroy(gameObject);
	}
	else
	{
		BreadFallScript.breadFall = true;
		if(col.tag == "Jelly")
		{
			//JellyMoveScript.jellyFall = true;
		}
	}
}