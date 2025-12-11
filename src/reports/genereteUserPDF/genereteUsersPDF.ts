
// import path from "path";
const PdfPrinter = require("pdfmake/src/printer");
const fonts = {
    Roboto: {
        // normal: path.join(__dirname, "fonts/Roboto-Regular.ttf"),
        // bold: path.join(__dirname, "fonts/Roboto-Bold.ttf"),
        // italics: path.join(__dirname, "fonts/Roboto-Italic.ttf"),
        // bolditalics: path.join(__dirname, "fonts/Roboto-BoldItalic.ttf")
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique"
    }
};

// const PdfPrinter = require("pdfmake");
const printer = new PdfPrinter(fonts);

export const createUsersPDF = (users: any[]) => {
    const tableBody = [
        [
            { text: "ID", bold: true },
            { text: "Nombre", bold: true },
            { text: "Apellido", bold: true },
            { text: "Date_born", bold: true },
            { text: "Email", bold: true },
            { text: "Gender", bold: true },
            { text: "type_document", bold: true },
            { text: "number_document", bold: true },
            { text: "Nationality", bold: true },
            { text: "Teléfono", bold: true },
            { text: "date entry apartment", bold: true },
            { text: "isActive", bold: true },
            { text: "last_login", bold: true },
        ]
    ];

    users.forEach(u => {
        tableBody.push([
            u.id,
            u.name,
            u.lastName,
            u.date_born ? new Date(u.date_born).toLocaleDateString() : "",
            u.email,
            u.gender,
            u.type_document,
            u.number_document,
            u.nationality,
            u.phone,
            u.date_entry_apartment ? new Date(u.date_entry_apartment).toLocaleDateString() : "",
            u.isActive,
            u.last_login
            // u.last_login ? new Date(u.date_born).toLocaleDateString() : "",
        ]);
    });

    const docDefinition = {
        pageSize: 'A3',
        pageOrientation: 'landscape',
        pageMargins: [40, 60, 40, 60],

        // defaultStyle: {
        //     font: "Roboto" 
        // },
        background: function () {
            return { text: 'REPORTE CONFIDENCIAL USERS', color: '#eeeeee', fontSize: 45, bold: true, alignment: 'center' };
        },
        content: [
            { text: "Reporte General de Usuarios", style: "header", alignment: "center" },

            { text: "Información previa", style: "subheader" },

            { text: "Este documento contiene la lista completa de usuarios inscritos en el sistema.", style: "paragraph" },

            { text: `Importante: la siguiente información está actualizada al día de hoy. ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`, style: "note" },

            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 415, y2: 0 }], style: "separator" },

            { text: "Resumen de Usuarios", style: "highlight" },

            { text: "Este bloque contiene información relevante.", style: "box" },

            {
                table: {
                    headerRows: 1,
                    widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto", "*", "auto", "*", "auto", "auto", "*"],
                    body: tableBody,
                    // style: 'tableBody'
                },
                // layout: "lightHorizontalLines"
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 15],
            },
            subheader: {
                fontSize: 16,
                bold: true,
                color: '#444',
                margin: [0, 10, 0, 6]
            },
            paragraph: {
                fontSize: 12,
                margin: [0, 4, 0, 4]
            },
            note: {
                fontSize: 10,
                italics: true,
                color: 'gray',
                margin: [0, 4, 0, 4]
            },
            box: {
                fontSize: 12,
                margin: [0, 8, 0, 8],
                bold: true,
                color: '#333',
                fillColor: '#f2f2f2',
                padding: 8
            },
            separator: {
                margin: [0, 10, 0, 10],
                color: '#999'
            },
            highlight: {
                fontSize: 12,
                color: "#0055cc",
                bold: true,
                margin: [0, 4, 0, 4]
            },
            tableBody: {
                fontSize: 8
            }
        },


        footer: (currentPage: Number, pageCount: Number) => ({
            // return {
            text: `Página ${currentPage} de ${pageCount}`,
            alignment: 'center',
            margin: [0, 10, 0, 0]
            // };
        })
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    return pdfDoc;
};