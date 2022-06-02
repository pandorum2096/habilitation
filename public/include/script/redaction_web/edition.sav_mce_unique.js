/*
 *
 */ 
var prefixImg = "img_";
var prefixDivTextArea = "div_textarea_";
var prefixTextArea = "textarea_";
var prefixVisu = "visu_";
var idDivCommun = "div_commun_postext";
var isModif = false;
var tabIsModifSection = new Array();

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
	// si une section est déjà en cours d'édition
    if (document.getElementById(idDivCommun).style.display != "none")
	{
	   var parentId = document.getElementById(idDivCommun).parentNode.id;
	   var idTextPrecedent = parentId.substr(prefixDivTextArea.length, (parentId.length - prefixDivTextArea.length));
	   alterneVisuEditionDiv(idTextPrecedent);
    }

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
	if (visu.style.display != "none")
	{
		//divtextarea.style.display = "block";
		tabIsModifSection[idTextEnCours] = true;
		img.style.display = "block";
		visu.style.display = "none";
		divtextarea.appendChild(document.getElementById(idDivCommun));
        document.getElementById(idDivCommun).style.display = "inline";
		//attention la méthode getInstanceById de tinyMCE utilise l'attribut name
		var inst = tinyMCE.getInstanceById("textarea_commun_postext");
		inst.setHTML(visu.innerHTML);
	}
	// mode edition -> mode visu
	else
	{
		//attention la méthode getInstanceById de tinyMCE utilise l'attribut name
		var inst = tinyMCE.getInstanceById("textarea_commun_postext");
		
		if (inst.getHTML().length == 0)
			visu.innerHTML = "...";
		else 
		visu.innerHTML = inst.getHTML();
			
		textarea.value = inst.getHTML();
		
		visu.style.display = "block";
		img.style.display = "none";
		document.getElementById(idDivCommun).style.display = "none";
	}
}

/*
 * Fermeture de la section en cours avant envoi du formulaire
 */
function beforeSubmitEdition()
{
    // si une section est déjà en cours d'édition
    if (document.getElementById(idDivCommun).style.display != "none")
	{
	   var parentId = document.getElementById(idDivCommun).parentNode.id;
	   var idTextPrecedent = parentId.substr(prefixDivTextArea.length, (parentId.length - prefixDivTextArea.length));
	   alterneVisuEditionDiv(idTextPrecedent);
    }
    alert("4");
    var elt;
    for(elt in tabIsModifSection)
    {
        if (tabIsModifSection[elt] == false)
        {
            // réaffichage du texte dans le controle TinyMCE sinon problème sur les caractères spéciaux html 
            // &amp; => &, &quot=>" 
            //var visu = document.getElementById(prefixVisu + idTextEnCours);
            var inst = tinyMCE.getInstanceById("textarea_commun_postext");
		    inst.setHTML(document.getElementById(prefixVisu + elt).innerHTML);
		    textarea.value = inst.getHTML();
            // document.getElementById(prefixTextArea + elt).value = document.getElementById(prefixVisu + elt).innerHTML;
            // alterneVisuEditionDiv(elt);
            //alert("Element non modifié : " + elt);
        }
    }
    /*
    var s = "";
    //for(iCpt=0;iCpt<document.getElementById("textarea_postext3").elements.length;iCpt++)
    alert("valeur : " + document.getElementById("textarea_postext3").value);
    alert("outerHTML : " + document.getElementById("textarea_postext3").outerHTML);
    alert("defaultValue : " + document.getElementById("textarea_postext3").defaultValue);
    */
    
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
    document.getElementById("div_commun_postext").style.display = "none";
    
    var reg = new RegExp(prefixTextArea);
	var elt;
	var iCpt;
	for(iCpt=0;iCpt<window.document.principal.elements.length;iCpt++)
	//for(elt in document.principal.elements)
    {
        a = window.document.principal.elements[iCpt].id;
        if(reg.test(a) && a != "textarea_commun_postext")
        {
            tabIsModifSection[a.substring(a.lastIndexOf('_')+1, a.length)] = false;
            //if (document.getElementById(prefixDivTextArea + a.substring(a.lastIndexOf('_')+1, a.length)))
        	//document.getElementById(prefixDivTextArea + a.substring(a.lastIndexOf('_')+1, a.length)).style.display = "none";
        }
    }
}
