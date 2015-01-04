//entry point into app
var TeamCheckList = {};
Rally.onReady(function(){
  $("link[href^='https://rally1']").remove();
  var rdm = new TeamCheckList.DataManager(function(){
    console.log(arguments);
  });
  var updateState = function(id,field,value){
    rdm.update(id,field,value);
  };
  rdm.getLists()
  .then(function(lists){
    React.render(
      React.createElement(Todo, {lists: lists, onStateChange: updateState}),
      document.getElementById('rally')
    );
  })
  .fail(function(er){
    console.error(er.stack);
  });
});


TeamCheckList.DataManager = (function(){
  function DataManager(onStateChange) {"use strict";
    if(!_.isFunction(onStateChange)){
      throw new Error("onStateChange is required");
    }
    this.onStateChange = onStateChange;
    this.storyCache = {};
    this.portfolioItemCache = {};
  }
  DataManager.prototype.translateStoryToItem=function(story) {"use strict";
    var scheduleState = story.raw.ScheduleState;
    var complete = (scheduleState === "Completed") || (scheduleState === "Accepted");
    var archived = (scheduleState === "Accepted");
    return {
      id:story.raw.ObjectID,
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
        this.storyCache[story.data.ObjectID] = story;
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
        this.portfolioItemCache[portfolioItem.data.ObjectID] = portfolioItem;
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
      return this.translatePortfolioItemToList(portfolioItem,lists[portfolioItem.data.ObjectID]);
    }.bind(this));
  };
  DataManager.prototype.update=function(id,field,value){"use strict";
    if(this.storyCache[id]){
      this.updateStory(this.storyCache[id],field,value);
    }
  };
  DataManager.prototype.updateStory=function(record,field,value){"use strict";
    switch(field) {
      case "complete":
        record.set("ScheduleState",value?"Completed":"In-Progress");
        break;
      case "text":
        record.set("Name",value);
        break;
    }
    record.save();
    this.onStateChange(this.organizeStoryRecordsIntoLists(this.storyCache,this.portfolioItems));
  };
  DataManager.prototype.getLists=function() {"use strict";
    return Q.all([
      this.getStoryRecords(),
      this.getPortfolioItemRecords()
    ])
    .spread(function(stories,portfolioItems){
      var lists = this.organizeStoryRecordsIntoLists(stories,portfolioItems);
      return lists;
    }.bind(this));
  };
return DataManager;})();

