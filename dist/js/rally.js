//entry point into app
var TeamCheckList = {};
Rally.onReady(function(){
  $("link[href^='https://rally1']").remove();
  var rdm = new TeamCheckList.DataManager();
  rdm.getItems()
  .then(function(items){
    console.log(items);
    React.render(
      React.createElement(List, {items: items, text: "My List", show: "show"}),
      document.getElementById('rally')
    );
  });
});

TeamCheckList.DataManager = (function(){
  function DataManager() {"use strict";
  }
  DataManager.prototype.translateStoryToItem=function(story) {"use strict";
    var scheduleState = story.raw.ScheduleState;
    var complete = (scheduleState === "Completed") || (scheduleState === "Accepted");
    var archived = (scheduleState === "Accepted");
    return {
      id:story.raw.$DataManager_ref,
      text:story.raw.Name,
      date:story.get("c_DueDate"),
      complete:complete,
      archived:archived
    };
  };
  DataManager.prototype.getStoryRecords=function() {"use strict";
    return Ext.create('Rally.data.wsapi.Store', {
      model: 'UserStory',
      fetch: ["PortfolioItem","Name","c_DueDate","Owner","Rank","ScheduleState"],
      order:"Rank",
    })
    .load();  
  };
  DataManager.prototype.getItems=function() {"use strict";
    var deferred = Q.defer();
    this.getStoryRecords()
    .then(function(records){
      var items = _.map(records,function(record)
      {
        return this.translateStoryToItem(record);
      }.bind(this));
      deferred.resolve(items);
    }.bind(this));

    return deferred.promise;
  };
return DataManager;})();

