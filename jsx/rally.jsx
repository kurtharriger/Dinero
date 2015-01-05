//entry point into app
var TeamCheckList = {};
Rally.onReady(function(){
  $("link[href^='https://rally1']").remove();
  var rdm = new TeamCheckList.DataManager(()=>{
    console.log(arguments);
  });
  var updateState = (id,field,value)=>{
    rdm.update(id,field,value);
  };
  rdm.getLists()
  .then((lists)=>{
    React.render(
      <Todo lists={lists} onStateChange={updateState} onItemAdd={rdm.addItem} />,
      document.getElementById('rally')
    );
  })
  .fail((er)=>{
    console.error(er.stack);
  });
});

