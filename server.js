const fs = require('fs');
const http = require('http');


let cao_zuo, good_id,
    good_list = JSON.parse(fs.readFileSync('./data/good_list.json', 'utf8'));

// console.log(good_list.find(item => item.id === 9))
let app = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // console.log(req.url);
    if (req.url !== '/') {
        let data = JSON.parse(fs.readFileSync('./data/cart.json', 'utf8'));
        // console.log(data);
        [cao_zuo, good_id] = req.url.slice(2).split('=');
        if (cao_zuo === 'add') {
            if (data.find(item => item.id === Number(good_id))) {
                let good = data.find(item => item.id === Number(good_id));
                good.num += 1;
                good.selected = true;
            } else {
                let good = good_list.find(item => item.id === Number(good_id));
                good.num = 1;
                good.selected = true;
                data.push(good);
            }
            fs.writeFileSync('./data/cart.json', JSON.stringify(data), 'utf8');
            res.end('添加成功!')
        }

        if (cao_zuo === 'reduce') {
            let good = data.find(item => item.id === Number(good_id));
            if (good.num > 1) {
                good.num -= 1;
                res.end('减一');
            } else {
                res.end('不能再减了');
            }
            fs.writeFileSync('./data/cart.json', JSON.stringify(data), 'utf8');
        }

        if (cao_zuo === 'get_cart') {
            res.end(fs.readFileSync('./data/cart.json', 'utf8'));
        }

        if (cao_zuo === 'select') {
            let good = data.find(item => item.id === Number(good_id));
            good.selected = !good.selected;
            fs.writeFileSync('./data/cart.json', JSON.stringify(data), 'utf8');
            res.end('单个取反');
        }

        if (cao_zuo === 'select_all') {
            if (data.every(item => item.selected)) data.forEach(item => item.selected = false);
            else data.forEach(item => item.selected = true);
            fs.writeFileSync('./data/cart.json', JSON.stringify(data), 'utf8');
            res.end('全选');
        }

        if (cao_zuo === 'remove') {
            let good_index = data.findIndex(item => item.id === Number(good_id));
            data.splice(good_index, 1);
            fs.writeFileSync('./data/cart.json', JSON.stringify(data), 'utf8');
            res.end('删除成功');
        }
    } else {
        let data = fs.readFileSync('./data/good_list.json', 'utf8');
        res.end(data);
    }
})

app.listen(8080, () => console.log('Server is running on port 8080'));