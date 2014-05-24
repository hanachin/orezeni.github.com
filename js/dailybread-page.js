yepnope({
  load: [
    // 'http://wheredoesmymoneygo.org/wp-content/themes/wdmmg/wdmmg.css',
    'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.6/themes/ui-lightness/jquery-ui.css',
    'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js',
    '/js/libs/base64.js',
    '/js/libs/underscore.js',
    '/js/libs/raphael-min.js',
    '/js/aggregator.js',
    '/css/dailybread.css',
    '/js/setting.js?20120707',
    '/js/dailybread.js?20120707'
  ],
  complete: function() {
    (function ($) {
      $(function () {
        $('#preloader .txt').html('loading data');
        var db = new OpenSpending.DailyBread($('#dailybread'));
        new OpenSpending.Aggregator({
          apiUrl: 'http://openspending.org/api',
          //localApiCache: 'aggregate.json',
          dataset: OpenSpending.identifier,
          drilldowns: ['Category', 'Subcategory'],
          cuts: ['year:' + OpenSpending.year],
          rootNodeLabel: 'Total',
          breakdown: 'Subcategory',
          callback: function(data) {
            $('#content-wrap').show();
            $('#preloader').remove();
            db.setDataFromAggregator(data, ['unknown']);
            db.setIconLookup(function(name) {
              var style = OpenSpending.Styles.Cofog[name];
              if (style != undefined) {
                return style['icon'];
              }
              return 'icons/unknown.svg';
            });
            db.draw();
          }
        });
        OpenSpending.renderDependentTypes(db);
      });
    })(jQuery)
  }
});
