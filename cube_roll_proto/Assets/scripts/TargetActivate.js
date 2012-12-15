#pragma strict

var sounds: AudioClip[];

function PlayRandom()
{
    if (audio.isPlaying) return; 
    audio.clip = sounds[Random.Range(0,sounds.length)];
    audio.Play();
}

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
		if((col.tag == "other")||(col.name=="JellyFollower"))
		{
			done = true;
			PlayRandom();
			GetComponentInChildren(MeshRenderer).enabled = true;
			Destroy(col.transform.gameObject);
			//Destroy(gameObject);
		}
	}
}