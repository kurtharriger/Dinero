var Item = React.createClass({displayName: "Item",
  propTypes: {
    text:React.PropTypes.string.isRequired,
    avatarUrl:React.PropTypes.string,
    hideDates:React.PropTypes.bool,
    hideAvatars:React.PropTypes.bool,
    complete:React.PropTypes.bool,
    archived:React.PropTypes.bool
  },
  getInitialState:function(){
    return {text: this.props.text };
  },
  getDefaultProps:function(){
    return { 
      onStateChange:function(){},
      complete:false,
      archived:false
    };
  },
  onFieldUpdated:function(field,value){
    this.props.onStateChange(this.props.id,field,value);
  },
  handleChecked:function(e){
    this.onFieldUpdated("complete",e.target.checked);
  },
  handleTextChange:function(e){
    this.setState({ text: e.target.value });
  },
  handleTextBlur:function(e){
    this.onFieldUpdated("text",this.state.text);
  },
  render: function() {
    var hideAvatarClass = this.props.hideAvatars?"hidden":"";
    var props = this.props;
    var avatarElement = this.props.avatarUrl?
      React.createElement("img", {className: "avatar "+hideAvatarClass, src: props.avatarUrl}):
      React.createElement("div", {className: "glyphicon glyphicon-user avatar "+hideAvatarClass, src: props.avatarUrl});

    return (
      React.createElement("div", {className: "item row"}, 
        React.createElement("div", {className: "icon icon-drag col-sm-1"}), 
        React.createElement("label", {className: "checkbox-label col-sm-1"}, 
          React.createElement("input", {type: "checkbox", defaultChecked: props.complete, onChange: this.handleChecked})
        ), 
        React.createElement("div", {className: "col-sm-10 row"}, 
          React.createElement("div", null, 
            React.createElement("input", {className: "text complete-"+props.complete, 
              value: this.state.text, 
              placeholder: "New Item", 
              onChange: this.handleTextChange, 
              onBlur: this.handleTextBlur}
            )
          ), 
          React.createElement("div", null, 
            avatarElement, 
            React.createElement(DateDisplay, {hide: this.props.hideDates, date: props.date})
          )
        )
      )
    );
  }
});

var Todo = React.createClass({displayName: "Todo",  
  propTypes: {
    // onStateChange:React.PropTypes.funct,
    // onItemAdd:React.PropTypes.funct
  },
  getDefaultProps:function(){
    return {
      onStateChange:function(){
        console.log("onStateChange Event Called");
      },
      onItemAdd:function(){
        console.log("onItemAdd Event Called");
      }
    };
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
    var lists = _.filter(l,function(list){return list.archived===value;});
    return _.map(
      lists,
      function(list){
      return (
        React.createElement("div", {key: list.id, className: "row list-container"}, 
          React.createElement(List, {
          text: list.text, 
          items: list.items, 
          hideAvatars: this.state.hideAvatars, 
          hideDates: this.state.hideDates, 
          onStateChange: this.props.onStateChange, 
          onItemAdd: this.props.onItemAdd}
          )
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
            "Archived Lists" 
          )), 
          React.createElement("div", {id: "todo-archived", className: "collapse"}, 
            archivedLists
          )
        )
      )
    );
  }
});

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
      return React.createElement("span", {className: "date-display"});
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

var List = React.createClass({displayName: "List",
  toggleShow:function(){
    var show = this.state.show === "show" ? false : "show";
    this.setState({
      show:show
    });
  },
  getDefaultProps:function(){
    return {
      show:false,
      onStateChange:function(){}
    };
  },
  getInitialState:function(){
    return {
      newItem:false
    };
  },
  createItem:function(item){
    return  (
      React.createElement("div", {key: item.id}, 
        React.createElement(Item, {
        text: item.text, 
        date: item.date, 
        archived: item.archived, 
        complete: item.complete, 
        id: item.id, 
        hideAvatars: this.props.hideAvatars, 
        onStateChange: this.props.onStateChange, 
        hideDates: this.props.hideDates}
        )
      )
    );
  },
  createNewItem:function(){
    return (
      React.createElement("div", null, 
        React.createElement(Item, {
        text: "", 
        id: 0, 
        hideAvatars: this.props.hideAvatars, 
        onStateChange: this.handleNewItemChange, 
        hideDates: this.props.hideDates}
        )
      ));
  },
  render: function() {
    var collapse = this.state.show?"collapse.in":"collapse";
    var topIcon = this.state.show?"icon icon-arrow-down":"icon icon-arrow-up";
    var bottomIcon = this.state.show?"icon icon-arrow-up":"icon icon-arrow-down";

    var unarchivedItemData = _.filter(this.props.items,function(item){return !item.archived;});
    var archivedItemData = _.filter(this.props.items,function(item){return item.archived;});
    var items =  _.map(unarchivedItemData,this.createItem);
    var archivedItems = _.map(archivedItemData,this.createItem); 
    var newItem = this.state.newItem? this.createNewItem():"";

    var archivedCount = archivedItems.length?archivedItems.length:"";
    //TODO: use an incrementer to avoid the uncommon times where these collide
    var collapseRandomId1 = "collapse-"+Math.floor(Math.random()*100000);
    var collapseRandomId2 = "list-content-"+Math.floor(Math.random()*100000);

    return (
      React.createElement("div", {className: "list margin-top"}, 
        React.createElement("div", {className: "row"}, 
          React.createElement("h4", {className: "text-info col-sm-8"}, this.props.text), 
          React.createElement("a", {className: "col-sm-2", href: "#", onClick: this.toggleShow}, 
            React.createElement("div", {className: topIcon}), 
            React.createElement("div", {className: bottomIcon})
          )
        ), 
        React.createElement("div", {id: collapseRandomId2, className: collapse}, 
        React.createElement("div", {className: "unarchived-items"}, 
          items, 
          newItem
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
          React.createElement("button", {className: "add-button", onClick: this.handleNewClick}, 
            React.createElement("span", {className: "icon icon-add"})
          ), 
          React.createElement("span", {className: "add-item-text"}, "Add Item")
        )
        )
      )
    );
  },
  handleNewClick:function(){
    this.setState({newItem:true});
  },
  handleNewItemChange:function(){
    this.props.onItemAdd()
    .then(function(){console.log(arguments);});
  }
});
