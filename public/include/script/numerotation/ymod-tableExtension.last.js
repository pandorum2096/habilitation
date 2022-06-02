YAHOO.namespace( 'YAHOO.ymod.tableExtension' );
YAHOO.ymod.tableExtension.setup = function( dataTable, contentCallback )
{
	dataTable.subscribe( 'rowClickEvent', YAHOO.ymod.tableExtension.selectRow, contentCallback );
};
YAHOO.ymod.tableExtension.selectRow = function( args, callback )
{
			this.onEventSelectRow.call( this, args );
};
