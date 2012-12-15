var rate : float;
var pivotPoint : Transform;
var isRotating : boolean = false;
var move :boolean = false;
var neighbors:Vector3[];
var up:boolean = false;
var down:boolean = false;
var right:boolean = false;
var left:boolean = false;


function Start ()
{
	neighbors = new Vector3[4];
	neighbors[0] = Vector3.forward;
	neighbors[1] = Vector3.right;
	neighbors[2] = Vector3.back;
	neighbors[3] = Vector3.left;
	pivotPoint.position.y = transform.position.y - 0.5;
}

function rotateRight (degrees : float, time : float)
{
	rate = 1.0 / time;
		
	pivotPoint.position.x = transform.position.x + 0.5;
	transform.parent = pivotPoint;
	isRotating = true;
	
	for (t = 0.0; t < 1.0; t += Time.deltaTime * rate)
	{
		pivotPoint.transform.eulerAngles.z = t * (-degrees);
		yield;
	}
	
	pivotPoint.localEulerAngles.z = -degrees;
	transform.parent = null;
	pivotPoint.rotation = Quaternion.identity;
	isRotating = false;
}

function rotateLeft (degrees : float, time : float)
{
	rate = 1.0 / time;
		
	pivotPoint.position.x = transform.position.x + -0.5;
	transform.parent = pivotPoint;
	isRotating = true;
	
	for (t = 0.0; t < 1.0; t += Time.deltaTime * rate)
	{
		pivotPoint.transform.eulerAngles.z = t * (degrees);
		yield;
	}
	
	pivotPoint.localEulerAngles.z = degrees;
	transform.parent = null;
	pivotPoint.rotation = Quaternion.identity;
	isRotating = false;
}

function rotateUp (degrees : float, time : float)
{
	rate = 1.0 / time;
		
	pivotPoint.position.z = transform.position.z + 0.5;
	transform.parent = pivotPoint;
	isRotating = true;
	
	for (t = 0.0; t < 1.0; t += Time.deltaTime * rate)
	{
		pivotPoint.transform.eulerAngles.x = t * (degrees);
		yield;
	}
	
	pivotPoint.localEulerAngles.x = degrees;
	transform.parent = null;
	pivotPoint.rotation = Quaternion.identity;
	isRotating = false;
}

function rotateDown (degrees : float, time : float)
{
	rate = 1.0 / time;
	
	pivotPoint.position.z = transform.position.z - 0.5;
	transform.parent = pivotPoint;
	isRotating = true;
	
	for (t = 0.0; t < 1.0; t += Time.deltaTime * rate)
	{
		pivotPoint.transform.eulerAngles.x = t * (-degrees);
		yield;
	}
	
	pivotPoint.localEulerAngles.x = -degrees;
	transform.parent = null;
	pivotPoint.rotation = Quaternion.identity;
	isRotating = false;
}

function Update ()
{
	var x : RaycastHit;
	for(var i = 0; i < 4; i++)
	{
		if(Physics.Raycast(transform.position, neighbors[i], x, .6))
		{
			if((x.transform.gameObject.tag == "wall") || (x.transform.gameObject.tag == "other"))
			{
				
				if(i == 0){
					up = true;
					//Debug.Log("up"+x.distance);
				}
				else if (i == 1){
					right = true;
					//Debug.Log("right"+x.distance);
				}
				else if (i == 2){
					down = true;
					//Debug.Log("down"+x.distance);
				}
				else if (i == 3){
					left = true;
					//Debug.Log("left"+x.distance);
				}
			}
		}
		else
			{
				if(i == 0)
					up = false;
				else if (i == 1)
					right = false;
				else if (i == 2)
					down = false;
				else if (i == 3)
					left = false;
			}
	}
	
	if(move)
	{
			if (JellyMoveScript.lastMove == "right")
			{
				if(!right)
				{
					audio.Play();
					rotateRight(90.0, .125);
				}
				move = false;
			}
			else if (JellyMoveScript.lastMove == "left") 
			{
				if(!left)
				{
					audio.Play();
					rotateLeft(90.0, .125);
				}
				move = false;
			}
			else if (JellyMoveScript.lastMove == "up")
			{
				if(!up)
				{
					audio.Play();
					rotateUp (90.0, .125);
				}
				move = false;
			}
			else if (JellyMoveScript.lastMove == "down") 
			{
				if(!down)
				{
					audio.Play();
					rotateDown (90.0, .125);
				}
				move = false;
			}
			up = false;
			down = false;
			left = false;
			right = false;
	}	
}

function OnTriggerEnter(col : Collider) 
{
	var x : RaycastHit;
	var y: GameObject;
	//Debug.Log(col.tag);
	if((col.tag == "Jelly") || (col.tag == "other"))
	{	
		if (isRotating == false)
		{
				for(var i = 0; i < 4; i++)
				{
							if(Physics.Raycast(transform.position, neighbors[i], x, .55))
							{
								y = x.transform.gameObject;
								
								//Debug.Log("object hit: " + y.name);
								//Debug.Log("direction:" + i + "dist" + x.distance);
								if (x.distance <= .55)
								{
										move = true;
										//Debug.Log("move for adjblock is true");
										break;
								}
							}
				}
		}
	}
}