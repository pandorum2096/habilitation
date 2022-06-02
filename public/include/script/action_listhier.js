document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/popup_menu.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/fonction_util.js\"></SCRIPT>");

// Javascript qui gere l'affichage du menu popup 
// qui s'affiche sur la page de gestion des listes hierarchiques

// test ajout de listhier
function RenseignerInfosListeHier() 
{
	document.getElementById("infos_listehier").style.display = "";
}	
	
function AjouterListeHier() 
{
	var szCodeNewListeHier = document.principal.POS_CODE_NEW_LISTHIER.value;
	var szLibelleNewListeHier = document.principal.POS_LIBELLE_NEW_LISTHIER.value;
	var szUrl = "";
	if(CST_TYPE_APPLI == 1)
    	szUrl="../../../../interface/session/principal/gestionlisthier/ajouter_listhier.php?"+szUrl;
    else
  		szUrl="../../../../servlet/interface/session/principal/gestionlisthier.AjouterListhier?"+szUrl;
	szUrl += "POS_CODE_LISTHIER=" + escape(szCodeNewListeHier) + "&POS_LIBELLE_LISTHIER=" + escape(szLibelleNewListeHier);
    afficherLien(szUrl);
}



function onModifier_listhier(szListhier)
{
    szUrlModifier_listhier="";

	if(arguments.length == 0)
	{
		if(Verif_form())
			szListhier = getCheckedValue(document.principal.IDENT_LISTHIER);
		else
			return false;
			
        if(document.principal.DROIT_ADMIN_LISTHIER.value == 0)
    	{
    		parent.posMessageBoxWarning(document.principal.MESSAGE_NO_ADMIN_LISTHIER.value);
    		return false;
    	}
    }
    
	szUrl = getEncodeUrl(szListhier);
    
    if(CST_TYPE_APPLI == 1)
    	szUrlModifier_listhier="../../../../interface/session/principal/gestionlisthier/afficher_listhier.php?"+szUrl;
    else
    	szUrlModifier_listhier="../../../../servlet/interface/session/principal/gestionlisthier.AfficherListHier?"+szUrl;
	afficherLien(szUrlModifier_listhier);
}

function onSupprimer_listhier(szListhier)
{ 
    szUrlSupprimer_listhier="";

	if(arguments.length == 0)
	{
		if(Verif_form())
			szListhier = getCheckedValue(document.principal.IDENT_LISTHIER);
		else
			return false;
			
        if(document.principal.DROIT_ADMIN_LISTHIER.value == 0)
    	{
    		parent.posMessageBoxWarning(document.principal.MESSAGE_NO_ADMIN_LISTHIER.value);
    		return false;
    	}
    }
    if(!parent.posMessageBoxConfirm(document.principal.CST_MESSAGE_SUPP_LISTEHIER.value )) 
        return false;
	szUrl = getEncodeUrl(szListhier);
    if(CST_TYPE_APPLI == 1)
    	szUrlSupprimer_listhier="../../../../interface/session/principal/gestionlisthier/supprimer_listhier.php?"+szUrl;
    else
    	szUrlSupprimer_listhier="../../../../servlet/interface/session/principal/gestionlisthier.SupprimerListhier?"+szUrl;
	afficherLien(szUrlSupprimer_listhier);
}

function getContentContextMenu()
{
    var s = "";	
	for (var i=0;i<=sitems.length-1;i++)
	{
		if(sitems[i] == "<HR>")
			s+= sitems[i];
		else if(sitemlinks[i].substring(sitemlinks[i].length-2, sitemlinks[i].length) == "()")
		{
		    if(document.principal.DROIT_ADMIN_LISTHIER.value == 1)
		    {
				// ici on doit faire passer le num doc dans les parentheses de la fct.
				szNomFct = sitemlinks[i].substring(0, sitemlinks[i].length-2);
				s+='&nbsp;<IMG src=\"../../../../images/icons/lr_fleche.png\">&nbsp;<a href=\"javascript:void(0)\" onClick=\"'+szNomFct+'(\''+szInfos+'\')\">'+sitems[i]+'</a><br>';
			}
		    else
		        s+= "&nbsp;<IMG src=\"../../../../images/icons/lr_vide.png\">&nbsp;<FONT COLOR='#999999'>"+sitems[i]+"</FONT><BR>";
		}
	}
    return s;
}

