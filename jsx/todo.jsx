var Todo = React.createClass({  
  propTypes: {
    // onStateChange:React.PropTypes.funct,
    // onItemAdd:React.PropTypes.funct
  },
  getDefaultProps:function(){
    return {
      onStateChange:()=>{
        console.log("onStateChange Event Called");
      },
      onItemAdd:()=>{
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
    var lists = _.filter(l,(list)=>{return list.archived===value;});
    return _.map(
      lists,
      (list)=>{
      return (
        <div key={list.id}  className="row list-container">
          <List 
          text={list.text} 
          items={list.items} 
          hideAvatars={this.state.hideAvatars} 
          hideDates={this.state.hideDates} 
          onStateChange={this.props.onStateChange}
          onItemAdd={this.props.onItemAdd}
          />
        </div>
      );
    });
  },
  render: function() {
    var lists = this.filterToListComponentsByArchived(this.props.lists,false);
    var archivedLists = this.filterToListComponentsByArchived(this.props.lists,true);
    return (
      <div className="todo margin-top">
        <div>
          <div className="col-md-5">
            <h4>
              To Do
            </h4>
          </div>
          <div className="col-md-7">
            <h6 className="pull-left"> SHOW </h6>
            <div className="btn-group">
              <button className={"glyphicon glyphicon-user selected-" + this.state.hideAvatars} onClick={this.toggleShowAvatars}></button>
              <button className={"icon icon-calendar selected-" + this.state.hideDates} onClick={this.toggleShowDates}></button>
            </div>
          </div>
        </div>
        <div className="row">
          <button className="add-button">
            <span className="icon icon-add"></span> 
          </button>
          <span className="add-item-text">Add List</span>
        </div>
        <div className="row">
          {lists}
        </div>
        <div className="row panel-title">
          <h5><a data-toggle="collapse" href="#todo-archived">
            Archived Lists 
          </a></h5>
          <div id="todo-archived" className="collapse">
            {archivedLists}
          </div>
        </div>
      </div>
    );
  }
});
