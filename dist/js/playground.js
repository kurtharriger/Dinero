var listData = [
{
  id:1,
  avatarUrl:"img/ownerImage.jpg",
  text:"Due Jan 1",
  date:new Date(2015,0,1),
  complete:true
},
{
  id:2,
  text:"Archived Item",
  archived:true,
  complete:true
},
{
  id:5,
  text:"Not much info here"
},
{
  id:6,
  text:"Finished this forever ago. Back when I was young and cool",
  archived:true,
  date:new Date(2014,11,1),
  complete:true
}
];
React.render(
  React.createElement(List, {items: listData, text: "My List", show: "show"}),
  document.getElementById('list')
);

var listOneData = 
{
  id:2,
  text:"List One",
  archived:false,
  items:[
  {
    id:1,
    avatarUrl:"img/ownerImage.jpg",
    text:"Due Jan 1",
    date:new Date(2015,0,1),
    complete:true
  },
  {
    id:2,
    text:"Archived Item",
    archived:true,
    complete:true
  },
  {
    id:5,
    text:"Not much info here"
  },
  {
    id:6,
    text:"Finished this forever ago. Back when I was young and cool",
    archived:true,
    date:new Date(2014,11,1),
    complete:true
  }
  ]
};
var listTwoData = {
  id:1,
  text:"List Two",
  archived:true,
  items:[
  {
    id:1,
    avatarUrl:"img/ownerImage.jpg",
    text:"Due Jan 1",
    date:new Date(2015,0,1),
    complete:true
  },
  {
    id:2,
    text:"Archived Item",
    archived:true,
    complete:true
  },
  {
    id:5,
    text:"Not much info here"
  },
  {
    id:6,
    text:"Finished this forever ago. Back when I was young and cool",
    archived:true,
    date:new Date(2014,11,1),
    complete:true
  }
  ]
};
var listThreeData = {
  id:2,
  text:"List Three",
  archived:true,
  items:[
  {
    id:1,
    avatarUrl:"img/ownerImage.jpg",
    text:"Due Jan 1",
    date:new Date(2015,0,1),
    complete:true
  },
  {
    id:2,
    text:"Archived Item",
    archived:true,
    complete:true
  },
  {
    id:5,
    text:"Not much info here"
  },
  {
    id:6,
    text:"Finished this forever ago. Back when I was young and cool",
    archived:true,
    date:new Date(2014,11,1),
    complete:true
  }
  ]
};
React.render(
  React.createElement(Todo, {lists: [listOneData,listTwoData,listThreeData]}),
  document.getElementById('todo')
);


 var itemData={
  "Long Name":{
    id:-1,
    text:"Long Name   Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Dude"
  },
  "Avatar and Today":{        
    id:0,
    avatarUrl:"img/ownerImage.jpg",
    text:"Due Today",
    date:new Date(),
    complete:true
  },
  "Avatar and Date":{
    id:1,
    avatarUrl:"img/ownerImage.jpg",
    text:"Due Jan 1",
    date:new Date(2015,0,1)
  },
  "Far Date":{        
    id:2,
    date:new Date(2090,1,2),
    text:"I am due in the far future where apes rule the earth"
  },
  "Over Due":{
    id:3,
    date:new Date(2000,1,2),
    text:"Over Due Item"
  },
  "Avatar without Date":{        
    id:4,
    avatarUrl:"img/ownerImage.jpg",
    text:"My user has a pic"
  },
  "No Avatar and No Date":{
    id:5,
    text:"Not much info here"
  },
  "Archived":{
    id:6,
    text:"Finished this forever ago. Back when I was young and cool",
    archived:true,
    date:new Date(2014,11,1),
    complete:true
  }
};

var DemoItems = React.createClass({displayName: "DemoItems",
  getInitialState:function(){
    return itemData;
  },
  itemUpdated:function(field,value,componentProps){
    var item = itemData[componentProps.key];
    item[field] = value;
    this.setState(itemData);
  },
  render: function() {
    var items = _.map(
      this.state,
      function(item,key){
        item.key = key;
        return (
          React.createElement("div", {key: key}, 
            React.createElement("h5", {className: "margin-top text-info clear"}, key), 
            React.createElement(Item, {text: item.text, date: item.date, archived: item.archived, complete: item.complete, id: item.id, onFieldUpdated: this.itemUpdated}), 
            React.createElement("br", null)
          )
          );
      }.bind(this));
    return (
      React.createElement("div", {className: "container-fluid"}, 
        items
      )
      );            
  }
});

React.render(
  React.createElement(DemoItems, null),
  document.getElementById('item')
);
