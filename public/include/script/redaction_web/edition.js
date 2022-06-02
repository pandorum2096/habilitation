var prefixImg = "img_";
var prefixDivTextArea = "div_textarea_";
var prefixTextArea = "textarea_";
var prefixVisu = "visu_";
var isModif = false;

/*
 * Alternance entre le mode edition via TinyMCE et le mode affichage dans un div
 */
function changerVisuEdition(img)
{
	var idTextEnCours;
	idTextEnCours = img.id.substr(prefixImg.length, (img.id.length - prefixImg.length));
	alterneVisuEditionDiv(idTextEnCours);
}

/*
 * Alternance entre le mode affichage dans un div et le mode edition via TinyMCE
 * appelé à partir de l'élément div préfixé par "prefixVisu"
 */
function changerVisuEditionDiv(div)
{
	var idTextEnCours;
	isModif = true;
	idTextEnCours = div.id.substr(prefixVisu.length, (div.id.length - prefixVisu.length));
	alterneVisuEditionDiv(idTextEnCours);

}

function alterneVisuEditionDiv(idTextEnCours)
{
	var divtextarea;
	var textarea;
	var visu;
	
	divtextarea = document.getElementById(prefixDivTextArea + idTextEnCours);
	textarea = document.getElementById(prefixTextArea + idTextEnCours);
	visu = document.getElementById(prefixVisu + idTextEnCours);
	img = document.getElementById(prefixImg + idTextEnCours);
	
	// mode visu -> mode edition
	if (divtextarea.style.display == "none")
	{
		divtextarea.style.display = "block";
		img.style.display = "block";
		visu.style.display = "none";
	}
	// mode edition -> mode visu
	else
	{
		//attention la méthode getInstanceById de tinyMCE utilise l'attribut name
		var inst = tinyMCE.getInstanceById(idTextEnCours);
		if (inst.getHTML().length == 0)
			visu.innerHTML = "...";
		else 
		visu.innerHTML = inst.getHTML();
		visu.style.display = "block";
		img.style.display = "none";
		divtextarea.style.display = "none";
	}
}

/*
 * Fermeture de la section en cours avant envoi du formulaire
 */
function beforeSubmitEdition()
{
    return true;
}

function isDocumentModifie() 
{
    return isModif;
}

/*
 * Masque les contrôles TinyMCE lors du premier affichage
 * Il ne faut pas les masquer lors de l'affichage sinon ils n'ont pas la taille requise
 */
function loadEdition()
{
	var reg = new RegExp(prefixTextArea);
	var elt;
	var iCpt;
	for(iCpt=0;iCpt<window.document.principal.elements.length;iCpt++)
	//for(elt in document.principal.elements)
    {
        a = window.document.principal.elements[iCpt].id;
        if(reg.test(a))
        {
        	document.getElementById(prefixDivTextArea + a.substring(a.lastIndexOf('_')+1, a.length)).style.display = "none";
        }
    }
}