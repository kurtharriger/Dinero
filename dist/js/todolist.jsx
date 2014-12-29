
var DateDisplay = React.createClass({
  render:function(){
    return ( 
    <div className="dateDisplay">
      {this.props.date}
    </div>
    );
  }
});
var Item = React.createClass({
  getInitialState: function() {
    return {        
      owner:"/img/ownerImage.jpg",
      text:"default text",
      date:"1/2/2015"
    };
  },
  render: function() {
    return (
      <div className="item">
        <div className="gripper"></div>
        <label className="checkbox-label">
          <input type="checkbox"/>
          {this.state.text}
        </label>
        <img className="avatar" src={this.state.owner}/>
        <DateDisplay date={this.state.date}/>
      </div>
    );
  }
});


