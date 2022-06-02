var	fenetreType=false;
var img_click_en_cours = "";
var img_langue_en_cours = "";

function langue(szLangue)
{
	if(szLangue == "fr")
	{
		szImage = "fra";
		img_langue_en_cours = "fra";
	}
	else
	{
		szImage = "eng";
		img_langue_en_cours = "eng";
	}
		
	image = eval("window.document.images['"+szImage+"']");
	img = eval(szImage+"_down");
	image.src = img.src;
}

var idMenuEnCours = "";
var classPrecedente = "";
function onClickMenuEntete(menuEntete)
{
    /*
    if (idMenuEnCours.length != 0)
    {
        document.getElementById(idMenuEnCours).className = classPrecedente;
    }
    idMenuEnCours = menuEntete.id;
    classPrecedente = menuEntete.className;
    menuEntete.className = "enteterollover";
    alert(menuEntete.className);
    */
}

function afficherUrl(szUrl)
{
   parent.basculerEcran('center');
   parent.center.document.location.href = szUrl;
}

function getXmlHttpRequestObject() {	
	
	if (window.XMLHttpRequest) {
	   return new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} 
}

function changementProfil(szProfil)
{
    document.getElementById('libelle_profil').innerHTML = szProfil;
    var menuReq = getXmlHttpRequestObject();
    if (menuReq.readyState == 4 || menuReq.readyState == 0)
    {
       	menuReq.open("GET", "../../../../interface/session/principal/ajax/get_menu_utilisateur.php", false);
       	menuReq.send(null);
	    var objAction = eval('(' + menuReq.responseText + ')');
	    if (objAction.code_retour == 1)
	   	{
	   	   document.getElementById('contenu-menu').innerHTML = objAction.contenu_menu;
		}
    }
}

function onKeyPressPleinTexte(evenement)
{
    var touche = window.event ? evenement.keyCode : evenement.which;
	if (touche == 13) {		// TOUCHE " ENTRER "
		afficherRechercheTexte();
	}
}

var objUl = null;
function affichePageToolbar(obj, nomLien, szUrl)
{
    affichePage(nomLien, szUrl);
    var objTmp = obj;
    var i = 0;
    while (objTmp != null && objTmp.nodeName != "UL" && i < 10)
    {
        objTmp = objTmp.parentNode;
        i++;
    }
    if (objTmp.nodeName == "UL")
    {
        //objTmp.style.display = "none";
        objTmp.className = "masque";
        objUl = objTmp;
        setTimeout("changeClasse();", 300);
    }
    return false;
}

function changeClasse()
{
    objUl.className = "";
}
