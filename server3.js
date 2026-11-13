import express from 'express';
const app = express();
const PORT = 3000;
app.use(express.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: 'รูปแบบ JSON ไม่ถูกต้อง' });
    }
    next();
});

const equipment = [
    { id: '101', name: 'Notebook', category: 'computer', quantity: 10 },
    { id: '102', name: 'PC', category: 'computer', quantity: 5 },
    { id: '103', name: 'Mouse', category: 'accessory', quantity: 20 }
];

let nextId = 104; 

function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim() !== '';
}

function isSafeNonNegativeInteger(value) {
    return Number.isSafeInteger(value) && value >= 0;
}

app.get('/api/equipment', (req, res) => {
    const { category } = req.query;

    if (category === undefined) {
        return res.json(equipment); // แสดงทั้งหมด[cite: 7]
    }

    if (!isNonEmptyString(category)) {
        return res.status(400).json({ message: 'category ต้องเป็นข้อความที่ไม่ว่าง' });
    }

    const keyword = category.trim().toLowerCase();
    const result = equipment.filter(item => item.category.toLowerCase() === keyword);
    res.json(result); // กรองตามประเภท[cite: 7]
});

app.get('/api/equipment/count', (req, res) => {
    res.json({ total: equipment.length }); 
});

app.get('/api/equipment/:id', (req, res) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ message: 'ID ผิดรูปแบบ (ต้องเป็นตัวเลขเท่านั้น)' });
    }

    const item = equipment.find(e => e.id === id);

    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'ไม่พบอุปกรณ์รหัสนี้ในระบบ' }); 
    }
});

app.post('/api/equipment', (req, res) => {
    const { name, category, quantity } = req.body;

   
    if (!isNonEmptyString(name) || !isNonEmptyString(category) 
        || !isSafeNonNegativeInteger(quantity)) {
        return res.status(400).json({ 
            message: 'ข้อมูลผิดพลาด: name/category ต้องเป็นข้อความที่ไม่ว่าง, quantity ต้องเป็นจำนวนเต็ม >= 0' 
        }); 
    }

    const newItem = {
        id: nextId.toString(),
        name: name.trim(),
        category: category.trim().toLowerCase(),
        quantity: quantity
    };

    equipment.push(newItem);
    nextId++;

    res.status(201).json(newItem); 
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});