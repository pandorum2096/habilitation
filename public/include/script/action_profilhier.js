document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/popup_menu.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/fonction_util.js\"></SCRIPT>");

// Javascript qui gere l'affichage du menu popup 
// qui s'affiche sur la page de gestion des profils hiérarchiques.

function onCreerProfilHier()
{
	document.getElementById("bloc_choix_action").style.display='none';
	document.getElementById("bloc_ajout_profilhier").style.display='';
}


function onSupprimerProfilHier(szInfoProfilHier)
{
    var szUrlSupprimerProfilHier="";
	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoProfilHier = getCheckedValue(document.principal.INFO_PROFIL_HIER);
		else
			return false;
    }
	if(parent.posMessageBoxConfirm(document.principal.MESSAGE_SUPP_PROFIL.value))
	{
		szUrl= getEncodeUrl(szInfoProfilHier);
		
		if(CST_TYPE_APPLI == 1)
			szUrlSupprimerProfilHier="../../../../interface/session/principal/gestionprofilhier/modifier_liste_profilhier.php?MODE=SUPPRESSION&"+szUrl;
		else
			szUrlSupprimerProfilHier="../../../../servlet/interface/session/principal/gestionprofilhier.ModifierListeProfilHier?MODE=SUPPRESSION&"+szUrl;
		afficherLien(szUrlSupprimerProfilHier);
	}
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
