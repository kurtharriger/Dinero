TeamCheckList.DataManager = class DataManager {
  constructor(onStateChange) {
    if(!_.isFunction(onStateChange)){
      throw new Error("onStateChange is required");
    }
    this.onStateChange = onStateChange;
    this.storyCache = {};
    this.portfolioItemCache = {};
  }
  translateStoryToItem(story) {
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
        this.storyCache[story.data.ObjectID] = story;
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
        this.portfolioItemCache[portfolioItem.data.ObjectID] = portfolioItem;
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
      return this.translatePortfolioItemToList(portfolioItem,lists[portfolioItem.data.ObjectID]);
    });
  }
  update(id,field,value){
    if(this.storyCache[id]){
      this.updateStory(this.storyCache[id],field,value);
    }
  }
  updateStory(record,field,value){
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
  }
  getLists() {
    return Q.all([
      this.getStoryRecords(),
      this.getPortfolioItemRecords()
    ])
    .spread((stories,portfolioItems)=>{
      var lists = this.organizeStoryRecordsIntoLists(stories,portfolioItems);
      return lists;
    });
  }
  addItem(item){
    console.log(item);
    return Q("w00t");
  }
};

