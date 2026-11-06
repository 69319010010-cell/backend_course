import express from "express";
const app = express();
const PORT = 3000;

const equipment = [
    { id: 1, name: 'คอมพิวเตอร์', category: "Computer", type: 'computer' },
    { id: 2, name: 'ปริ้นเตอร์', category: "Printer", type: 'printer' },
    { id: 3, name: 'Keyboard', category: "Accessory", type: 'accessory' }
];

app.get("/api/equipments", (req, res) => {
    const cat = req.query.category;
    const result = cat ? equipment.filter(e => 
        e.category.toLowerCase()
         === cat.toLowerCase()) : equipment;
    res.status(200).json(result);
});

app.get("/api/equipment/getNum", (req, res) => {
    res.status(200).json({
        num: equipment.length
    });
});




app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server is running"
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});