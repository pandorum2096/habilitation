YUI.add('pos-yui-utils',  function(Y) {
	
	var PosYUIUtils = function() {
		PosYUIUtils.superclass.constructor.apply(this, arguments);		
	};
	PosYUIUtils.NAME = 'pos-yui-utils';
	Y.extend(PosYUIUtils, Y.Base);
	Y.PosYUIUtils = new PosYUIUtils();

	PosYUIUtils.prototype.getXmlHttpRequestObject = function() {
		if(window.XMLHttpRequest) {
			return new XMLHttpRequest();
		} else if(window.ActiveXObject) {
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	};

	PosYUIUtils.prototype.loadXMLString = function(xmlString) {
		/*
		try {
			var xmlData = Y.DataType.XML.parse(xmlString);
			return xmlData;
		} catch(e) {
			Y.log ('exception ' + e);
			alert(e.message)
		}
        */
        if (window.ActiveXObject) {
            var xmlData = new ActiveXObject('Microsoft.XMLDOM');
            xmlData.async = 'false';
            xmlData.loadXML(xmlString);
        } else {
            var parser = new DOMParser();
            var xmlData = parser.parseFromString(xmlString, 'text/xml');
        }
        return xmlData;
	};
}, '0.0.1', {requires: ['node', 'datatype-xml']});


