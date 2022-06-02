document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/popup_menu.js\"></SCRIPT>");

// Javascript qui gere l'affichage du menu popup 
// qui s'affiche sur la page de la liste resultat.

/**
 *
 * Cette fonction retourne les urls suivant le type de l'application : Servlet ou PHP
 * Elle prend en paramètre les URLS à écrire
 *
 */
function getUrlReponse(type_url)
{
	var tabCodeUrl = new Array();
	if(CST_TYPE_APPLI == 1)	{
		tabCodeUrl["URL_CONSULTER"] = "../../../../interface/session/principal/attente/attente.php?URL=URL_CONSULTER_INDEX&MODE=CONSULTATION&";
		tabCodeUrl["URL_MODIFIER"] = "../../../../interface/session/principal/attente/attente.php?URL=URL_CONSULTER_INDEX&MODE=MODIFICATION&";
		tabCodeUrl["URL_SUPPRIMER"] = "../../../../interface/session/principal/ajax/supprimer_index.php?";
		tabCodeUrl["URL_IMPRIMER_LR"] = "../../../../interface/session/principal/impression/frame.php?";
		tabCodeUrl["URL_CREER"] = "../../../../interface/session/principal/creation/afficher_creation.php?POS_TYPEDOC=";
		tabCodeUrl["URL_PANIER"] = "../../../../interface/session/principal/panier/ajouter_panier.php?SZ_POS_TYPNUMDOC=";
		tabCodeUrl["URL_RECHERCHER_PANIER"] = "../../../../interface/session/principal/resultat/rechercher_db.php?POS_FIRSTLOAD=0&TYPE_RECHERCHE=RECHERCHE_PANIER";
		tabCodeUrl["URL_EXPORTER"] = "../../../../interface/session/principal/export/afficher_export.php?";
		tabCodeUrl["URL_SUPPRIMER_PANIER"] = "../../../../interface/session/principal/panier/supprimer_panier.php?SZ_POS_TYPNUMDOC=";
		tabCodeUrl["URL_INSERE_DOSSIER"] = "../../../../interface/session/principal/dossier/ajax_deplacer_fils_dossier.php?ACTION=AJOUTER&";
		tabCodeUrl["URL_RETIRE_DOSSIER"] = "../../../../interface/session/principal/dossier/ajax_deplacer_fils_dossier.php?ACTION=RETIRER&";
        tabCodeUrl["URL_LANCER_ACTION"] = "../../../../interface/session/principal/attente/attente.php?URL="+URL_SITE + "/interface/session/principal/hermes/lancer_nactions.php&POS_SZ_NUMDOC=";
		tabCodeUrl["URL_MAJ_RAFALE"] = "../../../../interface/session/principal/majrafale/afficher_maj_rafale.php?";
		tabCodeUrl["URL_LANCER_ACTION_VARIABLE"] = "../../../../interface/session/principal/hermes/afficher_form_rubriques.php?POS_SZ_NUMDOC=";
		tabCodeUrl["URL_GENERER_RAPPORT"] = "../../../../interface/session/principal/export/afficher_export.php?";
		tabCodeUrl["URL_EXPORT_XML"] = "../../../../interface/session/principal/attente/attente.php?URL="+URL_SITE + "/interface/session/principal/export/exporter_resultat_xml_xsl.php&";
		tabCodeUrl["URL_IMPRIMER_FICHIERS"] = "../../../../interface/session/principal/impression/aff_imprimer_fichiers.php?SZ_POS_NUMDOC=";
	}
	else if (CST_TYPE_APPLI == 2)
	{
		tabCodeUrl["URL_CONSULTER"] = "../../../../servlet/interface/session/principal/consultation.ConsulterIndex?MODE=CONSULTATION&";
		tabCodeUrl["URL_MODIFIER"] = "../../../../servlet/interface/session/principal/consultation.ConsulterIndex?MODE=MODIFICATION&";
		tabCodeUrl["URL_SUPPRIMER"] = "../../../../servlet/interface/session/principal/ajax.SupprimerIndex?";
		tabCodeUrl["URL_IMPRIMER_LR"] = "../../../../servlet/interface/session/principal/impression.Frame?";
		tabCodeUrl["URL_CREER"] = "../../../../servlet/interface/session/principal/creation.AfficherCreation?POS_TYPEDOC=";
		tabCodeUrl["URL_PANIER"] = "../../../../servlet/interface/session/principal/panier.AjouterPanier?SZ_POS_TYPNUMDOC=";
		tabCodeUrl["URL_RECHERCHER_PANIER"] = "../../../../servlet/interface/session/principal/resultat.Rechercher?POS_FIRSTLOAD=0&TYPE_RECHERCHE=RECHERCHE_PANIER";
		tabCodeUrl["URL_EXPORTER"] = "../../../../servlet/interface/session/principal/export.AfficherExport?";
		tabCodeUrl["URL_SUPPRIMER_PANIER"] = "../../../../servlet/interface/session/principal/panier.SupprimerPanier?SZ_POS_TYPNUMDOC=";
		tabCodeUrl["URL_INSERE_DOSSIER"] = "../../../../servlet/interface/session/principal/dossier.AjaxDeplacerFilsDossier?ACTION=AJOUTER&";
		tabCodeUrl["URL_RETIRE_DOSSIER"] = "../../../../servlet/interface/session/principal/dossier.AjaxDeplacerFilsDossier?ACTION=RETIRER&";
		tabCodeUrl["URL_GENERER_RAPPORT"] = "../../../../servlet/interface/session/principal/rapport.AfficherTypeRapport?";
		tabCodeUrl["URL_LANCER_ACTION"] = "../../../../servlet/interface/session/principal/hermes.LancerNActions?POS_SZ_NUMDOC=";
		tabCodeUrl["URL_MAJ_RAFALE"] = "../../../../servlet/interface/session/principal/majrafale.AfficherMajRafale?";
		tabCodeUrl["URL_LANCER_ACTION_VARIABLE"] = "../../../../servlet/interface/session/principal/hermes.AfficherFormRubriques?POS_SZ_NUMDOC=";
	}
	return tabCodeUrl[type_url];	
}


/** Modification Andry - suppression / modification multiple */



function lancerSuppression(szUrlSuppression)
{
    // return false;
    lancerRequete(szUrlSuppression, "Suppression en cours...", function(objRep) {
        //parent.updateMenuRemoveFils(objRep.numdoc, 0);
        actualiser();
    });
}

/** Modification Andry - suppression / modification multiple */

function onSupprimer(szNumTypDoc)
{

    lancerSuppression(getUrlReponse("URL_SUPPRIMER")+szNumTypDoc);

}

/** Modification Andry **/
function afficherAttente(message){
    var iFrame = $(parent.document.getElementById("ifr_center")).contents().find('body');
    iFrame.css("position", "relative");
    iFrame.prepend("<div id='boxImgAttente'><img id='imgAttente' src='../../../../images/icons/attente.gif'/>&nbsp;&nbsp;<br><br><b>"+message+"</b></div>");
}

function cacherAttente(){
    var iFrame = $(parent.document.getElementById("ifr_center")).contents().find('body');
    if(iFrame.find("#boxImgAttente").length > 0)
        iFrame.find("#boxImgAttente").remove();
}

function cacherIcon(){
    if($("#dd-demo-0").length > 0)
        $("#dd-demo-0").hide();
}

/** Modification Andry - modification multiple */

function onAction(fctName)
{
    var arr = getArrayAttrHightlightedDocs('data-paramurl');
    if (fctName == "onConsulter" || fctName == "onModifier") {

        if($('body').find('table#tablelr').find('tr.highlightRow').length){

            $('body').find('table#tablelr').find('tr.highlightRow').each(function(e){
                $(this).removeClass('highlightRow').addClass('ligneConsulte');
            });
            
        }


        if($('body').find('table#tablelr').find('input.checkbox_select_doc').length){

            $('body').find('table#tablelr').find('input.checkbox_select_doc').each(function(e){
                $(this).prop('checked', false).removeAttr('checked');
            });
            
        }


        if($('body').find('#actionsSelection').length){

            $('body').find('#actionsSelection').css({'visibility': 'hidden'});
    
        }

        if (arguments.length == 2) {
            arr = new Array(arguments[1]);
        }
        arr.map(function(paramurl) {
            var sUrl = (fctName == "onConsulter") ? getUrlReponse("URL_CONSULTER") : getUrlReponse("URL_MODIFIER");
            parent.openPosDocument(sUrl + paramurl, getUrlReponse("URL_CONSULTER"));
        });
    }
    else if(fctName == "onOuvrirDossier") {
        var szInfoDos = arr[0];
        if(szInfoDos.length > 0)
    	{
    	    var tabTmp1 = szInfoDos.split("&");
    	    // tabTmp1[0] = "POS_NUM_DOC=xxxx"; tabTmp1[1] = "POS_TYPDOC=xxx"
    		var tabTmp2 = tabTmp1[0].split("=");
    		// tabTmp2[0] = "POS_NUM_DOC"; tabTmp2[1] = "xxxx"
    		parent.ouvrirDossierDansMenu(tabTmp2[1]);
    	}
    }
    else if(fctName == "onConsulterAttributs") {
        var sUrl = getUrlReponse("URL_CONSULTER_ATTRIBUT")+arr[0];
        return parent.parent.openWindow(sUrl, 'consultation', 40, 40, 500, 600,'yes','no','no','no','yes');
    }
    /*
    else if(fctName == "onSupprimer") {
        var szUrlSuppression = "";
    	if(parent.posMessageBoxConfirm(document.principal.MESSAGE_SUPP_DOC.value))
    	{
    		  szUrlSuppression = getUrlReponse("URL_SUPPRIMER")+arr[0];
              lancerSuppression(szUrlSuppression);
    	}
    }*/
    else if(fctName == "onSupprimer") {

        var iNumDoc = parent.getSelectedRow(null);
            if(iNumDoc.length == 0){
                posMessageBoxWarning(CST_LIBELLE_SELECT_DOC_EN_MODIF);
                return false;
            }

            var message = (iNumDoc.length > 1) 
            ? parent.document.getElementById('ifr_center').contentWindow.document.principal.MESSAGE_SUPP_DOC_PLURIEL.value
            : parent.document.getElementById('ifr_center').contentWindow.document.principal.MESSAGE_SUPP_DOC.value ;
            if(parent.posMessageBoxConfirm(message)){
                afficherAttente(parent.CST_MESSAGE_ATTENTE_SUPRESSION_DOCUMENT);
                setTimeout(function() {
                    var param = [];
                    if(iNumDoc.length > 1){
                        var szInfosArray = szInfos.split("&");
                        param.push("POS_LISTE_NUM_DOC="+iNumDoc.join(";"));
                        param.push(szInfosArray[1]);
                        param.push(szInfosArray[2]);
                        arr = param.join("&");
                    }else{
                        arr = arr[0];
                    }
                    onSupprimer(arr);
                    
                }, 100);
            }

        return false;

    }
    else if(fctName == "onImprimerLR") {
    
        var nbDocumentSelect = getNbDocChecked();
        var szUrlImprimerLR = getUrlReponse("URL_IMPRIMER_LR");
        szUrlImprimerLR += "INUMQUEST=" + document.principal.INUMQUEST.value;
        szUrlImprimerLR += "&POS_NUMDOS=" + document.principal.POS_NUMDOS.value;
        szUrlImprimerLR += "&LISTE_NUMDOC=" + ((nbDocumentSelect > 0) ? getListeNumInfo(false) : "");
        szUrlImprimerLR += "&PROFIL_LR=" + escape(document.principal.POS_PROFIL_LR.value);
        szUrlImprimerLR += "&POS_LR_TRI_NUM_COL=" + document.principal.POS_LR_TRI_NUMCOL.value;
        szUrlImprimerLR += "&POS_LR_TRI_TYPE=" + document.principal.POS_LR_TRI_TYPE.value;
        return parent.modelesswinyui(szUrlImprimerLR, "Impression des métadonnées de la liste des résultats", {width: CST_WIDTH_IMP, height: CST_HEIGHT_IMP, left: CST_LEFT_IMP, top: CST_TOP_IMP});
    }
    else if(fctName == "onExporter") {
    
    	var nbDocumentSelect = getNbDocChecked();
        var szUrlExporter = getUrlReponse("URL_EXPORTER");
    	szUrlExporter += "INUMQUEST=" + document.principal.INUMQUEST.value;
    	szUrlExporter += "&POS_NUMDOS=" + document.principal.POS_NUMDOS.value;
        szUrlExporter += "&LISTE_NUMDOC=" + ((nbDocumentSelect > 0) ? getListeNumInfo(false) : "");
    	szUrlExporter += "&PROFIL_LR="+escape(document.principal.POS_PROFIL_LR.value);
        return parent.modelesswinyui(szUrlExporter, "Exportation des métadonnées et documents de la liste des résultats", {width: CST_WIDTH_ASSO, height: CST_HEIGHT_ASSO, left: CST_LEFT_ASSO, top: CST_TOP_ASSO});
    }   

    else if(fctName == "onAjouterPanier") {
    
        var szPosNumTypDoc = getListeNumInfo(true);
    	if(szPosNumTypDoc.length > 0)
    	{
    		var szUrlPanier = getUrlReponse("URL_PANIER")+szPosNumTypDoc;
    		window.open(szUrlPanier, 'attente', 'left='+CST_PANIER_LEFT+',top='+CST_PANIER_TOP+',height='+CST_PANIER_HEIGHT+',width='+CST_PANIER_WIDTH+',scrollbars=no,location=no,toolbar=no,status=no,resizable=no'); 
    	}
        else
            parent.posMessageBoxWarning(document.principal.MESSAGE_SELECT_PANIER.value);    
        closeCtxMenu();
    }
    else if(fctName == "onSupprimerPanier") {
    
        var szPosNumTypDoc = getListeNumInfo(true);
        if(szPosNumTypDoc.length > 0)
        {	
        	if(parent.posMessageBoxConfirm(document.principal.MESSAGE_SUPP_DOC.value))
        	{
            	var szUrlPanier=getUrlReponse("URL_SUPPRIMER_PANIER")+szPosNumTypDoc;
        		window.open(szUrlPanier, 'attente', 'left='+CST_PANIER_LEFT+',top='+CST_PANIER_TOP+',height='+CST_PANIER_HEIGHT+',width='+CST_PANIER_WIDTH+',scrollbars=no,location=no,toolbar=no,status=no,resizable=no');
        	}
        }
        else
            parent.posMessageBoxWarning(document.principal.MESSAGE_SELECT_PANIER.value);    
    } 
    else if(fctName == "onInsereDos") {
    
        var url = getUrlReponse("URL_INSERE_DOSSIER");
        // cas du drag and drop, l'appel est fait depuis le parent
        if (arguments.length == 2)
    		url += arguments[1];
        else 
            url += "POS_LISTE_NUM_DOC=" + getListeNumInfo(false);
            
        if(parent.document.principal.POS_NUM_DOSSIER_POUR_AJOUT.value != "")
        {
            url+="&POS_NUM_DOSSIER_PERE="+parent.document.principal.POS_NUM_DOSSIER_POUR_AJOUT.value;
            url+="&POS_TITRE_DOSSIER_PERE="+escape(parent.document.principal.POS_TITRE_DOSSIER_PERE.value);
            url+="&POS_INDICE_DOSSIER_PERE="+parent.document.principal.POS_INDICE_DOSSIER_POUR_AJOUT.value;
            lancerRequete(url, "Insertion dans dossier en cours...", function(objRep) {
                parent.selectNode(parent.document.principal.POS_INDICE_DOSSIER_POUR_AJOUT.value);
            });
        }
        else
        {
            message = document.principal.MESSAGE_RENSEIGNER_DOSSIER_PERE.value;
    		parent.posMessageBoxWarning(message);	
        } 
    } 
    else if(fctName == "onRetireDos") {
    
        if(document.principal.POS_NUMDOS.value != "")
        {
            var url_retire_dossier=getUrlReponse("URL_RETIRE_DOSSIER");
            url_retire_dossier += "POS_LISTE_NUM_DOC=" + getListeNumInfo(false);
        
        	url_retire_dossier+="&POS_NUM_DOSSIER_PERE="+document.principal.POS_NUMDOS.value;
    		url_retire_dossier+="&POS_TITREDOS="+escape(document.principal.POS_TITREDOS.value);
        	lancerRequete(url_retire_dossier, "Retrait du dossier en cours...", function(objRep) {
                parent.updateMenuRemoveFils(objRep.numdoc, objRep.numdos);
                actualiser();
            });
        }
        else
            parent.posMessageBoxWarning("Le numéro de dossier pour insertion est vide");
    } 
    else if(fctName == "onActionHermes") {
    
        var szLibelleAction = arguments[1];
        var bIsVariable = arguments[2];
        var nbDocumentSelect = getNbDocChecked();
        if(nbDocumentSelect > 0)
    	{
            var szListePosNumDoc = getListeNumInfo(false);	
    	    if (bIsVariable)
    	    {
            	var szUrlHermes = getUrlReponse("URL_LANCER_ACTION_VARIABLE")+szListePosNumDoc+"&POS_HERM_LIBACT="+escape(szLibelleAction);
                return parent.modelesswinyui(szUrlHermes, "Hermès", {width: 600, height: 400, left: 100, top: 100});
            }
            else
            {
            	var szUrlHermes = getUrlReponse("URL_LANCER_ACTION")+szListePosNumDoc+"&POS_HERM_LIBACT="+escape(szLibelleAction);
                return parent.modelesswinyui(szUrlHermes, "Hermès", {width: 600, height: 400, left: 100, top: 100});
            }
        }
        else
            parent.posMessageBoxWarning(document.principal.MESSAGE_SELECT_PANIER.value);
    }
    else if(fctName == "onMiseAJourRafale") {
    
        var nbDocumentSelect = getNbDocChecked();
        var szUrlExporter = getUrlReponse("URL_MAJ_RAFALE");
    	szUrlExporter += "INUMQUEST=" + document.principal.INUMQUEST.value;
    	szUrlExporter += "&POS_NUMDOS=" + document.principal.POS_NUMDOS.value;
        szUrlExporter += "&LISTE_NUMDOC="  +  ((nbDocumentSelect > 0) ? getListeNumInfo(false) : "");
        return parent.modelesswinyui(szUrlExporter, "Mise à jour en rafale", {width: 700, height: 550, left: CST_LEFT_ASSO, top: CST_TOP_ASSO});
    }
    else if(fctName == "onConsulterAttributs") {
        var sUrl = getUrlReponse("URL_CONSULTER_ATTRIBUT")+arr[0];
        var searchReq = parent.searchReq;
        
    	var sUrlAtt="";
        var szNumTypDoc = arr[0];
        var pos1NumDoc = szNumTypDoc.indexOf("POS_NUM_DOC=");
        var pos1NumDos = szNumTypDoc.indexOf("POS_NUMDOS=");
        var sNumAtt = 0;
        //POS_NUM_DOC=102681&POS_TYPEDOC=ANO&POS_NUMDOS=108491&isdos=0
        if (pos1NumDoc >= 0 && pos1NumDos >= 0)
        {
            pos2NumDoc = szNumTypDoc.indexOf("&", pos1NumDoc);
            pos2NumDos = szNumTypDoc.indexOf("&", pos1NumDos);
            var iNumDoc = szNumTypDoc.substring(pos1NumDoc + "POS_NUM_DOC=".length, pos2NumDoc);
            var iNumDos = szNumTypDoc.substring(pos1NumDos + "POS_NUMDOS=".length, pos2NumDos);
            if (searchReq.readyState == 4 || searchReq.readyState == 0)
        	{
        		var szRequete = URL_SITE + "/interface/session/principal/ajax/get_info_attribut.php?";
        		szRequete += "POS_NUM_DOC=" + iNumDoc;
                szRequete += "&POS_NUMDOS=" + iNumDos;
        		
        	   	searchReq.open("GET", szRequete, false);
        	   	searchReq.send(null);
        	   if (searchReq.readyState == 4 || searchReq.readyState == 0)
        	   {
            	   	var objAction = eval('(' + searchReq.responseText + ')');
            	   	if (objAction.code_retour == 1)
            	   	{
                        // le paramètre POS_NUM_DOC est utilise pour l'ouverture de l'onglet
                        sUrlAtt = getUrlReponse("URL_CONSULTER_ATTRIBUT")+ "POS_NUM_DOC=" + objAction.numdoc_att + "&NUMDOC_ATT=" + objAction.numdoc_att + "&DROIT_ATT=" + objAction.droit_att;
                        parent.openPosDocument(sUrlAtt, null);			
        			}
        			else
            			alert(objAction.msg_erreur);	
            	}
            }
        }
    }
}

/**
 * Conserve un acces direct car est appelee depuis 'navigation.js'
 */
function onConsulter(sParamUrl) {
    onAction('onConsulter', sParamUrl);
}
/**
 * Conserve un acces direct car est appelee depuis 'navigation.js'
 */
function onModifier(sParamUrl) {
    onAction('onModifier', sParamUrl);
}
function onInsereDos(sParamUrl) {
    onAction('onInsereDos', sParamUrl);
}
			
function getArrayAttrHightlightedDocs(attr) {
    var arr = []; 
    $("#tablelr").find("tr.highlightRow").each(function(){
        arr.push($(this).attr(attr));
    });
    return arr;
}

function onConsulterFichier(szNumTypDoc)
{
	var szChaineNumDocTypeDoc = "";
	
	if(arguments.length == 1)
		szChaineNumDocTypeDoc = szNumTypDoc;
	if (szChaineNumDocTypeDoc.length > 0)
	{
	   var tabTmp1 = szChaineNumDocTypeDoc.split("&");
	   // tabTmp1[0] = "POS_NUM_DOC=xxxx"; tabTmp1[1] = "POS_TYPDOC=xxx"
	   
       var tabTmp2 = tabTmp1[0].split("=");
	   // tabTmp2[0] = "POS_NUM_DOC"; tabTmp2[1] = "xxxx"
	   AfficherFichierPdfLR(tabTmp2[1], 'phpsessid', '0');
    }
}

function onSupprimerListe(szNumTypDoc)
{
    var szListePosNumDoc = getListeNumInfo(false);
	if(szListePosNumDoc.length > 0) {
        var szUrlSuppression = getUrlReponse("URL_SUPPRIMER") + "POS_LISTE_NUM_DOC=" + szListePosNumDoc;
        lancerSuppression(szUrlSuppression);
    }
    else {
        parent.posMessageBoxWarning(document.principal.MESSAGE_SELECT_PANIER.value);
    }
}

function lancerRequete(sUrl, sMsgAttente, fctOk)
{
    parent.showPosInformation(sMsgAttente);
	var searchReq = parent.searchReq;
    if (searchReq.readyState == 4 || searchReq.readyState == 0)
	{
        searchReq.open("GET", sUrl, false);
	   	searchReq.send(null);
        if (searchReq.readyState == 4 || searchReq.readyState == 0)
        {
            parent.hidePosInformation();
            var objRep = eval('(' + searchReq.responseText + ')');
            if (objRep.code_retour == 1) {
                fctOk(objRep);
            }
            else
                alert(objRep.msg_erreur);	
    	}
    }
}

function onImprimerFichiers()
{
	var szPosNumDoc = getListeNumInfo(false);
	if(szPosNumDoc.length > 0)
	{
		szUrl=getUrlReponse("URL_IMPRIMER_FICHIERS")+szPosNumDoc;
		return window.open(szUrl, 'impression', 'left='+CST_LEFT_IMP+',top='+CST_TOP_IMP+',height='+CST_HEIGHT_IMP+',width='+CST_WIDTH_IMP+',scrollbars=yes,location=no,toolbar=no,status=no,resizable=no')
	}
    else
        parent.posMessageBoxWarning(document.principal.MESSAGE_SELECT_REP.value);    
}


function onSelectPanierElt(evt, element){

    closeCtxMenu();
    var oldTr = $(".highlightRow").find("input.checkbox_select_doc").not(':checked').parent().parent();
    if (oldTr)
        oldTr.removeClass("highlightRow");
    if($(element).hasClass("listeResumee")){
        if($(element).find("input.checkbox_select_doc").is(":checked")) {
            $(element).find("input.checkbox_select_doc").prop("checked", false);
        }
        else {
            $(element).find("input.checkbox_select_doc").prop("checked", true);
        }
    }
    
    if($(element).find("input.checkbox_select_doc").is(":checked")) {
        highlightElement(element.parentElement);
    }
    else {
        unhighlightElement(element.parentElement);
    }
    majActionsMultiples();
    stopEvent(evt);
}

function majActionsMultiples() {
    var nbDocumentSelect = getNbDocChecked();
    if ( $("#nbDocumentSelect")[0]) {
        $("#nbDocumentSelect")[0].innerHTML = nbDocumentSelect + " " + (nbDocumentSelect > 1 ? document.principal.LIBELLE_DOCS_SELECTS.value : document.principal.LIBELLE_DOC_SELECT.value); 
        $("#actionsSelection")[0].style.visibility = (nbDocumentSelect == 0) ? "hidden" : "";
    }
    if (nbDocumentSelect > 0)
        afficheMenuMultiple();
}

function getNbDocChecked() {
    return $("input.checkbox_select_doc:checked").length;
}


var checkAllPanier = true;
function selectAllPanier(evt)
{
    // checkAll : checks all those unchecked
	if (checkAllPanier) 
        $("input[type='checkbox'][name ^= 'POS_PANIER']:not(':checked')").parent().trigger("click");
    else
        $("input[type='checkbox'][name ^= 'POS_PANIER']:checked").parent().trigger("click");
    checkAllPanier = !checkAllPanier;
    stopEvent(evt);
}

function afficheMenuMultiple(evt)
{console.log("-afficheMenuMultiple-");
    var s = getContentContextMenuMultiple();
    var p = $(".labelselectdoc").first();
    x = p.position().left;
    y = p.position().top + 20;
    affiche_popup_menu(s);
    if (evt)
        stopEvent(evt);
}

function getContentContextMenu()
{console.log('-getContentContextMenu-', sitems);
    var s = "<ul class='menulr'>";	
	for (var i=0;i<sitems.length;i++)
	{
		if(sitems[i].libelle == "<HR>")
			s += '<img src=\"../../../../images/themes/fond/traitclair.gif\" width=\"159\" height=\"2\"><br>';
		else
		{
			if(sitems[i].fonction.indexOf("'onOuvrirDossier'") != -1 &&
                (document.principal.TYPE_RECHERCHE.value == "RECHERCHE_PANIER" || szInfos.indexOf("isdos=1") == -1))
                continue;
            s += '<li><a class=\"item_menu\" href=\"javascript:void(0)\" onClick=\"' + sitems[i].fonction + '\"><IMG alt="" src=\"../../../../images/icons/'+  sitems[i].icone + '\">&nbsp;' + sitems[i].libelle + '</a></li>';
		}
    }
    s += "</ul>";
    return s;
}

function getContentContextMenuMultiple()
{
    var s = "";
	for (var i=0;i<=sitems.length-1;i++)
	{
		if(sitems[i].libelle == "<HR>") {
            if (i != 0 && sitems[i-1].libelle == "<HR>")
                continue;
		    s += '<img src=\"../../../../images/themes/fond/traitclair.gif\" width=\"159\" height=\"2\"><br>';
		}
		else
		{
			// if(sitems[i].fonction.indexOf("'onSupprimer'") == -1 && sitems[i].fonction.indexOf("'onOuvrirDossier'") == -1)
			    s += '&nbsp;<IMG src=\"../../../../images/icons/'+ sitems[i].icone + '\">&nbsp;<a class=\"item_menu\" href=\"javascript:void(0)\" onClick=\"' + sitems[i].fonction + '\">' + sitems[i].libelle + '</a><br>';
		}
    }
    return s;
}

/**
 * Fonction qui permet d'accèder à la fenêtre de generation de rapport
 * @param1 : Numéro de question dans le cas de questions ou liste de num infos séparés par un espace
 */
function onGenererRapport()
{
    var szListePosNumDoc = getListeNumInfo(true);
	if(szListePosNumDoc.length > 0 || confirm("Vous n'avez pas sélectionné de document,\nsouhaitez vous le générer sur tous les documents ?"))
	{	
	    var szUrlRapport = getUrlReponse("URL_EXPORT_XML") + "FEUILLE_XSL=annexe1.xsl" + "&MIME_TYPE=application/html&PHPSESSID=";
	    szUrlRapport += document.principal.PHPSESSID.value;
	    if(szListePosNumDoc.length == 0)
	    {
	        // cas d'une question
            if (document.principal.INUMQUEST.value.length > 0)
                szUrlRapport += "&INUMQUEST="+document.principal.INUMQUEST.value;
            // cas d'un dossier
            else
                szUrlRapport += "&LISTE_NUMDOC="+getListeNumInfo(true);
        }
	    else
    	    szUrlRapport += "&LISTE_NUMDOC="+szListePosNumDoc;

		var fenetreRapport = window.open(szUrlRapport, 'attente', 'left=200,top=50,height=400,width=600,scrollbars=yes,location=no,toolbar=no,status=no,resizable=yes');
		setTimeout("fenetreRapport.close()", 5000); 
    }
}

/**
 * Fonction qui permet d'accéder à la fenêtre de generation de rapport
 * @param1 : Numéro de question dans le cas de questions ou liste de num infos séparés par un espace
 */
function getListeNumInfo(withTypeDoc)
{
    var szListePosNumDoc = "";
    var arr = getArrayAttrHightlightedDocs('data-paramurl');
    arr.map (function (paramurl) {
        var tabTmp1 = paramurl.split("&");
		// tabTmp1[0] = "POS_NUM_DOC=xxxx"; tabTmp1[1] = "POS_TYPDOC=xxx"
				
		var tabTmp2 = tabTmp1[0].split("=");
		// tabTmp2[0] = "POS_NUM_DOC"; tabTmp2[1] = "xxxx"
				
		var tabTmp3 = tabTmp1[1].split("=");
		// tabTmp3[0] = "POS_TYPDOC"; tabTmp3[1] = "xxx"
		if (withTypeDoc)
            szListePosNumDoc += tabTmp2[1]+"|"+tabTmp3[1]+"+";
		else
		    szListePosNumDoc += tabTmp2[1]+";";
    });

	return escape(szListePosNumDoc);
}

function afficherListeFichiers() {

    // la table
	var tablelr = document.getElementById("tablelr");
	// les lignes de la table
	var ligneslr = tablelr.rows;

	var iInitCptBoucle = 1;
	if (document.getElementById('tr_filtre_entete'))
	   iInitCptBoucle = 2;
	
	var cellsLigneEntete = ligneslr[0].cells;
    var iNumCelluleDateFIC = -1;
    for (var i=1;i<cellsLigneEntete.length;i++)
	{
       if (cellsLigneEntete[i].id.indexOf("rub19") != -1 || 
            (cellsLigneEntete[i].id.indexOf("rub10") != -1 && document.principal.AFFICHER_FICHIER_DANS_LR_COL_NAME.value.length != 0 && 
            cellsLigneEntete[i].innerHTML.indexOf(document.principal.AFFICHER_FICHIER_DANS_LR_COL_NAME.value) != -1))
	       iNumCelluleDateFIC = i;
    }
    if (iNumCelluleDateFIC != -1)
    {   
        for (i=iInitCptBoucle;i<tablelr.rows.length;i++) 
        {
            var fichiersLR = tablelr.rows[i].cells[iNumCelluleDateFIC].innerHTML;
            // id='doc_<numdoc>'
            var iNumDoc = tablelr.rows[i].id.substring(4); 
            if (fichiersLR.length > 0) {
                tablelr.rows[i].cells[iNumCelluleDateFIC].innerHTML = formatListeFichiers(iNumDoc, fichiersLR, 1);
                tablelr.rows[i].cells[iNumCelluleDateFIC].setAttribute("data-menu", "no");
            }
        }
    }
}

function completeAffichageFichier(obj, numdoc) {
    
    var searchReq = parent.searchReq;
    if (searchReq.readyState == 4 || searchReq.readyState == 0)
	{
        searchReq.open("GET", "../ajax/get_liste_info_page.php?numdoc=" + numdoc, false);
	   	searchReq.send(null);
        if (searchReq.readyState == 4 || searchReq.readyState == 0)
        {
            var objRep = JSON.parse(searchReq.responseText);
            if (objRep.code_retour == 1) {
                var s = objRep.tabfichiers.length + "|";
                for(var i =0; i<objRep.tabfichiers.length;i++) {
                    s += objRep.tabfichiers[i].wNumPage + "." + objRep.tabfichiers[i].wNbSousPage + " " + objRep.tabfichiers[i].szNomFichierOriginal + "|";
                }
                
                obj.parentNode.innerHTML = formatListeFichiers(numdoc, s, 1);
            }
    	}
    }
    return false;
}

function formatListeFichiers(numDoc, sListeFichiers, avecLien) 
{
    //return sListeFichiers;
    var sFormatListeFichiers = "";
    var tab = sListeFichiers.split("|");
    var iNbFichiers = parseInt(tab[0], 10);
    var iNbFichiersNonAff = 0;
    // demarre a 1, le premier item est le nombre de fichier
    for(var i=1;i<(iNbFichiers + 1);i++) {
        if (tab[i]) {

			var pos =  tab[i].indexOf(" ");
        	var posP =  tab[i].indexOf(".");
        	var numPage =  tab[i].substring(0, posP);
        	var numSsPage =  tab[i].substring(posP + 1, pos);
        	var nomFichier =  tab[i].substring(pos + 1);
        	if (nomFichier.length == 0) 
            	nomFichier = "Fichier " + numPage + "." + numSsPage;
            var nomFichierComplet = nomFichier;
            var posExt = nomFichier.lastIndexOf(".");
            nomFichier = " [" + nomFichier.substring(posExt + 1) + "] " + ((nomFichier.length >= 24) ? (nomFichier.substring(0, 20) + "...") : nomFichier.substring(0, posExt));                                     
        	
            if (avecLien == 1)   
            	sFormatListeFichiers += "<a style='color: inherit;' title=\"Télécharger le fichier : "+nomFichierComplet+"\" href='javascript:void(0);' onClick=\"javascript:AfficherFichierLR("+numDoc+","+numPage+","+numSsPage+",'phpsessid','CONSULTATION','','1')\"><span class='listeResumee'  data-menu='no' >"+ nomFichier + "</span></a><br>";
        	else
            	sFormatListeFichiers += nomFichier + "<br>";
		}
        else {
            iNbFichiersNonAff ++;
        }
    }
    if (iNbFichiersNonAff != 0)
        sFormatListeFichiers += "<a style='color: inherit;' data-menu='no' title=\"Liste de tous les fichiers\" href='javascript:void(0);' onClick=\"javascript:completeAffichageFichier(this, "+numDoc+")\"><span class='listeResumee'  data-menu='no' ><i>"+iNbFichiersNonAff + " fichier(s) non affiché(s)</i><br>" + "</span></a>"; 
    return sFormatListeFichiers; 
}
