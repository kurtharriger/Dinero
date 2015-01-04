TeamCheckList.DataManager = class DataManager {
  constructor() {
  }
  translateStoryToItem(story) {
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
  getStoryRecords() {
    return Ext.create('Rally.data.wsapi.Store', {
      model: 'UserStory',
      fetch: ["PortfolioItem","Name","c_DueDate","Owner","Rank","ScheduleState"],
      order:"Rank",
    })
    .load();  
  }
  getItems() {
    var deferred = Q.defer();
    this.getStoryRecords()
    .then((records)=>{
      var items = _.map(records,(record)=>
      {
        return this.translateStoryToItem(record);
      });
      deferred.resolve(items);
    });

    return deferred.promise;
  }
};

