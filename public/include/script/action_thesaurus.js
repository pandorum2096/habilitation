document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/popup_menu.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/fonction_util.js\"></SCRIPT>");

// Javascript qui gere l'affichage du menu popup 
// qui s'affiche sur la page de gestion des thesaurus


// Page de liste des thesaurus
function onModifier_thesaurus(szThesaurus)
{
    var szUrlModifier_thesaurus="";
	if(arguments.length == 0)
	{
		if(Verif_form())
			szThesaurus = getCheckedValue(document.principal.IDENT_THESAURUS);
		else
			return false;
			
        if(document.principal.DROIT_ADMIN_THESAURUS.value == 0)
    	{
    		parent.posMessageBoxWarning(document.principal.MESSAGE_NO_ADMIN_THESAURUS.value);
    		return false;
    	}
    }
    if(CST_TYPE_APPLI == 1)
    	szUrlModifier_thesaurus = "../../../../interface/session/principal/attente/attente.php?URL=../../../../interface/session/principal/thesaurus/afficher_thesaurus_xtree.php&";
    else
    	szUrlModifier_thesaurus = "../../../../servlet/thesaurus.AfficherThesaurusXtree?";
    szUrlModifier_thesaurus = szUrlModifier_thesaurus + getEncodeUrl(szThesaurus); 
	afficherLien(szUrlModifier_thesaurus);	
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
		    if(document.principal.DROIT_ADMIN_THESAURUS.value == 1)
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

