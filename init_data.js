const fs = require('fs')

eval(fs.readFileSync('./data/数据.txt', 'utf8'))
dataList.forEach((item, index) => {
    item.id = index + 1;
    item.num = 0;
    item.selected = false;
});
fs.writeFileSync('./data/good_list.json', JSON.stringify(dataList), 'utf8');
try {
    fs.readFileSync('./data/cart.json', 'utf8');
} catch (e) {
    fs.writeFileSync('./data/cart.json', '[]', 'utf8');
}
