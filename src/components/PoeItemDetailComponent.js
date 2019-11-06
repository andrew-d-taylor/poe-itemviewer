
import React from 'react';

class PoeItemDetailComponent extends React.Component {

    render() {
        return (
            <div className="poeitem-details">
                <div className="item-header">
                    <div className="item-title">{this.props.item.name} {this.props.item.typeLine}</div>
                    <div className="item-note">{this.props.item.note}</div>
                </div>
                <div className="item-level">lvl {this.props.item.ilvl}</div>
                <div className="explicit-mods">
                    {this.props.item.explicitMods &&
                        this.props.item.explicitMods.map(mod => {
                            return <div>{mod}</div>
                        })
                    }
                </div>
                <div className="flavour-text">{this.props.item.flavourText}</div>
            </div>
        )
    }
}

export default PoeItemDetailComponent;