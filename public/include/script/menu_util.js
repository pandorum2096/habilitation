function ImageCharge(nom) {
  this.img_up = new Image();
  this.img_up.src = "../../../../images/menu/win/" + nom + ".gif";

  this.img_down = new Image();
  this.img_down.src = "../../../../images/menu/win/" + nom + "_selec.gif";

  this.img_roll = new Image();
  this.img_roll.src = "../../../../images/menu/win/" + nom + "_roll.gif";
}

var tableauImage = new Array();
tableauImage["Accueil"] = new ImageCharge("home");
tableauImage["Password"] = new ImageCharge("pass");
tableauImage["Creation"] = new ImageCharge("fiche");
tableauImage["Quitter"] = new ImageCharge("decon");
tableauImage["RechHIS"] = new ImageCharge("histor");
tableauImage["RechNUM"] = new ImageCharge("numer");
tableauImage["RechKH"] = new ImageCharge("cle");
tableauImage["RechFIC"] = new ImageCharge("recher");
tableauImage["RechELA"] = new ImageCharge("multi");
tableauImage["RechEXC"] = new ImageCharge("ptext");
tableauImage["Bib"] = new ImageCharge("bib");
tableauImage["Document"] = new ImageCharge("doc");
tableauImage["pplr"] = new ImageCharge("pplr");

tableauImage["dom_ferme"] = new ImageCharge("dom_ferme");
tableauImage["listehier"] = new ImageCharge("listehier");
tableauImage["users"] = new ImageCharge("users");
tableauImage["thesaurus"] = new ImageCharge("thesaurus");
tableauImage["changeprofil"] = new ImageCharge("changeprofil");
tableauImage["modele"] = new ImageCharge("modele");

tableauImage["profilutil"] = new ImageCharge("profilutil");
tableauImage["natures"] = new ImageCharge("natures");
tableauImage["session"] = new ImageCharge("session");
tableauImage["docmodif"] = new ImageCharge("docmodif");
tableauImage["types"] = new ImageCharge("types");
tableauImage["rubriques"] = new ImageCharge("rubriques");
tableauImage["stat"] = new ImageCharge("stat");

var img_click_en_cours = "";
function initialise_img(szImage)
{
	if(arguments.length == 1)
		img_click_en_cours = szImage;
	
	for(i=0;i<window.document.images.length;i++)
	{
		if(window.document.images[i].name.length > 0)
		{
			tmp = window.document.images[i].name.substring(0,window.document.images[i].name.lastIndexOf("_"));
			window.document.images[i].src = tableauImage[tmp].img_up.src;
		}
	}
	
	if(arguments.length == 1)
	{
    	image = eval("window.document.images['"+szImage+"']");
        tmp = image.name.substring(0,image.name.lastIndexOf("_"));
    	image.src = tableauImage[tmp].img_down.src;
    }
}

function roll_img(szImage)
{
	if(img_click_en_cours != szImage)
	{
		image = eval("window.document.images['"+szImage+"']");
		tmp = image.name.substring(0,image.name.lastIndexOf("_"));
		image.src = tableauImage[tmp].img_roll.src;
	}
}

function normal_img(szImage)
{
	if(img_click_en_cours != szImage)
	{
		image = eval("window.document.images['"+szImage+"']");
		tmp = image.name.substring(0,image.name.lastIndexOf("_"));
		image.src = tableauImage[tmp].img_up.src;
	}
}

function affichePage(typePage, szUrl)
{
	if (typePage == 'accueil')
	{
		parent.basculerEcran('centerbal');
	}
	else if (typePage == 'lien_creation' || 
        szUrl.indexOf('creation/afficher_creation.php') != -1 || szUrl.indexOf('afficher_type.php?ACTION=CREATION') != -1|| 
        szUrl.indexOf('creation.AfficherCreation') != -1 || szUrl.indexOf('type.AfficherType?ACTION=CREATION') != -1)
	{
		parent.openDocumentCreation(szUrl);
	}
    else
	if (typePage == 'changeprofil' || typePage == 'editionportail')
	{
	    parent.basculerEcran('centerbal');
	    parent.centerbal.document.location.href=szUrl;
	}
    else
	if (typePage == 'quitter')
	{
		parent.location.href=szUrl;
	}
	else
	{
		parent.basculerEcran('center');
		parent.center.document.location.href=szUrl;
	}
	parent.setTitle();
	return true;
} 
