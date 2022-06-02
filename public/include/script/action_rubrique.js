document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/popup_menu.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/fonction_util.js\"></SCRIPT>");

// Javascript qui gere l'affichage du menu popup 
// qui s'affiche sur la page de gestion des profils des utilisateurs.

function onCreerRubrique()
{
	if(CST_TYPE_APPLI == 1)
		szUrlCreerRubrique="../../../../interface/session/principal/gestionrubrique/afficher_modif_rubrique.php?MODE=CREATION";
	else
		szUrlCreerRubrique="../../../../servlet/interface/session/principal/gestionrubrique.AfficherModifRubrique?MODE=CREATION";
		
	afficherLien(szUrlCreerRubrique);
}

function onModifierRubrique(szInfoRubrique)
{
    szUrlModifierRubrique="";
    
	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoRubrique = getCheckedValue(document.principal.INFO_RUBRIQUE);
		else
			return false;
    }
    
	szUrl = getEncodeUrl(szInfoRubrique);
    
    if(CST_TYPE_APPLI == 1)
    	szUrlModifierRubrique="../../../../interface/session/principal/gestionrubrique/afficher_modif_rubrique.php?MODE=MODIFICATION&"+szUrl;
    else
    	szUrlModifieRubrique="../../../../servlet/interface/session/principal/gestionrubrique.AfficherModifRubrique?MODE=MODIFICATION&"+szUrl;
    
	afficherLien(szUrlModifierRubrique);
}

function onSupprimerRubrique(szInfoRubrique)
{
    szUrlSupprimerRubrique="";
    
	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoRubrique = getCheckedValue(document.principal.INFO_RUBRIQUE);
		else
			return false;
    }
	if(parent.posMessageBoxConfirm(document.principal.MESSAGE_SUPP_RUBRIQUE.value))
	{
		szUrl= getEncodeUrl(szInfoRubrique);
		
		if(CST_TYPE_APPLI == 1)
			szUrlSupprimerRubrique="../../../../interface/session/principal/gestionrubrique/modifier_rubrique.php?MODE=SUPPRESSION&"+szUrl;
		else
			szUrlSupprimerRubrique="../../../../servlet/interface/session/principal/gestionrubrique.modifierRubrique?MODE=SUPPRESSION&"+szUrl;
			
		afficherLien(szUrlSupprimerRubrique);
	}
}

function tri(arg)
{
	document.body.style.cursor='wait';
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
