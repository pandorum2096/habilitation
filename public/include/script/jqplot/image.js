$(document).ready(function(){
	$('div.jqplot-target').each(function(){
		var outerDiv = $(document.createElement('div'));
		var header = $(document.createElement('div'));
		var div = $(document.createElement('div'));

		outerDiv.append(header);
		outerDiv.append(div);

		outerDiv.addClass('jqplot-image-container');
		header.addClass('jqplot-image-container-header');
		div.addClass('jqplot-image-container-content');

		header.html('Cliquez droit pour sauver l\image.');

		var close = $(document.createElement('a'));
		close.addClass('jqplot-image-container-close');
		close.html('Fermer');
		close.attr('href', '#');
		close.click(function() {
			$(this).parents('div.jqplot-image-container').hide(500);
		})
		header.append(close);

		$(this).after(outerDiv);
		outerDiv.hide();

		outerDiv = header = div = close = null;

		if (!$.jqplot._noToImageButton) {
			var btn = $(document.createElement('button'));
			btn.text('L\'image du graphique');
			btn.addClass('jqplot-image-button');
			btn.bind('click', {chart: $(this)}, function(evt) {
				var imgelem = evt.data.chart.jqplotToImageElem();
				var div = $(this).nextAll('div.jqplot-image-container').first();
				div.children('div.jqplot-image-container-content').empty();
				div.children('div.jqplot-image-container-content').append(imgelem);
				div.show(500);
				div = null;
			});

			$(this).after(btn);
			btn.after('<br />');
			btn = null;
		}
	});
});