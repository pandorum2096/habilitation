
/*
	Affiche les proprietes pour un objet donne
 */
function proprietes() {
	var objet;
	var n=document.ppte.liste.selectedIndex;
	switch (n) 
	{
		case 0:  objet=navigator; break;
		case 1:  objet=navigator.plugins; break;
		case 2:  objet=navigator.mimeTypes; break;
		case 3:  objet=window; break;
		case 4:  objet=window.location; break;
		case 5:  objet=window.history; break;
		case 6:  objet=window.document; break;
		case 7:  objet=document.forms[0]; break;
		case 8:  objet=document.forms[0].elements; break;
		case 9:  objet=document.images; break;
		case 10:  objet=document.links; break;
		case 11:  objet=forms[0].liste.options; break;					
	}
	
	var nom=document.ppte.liste.options[n].text;
	fen=open("","Proprietes","width=600,height=250,toolbar=yes,directories=no, menubar=no,scrollbars=yes,status=yes"); 
	fen.focus();
	var texte = "";
 	for (var i in objet )
 	texte +=nom+"."+i+" = " +objet[i] +"<BR>";
	fen.document.write(texte);
	fen.document.close();
}

 
