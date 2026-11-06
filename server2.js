import express from 'express';
const app = express();
const PORT = 3000;

// 1. (GET) /api/health - ตรวจสอบสถานะการทำงานของเซิร์ฟเวอร์
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'Online', 
        timestamp: new Date().toISOString(),
        message: 'Server is running perfectly.' 
    });
});


app.get('/api/formula1', (req, res) => {
    const weight = parseFloat(req.query.weight); // น้ำหนัก (กิโลกรัม)
    const height = parseFloat(req.query.height); // ส่วนสูง (เซนติเมตร)

    if (isNaN(weight) || isNaN(height)) {
        return res.status(400).json({ 
            error: 'กรุณาส่งค่า weight (น้ำหนัก) และ height (ส่วนสูง) ให้ถูกต้อง' 
        });
    }

    // สูตรทางการแพทย์: BSA = √( (น้ำหนัก x ส่วนสูง) / 3600 )
    const bsa = Math.sqrt((weight * height) / 3600);
    
    res.status(200).json({
        formula: 'Body Surface Area (Mosteller)',
        inputs: {
            weight_kg: weight,
            height_cm: height
        },
        result_sqm: parseFloat(bsa.toFixed(4)), 
        unit: 'Square Meters (ตารางเมตร)'
    });
});


app.get('/api/formula2/:side/:height', (req, res) => {
    const side = parseFloat(req.params.side); // ความยาวด้านของฐานหกเหลี่ยม (a)
    const height = parseFloat(req.params.height); // ความสูงของปริซึม (h)

    if (isNaN(side) || isNaN(height)) {
        return res.status(400).json({ 
            error: 'กรุณาระบุ side (ความยาวด้าน) และ height (ความสูง) ใน URL ให้เป็นตัวเลข' 
        });
    }

    // สูตรปริมาตรปริซึมหกเหลี่ยม: V = (3 * √3 / 2) * a^2 * h
    const volume = ((3 * Math.sqrt(3)) / 2) * Math.pow(side, 2) * height;

    res.status(200).json({
        formula: 'Regular Hexagonal Prism Volume (ปริมาตรปริซึมหกเหลี่ยมด้านเท่า)',
        inputs: {
            base_side_length: side,
            prism_height: height
        },
        result: parseFloat(volume.toFixed(4)) // ปัดเศษ 4 ตำแหน่ง
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});