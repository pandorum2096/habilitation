document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/popup_menu.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/fonction_util.js\"></SCRIPT>");

// Javascript qui gere l'affichage du menu popup 
// qui s'affiche sur la page de gestion des utilisateurs.

function onCreer(szInfoUtil)
{
	szLDAP = document.principal.CONNEXION_LDAP.value;
	
	if(CST_TYPE_APPLI == 1)
		szUrlCreerUtil="../../../../interface/session/principal/attente/attente.php?URL=URL_AFFICHE_MODIF_UTILISATEUR&B_CREATION=1&CONNEXION_LDAP="+szLDAP;
	else
		szUrlCreerUtil="../../../../servlet/interface/session/principal/attente.Attente?URL=../../../../servlet/interface/session/principal/gestionutil.AfficherModifUser&B_CREATION=1&CONNEXION_LDAP="+szLDAP;
		
	afficherLien(szUrlCreerUtil);
}

function onModifier(szInfoUtil)
{
    szUrlModifierUtil="";

	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoUtil = getCheckedValue(document.principal.INFO_UTIL);
		else
			return false;
    }
    
	szUrl = getEncodeUrl(szInfoUtil);
	szLDAP = document.principal.CONNEXION_LDAP.value;
    
    if(CST_TYPE_APPLI == 1)
    	szUrlModifierUtil="../../../../interface/session/principal/attente/attente.php?URL=URL_AFFICHE_MODIF_UTILISATEUR&"+szUrl+"&CONNEXION_LDAP="+szLDAP;
    else
    	szUrlModifierUtil="../../../../servlet/interface/session/principal/attente.Attente?URL=../../../../servlet/interface/session/principal/gestionutil.AfficherModifUser&"+szUrl+"&CONNEXION_LDAP="+szLDAP;
    	
	afficherLien(szUrlModifierUtil);
}

function onSupprimer(szInfoUtil)
{
    szUrlSupprimerUtil="";
	
	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoUtil = getCheckedValue(document.principal.INFO_UTIL);
		else
			return false;
    }
    
	if(parent.posMessageBoxConfirm(document.principal.MESSAGE_SUPP_UTILISATEUR.value))
	{
		szUrl= getEncodeUrl(szInfoUtil);
		
		if(CST_TYPE_APPLI == 1)
			szUrlSupprimerUtil="../../../../interface/session/principal/gestionutil/supprimer_util.php?"+szUrl;
		else if (CST_TYPE_APPLI == 2)
			szUrlSupprimerUtil="../../../../servlet/interface/session/principal/gestionutil.SupprimerUtil?"+szUrl;
		else
		    szUrlSupprimerUtil = "../../../../interface/session/principal/gestionutil/SupprimerUtil.aspx?" + szUrl;
			
		afficherLien(szUrlSupprimerUtil);
	}
}

function onExporter()
{
	var szUrlExporterUtil;
	if(CST_TYPE_APPLI == 1)
		szUrlExporterUtil="../../../../interface/session/principal/gestionutil/consulter_util.php?MODE=EXPORT";
	else if (CST_TYPE_APPLI == 2)
		szUrlExporterUtil="../../../../servlet/interface/session/principal/gestionutil.ConsulterUtil?MODE=EXPORT";
		
	afficherLien(szUrlExporterUtil);
}

function tri(arg)
{
	document.body.style.cursor='wait';
	document.getElementById("table_liste_utils").style.cursor='wait';
    var sUrlTri;
    if(CST_TYPE_APPLI == 1)
		sUrlTri="../../../../interface/session/principal/attente/attente.php";
	else
        sUrlTri="../../../../servlet/interface/session/principal/attente.Attente";
    sUrlTri += "?URL=URL_AFFICHE_UTILISATEUR" + "&POS_TRI_COL="+arg;
    afficherLien(sUrlTri);
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
		    if(document.principal.DROIT_ADMIN_UTIL.value == 1)
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
