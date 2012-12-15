var spring : float;
var damper : float;
var maxDistance : float;
var minDistance : float;
var vertexMass : float;
var bouncy : PhysicMaterial;
var xAngleClamp : float;
var yAngleClamp : float;

function Start()
{

}

function Update () 
{
	var hingeJoints = GetComponentsInChildren (SpringJoint);
	for (var joint : SpringJoint in hingeJoints) 
	{
		joint.spring = spring;
		joint.damper = damper;
		joint.maxDistance = maxDistance;
		joint.minDistance = minDistance;
		joint.connectedBody = rigidbody;
		joint.transform.localRotation = Quaternion.identity;
		joint.rigidbody.freezeRotation = true;
		joint.rigidbody.mass = vertexMass;
	}
}