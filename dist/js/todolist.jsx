

var Item = React.createClass({
  getInitialState: function() {
    return {        
      owner:"/img/ownerImage.jpg",
      text:"default text"
    };
  },
  render: function() {
    return (
      <div className="item">
        <div className="gripper"></div>
        <label className="checkbox-label">
          <input type="checkbox"/>
        </label>
        <img className="avatar" src={this.state.owner}>
        </img>
      </div>
    );
  }
});


