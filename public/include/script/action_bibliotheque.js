document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/popup_menu.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/fonction_util.js\"></SCRIPT>");
function getUrlBib(type_url)
{
	var tabCodeUrl = new Array();
	if(CST_TYPE_APPLI == 1)
	{
		tabCodeUrl["URL_PARTAGER"] = URL_SITE + "/interface/session/principal/gestionbiblio/afficher_partage.php?";
		tabCodeUrl["URL_AFFICHER_DETAIL"] = URL_SITE + "/interface/session/principal/gestionbiblio/afficher_detail.php?";
		tabCodeUrl["URL_CREER"] = URL_SITE + "/interface/session/principal/type/afficher_type.php?ACTION=RECHERCHE_ELA";
		tabCodeUrl["URL_RECHERCHER"] = URL_SITE + "/interface/session/principal/resultat/rechercher_db.php?";
		tabCodeUrl["URL_RAPPELER"] = URL_SITE + "/interface/session/principal/gestionbiblio/rappeler_question.php?";
	}
    else if (CST_TYPE_APPLI == 2)
	{
		tabCodeUrl["URL_PARTAGER"] = URL_SITE + "/servlet/interface/session/principal/gestionbiblio.AfficherPartage?";
		tabCodeUrl["URL_AFFICHER_DETAIL"] = URL_SITE + "/servlet/interface/session/principal/gestionbiblio.AfficherDetail?";
		tabCodeUrl["URL_CREER"] = URL_SITE + "/servlet/interface/session/principal/type.AfficherType?ACTION=RECHERCHE_ELA";
		tabCodeUrl["URL_RECHERCHER"] = URL_SITE + "/servlet/interface/session/principal/resultat.Rechercher?";
		tabCodeUrl["URL_RAPPELER"] = URL_SITE + "/servlet/interface/session/principal/gestionbiblio.RappelerQuestion?";
	}
    else {
        tabCodeUrl["URL_PARTAGER"] = "../../../../interface/session/principal/gestionbiblio/AfficherPartage.aspx?";
        tabCodeUrl["URL_AFFICHER_DETAIL"] = "../../../../interface/session/principal/gestionbiblio/AfficherDetail.aspx?";
        tabCodeUrl["URL_CREER"] = "../../../../interface/session/principal/type/AfficherType.aspx?ACTION=RECHERCHE_ELA";
        tabCodeUrl["URL_RECHERCHER"] = "../../../../interface/session/principal/resultat/Rechercher.aspx?";
        tabCodeUrl["URL_RAPPELER"] = "../../../../interface/session/principal/gestionbiblio/RappelerQuestion.aspx?";
	}

	return tabCodeUrl[type_url];	
}

// Javascript qui gere l'affichage du menu popup 
// qui s'affiche sur la page de la liste question de la bib.

function onPartager(szInfoStruQuest)
{
	// la question n'est pas partageable
	if ( (arguments.length == 1 && szInfoStruQuest.indexOf("POS_QUEST_PUBLIC=0") >= 0) ||
		(arguments.length == 0 && Verif_form() && getCheckedValue(document.principal.INFO_STRU_QUESTION).indexOf("POS_QUEST_PUBLIC=0") >= 0))
	{
        parent.posMessageBoxWarning(document.principal.MESSAGE_NO_DROIT_PART_QUEST_BIB.value);
		return false;
	}
		
	var szUrlPartageQuest = getUrlBib("URL_PARTAGER");
	if(arguments.length == 1)
		szUrlPartageQuest += getEncodeUrl(szInfoStruQuest);
	else if(Verif_form())
		szUrlPartageQuest += getEncodeUrl(getCheckedValue(document.principal.INFO_STRU_QUESTION));
	else 
		return false;

	if(szUrlPartageQuest.length > 0)
        parent.modelesswinyui(szUrlPartageQuest, "Paramétrage du partage", {width: 800, height: 400, left: 150, top: 150});
    hide_popup_menu();
}

function onConsulter(szInfoStruQuest)
{
	var szUrlDetailQuest = getUrlBib("URL_AFFICHER_DETAIL"); 
	if(arguments.length == 1)
		szUrlDetailQuest += getEncodeUrl(szInfoStruQuest);
	else if(Verif_form())
		szUrlDetailQuest += getEncodeUrl(getCheckedValue(document.principal.INFO_STRU_QUESTION));
	else 
		return false;

	if(szUrlDetailQuest.length > 0)
        parent.modelesswinyui(szUrlDetailQuest, "Contenu de la requête", {width: 800, height: 400, left: 150, top: 150});
    hide_popup_menu();
}

function onSupprimer(szInfoStruQuest)
{
	var szUrlSupprimerQuest = "";
	hide_popup_menu();
	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoStruQuest = getCheckedValue(document.principal.INFO_STRU_QUESTION);
		else
			return false;
	}
	
	tabSzInfo = szInfoStruQuest.split("&");
	bPublic = tabSzInfo[1].split("=")[1];

	if(bPublic == 1)
	{
		if(document.principal.POS_ADMIN.value == 0) 
		{
			parent.posMessageBoxWarning(document.principal.MESSAGE_NO_DROIT_SUPP_QUEST_BIB.value);
			return false;
		}
	}
	
	if(parent.posMessageBoxConfirm(document.principal.MESSAGE_SUPP_QUEST_BIB.value))
	{
		szQuery = getEncodeUrl(szInfoStruQuest);
		if(CST_TYPE_APPLI == 1)
			szUrlSupprimerQuest = "../../../../interface/session/principal/gestionbiblio/supprimer_question.php?" + szQuery;
		else if (CST_TYPE_APPLI == 2)
			szUrlSupprimerQuest = "../../../../servlet/interface/session/principal/gestionbiblio.SupprimerQuestion?" + szQuery;
		else 
		    szUrlSupprimerQuest = "../../../../interface/session/principal/gestionbiblio/SupprimerQuestion.aspx?" + szQuery;
	}
	
	if(szUrlSupprimerQuest.length > 0)
		afficherLien(szUrlSupprimerQuest);
}

function onCreer()
{
    var szUrlCreerQuest = getUrlBib("URL_CREER");
	afficherLien(szUrlCreerQuest);
}

function onRechercher(szInfoStruQuest)
{
	var szUrlRechercherQuest = getUrlBib("URL_RECHERCHER");
	if(arguments.length == 1)
		szUrlRechercherQuest += getEncodeUrl(szInfoStruQuest);
		//szUrlRechercherQuest += szInfoStruQuest;
	else if(Verif_form())
		szUrlRechercherQuest += getEncodeUrl(getCheckedValue(document.principal.INFO_STRU_QUESTION));
	else 
		return false;
		
	if(szUrlRechercherQuest.length > 0)
		afficherLien(szUrlRechercherQuest + "&TYPE_RECHERCHE=RECHERCHE_BIB");
}

function onRappeler(szInfoStruQuest)
{
	var szUrlRappelerQuest = getUrlBib("URL_RAPPELER");
	if(arguments.length == 1)
		szUrlRappelerQuest += getEncodeUrl(szInfoStruQuest);
	else if(Verif_form())
		szUrlRappelerQuest += getEncodeUrl(getCheckedValue(document.principal.INFO_STRU_QUESTION));
	else 
		return false;

	if(szUrlRappelerQuest.length > 0)
		afficherLien(szUrlRappelerQuest);
}

function getContentContextMenu()
{
	var s= "";	
	for (i=0;i<=sitems.length-1;i++)
	{
		if(sitems[i] == "<HR>")
			s+= sitems[i];
		else
		{
			if(sitemlinks[i].substring(sitemlinks[i].length-2, sitemlinks[i].length) == "()")
			{
				if (sitemlinks[i] != "onPartager()" || szInfos.indexOf("POS_QUEST_PUBLIC=1") >= 0) 
				{
					szNomFct = sitemlinks[i].substring(0, sitemlinks[i].length-2);
					s+='&nbsp;<IMG src=\"../../../../images/icons/lr_fleche.png\">&nbsp;<a href=\"javascript:void(0)\" onClick=\"'+szNomFct+'(\''+szInfos+'\')\">'+sitems[i]+'</a><br>';
				}
			}
			else
				s+='&nbsp;<IMG src=\"../../../../images/icons/lr_vide.png\">&nbsp;<a href=\"'+sitemlinks[i]+'\" class=glowtext>'+sitems[i]+'</a><br>';
		}
	}
    return s;
}
