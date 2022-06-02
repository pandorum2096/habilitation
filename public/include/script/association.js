document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/yui/yui-use.js\"></SCRIPT>");
document.write("<link rel='stylesheet' type='text/css' href='../../../../include/script/yui/build/container/assets/skins/sam/container.css'/>");
document.write("<link rel='stylesheet' type='text/css' href='../../../../include/script/yui/build/resize/assets/skins/sam/resize.css'/>");
document.write("<link rel='stylesheet' type='text/css' href='../../../../include/script/yui/build/layout/assets/skins/sam/layout.css' /> ");

function creer_frame()
{ 
	window.open('attente_creation.htm', 'creation', 'screenX=100,screenY=100,scrollbars=no,location=no,toolbar=no,status=no,width=250,height=350')
}

function lancer_association(code, bRecupValeur)
{
    if(arguments.length == 2)		
        lancer_association_prive(code, bRecupValeur);
    else
        lancer_association_prive(code, 1);
}

function replaceAll(str, search, repl) { 
  while (str.indexOf(search) != -1) 
	 str = str.replace(search, repl); 
	return str; 
}

function afficher_lien(code)
{
    lancer_association_prive(code, 0);
}

/**
 * Ouvre la fenetre des associations de fiches
 * Ajout de bRecupValeur pour renseigner les champ de l'association
 * sinon c'est juste une consultation de fiches liees.
 */
function lancer_association_prive(code, bRecupValeur)
{
	var valeur = eval("document.principal.POS_VAL_RUB_" + code + ".value");
	lancer_association_prive_avec_valeur(code, bRecupValeur, valeur);
}

/**
 * Ouvre la fenetre des associations de fiches
 * Ajout de bRecupValeur pour renseigner les champ de l'association
 * sinon c'est juste une consultation de fiches liees.
 */
function lancer_association_prive_avec_valeur(code, bRecupValeur, valeur)
{
    var ref = "";
	if(CST_TYPE_APPLI == 1)
		ref="../../../../interface/session/principal/association/afficher_index_lie.php?";
    else if (CST_TYPE_APPLI == 2)
		ref="../../../../servlet/interface/session/principal/association.AfficherIndexLie?";
	else
        ref = "../../../../interface/session/principal/association/Frame.aspx?";
		
    var szValeur = valeur.toUpperCase();
		
	// On ne lance pas la fenetre si aucune valeur n'est saisi
	// A enlever si on affiche TOUTES les valeurs quand il n'y a rien de saisi
	// gestion des caractere speciaux
	ref+="POS_VALEUR_RUB=" + replaceAll(escape(szValeur), '+', '%2B');
	ref+="&POS_CODERUB=";
	ref+=code;
	ref+="&POS_TYPEDOC="
	if(document.principal.POS_TYPEDOC_LIE != null)
	{
		ref+=document.principal.POS_TYPEDOC_LIE.value;			
	}
	else
		ref+=document.principal.POS_TYPEDOC.value;
	
	if(document.principal.POS_NUM_DOC != null)
		ref+="&POS_CREATION=0";
	else
		ref+="&POS_CREATION=1";
		
    ref+="&B_AFF_BOUTON_VALIDER="+bRecupValeur;
	ref+="&PHPSESSID="+getCookie("PHPSESSID");
	//window.open(ref , 'fiche_liee', 'left='+CST_LEFT_ASSO+',top='+CST_TOP_ASSO+',height='+CST_HEIGHT_ASSO+',width='+CST_WIDTH_ASSO+',resizable=yes,location=no,toolbar=no,status=no')
            
    //parent.assocmodelesswinyui("Association", ref, {width: CST_WIDTH_ASSO, height: CST_HEIGHT_ASSO, left: CST_LEFT_ASSO, top: CST_TOP_ASSO});
    assocmodelesswinyui(evalMsgJsVoc('CST_JS_TITRE_FEN_FICHES_LIEES'), ref, {width: CST_WIDTH_ASSO, height: CST_HEIGHT_ASSO, left: CST_LEFT_ASSO, top: CST_TOP_ASSO});
    parent.sUrlCurrentAssocation = ref;
    //parent.modelesswinyui(ref, {width: CST_WIDTH_ASSO, height: CST_HEIGHT_ASSO, left: CST_LEFT_ASSO, top: CST_TOP_ASSO});
}
var panelAssoc;
function assocmodelesswinyui(sTitreDialog, url, coord)
{
    var fenetreassoc;
    
    if (document.body.classList.contains("yui-skin-sam"));
        document.body.classList.add("yui-skin-sam");
        
    if (!document.getElementById('assoc-panel')) 
    {
        fenetreassoc = document.createElement("div");
        fenetreassoc.id = "assoc-panel";
        // à masquer sinon réserve la place et affiche des ascenseurs
        fenetreassoc.style.display = "none";
    }
    document.body.insertBefore(fenetreassoc, document.body.firstChild)
    fenetreassoc.style.display = "";
    
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event;
    panelAssoc = new YAHOO.widget.Panel('assoc-panel', {
                draggable: true,
                close: true,
                modal: true,
                zindex:4,
                autofillheight: "body", // default value, specified here to highlight its use in the example 
                constraintoviewport: true,           
                underlay: 'none',
                width: coord.width + "px",
                height: coord.height + "px",
                xy: [coord.left, coord.top]
            });

    var textInnerHtml = "";
    var frmHeight = coord.height - 60;
	textInnerHtml +="<iframe id='fenassoc' name='afficher_lien' frameborder='0' name='fenmod' style='height:100%;width:100%;' src='"+url+"'></iframe>";
	panelAssoc.setHeader(sTitreDialog);
    panelAssoc.setBody(textInnerHtml);
    panelAssoc.render();

    panelAssoc.subscribe("hide", function (event){
            setTimeout(function() {
                        document.getElementById("fenassoc").src = "../../../vide.htm";
                        panelAssoc.destroy();
                    }, 0);
    });
}
function closeAssocModif()
{
    panelAssoc.hide();
}

function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}

/*
 * coderubrique : rubrique sur laquelle porte les association
 * autre arguments : liste des variables de la question
 */ 
function lancer_question(code_question, code_rubrique, bRecupValeur)
{	
	if (CST_TYPE_APPLI == 1)
		ref = "../../../../interface/session/principal/association/afficher_index_lie.php?";
	else
		ref = "../../../../servlet/interface/session/principal/association.AfficherIndexLie?";

	ref+="POS_ASSOCIATION=QUESTION&POS_QUESTION=" + escape(code_question);
	ref+="&POS_TYPEDOC=";
	ref+=document.principal.POS_TYPEDOC.value;
	ref+="&POS_CODERUB="
	ref+=code_rubrique;
	ref+="&PHPSESSID="+getCookie("PHPSESSID");

	if(document.principal.POS_NUM_DOC != null)
		ref+="&POS_CREATION=0";
	else
		ref+="&POS_CREATION=1";

	
	emptyValue = false;

	for (i=3;i<arguments.length;i++)
	{
		var nomTag="document.principal.POS_VAL_RUB_"+arguments[i]+".value";
		valeur=eval(nomTag);
	
		if(valeur == "") {
			emptyValue = true;
            if (parent.posMessageBoxWarning)
                parent.posMessageBoxWarning(new Array("CST_JS_ASSOC_QUEST_RUB_VIDE", arguments[i]));
            else
                parent.parent.posMessageBoxWarning(new Array("CST_JS_ASSOC_QUEST_RUB_VIDE", arguments[i]));
			break;
		}
	
		// On ne lance pas la fenetre si aucune valeur n'est saisi
		// A enlever si on affiche TOUTES les valeurs quand il n'y a rien de saisi
		// gestion des caractere speciaux
		ref+="&POS_VAL_RUB_"+arguments[i]+"="+escape(valeur);
	}

	ref+="&B_AFF_BOUTON_VALIDER="+bRecupValeur;
    if(!emptyValue)	{
        assocmodelesswinyui("Association", ref, {width: CST_WIDTH_ASSO, height: CST_HEIGHT_ASSO, left: CST_LEFT_ASSO, top: CST_TOP_ASSO});
        parent.sUrlCurrentAssocation = ref;
    }
}

var Locution = function(lien, typedoc, coderub, operateur, valeur1, valeur2, par_ouv, par_fer)
{
	this.lien = lien;
    this.typedoc = typedoc;
    this.coderub = coderub;
    this.operateur = operateur;
    this.valeur1 = valeur1;
    this.valeur2 = valeur2;
    this.par_ouv = par_ouv;
    this.par_fer = par_fer;
    this.rubLiee = "";
    this.typeLie = "";
    
    this.toString = function()
    {
        return this.typedoc + ' ' + this.coderub;
    }
}

/**
 * type = 'index' ou 'lr'
 * profil_lr = le profil de liste ou ''
 */
function getIndexParLocution(tabLocution, type, profil_lr, colTri, typeTri)
{
	var objRetour;
	if (searchReq.readyState == 4 || searchReq.readyState == 0) 
    {
    	var sUrl = '../../../../interface/session/principal/ajax/rechercher_index.php?locutions=' + encodeURIComponent(JSON.stringify(tabLocution));
        if (type == 'lr') {
            sUrl += '&lr=1';
            sUrl += '&coltri='+ colTri;
            sUrl += '&typetri=' + typeTri;
            sUrl += '&pos_profil_lr=' + escape(profil_lr);
        }
        searchReq.open("GET", sUrl, false);
		searchReq.send(null);
		if (searchReq.readyState == 4 || searchReq.readyState == 0)
	    {
	    	//alert(searchReq.responseText);
			objRetour = JSON.parse(searchReq.responseText);
		}
	}
	return objRetour;
}

function afficherListeAssociation(divId, tabLocution, typedoc, coderub, profil_lr, fctAsso, classDivIcone, msgNoRep) {

	var objRecherche = getIndexParLocution(tabLocution, 'lr', profil_lr, 1, 1);
    if (objRecherche.code_retour == 1)
   	{
        var divAssociation = document.getElementById(divId);
        var s = "";
        if (objRecherche.tablr.length != 0) {
            
            s += "<table class='tablelr' cellspacing='1' cellpadding='2'>";
            s += "<tr class='lr_pair'>";
            s += "<td class='listeResumee' colspan='20'>";
            s += "<div style='text-align: right'><input type='button' class='bouton' value='Fermer' onClick=\"javascript:document.getElementById('"+divId+"').style.display = 'none';\"/></div>";
            s += "</td>";
            s += "</tr>"; 
            s += "<tr class='lr_pair'>";
            s += "<th class='titrecolonne'>&nbsp;</th>";
            for (var i=0;i<objRecherche.obj_profil_lr.tabZoneLR.length;i++) {
                s += "<th class='titrecolonne'>";
                s += objRecherche.obj_profil_lr.tabZoneLR[i].zone_titre_col;
                s += "</th>"; 
            }    
            s += "</tr>";
             
            for (var i=0;i<objRecherche.tablr.length;i++) {
			    
                var sLrChamps = objRecherche.tablr[i].champs;

                s += "<tr class='lr_pair'>";
                s += "<td class='listeResumee' style='width: 30px;'>";
                var title = "Associer";
                s += "<a title=\""+title+"\" href=\"javascript:"+fctAsso+"('"+divId+"', '"+ typedoc+"', '"+ coderub + "', "+objRecherche.tablr[i].numdoc+")\">";
                s += "<div class='"+classDivIcone+"' ></div></a>";
                s += "</td>";
                for (var j=0;j<sLrChamps.length;j++) {
                    s += "<td class='listeResumee'>";
                    s += sLrChamps[j];
                    s += "</td>";
                }
                s += "</tr>"; 
            }
            s += "</table>";
        }
        else {
            s += "<span class='champType'>"+msgNoRep+"</span>";
        }
        document.getElementById(divId).style.display = '';
        divAssociation.innerHTML =  s;
    }
    else
        alert(objRecherche.msg_erreur);
}

function associerValeurIndexFromDivAssoc(divId, typedoc, coderub, inumdoc) {

    associerValeurIndexParNumDoc(typedoc, coderub, inumdoc);
    document.getElementById(divId).style.display = 'none';
}

function associerValeurIndexParNumDoc(typedoc, coderub, inumdoc) {
    associerValeurIndex(typedoc, coderub, "", inumdoc);
}

function associerValeurIndexParValeurUnique(typedoc, coderub, valeur) {
    associerValeurIndex(typedoc, coderub, valeur, 0);
}

function associerValeurIndex(typedoc, coderub, valeur, inumdoc) {

    var objRetour;
	if (searchReq.readyState == 4 || searchReq.readyState == 0) 
    {
    	var sUrl = '../../../../interface/session/principal/ajax/associer_un_index.php?';
        //sUrl += "typedoc=" + escape(typedoc) + "&coderub=" + escape(coderub);
        searchReq.open("POST", sUrl, false);
        searchReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var corps = "typedoc="+escape(typedoc)+ "&coderub="+escape(coderub)+ "&valeur=" + escape(valeur) + "&inumdoc=" + inumdoc;
    	searchReq.send(corps);
        
		if (searchReq.readyState == 4 || searchReq.readyState == 0)
	    {
	    	objRetour = JSON.parse(searchReq.responseText);
            if (objRetour.code_retour == 1)
           	{
                for (var coderub in objRetour.tabindex) {
                    var objRubInput = eval("document.principal.POS_VAL_RUB_" + coderub);
                    if( objRubInput != null && (objRubInput.type == "text" || objRubInput.type == "textarea")) {
                        objRubInput.value = objRetour.tabindex[coderub];
                    }
                }
            }
            else
                alert(objRetour.msg_erreur);
		}
	}
}


/*
function lancer_question(code_question, code_rubrique)
{
	lancer_question_avec_type(code_question, document.principal.POS_TYPEDOC.value, code_rubrique)
}
*/
