var List = React.createClass({
  toggleShow:function(){
    var show = this.state.show === "show" ? false : "show";
    this.setState({
      show:show
    });
  },
  getDefaultProps:function(){
    return {
      show:false,
      onStateChange:()=>{}
    };
  },
  getInitialState:function(){
    return {
      newItem:false
    };
  },
  createItem:function(item){
    return  (
      <div key={item.id} >
        <Item 
        text={item.text} 
        date={item.date} 
        archived={item.archived} 
        complete={item.complete} 
        id={item.id}
        hideAvatars={this.props.hideAvatars}
        onStateChange={this.props.onStateChange} 
        hideDates={this.props.hideDates}         
        />
      </div>
    );
  },
  createNewItem:function(){
    return (
      <div>
        <Item 
        text="" 
        id={0}
        hideAvatars={this.props.hideAvatars}
        onStateChange={this.handleNewItemChange} 
        hideDates={this.props.hideDates}         
        />
      </div>);
  },
  render: function() {
    var collapse = this.state.show?"collapse.in":"collapse";
    var topIcon = this.state.show?"icon icon-arrow-down":"icon icon-arrow-up";
    var bottomIcon = this.state.show?"icon icon-arrow-up":"icon icon-arrow-down";

    var unarchivedItemData = _.filter(this.props.items,(item)=>{return !item.archived;});
    var archivedItemData = _.filter(this.props.items,(item)=>{return item.archived;});
    var items =  _.map(unarchivedItemData,this.createItem);
    var archivedItems = _.map(archivedItemData,this.createItem); 
    var newItem = this.state.newItem? this.createNewItem():"";

    var archivedCount = archivedItems.length?archivedItems.length:"";
    //TODO: use an incrementer to avoid the uncommon times where these collide
    var collapseRandomId1 = "collapse-"+Math.floor(Math.random()*100000);
    var collapseRandomId2 = "list-content-"+Math.floor(Math.random()*100000);

    return (
      <div className="list margin-top" >
        <div className="row">
          <h4 className="text-info col-sm-8">{this.props.text}</h4>
          <a className="col-sm-2" href="#" onClick={this.toggleShow}>
            <div className={topIcon}></div>
            <div className={bottomIcon}></div>
          </a>
        </div>
        <div id={collapseRandomId2} className={collapse}>
        <div className="unarchived-items">
          {items}  
          {newItem}
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h5 className="panel-title row">
              <a className="col-md-12" data-toggle="collapse" href={"#"+collapseRandomId1}>
                {archivedCount} Archived
              </a>
            </h5>
          </div>
          <div id={collapseRandomId1} className="panel-collapse collapse">
            <div className="panel-body">
              <div className="archived-items">
                {archivedItems}
              </div>
            </div>
          </div>
        </div>
        <div className="margin-bottom">
          <button className="add-button" onClick={this.handleNewClick}>
            <span className="icon icon-add"></span> 
          </button>
          <span className="add-item-text">Add Item</span>
        </div>
        </div> 
      </div>
    );
  },
  handleNewClick:function(){
    this.setState({newItem:true});
  },
  handleNewItemChange:function(){
    this.props.onItemAdd()
    .then(()=>{console.log(arguments);});
  }
});
