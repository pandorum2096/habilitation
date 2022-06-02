
YAHOO.namespace( 'YAHOO.ymod.tableExtension' );
YAHOO.ymod.tableExtension.setup = function( dataTable, contentCallback )
{
	dataTable.subscribe( 'headerRowMousedownEvent', YAHOO.ymod.tableExtension.cleanUp );
	dataTable.subscribe( 'rowClickEvent', YAHOO.ymod.tableExtension.selectRow, contentCallback );
};
YAHOO.ymod.tableExtension.selectRow = function( args, callback )
{
// 	if( this.get( 'selectionMode' ) == 'single' )
// 	{
		YAHOO.ymod.tableExtension.collapseAll.call( this );
// 		if( YAHOO.util.Dom.hasClass( args.target, 'yui-dt-selected' ) )
// 			this.unselectAllRows();
// 		else
			this.onEventSelectRow.call( this, args );

		YAHOO.ymod.tableExtension.clickAndExpand.call( this, args[ 'event' ], callback );
//	}
};
YAHOO.ymod.tableExtension.clickAndExpand = function( e, content )
{
	var selectedRows = this.getSelectedTrEls();
	if( selectedRows.length > 0 )
	{
		if( YAHOO.util.Dom.hasClass( selectedRows[ 0 ], 'ymod-expandedData' ) )
		{
			YAHOO.util.Dom.removeClass( selectedRows[ 0 ].previousSibling, 'ymod-expanded' );
			selectedRows[ 0 ].parentNode.removeChild( selectedRows[ 0 ] );
		} else if( !YAHOO.util.Dom.hasClass( selectedRows[ 0 ], 'ymod-expanded' ) ) {

			if( content != null && YAHOO.lang.isFunction( content ) )
			{
				content.call( this);
			} else {
				throw new Error( 'A function is needed for the content callback in ymod.datatable expandable.' );
			}

			if( YAHOO.util.Dom.hasClass( selectedRows[ 0 ], 'yui-dt-odd' ) ) YAHOO.util.Dom.addClass( newRow, 'yui-dt-odd' );
			else if( YAHOO.util.Dom.hasClass( selectedRows[ 0 ], 'yui-dt-even' ) ) YAHOO.util.Dom.addClass( newRow, 'yui-dt-even' );
			YAHOO.util.Dom.addClass( selectedRows[ 0 ], 'ymod-expanded' );

			if( selectedRows[ 0 ].nextSibling != null )
				selectedRows[ 0 ].parentNode.insertBefore( newRow, selectedRows[ 0 ].nextSibling );
			else 
				selectedRows[ 0 ].parentNode.appendChild( newRow );
 

			YAHOO.util.Event.stopEvent( e );
			return;
		} else {
			selectedRows[ 0 ].parentNode.removeChild( selectedRows[ 0 ].nextSibling );
			YAHOO.util.Dom.removeClass( selectedRows[ 0 ], 'ymod-expanded' );
			YAHOO.util.Event.stopEvent( e );
		}
	}
};

// pass in the expanded content, NOT the parent row.
YAHOO.ymod.tableExtension.collapseRow = function( row )
{
	YAHOO.util.Dom.removeClass( row.previousSibling, 'ymod-expanded' );
	row.parentNode.removeChild( row );
};

YAHOO.ymod.tableExtension.cleanUp = function( args )
{
// 	if( this.get( 'selectionMode' ) == 'single' )
// 	{
		YAHOO.ymod.tableExtension.collapseAll.call( this );
		this.unselectAllRows();
// 	}
};

//scope must be the datatable object
YAHOO.ymod.tableExtension.collapseAll = function()
{
	var nodes = YAHOO.util.Dom.getElementsByClassName( 'ymod-expanded', 'tr', this._elTable );
	for( var j = 0, t = nodes.length; j < t; j++ )
	{
		nodes[ j ].parentNode.removeChild( nodes[ j ].nextSibling );
		YAHOO.util.Dom.removeClass( nodes[ j ], 'ymod-expanded' );
	}
};
