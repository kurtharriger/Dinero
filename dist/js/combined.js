var DateDisplay = React.createClass({displayName: "DateDisplay",
  calculateDateString:function(date){
    //TODO: this needs unit tests
    if(moment(date).isSame(new Date(), 'day')){
      return "Today"; 
    }
    if(moment(date).isSame(new Date(), 'year')){
      return moment(this.props.date).format("MMM DD"); 
    }
    var threeMonthsFromNow = moment(new Date()).add(3, 'months');
    var threeMonthsAgo = moment(new Date()).subtract(3, 'months');
    if(moment(date).isBefore(threeMonthsFromNow) && moment(date).isAfter(threeMonthsAgo)){
      return moment(this.props.date).format("MMM DD"); 
    }
    return moment(this.props.date).format("MMM DD, YYYY"); 
  },

  render:function(){
    if(this.props.hide){
      return React.createElement("span", {className: "date-display"})
    }
    if(this.props.date){
      var dateString = this.calculateDateString(this.props.date);
    }
    else{
      var nodateclass = "icon icon-calendar";
    }
    return ( 
      React.createElement("span", {className: "date-display"}, 
        React.createElement("div", {className: nodateclass}), 
        dateString
      )
    );
  }
});

var Item = React.createClass({displayName: "Item",
  defaultProps:{
    text: "",
    complete:false
  },
  onFieldUpdated:function(field,value){
    if(_.isFunction(this.props.onFieldUpdated)){
      this.props.onFieldUpdated(field,value,this.props);
    }
  },
  handleChecked:function(e){
    this.onFieldUpdated("complete",e.target.checked);
  },
  render: function() {
    var data = _.defaults(this.props.data,this.defaultProps);
    var hideAvatarClass = this.props.hideAvatars?"hidden":"";
    if(data.avatarUrl)
      var avatarElement = React.createElement("img", {className: "avatar "+hideAvatarClass, src: data.avatarUrl});
    else
      var avatarElement = React.createElement("div", {className: "glyphicon glyphicon-user avatar "+hideAvatarClass, src: data.avatarUrl});

    return (
      React.createElement("div", {className: "item row"}, 
        React.createElement("div", {className: "icon icon-drag col-sm-1"}), 
        React.createElement("label", {className: "checkbox-label col-sm-7"}, 
          React.createElement("input", {type: "checkbox", defaultChecked: data.complete, onChange: this.handleChecked}), 
          React.createElement("span", {className: "complete-"+data.complete}, " ", data.text, " ")
        ), 
        React.createElement("div", {className: "col-sm-4"}, 
        avatarElement, 
          React.createElement(DateDisplay, {hide: this.props.hideDates, date: data.date})
        )
      )
    );
  }
});

var Todo = React.createClass({displayName: "Todo",
  getInitialProps:function(){
    return {};
  },
  getInitialState:function(){
    return {
      hideAvatars:false,
      hideDates:false
    };
  },
  toggleShowAvatars:function(){
    this.setState({
      hideAvatars:!this.state.hideAvatars 
    });
  },
  toggleShowDates:function(){
    this.setState({
      hideDates:!this.state.hideDates 
    });
  },
  filterToListComponentsByArchived:function(l,value){
    var lists = _.filter(l,function(list){return list.archived===value});
    return _.map(
      lists,
      function(list){
      return (
        React.createElement("div", {key: list.id, className: "row list-container"}, 
          React.createElement(List, {text: list.text, items: list.items, hideAvatars: this.state.hideAvatars, hideDates: this.state.hideDates})
        )
      );
    }.bind(this));
  },
  render: function() {
    var lists = this.filterToListComponentsByArchived(this.props.lists,false);
    var archivedLists = this.filterToListComponentsByArchived(this.props.lists,true);
    return (
      React.createElement("div", {className: "todo margin-top"}, 
        React.createElement("div", null, 
          React.createElement("div", {className: "col-md-5"}, 
            React.createElement("h4", null, 
              "To Do"
            )
          ), 
          React.createElement("div", {className: "col-md-7"}, 
            React.createElement("h6", {className: "pull-left"}, " SHOW "), 
            React.createElement("div", {className: "btn-group"}, 
              React.createElement("button", {className: "glyphicon glyphicon-user selected-" + this.state.hideAvatars, onClick: this.toggleShowAvatars}), 
              React.createElement("button", {className: "icon icon-calendar selected-" + this.state.hideDates, onClick: this.toggleShowDates})
            )
          )
        ), 
        React.createElement("div", {className: "row"}, 
          React.createElement("button", {className: "add-button"}, 
            React.createElement("span", {className: "icon icon-add"})
          ), 
          React.createElement("span", {className: "add-item-text"}, "Add List")
        ), 
        React.createElement("div", {className: "row"}, 
          lists
        ), 
        React.createElement("div", {className: "row panel-title"}, 
          React.createElement("h5", null, React.createElement("a", {"data-toggle": "collapse", href: "#todo-archived"}, 
            "2 Archived Lists" 
          )), 
          React.createElement("div", {id: "todo-archived", className: "collapse"}, 
            archivedLists
          )
        )
      )
    );
  }
});

var List = React.createClass({displayName: "List",
  toggleShow:function(){
    var show = this.state.show === "show" ? false : "show";
    this.setState({
      show:show
    });
  },
  getInitialProps:function(){
    return {
      show:false
    };
  },
  getInitialState:function(){
    return {};
  },

  render: function() {
    if(!this.state.hasOwnProperty("show")){
      this.state.show = this.props.show;
    }
    var collapse = this.state.show?"collapse.in":"collapse";
    var topIcon = this.state.show?"icon icon-arrow-down":"icon icon-arrow-up";
    var bottomIcon = this.state.show?"icon icon-arrow-up":"icon icon-arrow-down";

    var unarchivedItemData = _.filter(this.props.items,function(item){return !item.archived;});
    var archivedItemData = _.filter(this.props.items,function(item){return item.archived;});
    var items = 
      _.map(unarchivedItemData,
        function(item){
         var itemComponent = (
           React.createElement("div", {key: item.id}, 
            React.createElement(Item, {data: item, hideAvatars: this.props.hideAvatars, hideDates: this.props.hideDates})
           )
           );
         return itemComponent;
        }.bind(this)
    );
    var archivedItems = 
      _.map(archivedItemData,
        function(item){
         return (
           React.createElement("div", {key: item.id}, 
            React.createElement(Item, {data: item})
           )
           )
        }
    );
    var archivedCount = archivedItems.length?archivedItems.length:"";
    //TODO: use an incrementer to avoid the uncommon times where these collide
    var collapseRandomId1 = "collapse-"+Math.floor(Math.random()*100000);
    var collapseRandomId2 = "list-content-"+Math.floor(Math.random()*100000);

    return (
      React.createElement("div", {className: "list margin-top"}, 
        React.createElement("div", {className: "row"}, 
          React.createElement("h4", {className: "text-info col-sm-8"}, this.props.text), 
          React.createElement("a", {className: "col-sm-2", href: "#"+collapseRandomId2, onClick: this.toggleShow}, 
            React.createElement("div", {className: topIcon}), 
            React.createElement("div", {className: bottomIcon})
          )
        ), 
        React.createElement("div", {id: collapseRandomId2, className: collapse}, 
        React.createElement("div", {className: "unarchived-items"}, 
          items
        ), 
        React.createElement("div", {className: "panel panel-default"}, 
          React.createElement("div", {className: "panel-heading"}, 
            React.createElement("h5", {className: "panel-title row"}, 
              React.createElement("a", {className: "col-md-12", "data-toggle": "collapse", href: "#"+collapseRandomId1}, 
                archivedCount, " Archived"
              )
            )
          ), 
          React.createElement("div", {id: collapseRandomId1, className: "panel-collapse collapse"}, 
            React.createElement("div", {className: "panel-body"}, 
              React.createElement("div", {className: "archived-items"}, 
                archivedItems
              )
            )
          )
        ), 
        React.createElement("div", {className: "margin-bottom"}, 
          React.createElement("button", {className: "add-button"}, 
            React.createElement("span", {className: "icon icon-add"})
          ), 
          React.createElement("span", {className: "add-item-text"}, "Add Item")
        )
        )
      )
    );
  }
});

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
}
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
            React.createElement(Item, {data: item, onFieldUpdated: this.itemUpdated}), 
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
);;

