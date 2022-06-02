document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/popup_menu.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/fonction_util.js\"></SCRIPT>");

function getUrlProfil(type_url)
{
	var tabCodeUrl = new Array();
	if(CST_TYPE_APPLI == 1)
	{
		tabCodeUrl["URL_CREER"] = URL_SITE + "/interface/session/principal/gestionprofillr/afficher_creation.php";
		tabCodeUrl["URL_MODIFIER"] = URL_SITE + "/interface/session/principal/gestionprofillr/afficher_modif_profil.php?";
		tabCodeUrl["URL_SUPPRIMER"] = URL_SITE + "/interface/session/principal/gestionprofillr/supprimer_profil.php?";
		tabCodeUrl["URL_ACTIVER"] = URL_SITE + "/interface/session/principal/gestionprofillr/active_desact_profil.php?";
		
	}
    else if (CST_TYPE_APPLI == 2)
	{
		tabCodeUrl["URL_CREER"] = "../../../../servlet/interface/session/principal/gestionprofillr.AfficherCreation";
		tabCodeUrl["URL_MODIFIER"] = "../../../../servlet/interface/session/principal/gestionprofillr.AfficherModifProfil?";
		tabCodeUrl["URL_SUPPRIMER"] = "../../../../servlet/interface/session/principal/gestionprofillr.SupprimerProfil?";
		tabCodeUrl["URL_ACTIVER"] = "../../../../servlet/interface/session/principal/gestionprofillr.ActiveDesactProfil?";
		
	}
    else {
        tabCodeUrl["URL_CREER"] = "../../../../interface/session/principal/gestionprofillr/AfficherCreation.aspx";
        tabCodeUrl["URL_MODIFIER"] =  "../../../../interface/session/principal/gestionprofillr/AfficherModifProfil.aspx?";
        tabCodeUrl["URL_SUPPRIMER"] = "../../../../interface/session/principal/gestionprofillr/SupprimerProfil.aspx?";
        tabCodeUrl["URL_ACTIVER"] = "../../../../interface/session/principal/gestionprofillr/ActiveDesactProfil.aspx?";
    }

	return tabCodeUrl[type_url];	
}

function onCreer(szInfoStruProfilLR)
{
    if(document.principal.POS_ADMIN_PROFIL.value == 0)
		parent.posMessageBoxWarning(document.principal.MESSAGE_NO_DROIT_AJOU_PROFIL_LR.value);
	else
	   afficherLien(getUrlProfil("URL_CREER"));
}

function onModifier(szInfoStruProfilLR)
{
    url="";
	
	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoStruProfilLR = getCheckedValue(document.principal.INFO_STRU_PROFIL);
		else
			return false;
			
        // si pas de droit admin PLR ou si c un profil public et que l'on est pas admin on ne peut pas supp
    	tabTmp2 = szInfoStruProfilLR.split("B_PUBLIC=");
    	
        if(document.principal.POS_ADMIN_PROFIL.value == 0 || (tabTmp2[1].substring(0,1) == 1 && document.principal.POS_ADMIN.value == 0))
        {
    		parent.posMessageBoxWarning(document.principal.MESSAGE_NO_DROIT_MODIF_PROFIL_LR.value);
    		return false;
    	}
    
		szUrl = getEncodeUrl(szInfoStruProfilLR);
    }
    else
        szUrl = szInfoStruProfilLR;
    
	afficherLien(getUrlProfil("URL_MODIFIER") + szUrl);
	return true;
}

function onSupprimer(szInfoStruProfilLR)
{
    url="";
	
	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoStruProfilLR = getCheckedValue(document.principal.INFO_STRU_PROFIL);
		else
			return false;

	    // si pas de droit admin PLR ou si profil auto ou si c un profil public et que l'on est pas admin on ne peut pas supp
    	tabTmp1 = szInfoStruProfilLR.split("B_AUTO=");
    	tabTmp2 = szInfoStruProfilLR.split("B_PUBLIC=");

    	if(document.principal.POS_ADMIN_PROFIL.value == 0 || tabTmp1[1].substring(0,1) == 1 || (tabTmp2[1].substring(0,1) == 1 && document.principal.POS_ADMIN.value == 0))
    	{
			parent.posMessageBoxWarning(document.principal.MESSAGE_NO_DROIT_SUPP_PROFIL_LR.value);
			return false;
    	}
    }
    
	if(parent.posMessageBoxConfirm(document.principal.MESSAGE_SUPP_PROFIL_LR.value))
	{
		if(arguments.length == 0)
		    szUrl = szInfoStruProfilLR;
	    else
		szUrl = getEncodeUrl(szInfoStruProfilLR);

		url = getUrlProfil("URL_SUPPRIMER") +szUrl;
	}
	
	if(url.length > 0)
		afficherLien(url);
}

function onActiveDesactiveProfilType(szInfoStruProfilLR)
{
	url="";
	
	if(arguments.length == 1)
	{
		szUrl = getEncodeUrl(szInfoStruProfilLR);
		url = getUrlProfil("URL_ACTIVER") +szUrl;
		
    }
	else if(Verif_form())
	{
	    szInfoStruProfilLR = getCheckedValue(document.principal.INFO_STRU_PROFIL);
	    
	    tabTmp1 = szInfoStruProfilLR.split("B_AUTO=");
	    
	    szUrl = getEncodeUrl(szInfoStruProfilLR);
	    
	    if(tabTmp1[1].substring(0,1) == 0)
    		url = getUrlProfil("URL_ACTIVER") + szUrl;
	}
    else
        return false;
        
	
	if(url.length > 0)
		afficherLien(url);
	else
	    parent.posMessageBoxWarning(document.principal.MESSAGE_NO_DROIT_ACTIVER_PROFIL.value);
}

function getContentContextMenu()
{
	var s= "";
	for (var i=0;i<=sitems.length-1;i++)
	{
		if(sitems[i] == "<HR>")
			s+= sitems[i];
		else if(i<sitems.length-2 || 
		        (   (i==sitems.length-1 && bAfficheDesactive == 1) || 
		            (i==sitems.length-2 && bAfficheDesactive == 0)  
		            && bProfilAuto != 1))
		{
		    if((sitemlinks[i] != "onSupprimer()" 
		            || (sitemlinks[i] == "onSupprimer()" && bProfilAuto == 0 && bProfilPublic == 0 && document.principal.POS_ADMIN_PROFIL.value == 1) // utilisateur non adnin
		            || (sitemlinks[i] == "onSupprimer()" && bProfilAuto == 0 && bProfilPublic == 1 && document.principal.POS_ADMIN.value == 1 && document.principal.POS_ADMIN_PROFIL.value == 1) // utilisateur admin
		        )// 3 -> lien supprimer
		        &&
		        (sitemlinks[i] != "onModifier()"
		            || (sitemlinks[i] == "onModifier()" && bProfilPublic == 0 && document.principal.POS_ADMIN_PROFIL.value == 1) // utilisateur non adnin (il ne voit pas les PLR auto)
		            || (document.principal.POS_ADMIN.value == 1 && document.principal.POS_ADMIN_PROFIL.value == 1)
		        )// 2 -> lien modifier
		        &&
		        (sitemlinks[i] != "onCreer()"
		            || (sitemlinks[i] == "onCreer()"  && document.principal.POS_ADMIN_PROFIL.value == 1) // utilisateur non adnin de PLR(il ne voit pas les PLR auto)
		        )// 2 -> lien Ajouter
		       )
		    {
				if(sitemlinks[i].substring(sitemlinks[i].length-2, sitemlinks[i].length) == "()")
				{
					// ici on doit faire passer le num doc dans les parentheses de la fct.
					szNomFct = sitemlinks[i].substring(0, sitemlinks[i].length-2);
					
					s+='&nbsp;<IMG src=\"../../../../images/icons/lr_fleche.png\">&nbsp;<a href=\"javascript:void(0)\" onClick=\"'+szNomFct+'(\''+szInfos+'\')\">'+sitems[i]+'</a><br>';
				}
				else
					s+='&nbsp;<IMG src=\"../../../../images/icons/lr_fleche.png\">&nbsp;<a href=\"'+sitemlinks[i]+'\" class=glowtext>'+sitems[i]+'</a><br>';
			}
			else
	            s+= "&nbsp;<IMG src=\"../../../../images/icons/lr_vide.png\">&nbsp;<FONT COLOR='#999999'>"+sitems[i]+"</FONT><BR>";
		}
	    else
	        s+= "&nbsp;<IMG src=\"../../../../images/icons/lr_vide.png\">&nbsp;<FONT COLOR='#999999'>"+sitems[i]+"</FONT><BR>";
	    
	}
    return s;
}
