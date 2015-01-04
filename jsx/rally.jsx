//entry point into app
var TeamCheckList = {};
Rally.onReady(function(){
  $("link[href^='https://rally1']").remove();
  var rdm = new TeamCheckList.DataManager();
  Q.all([
    rdm.getStoryRecords(),
    rdm.getPortfolioItemRecords()
  ])
  .spread((stories,portfolioItems)=>{
    var lists = rdm.organizeStoryRecordsIntoLists(stories,portfolioItems);
    React.render(
      <Todo lists={lists} />,
      document.getElementById('rally')
    );
  })
  .fail((er)=>{
    console.error(er.stack);
  });
});

