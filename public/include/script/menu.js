// Joust Outliner Version 2.5.4
// (c) Copyright 1996-2001, MITEM (Europe) Ltd. All rights reserved.
// This code may be freely copied and distributed provided that it is accompanied by this 
// header.  For full details of the Joust license, as well as documentation and help, go 
// to http://www.ivanpeters.com/.
// 
// Do not modify anything between here and the "End of Joust" marker unless you know what you
// are doing.  

function getDHTMLObj(docName, objName) {
	if 	(theBrowser.hasW3CDOM) {
		return eval(docName + '.getElementById("' + objName + '").style');
	} else {
		return eval(docName + theBrowser.DHTMLRange + '.' + objName + theBrowser.DHTMLStyleObj);
	}
}
function getDHTMLObjTop(theObj) {return (theBrowser.code == "MSIE") ? theObj.pixelTop : theObj.top;}
function getDHTMLObjHeight(docName, objName) {
	if 	(theBrowser.hasW3CDOM) {
	       var hauteur;
	       if (theBrowser.IE9up || theBrowser.Chrome)
	           hauteur = 20;
	       else
                hauteur = parseInt(eval(docName + '.getElementById("' + objName + '").offsetHeight'),10);
		return hauteur;
	} else {
		return eval(docName + theBrowser.DHTMLRange + '.' + objName + theBrowser.DHTMLDivHeight);
	}
}
	
function getDHTMLImg(docName, objName, imgName) {
	if 	(document.layers) {
		return getDHTMLObj(docName, objName).document.images[imgName];
	} else {
		return eval(docName + '.images.' + imgName);
	}
}
function simpleArray() {this.item = 0;}
function imgStoreItem(n, s, w, h) {
	this.name = n;
	this.src = s;
	this.obj = null;
	this.w = w;
	this.h = h;
	if ((theBrowser.canCache) && (s)) {
		this.obj = new Image(w, h);
		this.obj.src = s;
	}
}
function imgStoreObject() {
	this.count = -1;
	this.img = new imgStoreItem;
	this.find = imgStoreFind;
	this.add = imgStoreAdd;
	this.getSrc = imgStoreGetSrc;
	this.getTag = imgStoreGetTag;
}

function imgStoreFind(theName) {
	var foundItem = -1;
	for (var i = 0; i <= this.count; i++) {if (this.img[i].name == theName) {foundItem = i;break;}}
	return foundItem;
}
function imgStoreAdd(n, s, w, h) {
	var i = this.find(n);
	if (i == -1) {i = ++this.count;}
	this.img[i] = new imgStoreItem(n, s, parseInt(w, 10), parseInt(h, 10));
}
function imgStoreGetSrc(theName) {
	var i = this.find(theName);
	var img = this.img[i];
	return (i == -1) ? '' : ((img.obj) ? img.obj.src : img.src);
}
function imgStoreGetTag(theName, iconID, altText) {
	var i = this.find(theName);
	if (i < 0) {return ''}
	with (this.img[i]) {
		if (src == '') {return ''}
		var tag = '<img src="' + src + '" width="' + w + '" height="' + h + '" border="0" align="left" hspace="0" vspace="0"';
		tag += (iconID != '') ? ' name="' + iconID + '"' : '';
		tag += ' alt="' + ((altText)?altText:'') + '">';
	}
	return tag;
}
// The MenuItem object.  This contains the data and functions for drawing each item.
function MenuItem (owner, id, type, text, url, status, nItem, pItem, parent) {
	var t = this;
	this.owner = owner;
	this.id = id;
	this.type = type;
	this.text = text;
	this.url = url;
	this.status = status;
	this.target = owner.defaultTarget;
	this.nextItem = nItem;
	this.prevItem = pItem;
	this.FirstChild = -1;
	this.parent = parent;
	this.isopen = false;
	this.isSelected = false;
	this.draw = MIDraw;
	this.PMIconName = MIGetPMIconName;
	this.docIconName = MIGetDocIconName;
	this.setImg = MISetImage;
	this.setIsOpen = MISetIsOpen;
	this.setSelected = MISetSelected;
	this.setIcon = MISetIcon;
	this.mouseOver = MIMouseOver;
	this.mouseOut = MIMouseOut;
	var i = (this.owner.imgStore) ? this.owner.imgStore.find(type) : -2;
	if (i == -1) {i = this.owner.imgStore.find('iconPlus');}
	this.height = (i > -1) ? this.owner.imgStore.img[i].h : 0;
}
function MIDraw (indentStr) {
	var o = this.owner;
	var mRef = '="return ' + o.reverseRef + "." + o.name;
	var tmp = mRef + '.entry[' + this.id + '].';
	var MOver = ' onMouseOver' + tmp + 'mouseOver(\''
	var MOut = ' onMouseOut' + tmp + 'mouseOut(\''
	var iconTag = o.imgStore.getTag(this.PMIconName(), 'plusMinusIcon' + this.id, '');
	var aLine = (theBrowser.IE9up || theBrowser.Chrome) ? '<div style=\'white-space: nowrap;\'>' : '<nobr>';
	//aLine = '<div style=\'white-space: nowrap;\'>';
    aLine += indentStr;
	if (!this.noOutlineImg) {
		// GG 20111013
        if (this.FirstChild != -1 || this.type.indexOf("Folder") == 0) 
        {
			aLine += '<A HREF="#" onClick' + mRef + '.toggle(' + this.id + ');"' + MOver + 'plusMinusIcon\',this);"' + MOut + 'plusMinusIcon\');">' + iconTag + '</A>';				
		} else {
			aLine += iconTag;
		}
	}
	var tip = (o.tipText == 'text') ? this.text : ((o.tipText == 'status') ? this.status : '');
	var theEntry = o.imgStore.getTag(this.docIconName(), 'docIcon' + this.id, tip) + this.text;
	var theImg = o.imgStore.getTag(this.docIconName(), 'docIcon' + this.id, tip);
	var sTxt = '<SPAN CLASS="' + ((this.CSSClass) ? this.CSSClass : ((this.FirstChild != -1) ? 'node' : 'leaf')) + '">';
	var lTxt = '<A NAME="joustEntry' + this.id + '"';
	var theUrl = (((this.url == '') && theBrowser.canJSVoid && o.showAllAsLinks) || o.wizardInstalled) ? 'javascript:void(0);' : this.url;
	//Pour pouvoir avoir un menu arborescent avec la variable url vide.
	//if (theUrl != '')
	{
		if (this.target.charAt(1) == "_") {theUrl = "javascript:" + o.reverseRef + ".loadURLInTarget('" + theUrl + "', '" + this.target + "');";}
			lTxt += ' HREF="' + theUrl + '" TARGET="' + this.target + '" onClick' + mRef + '.itemClicked(' + this.id + ');"'
			+ MOver + 'docIcon\',this);"' + MOut + 'docIcon\');"';
	}
	lTxt += (tip) ? ' TITLE="' + tip + '">' : '>';
	aLine += sTxt + lTxt + theImg;
	if (this.multiLine) {
		aLine += '</A></SPAN><TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0"><TR><TD>' + sTxt + lTxt + this.text + '</A></SPAN></TD></TR></TABLE>';
	} else {
		aLine += this.text + '</A></SPAN>';
	}
    aLine += (theBrowser.IE9up || theBrowser.Chrome) ? '</div>' : '</nobr>';
    if ((theBrowser.hasW3CDOM) && (theBrowser.hasDHTML) && (!this.multiLine))  { aLine += '<br>'; }
	return aLine
}
function MIGetPMIconName() {
	//var n = 'icon' + ((this.FirstChild != -1) ? ((this.isopen == true) ? 'Minus' : 'Plus') : 'Join');
	//var n = 'icon' + ((this.isopen == true) ? 'Minus' : 'Plus');
	// GG 20111013
    var n = 'icon' + ((this.FirstChild != -1 ||  this.type.indexOf("Folder") == 0) ? ((this.isopen == true) ? 'Minus' : 'Plus') : 'Join');
	
	n += (this.id == this.owner.firstEntry) ? ((this.nextItem == -1) ? 'Only' : 'Top') : ((this.nextItem == -1) ? 'Bottom' : '');
	return n;
}
function MIGetDocIconName() {
	var is = this.owner.imgStore; var n = this.type;
	n += ((this.isopen) && (is.getSrc(n + 'Expanded') != '')) ? 'Expanded' : '';
	n += ((this.isSelected) && (is.getSrc(n + 'Selected') != '')) ? 'Selected' : '';
	return n;
}
function MISetImage(imgID, imgName) {
	var o = this.owner; var s = o.imgStore.getSrc(imgName);
	if ((s != '') && (theBrowser.canCache) && (!o.amBusy)) {
		var img = (theBrowser.hasDHTML) ? getDHTMLImg(o.container + '.document', 'entryDIV' + this.id, imgID) : eval(o.container).document.images[imgID];
		if (img && img.src != s) {img.src = s;} 
	}
}
function MISetIsOpen (isOpen) {
	if ((this.isopen != isOpen) && (this.FirstChild != -1)) {
		this.isopen = isOpen;
		this.setImg('plusMinusIcon' + this.id, this.PMIconName());
		this.setImg('docIcon' + this.id, this.docIconName());
		return true;
	} else {
		return false;
	}
}
function MISetSelected (isSelected) {
	this.isSelected = isSelected;
	this.setImg('docIcon' + this.id, this.docIconName());
	if ((this.parent >= 0) && this.owner.selectParents) {this.owner.entry[this.parent].setSelected(isSelected);}
}
function MISetIcon (newType) {
	this.type = newType;
	this.setImg('docIcon' + this.id, this.docIconName());
}
function MIMouseOver(imgName, theURL) {
	eval(this.owner.container).status = '';  //Needed for setStatus to work on MSIE 3 - Go figure!?
	var newImg = '';
	var s = '';
	if (imgName == 'plusMinusIcon') {
		newImg = this.PMIconName();
		s = 'Click to ' + ((this.isopen == true) ? 'collapse.' : 'expand.');
	} else {
		if (imgName == 'docIcon') {
			newImg = this.docIconName();
			s = (this.status != null) ? this.status : theURL;
		}
	}
	setStatus(s);
	if (theBrowser.canOnMouseOut) {this.setImg(imgName + this.id, newImg + 'MouseOver');}
	if(this.onMouseOver) {var me=this;eval(me.onMouseOver);}
	return true;
}
function MIMouseOut(imgName) {
	clearStatus();
	var newImg = '';
	if (imgName == 'plusMinusIcon') {
		newImg = this.PMIconName();
	} else {
		if (imgName == 'docIcon') {newImg = this.docIconName();}
	}
	this.setImg(imgName + this.id, newImg);
	if(this.onMouseOut) {var me=this;eval(me.onMouseOut);}
	return true;
}
// The Menu object.  This is basically an array object although the data in it is a tree.
function Menu () {
	this.count = -1;
	this.version = '2.5.4';
	this.firstEntry = -1;
	this.autoScrolling = false;
	this.modalFolders = false;
	this.linkOnExpand = false;
	this.toggleOnLink = false;
	this.showAllAsLinks = false;
	this.savePage = true;
	this.name = 'theMenu';
	// this.container = 'menu';
	this.container = 'self';
	// this.reverseRef = 'parent';
	this.reverseRef = 'self';
	
	this.typeMenu = 'normal';
	
	this.contentFrame = 'text';
	this.defaultTarget = 'text';
	this.tipText = 'none';
	this.selectParents = false;
	this.lastPMClicked = -1;
	this.selectedEntry = -1;
	this.wizardInstalled = false;
	this.amBusy = true;
	this.maxHeight = 0;
	this.imgStore = new imgStoreObject;
	this.entry = new MenuItem(this, 0, '', '', '', '', -1, -1, -1);
	this.contentWin = MenuGetContentWin;
	this.getEmptyEntry = MenuGetEmptyEntry;
	this.addEntry = MenuAddEntry;
	this.addMenu = MenuAddEntry;
	this.addChild = MenuAddChild;
	this.rmvEntry = MenuRmvEntry;
	this.rmvChildren = MenuRmvChildren;
	this.draw = MenuDraw;
	this.drawALevel = MenuDrawALevel;
	this.refresh = MenuRefresh;
	this.reload = MenuReload;
	this.refreshDHTML = MenuRefreshDHTML;
	this.scrollTo = MenuScrollTo;
	this.itemClicked = MenuItemClicked;
	this.selectEntry = MenuSelectEntry;
	this.setEntry = MenuSetEntry;
	this.setEntryByURL = MenuSetEntryByURL;
	this.setAllChildren = MenuSetAllChildren;
	this.setAll = MenuSetAll;
	this.openAll = MenuOpenAll;
	this.closeAll = MenuCloseAll;
	this.findEntry = MenuFindEntry;
	this.toggle = MenuToggle;
}
function MenuGetContentWin() {
	return eval(((myOpener != null) ? 'myOpener.' : 'self.') + this.contentFrame);
}
function MenuGetEmptyEntry() {
	for (var i = 0; i <= this.count; i++) {if (this.entry[i] == null) {break;}}
	if (i > this.count) {this.count = i};
	return i
}
function MenuAddEntry (addTo, type, text, url, status, insert) {
	if (!insert) {insert=false;}
	var theNI = -1;var theP = -1;var thePI = -1;
	if (addTo < 0) {
		var i = addTo = this.firstEntry;
		if (!insert) {while (i > -1) {addTo = i;i = this.entry[i].nextItem;}}
	}
	if (addTo >= 0) {
		var e = this.entry[addTo];
		if (!e) {return -1;}
		thePI = (insert)?e.prevItem:addTo;
		theNI = (insert)?addTo:e.nextItem;
		theP = e.parent;
	}
	var eNum = this.getEmptyEntry();
	if (thePI >= 0) {
		this.entry[thePI].nextItem = eNum;
	} else {
		if (theP >= 0) {
			this.entry[theP].FirstChild = eNum;
		} else {
			this.firstEntry = eNum;
		}
	}
	if (theNI >= 0) {this.entry[theNI].prevItem = eNum;}
	this.entry[eNum] = new MenuItem(this, eNum, type, text, url, status, theNI, thePI, theP);
	return eNum;
}
function MenuAddChild (addTo, type, text, url, status, insert) {
	if (!insert) {insert=false;}
	var eNum = -1;
	if ((this.count == -1) || (addTo < 0)) {
		eNum = this.addEntry(-1, type, text, url, status, false);
	} else {
		var e = this.entry[addTo];
		if (!e) {return -1;}
		var cID = e.FirstChild;
		if (cID < 0) {
			e.FirstChild = eNum = this.getEmptyEntry();
			this.entry[eNum] = new MenuItem(this, eNum, type, text, url, status, -1, -1, addTo);	
		} else {
			while (!insert && (this.entry[cID].nextItem >= 0)) {cID = this.entry[cID].nextItem;}
			eNum = this.addEntry(cID, type, text, url, status, insert);
		}
	}
	return eNum;
}
function MenuRmvEntry (theEntry) {
	var e = this.entry[theEntry];
	if (e == null) {return;}
	var p = e.prevItem;
	var n = e.nextItem;
	if (e.FirstChild > -1) {this.rmvChildren(theEntry);}
	if (this.firstEntry == theEntry) {this.firstEntry = n}
	if (this.selectedEntry == theEntry) {this.selectedEntry = n}
	if (p > -1) {
		this.entry[p].nextItem = n;
	} else { 
		if (e.parent > -1) {
			this.entry[e.parent].FirstChild = n;
		} else {
			if (this.firstEntry == theEntry) {this.firstEntry = n}
		}
	} 
	if (n > -1) {this.entry[n].prevItem = p;}
	this.entry[theEntry] = null;
}
function MenuRmvChildren (theP) {
	var eNum;var e;var tmp;
	if (theP == -1) {
		eNum = this.firstEntry;
		this.firstEntry = -1;
	} else {
		eNum = this.entry[theP].FirstChild;
		this.entry[theP].FirstChild = -1;
	}
	while (eNum > -1) {
		e = this.entry[eNum];
		if (e.FirstChild > -1) {this.rmvChildren(eNum);}
		if (this.selectedEntry == eNum) {this.selectedEntry = e.parent;}
		tmp = eNum;
		eNum = e.nextItem;
		this.entry[tmp] = null;
	}
}
function MenuDraw() {
	this.maxHeight = 0;
	var theDoc = eval(this.container + ".document");
	eval(this.container).document.writeln(this.drawALevel(this.firstEntry, '', true, theDoc));
	if (theBrowser.hasDHTML) {
		for (var i = 0; i <= this.count; i++) {
			if (this.entry[i]) {
				this.maxHeight += getDHTMLObjHeight(this.container + '.document', 'entryDIV' + i);
			}
		}
	} else {
		if ((this.lastPMClicked > 0) && theBrowser.mustMoveAfterLoad && this.autoScrolling) {
			this.scrollTo(this.lastPMClicked);
		}
	}
}
function MenuDrawALevel(firstItem, indentStr, isVisible, theDoc) {
	var currEntry = firstItem;
	var padImg = "";
	var aLine = "";
	var theLevel = "";
	var e = null;
	while (currEntry > -1) {
		e = this.entry[currEntry];
		aLine = e.draw(indentStr);
		if (theBrowser.hasDHTML) {
			aLine = '<DIV ID="entryDIV' + currEntry + '" CLASS="menuItem">' + aLine + '</DIV>';
		} else {
			aLine += '<BR CLEAR="ALL">';
		}
		theBrowser.lineByLine = false;
		if (theBrowser.lineByLine) {theDoc.writeln(aLine);} else {theLevel += aLine;}
		if ((e.FirstChild > -1) && ((theBrowser.hasDHTML || (e.isopen && isVisible)))) {
			padImg = (e.noOutlineImg) ? '' : this.imgStore.getTag((e.nextItem == -1) ? 'iconBlank' : 'iconLine', '', '');
			theLevel += this.drawALevel(e.FirstChild, indentStr + padImg, (e.isopen && isVisible), theDoc);
		}
		currEntry = e.nextItem;
	}
	return theLevel;
}
function MenuRefresh() {
	if (theBrowser.hasDHTML) {
		if (!this.amBusy) {
			this.refreshDHTML();
			if (this.autoScrolling) {this.scrollTo(this.lastPMClicked);}
		}
	} else {
		this.reload();
	}
}
function MenuReload() {
	if (!this.amBusy) {
		this.amBusy = true;
		var l = eval(this.container).location;
		var rm = theBrowser.reloadMethod;
		var newLoc = fixPath(l.pathname);
		var s = '';
		if (l.search) {s = l.search;}
		if (theBrowser.needsMenuSearch) {
			if (s == '') {
				s = '?jtoggle=1';
			} else {
				var p = s.indexOf('jtoggle=');
				if (p < 0) {
					s += '&jtoggle=1';
				} else {
					var t = (s.substring(p + 8, p + 9) == "1") ? "2" : "1";
					s = s.substring(0, p+8) + t;
				}
			}
		}
		newLoc += s;
		if (this.autoScrolling && (this.lastPMClicked > 0) && !theBrowser.mustMoveAfterLoad) {
			newLoc += "#joustEntry" + this.lastPMClicked;
		}
		if (rm == 'replace') {
			l.replace(newLoc);
		} else {
			if (rm == 'reload') {
				l.reload();
			} else {
				if (rm == 'timeout') {
					setTimeout(this.container + ".location.href ='" + newLoc + "';", 100);
				} else {
					l.href = newLoc;
				}
			}
		}
		this.scrollTo(this.lastPMClicked);
	}
}
function MenuRefreshDHTML() {
	var nextItemArray = new simpleArray;
	var currEntry = this.firstEntry;
	var level = (currEntry == -1) ? 0 : 1;
	var isVisible = true;
	var lastVisibleLevel = 1;
	var co = eval(this.container);
	var yPos = co.menuStart;
	var d = this.container + '.document';
	var e = null;var s = null;
	while (level > 0) {
		e = this.entry[currEntry];
		s = getDHTMLObj(d, 'entryDIV' + currEntry);
		if (isVisible) {
			s.top = yPos;
			s.visibility = 'visible';
			yPos += getDHTMLObjHeight(d, 'entryDIV' + currEntry);
			lastVisibleLevel = level;
		} else {
			s.visibility = 'hidden';
			s.top = 0;
		}
		if (e.FirstChild > -1) {
			isVisible = (e.isopen == true) && isVisible;
			nextItemArray[level++] = e.nextItem;
			currEntry = e.FirstChild;
		} else {
			if (e.nextItem != -1) {
				currEntry = e.nextItem;
			} else {
				while (level > 0) {
					if (nextItemArray[--level] != -1) {
						currEntry = nextItemArray[level];
						isVisible = (lastVisibleLevel >= level);
						break;
					}
				}
			}
		}
	}
	this.maxHeight = yPos;
	co.setMenuHeight(yPos);
}
function MenuScrollTo(entryNo) {
	if (theBrowser.hasDHTML) {
		var e = this.entry[entryNo];
		if (!e) {return;}
		var co = eval(this.container);
		var d = this.container + '.document';
		var srTop = getDHTMLObjTop(getDHTMLObj(d, 'entryDIV' + entryNo));
		var srBot = (e.nextItem > 0) ? getDHTMLObjTop(getDHTMLObj(d, 'entryDIV' + e.nextItem)) : this.maxHeight;
		if (theBrowser.code == 'MSIE') {
			var curTop = co.document.body.scrollTop;
			var curBot = curTop + co.document.body.clientHeight;
		} else {
			var curTop = co.pageYOffset;
			var curBot = curTop + co.innerHeight;
		}
		if ((srBot > curBot) || (srTop < curTop)) {
			var scrBy = srBot - curBot;
			if (srTop < (curTop + scrBy)) {scrBy = srTop - curTop;}
			co.setTimeout('self.scrollBy(0, ' + scrBy + ');', 100);
		}
	} else {
		var l = fixPath(eval(this.container).location.pathname) + '#joustEntry' + entryNo;
		setTimeout(this.container + '.location.href = "' + l + '";', 100);
	}
}
function MenuItemClicked(entryNo, fromToggle) {
	var r = true;
	var e = this.entry[entryNo];
	var w = this.contentWin();
	var b = theBrowser;
	
	this.selectEntry(entryNo);
	if (this.wizardInstalled) {w.menuItemClicked(entryNo);}
	if(e.onClickFunc) {e.onClick = e.onClickFunc;}
	if(e.onClick) {var me=e;if(eval(e.onClick) == false) {r = false;}}
	if (r) {
		if (((this.toggleOnLink) && (e.FirstChild != -1) && !(fromToggle)) || e.noOutlineImg) {
			if (b.hasDHTML) {
				this.toggle(entryNo, true);
			} else {
				setTimeout(this.name + '.toggle(' + entryNo + ', true);', 100);
			}
		}
	}
	
	if (r)
	{
	//Debut gestion pour basculement des frames
	if(theMenu.entry[entryNo].target == "centerbal")
		basculerEcran('centerbal');
    	else if((theMenu.entry[entryNo].target == "frm_arbo_question" && theMenu.entry[entryNo].type.indexOf("Folder") == -1 && theMenu.entry[entryNo].type.indexOf("FinDossier") == -1)|| theMenu.entry[entryNo].target == "center")
		basculerEcran('center');
	}
	//fin gestion pour basculement des frames
	return (e.url != '') ? r : false;
}
function MenuSelectEntry(entryNo) {
	var oe = this.entry[this.selectedEntry];
	if (oe) {oe.setSelected(false);}
	var e = this.entry[entryNo];
	if (e) {e.setSelected(true);}
	this.selectedEntry = entryNo;
}
function MenuSetEntry(entryNo, state) {
	var cl = ',' + entryNo + ',';
	var e = this.entry[entryNo];
	this.lastPMClicked = entryNo;
	var mc = e.setIsOpen(state);
	var p = e.parent;
	while (p >= 0) {
		cl += p + ',';
		e = this.entry[p];
		mc |= (e.setIsOpen(true));
		p = e.parent;
	}
	if (this.modalFolders) {
		for (var i = 0; i <= this.count; i++) {
			e = this.entry[i];
			if ((cl.indexOf(',' + i + ',') < 0) && e) {mc |= e.setIsOpen(false);}
		}
	}
	return mc;
}
function MenuSetEntryByURL(theURL, state) {
	var i = this.findEntry(theURL, 'url', 'right', 0);
	return (i != -1) ? this.setEntry(i, state) : false;
}
function MenuSetAllChildren(state, parentID) {
	var hasChanged = false;
	var currEntry = (parentID > -1) ? this.entry[parentID].FirstChild : this.firstEntry;
	while (currEntry > -1) {
		var e = this.entry[currEntry];
		hasChanged |= e.setIsOpen(state);
		if (e.FirstChild > -1) {hasChanged |= this.setAllChildren(state, currEntry);}
		currEntry = e.nextItem;
	}
	return hasChanged;
}
function MenuSetAll(state, parentID) {
	if (theBrowser.version >= 4) {
		if (parentID == 'undefined') {parentID = -1;}
	} else {
		if (parentID == null) {parentID = -1;}
	}
	var hasChanged = false;
	if (parentID > -1) {hasChanged |= this.entry[parentID].setIsOpen(state);}
	hasChanged |= this.setAllChildren(state, parentID);
	if (hasChanged) {
		this.lastPMClicked = this.firstEntry;
		this.refresh();
	}
}
function MenuOpenAll() {this.setAll(true, -1);}
function MenuCloseAll() {this.setAll(false, -1)}
function MenuFindEntry(srchVal, srchProp, matchType, start) {
	var e;
	var sf;
	if (srchVal == "") {return -1;}
	if (!srchProp) {srchProp = "url";}
	if (!matchType) {matchType = "exact";}
	if (!start) {start = 0;}
	if (srchProp == "URL") {srchProp = "url";}
	if (srchProp == "title") {srchProp = "text";}
	eval("sf = cmp_" + matchType);
	for (var i = start; i <= this.count; i++) {
		if (this.entry[i]) {
			e = this.entry[i];
			if (sf(eval("e." + srchProp), srchVal)) {return i;}
		}		
	}
	return -1;
}
function cmp_exact(c, s) {return (c == s);}
function cmp_left(c, s) {
	var l = Math.min(c.length, s.length);
	return ((c.substring(1, l) == s.substring(1, l)) && (c != ""));
}
function cmp_right(c, s) {
	var l = Math.min(c.length, s.length);
	return ((c.substring(c.length-l) == s.substring(s.length-l)) && (c != ""));
}
function cmp_contains(c, s) {return (c.indexOf(s) >= 0);}
function MenuToggle(entryNo, fromClicked) {
	var r = true;
	var e = this.entry[entryNo];
	// GG 20111013
	if (e.FirstChild == -1)
	{
        var iNumDossier = getNumDossierFromTextMenu(e.text);
        var tabFils = getListeFils(iNumDossier);
        var oldSelectedEntry = this.selectedEntry;
        this.selectedEntry = entryNo;
        //if (tabFils.length != 0)
        {
            updateMenu(tabFils);
            // referme le menu car il a ete marque ouvert par la fonction updateMenu
            e.isopen = false;
        }
        // remet l'ancienne entree sinon les dossiers de la recherche en cours s'affiche sous cette entree
        this.selectedEntry = oldSelectedEntry;
    }
	if (e.onToggle) {var me=e;if(eval(e.onToggle) == false) {r = false;}}
	if (r) {
		var chg = this.setEntry(entryNo, e.isopen ^ 1);
		if (this.linkOnExpand && e.isopen) {
			if (e.url != '') {loadURLInTarget(e.url, e.target);}
			if (!fromClicked) {this.itemClicked(entryNo, true);}
		}
		if (chg) {this.refresh();}
	}
	return false;
}
// Other functions
function DrawMenu(m) {
	m.draw();
}
function browserInfo() {
	this.code = 'unknown';
	this.version = 0;
	this.platform = 'Win';
	var ua = navigator.userAgent;
	var i = ua.indexOf('WebTV');
	if (i >= 0) {
		this.code = 'WebTV';
		i += 6;
	} else {
		i = ua.indexOf('Opera');
		if (i >= 0) {
			this.code = 'OP';
			i = ua.indexOf(') ') + 2;
		} else {
			i = ua.indexOf('Trident');
			if (i >= 0) {
				this.code = 'Trident';
				i += 8;
			} else {
			    i = ua.indexOf('Chrome/');
			    if (i >= 0) {
				    this.code = 'Chrome';
				    i += "Chrome/".length;
			    } else {
    				i = ua.indexOf('Mozilla/');
    				if (i >= 0) {
    					this.code = 'NS';
    					i += 8;
    				}
    			}
			}
		}
	}
	
	this.version = parseFloat(ua.substring(i, i+4));
	if (ua.indexOf('Mac') >= 0) {this.platform = 'Mac';}
	if (ua.indexOf('OS/2') >= 0) {this.platform = 'OS/2';}
	if (ua.indexOf('X11') >= 0) {this.platform = 'UNIX';}
	var v = this.version;
	var p = this.platform;
	var NS = (this.code == 'NS');
	var IE = (this.code == 'Trident');
	var WTV = (this.code == 'WebTV');
	var OP = (this.code == 'OP');
	var OP32up = (OP && (v >= 3.2));
	var OP5up = (OP && (v >= 5));
	var IE4up = (IE && (v >= 4));
	var NS3up = (NS && (v >= 3));
	var NS6up = (NS && (v >= 5));
	var Chrome = (this.code == 'Chrome');
	this.IE9up = (IE && (v >= 5));
	this.Chrome = (this.code == 'Chrome');
	this.canCache = NS3up || IE4up || OP32up || WTV || Chrome;
	this.canOnMouseOut = this.canCache;
	this.canOnError = NS3up || IE4up || OP32up;
	this.canJSVoid = !((NS && !NS3up) || (IE && !IE4up) || (OP && (v < 3.5)));
	this.lineByLine = (v < 4);
	this.mustMoveAfterLoad = NS3up || (IE4up && (p != 'Mac')) || WTV;
	if (NS6up == true) {
		this.reloadMethod = 'reload';
	} else {
		if (NS3up || IE4up || Chrome || WTV || OP5up) {
			this.reloadMethod = 'replace';
		} else {
			this.reloadMethod = (NS && (v == 2.01) && (p != 'Win')) ? 'timeout' : 'href';
		}
	}
	this.needsMenuSearch = (OP && !OP5up);
	this.canFloat = Chrome || NS || (IE && !((p == 'Mac') && (v >= 4) && (v < 5)));
	this.hasDHTML = ((NS || IE || Chrome) && (v >= 4)) && !(IE && (p == 'Mac') && (v < 4.5));
	this.slowDHTML = IE4up || NS6up || Chrome;
	this.hasW3CDOM = (document.getElementById) ? true : false;
	this.needLM = (!this.hasW3CDOM && NS) || (IE && (p == 'Mac') && (v >= 4.5));
	this.DHTMLRange = IE ? '.all' : '';
	this.DHTMLStyleObj = IE ? '.style' : '';
	this.DHTMLDivHeight = IE ? '.offsetHeight' : '.clip.height';
}
function getWindow() {return (floatingMode) ? myOpener : self;}
function setStatus(theText) {
	var theWindow = getWindow();
	if (theWindow) {
		theWindow.status = theText;
		if (!theBrowser.canOnMouseOut) {
			clearTimeout(statusTimeout);
			statusTimeout = setTimeout('clearStatus()', 5000);
		}
	}
	return true;
}
function clearStatus() {
	var theWindow = getWindow();
	if (theWindow) {theWindow.status = '';}
}
function unloadFloating() {
	if (myOpener) {
		if (myOpener.JoustFrameset) {myOpener.setTimeout('menuClosed();', 100);}
	}
}
function getMode() {
	var theMode = getParm(document.cookie, 'mode', ';');
	return ((theMode == "Floating") || (theMode == "NoFrames")) ? theMode : "Frames";
}
function smOnError (msg, url, lno) {
	smCallerWin.onerror = oldErrorHandler;
	if (confirm(smSecurityMsg)) {setTimeout('setMode("' + smNewMode + '");', 100);}
	return true;
}
function smSetCookie(theMode) {
	document.cookie = 'mode=' + theMode + '; path=/';
	if (getMode() != theMode) {
		alert(smCookieMsg);
		return false;
	} else {
		return true;
	}
}
function setMode(theMode, callerWin) {
	smNewMode = theMode
	smCallerWin = (theBrowser.code == 'NS') ? callerWin : self;
	var okToGo = true;
	var currentMode = getMode();
	if (theMode != currentMode) {
		if (currentMode == 'Floating') {
			if (smSetCookie(theMode)) {self.close();}
		} else {
			var dest = '';
			if (theBrowser.canFloat) {
				if ((theMenu.savePage) && (callerWin)) {
					if (theBrowser.canOnError) {
						oldErrorHandler = smCallerWin.onerror;
						smCallerWin.onerror = smOnError;
					}
					var l = theMenu.contentWin().location;
					var p = l.pathname;
					if (theBrowser.canOnError) {smCallerWin.onerror = oldErrorHandler;}
					if (p) {
						dest = fixPath(p) + l.search;
					} else {
						if (!confirm(smSecurityMsg)) {okToGo = false;}
					}
				}
			} else {
				okToGo = false;
			}
			if (okToGo && smSetCookie(theMode)) {
				if (theMode == 'NoFrames') {
					location.href = (index3 == '') ? ((dest == '') ? '/' : dest) : index3;
				} else {
					location.href = index2 + ((dest == '') ? '' : '?page=' + escape(dest));
				}
			}
		}
	}
}
function fixPath(p) {
	var i = p.indexOf('?', 0);
	if (i >= 0) {p = p.substring(0,i);}
	if (p.substring(0,2) == '/:') {p = p.substring(p.indexOf('/', 2), p.length);}
	i = p.indexOf('\\', 0);
	while (i >= 0) {
		p = p.substring(0,i) + '/' + p.substring(i+1,p.length);
		i = p.indexOf('\\', i);
	}
	return p;
}
function fileFromPath(p) {
	p = fixPath(p);
	var i = p.lastIndexOf('\\');
	if (i >= 0) {p = p.substring(i+1,p.length);}
	return p;
}
function getParm(theStr, parm, delim) {
	// returns value of parm from string
	if (theStr.length == 0) {return '';}
	var sPos = theStr.indexOf(parm + "=");
	if (sPos == -1) {return '';}
	sPos = sPos + parm.length + 1;
	var ePos = theStr.indexOf(delim, sPos);
	if (ePos == -1) {ePos = theStr.length;}
	return unescape(theStr.substring(sPos, ePos));
}
function pageFromSearch(def, m, selIt) {
	var s = self.location.search;
	if ((s == null) || (s.length <= 1)) {return def;}
	var p = getParm(s, 'page', '&');
	p = (p != '') ? fixPath(p) : def;
	if (m != null) {
		var e = m.findEntry(p, 'URL', 'exact');
		if ((e != -1) && selIt) {
			m.setEntry(e, true);
			m.selectEntry(e);
		}
	}
	return p;
}
function loadURLInTarget(u, t) {
var w = eval("self." + t);
	if (!w && myOpener) {w = eval("myOpener." + t);}
	if (!w && ("_top,_parent,_self".indexOf(t) >= 0)) {
		w = eval("getWindow()." + t.substring(1));}
	if (w) {w.location.href = u;} else {window.open(u, t);}
}
function defOnError(msg, url, lno) {
	if (jsErrorMsg == '') {
		return false;
	} else {
		alert(jsErrorMsg + '.\n\nError: ' + msg + '\nPage: ' + url + '\nLine: ' + lno + '\nBrowser: ' + navigator.userAgent);
		return true;
	}
}
function defaultResizeHandler() {
	if ((theBrowser.code == "NS") && theBrowser.hasDHTML && (self.frames.length != 0)) {
		if (!eval(theMenu.container + ".document.menuBottom")) {
			theMenu.reload();
		}
	}
}
// Declare global variables
var theBrowser = new browserInfo;

var jsErrorMsg = 'A JavaScript error has occurred on this page!  Please note down the ';
jsErrorMsg += 'following information and pass it on to the Webmaster.';
//if (theBrowser.canOnError) {self.onerror = defOnError;}

var theMenu = new Menu;
var JoustFrameset = true;
var statusTimeout = 0;
var smCallerWin;
var smNewMode;
var oldErrorHandler;
var smNoFloat = 'Sorry, your browser does not support this feature!';
var smCookieMsg = 'You must have Cookies enabled to change the display mode!';
var smSecurityMsg = 'Due to security restrictions imposed by your browser, I cannot ';
smSecurityMsg += 'change modes while a page from another server is being displayed. ';
smSecurityMsg += 'The default home page for this site will be displayed instead.';

var floatingMode = (getMode() == 'Floating');
var myOpener = null;
if (floatingMode == true) {
	if (self.opener) {
		myOpener = self.opener;
		if (myOpener.JoustFrameset) {myOpener.setTimeout('setGlobals();', 100);}
	} else {
		document.cookie = 'mode=Frames; path=/';
		floatingMode = false;
	}
} else {
	if (getMode() != 'Frames') {document.cookie = 'mode=Frames; path=/';}
}

//	############################   End of Joust   ############################

function initOutlineIcons(imgStore) {
	var ip = '../../../../images/menu/';
	//ip += (theBrowser.platform == 'Mac') ? 'mac/' : ((theBrowser.platform == 'OS/2') ? 'os2/' : 'win/');
	ip += 'win/';
	imgStore.add('iconPlusTop', ip + 'plustop.gif', 18, 19);
	imgStore.add('iconPlus', ip + 'plus.gif', 18, 20);
	imgStore.add('iconPlusBottom', ip + 'plusbottom.gif', 18, 18);
	imgStore.add('iconPlusOnly', ip + 'plusonly.gif', 18, 19);
	imgStore.add('iconMinusTop', ip + 'minustop.gif', 18, 19);
	imgStore.add('iconMinus', ip + 'minus.gif', 18, 20);
	imgStore.add('iconMinusBottom', ip + 'minusbottom.gif', 18, 18);
	imgStore.add('iconMinusOnly', ip + 'minusonly.gif', 18, 18);
	imgStore.add('iconLine', ip + 'line.gif', 18, 20);
	imgStore.add('iconBlank', ip + 'blank.gif', 18, 19);
	imgStore.add('iconJoinTop', ip + 'jointop.gif', 18, 19);
	imgStore.add('iconJoin', ip + 'join.gif', 18, 20);
	imgStore.add('iconJoinBottom', ip + 'joinbottom.gif', 18, 19);

	//Add folder and document images to the imgStore.
	imgStore.add('Folder', ip + 'folderclosed.gif', 18, 16);
	imgStore.add('FolderExpanded', ip + 'folderopen.gif', 18, 16);
	imgStore.add('FolderSelected', ip + 'folderopen.gif', 18, 16);
	imgStore.add('Folder_Ajout', ip + 'folderopen_insert.gif', 18, 16);
	imgStore.add('Folder_Diff', ip + 'folderopendiff.gif', 18, 16);
	
	imgStore.add('RechELA', ip + 'multi.gif', 18, 18);
	imgStore.add('RechELAMouseOver', ip + 'multi_roll.gif', 18, 18);
	imgStore.add('RechELASelected', ip + 'multi_selec.gif', 18, 18);
	imgStore.add('RechELA_Diff', ip + 'multi_selec.gif', 18, 18);
	
	imgStore.add('RechFIC', ip + 'recher.gif', 18, 18);
	imgStore.add('RechFICMouseOver', ip + 'recher_roll.gif', 18, 18);
	imgStore.add('RechFICSelected', ip + 'recher_selec.gif', 18, 18);
	imgStore.add('RechFIC_Diff', ip + 'recher_selec.gif', 18, 18);
	
	imgStore.add('RechCOMB', ip + 'combine.gif', 18, 18);
	imgStore.add('RechCOMBMouseOver', ip + 'combine_roll.gif', 18, 18);
	imgStore.add('RechCOMBSelected', ip + 'combine_selec.gif', 18, 18);
	imgStore.add('RechCOMB_Diff', ip + 'combine_selec.gif', 18, 18);
	
	imgStore.add('RechKH', ip + 'cle.gif', 18, 18);
	imgStore.add('RechKHMouseOver', ip + 'cle_roll.gif', 18, 18);
	imgStore.add('RechKHSelected', ip + 'cle_selec.gif', 18, 18);
	imgStore.add('RechKH_Diff', ip + 'cle_selec.gif', 18, 18);
	
	imgStore.add('RechNUM', ip + 'numer.gif', 18, 18);
	imgStore.add('RechNUMMouseOver', ip + 'numer_roll.gif', 18, 18);
	imgStore.add('RechNUMSelected', ip + 'numer_selec.gif', 18, 18);	
	imgStore.add('RechNUM_Diff', ip + 'numer_selec.gif', 18, 18);	

	imgStore.add('RechHIS', ip + 'histor.gif', 18, 18);
	imgStore.add('RechHISMouseOver', ip + 'histor_roll.gif', 18, 18);
	imgStore.add('RechHISSelected', ip + 'histor_selec.gif', 18, 18);
	
	imgStore.add('RechEXC', ip + 'ptext.gif', 18, 18);
	imgStore.add('RechEXCMouseOver', ip + 'ptext_roll.gif', 18, 18);
	imgStore.add('RechEXCSelected', ip + 'ptext_selec.gif', 18, 18);
	imgStore.add('RechEXC_Diff', ip + 'ptext_selec.gif', 18, 18);
	
	imgStore.add('Accueil', ip + 'home.gif', 18, 18);
	imgStore.add('AccueilMouseOver', ip + 'home_roll.gif', 18, 18);
	imgStore.add('AccueilSelected', ip + 'home_selec.gif', 18, 18);
	
	imgStore.add('Creation', ip + 'fiche.gif', 18, 18);
	imgStore.add('CreationMouseOver', ip + 'fiche_roll.gif', 18, 18);
	imgStore.add('CreationSelected', ip + 'fiche_selec.gif', 18, 18);	
	
	imgStore.add('Password', ip + 'pass.gif', 18, 18);
	imgStore.add('PasswordMouseOver', ip + 'pass_roll.gif', 18, 18);
	imgStore.add('PasswordSelected', ip + 'pass_selec.gif', 18, 18);	
	
	imgStore.add('Stat', ip + 'stat.gif', 18, 18);
	imgStore.add('StatMouseOver', ip + 'stat_roll.gif', 18, 18);
	imgStore.add('StatSelected', ip + 'stat_selec.gif', 18, 18);
	
	imgStore.add('Info', ip + 'info.gif', 15, 15);
	imgStore.add('InfoMouseOver', ip + 'info_roll.gif', 15, 15);
	imgStore.add('InfoSelected', ip + 'info_selec.gif', 15, 15);
	
	imgStore.add('Quitter', ip + 'decon.gif', 18, 18);
	imgStore.add('QuitterMouseOver', ip + 'decon_roll.gif', 18, 18);
	imgStore.add('QuitterSelected', ip + 'decon_selec.gif', 18, 18);
	
	imgStore.add('Bib', ip + 'gest_bib.gif', 18, 18);
	imgStore.add('BibMouseOver', ip + 'gest_bib_roll.gif', 18, 18);
	imgStore.add('BibSelected', ip + 'gest_bib_selec.gif', 18, 18);
	imgStore.add('Bib_Diff', ip + 'gest_bib_selec.gif', 18, 18);

	imgStore.add('QuestBib', ip + 'quest_bib.gif', 18, 18);
	imgStore.add('QuestBibMouseOver', ip + 'quest_bib_roll.gif', 18, 18);
	imgStore.add('QuestBibSelected', ip + 'quest_bib_selec.gif', 18, 18);
	imgStore.add('QuestBib_Diff', ip + 'quest_bib_selec.gif', 18, 18);
	
	imgStore.add('pplr', ip + 'pplr.gif', 18, 18);
	imgStore.add('pplrMouseOver', ip + 'pplr_roll.gif', 18, 18);
	imgStore.add('pplrSelected', ip + 'pplr_selec.gif', 18, 18);
	imgStore.add('pplr_Diff', ip + 'pplr_selec.gif', 18, 18);
	
	imgStore.add('BalDos', ip + 'bal.gif', 18, 18);
	imgStore.add('Bal', ip + 'bal.gif', 18, 18);
	imgStore.add('BalMouseOver', ip + 'bal_roll.gif', 18, 18);
	imgStore.add('BalSelected', ip + 'bal_selec.gif', 18, 18);
	imgStore.add('Bal_Diff', ip + 'bal_selec.gif', 18, 18);
	
	imgStore.add('BalVide', ip + 'balvide.gif', 18, 18);
	imgStore.add('BalVideMouseOver', ip + 'balvide_roll.gif', 18, 18);
	imgStore.add('BalVideSelected', ip + 'balvide_selec.gif', 18, 18);
	imgStore.add('BalVide_Diff', ip + 'balvide.gif', 18, 18);
	
	imgStore.add('GroupBal', ip + 'groupbal.gif', 18, 18);
	imgStore.add('GroupBalMouseOver', ip + 'groupbal_roll.gif', 18, 18);
	imgStore.add('GroupBalSelected', ip + 'groupbal_selec.gif', 18, 18);
	imgStore.add('GroupBal_Diff', ip + 'groupbal_selec.gif', 18, 18);
	
	imgStore.add('BalGenerale', ip + 'balgenerale.gif', 18, 18);
	imgStore.add('BalGeneraleMouseOver', ip + 'balgenerale_roll.gif', 18, 18);
	imgStore.add('BalGeneraleSelected', ip + 'balgenerale_selec.gif', 18, 18);
	imgStore.add('BalGenerale_Diff', ip + 'groupbal_selec.gif', 18, 18);
	
	imgStore.add('Bibliotheque', ip + 'list_bib.gif', 18, 18);
	imgStore.add('Bibliotheque_PUB', ip + 'list_bib_part.gif', 18, 18);
	imgStore.add('Bibliotheque_PRIV', ip + 'list_bib_priv.gif', 18, 18);
	imgStore.add('Question', ip + 'recher.gif', 18, 18);
	imgStore.add('Question_Diff', ip + 'recher_selec.gif', 18, 18);
	
	imgStore.add('FinDossier', ip + 'fin_dossier.gif', 18, 18);
	
	if(theMenu.typeMenu == 'fileMenu') {
		
		imgStore.add('Fin_de_page', ip + 'suiv2.gif', 18, 16);
		imgStore.add('Fin_de_ss_page', ip + 'suiv.gif', 18, 16);
		
		// images pour les nature de doc dans la gestion des fichiers.
		imgStore.add('DOC', ip + 'word.gif', 17, 16);
		imgStore.add('XLS', ip + 'xls.gif', 17, 16);
		imgStore.add('PPT', ip + 'ppt.gif', 17, 16);
		imgStore.add('PDF', ip + 'pdf.gif', 18, 16);
		imgStore.add('TXT', ip + 'txt.gif', 16, 16);
		imgStore.add('PS', ip + 'txt.gif', 16, 16);
		imgStore.add('JPG', ip + 'jpg.gif', 16, 16);
	}
	
	var di = '../../../../images/menu/';
	if ((theBrowser.code == 'NS') || (theBrowser.code == 'MSIE')) {
		di += theBrowser.code.toLowerCase() + '_doc';
		imgStore.add('Document', di + '.gif', 18, 16);
		imgStore.add('DocumentMouseOver', di + '_mo.gif', 18, 16);
		imgStore.add('DocumentSelected', di + '_sel.gif', 18, 16);
	} else {
		imgStore.add('Document', di + 'doc.gif', 18, 16);
	}
}

function initialise(type) {
	// Set up parameters to control menu behaviour
	theMenu.autoScrolling = true;	
	theMenu.modalFolders = false;
	theMenu.linkOnExpand = false;
	theMenu.toggleOnLink = false;
	theMenu.showAllAsLinks = false;
	theMenu.savePage = true;
	theMenu.tipText = "status";
	theMenu.selectParents = false;
	theMenu.name = "theMenu";
	// theMenu.container = "self.menu";
	theMenu.container = "self";
	// theMenu.reverseRef = "parent";
	theMenu.reverseRef = "self";
	theMenu.contentFrame = "text";
	theMenu.defaultTarget = "center";
	
	if(arguments.length != 0) {
		theMenu.typeMenu=type;
	}
		
	// Initialise all the icons
	initOutlineIcons(theMenu.imgStore);
	
}

self.defaultStatus = "";	


if (theMenu) {
	theMenu.amBusy = true;
	if (theBrowser.hasDHTML) {
		if (document.all) {
			with (document.styleSheets["JoustStyles"]) {
				addRule ("#menuTop", "position:absolute");
				addRule ("#menuBottom", "position:absolute");
				addRule ("#menuBottom", "visibility:hidden");
				addRule ("#statusMsgDiv", "position:absolute");
			}
		} else {
			if (document.layers) {
				document.ids.menuTop.position = "absolute";
				document.ids.menuBottom.position = "absolute";
				document.ids.menuBottom.visibility = "hidden";
				document.ids.statusMsgDiv.position = "absolute";
			} else {
				if (theBrowser.hasW3CDOM) {
					var styleSheetElement = document.styleSheets[0];
    				var styleSheetLength = styleSheetElement.cssRules.length;
					styleSheetElement.insertRule("#menuTop { position:absolute } ", styleSheetLength++);
					styleSheetElement.insertRule("#menuBottom { position:absolute } ", styleSheetLength++);
					styleSheetElement.insertRule("#menuBottom { visibility:hidden } ", styleSheetLength++);
					styleSheetElement.insertRule("#statusMsgDiv { position:absolute } ", styleSheetLength++);
				}
			}
		}
	}
}
function myVoid() { ; }
function setMenuHeight(theHeight) {
	getDHTMLObj('document', 'menuBottom').top = theHeight;
}
function drawStatusMsg() {
	if (document.layers) {
		document.ids.statusMsgDiv.top = menuStart;
	} else{
		if (document.all) {
			document.styleSheets["JoustStyles"].addRule ("#statusMsgDiv", "top:" + menuStart);
		}
	}
	document.writeln('<DIV ID="statusMsgDiv"><CENTER>Building Menu...</CENTER></DIV>');
}
function drawLimitMarker() {
	var b = theBrowser;
	if (theMenu && b.hasDHTML && b.needLM) {
		var limitPos = theMenu.maxHeight + menuStart + getDHTMLObjHeight('document', 'menuBottom');
		if (b.code == 'NS') {
			document.ids.limitMarker.position = "absolute";
			document.ids.limitMarker.visibility = "hidden";
			document.ids.limitMarker.top = limitPos;
		}
		if (b.code == 'MSIE') {
			with (document.styleSheets["JoustStyles"]) {
				addRule ("#limitMarker", "position:absolute");
				addRule ("#limitMarker", "visibility:hidden");
				addRule ("#limitMarker", "top:" + limitPos + "px");
			}
		}
		document.writeln('<DIV ID="limitMarker">&nbsp;</DIV>');
	}
}
function setTop() {
	if (theMenu && theBrowser.hasDHTML) {
		if (getDHTMLObj('document', 'menuTop')) {
			drawStatusMsg();
			menuStart = getDHTMLObjHeight('document', 'menuTop');
		} else {
			theBrowser.hasDHTML = false;
		}
	}
}
function setBottom() {
	if (theMenu) {
		if (theBrowser.hasDHTML) {
			var mb = getDHTMLObj('document', 'menuBottom');
			if (mb) {
				drawLimitMarker();
				getDHTMLObj('document', 'statusMsgDiv').visibility = 'hidden';
				menuStart = getDHTMLObjHeight('document', 'menuTop');
				theMenu.refreshDHTML();
				if (theMenu.autoScrolling) {theMenu.scrollTo(theMenu.lastPMClicked);}
				mb.visibility = 'visible';
			} else {
				theBrowser.hasDHTML = false;
				self.location.reload();
			}
		}
		theMenu.amBusy = false;
	}
}

function frameResized() {if (theBrowser.hasDHTML) {theMenu.refreshDHTML();}}

var belowMenu = null;
var menuStart = 0;

