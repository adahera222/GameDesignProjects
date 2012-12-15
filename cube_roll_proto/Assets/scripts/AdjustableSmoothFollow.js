
//our target
var target : Transform;
var jellyTarget:Transform;
var target1:Transform;
var target2:Transform;
var target3:Transform;
var target4:Transform;
var target5:Transform;
var targetArray:Transform[];
var numTargets:int;
var currentTarget:int;

//distance from target
var distance = 10.0;
var formerDistance = 0.0;
//min and max distances
var distanceMin = 3;
var distanceMax = 15;

//speed of rotations when rotating
var xSpeed = 5;
var ySpeed = 5;

//should clamp rotations around x-axis but it's not really working?
var yMinLimit = 15;
var yMaxLimit = 80;

//degrees to rotate around x,y axes
var rotX = 0.0;
var rotY = 0.0;

//mouse input rotations with speed
var velX = 0.0;
var velY = 0.0;

//when resetting we want to smoothly move from these to 0
var endX = 0.0;
var endY = 0.0;
var defaultX = 0.0;

//new rotation/positions when adjusting camera
var rotation:Quaternion;
var position:Vector3;
var startPos:Vector3;

//are we resetting and how fast and long we want it to happen
static var buttonLookBread:boolean = false;
static var buttonReset:boolean = false;
var resetting:boolean = false;
var resetTime:float = 1.0;
var resetTimer:float = 0.0;

//if we are not adjusting the camera do the smoothFollow script basically
var following:boolean = true;

var lookBread:boolean = false;

// the height we want the camera to be above the target
var height = 10.0;
// How much we 
var heightDamping = 1.0;
var rotationDamping = 3.0;

@script AddComponentMenu("Camera-Control/Mouse Orbit")

function Start () {
    var angles = transform.eulerAngles;
    rotX = angles.y;
    rotY = angles.x;
    
    distance = 10.0;
    formerDistance = 10.0;
    distanceMin = 3;
    distanceMax = 15;
    xSpeed = 5;
    ySpeed = 5;
    yMinLimit = 15;
    yMaxLimit = 80;
    velX = 0.0;
    velY = 0.0;
    endX = 0.0;
    endY = 0.0;
    defaultX = 0.0;
    buttonLookBread = false;
    buttonReset = false;
    resetting = false;
    resetTime = 1.0;
    resetTimer = 0.0;
    following = true;
    height = 10.0;
    heightDamping = 1.0;
    rotationDaming = 3.0;
    
    currentTarget = -1;
    
    targetArray = new Transform[5];
    
    targetArray[0] = target1;
    targetArray[1] = target2;
    targetArray[2] = target3;
    targetArray[3] = target4;
    targetArray[4] = target5;

	// Make the rigid body not change rotation
   	if (rigidbody)
		rigidbody.freezeRotation = true;
}


function LateUpdate () {
    if (target && !GeneralLevelManager.pause) {
    	if(Input.GetKeyDown(KeyCode.F) || buttonReset) {
			target = jellyTarget;
			currentTarget = -1;
		}
    	if(!resetting && (Input.GetKeyDown(KeyCode.F) || buttonReset) && !following) //Hit F to reset camera
    	{
    		resetting = true;
    		buttonReset = false;
    		endX = rotX;
    		endY = rotY;
    		resetTimer = 0.0;
    	}
		if(!resetting && (Input.GetKeyDown(KeyCode.E) || buttonLookBread)) {
			currentTarget = (currentTarget + 1) % numTargets;
			target = targetArray[currentTarget];
		}
    	if(!resetting && (Input.GetKeyDown(KeyCode.E) || buttonLookBread)) {
    		lookBread = true;
    		following = false;
    		buttonLookBread = false;
    	}
    	if(!resetting && !following && !lookBread)
    	{
    		if(Input.GetMouseButton(0) && GUIUtility.hotControl == 0) //While mouse button is down, get rotation of mouse
    		{
        		velX += Input.GetAxis("Mouse X") * xSpeed * 0.5;
        		velY += Input.GetAxis("Mouse Y") * ySpeed * 0.5;
     		}
        	
 			//use those rotations to determine how many degrees to rotate around the y(rotY) and x(rotX) axis
 			rotY += velX;
 			rotX -= velY;
 			rotX = ClampAngle(rotX, yMinLimit, yMaxLimit); //Cant figure out why this is letting me rotate below the floor
 			rotY = ClampAngle(rotY, -45,45);
 			
 			//get distance based on scroll wheel but clamped between distanceMin and distanceMax
 			formerDistance = distance;
 			distance = Mathf.Clamp(distance - Input.GetAxis("Mouse ScrollWheel")*5, distanceMin, distanceMax);
 		       
   			//rotate rotX degrees around x-axis, rotY degrees around the y-axis, and 0 around the z
			rotation = Quaternion.Euler(rotX, rotY, 0);
		 
		 	//If the object is behind a wall or another object, bring camera close to object but clamped between distanceMin and distanceMax
			/*var hit : RaycastHit;
			if (Physics.Linecast (target.position, transform.position, hit)) {
				distance -=  hit.distance;
			}
			distance = Mathf.Clamp(distance, distanceMin, distanceMax);*/
		        	
		    position = rotation * Vector3(0.0,0.0, -distance) + target.position;
		        
		    transform.rotation = rotation;
		    transform.position = position;
        	
        	//reset input rotations
        	//velX = Mathf.Lerp(velX, 0, Time.deltaTime * 2);
            //velY = Mathf.Lerp(velY, 0, Time.deltaTime * 2);
            velX = 0;
            velY = 0;
        }
        else if(!resetting && following && !lookBread)
        {
        	// Calculate the current rotation angles
			//var wantedRotationAngle = target.eulerAngles.y;
			var wantedHeight = target.position.y + height;
		
			//var currentRotationAngle = transform.eulerAngles.y;
			var currentHeight = transform.position.y;
	
			// Damp the rotation around the y-axis
			//currentRotationAngle = Mathf.LerpAngle (currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);

			// Damp the height
			currentHeight = Mathf.Lerp (currentHeight, wantedHeight, heightDamping * Time.deltaTime);
		
			// Convert the angle into a rotation
			//var currentRotation = Quaternion.Euler (0, currentRotationAngle, 0);
			
			// Set the position of the camera on the x-z plane to:
			// distance meters behind the target
			transform.position =  Vector3(0.0,0.0, - distance) + target.position;
		
			// Set the height of the camera
			transform.position.y = currentHeight;
			
			// Always look at the target
			transform.LookAt (target);
			
			rotX = transform.eulerAngles.x;
			rotY = transform.eulerAngles.y;
			defaultX = rotX;
			startPos = transform.position;
			buttonReset = false;
			if(Input.GetMouseButton(0) && GUIUtility.hotControl == 0)
        	{
        		following = false;
        	}
		        
        }
      	else if(resetting)
        {
        	//linearly interpolate back to starting position based on resetPercent
        	resetTimer += Time.deltaTime;
        	var resetPercent = resetTimer / resetTime;
        	distance = Mathf.Lerp(distance, 10.0, resetPercent);
        	rotX = Mathf.Lerp(endX, defaultX, resetPercent);
        	rotY = Mathf.Lerp(endY, 0.0, resetPercent);
			
			rotation = Quaternion.Euler(rotX, rotY, 0);
			position = rotation * Vector3(0.0,0.0, -distance) + target.position;
		        
		    transform.rotation = rotation;
		    transform.position = position;
        	if(resetTimer > resetTime)
        	{
        		following = true;
        		lookBread = false;
        		resetting = false;
        	}
        }
        else if(lookBread) {
        	rotation = Quaternion.Euler(yMaxLimit, 0, 0);
        	position = rotation * Vector3(0.0,0.0, -1.5 * distance) + target.position;
        	transform.position = position;
        	transform.rotation = rotation;
        }	
    }
}

static function ClampAngle (angle : float, min : float, max : float) {
	if (angle < -360)
		angle += 360;
	if (angle > 360)
		angle -= 360;
	return Mathf.Clamp (angle, min, max);
}
