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
    avatarUrl: "/img/noavatar.png"
  },
  render: function() {
    var data = _.defaults(this.props.data,this.defaultProps);
    return (
      <div className="item row">
        <div className="icon icon-drag col-sm-1"></div>
        <label className="checkbox-label col-sm-7">
          <input type="checkbox" defaultChecked={data.complete}/>
          {data.text}
        </label>
        <div className="col-sm-4">
          <img className="avatar" src={data.avatarUrl}/>
          <DateDisplay date={data.date}/>
        </div>
      </div>
    );
  }
});

var List = React.createClass({
  render: function() {
    var unarchivedItemData = _.filter(this.props.items,function(item){return !item.archived;},this.props.items);
    var archivedItemData = _.filter(this.props.items,function(item){return item.archived;},this.props.items);
    var items = 
      _.map(unarchivedItemData,
        function(item){
         return (
           <div key={item.id} >
            <Item data={item} /> 
           </div>
           )
        }
    );
    var archivedItems = 
      _.map(archivedItemData,
        function(item){
         return (
           <div key={item.id} >
            <Item data={item} /> 
           </div>
           )
        }
    );
    var archivedCount = archivedItems.length?archivedItems.length:"";
    return (
      <div className="list margin-top" >
        <h3 className="text-info">{this.props.text}</h3>
        <div className="unarchived-items">
          {items}  
        </div>
        <div className="archived-items">
          <span className="archived-text">{archivedCount} Archived</span>
          {archivedItems}
        </div>
      </div>
    );
  }
});

