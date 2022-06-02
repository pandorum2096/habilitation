/*
 * Fonctions d'affiche et de selection de la liste hierarchique
 * crée le : 07/03/2013
 * AUTEUR : Patrick de Torcy
 *	
 */

/*
 * DESCRIPTION : Script qui permet de de faire une recherche rapide en ajax dans un arbre hierarchique 
 * et qui permet après selection de remplir automatiquement tout les champs correspondant à chaque 
 * niveau.
 * FICHIER :
 *		- recup_listhier.php (session/application/ajax)
 *		- ajax_recup_listhier.js (include/script)
 *		- templates où se trouvent les champs ayant besoin de cette fonction
 * CSS(style.css) :
 *		- recherche_lienHierarchique
 *		- lienHierarchique
 *		- lienOverHierarchique
 *		- dernierNiveauHierarchique
 *		- niveauHierarchique_"nombre entier"
 * template : 
 *		- exemple : <input class='inputChampType' name='POS_VAL_RUB_NO1' size='75' value="{POS_VAL_RUB_NO1}" onBlur="javascript:maximum(this,'119');" type="text" onClick="closeArbreHierarchique('idArbreHier_no1');"/>
 *		  <a href="javascript:arbreHierarchique('DOS', 'idArbreHier_no1', 'NO1|NO2|NO3|NO4', true, 'Liste Hiérarchique Nomenclature','','','0'); ">
 *		  <IMG class='iconvocmono' id='img_voc_NO1' src='../../../../images/icons/vocab_the.gif' title='liste hierarchique'></a>
 *		  <div style="display:none" id="idArbreHier_no1" class="recherche_lienHierarchique"></div>
 *		- mettre : <SCRIPT language='javascript' src='/{NOM_APPLICATION}/include/script/ajax_recup_listhier.js'></SCRIPT>
 * PROBLEMES :  
 */
 
 
// nombre d'items du bloc de suggestions 
var length_idListHier;

// les valeurs des id répondant à la suggestion 
//sont de la forme suggestid_"nombre entier"
var suggestidSelected_number;

var idArbreHierencours  = null;



//Gets the browser specific XmlHttpRequest Object
function getXmlHttpRequestObject() {	
	
	if (window.XMLHttpRequest) {
	
		return new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} 
}

//Our XmlHttpRequest object to get the auto suggestvar 
var arbreHierarchiqueReq = getXmlHttpRequestObject();


//Starts the AJAX request.
//typedoc : Type de document
//idArbreHier : id du bloc qui s'ouvre
//listrub : Liste des rubriques
//bDerniersniveau : true (seul le dernier niveau est cliquable) false (tout les niveaux sont cliquable)
//titre : titre de la liste hierarchique
//largeur, hauteur : largeur(par defaut la taille de la cellule) et hauteur (par defaut 200px) du bloc
//bPositionBas : true (ouvre le bloc en bas) false(ouvre le bloc en haut)
//bFenAttente : true (ouvre une boite d'attente)

function arbreHierarchique(typedoc, idArbreHier, listrub, bDerniersniveau, titre, largeur, hauteur, bPositionBas, bFenAttente) 
{	
	if (bFenAttente) // la même requete plus bas pour fermer la fenêtre
		fenetre_attente = window.open('../../../../interface/tpl/applicatif/gestionlisthier/attente.html','','width=500px,height=200px,top=100,left=100,resizable=0,scrollbars=0,modal=yes');
	if (arbreHierarchiqueReq.readyState == 4 || arbreHierarchiqueReq.readyState == 0)
	{		
		arbreHierarchiqueReq.open("GET", '../../../../interface/session/principal/ajax/recup_listhier.php?TYPEDOC=' + typedoc + "&LISTRUB=" + listrub, false);		
		arbreHierarchiqueReq.onreadystatechange = function() {handleArbreHierarchique(idArbreHier, listrub, bDerniersniveau, titre, largeur, hauteur, bPositionBas, bFenAttente);}; 
		idArbreHierencours  = idArbreHier;
		arbreHierarchiqueReq.send(null);
	}			
}

function arbreHierarchiqueNiveau2(typedoc, idArbreHier, listrub, ValRubNiveau1, bDerniersniveau, titre, largeur, hauteur, bPositionBas, bFenAttente) 
{	
	if (bFenAttente) // la même requete plus bas pour fermer la fenêtre
		fenetre_attente = window.open('../../../../interface/tpl/applicatif/gestionlisthier/attente.html','','width=500px,height=200px,top=100,left=100,resizable=0,scrollbars=0,modal=yes');
	if (arbreHierarchiqueReq.readyState == 4 || arbreHierarchiqueReq.readyState == 0)
	{		
		arbreHierarchiqueReq.open("GET", '../../../../interface/session/principal/ajax/recup_listhier.php?TYPEDOC=' + typedoc + "&LISTRUB=" + listrub + "&VALUE_NIV1=" + ValRubNiveau1, false);
		arbreHierarchiqueReq.onreadystatechange = function() {handleArbreHierarchique(idArbreHier, listrub, bDerniersniveau, titre, largeur, hauteur, bPositionBas, bFenAttente);}; 
		idArbreHierencours  = idArbreHier;
		arbreHierarchiqueReq.send(null);
	}			
}


//Called when the AJAX response is returned.
function handleArbreHierarchique(idArbreHier, listrub, bDerniersniveau, titre, largeur, hauteur, bPositionBas, bFenAttente) {	
	if (arbreHierarchiqueReq.readyState == 4) 
	{ 
		var ss = document.getElementById(idArbreHier);
		ss.innerHTML = '';
 		//alert(arbreHierarchiqueReq.responseText); 
		var objetRetour = eval('(' + arbreHierarchiqueReq.responseText + ')');
		//console.log(objetRetour);
		
		if(objetRetour.code_retour == 1)
		{
			length_idListHier = objetRetour.voca.length+1;
			var suggestidSelected_name = "";
			//alert ('construction');
			
			//1er Niveau avec le titre et le bouton fermer
			var suggest = '<div id="suggestid_1"';
			var niveauStyle="niveauHierarchique";					
			suggest += ' class="lienHierarchique '+niveauStyle+' " >'+ titre + '<img src="../../../../images/icons/fermer.png" style="cursor: pointer;" onclick="javascript:closeArbreHierarchique(\'' + idArbreHierencours + '\');" title="Fermer" align="right"/></div>';							
			//ss.innerHTML += suggest;
			//alert(length_idListHier);
			for(var i=2; i < length_idListHier ; i++) 
			{													
				var compteur_i=i;
				var dernierNiveauStyle="";	//par defaut
	
				var niveauHierarchique=0;
				do //calcule le niveauHierarchique
				{						
					compteur_i=objetRetour.voca[compteur_i][1];
					compteur_i=compteur_i+1;				
					niveauHierarchique++;
					niveauStyle='niveauHierarchique_'+niveauHierarchique; //permet de donner un style à chaque niveau
				} 
				while (objetRetour.voca[compteur_i][0]!=0) 				
				niveauHierarchique--;					
				decalage="padding-left:"+20*niveauHierarchique+"px"; //décalage du niveau
				
				// permet de construire le lien
				function lien(dernierNiveauStyle,decalage,niveauStyle,idArbreHier,listrub,i)
				{	
					var lien = ' onmouseover="javascript:mouseOver(this,\'' + niveauStyle + '\',\''+ dernierNiveauStyle + '\');" ';
					lien += ' onmouseout="javascript:mouseOut(this,\'' + niveauStyle + '\',\''+ dernierNiveauStyle + '\');" ';
					lien += ' style="cursor: pointer;'+decalage+';" onclick="javascript:setArbreHierarchique(\'' + idArbreHier + '\',\'' + listrub + '\',\''+ i+'\');" ';						
					return lien;
				}
				//true : Seule les derniers niveaux de l'arbre hierarchique est cliquable
				//false : Toutes les lignes sont cliquable
				suggest += '<div id="suggestid_' + i +'"';
				if (bDerniersniveau)
				{						
					if (length_idListHier-1==i) //derniere ligne alors il n'a pas de fils
					{
						dernierNiveauStyle="dernierNiveauHierarchique";	
						suggest += lien(dernierNiveauStyle,decalage,niveauStyle,idArbreHier,listrub,i);
					}
					else if (objetRetour.voca[i][0]!=objetRetour.voca[i+1][1]) //sinon si dernier enfant	
					{
						dernierNiveauStyle="dernierNiveauHierarchique";									
						suggest += lien(dernierNiveauStyle,decalage,niveauStyle,idArbreHier,listrub,i);								
					}							
					else // sinon il a un fils	
						suggest += ' style="'+decalage+';" onclick="void(0);"';	// annihile la fermeture de la fenêtre par defaut
				}
				else //Toutes les lignes sont cliquable
					suggest += lien('',decalage,niveauStyle,idArbreHier,listrub,i);
					
				suggest += ' class="lienHierarchique '+niveauStyle+' '+dernierNiveauStyle+'"  >'+ objetRetour.voca[i][2] + '</div>';													
			}
			//alert ('construction2');
			if (bFenAttente)
				setTimeout("fenetre_attente.close()",1000);	
			ss.innerHTML += suggest;				
			if (ss.innerHTML.length > 0)
			{			
				if (!hauteur || hauteur=='')
				{
					ss.style.height='200pt';
					position_haut=200*1.35;
				}
				else
				{
					ss.style.height=hauteur+'pt';
					position_haut=hauteur*1.35;
				}
				//On calcule le positionnement complet des x et y pour positionner le div
				
				listenameinput=listrub.split("|");
				listenameinput[0]='POS_VAL_RUB_'+listenameinput[0];
				var element=document.getElementsByName(listenameinput[0])[0];
				
				if (!bPositionBas || bPositionBas=='' || bPositionBas==1)
					var haut= element.offsetHeight;
				else
					var haut=-position_haut - element.offsetTop;   //position de y en relatif 25:elle s'ouvre en dessous -270:elle s'ouvre au dessus
				
				var gauche=-2; //position de x en relatif
				//on ajoute les x et y des différents parents 
				//Tant que l'« element » reçoit un « offsetParent » valide 
				//alors on additionne les valeurs des offsets
				
				do 
				{
					haut += element.offsetTop;
					gauche += element.offsetLeft;					
                    element = element.offsetParent;
				} 				
				while (element && element.style.position !== "relative" && element.ownerDocument.defaultView.getComputedStyle( element ).getPropertyValue("position") !== "relative");//element.ownerDocument.defaultView.getComputedStyle( element ).getPropertyValue("position") : permet d'aller voir dans le css
				haut += "px";
				gauche += "px";
				var pixel="";
				// calcule la taille du champ
				if (largeur && largeur!='')
					var pixel = largeur;								
				//else	
					//pixel = document.getElementsByName(listenameinput[0]).offsetWidth-2 ;	
					
				pixel += "px";
				
				// on définit le style avec les calcules plus haut
				ss.style.top=haut;
				ss.style.left=gauche;
				ss.style.width = pixel;
				
				document.getElementById(idArbreHier).style.borderWidth = '1px';

				ss.style.position="absolute";
				ss.style.display="block";
				ss.style.overflow='auto';
			}
			else
			{
				//on vide le layer si pas de réponse
				ss.style.display="none";			
			}
		}
		else
		{
			alert("Problème de récupération des lignes ! \nErreur : " + objetRetour.msg_erreur);			
			return false;
		}		
	}
}

function setClassAttributeById(szId, szClassName) 
{
	// syntaxe IE
	document.getElementById(szId).setAttribute("className",szClassName);
	// syntaxe firefox
	document.getElementById(szId).setAttribute("class", szClassName);
} 

//Mouse over function
function mouseOver(div_value,niveauStyle,dernierNiveauStyle) 
{
	suggestidSelected_number = div_value.id.substring(10,div_value.id.length);	
 	 if (suggestidSelected_number != 0	) {
		 suggestidSelected_name = "suggestid_" + suggestidSelected_number;
 		 setClassAttributeById(suggestidSelected_name, 'lienHierarchique');
 	 }
		
	div_value.className = 'lienOverHierarchique '+niveauStyle+' '+dernierNiveauStyle;
	
}

//Mouse out function
function mouseOut(div_value,niveauStyle,dernierNiveauStyle) {	
	div_value.className = 'lienHierarchique '+niveauStyle+' '+dernierNiveauStyle;
	//suggestidSelected_number = 0;
}

//Click function
function setArbreHierarchique(idArbreHier, listrub, j) 
{ 
	
 	element=document.getElementById(idArbreHier);
	element.innerHTML = '';
	element.style.borderWidth = '0px';
	element.style.height='auto';
	element.style.display="none";	
	

 	listenameinput=listrub.split("|");
	compteur=listenameinput.length;
	

	var objetRetour = eval('(' + arbreHierarchiqueReq.responseText + ')');	
	//console.log(objetRetour);
	compteur_i=j;
	var niveauHierarchique=0;
	var compteurHierarchique=new Array();	
	var value=new Array();
	
	compteurHierarchique[0]=compteur_i;
	while (objetRetour.voca[compteur_i][0]!=0) //calcule le niveauHierarchique + le chemin
	{						
		compteur_i=objetRetour.voca[compteur_i][1];
		compteur_i=compteur_i+1;				
		niveauHierarchique++;
		compteurHierarchique[niveauHierarchique]=compteur_i;	
	} 	
	niveauHierarchique--;	
	m=0;	
	for (l=niveauHierarchique; l>0; l--) //insere le chemin dans listobjetRetour
	{		
		value[m]=objetRetour.voca[compteurHierarchique[l]][2];
		m++;		
	}
	value[m]=objetRetour.voca[j][2];	

	//Affiche les résultats de l'arbre hierarchique dans chaque champs
	for (i=0; i<compteur;i++)
	{
		if (!value[i])
			value[i]="";
		listenameinput[i]='POS_VAL_RUB_'+listenameinput[i];
		document.getElementsByName(listenameinput[i])[0].value = value[i];
	}  
	
	// suggestidSelected_number = 0;
} 

//test : Si la fenêtre est ouverte, il la ferme. idArbreHierencours est créée dans 
//la function arbreHierarchique lorsqu'il ouvre la fenêtre
function closeArbreHierarchique(idArbreHier) 
{

		if (typeof(idArbreHierencours) != 'object') 
		{
			document.getElementById(idArbreHier).innerHTML = '';
			document.getElementById(idArbreHier).style.borderWidth = '0px';
			document.getElementById(idArbreHier).style.height='auto';
			document.getElementById(idArbreHier).style.display="none";	
		}
	
}
