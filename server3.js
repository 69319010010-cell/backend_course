import express from 'express';
const app = express();
const PORT = 3000;

// เปิดให้ Express อ่านข้อมูล JSON จาก Body ได้
app.use(express.json());

// ดักจับ Error กรณีส่งรูปแบบ JSON มาผิด (Syntax Error)
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: 'รูปแบบ JSON ไม่ถูกต้อง' });
    }
    next();
});

// ข้อมูลจำลองนักศึกษา (id: รหัสนักศึกษา, name: ชื่อ-นามสกุล)
const students = [
    { id: '6931901007', name: 'กฤษดา บุญเหลือ' },
    { id: '6931901008', name: 'ญาณวุฒิ จันเพ็ง' },
    { id: '6931901009', name: 'ณภัทร โสธรรมมงคล' },
    { id: '69319010010', name: 'ธนดล คล้ายรัศมี' },
    { id: '69319010011', name: 'ธีทัต จันทร์สว่าง' },
    { id: '69319010012', name: 'นัฐพนธ์ ใจเย็น' },
    { id: '69319010013', name: 'ปกรณ์เกียรติ อยู่พิทักษ์สกุล' },
    { id: '69319010014', name: 'ปฎิพล เรืองชัย' },
    { id: '69319010015', name: 'ปิยะพงค์ เหล่าประชาวิทย์' },
    { id: '69319010018', name: 'ภัทราวรินทร์ ศรีน้อย' },
    { id: '69319010019', name: 'ภูริพัฒน์ สุธรรมมา' },
    { id: '69319010020', name: 'ภูวดล พลจารย์' },
    { id: '69319010022', name: 'ศาศวัต แสงคำฉาย' },
    { id: '69319010023', name: 'อภิรักษ์ ศรีวัดดานัง' },
];

// ฟังก์ชันช่วยตรวจสอบข้อความไม่ว่าง
function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim() !== '';
}

// ---------------------------------------------------------
// 1. READ (All) : ดึงรายชื่อนักศึกษาทั้งหมด (หรือค้นหาด้วยชื่อ)
// ---------------------------------------------------------
app.get('/api/students', (req, res) => {
    const { name } = req.query;

    // ถ้าไม่ได้ส่ง ?name=... มา ให้แสดงทั้งหมด
    if (name === undefined) {
        return res.status(200).json(students);
    }

    if (!isNonEmptyString(name)) {
        return res.status(400).json({ message: 'คำค้นหา name ต้องเป็นข้อความที่ไม่ว่าง' });
    }

    const keyword = name.trim().toLowerCase();
    const result = students.filter(s => s.name.toLowerCase().includes(keyword));
    res.status(200).json(result);
});

// ---------------------------------------------------------
// 2. READ (One) : ค้นหานักศึกษา 1 คน ด้วยรหัสนักศึกษา (id)
// ---------------------------------------------------------
app.get('/api/students/:id', (req, res) => {
    const { id } = req.params;

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: 'ไม่พบรหัสนักศึกษานี้ในระบบ' });
    }

    res.status(200).json(student);
});

// ---------------------------------------------------------
// 3. CREATE : เพิ่มข้อมูลนักศึกษาใหม่
// ---------------------------------------------------------
app.post('/api/students', (req, res) => {
    const { id, name } = req.body;

    // ตรวจสอบว่าส่ง id และ name มาครบและไม่เป็นค่าว่าง
    if (!isNonEmptyString(id) || !isNonEmptyString(name)) {
        return res.status(400).json({ 
            message: 'ข้อมูลไม่ครบถ้วน: กรุณาระบุ id (รหัสนักศึกษา) และ name (ชื่อ-นามสกุล)' 
        });
    }

    const cleanId = id.trim();

    // ตรวจสอบว่ารหัสนักศึกษานี้มีอยู่ในระบบแล้วหรือยัง (ห้ามซ้ำ)
    const isDuplicate = students.some(s => s.id === cleanId);
    if (isDuplicate) {
        return res.status(400).json({ message: 'รหัสนักศึกษานี้มีอยู่ในระบบแล้ว' });
    }

    const newStudent = {
        id: cleanId,
        name: name.trim()
    };

    students.push(newStudent);

    res.status(201).json({
        message: 'เพิ่มข้อมูลนักศึกษาเรียบร้อยแล้ว',
        data: newStudent
    });
});

// ---------------------------------------------------------
// 4. UPDATE : แก้ไขชื่อ-นามสกุลนักศึกษาตามรหัส (id)
// ---------------------------------------------------------
app.patch('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const student = students.find(s => s.id === id);
    if (!student) {
        return res.status(404).json({ message: 'ไม่พบรหัสนักศึกษาที่ต้องการแก้ไข' });
    }

    if (!isNonEmptyString(name)) {
        return res.status(400).json({ message: 'กรุณาระบุชื่อ-นามสกุล (name) ที่ต้องการแก้ไขให้ถูกต้อง' });
    }

    student.name = name.trim();

    res.status(200).json({
        message: 'แก้ไขข้อมูลนักศึกษาเรียบร้อยแล้ว',
        data: student
    });
});

// ---------------------------------------------------------
// 5. DELETE : ลบข้อมูลนักศึกษาตามรหัส (id)
// ---------------------------------------------------------
app.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;

    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'ไม่พบรหัสนักศึกษาที่ต้องการลบ' });
    }

    const [deletedStudent] = students.splice(index, 1);

    res.status(200).json({
        message: 'ลบข้อมูลนักศึกษาเรียบร้อยแล้ว',
        deletedData: deletedStudent
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});