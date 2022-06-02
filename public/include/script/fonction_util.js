
//NECESSAIRE pour les apostrophes
// Fonction qui permet de faire un escape sur les parametres passes a une url.
// le probleme et que l'on ne peut pas faire escape(szInfoUrl) 
// (szInfoUrl => POS_TOTO=VALEUR1&POS_TITI=VALEUR2&...) car si la chaine
// contient des = et &, le escape les transforme.
// Il faut donc juste escaper les valeurs (VALEUR1...), donc on utilise cette fonction 
// qui decoupe, escape puis reconstruit l'url.  
function getEncodeUrl(szInfoUrl)
{
	tabSzUrl = szInfoUrl.split("&");
	szUrl = "";
	for(i=0; i < tabSzUrl.length; i++)
	{
		tabTmp = new Array();
		tabTmp = tabSzUrl[i].split("=");
		
		if(i == 0)
			szUrl += tabTmp[0] + "=" +escape(tabTmp[1]);
		else
			szUrl += "&"+tabTmp[0]+"="+escape(tabTmp[1]);
	}
	
	return szUrl;
}