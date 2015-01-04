var Item = React.createClass({
  defaultProps:{
    text: "",
    complete:false
  },
  onFieldUpdated:function(field,value){
    if(_.isFunction(this.props.onStateChange)){
      this.props.onStateChange(this.props.id,field,value);
    }
  },
  handleChecked:function(e){
    this.onFieldUpdated("complete",e.target.checked);
  },
  render: function() {
    var data = _.defaults(this.props.data,this.defaultProps);
    var hideAvatarClass = this.props.hideAvatars?"hidden":"";
    var avatarElement = data.avatarUrl?
      <img className={"avatar "+hideAvatarClass} src={data.avatarUrl}/>:
      <div className={"glyphicon glyphicon-user avatar "+hideAvatarClass} src={data.avatarUrl}/>;

    return (
      <div className="item row">
        <div className="icon icon-drag col-sm-1"></div>
        <label className="checkbox-label col-sm-2">
          <input type="checkbox" defaultChecked={data.complete} onChange={this.handleChecked}/>
        </label>
        <div className="col-sm-8 row">
          <div>
            <span className={"complete-"+data.complete}> {data.text} </span>
          </div>
          <div>
            {avatarElement}
            <DateDisplay hide={this.props.hideDates} date={data.date}/>
          </div>
        </div>
      </div>
    );
  }
});
