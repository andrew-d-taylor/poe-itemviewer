import React from 'react';
import './App.css';
import ItemService from "./service/itemService";
import PoeItemComponent from "./components/PoeItemComponent";
import PoeItemDetailComponent from "./components/PoeItemDetailComponent";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.itemService = new ItemService();
    this.state = {
      changeId: '',
      items: [],
      idToRequest: '',
      itemInFocus: null,
    };
  }

  onIdChanged(event) {
    console.log(`ID changed to ${event.target.value}`);
    this.setState({idToRequest: event.target.value});
  }

  getItems() {
    this.itemService.getItems(this.state.changeId).then(result => {
      console.log(`Service returned with result: `, result);
      this.setState({changeId: result.nextChangeId, items: result.items});
    });
  }

  getUniques() {
    this.itemService.getUniques().then(({items, categories}) => {
      console.log(`Got items from service: ${items}`);
      console.log(`Got categories from service: ${categories}`);
    });
  }

  showItemDetails(item) {
    console.log("Item was selected: ", item);
    this.setState({itemInFocus: item});
  }


  render() {
    return (
        <div>
          <div>Next change ID is: {this.state.changeId}</div>
          <input placeholder='abc-123' value={this.state.idToRequest} onChange={this.onIdChanged.bind(this)}/>
          <button onClick={this.getItems.bind(this)}>Get Items</button>
          <div className="content-area">
            <div className="table-area">
              <table>
                <tbody>
                {this.state.items.map((item, i) => {
                  return <PoeItemComponent key={i} item={item} showDetails={this.showItemDetails.bind(this, item)}/>
                })}
                </tbody>
              </table>
            </div>
            <div className="detail-area">
              {this.state.itemInFocus && <PoeItemDetailComponent item={this.state.itemInFocus}/>}
            </div>
          </div>
        </div>
    )
  }

}

export default App;
