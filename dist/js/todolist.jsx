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
          {data.text}
        </label>
        <img className="avatar" src={data.avatarUrl}/>
        <DateDisplay date={data.date}/>
      </div>
    );
  }
});

var List = React.createClass({
  render: function() {
    var items = _.map(this.props.items,function(item){
     return (
       <div>
        <Item data={item} /> 
       </div>
      );
    });
    return (
      <div className="list">
        <h3>{this.props.text}</h3>
        {items}  
      </div>
    );
  }
});

