 document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");

var szUrlAccueil = "../../../../interface/accueil.htm";
// fermeture avec actualisation de la liste r�sum�e
function fermeture(bAccueil, bActualisation)
{
    if(window.name == "afficher_lien") {
        location.href = parent.parent.sUrlCurrentAssocation;        
    }
	else if (opener)
	  window.close();
	else
	{
        window.location.href = szUrlAccueil;
        // la frame centrale contient une liste de resultat : 
        // c'est � dire que l'on est pas sur la frame centrale (ex : creation, recherche, ouverture d'un doc � partir de la page d'accueil)
        if (parent.center.actualiser)
		{
		    // lien depuis le menu pas de r�affichage de la liste de resultats
		    if (!bAccueil && parent.bLienMenu == 0)
		    {
                if (bActualisation)
                    parent.center.actualiser();
                parent.basculerEcran('center');
            }
        }
        else
        {
            if (!bAccueil && parent.bLienMenu == 0)
                parent.basculerEcran('centerbal');
        }
        parent.bLienMenu = 0;
        parent.closeOnglet(window.frameElement.id);
	}
}

function getUrlFermer()
{
	var szUrlFermer;
	if(CST_TYPE_APPLI == 1)
		szUrlFermer = "../../../../interface/session/principal/consultation/fermer_index.php";
	else 
		szUrlFermer = "../../../../servlet/interface/session/principal/consultation.FermerIndex"; 
	return szUrlFermer;
}

function FermerIndex()
{
	szUrl = getUrlFermer();
	szUrl += "?B_FORCE_CLOSE=1";
	szUrl += "&POS_NUM_DOC=";
	szUrl += document.principal.POS_NUM_DOC.value
	szUrl += "&MODE=";
	szUrl += document.principal.MODE.value;
	window.location.href = szUrl;
}

function FermerIndexFromIndex(mode, frmId)
{
    // en mode consultation, ferme la fen�tre sans raffraichissement de la liste de resultat
    // comme dans le cas de la fermeture pas la croix.
    // Cela permet de retourner sur l'onglet du document precedemment uvert et non pas sur 
    // la fenetre de resultat
    if (parent.document.getElementById(frmId) != null && document.principal.MODE &&
            document.principal.MODE.value == "CONSULTATION")
        parent.closeOngletDocByCross(frmId);
    else
        if (PosConfirmFermerIndexTestModif()) {
            var szUrl = getUrlFermer();
        	szUrl += "?POS_NUM_DOC=";
        	szUrl += document.principal.POS_NUM_DOC.value
        	szUrl += "&MODE=";
        	szUrl += document.principal.MODE.value;
        	window.location.href = szUrl;
        }
}

function PosConfirmFermerIndexTestModif()
{
    var bChampModif = false;
    try {
    	bChampModif = getIfChampModif(document.principal);
	}
	catch(e) {
	}

    return (!bChampModif||(bChampModif && (parent.posMessageBoxConfirm("CST_JS_CONFIRM_PERDRE_MODIF"))))
}

function effaceMenu()
{
    // on ne fait rien le menu n'existe pas.
}