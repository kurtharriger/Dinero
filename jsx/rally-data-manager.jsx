TeamCheckList.DataManager = class DataManager {
  constructor() {
    this.objectCache = {};
  }
  translateStoryToItem(story) {
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
  }
  translatePortfolioItemToList(portfolioItem,stories) {
    var items = this.getItemsFromStoryRecords(stories);
    return {  
      id:portfolioItem.get("ObjectID"),
      text:portfolioItem.get("Name"),
      archived:false,
      items:items
    };
  }
  getStoryRecords() {
    var deferred = Q.defer();
    Ext.create('Rally.data.wsapi.Store', {
      model: 'UserStory',
      fetch: ["PortfolioItem","Name","c_DueDate","Owner","Rank","ScheduleState","ObjectID"],
      order:"Rank",
    })
    .load()
    .then((stories)=>{
      _.each(stories,(story)=>{
        this.objectCache[story.data.ObjectID] = story;
      });
      deferred.resolve(stories);
    });
    return deferred.promise;
  }
  getPortfolioItemRecords() {
    var deferred = Q.defer();
    Ext.create('Rally.data.wsapi.Store', {
      model: "PortfolioItem",
      fetch: ["Name","Rank"],
      order:"Rank"
    })
    .load()
    .then((portfolioItems)=>{
      _.each(portfolioItems,(portfolioItem)=>{
        this.objectCache[portfolioItem.data.ObjectID] = portfolioItem;
      });
      deferred.resolve(portfolioItems);
    });
    return deferred.promise;
  }
  getItemsFromStoryRecords(stories) {
    return _.map(stories,(story)=>
    {
      return this.translateStoryToItem(story);
    });
  }
  organizeStoryRecordsIntoLists(stories,portfolioItems){
    var lists = _.groupBy(stories,(story)=>
    {
      return story.get("PortfolioItem").ObjectID;
    });
    return _.map(portfolioItems,(portfolioItem)=>{
      return this.translatePortfolioItemToList(portfolioItem,lists[portfolioItem.data.ObjectID])
    });
  }
};

