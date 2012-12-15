var rate : float;
var pivotPoint : Transform;
var isRotating : boolean = false;
var movement:boolean = true;
static var jellyFall:boolean;
static var lastMove : String = "none";
static var waitForDialogue:boolean = false;


function Start ()
{
	pivotPoint.position.y = transform.position.y - 0.5;
	jellyFall = false;
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
	var dontMove:boolean = false;
	var x : RaycastHit;
	var y: GameObject;
	
	/*if(Input.GetMouseButton(1) && AdjustableSmoothFollow.allowCameraPan)
	{
		movement = false;
	}
	=
	if (Input.GetKeyDown (KeyCode.F))
	{
		movement = true;
	}*/
	if(jellyFall) {
		transform.position.y -= Time.deltaTime;
	}
	
	if (isRotating == false && !waitForDialogue && !jellyFall)
	{
		if ((Input.GetKeyDown (KeyCode.RightArrow) ) && (movement))
		{
			lastMove = "right";
			if(Physics.Raycast(transform.position, Vector3.right, x))
			{
				y = x.transform.gameObject;
				//Debug.Log("right"+x.distance);
				if( (x.distance <= .6) && ((y.tag=="Jelly") || (y.tag == "wall") || ( (y.tag == "other") && (y.GetComponent(AdjacentBlockMoveScript).right))))
				{
					//Debug.Log("cant move right");
					dontMove = true;
				}
			}
			if(!dontMove)
			{
				rotateRight (90.0, .175);
				audio.Play();
			}
		}
		else if ((Input.GetKeyDown (KeyCode.LeftArrow) ) && (movement))
		{	
			lastMove = "left";
			if(Physics.Raycast(transform.position, Vector3.left, x))
			{
				y = x.transform.gameObject;
				//Debug.Log("left"+x.distance);
				if( (x.distance <= .6) && ((y.tag=="Jelly")||(y.tag == "wall") || ( (y.tag == "other") && (y.GetComponent(AdjacentBlockMoveScript).left))))
				{
					//Debug.Log("cant move left");
					dontMove = true;
				}
			}
			if(!dontMove)
			{
				rotateLeft (90.0, .175);
				audio.Play();
			}
		}
		else if ((Input.GetKeyDown (KeyCode.UpArrow) ) && (movement))
		{
			lastMove = "up";
			if(Physics.Raycast(transform.position, Vector3.forward, x))
			{
				
				y = x.transform.gameObject;
				//Debug.Log("up"+x.distance);
				if( (x.distance <= .6) && ((y.tag=="Jelly")||(y.tag == "wall") || ( (y.tag == "other") && (y.GetComponent(AdjacentBlockMoveScript).up))))
				{
					//Debug.Log("cant move up");
					dontMove = true;
				}
			}
			if(!dontMove)
			{
				rotateUp (90.0, .175);
				audio.Play();
			}
		}
		else if ((Input.GetKeyDown (KeyCode.DownArrow) ) && (movement))
		{
			lastMove = "down";
			if(Physics.Raycast(transform.position, Vector3.back, x))
			{
				
				y = x.transform.gameObject;
				//Debug.Log("down"+x.distance);
				if( (x.distance <= .6) && ((y.tag=="Jelly")||(y.tag == "wall") || ( (y.tag == "other") && (y.GetComponent(AdjacentBlockMoveScript).down))))				
				{
					//Debug.Log("cant move down");
					dontMove = true;
				}
			}
			if(!dontMove)
			{
				rotateDown (90.0, .175);
				audio.Play();
			}
		}
		dontMove = false;
	}
}

function OnTriggerEnter(col : Collider) 
{

}