document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");

// Définition des différents images pour les BAL
var BAL_VIDE = new Image();
BAL_VIDE.src="../../../../images/icons/balvide.png";
var BAL_PLEINE = new Image();
BAL_PLEINE.src="../../../../images/icons/bal.png";
var BAL_NON_CHARGE = new Image();
BAL_NON_CHARGE.src="../../../../images/icons/balvide.png";

function getHTTPObjectAccueil()
{
	if(window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
}

/*
 * Remplace toutes les occurences d'une chaine 
*/
function replaceAll(str, search, repl) { 
  while (str.indexOf(search) != -1) 
	 str = str.replace(search, repl); 
	return str; 
}

function afficheMasqueGroupe(idGroup)
{
    if (document.getElementById('group_bal_' + idGroup).style.display == "none")
    {
        document.getElementById('group_bal_' + idGroup).style.display = "";
        document.getElementById('image_fermeture_group_' + idGroup).src = "../../../../images/icons/moins_bal.gif";
    }
    else
    {
        document.getElementById('group_bal_' + idGroup).style.display = "none";
        document.getElementById('image_fermeture_group_' + idGroup).src = "../../../../images/icons/plus_bal.gif";
    }
}

function affiche_icon(id, sz_nb_rep)
{
	image = eval("window.document.images['img_bal"+id+"']");

	if(sz_nb_rep == "?")
		img = BAL_NON_CHARGE;
	else if(parseInt(sz_nb_rep) > 0)
		img = BAL_PLEINE;
	else
		img = BAL_VIDE;
					
	if (tabBalIcone[id].length == 0)
	image.src = img.src;
	else
	   image.src = "../../../../images/menu/win/" + tabBalIcone[id] + ".gif";
}

function lancePanier()
{
	var szUrl = document.principal.URL_RESULTAT.value;
	var szUrlAttente = document.principal.URL_ATTENTE.value;
	// NB : il y a un & plutot qu'un "?" car l'url est passe en parametre de l'ecran d'attente.
	szUrl += "&TYPE_RECHERCHE=RECHERCHE_PANIER";
	parent.basculerEcran('center');
    parent.center.location.href= szUrlAttente + "?URL="+ szUrl;
    parent.setSelectedArboNone();
}

function changerProfil(szProfil)
{
	if (parent.closeAllTabs())
    {
        var szUrl = document.principal.URL_CHANGER_PROFIL.value;
    	var szUrlAttente = document.principal.URL_ATTENTE.value;
    	// NB : il y a un & plutot qu'un "?" car l'url est passe en parametre de l'ecran d'attente.
    	szUrl += "&POS_PROFIL=" + szProfil;
        document.location.href= szUrlAttente + "?URL="+ szUrl;
    }
}

function majBal(szCodeBal, iNbRep)
{     
    for(var i=0; i<tabBal.length; i++)
    {
        if(szCodeBal == tabBal[i])
        {
            var id_maj_bal = i;
            break;
        }
    }
    majNbReponseBal(szCodeBal, i, iNbRep);
}

function majNbReponseBalCode(szCodeBal, iNbRep)
{
    var iNumBal = -1;
    for (i=0;i<tabBal.length;i++)
    {
        if (tabBal[i] == szCodeBal)
        {
            iNumBal = i;
            break;
        }
    }
    if (iNumBal != -1)
        majNbReponseBal(szCodeBal, iNumBal, iNbRep);
}

function majNbReponseBal(szCodeBal, iNumBal, iNbRep)
{     
    document.getElementById("bal" + iNumBal).innerHTML = "(" + iNbRep + ")";
    tabNbRepBal[iNumBal] = iNbRep;
    affiche_icon(iNumBal, iNbRep);
    //parent.majBal(tabBalhtmlEncode[iNumBal], iNbRep);
    parent.majBal(szCodeBal, iNbRep);
}

function lanceBibBal(szUrlParameter, typeQuestion)
{
    var i,j;
    var szUrlAttente = document.principal.URL_ATTENTE.value;
	var tabSzUrl = szUrlParameter.split("&");
	var szUrl = "";
	var szQuestNom = "";
	for(i=0; i < tabSzUrl.length; i++)
	{
		var pos = tabSzUrl[i].indexOf("=");
		if(i == 0)
			szUrl += escape(tabSzUrl[i]);
		else
		{
		    var szValeur = replaceAll(tabSzUrl[i].substring(pos + 1), "+", "%2B");
		    szUrl += "&" + tabSzUrl[i].substring(0, pos) + "=" + escape(szValeur);
        }	
        
        if (tabSzUrl[i].substring(0, pos) == "POS_QUEST_NOM")
        {
            szQuestNom = tabSzUrl[i].substring(pos + 1);
        }
	}
    parent.selectQuestionMenu(szQuestNom, typeQuestion);
	parent.basculerEcran('center');
    parent.center.location.href= szUrlAttente + "?URL="+ szUrl;
}

function afficherResultat(portletType, szUrl)
{
    var pos = szUrl.indexOf("POS_QUEST_NOM");
    if (pos >= 0)
    {
        var posFin = szUrl.indexOf("&", pos);
        if (posFin < 0)
            posFin = szUrl.length;
        szQuestNom = szUrl.substring(pos + "POS_QUEST_NOM".length + 1, posFin);
        szQuestNom = replaceAll(unescape(szQuestNom), "+", " ");
        szQuestNom = replaceAll(szQuestNom, "\\'", "\'");
        parent.selectQuestionMenu(szQuestNom, (portletType == 'qpubliques') ? "QUESTION_PUBLIQUE" : 'QUESTION_PRIVEE');
    }
    var pos = szUrl.indexOf("POS_NUM_DOC");
    if (pos >= 0) {
        parent.openPosDocument(szUrl);
    }
    else {
      parent.basculerEcran('center');
      parent.center.location.href=szUrl;
    }
}

function initEcranAccueil()
{
    setTimeout('initEcranAccueil2()', 100);
}

function initEcranAccueil2() {
    loadBal(0);
}

/*
 *	Cette fonction ressemble à une fonction récursive mais n'est pas utilisée
 *	dans ce but, on attend juste que objHttp.readyState soit égal à 4 
 *	(càd on attend le nb de réponses de la BAL) pour lancer la recherche sur la BAL suivante
 *  Comme la reponse est asynchrone, si on utilise un code séquentiel, les dernières réponses
 * peuvent arriver en premier et ce n'est pas gérable avec un seul objet de type XMLHttpRequest
 */
function loadBal(i)
{
    var nbMaxBalInRequest = 3;
    if (window['CST_NB_BAL_PAR_REQUETE'] != undefined)
        nbMaxBalInRequest = window['CST_NB_BAL_PAR_REQUETE'];
    var reg = /[(][.]{3}[)]/;
    if (i < tabBal.length)
    {
        var sUlrRep = "";
        var sListeBalUrl = "";
        var nbBalInRequete = 0;
        var iBase = i;
    	for (j=0;j+iBase<tabBal.length;j++)
        {
            var id_load_Bal = "bal" + (iBase+j);
            // on teste si la valeur est (...) pour lancer la recherche ou si la question a déjà été posée
            if(tabIfBalOpen[iBase+j] && (reg.test(document.getElementById(id_load_Bal).innerHTML) || tabNbRepBal[iBase+j] != -1))
            {
                sListeBalUrl += "&SZ_CODE_BAL_"+nbBalInRequete+"="+ escape(tabBal[iBase+j]);
                nbBalInRequete++;
                i++;
            }
            else 
            {
            	if(!tabIfBalOpen[iBase+j])
    	        	affiche_icon(iBase+j, "?");
                i++;
            }
            if (nbBalInRequete >= nbMaxBalInRequest)
                break;
        }
   
        if (nbBalInRequete > 0)
        {
            var objHttp = getHTTPObjectAccueil();
            var sUlrRep = document.principal.URL_OBTENIR_NB_REP.value + "?NB_BAL="+ nbBalInRequete;
            objHttp.open("GET", sUlrRep + sListeBalUrl, true);
            objHttp.send(null);
            objHttp.onreadystatechange=function()
            {
                if(objHttp.readyState == 4)
                {
                    var objReponse;
                    try
                    {
                        objReponse = eval('(' + objHttp.responseText + ')');
                    }
                    catch(ex) {}
                    
                    for (j=0;j<nbBalInRequete;j++)
                    {
                        if (objReponse && objReponse.code_retour == 1)
                           majNbReponseBalCode(objReponse.tab_nb_reponses[j]['codebal'], objReponse.tab_nb_reponses[j]['nbrep']);
                        else
                            if (objReponse)
                                majNbReponseBalCode(objReponse.tab_nb_reponses[j]['codebal'], "-");
                    }
            		
                    // on poursuit le chargement si l'erreur n'est pas un pb de connexion
                    if (objReponse && objReponse.code_retour != -1)
                    {
                        loadBal(i);
                    }
                } 
            }
        }
        else
        {
            // retour dans la fonction avec un indice > taille du tableau =>on lancera le timeout
            loadBal(i);
        }
          
    }
    else
    {   
        parent.finChargementBal();
        setTimeout("reloadBal()", 1000*60*parseInt(set_reload_bal));
    }
}

function reloadBal()
{
    // peut-être long selon les navigateurs et le nombre de bal
    // interet limite : on montre juste que les bals se recharge.
    //for(var i=0;i<tabBal.length;i++)
    //    majNbReponseBal(tabBal[i], i, "...");
    parent.debutChargementBal();  
    loadBal(0);
}
