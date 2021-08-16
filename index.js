const express = require("express");
const { google } = require("googleapis");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
    const { request, name } = req.body;
  
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "16FzF65IaNr2ilFAEyhwa9pHg6DGfp9GCTn6q_xWheH8";

  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadCells();
    const row = await sheet.getRows();
    console.log(row.length)

    for (let i = 0; i <= row.length; i++) {

        const id = sheet.getCellByA1(`A${4 + i}`);
        console.log(id.value)
        if (id.value == null) {
            break;
        }


        const studentName = sheet.getCellByA1(`B${4 + i}`);
        console.log(`Aluno: ${studentName.value}`);


        const attendance = sheet.getCellByA1(`C${4 + i}`);
        console.log(`Faltas: ${attendance.value}`);


        const firstExam = sheet.getCellByA1(`D${4 + i}`);
        const secondExam = sheet.getCellByA1(`E${4 + i}`);
        const thirdExam = sheet.getCellByA1(`F${4 + i}`);


        const average = ((firstExam.value + secondExam.value + thirdExam.value) / 3).toFixed(0);
        console.log(`Média: ${average}`);


        const situation = sheet.getCellByA1(`G${4 + i}`);
        const requiredGrade = sheet.getCellByA1(`H${4 + i}`);


        if (average < 50) {
            situation.value = 'Reprovado por nota';
            requiredGrade.value = 0;
            console.log('Reprovado por nota');
        }
        else if (average >= 50 && average < 70) {
            situation.value = 'Exame Final';
            const grade = 100 - average;
            requiredGrade.value = grade;
            console.log('Nota para aprovação final');
        }
        else if (average >= 70) {
            situation.value = 'Aprovado';
            requiredGrade.value = 0;
            console.log('Aprovado');
        }
        if (attendance.value > 15) {
            situation.value = 'Reprovado por Falta';
            requiredGrade.value = 0;
            console.log('Reprovado por Falta');
        }
        console.log('--------------------------------');
        await sheet.saveUpdatedCells();
    }

accessSpreadsheet()

});