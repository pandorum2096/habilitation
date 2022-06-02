document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/popup_menu.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/fonction_util.js\"></SCRIPT>");

// Javascript qui gere l'affichage du menu popup 
// qui s'affiche sur les pages de gestion des domaines fermes normaux.

// Page de liste des rubriques a domaines fermes normaux
function onModifier_rub(szInfoUtil)
{
    var szUrlModifier_rub = "";
    var szUrl;
	
    if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoUtil = getCheckedValue(document.principal.IDENT_RUB);
		else
			return;
    }
    
	szUrl = getEncodeUrl(szInfoUtil);
    document.body.style.cursor = 'wait';
    document.getElementById('table_liste_df').style.cursor = 'wait';
    document.getElementById('id_btn_0').style.cursor = 'wait';
    if(CST_TYPE_APPLI == 1)
    	szUrlModifier_rub = "../../../../interface/session/principal/gestiondomain/consulter_rub_domferme.php?"+szUrl;
    else if (CST_TYPE_APPLI == 2)
        szUrlModifier_rub = "../../../../servlet/interface/session/principal/gestiondomain.ConsulterRubDomferme?" + szUrl;
    else
        szUrlModifier_rub = "../../../../interface/session/principal/gestiondomain/ConsulterRubDomferme.aspx?" + szUrl;
	afficherLien(szUrlModifier_rub);	
}

// Page consultation des valeurs de la rubrique

function onCreer(szInfoUtil)
{
	document.getElementById("bloc_ajout").style.display = "block";
	//if (document.secondaire.B_CREATION.value == 0)
	if (document.principal.SERVICE.value != "ajout")
		document.getElementById("code_domferme").removeAttribute("readOnly");		
	
	document.getElementById("code_domferme").value = "";
	document.getElementById("libelle_domferme").value = "";
	document.getElementById("code_domferme").setAttribute("className",'inputChamp');
	if(document.principal.POS_DOMFERME_NON_ALPHANUM.value == 0)
	document.getElementById("code_domferme").focus();	
	document.principal.SERVICE.value = "ajout";
}

function onExporter(szInfoUtil)
{
    var szUrlExporter = "";
    if(CST_TYPE_APPLI == 1)
    	szUrlExporter += URL_SITE + "/interface/session/principal/gestiondomain/exporter_valeurs_domaine.php?POS_CODE_RUB=";
    else
    	szUrlExporter += URL_SITE + "/interface/session/principal/gestiondomain.ExporterValeursDomaine?POS_CODE_RUB=";
    szUrlExporter += document.principal.POS_CODE_RUB.value;
    szUrlExporter += "&PHPSESSID=" + document.principal.PHPSESSID.value;
    var fenetreExport = window.open(szUrlExporter, 'attente', 'left=200,top=50,height=400,width=600,scrollbars=yes,location=no,toolbar=no,status=no,resizable=yes');
}

/*
 * Afficher l'ecran de modification a l'utilisateur
 * La modification serveur sera effectuee au "submit" 
 */ 
function onModifier(szInfoUtil)
{
	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoUtil = getCheckedValue(document.principal.VOCAB_RUB);
		else
			return;
	}
   
   	document.principal.SERVICE.value = "modification";
   
	document.getElementById("bloc_ajout").style.display = "block";
	// syntaxe Firefox
	document.getElementById("code_domferme").setAttribute("readOnly", "readOnly");
    document.getElementById("code_domferme").setAttribute("class", "verrouille");
    // syntaxe IE
    document.getElementById("code_domferme").setAttribute("className", 'verrouille');
	document.getElementById("libelle_domferme").focus();
  
	var precode = "";
	var prelibelle = "";
	var libelle = "";
	var code = "";
 
	var tabSzUrl = szInfoUtil.split("&");
	for(i=0; i < tabSzUrl.length; i++)
	{
		var tabTmp = new Array();
		tabTmp = tabSzUrl[i].split("=");
		
		if(i == 0)
		  precode = tabTmp[1];
		else
		  if(i == 1)
		    prelibelle =  tabTmp[1];
	}
    
    precode = precode.replace(/\+/g, " "); 
    code = unescape(precode);
    code = code.replace(/\\/g,"");
    
	prelibelle = prelibelle.replace(/\+/g," ");
    libelle = unescape(prelibelle);
    libelle = libelle.replace(/\\/g,"");
 
    document.getElementById("code_domferme").value = code;
    document.getElementById("libelle_domferme").value = libelle;
    // Passe la valeur initiale du libelle au second formulaire
    document.principal.POS_OLD_LIBELLE_DOMFERME.value = libelle;
        
}

function onSupprimer(szInfoUtil)
{
    var szUrlSupprimer = "";
	
	if(arguments.length == 0)
	{
		if(Verif_form())
			szInfoUtil = getCheckedValue(document.principal.VOCAB_RUB);
		else
			return;
    }
	if(parent.posMessageBoxConfirm(document.principal.MESSAGE_SUPP_DOMFERME.value))
	{
		szUrl = getEncodeUrl(szInfoUtil);
		if(CST_TYPE_APPLI == 1)
			szUrlSupprimer="../../../../interface/session/principal/gestiondomain/modifier_val_domferme.php?SERVICE=suppression&POS_CODE_RUB="+escape(document.principal.POS_CODE_RUB.value)+"&POS_LIBELLE_RUB="+escape(document.principal.POS_LIBELLE_RUB.value)+"&"+szUrl;
		else if (CST_TYPE_APPLI == 2)
			szUrlSupprimer="../../../../servlet/interface/session/principal/gestiondomain.ModifierValDomferme?SERVICE=suppression&POS_CODE_RUB="+escape(document.principal.POS_CODE_RUB.value)+"&POS_LIBELLE_RUB="+escape(document.principal.POS_LIBELLE_RUB.value)+"&"+szUrl;
		else
            szUrlSupprimer = "../../../../interface/session/principal/gestiondomain/ModifierValDomferme.aspx?SERVICE=suppression&POS_CODE_RUB="+escape(document.principal.POS_CODE_RUB.value)+"&POS_LIBELLE_RUB="+escape(document.principal.POS_LIBELLE_RUB.value)+"&"+szUrl; 

		afficherLien(szUrlSupprimer);
    }
}

function getContentContextMenu()
{
	var s= "";
    var szNomFct;
	for (i=0;i<=sitems.length-1;i++)
	{
		if(sitems[i] == "<HR>")
			s+= sitems[i];
		else if(sitemlinks[i].substring(sitemlinks[i].length-2, sitemlinks[i].length) == "()")
		{
		    if(document.principal.DROIT_ADMIN_DOMFERME.value == 1)
		    {
				// ici on doit faire passer le num doc dans les parentheses de la fct.
				szNomFct = sitemlinks[i].substring(0, sitemlinks[i].length-2);
				s+='&nbsp;<IMG src=\"../../../../images/icons/lr_fleche.png\">&nbsp;<a href=\"javascript:void(0)\" onClick=\"'+szNomFct+'(\''+szInfos+'\')\">'+sitems[i]+'</a><br>';
			}
		    else
		        s+= "&nbsp;<IMG src=\"../../../../images/icons/lr_vide.png\">&nbsp;<FONT COLOR='#999999'>"+sitems[i]+"</FONT><BR>";
		}
	}
    return s;
}

