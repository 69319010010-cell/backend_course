import express from "express";
const app = express();
const PORT = 3000;

const equipment = [
    { id: 1, name: 'คอมพิวเตอร์', category: "Computer", type: 'computer' },
    { id: 2, name: 'ปริ้นเตอร์', category: "Printer", type: 'printer' },
    { id: 3, name: 'Keyboard', category: "Accessory", type: 'accessory' }
];

app.get("/api/equipments/:id", (req, res) => {
    const id = Number(req.params.id);
    const result = equipment.find(e => e.id ==id);
if (result) {
    res.status(200).json(result);
} else {
    res.status(404).json({ message: "Equipment not found" });
}
});

app.get("/api/equipments", (req, res) => {
    const cat = req.query.category;
    const result = cat 
        ? equipment.filter(e => e.category.toLowerCase() === cat.toLowerCase()) 
        : equipment;
    res.status(200).json(result);
});
app.get("/api/equipments/getNum", (req, res) => {
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