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
    if(this.props.hide){
      return <span className="date-display"></span>
    }
    if(this.props.date){
      var dateString = this.calculateDateString(this.props.date);
    }
    else{
      var nodateclass = "icon icon-calendar";
    }
    return ( 
      <span className="date-display">
        <div className={nodateclass}></div>
        {dateString}
      </span>
    );
  }
});

var Item = React.createClass({
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
      var avatarElement = <img className={"avatar "+hideAvatarClass} src={data.avatarUrl}/>;
    else
      var avatarElement = <div className={"glyphicon glyphicon-user avatar "+hideAvatarClass} src={data.avatarUrl}/>;

    return (
      <div className="item row">
        <div className="icon icon-drag col-sm-1"></div>
        <label className="checkbox-label col-sm-7">
          <input type="checkbox" defaultChecked={data.complete} onChange={this.handleChecked}/>
          <span className={"complete-"+data.complete}> {data.text} </span>
        </label>
        <div className="col-sm-4">
        {avatarElement}
          <DateDisplay hide={this.props.hideDates} date={data.date}/>
        </div>
      </div>
    );
  }
});
