document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../configuration/constantes.js\"></SCRIPT>");
document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/popup_menu.js\"></SCRIPT>");

function getContentContextMenu()
{
	var s= "";
	for (var i=0;i<=sitems.length-1;i++)
	{
		if(sitems[i] == "<HR>")
			s+= sitems[i];
		else if(sitemlinks[i].substring(sitemlinks[i].length-2, sitemlinks[i].length) == "()")
		{
		    // ici on doit faire passer le num doc dans les parentheses de la fct.
			szNomFct = sitemlinks[i].substring(0, sitemlinks[i].length-2);
				
			s+='&nbsp;<IMG src=\"../../../../images/icons/lr_fleche.png\">&nbsp;<a href=\"javascript:void(0)\" onClick=\"'+szNomFct+'(\''+szInfos+'\')\">'+sitems[i]+'</a><br>';
		}
	}
    return s;
}

function onAjouterModele()
{
    document.getElementById('divEnvoiModele').style.display = "";
}

function verifNomFichier()
{
    var szNomFichier = document.envoimodele.POS_FICHIER.value;
    if (szNomFichier.length > 0)
    {
        // verification extension
        var ext = "---";
        if (szNomFichier.lastIndexOf(".") > -1)
            ext = szNomFichier.substring(szNomFichier.lastIndexOf(".") + 1).toLowerCase();
        /*
        if (ext != "rtf" && ext != "dot")
        {
            alert("Le modèle ajouté n'a pas l'extension requise.");
            return false;
        }
        */
        
        // verification caractere dans le fichier
        // initialisation avec caractere interdit, au cas il n'est pas determiné, il ne passera pas.
        var sNomFichierCourt = "   ";
        if (szNomFichier.lastIndexOf("\\") > -1 || szNomFichier.lastIndexOf("/") > -1)
        {
            if (szNomFichier.lastIndexOf("\\") > -1)
                sNomFichierCourt = szNomFichier.substring(0, szNomFichier.lastIndexOf(".")).substring(szNomFichier.lastIndexOf("\\") + 1).toUpperCase();
            else
                sNomFichierCourt = szNomFichier.substring(0, szNomFichier.lastIndexOf(".")).substring(szNomFichier.lastIndexOf("/") + 1).toUpperCase();
        }
        var exp=new RegExp("^[A-Z0-9_-]*$","g");
		if (exp.test(sNomFichierCourt) == false)
		{
			alert("Le nom du modèle ne peut contenir que des caractères alphanumériques non accentués, des underscores (_) et des tirets(-).");
			return false;
		}	

        for (var i=0;i<tabListeModeles.length;i++)
        {
            var sNomFichierCourtAvecExtension = sNomFichierCourt + "." + ext;
            if (sNomFichierCourtAvecExtension.toUpperCase() == tabListeModeles[i].toUpperCase())
            {
                alert("Un modèle de même nom existe déjà.");
			    return false;
            }
        }
    }
    else
    {
        alert("Le fichier n'a pas été sélectionné.");
        return false;
    }
    return true;
}


function onSupprimerModele(szNumTypDoc)
{
    var sUrl = "";
    if(CST_TYPE_APPLI == 1)
	{
	   sUrl = URL_SITE + "/interface/session/principal/gestionmodele/gerer_modele.php?ACTION=SUPPRIMER&";
	}
    if(arguments.length == 1)
		sUrl += szNumTypDoc;
	else if(Verif_form())
		sUrl += getCheckedValue(document.principal.POS_MODELE);
    afficherLien(sUrl);
}

function onConsulterModele(szNumTypDoc)
{
    var sUrl = "";
    if(CST_TYPE_APPLI == 1)
	{
	   sUrl = URL_SITE + "/interface/session/principal/gestionmodele/consulter_modele.php?";
	}
    if(arguments.length == 1)
		sUrl += szNumTypDoc;
	else if(Verif_form())
		sUrl += getCheckedValue(document.principal.POS_MODELE);
	
	sUrl += "&MODE=CONSULTATION";
    new_fen = window.open('', 'load', 'left=250,top=100,height=500,width=500,scrollbars=auto,location=no,toolbar=no,status=no,resizable=yes');
	new_fen.location.href=sUrl;
}

function onModifierModele(szNumTypDoc)
{
    var sUrl = "";
    if(CST_TYPE_APPLI == 1)
	   sUrl = URL_SITE + "/interface/session/principal/gestionmodele/consulter_modele.php?";
	else
    {
        alert("Cette fonction n'est pas disponible dans cette version.");
        return;
    }
    if(CST_UTIL_WEB_DAV != 2)
    {
        alert("Le transfert par l'applet Java n'est pas activé.");
        return;
    }
    
    if(arguments.length == 1)
		sUrl += szNumTypDoc;
	else if(Verif_form())
		sUrl += getCheckedValue(document.principal.POS_MODELE);
    sUrl += "&B_WEBDAV=" + CST_UTIL_WEB_DAV;
	sUrl += "&MODE=MODIFICATION";
	parent.openFileModif(sUrl)
}