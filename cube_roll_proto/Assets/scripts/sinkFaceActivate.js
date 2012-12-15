#pragma strict


function Start () {

}

function Update () {

}


function OnTriggerEnter(col : Collider) 
{
	if(col.tag != "face")
	{
		BreadFallScript.breadFall = true;
		if(col.tag == "Jelly")
		{
			JellyMoveScript.jellyFall = true;
		}
	}
}