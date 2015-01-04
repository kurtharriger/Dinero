var data = {
  id:2,
  text:"List One",
  archived:false,
  items:[]
};

Rally.onReady(function(){
  function translateStoryToItem(story){
    var scheduleState = story.raw.ScheduleState;
    var complete = (scheduleState === "Completed") || (scheduleState === "Accepted");
    var archived = (scheduleState === "Accepted");
    return {
      id:story.raw._ref,
      text:story.raw.Name,
      date:story.get("c_DueDate"),
      complete:complete,
      archived:archived
    };
  }
  Ext.create('Rally.data.wsapi.Store', {
      model: 'UserStory',
      fetch: ["PortfolioItem","Name","c_DueDate","Owner","Rank","ScheduleState"],
      order:"Rank",
      autoLoad: true,
      listeners: {
        load: (store,records)=>{
          var items = _.map(records,(record)=>
          {
            return translateStoryToItem(record);
          });
          data.items = items;
          React.render(
            React.createElement(List, {items: data.items, text: data.text, show: "show"}),
            document.getElementById('rally')
          );
        }
      }
  });    
});
