document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");
document.write("<DIV id='menu' style='position:absolute;top:0;left:0;right:10px;visibility:hidden;text-align: left;z-index:1000;'></DIV>");

var oldElement = new Object();
var nbClick = 0;
var szInfos = "";

// variable pour le positionnement du popup menu
var x,y = 0;

// variable pour la gestion des profils
var bAfficheDesactive;
var bProfilAuto;
var bProfilPublic;

// variable pour excalibur
var bAfficheFichier = true;

var szClassSelectEnCours = "";
var szClassHighlightEnCours = "";

function selectLigneProfil(event, element, szInfo, bActif, bAuto, bPublic)
{
    bAfficheDesactive = bActif;
    bProfilAuto = bAuto;
    bProfilPublic = bPublic;
    selectLigne(event, element, szInfo);
}

function selectLigneExc(event, element, szInfo, b_fichier)
{
    bAfficheFichier = b_fichier;
    selectLigne(event, element, szInfo);
}

function selectLigne(event, trElement, szInfo)
{
    var evt = (window.event) ? window.event : event;
    // la source de l'evt est l'origine du clic (radio, td..)
    var target = evt.target || evt.srcElement;
    var isDifferentLine = (trElement != oldElement);
    szInfos = szInfo;
    
    // cas de la liste de resultat : en mode multi-selection, pas de menu contextuel 
    if($(trElement).find("input.checkbox_select_doc").is(":checked"))
        return;
    unhighlightAllElements();
    if(nbClick%2 != 1 || isDifferentLine)
    {
        // zone sur laquelle on ne doit pas afficher le menu
        // on ferme le menu precedent s'il existe.
        if (target && target.getAttribute("data-menu") == "no")
        {
            hide_popup_menu();
        }
        else
        {
            highlightElement(trElement);
            var s = getContentContextMenu();
            x = ((evt.pageX || evt.pageY) ? evt.pageX : evt.clientX + document.body.scrollLeft);
            y = (evt.pageX || evt.pageY) ? evt.pageY : evt.clientY + getScrollTop();
            affiche_popup_menu(s);
            oldElement = trElement;
            nbClick++;
        }
    }
    else {
        hide_popup_menu();
        nbClick++;
    }
}

function unhighlightAllElements() {
    $(".highlightRow").removeClass("highlightRow");
    $("input.checkbox_select_doc").prop("checked", false);
    // cas de la liste de reponse
    if (typeof majActionsMultiples === "function")
        majActionsMultiples();
} 

function onClickAccesMenu(event, eltMenu, infosLigne) {
    
    var xy = YAHOO.util.Dom.getXY(eltMenu);
    event.posX = xy[0];
    event.posY = xy[1];
    eltMenu.setAttribute("aria-expanded", true);
    $('#menu').insertAfter(eltMenu);
    selectLigne(event, eltMenu, infosLigne);
}

function getScrollTop(){
    if(typeof pageYOffset!= 'undefined'){
        //most browsers except IE before #9
        return pageYOffset;
    }
    else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientHeight)? D: B;
        return D.scrollTop;
    }
}

function highlightElement(elt) {
    if (elt && elt.classList)
    	elt.classList.add("highlightRow");
}

function unhighlightElement(elt) {
    if (elt && elt.classList)
        elt.classList.remove("highlightRow");
}

function getCheckedValue(radiogroup)
{
	var valeur;
	if(!radiogroup.length)
	{
		valeur=radiogroup.value;
	}
	else
		for (i=0;i<radiogroup.length;i++)
		if (radiogroup[i].checked)
		{
			valeur=radiogroup[i].value;
			break;
		}
	return valeur;
}

function Verif_form()
{
	with(window.document.principal)  
	{
		for (i=0; i<elements.length; i++)
		{
			type = elements[i].type;
			
			switch (type)
			{
				// Choix par cochage.
				case "radio" :	 
					if((elements[i].checked == true) && (elements[i].value != ""))
						return true;
					break;
					
				// Pour tous les autres types (submit, hidden, button, ...)                   
				default : break;
			}
		}
		parent.posMessageBoxWarning(MESSAGE_SELECT_REP.value);
		return false;
	}
}

function affiche_boutons()
{	
    var s = "&nbsp;";
	for (i=0;i<sitems.length;i++)
	{
	    if (document.principal && document.principal.ECRAN && document.principal.ECRAN.value == "LISTE_REPONSES")
	    {
	       if (sitems[i].fonction.indexOf("onExporter") >= 0 || sitems[i].fonction.indexOf("onImprimerLR") >= 0  || 
            	sitems[i].fonction.indexOf("onMiseAJourRafale") >= 0 || sitems[i].fonction.indexOf("hermes") >= 0 ||
                 sitems[i].fonction.indexOf("onGenererRapport") >= 0)
			s+='<INPUT TYPE=button id="id_btn_' + i +'"  class="bouton" VALUE=\"'+sitems[i].libelle+'\" onClick=\"'+sitems[i].fonction+'\">&nbsp;&nbsp;';
		}
	    else
		{
			if(sitems[i] != "<HR>")
				s+='<INPUT TYPE=button id="id_btn_' + i +'"  class="bouton" VALUE=\"'+sitems[i]+'\" onClick=\"'+sitemlinks[i]+'\">&nbsp;&nbsp;';
		}
  	}
    	document.getElementById("bouton").innerHTML=s;
    	document.getElementById("bouton").style.visibility="visible";
}

function affiche_popup_menu(s)
{console.log("-pop_menu.js affiche_popup_menu-");
   	document.getElementById("menu").innerHTML = s;
    //  document.principal.URL_CONSULT_OCC == null = pas dans le cas recherche plein-texte
    if (document.getElementById("menu").offsetHeight + y  > window.innerHeight && document.principal.URL_CONSULT_OCC == null) {
        y = window.innerHeight - document.getElementById("menu").offsetHeight - 3;
    }
    if (document.getElementById("menu").offsetWidth + x  > window.innerWidth) {
        x = window.innerWidth - document.getElementById("menu").offsetWidth - 3;
    }
   	document.getElementById("menu").style.top = y + "px";
   	document.getElementById("menu").style.left = x + "px";
   	document.getElementById("menu").style.visibility="visible";
    $("#menu li:first-of-type a").focus();
}

function hide_popup_menu()
{
	document.getElementById("menu").innerHTML = "";
   	document.getElementById("menu").style.visibility = "hidden";
}

function afficherLien(szUrl)
{
	if (navigator.appName.indexOf("Microsoft")>=0 && event.srcElement.href != null)
    	event.srcElement.href = szUrl;
    else
    	location.href = szUrl;
}

function stopEvent(evt) {
    evt = evt || window.event;
    if (typeof evt.stopPropagation != "undefined") {
        evt.stopPropagation();
        evt.preventDefault();
    } else {
        evt.cancelBubble = true;
    }
};

function initTableStdAdmin(idTable){
    
    var selectorIdTable = '#'+idTable;
    $(selectorIdTable).dataTable({
        processing: true,
    	serverSide: false,
    	searchDelay: 1000,
        orderCellsTop: false,
        order: [], // fixe une anomalie sur le tri
        language: {
            lengthMenu:    "Afficher _MENU_ d&eacute;p&ocirc;ts",
            loadingRecords: "...",
            zeroRecords:    "-",
            infoFiltered:   "",
            info:           "",
        },
        columnDefs: [
            {"sortable": false, targets: '_all'} 
        ],
        bInfo : false,
        paging: false,
        searching: false,
        scrollY: '400px',
        scrollX: true,
        scrollCollapse: true
    });
    $(selectorIdTable + " tbody tr").on("contextmenu", eventOnTabLine);
    $(selectorIdTable + " tbody tr").on("click", eventOnTabLine);
    function eventOnTabLine(evt) {
        selectLigne(evt, this, $(this).data('info'));
        // Cancel event, so real browser popup doesn't appear.
        return (evt.type == "contextmenu") ? false : true;
    }
    $(window).on('resize', function () {
        $(selectorIdTable).dataTable().fnAdjustColumnSizing();
    });
}
