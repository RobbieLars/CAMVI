<script src="https://cdn.jsdelivr.net/npm/pdf-lib@1.16.0/dist/pdf-lib.js"></script>

        async function generatePdf() {
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

            const customerName = document.getElementById('customerName').value || 'Cliente Ejemplo';
            const customerAddress = document.getElementById('customerAddress').value || '123 Calle Principal, Ciudad Ejemplo';
            const invoiceDate = document.getElementById('invoiceDate').value || '18 de marzo de 2024';
            const productDetails = document.getElementById('productDetails').value || 'Producto 1 x2 - $50.00\nProducto 2 x1 - $30.00\nProducto 3 x3 - $20.00';
            const totalAmount = calculateTotal(productDetails);

            let currentY = height - 150;
            const lineSpacing = 25;

            page.drawText(`Cliente: ${customerName}`, {
                x: 50,
                y: currentY,
                size: fontSize,
                color: rgb(0, 0, 0),
            });
            currentY -= lineSpacing;

            page.drawText(`Dirección: ${customerAddress}`, {
                x: 50,
                y: currentY,
                size: fontSize,
                color: rgb(0, 0, 0),
            });
            currentY -= lineSpacing;

            page.drawText(`Fecha: ${invoiceDate}`, {
                x: 50,
                y: currentY,
                size: fontSize,
                color: rgb(0, 0, 0),
            });
            currentY -= lineSpacing * 2;

            const items = productDetails.split('\n');
            items.forEach(item => {
                page.drawText(item, {
                    x: 50,
                    y: currentY,
                    size: fontSize,
                    color: rgb(0, 0, 0),
                });
                currentY -= lineSpacing;
            });

            page.drawText(`Total: $${totalAmount.toFixed(2)}`, {
                x: 50,
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
        }

        function calculateTotal(productDetails) {
            const items = productDetails.split('\n');
            let total = 0;
            items.forEach(item => {
                const [, price] = item.split(' - $');
                total += parseFloat(price);
            });
            return total;
        }

        document.getElementById('generatePdfButton').addEventListener('click', generatePdf);
