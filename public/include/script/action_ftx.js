document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/popup_menu.js\"></SCRIPT>");

function getUrlFtx(type_url)
{
	var tabCodeUrl = new Array();
	if(CST_TYPE_APPLI == 1)
	{
		tabCodeUrl["URL_PANIER"] = URL_SITE + "/interface/session/principal/panier/ajouter_panier.php?SZ_POS_TYPNUMDOC=";
	}
	else
	{
		tabCodeUrl["URL_PANIER"] = URL_SITE + "/servlet/interface/session/principal/panier.AjouterPanier?SZ_POS_TYPNUMDOC=";
	}

	return tabCodeUrl[type_url];	
}
// Javascript qui gere l'affichage du menu popup 
// qui s'affiche sur la page de la liste resultat excalibur.

function openFiche(szNumTypDoc)
{
	szUrl = document.principal.URL_CONSULT_INDEX.value+"?"+szNumTypDoc;

	var iPosDebutNumInChaine = szNumTypDoc.indexOf("POS_NUM_REP=") + "POS_NUM_REP=".length;
	var iPosFinNumInChaine = szNumTypDoc.length;
	
    if (szNumTypDoc.indexOf("&", iPosDebutNumInChaine) != -1)
    {
        iPosFinNumInChaine = szNumTypDoc.indexOf("&", iPosDebutNumInChaine) - 1;
    }
        
    iCurrentPos = szNumTypDoc.substr(iPosDebutNumInChaine, (iPosFinNumInChaine - iPosDebutNumInChaine) + 1);
    // transformation nbRep en position dans la page 
    iCurrentPos = iCurrentPos - getNbRepParPage() * (getCurrentPage()-1);
       
    parent.openPosDocument(szUrl);
}

function onConsulterNatif(szNumTypDoc)
{
    var szUrl = document.principal.URL_CONSULT_NATIF.value+"?"+szNumTypDoc;
    
    window.open(szUrl, '_blank');
}

function onConsulterFichierPrincipal(szNumTypDoc)
{
    var szNumTypDoc= szNumTypDoc.replace(/POS_NUM_SSPAGE=[0-9]*/, "POS_NUM_SSPAGE=0");
    var szUrl = document.principal.URL_CONSULT_NATIF.value+"?"+szNumTypDoc;
    
    window.open(szUrl, '_blank');
}

function onConsulterOcc(szNumTypDoc)
{
    szUrl = document.principal.URL_CONSULT_OCC.value+"?"+szNumTypDoc+"&"+document.principal.SZ_RECHERCHE.value;

    window.open(szUrl, 'consult_occ', 'scrollbars=yes,top=100,width=700,height=500');
}

function onConsulterOccPdf(szNumTypDoc)
{
    szUrl = document.principal.URL_CONSULT_OCC_PDF.value+"?"+szNumTypDoc+"&"+document.principal.SZ_RECHERCHE.value;
    window.open(szUrl, 'consult_occ_pdf', 'scrollbars=yes,top=100,width=700,height=500,resizable=yes,location=yes');
}


function onAjouterPanier(szNumTypDoc)
{
    var szUrl = "";
    var szPosNumTypDoc = "";
    tabTmp1 = szNumTypDoc.split("&");
    // tabTmp1[0] = "POS_NUM_DOC=xxxx"; tabTmp1[1] = "POS_TYPDOC=xxx"
    
    tabTmp2 = tabTmp1[0].split("=");
    // tabTmp2[0] = "POS_NUM_DOC"; tabTmp2[1] = "xxxx"
    
    tabTmp3 = tabTmp1[1].split("=");
    // tabTmp3[0] = "POS_TYPDOC"; tabTmp3[1] = "xxx"
	szPosNumTypDoc = tabTmp2[1]+"|"+tabTmp3[1]+"+";
    	
	szUrl = getUrlFtx("URL_PANIER") + escape(szPosNumTypDoc);
	toto = window.open(szUrl, 'attente', 'left='+CST_PANIER_LEFT+',top='+CST_PANIER_TOP+',height='+CST_PANIER_HEIGHT+',width='+CST_PANIER_WIDTH+',scrollbars=no,location=no,toolbar=no,status=no,resizable=no');
	setTimeout("toto.close()",2500); 
}


function onRechercher()
{
    var szUrl = document.principal.URL_ATTENTE.value + "?URL=" + document.principal.URL_RECHERCHE_FTX.value;
    szUrl += "&"+document.principal.SZ_RECHERCHE.value;
    szUrl += "&POS_QUESTION_NEW=" + escape(document.principal.POS_QUESTION_NEW.value);
    location.href=szUrl;
    return false;
}

function onModifierCriteres()
{
    szUrl = document.principal.URL_AFFICHER_RECHERCHE_FTX.value+"?"+document.principal.SZ_RECHERCHE.value;
    szUrl+= "&POS_QUESTION_NEW=" + escape(document.principal.POS_QUESTION_NEW.value);

    location.href=szUrl;
}

function getContentContextMenu()
{
	var s= "";
	for (var i=0;i<=sitems.length-1;i++)
	{
		if(sitems[i] == "<HR>")
			s+= sitems[i];
		else if(bAfficheFichier==1 || i==0 || i==3)
		{
			if(sitemlinks[i].substring(sitemlinks[i].length-2, sitemlinks[i].length) == "()")
			{
				// ici on doit faire passer le num doc dans les parentheses de la fct.
				szNomFct = sitemlinks[i].substring(0, sitemlinks[i].length-2);
				s+='&nbsp;<a href=\"javascript:void(0)\" onClick=\"'+szNomFct+'(\''+szInfos+'\')\">'+sitems[i]+'</a><br>';
			}
			else
				s+='&nbsp;<a href=\"'+sitemlinks[i]+'\" class=glowtext>'+sitems[i]+'</a><br>';
		}
	    else
	        s+= "&nbsp;<FONT COLOR='#999999'>"+sitems[i]+"</FONT><BR>";
	}
    return s;
}
