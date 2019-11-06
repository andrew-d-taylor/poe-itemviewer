
import React from 'react';

class PoeItemComponent extends React.Component {

    render() {
        return (
            <tr onClick={this.props.showDetails}>
                <td>
                    {this.props.item.typeLine}
                </td>
                <td>
                    <img className="item-icon" src={this.props.item.icon} alt="the item icon"/>
                </td>
            </tr>
        )
    }

}

export default PoeItemComponent;