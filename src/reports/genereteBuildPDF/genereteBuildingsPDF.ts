
const PdfPrinter = require("pdfmake/src/printer");
const fonts = {
    Roboto: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique"
    }
}

const printer = new PdfPrinter(fonts)

export const createBuildingPDF = (buildings: any[]) => {
    const tableBody = [
        [
            { text: "ID", bold: true },
            { text: "ADDRESS 1", bold: true },
            { text: "ADDRESS 2", bold: true },
            { text: "COUNTRY", bold: true },
            { text: "PROVINCE", bold: true },
            { text: "CITY", bold: true },
            { text: "POSTAL CODE", bold: true },
            { text: "BUILD TYPE", bold: true },
            { text: "LAST MAINTENANCE", bold: true },
            { text: "SERVICES AVAILABLE", bold: true },
            { text: "GENERAL STATUS", bold: true },
            { text: "QUANTITY APARTMENT", bold: true },
            { text: "FLOOR NUMBER", bold: true },
        ]
    ];

    buildings.forEach(b => {
        tableBody.push([
            b.id,
            b.address_1,
            b.address_2,
            b.country,
            b.province,
            b.city,
            b.postal_code,
            b.build_type,
            b.last_maintenance ? new Date(b.last_maintenance).toLocaleString() : "",
            b.services_available,
            b.general_status,
            b.quantity_apartment,
            b.floor_number,
        ])
    });

    const docDefinition = {
        pageSize: 'A3',
        pageOrientation: 'landscape',
        pageMargins: [40, 60, 40, 60],

        background: function () {
            return { text: 'REPORTE CONFIDENCIAL BUILDING', color: '#eeeeee', fontSize: 45, bold: true, alignment: 'center' };
        },

        content: [
            { text: "Reporte General de Edificio", style: "header", alignment: "center" },

            { text: "Información previa", style: "subheader" },

            { text: "Este documento contiene información de edificio, y de usuarios del edificio.", style: "paragraph" },

            { text:`Importante: la siguiente información está actualizada al día de hoy. ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}`, style: "note" },

            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 415, y2: 0 }], style: "separator" },

            { text: "Datos del Edificio", style: "highlight" },

            { text: "Este bloque contiene información relevante.", style: "box" },
            {
                table:{
                    headerRows:1,
                    widths: ["auto", "auto", "auto", "auto", "auto", "auto", "*", "*", "auto", "auto", "auto", "auto", "auto"],
                    body: tableBody,
                }
            }
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
            }
        },

        footer: (currentPage: Number, pageCount: Number)=>({
            text: `Página ${currentPage} de ${pageCount}`,
            alignment: 'center',
            margin: [0, 10, 0, 0]
        })
    };
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    return pdfDoc;
}