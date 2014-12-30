var DateDisplay = React.createClass({
  render:function(){
    if(this.props.date){
      return ( 
      <div className="dateDisplay">
        {this.props.date}
      </div>
      )
    }
    else{   
      return ( 
        <div className="noDateDisplay">
        </div>
      )
    }
  }
});
var defaultProps ={
    text: "",
    avatarUrl: "/img/noavatar.png",
    date:null
};
var Item = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    var data = _.defaults(this.props.data,defaultProps);
    return (
      <div className="item">
        <div className="gripper"></div>
        <label className="checkbox-label">
          <input type="checkbox"/>
          {this.props.data.text}
        </label>
        <img className="avatar" src={this.props.data.avatarUrl}/>
        <DateDisplay date={this.props.data.date}/>
      </div>
    );
  }
});


