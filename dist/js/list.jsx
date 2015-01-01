var List = React.createClass({
  numberToWords:function(number){
  },
  render: function() {
    var unarchivedItemData = _.filter(this.props.items,function(item){return !item.archived;});
    var archivedItemData = _.filter(this.props.items,function(item){return item.archived;});
    var items = 
      _.map(unarchivedItemData,
        (item)=>{
         return (
           <div key={item.id} >
            <Item data={item} /> 
           </div>
           )
        }
    );
    var archivedItems = 
      _.map(archivedItemData,
        (item)=>{
         return (
           <div key={item.id} >
            <Item data={item} /> 
           </div>
           )
        }
    );
    var archivedCount = archivedItems.length?archivedItems.length:"";
    var collapseRandomId = "collapse"+Math.floor(Math.random()*10000000);
    return (
      <div className="list margin-top" >
        <h3 className="text-info">{this.props.text}</h3>
        <div className="unarchived-items">
          {items}  
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h5 className="panel-title row">
              <a className="col-md-12" data-toggle="collapse" href={"#"+collapseRandomId}>
                {archivedCount} Archived
              </a>
            </h5>
          </div>
          <div id={collapseRandomId} className="panel-collapse collapse.in">
            <div className="panel-body">
              <div className="archived-items">
                {archivedItems}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="add-button">
            <span className="icon icon-add"></span> 
          </button>
          <span className="add-item-text">Add Item</span>
        </div>
      </div>
    );
  }
});
