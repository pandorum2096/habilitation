document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/popup_menu.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/fonction_util.js\"></SCRIPT>");

// Javascript qui gere l'affichage du menu popup 
// qui s'affiche sur la page de gestion des profils des utilisateurs.

function onCreerTypeDoc()
{
	if(CST_TYPE_APPLI == 1)
		szUrlCreerTypeDoc="../../../../interface/session/principal/gestiontypedoc/afficher_modif_typedoc.php?MODE=CREATION";
	else
		szUrlCreerTypeDoc="../../../../servlet/interface/session/principal/gestiontypedoc.AfficherModifTypeDoc?MODE=CREATION";
		
	afficherLien(szUrlCreerTypeDoc);
}

function onModifierTypeDoc(szInfoTypeDoc)
{
    szUrlModifierTypeDoc="";
    
	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoTypeDoc = getCheckedValue(document.principal.INFO_TYPEDOC);
		else
			return false;
    }
    
	szUrl = getEncodeUrl(szInfoTypeDoc);
    
    if(CST_TYPE_APPLI == 1)
    	szUrlModifierTypeDoc="../../../../interface/session/principal/gestiontypedoc/afficher_modif_typedoc.php?MODE=MODIFICATION&"+szUrl;
    else
    	szUrlModifieTypeDoc="../../../../servlet/interface/session/principal/gestiontypedoc.AfficherModifTypeDoc?MODE=MODIFICATION&"+szUrl;
    
	afficherLien(szUrlModifierTypeDoc);
}

function onSupprimerTypeDoc(szInfoTypeDoc)
{
    szUrlSupprimerTypeDoc="";
    
	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoTypeDoc = getCheckedValue(document.principal.INFO_TYPEDOC);
		else
			return false;
    }
	if(parent.posMessageBoxConfirm(document.principal.MESSAGE_SUPP_TYPEDOC.value))
	{
		szUrl= getEncodeUrl(szInfoTypeDoc);
		
		if(CST_TYPE_APPLI == 1)
			szUrlSupprimerTypeDoc="../../../../interface/session/principal/gestiontypedoc/modifier_typedoc.php?MODE=SUPPRESSION&"+szUrl;
		else
			szUrlSupprimerTypeDoc="../../../../servlet/interface/session/principal/gestiontypedoc.modifierTypeDoc?MODE=SUPPRESSION&"+szUrl;
			
		afficherLien(szUrlSupprimerTypeDoc);
	}
}

function onAfficherFicheParam(szInfoTypeDoc)
{
	if(arguments.length == 0)
	{ 
		if(Verif_form())
		{	
			szInfoTypeDoc = getCheckedValue(document.principal.INFO_TYPEDOC);		
		}
		else
			return false;
    }
    
	var tabFicheParam = new Array();
	tabFicheParam = szInfoTypeDoc.split("&POS_BOOL_FICHE_PARAM=");
	var bExistFicheParam = tabFicheParam[1].charAt(0);
	var szModeAfficheFicheParam = "";
	
	if (bExistFicheParam != 1)
	{
		if(!confirm("Il n'y a pas de fiche paramétrée pour ce type de document. Voulez vous en créer une ?"))
			return false;
		else
			szModeAfficheFicheParam = "CREATION";
	}
	else 
		szModeAfficheFicheParam = "MODIFICATION";
		
	szUrlAfficherFicheParam="";

			
    szInfoTypeDoc += "&MODE_AFFICHE_FICHE_PARAM=" + szModeAfficheFicheParam; 
    szUrl = getEncodeUrl(szInfoTypeDoc);
	
// 	if(CST_TYPE_APPLI == 1)
// 		szUrlAfficherFicheParam="../../../../interface/session/principal/fip/afficher_modif_fip.php?"+szUrl;
// 	else
// 		szUrlAfficherFicheParam="../../../../servlet/interface/session/principal/fip/AfficherModifFip?"+szUrl;
		
	if(CST_TYPE_APPLI == 1)
		szUrlAfficherFicheParam="../../../../interface/session/principal/fip/afficher_profil_fip.php?"+szUrl;
	else
		szUrlAfficherFicheParam="../../../../servlet/interface/session/principal/fip/AfficherProfilFip?"+szUrl;

	afficherLien(szUrlAfficherFicheParam);
	
}
function tri(arg)
{
	document.body.style.cursor='wait';
	document.getElementById("table_liste_typedoc").style.cursor='wait';
	document.location.href=document.principal.URL_TRI.value+"?POS_TRI_COL="+arg;
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
		    if(document.principal.DROIT_ADMINISTRATION.value == 1)
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
