//entry point into app
var TeamCheckList = {};
Rally.onReady(function(){
  $("link[href^='https://rally1']").remove();
  var rdm = new TeamCheckList.DataManager();
  Q.all([
    rdm.getStoryRecords(),
    rdm.getPortfolioItemRecords()
  ])
  .spread(function(stories,portfolioItems){
    var lists = rdm.organizeStoryRecordsIntoLists(stories,portfolioItems);
    React.render(
      React.createElement(Todo, {lists: lists}),
      document.getElementById('rally')
    );
  })
  .fail(function(er){
    console.error(er.stack);
  });
});


TeamCheckList.DataManager = (function(){
  function DataManager() {"use strict";
    this.objectCache = {};
  }
  DataManager.prototype.translateStoryToItem=function(story) {"use strict";
    var scheduleState = story.raw.ScheduleState;
    var complete = (scheduleState === "Completed") || (scheduleState === "Accepted");
    var archived = (scheduleState === "Accepted");
    return {
      id:story.raw.ObjectId,
      text:story.raw.Name,
      date:story.raw.c_DueDate,
      complete:complete,
      archived:archived,
      record:story
    };
  };
  DataManager.prototype.translatePortfolioItemToList=function(portfolioItem,stories) {"use strict";
    var items = this.getItemsFromStoryRecords(stories);
    return {  
      id:portfolioItem.get("ObjectID"),
      text:portfolioItem.get("Name"),
      archived:false,
      items:items
    };
  };
  DataManager.prototype.getStoryRecords=function() {"use strict";
    var deferred = Q.defer();
    Ext.create('Rally.data.wsapi.Store', {
      model: 'UserStory',
      fetch: ["PortfolioItem","Name","c_DueDate","Owner","Rank","ScheduleState","ObjectID"],
      order:"Rank",
    })
    .load()
    .then(function(stories){
      _.each(stories,function(story){
        this.objectCache[story.data.ObjectID] = story;
      }.bind(this));
      deferred.resolve(stories);
    }.bind(this));
    return deferred.promise;
  };
  DataManager.prototype.getPortfolioItemRecords=function() {"use strict";
    var deferred = Q.defer();
    Ext.create('Rally.data.wsapi.Store', {
      model: "PortfolioItem",
      fetch: ["Name","Rank"],
      order:"Rank"
    })
    .load()
    .then(function(portfolioItems){
      _.each(portfolioItems,function(portfolioItem){
        this.objectCache[portfolioItem.data.ObjectID] = portfolioItem;
      }.bind(this));
      deferred.resolve(portfolioItems);
    }.bind(this));
    return deferred.promise;
  };
  DataManager.prototype.getItemsFromStoryRecords=function(stories) {"use strict";
    return _.map(stories,function(story)
    {
      return this.translateStoryToItem(story);
    }.bind(this));
  };
  DataManager.prototype.organizeStoryRecordsIntoLists=function(stories,portfolioItems){"use strict";
    var lists = _.groupBy(stories,function(story)
    {
      return story.get("PortfolioItem").ObjectID;
    });
    return _.map(portfolioItems,function(portfolioItem){
      return this.translatePortfolioItemToList(portfolioItem,lists[portfolioItem.data.ObjectID])
    }.bind(this));
  };
return DataManager;})();

