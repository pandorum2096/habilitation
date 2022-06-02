
/**
 * Passage d'une occurence a l'autre
 */
var lien = "";
function suivant(next,current)
{
	lien = current;
	if(document.getElementById && document.all)
	{
		eval(current).className = "F3";
		eval(next).className = "F2";

		location.href="#"+eval(next).name;
	}
	else
	{
		location.href="#"+next;
	}

}