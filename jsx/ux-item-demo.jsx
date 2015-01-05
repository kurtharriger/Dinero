 var itemData={
  "Long Name":{
    id:-1,
    text:"Long Name   Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Dude"
  },
  "Avatar and Today":{        
    id:0,
    avatarUrl:"img/ownerImage.jpg",
    text:"Due Today",
    date:new Date(),
    complete:true
  },
  "Avatar and Date":{
    id:1,
    avatarUrl:"img/ownerImage.jpg",
    text:"Due Jan 1",
    date:new Date(2015,0,1)
  },
  "Far Date":{        
    id:2,
    date:new Date(2090,1,2),
    text:"I am due in the far future where apes rule the earth"
  },
  "Over Due":{
    id:3,
    date:new Date(2000,1,2),
    text:"Over Due Item"
  },
  "Avatar without Date":{        
    id:4,
    avatarUrl:"img/ownerImage.jpg",
    text:"My user has a pic"
  },
  "No Avatar and No Date":{
    id:5,
    text:"Not much info here"
  },
  "Archived":{
    id:6,
    text:"Finished this forever ago. Back when I was young and cool",
    archived:true,
    date:new Date(2014,11,1),
    complete:true
  }
};

var DemoItems = React.createClass({
  getInitialState:function(){
    return itemData;
  },
  itemUpdated:function(field,value,componentProps){
    var item = itemData[componentProps.key];
    item[field] = value;
    this.setState(itemData);
  },
  render: function() {
    var items = _.map(
      this.state,
      (item,key)=>{
        item.key = key;
        return (
          <div key={key}>
            <h5 className="margin-top text-info clear" >{key}</h5>
            <Item text={item.text} date={item.date} archived={item.archived} complete={item.complete} id={item.id} onFieldUpdated={this.itemUpdated}/>
            <br/>
          </div>
          );
      });
    return (
      <div className="container-fluid">
        {items}
      </div>
      );            
  }
});

React.render(
  <DemoItems/>,
  document.getElementById('item')
);
