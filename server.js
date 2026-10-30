import express from "express";
const app = express();
const PORT = 3000;

const equipment = [
    { id: 1, name: 'คอมพิวเตอร์', category: "Computer", type: 'computer' },
    { id: 2, name: 'ปริ้นเตอร์', category: "Printer", type: 'printer' },
    { id: 3, name: 'Keyboard', category: "Accessory", type: 'accessory' }
];

app.get("/api/equipment", (req, res) => {
    res.status(200).json(equipment);
});

app.get("/api/equipment/getNum", (req, res) => {
    res.status(200).json({
        num: equipment.length
    });
});


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server is running"
    });
});

app.get("/myfriend", (req, res) => {
    res.json([
        {
            student_id: "69319010007",
            name: "กฤษดา บุญเหลือ",
            nickname: "องศา"
        },
        {
            student_id: "6931901008",
            name: "ญาณวุฒิ จันเพ็ง",
            nickname: "เก้า"
        },
        {
            student_id: "69319010009",
            name: "ณภัทร โสธรรมมงคล",
            nickname: "ภัทร"
        },
        {
            student_id: "69319010010",
            name: "ธนดล คล้ายรัศมี",
            nickname: "ฟรุ๊ตกับรยง"
        },
        {
            student_id: "69319010011",
            name: "ธีทัต จันทร์สว่าง",
            nickname: "T"
        },
        {
            student_id: "69319010012",
            name: "นัฐพนธ์ ใจเย็น",
            nickname: "ติมมูติม"
        },
        {
            student_id: "69319010013",
            name: "ปกรณ์เกียรติ อยู่พิทักษ์สกุล",
            nickname: "ข้าวจินยอง"
        },
        {
            student_id: "69319010014",
            name: "ปฏิพล เรืองชัย",
            nickname: "ชิราโอนิ ยูริ"
        },
        {
            student_id: "69319010015",
            name: "ปิยะพงษ์ เหล่าประชาวิทย์",
            nickname: "เทนเทนตัน"
        },
        {
            student_id: "69319010018",
            name: "ภัทราวรินทร์ ศรีน้อย",
            nickname: "โมเดล"
        },
        {
            student_id: "69319010019",
            name: "ภูริพัฒน์ สุธรรมมา",
            nickname: "ภูมิพล"
        },
        {
            student_id: "69319010020",
            name: "ภูวดล พลจารย์",
            nickname: "ชบี ดงภู"
        },
        {
            student_id: "69319010022",
            name: "ศาศวัต แสงคําฉาย",
            nickname: "ยามาซาแหม่ม ชินเป้ก"
        },
        {
            student_id: "69319010023",
            name: "อภิรักษ ศรีวัดทานัง",
            nickname: "ลีจีนาย"
        }
    ]);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});