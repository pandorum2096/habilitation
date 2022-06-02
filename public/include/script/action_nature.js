document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/popup_menu.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/fonction_util.js\"></SCRIPT>");

// Javascript qui gere l'affichage du menu popup 
// qui s'affiche sur la page de gestion des profils des utilisateurs.

function onCreerNature()
{
    if(document.principal.DROIT_ADMINISTRATION.value == 0)
	{
		parent.posMessageBoxWarning(document.principal.MESSAGE_NO_ADMINISTRATION.value);
		return false;
	}
	if(CST_TYPE_APPLI == 1)
		szUrlCreerNature="../../../../interface/session/principal/gestionnature/afficher_modif_nature.php?MODE=CREATION";
	else
		szUrlCreerNature="../../../../servlet/interface/session/principal/gestionnature.AfficherModifNature?MODE=CREATION";
		
	afficherLien(szUrlCreerNature);
}

function onModifierNature(szInfoNature)
{
    var szUrlModifierNature="";
	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoNature = getCheckedValue(document.principal.INFO_NATURE);
		else
			return false;
			
        if(document.principal.DROIT_ADMINISTRATION.value == 0)
    	{
    		parent.posMessageBoxWarning(document.principal.MESSAGE_NO_ADMINISTRATION.value);
    		return false;
    	}
    }
    
	var szUrl = getEncodeUrl(szInfoNature);
    if(CST_TYPE_APPLI == 1)
    	szUrlModifierNature="../../../../interface/session/principal/gestionnature/afficher_modif_nature.php?MODE=MODIFICATION&"+szUrl;
    else
    	szUrlModifierNature="../../../../servlet/interface/session/principal/gestionnature.AfficherModifNature?MODE=MODIFICATION&"+szUrl;
    
	afficherLien(szUrlModifierNature);
}

function onSupprimerNature(szInfoNature)
{
    szUrlSupprimerNature="";
    
	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoNature = getCheckedValue(document.principal.INFO_NATURE);
		else
			return false;
			
		if(document.principal.DROIT_ADMINISTRATION.value == 0)
	    {
		    parent.posMessageBoxWarning(document.principal.MESSAGE_NO_ADMINISTRATION.value);
		    return false;
    	}
    }
    
	if(parent.posMessageBoxConfirm(document.principal.MESSAGE_SUPP_NATURE.value))
	{
		szUrl= getEncodeUrl(szInfoNature);
		
		if(CST_TYPE_APPLI == 1)
			szUrlSupprimerNature="../../../../interface/session/principal/gestionnature/modifier_nature.php?MODE=SUPPRESSION&"+szUrl;
		else
			szUrlSupprimerNature="../../../../servlet/interface/session/principal/gestionnature.ModifierNature?MODE=SUPPRESSION&"+szUrl;
			
		afficherLien(szUrlSupprimerNature);
	}
}

function tri(arg)
{
	document.body.style.cursor='wait';
	document.getElementById("table_liste_natures").style.cursor='wait';
	document.location.href=document.principal.URL_TRI.value+"?POS_TRI_COL="+arg;
}

function getContentContextMenu()
{
	var s= "";
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
