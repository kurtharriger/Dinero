var Todo = React.createClass({
  getInitialProps:function(){
    return {};
  },
  getInitialState:function(){
    return {
      showAvatars:true,
      showDates:true
    };
  },
  toggleShowAvatars:function(){
    this.setState({
      showAvatars:!this.state.showAvatars 
    });
  },
  toggleShowDates:function(){
    this.setState({
      showDates:!this.state.showDates 
    });
  },
  render: function() {
    var lists = _.map(this.props.lists,
      (list)=>{
      return (
        <div key={list.id}  className="row list-container">
          <List text={list.text} items={list.items} showAvatars={this.state.showAvatars} showDates={this.state.showDates} />
        </div>
      );
    });
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
            <button className={"glyphicon glyphicon-user selected-" + !this.state.showAvatars} onClick={this.toggleShowAvatars}></button>
            <button className={"icon icon-calendar selected-" + !this.state.showDates} onClick={this.toggleShowDates}></button>
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
        <div className="row">
        2 Archived Lists
        </div>
      </div>
    );
  }
});
