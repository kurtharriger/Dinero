//entry point into app
var TeamCheckList = {};
Rally.onReady(function(){
  $("link[href^='https://rally1']").remove();
  var rdm = new TeamCheckList.DataManager();
  rdm.getItems()
  .then((items)=>{
    console.log(items);
    React.render(
      <List items={items} text="My List" show="show"/>,
      document.getElementById('rally')
    );
  });
});
