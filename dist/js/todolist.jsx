var DateDisplay = React.createClass({
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
    if(this.props.date){
      var dateString = this.calculateDateString(this.props.date);
      return ( 
      <div className="dateDisplay">
        {dateString}
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
      <div className="list margin-top text-info">
        <h3>{this.props.text}</h3>
        {items}  
      </div>
    );
  }
});

