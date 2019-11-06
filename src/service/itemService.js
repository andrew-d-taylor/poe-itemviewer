import PoeItem from "../model/PoeItem";
import PoeItemCategory from "../model/PoeItemCategory";

class ItemService {

    apiURL = 'http://api.pathofexile.com/public-stash-tabs';
    itemsURL = 'http://www.pathofexile.com/api/trade/data/items';
    proxyItemsURL = 'http://localhost:8080/items';
    proxyUniquesURL = 'http://localhost:8080/uniques';

    getItems(changeId) {
        const items = [];
        let nextChangeId = '';
        const opts = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const url = changeId ? this.proxyItemsURL + "?id=" + changeId : this.proxyItemsURL;
        return fetch(url, opts).then((response) => {
           console.log("Got response from proxy: ", response);
           return response.json();
        }).then(asJson => {
            nextChangeId = asJson.next_change_id;
            return asJson.stashes;
        }).then(stashes => {
            stashes.forEach(stash => {
               stash.items.forEach(item => {
                   const poeItem = new PoeItem(item);
                   items.push(poeItem);
               });
            });
            return { items, nextChangeId };
        });
    }

    getUniques(){
        const result = [];
        const opts = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return fetch(this.proxyUniquesURL, opts).then((response) => {
            const items = [];
            const categories = [];
            console.log(`Got response: ${response}`);
            return response.json().then(asJson => {
                const categoriesJson = asJson.result;
                console.log(`Got result: ${result}`);
                for (let i = 0; i < categoriesJson.length; i++) {
                    const category = new PoeItemCategory(categoriesJson[i]);
                    console.log(`Parsed PoeItemCategory from JSON: ${category}`);
                    categories.push(category);
                    categoriesJson[i].entries.forEach(item => {
                        const poeItem = new PoeItem(item, category.label);
                        items.push(poeItem);
                        console.log(`Parsed PoeItem from JSON: ${poeItem}`);
                    });
                }
                return {items, categories};
            });
        }).catch(err => {
            console.log(`There was an error: ${err}`);
        });
    }

}

export default ItemService;