var Item = React.createClass({
  propTypes: {
    text:React.PropTypes.string.isRequired,
    avatarUrl:React.PropTypes.string,
    hideDates:React.PropTypes.bool,
    hideAvatars:React.PropTypes.bool,
    complete:React.PropTypes.bool,
    archived:React.PropTypes.bool
  },
  getInitialState:function(){
    return {text: this.props.text };
  },
  getDefaultProps:function(){
    return { 
      onStateChange:()=>{},
      complete:false,
      archived:false
    };
  },
  onFieldUpdated:function(field,value){
    this.props.onStateChange(this.props.id,field,value);
  },
  handleChecked:function(e){
    this.onFieldUpdated("complete",e.target.checked);
  },
  handleTextChange:function(e){
    this.setState({ text: e.target.value });
  },
  handleTextBlur:function(e){
    this.onFieldUpdated("text",this.state.text);
  },
  render: function() {
    var hideAvatarClass = this.props.hideAvatars?"hidden":"";
    var props = this.props;
    var avatarElement = this.props.avatarUrl?
      <img className={"avatar "+hideAvatarClass} src={props.avatarUrl}/>:
      <div className={"glyphicon glyphicon-user avatar "+hideAvatarClass} src={props.avatarUrl}/>;

    return (
      <div className="item row">
        <div className="icon icon-drag col-sm-1"></div>
        <label className="checkbox-label col-sm-1">
          <input type="checkbox" defaultChecked={props.complete} onChange={this.handleChecked}/>
        </label>
        <div className="col-sm-10 row">
          <div>
            <input className={"text complete-"+props.complete} 
              value={this.state.text} 
              placeholder="New Item" 
              onChange={this.handleTextChange} 
              onBlur={this.handleTextBlur}>
            </input>
          </div>
          <div>
            {avatarElement}
            <DateDisplay hide={this.props.hideDates} date={props.date}/>
          </div>
        </div>
      </div>
    );
  }
});
