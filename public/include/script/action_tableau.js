document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");
function getUrlTableau(type_url)
{
	var tabCodeUrl = new Array();
	if(CST_TYPE_APPLI == 1)
	{
		tabCodeUrl["URL_CONSULTER"] = URL_SITE + "/interface/session/principal/tableau/consulter_db.php?";
		tabCodeUrl["URL_MODIFIER"] = URL_SITE + "/interface/session/principal/tableau/consulter_db.php?";
		tabCodeUrl["URL_SUPPRIMER"] = URL_SITE + "/interface/session/principal/tableau/suppression_db.php?";
		tabCodeUrl["URL_CREER"] = URL_SITE + "/interface/session/principal/tableau/afficher_creation.php?";
	}
	else
	{
		tabCodeUrl["URL_CONSULTER"] = URL_SITE + "/servlet/interface/session/principal/tableau.ConsulterIndex?";
		tabCodeUrl["URL_MODIFIER"] = URL_SITE + "/servlet/interface/session/principal/consultation.ConsulterIndex?MODE=MODIFICATION&";
		tabCodeUrl["URL_SUPPRIMER"] = URL_SITE + "/servlet/interface/session/principal/tableau.SupprimerIndex?";
		tabCodeUrl["URL_CREER"] = URL_SITE + "/servlet/interface/session/principal/tableau.AfficherCreation?";
	}

	return tabCodeUrl[type_url];	
}

// Javascript qui gere l'affichage du menu popup 
// qui s'affiche sur la page de la liste resultat d'une rubrique tableau.
function lancerRequete(url,id)
{
	var xhr_object = null;
	var position = id;
	   if(window.XMLHttpRequest)  xhr_object = new XMLHttpRequest();
	  else
	    if (window.ActiveXObject)  xhr_object = new ActiveXObject("Microsoft.XMLHTTP"); 
	
	// lancement de la requete vers la page desiree
	xhr_object.open("GET", url, false);
	xhr_object.send(null);
    if (xhr_object.readyState == 4 || xhr_object.readyState == 0)
    {
    	if ( xhr_object.readyState == 4 )
    	{
			var objReponse = eval('(' + xhr_object.responseText + ')');
            if (objReponse.code_retour == 1) {
            
    			document.getElementById(position).innerHTML = objReponse.contenu_tableau;
			}
    	}
    }
}

// Lance l'affichage de la liste des documents tableaux dans un div
// sur la page de consultation du document principal
function lancerRequeteListeTableau(szPosTypeDoc, szValRub, szMode, szCodeRub, id)
{
	_lancerRequeteListeTableau(szPosTypeDoc, szValRub, szMode, szCodeRub, id, 1, 1);
}

function _lancerRequeteListeTableau(szPosTypeDoc, szValRub, szMode, szCodeRub, id, typeTri, colTri)
{
	if(CST_TYPE_APPLI == 1)
		urlAfficherTableau = "../../../../interface/session/principal/tableau/liste_doc_rub_tableau.php?";
	else
		urlAfficherTableau = "../../../../servlet/interface/session/principal/tableau.ListeDocRubTableau?";

	urlAfficherTableau += "POS_TYPEDOC_PERE=" + szPosTypeDoc;
	urlAfficherTableau += "&POS_VALEUR_TAB_RUB=" + szValRub;
	urlAfficherTableau += "&MODE=" + szMode;
	urlAfficherTableau += "&POS_CODE_RUB=" + szCodeRub;
	urlAfficherTableau += "&POS_LR_TRI_TYPE=" + typeTri;
	urlAfficherTableau += "&POS_LR_TRI_NUMCOL=" + colTri;
	if (eval("document.principal.HERM_DROITS_" + szCodeRub)) {
		var szDroitModSupCre = eval("document.principal.HERM_DROITS_" + szCodeRub).value;
		urlAfficherTableau += "&HERM_DROITS=" + szDroitModSupCre;
	}
	
	lancerRequete(urlAfficherTableau,id);
}

function changerTriTableau(szPosTypeDoc, szValRub, szMode, szCodeRub, id, typeTri, colTri) {
	_lancerRequeteListeTableau(szPosTypeDoc, szValRub, szMode, szCodeRub, id, typeTri, colTri);
}

function afficherLienIndexTableau(szUrl, szCodeRub)
{
	if (document.getElementById('TAB_AFFICHAGE_INTERNE_EXTERNE_' + szCodeRub) && 
		document.getElementById('TAB_AFFICHAGE_INTERNE_EXTERNE_' + szCodeRub).value == "EXTERNE") {
			openFicheTableau(szUrl, szCodeRub, "Fiche tableau", {width: 1000, height: 600, left: 100, top: 100});
	}
	else {
		document.getElementById('frtableau' + szCodeRub).src = szUrl;
		document.getElementById('frtableau' + szCodeRub).style.display = "block"; 
		document.getElementById('tableau' + szCodeRub).style.display = "none"; 
	}
}

function afficherLienListeTableau(szUrl, szCodeRub)
{
	if (parent.document.getElementById('TAB_AFFICHAGE_INTERNE_EXTERNE_' + szCodeRub) && 
		parent.document.getElementById('TAB_AFFICHAGE_INTERNE_EXTERNE_' + szCodeRub).value == "EXTERNE") {

		parent.lancerRequete(szUrl, 'tableau'+ szCodeRub);
		closeFenetreTableau();
	}
	else {
		parent.document.getElementById('tableau' + szCodeRub).style.display = "block"; 
		parent.lancerRequete(szUrl,'tableau'+ szCodeRub );
		parent.document.getElementById('frtableau' + szCodeRub).style.display = "none"; 
	}
}
	
function onConsulter(szNumTypDoc, codeRubrique, bBloqueModif)
{
	urlConsulterTableau = getUrlTableau("URL_CONSULTER");
	
	if(arguments.length == 2)
	    urlConsulterTableau += "MODE=CONSULTATION&"+szNumTypDoc+"&bBloqueModif=1";
	else
		urlConsulterTableau += "MODE=CONSULTATION&"+szNumTypDoc+"&bBloqueModif="+document.principal.POS_B_BLOQUE_MODIF.value;

    var szDroitModSupCre = eval("document.principal.HERM_DROITS_" + codeRubrique).value;
    urlConsulterTableau += "&HERM_DROITS=" + szDroitModSupCre;
	afficherLienIndexTableau(urlConsulterTableau, codeRubrique);
}

function onModifier(szNumTypDoc, codeRubrique)
{
	urlConsulterTableau =  getUrlTableau("URL_CONSULTER");
	urlConsulterTableau += "MODE=MODIFICATION&"+szNumTypDoc;
	var szDroitModSupCre = eval("document.principal.HERM_DROITS_" + codeRubrique).value;
	urlConsulterTableau += "&HERM_DROITS=" + szDroitModSupCre;
	afficherLienIndexTableau(urlConsulterTableau, codeRubrique);
}

function onSupprimer(szNumTypDoc, codeRubrique)
{
	if(parent.posMessageBoxConfirm("CST_JS_CONFIRM_SUPP_TAB"))
	{
		urlSupprimerTableau = getUrlTableau("URL_SUPPRIMER");
		urlSupprimerTableau += "MODE=MODIFICATION&"+szNumTypDoc;
		afficherLienIndexTableau(urlSupprimerTableau, codeRubrique);
	}
}

function onCreer(szNumTypDoc, codeRubrique)
{	
	szTmp1 = szNumTypDoc.split("&");
	for(i=0;i<szTmp1.length;i++)
	{
		szTmp2 = szTmp1[i].split("=");
		if(szTmp2[0] == "POS_VALEUR_RUB_LIE")
			if(szTmp2[1].length > 0)
				break;
			else
			{
				parent.posMessageBoxWarning("CST_JS_VAL_TB_VIDE");
				return false;
			}
	}
	urlCreerTableau = getUrlTableau("URL_CREER");
	urlCreerTableau += szNumTypDoc;
	var szDroitModSupCre = eval("document.principal.HERM_DROITS_" + codeRubrique).value;
	urlCreerTableau += "&MODE=MODIFICATION&&HERM_DROITS=" + szDroitModSupCre;
	afficherLienIndexTableau(urlCreerTableau, codeRubrique);
}

function onCreerEnchaine(szNumTypDoc, codeRubrique)
{
	szTmp1 = szNumTypDoc.split("&");
	for(i=0;i<szTmp1.length;i++)
	{
		szTmp2 = szTmp1[i].split("=");
		if(szTmp2[0] == "POS_VALEUR_RUB_LIE")
			if(szTmp2[1].length > 0)
				break;
			else
			{
				parent.posMessageBoxWarning("CST_JS_VAL_TB_VIDE");
				return false;
			}
	}
	urlCreerTableau = getUrlTableau("URL_CREER");
	urlCreerTableau += szNumTypDoc+"&ENCHAINER=1";
	afficherLienIndexTableau(urlCreerTableau, codeRubrique);
}

function modifRubBloque()
{
    if(document.principal.POS_B_BLOQUE_MODIF.value != 1)
    {
        exp="/'"+document.principal.POS_CODE_RUB.value+"'/";
        reg=eval(exp);
        // si on doit bloquer la rub (hermes)
        if(parent.document.principal.POS_ACTION_HERMES!= null && reg.test(parent.document.principal.POS_ACTION_HERMES.options[parent.document.principal.POS_ACTION_HERMES.options.options.selectedIndex].value))
        {
            document.body.className="NonModif";
        }
    }
}

function effaceMenu()
{
	if((ie4 && document.all["menu"].style.visibility == "visible") || (ns6 && document.getElementById("menu").style.visibility == "visible"))
	{
		hide_popup_menu();
	
		// on rajoute un click sur cette page car le click a ete fait sur le template principal et perturbe tout.
		nbClick = nbClick + 1;
	}
}

// Ouverture avec le meme principe que la fenetre des associations
// l'ouverture par Bootstrap pose probleme avec l'affichage du vocabulaire
var panelTableau;
function openFicheTableau(szUrl, szCodeRub, sTitreDialog, coord)
{
    var fenetretableau;
    
    if (document.body.classList.contains("yui-skin-sam"));
        document.body.classList.add("yui-skin-sam");
        
    if (!document.getElementById('div-tableau-panel')) 
    {
        fenetretableau = document.createElement("div");
        fenetretableau.id = "div-tableau-panel";
        // à masquer sinon réserve la place et affiche des ascenseurs
        fenetretableau.style.display = "none";
    }
    document.body.insertBefore(fenetretableau, document.body.firstChild)
    fenetretableau.style.display = "";
    
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event;
	panelTableau = new YAHOO.widget.Panel('div-tableau-panel', {
                draggable: true,
                close: true,
                zindex:4,
				modal: true,
				autofillheight: "body", // default value, specified here to highlight its use in the example 
                constraintoviewport: true,           
                underlay: 'none',
				width: coord.width + "px",
                height: coord.height + "px",
                xy: [coord.left, coord.top]
            });
	
	var textInnerHtml = "";
    panelTableau.setHeader(sTitreDialog);
    panelTableau.setBody(textInnerHtml);
	panelTableau.render();
	document.getElementById('frtableau' + szCodeRub).style.width = "100%";
	document.getElementById('frtableau' + szCodeRub).style.height = "100%";
	document.getElementById('frtableau' + szCodeRub).style.display = "block"; 
	document.body.querySelector('#div-tableau-panel .bd').appendChild(document.getElementById('frtableau' + szCodeRub));
	document.getElementById('frtableau' + szCodeRub).src = szUrl;
	
    panelTableau.subscribe("hide", function (event){
            setTimeout(function() {
				document.getElementById('frtableau' + szCodeRub).style.display = "none"; 
				document.body.appendChild(document.getElementById('frtableau' + szCodeRub));
				document.getElementById("frtableau" + szCodeRub).src = "../../../vide.htm";
				panelTableau.destroy();
            }, 0);
    });
}

function closeFenetreTableau()
{
    parent.panelTableau.hide();
}
