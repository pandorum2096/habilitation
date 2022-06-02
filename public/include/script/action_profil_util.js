document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/popup_menu.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/fonction_util.js\"></SCRIPT>");

// Javascript qui gere l'affichage du menu popup 
// qui s'affiche sur la page de gestion des profils des utilisateurs.

function onCreerProfil()
{
	if(CST_TYPE_APPLI == 1)
		szUrlModifierProfilUtil="../../../../interface/session/principal/gestionprofilutil/afficher_modif_profil_util.php?MODE=CREATION";
	else
		szUrlModifierProfilUtil="../../../../servlet/interface/session/principal/gestionprofilutil.AfficherModifProfilUtil?MODE=CREATION";
		
	afficherLien(szUrlModifierProfilUtil);
}

function onModifierProfil(szInfoProfil)
{
    var szUrlModifierUtil="";
    
	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoProfil = getCheckedValue(document.principal.INFO_PROFIL);
		else
			return false;
    }
    
	szUrl = getEncodeUrl(szInfoProfil);
    
    if(CST_TYPE_APPLI == 1)
    	szUrlModifierProfilUtil="../../../../interface/session/principal/gestionprofilutil/afficher_modif_profil_util.php?MODE=MODIFICATION&"+szUrl;
    else
    	szUrlModifierProfilUtil="../../../../servlet/interface/session/principal/gestionprofilutil.AfficherModifProfilUtil?MODE=MODIFICATION&"+szUrl;
    
	afficherLien(szUrlModifierProfilUtil);
}

function onCopierProfil(szInfoProfil)
{
    var szUrlModifierUtil="";
    
	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoProfil = getCheckedValue(document.principal.INFO_PROFIL);
		else
			return false;
    }
    
	szUrl = getEncodeUrl(szInfoProfil);
    
    if(CST_TYPE_APPLI == 1)
    	szUrlModifierProfilUtil="../../../../interface/session/principal/gestionprofilutil/afficher_modif_profil_util.php?MODE=CREATION&"+szUrl;
    else
    	szUrlModifierProfilUtil="../../../../servlet/interface/session/principal/gestionprofilutil.AfficherModifProfilUtil?MODE=CREATION&"+szUrl;
    
	afficherLien(szUrlModifierProfilUtil);
}

function onSupprimerProfil(szInfoProfil)
{
    szUrlSupprimerUtil="";
    
	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoProfil = getCheckedValue(document.principal.INFO_PROFIL);
		else
			return false;
    }
    
	if(parent.posMessageBoxConfirm(document.principal.MESSAGE_SUPP_PROFIL.value))
	{
		szUrl= getEncodeUrl(szInfoProfil);
		
		if(CST_TYPE_APPLI == 1)
			szUrlSupprimerUtil="../../../../interface/session/principal/gestionprofilutil/modifier_profil_util.php?MODE=SUPPRESSION&"+szUrl;
		else
			szUrlSupprimerUtil="../../../../servlet/interface/session/principal/gestionprofilutil.ModifierProfilUtil?MODE=SUPPRESSION&"+szUrl;
			
		afficherLien(szUrlSupprimerUtil);
	}
}

function tri(arg)
{
	document.body.style.cursor='wait';
	document.getElementById("table_liste_profils").style.cursor='wait';
	document.location.href=document.principal.URL_TRI.value+"?POS_TRI_COL="+arg;
}

function getContentContextMenu()
{console.log('-action_profil_util.js getContentContextMenu-', sitems);
	var s= "";
	for (var i=0;i<=sitems.length-1;i++)
	{
		if(sitems[i] == "<HR>")
			s+= sitems[i];
		else if(sitemlinks[i].substring(sitemlinks[i].length-2, sitemlinks[i].length) == "()")
		{
		    if(document.principal.DROIT_ADMIN_UTIL.value == 1)
		    {
				// ici on doit faire passer le num doc dans les parentheses de la fct.
				szNomFct = sitemlinks[i].substring(0, sitemlinks[i].length-2);
				s+='&nbsp;<IMG src=\"../../../../images/icons/lr_fleche.png\">&nbsp;<a href=\"javascript:void(0)\" class=\"item_menu\" onClick=\"'+szNomFct+'(\''+szInfos+'\')\">'+sitems[i]+'</a><br>';
			}
		    else
		        s+= "&nbsp;<IMG src=\"../../../../images/icons/lr_vide.png\">&nbsp;<FONT COLOR='#999999'>"+sitems[i]+"</FONT><BR>";
		}
	}
    return s;
}
