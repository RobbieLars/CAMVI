document.addEventListener('DOMContentLoaded', async function () {
    document.getElementById('invoiceForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const { PDFDocument, rgb } = PDFLib;
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const fontSize = 20;

        page.drawText('Factura', {
            x: width / 2 - 50,
            y: height - 50,
            size: fontSize + 10,
            color: rgb(0, 0, 0),
        });

        const formData = new FormData(this);
        const invoiceData = {};
        formData.forEach((value, key) => {
            invoiceData[key] = value;
        });

        let currentY = height - 150;
        const lineSpacing = 25;

        Object.entries(invoiceData).forEach(([key, value]) => {
            if (key === 'productDetails') {
                const items = value.split('\n');
                items.forEach(item => {
                    page.drawText(item, {
                        x: 50,
                        y: currentY,
                        size: fontSize,
                        color: rgb(0, 0, 0),
                    });
                    currentY -= lineSpacing;
                });
            } else {
                page.drawText(`${key}: ${value}`, {
                    x: 50,
                    y: currentY,
                    size: fontSize,
                    color: rgb(0, 0, 0),
                });
                currentY -= lineSpacing;
            }
        });

        // Total fijo
        var totalAmount = 17;
        page.drawText(`Total: $${totalAmount.toFixed(2)}`, {
            x: width / 2 - 50,
            y: currentY,
            size: fontSize,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'factura.pdf';
        link.click();
    });
});
