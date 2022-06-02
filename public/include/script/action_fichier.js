document.write("<SCRIPT language=\"javascript\" SRC=\"../../../../include/script/popup_menu.js\"></SCRIPT>");

// Javascript qui gere l'affichage du menu popup 
// qui s'affiche sur la page des fichiers.
function onConsulter(szInfoPage)
{
    var tabInfoPage = szInfoPage.split("|");
    AfficherFichier(tabInfoPage[0],tabInfoPage[1],tabInfoPage[2],tabInfoPage[3],"CONSULTATION",tabInfoPage[5], false);
    hide_popup_menu();
}

function onModifier(szInfoPage)
{
    var tabInfoPage = szInfoPage.split("|");
    AfficherFichier(tabInfoPage[0],tabInfoPage[1],tabInfoPage[2],tabInfoPage[3],tabInfoPage[4],tabInfoPage[5], false);
    hide_popup_menu();
}

function onProprietesFichier(szInfoPage)
{
    var tabInfoPage = szInfoPage.split("|");
    var tabProprietePage = tabInfosConfPage[tabInfoPage[1]+ "_" + tabInfoPage[2]].split("|");
    var s = "";
    var libIndiceHab = document.form_fichier.POS_CONF_HAB.options[tabProprietePage[0]].text;
    s += document.getElementById("libIndiceHab").innerHTML + " : " + libIndiceHab + "\n";
    s += document.getElementById("libNiveauHab").innerHTML + " : " + tabProprietePage[1] + "\n";
    s += document.getElementById("libClois").innerHTML + " : " + tabProprietePage[2] + "\n";
    hide_popup_menu();
    alert(s);
}

function onTelecharger(szInfoPage)
{
    var tabInfoPage = szInfoPage.split("|");
    AfficherFichier(tabInfoPage[0],tabInfoPage[1],tabInfoPage[2],tabInfoPage[3],"CONSULTATION",tabInfoPage[5],true);
    hide_popup_menu();
}

function onSupprimer(szInfoPage)
{
    if(confirm(document.principal.MESSAGE_SUPP_FIC.value))
    {
        var tabInfoPage = szInfoPage.split("|");
        document.form_fichier.action = document.principal.URL_ACTION.value;
        document.form_fichier.choix.value="DELETE";
        document.form_fichier.choixFichier.value=tabInfoPage[1]+"."+tabInfoPage[2];
        document.form_fichier.submit();
    }
}

function onAjouteFinDePage(szInfoPage)
{
    var tabInfoPage = szInfoPage.split("|");
    document.form_fichier.POS_NUM_DOC.value = tabInfoPage[0];
    document.form_fichier.choixFichier.value = document.principal.NB_FIN_DE_PAGE.value + ".0";
    afficheFormFichier();
}

function onAjouteAvant(szInfoPage)
{
    var tabInfoPage = szInfoPage.split("|");
    document.form_fichier.POS_NUM_DOC.value = tabInfoPage[0];
    document.form_fichier.choixFichier.value = tabInfoPage[1] + ".0";
    afficheFormFichier();
}

function onAjouteFinDeSsPage(szInfoPage)
{
    var tabInfoPage = szInfoPage.split("|");
    document.form_fichier.POS_NUM_DOC.value = tabInfoPage[0];
    //alert(listeFichiers[tabInfoPage[1]-1].data.nbsouspages);
    document.form_fichier.choixFichier.value = tabInfoPage[1]+"."+(parseInt(listeFichiers[tabInfoPage[1]-1].data.nbsouspages)+1);
    afficheFormFichier();
}

function onAjouteAvantSsPage(szInfoPage)
{
    var tabInfoPage = szInfoPage.split("|");
    document.form_fichier.POS_NUM_DOC.value = tabInfoPage[0];
    document.form_fichier.choixFichier.value = tabInfoPage[1]+"."+tabInfoPage[2];
    afficheFormFichier();
}

function afficheFormFichier() {

    document.getElementById("div_form_fichier").style.display = "";
    document.getElementById("div_bloc_consultation").style.display = "none";
    document.getElementById("span_choixFichier").innerHTML = document.form_fichier.choixFichier.value;
    hide_popup_menu();    
}

function getContentContextMenu()
{
	var s= "";
    var tabInfoPage = szInfos.split("|");
    var iNumSousPage = tabInfoPage[2];
    var listFct = sitems;
    var listFctLinks = sitemlinks; 
    if (iNumSousPage != 0 ) {
        listFct = sitems_SSPAGE;
        listFctLinks = sitemlinks_SSPAGE;
    }
    
	for (var i=0;i<=listFct.length-1;i++)
	{
		if(listFct[i] == "<HR>")
			s+= listFct[i];
		else
		{
			// ici on doit faire passer le num doc dans les parentheses de la fct.
			var szNomFct = listFctLinks[i].substring(0, listFctLinks[i].length-2);
            s+='&nbsp;<a href=\"javascript:void(0)\" onClick=\"'+szNomFct+'(\''+szInfos+'\')\">'+listFct[i]+'</a><br>';
		}
	}
    return s;
}

